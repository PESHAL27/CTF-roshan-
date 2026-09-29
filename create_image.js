const fs = require('fs');

// Create an SVG-based Cyber Security Badge image
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a1526"/>
      <stop offset="50%" stop-color="#040912"/>
      <stop offset="100%" stop-color="#0e1f38"/>
    </linearGradient>
    <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00e5ff"/>
      <stop offset="100%" stop-color="#00ff9d"/>
    </linearGradient>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 229, 255, 0.07)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="600" height="340" rx="16" fill="url(#bg)" stroke="#1c4778" stroke-width="2"/>
  <rect width="600" height="340" rx="16" fill="url(#grid)"/>

  <!-- Top Accent Bar -->
  <rect x="0" y="0" width="600" height="6" fill="url(#neon)"/>

  <!-- Header Badge -->
  <rect x="25" y="24" width="130" height="26" rx="4" fill="rgba(0, 229, 255, 0.15)" stroke="#00e5ff" stroke-width="1"/>
  <text x="90" y="41" font-family="Courier New, monospace" font-size="11" font-weight="bold" fill="#00e5ff" text-anchor="middle" letter-spacing="1">CLASSIFIED</text>

  <text x="575" y="42" font-family="Courier New, monospace" font-size="12" fill="#8ba5c4" text-anchor="end">CLEARANCE ID: #8849-DFIR</text>

  <!-- Title -->
  <text x="25" y="85" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ffffff" letter-spacing="1">CYBER DEFENSE INTELLIGENCE</text>
  <text x="25" y="106" font-family="Courier New, monospace" font-size="13" fill="#00ff9d">RESTRICTED OPERATIVE IDENTITY CARD</text>

  <line x1="25" y1="122" x2="575" y2="122" stroke="rgba(0, 229, 255, 0.25)" stroke-width="1"/>

  <!-- Security Chip Graphic -->
  <rect x="25" y="145" width="56" height="42" rx="6" fill="#c49733" stroke="#f5cb5c" stroke-width="1.5"/>
  <line x1="25" y1="166" x2="81" y2="166" stroke="#946d1e" stroke-width="1.5"/>
  <line x1="53" y1="145" x2="53" y2="187" stroke="#946d1e" stroke-width="1.5"/>

  <!-- Operative Info -->
  <text x="98" y="156" font-family="Courier New, monospace" font-size="11" fill="#7a97b8">SUBJECT ROLE:</text>
  <text x="98" y="174" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#ffffff">CTF FORENSIC CADET</text>

  <text x="98" y="202" font-family="Courier New, monospace" font-size="11" fill="#7a97b8">AUTH STATUS: <tspan fill="#00ff9d">ACTIVE VERIFIED</tspan></text>

  <!-- Steganography Hidden Key Banner -->
  <rect x="25" y="225" width="550" height="52" rx="8" fill="rgba(4, 15, 28, 0.9)" stroke="rgba(0, 255, 157, 0.4)" stroke-width="1.5"/>
  <text x="40" y="246" font-family="Courier New, monospace" font-size="11" fill="#ffb800" font-weight="bold">🔍 EMBEDDED WATERMARK KEY:</text>
  <text x="40" y="266" font-family="Courier New, monospace" font-size="16" font-weight="bold" fill="#00ff9d" letter-spacing="1">FLAG{P1CTUR3_ST3G0_2026}</text>

  <!-- Barcode bottom -->
  <g fill="#4a6f99" transform="translate(420, 145)">
    <rect x="0" width="3" height="40"/>
    <rect x="6" width="6" height="40"/>
    <rect x="15" width="2" height="40"/>
    <rect x="20" width="8" height="40"/>
    <rect x="31" width="3" height="40"/>
    <rect x="37" width="5" height="40"/>
    <rect x="45" width="2" height="40"/>
    <rect x="50" width="7" height="40"/>
    <rect x="60" width="4" height="40"/>
    <rect x="67" width="2" height="40"/>
    <rect x="72" width="6" height="40"/>
    <rect x="81" width="3" height="40"/>
    <rect x="87" width="7" height="40"/>
    <rect x="97" width="4" height="40"/>
    <rect x="104" width="2" height="40"/>
    <rect x="109" width="5" height="40"/>
  </g>
  <text x="480" y="196" font-family="Courier New, monospace" font-size="10" fill="#7a97b8" text-anchor="middle">SEC-ID: 99401-X</text>

  <!-- Footer Watermark -->
  <text x="300" y="315" font-family="Courier New, monospace" font-size="10" fill="#4a688a" text-anchor="middle" letter-spacing="1">CYBERTHON FORENSICS EVIDENCE ARTIFACT • CONFIDENTIAL</text>
</svg>`;

// Also save an SVG file
fs.writeFileSync('c:/Users/pecul/Desktop/roshan/challenge_badge.svg', svg, 'utf8');

// Also create a challenge_image.png file containing the image bytes and embedded comment
const zlib = require('zlib');
function createStegoPNG(width, height) {
  const bytesPerPixel = 4;
  const rawData = Buffer.alloc(height * (width * bytesPerPixel + 1));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0;
    for (let x = 0; x < width; x++) {
      rawData[offset++] = 10;
      rawData[offset++] = 22;
      rawData[offset++] = 40;
      rawData[offset++] = 255;
    }
  }

  const deflated = zlib.deflateSync(rawData);

  function crc32(buf) {
    let table = new Int32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) {
        c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
      }
      table[i] = c;
    }
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ -1) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const body = Buffer.concat([typeBuf, data]);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32(body), 0);
    return Buffer.concat([len, body, crcBuf]);
  }

  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const textKeyword = Buffer.from('Comment\0SECRET_FLAG=FLAG{P1CTUR3_ST3G0_2026}', 'ascii');
  const textChunk = makeChunk('tEXt', textKeyword);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  // Trailing payload comment (visible in Notepad / strings)
  const trailing = Buffer.from('\n\n--- STEGANOGRAPHY METADATA ---\nFLAG: FLAG{P1CTUR3_ST3G0_2026}\n', 'utf8');

  return Buffer.concat([header, ihdrChunk, textChunk, idatChunk, iendChunk, trailing]);
}

const png = createStegoPNG(400, 200);
fs.writeFileSync('c:/Users/pecul/Desktop/roshan/challenge_image.png', png);
console.log('Generated challenge_badge.svg and challenge_image.png successfully');
