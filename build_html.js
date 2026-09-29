const fs = require('fs');

const level2Txt = fs.readFileSync('c:/Users/pecul/Desktop/roshan/level2_challenge.txt', 'utf8');
const level2TxtJson = JSON.stringify(level2Txt);

const appleSvg = fs.readFileSync('c:/Users/pecul/Desktop/roshan/challenge_apple.svg', 'utf8');
const applePngBase64 = fs.readFileSync('c:/Users/pecul/Desktop/roshan/challenge_apple.png').toString('base64');

const winnerQrSvg = fs.readFileSync('c:/Users/pecul/Desktop/roshan/winner_qr.svg', 'utf8');
const winnerQrPngBase64 = fs.readFileSync('c:/Users/pecul/Desktop/roshan/winner_qr.png').toString('base64');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CYBERTHON • 1st Year CTF Cyber Challenge</title>
<!-- 🕵️ CLUE FOR AGENTS: The Level 1 secret is encoded in Hex: 464c41477b57334c43304d335f54305f43594233527d (Convert Hex to text!) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
:root {
  --bg-dark: #070d18;
  --bg-card: rgba(14, 25, 43, 0.88);
  --bg-card-border: rgba(56, 112, 179, 0.35);
  --bg-terminal: #040912;
  --primary-neon: #00ff9d;
  --cyan-neon: #00e5ff;
  --amber-neon: #ffb800;
  --gold-neon: #ffd700;
  --danger-neon: #ff3864;
  --text-main: #e2eeff;
  --text-dim: #8ba5c4;
}

* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  background-color: var(--bg-dark);
  background-image: 
    radial-gradient(ellipse at 50% 0%, rgba(0, 229, 255, 0.12) 0%, transparent 60%),
    linear-gradient(rgba(0, 255, 157, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 157, 0.02) 1px, transparent 1px);
  background-size: 100% 100%, 32px 32px, 32px 32px;
  color: var(--text-main);
  min-height: 100vh;
  line-height: 1.5;
}

header {
  padding: 36px 20px 24px;
  text-align: center;
  background: linear-gradient(180deg, rgba(16, 43, 78, 0.7) 0%, rgba(7, 13, 24, 0.95) 100%);
  border-bottom: 1px solid rgba(0, 229, 255, 0.2);
  position: relative;
}

header::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--cyan-neon), var(--primary-neon), transparent);
}

.glitch-title {
  margin: 0;
  font-size: 42px;
  font-weight: 800;
  letter-spacing: 3px;
  background: linear-gradient(135deg, #ffffff 20%, var(--cyan-neon) 60%, var(--primary-neon) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
}

.subtitle {
  color: var(--cyan-neon);
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  letter-spacing: 1.5px;
  margin-top: 6px;
}

.wrap {
  max-width: 920px;
  margin: 20px auto 60px;
  padding: 0 18px;
}

/* Sticky HUD */
.hud {
  background: rgba(10, 21, 38, 0.94);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 229, 255, 0.35);
  border-radius: 14px;
  padding: 16px 22px;
  margin-bottom: 24px;
  position: sticky;
  top: 12px;
  z-index: 100;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(0, 229, 255, 0.1);
}

.hud-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.hud-stat {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hud-val {
  color: var(--primary-neon);
  font-size: 17px;
}

.hud-penalty {
  color: var(--danger-neon);
  font-size: 14px;
}

.rank-badge {
  background: rgba(0, 229, 255, 0.15);
  border: 1px solid var(--cyan-neon);
  color: var(--cyan-neon);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
}

.sound-toggle {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: var(--text-dim);
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
}
.sound-toggle:hover { color: #fff; border-color: #fff; }

.progress-track {
  height: 8px;
  background: rgba(255,255,255,0.06);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 12px;
}

.progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--cyan-neon), var(--primary-neon));
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 0 12px var(--primary-neon);
}

/* Challenge Cards */
.card {
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--bg-card-border);
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.35);
  transition: all 0.3s ease;
  position: relative;
}

.card.active {
  border-color: rgba(0, 255, 157, 0.45);
  box-shadow: 0 10px 35px rgba(0,0,0,0.45), 0 0 20px rgba(0, 255, 157, 0.08);
}

.card.completed {
  border-color: rgba(0, 255, 157, 0.3);
  background: rgba(9, 28, 28, 0.55);
}

