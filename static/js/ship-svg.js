/**
 * TITANIC VECTOR SHIP ILLUSTRATION & MICRO-ANIMATIONS
 * Generates dynamic modern stylized SVG artwork of Titanic with illuminated cabins,
 * glowing smokestack steam particles, sonar scanning beam, and waterline splash effects.
 */

class TitanicShipIllustration {
  constructor(targetContainerId) {
    this.container = document.getElementById(targetContainerId);
    if (!this.container) return;
    this.render();
  }

  render() {
    const svgHTML = `
      <svg class="ship-svg-element" viewBox="0 0 1000 450" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Gradients -->
          <linearGradient id="hullGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0b1e3b" />
            <stop offset="50%" stop-color="#071325" />
            <stop offset="100%" stop-color="#030812" />
          </linearGradient>

          <linearGradient id="deckGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1e3a60" />
            <stop offset="100%" stop-color="#0b172a" />
          </linearGradient>

          <linearGradient id="funnelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#e63946" />
            <stop offset="70%" stop-color="#ffb703" />
            <stop offset="100%" stop-color="#1d3557" />
          </linearGradient>

          <linearGradient id="glowLaser" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(0, 242, 254, 0.6)" />
            <stop offset="100%" stop-color="rgba(0, 242, 254, 0)" />
          </linearGradient>

          <!-- Glow Filters -->
          <filter id="neonCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="softSmokeBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <!-- Waterline Bioluminescent Reflection -->
        <ellipse cx="500" cy="385" rx="380" ry="25" fill="url(#glowLaser)" opacity="0.4" />

        <!-- Ship Water Wake Splash Curves -->
        <path d="M 120 380 Q 250 395 500 390 Q 750 395 880 380" stroke="#00f2fe" stroke-width="2.5" opacity="0.6" stroke-dasharray="8 6">
          <animate attributeName="stroke-dashoffset" values="0;100" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M 160 388 Q 350 405 500 398 Q 650 405 840 388" stroke="#4facfe" stroke-width="1.5" opacity="0.4" stroke-dasharray="12 8">
          <animate attributeName="stroke-dashoffset" values="0;-100" dur="6s" repeatCount="indefinite" />
        </path>

        <!-- TITANIC HULL STRUCTURE -->
        <g id="mainShipHull">
          <!-- Main Black/Dark Navy Hull -->
          <path d="M 150 280 
                   L 820 280 
                   Q 870 280 890 320 
                   L 840 375 
                   Q 830 382 800 382 
                   L 180 382 
                   Q 140 380 120 330 Z" 
                fill="url(#hullGradient)" 
                stroke="rgba(0, 242, 254, 0.3)" 
                stroke-width="2" />

          <!-- Lower Red Keel Stripe -->
          <path d="M 130 355 L 860 355 Q 850 375 800 382 L 180 382 Q 140 380 130 355 Z" fill="#9e1b32" opacity="0.85" />
          <path d="M 130 355 L 860 355" stroke="#f35588" stroke-width="2" filter="url(#neonCyanGlow)" />

          <!-- Superstructure Promenade Decks (Glassmorphic White/Light Steel) -->
          <!-- B-Deck -->
          <rect x="220" y="240" width="560" height="40" rx="4" fill="url(#deckGradient)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" />
          <!-- A-Deck -->
          <rect x="260" y="205" width="480" height="35" rx="4" fill="url(#deckGradient)" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" />
          <!-- Boat Deck & Bridge -->
          <rect x="300" y="175" width="400" height="30" rx="4" fill="#0f2545" stroke="rgba(0, 242, 254, 0.4)" stroke-width="1" />
          <!-- Captain Bridge Wheelhouse -->
          <path d="M 280 205 L 300 175 L 340 175 L 340 205 Z" fill="#1e3a60" stroke="rgba(0, 242, 254, 0.5)" />

          <!-- Glowing Portholes & Promenade Cabin Lights -->
          <!-- Hull Porthole Row -->
          <g id="portholes" fill="#ffb703" filter="url(#neonCyanGlow)">
            ${this.generatePortholes(190, 310, 640, 26, 4)}
            ${this.generatePortholes(210, 335, 600, 24, 3.5)}
          </g>

          <!-- Promenade Deck Windows (Glowing Warm Yellow & Cyan AI Nodes) -->
          <g id="deckWindows">
            ${this.generateSquareWindows(230, 250, 530, 16, 12, 18, "#00f2fe")}
            ${this.generateSquareWindows(270, 215, 450, 14, 10, 15, "#ffb703")}
            ${this.generateSquareWindows(310, 183, 370, 12, 8, 12, "#ffffff")}
          </g>

          <!-- 4 ICONIC SMOKESTACKS (FUNNELS) -->
          <g id="funnels">
            <!-- Funnel 1 -->
            <path d="M 360 175 L 372 90 L 392 90 L 384 175 Z" fill="url(#funnelGradient)" stroke="rgba(255, 183, 3, 0.6)" stroke-width="1" />
            <rect x="371" y="90" width="21" height="18" fill="#030812" />

            <!-- Funnel 2 -->
            <path d="M 440 175 L 452 90 L 472 90 L 464 175 Z" fill="url(#funnelGradient)" stroke="rgba(255, 183, 3, 0.6)" stroke-width="1" />
            <rect x="451" y="90" width="21" height="18" fill="#030812" />

            <!-- Funnel 3 -->
            <path d="M 520 175 L 532 90 L 552 90 L 544 175 Z" fill="url(#funnelGradient)" stroke="rgba(255, 183, 3, 0.6)" stroke-width="1" />
            <rect x="531" y="90" width="21" height="18" fill="#030812" />

            <!-- Funnel 4 (Dummy Funnel) -->
            <path d="M 600 175 L 612 90 L 632 90 L 624 175 Z" fill="url(#funnelGradient)" stroke="rgba(255, 183, 3, 0.6)" stroke-width="1" />
            <rect x="611" y="90" width="21" height="18" fill="#030812" />
          </g>

          <!-- Fore & Aft Masts with Riggings & AI Beacon Lights -->
          <!-- Foremast -->
          <line x1="240" y1="240" x2="210" y2="70" stroke="#4facfe" stroke-width="3" filter="url(#neonCyanGlow)" />
          <!-- Crow's Nest -->
          <rect x="203" y="110" width="14" height="12" rx="2" fill="#0b172a" stroke="#00f2fe" stroke-width="1" />
          <circle cx="210" cy="70" r="4" fill="#00f2fe" filter="url(#neonCyanGlow)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </circle>

          <!-- Mainmast (Aft) -->
          <line x1="730" y1="240" x2="760" y2="90" stroke="#4facfe" stroke-width="3" filter="url(#neonCyanGlow)" />
          <circle cx="760" cy="90" r="4" fill="#f35588" filter="url(#neonCyanGlow)">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
          </circle>

          <!-- Rigging Cable Lines -->
          <line x1="210" y1="70" x2="150" y2="280" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
          <line x1="210" y1="70" x2="300" y2="175" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
          <line x1="760" y1="90" x2="680" y2="175" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
          <line x1="760" y1="90" x2="820" y2="280" stroke="rgba(255,255,255,0.2)" stroke-width="1" />

          <!-- AI DATA SCANNING BEAM & ML CIRCUITS -->
          <g id="aiCircuitOverlay" opacity="0.7">
            <!-- Neon Cyan Beam Sweeping Bow to Stern -->
            <path d="M 210 70 L 380 90 L 600 380 Z" fill="url(#glowLaser)" opacity="0.25">
              <animate attributeName="opacity" values="0.1;0.45;0.1" dur="4s" repeatCount="indefinite" />
            </path>
          </g>

          <!-- ANIMATED SMOKESTACK STEAM PARTICLES -->
          <g id="steamParticles">
            <circle cx="382" cy="75" r="12" fill="rgba(0, 242, 254, 0.3)" filter="url(#softSmokeBlur)">
              <animate attributeName="cy" values="75;20" dur="3s" repeatCount="indefinite" />
              <animate attributeName="r" values="12;35" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="462" cy="75" r="14" fill="rgba(79, 172, 254, 0.3)" filter="url(#softSmokeBlur)">
              <animate attributeName="cy" values="75;15" dur="3.4s" begin="0.5s" repeatCount="indefinite" />
              <animate attributeName="r" values="14;40" dur="3.4s" begin="0.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0" dur="3.4s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="542" cy="75" r="10" fill="rgba(121, 40, 202, 0.3)" filter="url(#softSmokeBlur)">
              <animate attributeName="cy" values="75;25" dur="2.8s" begin="1s" repeatCount="indefinite" />
              <animate attributeName="r" values="10;30" dur="2.8s" begin="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="2.8s" begin="1s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
      </svg>
    `;

    this.container.innerHTML = svgHTML;
  }

  generatePortholes(startX, y, totalWidth, count, radius) {
    let result = '';
    const step = totalWidth / count;
    for (let i = 0; i < count; i++) {
      const cx = startX + i * step;
      result += `<circle cx="${cx}" cy="${y}" r="${radius}" />`;
    }
    return result;
  }

  generateSquareWindows(startX, y, totalWidth, count, width, height, color) {
    let result = '';
    const step = totalWidth / count;
    for (let i = 0; i < count; i++) {
      const x = startX + i * step;
      result += `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="2" fill="${color}" opacity="0.9" />`;
    }
    return result;
  }
}

// Auto-initialize when target exists
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('shipStage')) {
    window.titanicShip = new TitanicShipIllustration('shipStage');
  }
});
