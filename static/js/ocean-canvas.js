/**
 * TITANIC AI OCEAN CANVAS ENGINE
 * High-performance animated multi-layered ocean waves, bioluminescent particle drift,
 * AI grid overlay, and mouse parallax controller.
 */

class OceanCanvasEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.width = 0;
    this.height = 0;
    this.time = 0;

    // Mouse Parallax Coordinates
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    // Ocean Wave Configuration (Multi-layered Sine Waves)
    this.waves = [
      { amplitude: 18, length: 0.008, speed: 0.02, color: 'rgba(0, 242, 254, 0.15)', offset: 0, heightRatio: 0.72 },
      { amplitude: 24, length: 0.005, speed: 0.015, color: 'rgba(79, 172, 254, 0.22)', offset: 2, heightRatio: 0.76 },
      { amplitude: 14, length: 0.012, speed: 0.03, color: 'rgba(121, 40, 202, 0.18)', offset: 4, heightRatio: 0.8 },
      { amplitude: 30, length: 0.004, speed: 0.01, color: 'rgba(3, 14, 33, 0.95)', offset: 1, heightRatio: 0.82 }
    ];

    // Floating Bioluminescent Data Particles
    this.particles = [];
    this.maxParticles = 65;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));

    this.createParticles();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  handleMouseMove(e) {
    // Convert to centered normalized coords (-1 to +1)
    const normX = (e.clientX / this.width) * 2 - 1;
    const normY = (e.clientY / this.height) * 2 - 1;
    this.mouse.targetX = normX * 30; // Max 30px parallax offset
    this.mouse.targetY = normY * 20;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.7) * 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        color: Math.random() > 0.4 ? 'rgba(0, 242, 254, ' : 'rgba(121, 40, 202, '
      });
    }
  }

  updateParallax() {
    // Smooth linear interpolation (lerp)
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    // Apply parallax offset to DOM ship container if present
    const shipWrapper = document.querySelector('.ship-wrapper');
    if (shipWrapper) {
      shipWrapper.style.transform = `translate3d(${this.mouse.x * 0.8}px, ${this.mouse.y * 0.6}px, 0) rotateX(${-this.mouse.y * 0.1}deg) rotateY(${this.mouse.x * 0.15}deg)`;
    }
  }

  drawGrid() {
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.03)';
    this.ctx.lineWidth = 1;

    const gridSize = 60;
    const offsetX = (this.time * 10) % gridSize;

    for (let x = offsetX; x < this.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }

    for (let y = 0; y < this.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
    this.ctx.restore();
  }

  drawWaves() {
    this.waves.forEach((wave) => {
      this.ctx.save();
      this.ctx.beginPath();

      const baseY = this.height * wave.heightRatio + this.mouse.y * 0.3;
      this.ctx.moveTo(0, this.height);

      for (let x = 0; x <= this.width; x += 10) {
        const y = Math.sin(x * wave.length + this.time * wave.speed + wave.offset) * wave.amplitude + baseY;
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }

      this.ctx.lineTo(this.width, this.height);
      this.ctx.lineTo(0, this.height);
      this.ctx.closePath();

      this.ctx.fillStyle = wave.color;
      this.ctx.fill();

      // Draw bioluminescent wave crest foam highlights
      this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      this.ctx.restore();
    });
  }

  drawParticles() {
    this.particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      // Pulse alpha glow
      p.alpha += Math.sin(this.time * p.pulseSpeed) * 0.02;

      // Wrap around bounds
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x + this.mouse.x * 0.2, p.y + this.mouse.y * 0.2, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + Math.max(0.1, Math.min(1, p.alpha)) + ')';
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = '#00f2fe';
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  animate() {
    this.time += 1;
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.updateParallax();
    this.drawGrid();
    this.drawParticles();
    this.drawWaves();

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  window.oceanCanvas = new OceanCanvasEngine('oceanCanvas');
});