.card.failed-card {
  border-color: rgba(255, 56, 100, 0.45) !important;
  background: rgba(38, 12, 20, 0.65) !important;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.tag {
  background: rgba(28, 82, 150, 0.35);
  border: 1px solid rgba(0, 229, 255, 0.4);
  color: var(--cyan-neon);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
}

.tag-level {
  background: rgba(0, 255, 157, 0.12);
  border-color: rgba(0, 255, 157, 0.35);
  color: var(--primary-neon);
}

.points {
  font-family: 'JetBrains Mono', monospace;
  color: var(--primary-neon);
  font-weight: 700;
  font-size: 14px;
}

h2 {
  margin: 0 0 8px 0;
  font-size: 22px;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mission {
  color: var(--text-dim);
  font-size: 15px;
  line-height: 1.6;
  margin: 8px 0 14px 0;
}

/* Terminal / Code Box */
.terminal-box {
  background: var(--bg-terminal);
  border: 1px solid rgba(0, 229, 255, 0.22);
  border-radius: 10px;
  padding: 14px 16px;
  margin: 14px 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13.5px;
  color: #79ffe1;
  position: relative;
  word-break: break-all;
}

.terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-dim);
  font-size: 11px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding-bottom: 6px;
  margin-bottom: 8px;
}

.apple-preview {
  text-align: center;
  margin: 16px 0;
  padding: 14px;
  background: #040912;
  border: 1px solid rgba(255, 77, 77, 0.3);
  border-radius: 12px;
}

.apple-preview svg {
  max-width: 380px;
  width: 100%;
  height: auto;
  border-radius: 12px;
  transition: transform 0.25s ease;
  cursor: pointer;
}

.apple-preview svg:hover {
  transform: scale(1.02);
}

.paragraph-box {
  background: #040a14;
  border: 1px solid rgba(0, 229, 255, 0.25);
  border-radius: 10px;
  padding: 18px 20px;
  margin: 14px 0;
  font-family: 'Outfit', sans-serif;
  font-size: 15.5px;
  line-height: 1.8;
  color: #d6e5fa;
  letter-spacing: 0.3px;
}

.input-row {
  display: flex;
  gap: 10px;
  margin-top: 14px;
  flex-wrap: wrap;
}

input {
  flex: 1;
  min-width: 240px;
  padding: 13px 16px;
  border-radius: 8px;
  border: 1px solid #234973;
  background: #040c17;
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  outline: none;
  transition: all 0.2s ease;
}

input:focus {
  border-color: var(--cyan-neon);
  box-shadow: 0 0 14px rgba(0, 229, 255, 0.25);
}

button {
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-submit {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  color: white;
}
.btn-submit:hover {
  background: linear-gradient(135deg, #1ad0ff, #1a82ff);
  box-shadow: 0 4px 16px rgba(0, 114, 255, 0.35);
  transform: translateY(-1px);
}

.btn-hint {
  background: rgba(255, 184, 0, 0.12);
  border: 1px solid rgba(255, 184, 0, 0.35);
  color: var(--amber-neon);
}
.btn-hint:hover { background: rgba(255, 184, 0, 0.22); }

.btn-download {
  background: linear-gradient(135deg, #00b09b, #96c93d);
  color: #03140e;
  font-weight: 800;
}
.btn-download:hover {
  box-shadow: 0 4px 18px rgba(0, 255, 157, 0.35);
  transform: translateY(-1px);
}

.btn-copy {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.15);
  color: var(--text-dim);
  padding: 4px 8px;
  font-size: 11px;
  border-radius: 5px;
}
.btn-copy:hover {
  background: rgba(255,255,255,0.15);
  color: #fff;
}

.hint-text {
  display: none;
  background: rgba(255, 184, 0, 0.08);
  border-left: 3px solid var(--amber-neon);
  color: #ffd978;
  padding: 12px 14px;
  border-radius: 0 8px 8px 0;
  margin-top: 12px;
  font-size: 14px;
}

.result {
  min-height: 22px;
  margin-top: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  font-size: 14px;
}
.result.success { color: var(--primary-neon); }
.result.error { color: var(--danger-neon); }
.result.canary {
  color: var(--amber-neon);
  background: rgba(255, 184, 0, 0.1);
  border: 1px solid rgba(255, 184, 0, 0.4);
  padding: 10px 12px;
  border-radius: 8px;
}

.card.locked {
  opacity: 0.45;
  pointer-events: none;
  filter: grayscale(0.5);
  position: relative;
}

.card.locked::after {
  content: '🔒 LOCKED • COMPLETE PREVIOUS LEVEL';
  position: absolute;
  top: 16px;
  right: 18px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--danger-neon);
  background: rgba(255, 56, 100, 0.12);
  border: 1px solid rgba(255, 56, 100, 0.3);
  padding: 3px 8px;
  border-radius: 6px;
}

/* Finish Screen */
#finish {
  display: none;
  text-align: center;
  padding: 44px 28px;
  background: radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.12) 0%, rgba(14, 25, 43, 0.96) 75%);
  border: 2px solid var(--gold-neon);
  box-shadow: 0 0 50px rgba(255, 215, 0, 0.2);
}

