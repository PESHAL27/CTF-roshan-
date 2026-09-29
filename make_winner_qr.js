const QRCode = require('qrcode');
const fs = require('fs');

async function makeWinnerQR() {
  const url = 'http://localhost:8080/winner_portal.html';

  // Generate SVG QR code
  const qrSvg = await QRCode.toString(url, {
    type: 'svg',
    margin: 1,
    color: {
      dark: '#030811',
      light: '#ffffff'
    }
  });

  const pathMatch = qrSvg.match(/<path[^>]+>/);
  const qrPath = pathMatch ? pathMatch[0] : '';

  const framedSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="420" viewBox="0 0 360 420">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffd700"/>
        <stop offset="50%" stop-color="#ffae00"/>
        <stop offset="100%" stop-color="#ff8800"/>
      </linearGradient>
      <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="rgba(255, 184, 0, 0.4)"/>
      </filter>
    </defs>

    <rect width="360" height="420" rx="18" fill="#08101d" stroke="url(#goldGrad)" stroke-width="2.5" filter="url(#goldGlow)"/>

    <text x="180" y="32" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="bold" fill="#ffd700" text-anchor="middle" letter-spacing="1.5">🏆 WINNER'S ACCESS PASS 🏆</text>
    <text x="180" y="50" font-family="'Outfit', sans-serif" font-size="11" fill="#8ba5c4" text-anchor="middle">Scan to unlock the Final Champion Riddle</text>

    <!-- QR code background card -->
    <g transform="translate(45, 68)">
      <rect width="270" height="270" rx="14" fill="#ffffff" stroke="#ffeaa7" stroke-width="3"/>
      <g transform="translate(15, 15) scale(6.85)">
        ${qrPath}
      </g>
    </g>

    <text x="180" y="372" font-family="'Outfit', sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">SCAN WITH PHONE CAMERA</text>
    <text x="180" y="392" font-family="'JetBrains Mono', monospace" font-size="11" fill="#00ff9d" text-anchor="middle">OR CLICK TO OPEN WINNER PORTAL</text>
  </svg>`;

  fs.writeFileSync('c:/Users/pecul/Desktop/roshan/winner_qr.svg', framedSvg, 'utf8');
  console.log('winner_qr.svg generated successfully');

  // Also create PNG version
  await QRCode.toFile('c:/Users/pecul/Desktop/roshan/winner_qr.png', url, {
    width: 400,
    margin: 2,
    color: {
      dark: '#030811',
      light: '#ffffff'
    }
  });
  console.log('winner_qr.png generated successfully');
}

makeWinnerQR();