.winner-qr-box {
  margin: 22px auto;
  max-width: 360px;
  background: #040a14;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(255, 215, 0, 0.35);
  box-shadow: 0 8px 30px rgba(0,0,0,0.5);
}

.winner-qr-box svg {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.winner-qr-box svg:hover {
  transform: scale(1.02);
}

.shake {
  animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-2px, 0, 0); }
  20%, 80% { transform: translate3d(3px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

.footer {
  text-align: center;
  color: var(--text-dim);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  padding: 35px 20px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
</style>
</head>
<body>

<header>
  <div class="glitch-title">CYBERTHON</div>
  <div class="subtitle">🎯 7-Level Capture The Flag • Training Quest</div>
</header>

<div class="wrap">
  <!-- Sticky HUD -->
  <div class="hud">
    <div class="hud-top">
      <div class="hud-stat">
        <span>🏁 Flags:</span>
        <span class="hud-val"><span id="flags">0</span>/7</span>
      </div>
      <div class="hud-stat">
        <span>🏆 Score:</span>
        <span class="hud-val" id="score">0</span>
        <span style="color:var(--text-dim); font-size:12px;">/700</span>
      </div>
      <div class="hud-stat">
        <span>⚠️ Penalties:</span>
        <span class="hud-penalty"><span id="penalties">0</span> (<span id="penaltyPts">0</span> pts)</span>
      </div>
      <div class="hud-stat">
        <span class="rank-badge" id="rankBadge">LEVEL 1 RECRUIT</span>
        <button class="sound-toggle" id="soundBtn" onclick="toggleAudio()">🔊 Audio: ON</button>
      </div>
    </div>
    <div class="progress-track">
      <div class="progress-fill" id="progressFill"></div>
    </div>
  </div>

  <!-- LEVEL 1 -->
  <section class="card active" id="level1">
    <div class="card-top">
      <div class="tag-group">
        <span class="tag tag-level">LEVEL 1 • WEB INSPECT</span>
        <span class="tag">TRICKY CLUE</span>
      </div>
      <span class="points">100 POINTS</span>
    </div>
    <h2>🔎 Inspect The Source</h2>
    <p class="mission">
      A secret agent left a hidden clue inside the HTML source of this webpage!
      Inspect the page source (<kbd>Ctrl + U</kbd> or right-click ➔ <b>View page source</b>).
      Find the hidden agent comment. The flag is stored inside as <b>Hexadecimal</b>.
      Convert the Hex into plain text to capture your first flag!
    </p>
    <div class="terminal-box">
      <div class="terminal-header">
        <span>INSPECTION TARGET</span>
        <span>HINT: HTML COMMENTS &lt;!-- ... --&gt;</span>
      </div>
      <div>> Target: Look inside &lt;head&gt; near the top of the HTML page source.</div>
    </div>
    <div class="input-row">
      <input id="answer1" placeholder="Enter FLAG{...}" autocomplete="off" onkeydown="handleKey(event, 1)">
      <button class="btn-submit" onclick="submitFlag(1)">Submit Flag</button>
      <button class="btn-hint" onclick="toggleHint(1)">💡 Hint</button>
    </div>
    <div class="hint-text" id="hint1">
      Press <b>Ctrl + U</b> to view page source. Press <b>Ctrl + F</b> and search for <code>AGENT</code> or <code>Hex</code>.
      You will see a comment with a Hex string starting with <code>464c4147...</code>.
      Paste that string into CyberChef or an online Hex-to-Text decoder to get the flag!
    </div>
    <div class="result" id="result1"></div>
  </section>

  <!-- LEVEL 2 -->
  <section class="card locked" id="level2">
    <div class="card-top">
      <div class="tag-group">
        <span class="tag tag-level">LEVEL 2 • LOG FILE HUNT</span>
        <span class="tag">TOUGH CLUE</span>
      </div>
      <span class="points">100 POINTS</span>
    </div>
    <h2>📄 Tricky File Search</h2>
    <p class="mission">
      Download the server audit log (<code>level2_challenge.txt</code>).
      <br><b>⚠️ TRICKY WARNING:</b> Automated canary traps are planted in the file! If you just search for "FLAG", you will only hit fake honeypot flags.
      <br><b>🔍 YOUR CLUE:</b> Search the log file for <code>user=shadow_agent</code> and <code>STATUS=CONFIDENTIAL</code>.
      Inside that line is an encrypted <b>Base64 payload</b>. Decode it to find the real flag!
    </p>
    <div style="margin: 12px 0;">
      <button id="download2" class="btn-download" onclick="downloadLevel2()">⬇ Download Challenge File (level2_challenge.txt)</button>
    </div>
    <div class="input-row">
      <input id="answer2" placeholder="Enter FLAG{...}" autocomplete="off" onkeydown="handleKey(event, 2)">
      <button class="btn-submit" onclick="submitFlag(2)">Submit Flag</button>
      <button class="btn-hint" onclick="toggleHint(2)">💡 Hint</button>
    </div>
    <div class="hint-text" id="hint2">
      Open <code>level2_challenge.txt</code> in Notepad. Press <b>Ctrl + F</b> and search for <code>shadow_agent</code>.
      Copy the Base64 text inside <code>payload="..."</code> (starts with <code>RkxBR...</code>).
      Decode that Base64 string in CyberChef or any online Base64 decoder!
    </div>
    <div class="result" id="result2"></div>
  </section>

  <!-- LEVEL 3 -->
  <section class="card locked" id="level3">
    <div class="card-top">
      <div class="tag-group">
        <span class="tag tag-level">LEVEL 3 • UTF-16 CIPHER</span>
        <span class="tag">UNICODE ESCAPE</span>
      </div>
      <span class="points">100 POINTS</span>
    </div>
    <h2>🔐 UTF-16 Unicode Cipher</h2>
    <p class="mission">
      Modern software systems encode international text using <b>UTF-16</b> (16-bit Unicode transformation format), commonly represented by <code>\\uXXXX</code> hex escape sequences.
      Decode this intercepted UTF-16 sequence to recover the secret flag:
    </p>
    <div class="terminal-box">
      <div class="terminal-header">
        <span>UTF-16 ESCAPE SEQUENCE</span>
        <button class="btn-copy" onclick="copyText('\\\\u0046\\\\u004c\\\\u0041\\\\u0047\\\\u007b\\\\u0055\\\\u0054\\\\u0046\\\\u0031\\\\u0036\\\\u005f\\\\u0044\\\\u0033\\\\u0043\\\\u0030\\\\u0044\\\\u0033\\\\u005f\\\\u0050\\\\u0052\\\\u0030\\\\u007d')">Copy</button>
      </div>
      <div>\\u0046\\u004c\\u0041\\u0047\\u007b\\u0055\\u0054\\u0046\\u0031\\u0036\\u005f\\u0044\\u0033\\u0043\\u0030\\u0044\\u0033\\u005f\\u0050\\u0052\\u0030\\u007d</div>
    </div>
    <div class="input-row">
      <input id="answer3" placeholder="Enter FLAG{...}" autocomplete="off" onkeydown="handleKey(event, 3)">
      <button class="btn-submit" onclick="submitFlag(3)">Submit Flag</button>
      <button class="btn-hint" onclick="toggleHint(3)">💡 Hint</button>
    </div>
    <div class="hint-text" id="hint3">
      Press <b>F12</b> to open your browser Console. Type:<br>
      <code>console.log('\\u0046\\u004c\\u0041\\u0047\\u007b\\u0055\\u0054\\u0046\\u0031\\u0036\\u005f\\u0044\\u0033\\u0043\\u0030\\u0044\\u0033\\u005f\\u0050\\u0052\\u0030\\u007d')</code><br>
      and press Enter! Or in CyberChef, use the <b>Unescape string</b> operation.
    </div>
    <div class="result" id="result3"></div>
  </section>

  <!-- LEVEL 4 -->
  <section class="card locked" id="level4">
    <div class="card-top">
      <div class="tag-group">
        <span class="tag tag-level">LEVEL 4 • WORD CRACK</span>
        <span class="tag">CLEAN THE NOISE</span>
      </div>
      <span class="points">100 POINTS</span>
    </div>
    <h2>✂️ Filter The Noise</h2>
    <p class="mission">
      A radio intercept was contaminated with noise interference!
      Remove every <code>#</code> and <code>@</code> character from the scrambled string below to crack the original flag word:
    </p>
    <div class="terminal-box">
      <div class="terminal-header">
        <span>SCRAMBLED TRANSMISSION</span>
        <button class="btn-copy" onclick="copyText('#F@L#A@G#{#N@E#T@W#O@R#K#_#S@E#C@U#R@E#}')">Copy</button>
      </div>
      <div>#F@L#A@G#{#N@E#T@W#O@R#K#_#S@E#C@U#R@E#}</div>
    </div>
    <div class="input-row">
      <input id="answer4" placeholder="Enter FLAG{...}" autocomplete="off" onkeydown="handleKey(event, 4)">
      <button class="btn-submit" onclick="submitFlag(4)">Submit Flag</button>
      <button class="btn-hint" onclick="toggleHint(4)">💡 Hint</button>
    </div>
    <div class="hint-text" id="hint4">
      Open Notepad, paste the string, press <b>Ctrl + H</b> (Replace), replace <code>#</code> with nothing, then replace <code>@</code> with nothing. You will be left with the flag!
    </div>
    <div class="result" id="result4"></div>
  </section>

  <!-- LEVEL 5 -->
  <section class="card locked" id="level5">
    <div class="card-top">
      <div class="tag-group">
        <span class="tag tag-level">LEVEL 5 • SCAN THE APPLE</span>
        <span class="tag">3 ATTEMPTS RIDDLE</span>
      </div>
      <span class="points" id="level5Points">100 POINTS</span>
    </div>
    <h2>🍏 The Digital Apple Artifact</h2>
    <p class="mission">
      An operative hidden transmission has been encoded into the digital apple picture below.
      Scan the apple with your phone camera or QR scanner (or click on it) to open the secret gateway website.
      Inside that website, solve the Guardian's Riddle.
      <br><b style="color:var(--amber-neon);">⚠️ You have 3 attempts to solve the riddle.</b> If you fail all 3, you fail Level 5 (0 points), but emergency bypass protocol will allow you to advance to Level 6.
    </p>
    <div class="apple-preview">
      <a href="secret_apple_vault.html" target="_blank" title="Click or Scan Apple to open secret website">
        ${appleSvg}
      </a>
      <div style="margin-top: 10px;">
        <a href="secret_apple_vault.html" target="_blank" style="color:var(--cyan-neon); font-size:13px; font-family:'JetBrains Mono', monospace; text-decoration:none;">
          🔗 Click here to open Secret Apple Vault in a new tab
        </a>
      </div>
    </div>
    <div style="margin: 12px 0;">
      <button class="btn-download" onclick="downloadAppleImage()">⬇ Download Apple Picture (challenge_apple.png)</button>
    </div>
    <div class="input-row">
      <input id="answer5" placeholder="Enter FLAG{...}" autocomplete="off" onkeydown="handleKey(event, 5)">
      <button class="btn-submit" id="btnSubmit5" onclick="submitFlag(5)">Submit Flag</button>
    </div>
    <div class="result" id="result5"></div>
  </section>

  <!-- LEVEL 6 -->
  <section class="card locked" id="level6">
    <div class="card-top">
      <div class="tag-group">
        <span class="tag tag-level">LEVEL 6 • ONE STEP BACK</span>
        <span class="tag">CAESAR SHIFT</span>
      </div>
      <span class="points">100 POINTS</span>
    </div>
    <h2>⬅️ One Step Back</h2>
    <p class="mission">
      Every letter in this secret message was shifted <b>ONE STEP FORWARD</b> in the alphabet (e.g. A becomes B, B becomes C).
      <br>To crack the cipher, shift each letter <b>ONE STEP BACK</b> (B ➔ A, C ➔ B, D ➔ C ...):
    </p>
    <div class="terminal-box">
      <div class="terminal-header">
        <span>SHIFTED CIPHERTEXT</span>
        <button class="btn-copy" onclick="copyText('GMBH{TFDVSJUZ}')">Copy</button>
      </div>
      <div>GMBH{TFDVSJUZ}</div>
    </div>
    <div class="input-row">
      <input id="answer6" placeholder="Enter FLAG{...}" autocomplete="off" onkeydown="handleKey(event, 6)">
      <button class="btn-submit" onclick="submitFlag(6)">Submit Flag</button>
      <button class="btn-hint" onclick="toggleHint(6)">💡 Hint</button>
    </div>
    <div class="hint-text" id="hint6">
      Look at each letter:<br>
      G - 1 = F, M - 1 = L, B - 1 = A, H - 1 = G ➔ <code>FLAG{...}</code><br>
      Now shift each letter inside the brackets back by 1 (T ➔ S, F ➔ E, D ➔ C...)!
    </div>
    <div class="result" id="result6"></div>
  </section>

  <!-- LEVEL 7 -->
  <section class="card locked" id="level7">
    <div class="card-top">
      <div class="tag-group">
        <span class="tag tag-level">LEVEL 7 • PARAGRAPH CRACK</span>
        <span class="tag">ACROSTIC STEGANOGRAPHY</span>
      </div>
      <span class="points">100 POINTS</span>
    </div>
    <h2>🧩 Crack Words From A Sentence</h2>
    <p class="mission">
      An intelligence analyst recorded the following incident briefing.
      Carefully examine the paragraph. A secret word is hidden in plain sight:
      a few letters are capitalized (without any bold text).
      Find all the capital letters in order, assemble them into the secret word, and wrap it inside <code>FLAG{...}</code>:
    </p>
    <div class="paragraph-box">
      in the quiet hours of digital forensics, our analysts notice unusual network telemetry. Fibers of optical cable carried silent pulses across the gateway. monitoring tools Inspect millions of packets every minute to detect unauthorized activity. when an anomaly was detected, an automated Routine began logging system events. Every connection was tested against perimeter security policies. Without hesitation, the intrusion detection system blocked the suspicious traffic. All security ledger entries were archived in encrypted containers. Logs of the incident were reviewed by the security team. Lastly, the engineers confirmed that the network was completely protected.
    </div>
    <div class="input-row">
      <input id="answer7" placeholder="Enter FLAG{...}" autocomplete="off" onkeydown="handleKey(event, 7)">
      <button class="btn-submit" onclick="submitFlag(7)">Submit Flag</button>
    </div>
    <div class="result" id="result7"></div>
  </section>

  <!-- FINISH SCREEN WITH WINNER'S QR CODE -->
  <section class="card" id="finish">
    <div style="font-size: 58px; margin-bottom: 6px;">🏆</div>
    <h2 style="justify-content: center; color: var(--gold-neon); font-size: 34px; letter-spacing: 1px;">QUEST COMPLETE • ALL FLAGS CAPTURED!</h2>
    <p class="mission" style="font-size: 17px; max-width: 620px; margin: 12px auto 20px;">
      Incredible work! You conquered the cyber challenges and achieved a final score of <b style="color: var(--primary-neon);"><span id="finalScore">700</span>/700</b>!
    </p>

    <!-- Winner's QR Code Section -->
    <div class="winner-qr-box">
      <div style="font-family:'JetBrains Mono', monospace; font-size:12px; font-weight:bold; color:var(--gold-neon); margin-bottom:10px;">
        👑 WINNER'S CHAMPION PORTAL PASS 👑
      </div>
      <a href="winner_portal.html" target="_blank" title="Scan or Click to open Winner Portal">
        ${winnerQrSvg}
      </a>
      <div style="margin-top: 14px;">
        <a href="winner_portal.html" target="_blank" style="display:inline-block; padding:10px 20px; background:linear-gradient(135deg, #ffd700, #ff8800); color:#050a14; font-family:'Outfit',sans-serif; font-weight:800; font-size:14px; text-decoration:none; border-radius:8px; box-shadow:0 4px 15px rgba(255,215,0,0.35);">
          🔓 Open Final Champion Riddle Portal
        </a>
      </div>
      <div style="margin-top: 10px;">
        <button class="btn-download" style="padding:8px 14px; font-size:12px;" onclick="downloadWinnerQR()">⬇ Download Winner QR (winner_qr.png)</button>
      </div>
    </div>

    <div class="rank-badge" style="font-size: 15px; padding: 6px 20px; display: inline-block; margin-top: 10px; border-color: var(--gold-neon); color: var(--gold-neon);">
      STATUS: VERIFIED CYBER CHAMPION
    </div>
  </section>
</div>

<div class="footer">
  CYBERTHON • 1st Year Capture The Flag Training Arena
</div>

<script>
// Cryptographic SHA-256 verification (Zero plaintext flags in client JavaScript!)
const LEVEL_HASHES = {
  1: "74cd77e767d262f6ce718367016d6cd57c422e9a6420741d0155e3f40db416da",
  2: "84bd2768819d18ad0222c01fe6b5f80795ab11d9b9355b0ffa5657bb2b1c91b7",
  3: "a56fa51a273bff82ea254a38eb362ed5cc3d8af033c1a07eba42bf8989d83f4f",
  4: "b5c490d3762937a8b93329a86c829629b2002f40ba19721fc6e18da6721e96ab",
  5: "1482184581c647617ebb5a358da6979c3e32e98eea1a956d47fa5377d74a82de",
  6: "33736960f46085775e57ea690f2cc247b3466b3259d40141152a155318f38f4d",
  7: "4183943f49b994a8d84c638190bd60621219ef2d911085e5cc6f96e3e994580e"
};

// Bypass Hash for Level 5 (When 3 attempts fail in the riddle vault)
const LEVEL5_BYPASS_HASH = "5cb344641a103a183002bf6f59f4a9b81f45080eff86e6fef965bcf53bc9eea2"; // FLAG{BYPASS_LEVEL5_FAILED}

// Canary Decoys for Level 2
const CANARY_HASHES = {
  "9fd8e9552ea54dd82d3c5d6f094dae61c47ccd2f1a5f5d007d084acdd860f4b9": "⚠️ CANARY TRAP! You submitted 'FLAG{TRY_AGAIN_AMATEUR_DECOY}'. This is a decoy! Read the clue: look for user=shadow_agent and decode the Base64 payload.",
  "37d0598a0e32be7005ad529b57fc6b96bce4f844f3ef89a6f2ccd3125ad1b6af": "⚠️ CANARY TRAP! You submitted 'FLAG{HONEYPOT_DETECTED_NOT_HERE}'. That is a decoy planted for quick searchers. Follow the clue!",
  "d7aefde99188563e84a27c8d984906909a159fcbc006b8231fc250e390bee6bf": "⚠️ CANARY TRAP! You submitted 'FLAG{FALSE_LEAD_KEEP_LOOKING}'. Follow the shadow_agent clue to get the real Base64 flag."
};

const solved = [false, false, false, false, false, false, false];
let level5Failed = false;
let wrongAttempts = 0;
let audioEnabled = true;

function updateScoreHUD() {
  const solvedCount = solved.filter(Boolean).length;
  const currentScore = (solvedCount * 100) - (wrongAttempts * 2);
  document.getElementById('flags').textContent = solvedCount;
  document.getElementById('score').textContent = currentScore;
  document.getElementById('penalties').textContent = wrongAttempts;
  document.getElementById('penaltyPts').textContent = wrongAttempts * 2;
  
  // Progress fill includes levels solved or bypassed
  const progressCount = solvedCount + (level5Failed ? 1 : 0);
  document.getElementById('progressFill').style.width = ((progressCount / 7) * 100) + '%';
  document.getElementById('finalScore').textContent = currentScore;

  const ranks = ['LEVEL 1 RECRUIT', 'SCOUT OPERATIVE', 'CYBER DETECTIVE', 'CODE BREAKER', 'SECURITY CADET', 'CIPHER SPECIALIST', 'CYBER CHAMPION'];
  if (solvedCount > 0) {
    document.getElementById('rankBadge').textContent = ranks[solvedCount - 1] || ranks[0];
  }
}

// Web Audio API Synthesizer
let audioCtx = null;
function playSound(type) {
  if (!audioEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      osc.frequency.setValueAtTime(1046.50, now + 0.24);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.22);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'canary' || type === 'bypass') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(330, now + 0.1);
      osc.frequency.setValueAtTime(440, now + 0.2);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch (e) {}
}

function toggleAudio() {
  audioEnabled = !audioEnabled;
  document.getElementById('soundBtn').textContent = audioEnabled ? '🔊 Audio: ON' : '🔇 Audio: OFF';
}

// SHA-256 calculator
async function sha256(text) {
  const enc = new TextEncoder().encode(text.trim());
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function applyLevel5Bypass() {
  if (solved[4] || level5Failed) return;
  level5Failed = true;

  const card5 = document.getElementById('level5');
  const res5 = document.getElementById('result5');
  const input5 = document.getElementById('answer5');
  const btn5 = document.getElementById('btnSubmit5');
  const pts5 = document.getElementById('level5Points');

  playSound('bypass');
  card5.classList.remove('active');
  card5.classList.add('completed', 'failed-card');
  pts5.textContent = '0 POINTS (FAILED)';
  pts5.style.color = 'var(--danger-neon)';

  if (input5) {
    input5.value = 'FLAG{BYPASS_LEVEL5_FAILED}';
    input5.disabled = true;
  }
  if (btn5) {
    btn5.disabled = true;
    btn5.style.opacity = '0.6';
  }

  res5.className = 'result error';
  res5.style.color = 'var(--danger-neon)';
  res5.innerHTML = '⚠️ <b>LEVEL 5 FAILED (0 / 100 Points)</b> • Riddle attempts exhausted. Emergency bypass protocol accepted. Advancing to Level 6...';

  // Unlock Level 6
  const next = document.getElementById('level6');
  next.classList.remove('locked');
  next.classList.add('active');
  setTimeout(() => next.scrollIntoView({ behavior: 'smooth', block: 'center' }), 450);

  updateScoreHUD();
  checkCTFCompletion();
}

async function submitFlag(n) {
  const inputEl = document.getElementById('answer' + n);
  const resultEl = document.getElementById('result' + n);
  const cardEl = document.getElementById('level' + n);
  const val = inputEl.value.trim();

  if (!val) {
    resultEl.className = 'result error';
    resultEl.textContent = '⚠️ Please enter a flag before submitting.';
    return;
  }

  const hash = await sha256(val);

  // Check Canary Decoys on Level 2
  if (n === 2 && CANARY_HASHES[hash]) {
    playSound('canary');
    wrongAttempts++;
    updateScoreHUD();
    resultEl.className = 'result canary';
    resultEl.textContent = CANARY_HASHES[hash] + ' (-2 marks penalty)';
    cardEl.classList.add('shake');
    setTimeout(() => cardEl.classList.remove('shake'), 450);
    return;
  }

  // Check Level 5 Bypass Code
  if (n === 5 && hash === LEVEL5_BYPASS_HASH) {
    applyLevel5Bypass();
    return;
  }

  if (hash === LEVEL_HASHES[n]) {
    playSound('success');
    if (!solved[n - 1]) {
      solved[n - 1] = true;
      updateScoreHUD();

      cardEl.classList.remove('active');
      cardEl.classList.add('completed');

      if (n < 7) {
        const next = document.getElementById('level' + (n + 1));
        next.classList.remove('locked');
        next.classList.add('active');
        setTimeout(() => next.scrollIntoView({ behavior: 'smooth', block: 'center' }), 400);
      }
    }
    resultEl.className = 'result success';
    resultEl.textContent = n < 7 ? '✓ Correct! Level unlocked. Proceed to next challenge.' : '✓ Correct! All 7 flags captured!';
    
    checkCTFCompletion();
  } else {
    playSound('error');
    wrongAttempts++;
    updateScoreHUD();
    resultEl.className = 'result error';
    resultEl.textContent = '✗ Not correct yet (-2 marks penalty). Try again!';
    cardEl.classList.add('shake');
    setTimeout(() => cardEl.classList.remove('shake'), 450);
  }
}

function checkCTFCompletion() {
  const allCompleted = solved.every((s, idx) => s || (idx === 4 && level5Failed));
  if (allCompleted) {
    document.getElementById('finish').style.display = 'block';
    setTimeout(() => document.getElementById('finish').scrollIntoView({ behavior: 'smooth' }), 450);
  }
}

function handleKey(e, n) {
  if (e.key === 'Enter') submitFlag(n);
}

function toggleHint(n) {
  const el = document.getElementById('hint' + n);
  if (el) {
    el.style.display = el.style.display === 'block' ? 'none' : 'block';
  }
}

function copyText(str) {
  navigator.clipboard.writeText(str).then(() => {
    alert('Copied to clipboard!');
  }).catch(() => {
    prompt('Copy value:', str);
  });
}

const level2File = ${level2TxtJson};

function downloadLevel2() {
  if (!solved[0]) {
    alert('Level 2 is locked! Solve Level 1 first.');
    return;
  }
  const blob = new Blob([level2File], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'level2_challenge.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1500);
}

const applePngData = "${applePngBase64}";

function downloadAppleImage() {
  if (!solved[3]) {
    alert('Level 5 is locked! Solve previous levels first.');
    return;
  }
  const byteChars = atob(applePngData);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/png' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'challenge_apple.png';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1500);
}

const winnerQrPngData = "${winnerQrPngBase64}";

function downloadWinnerQR() {
  const byteChars = atob(winnerQrPngData);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/png' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'winner_qr.png';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1500);
}

// Check for bypass URL query or localStorage on load
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('bypass') === '5' || localStorage.getItem('cyberthon_level5_bypass') === 'true') {
    setTimeout(() => {
      applyLevel5Bypass();
    }, 400);
  }
});
</script>
</body>
</html>`;

fs.writeFileSync('c:/Users/pecul/Desktop/roshan/cyberthon_ctf_locked_download.html', html, 'utf8');
console.log('Successfully compiled updated cyberthon_ctf_locked_download.html with Winner QR (' + Buffer.byteLength(html) + ' bytes)');
