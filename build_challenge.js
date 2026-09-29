const fs = require('fs');

const decoys = [
  { line: 65, text: '2026-09-29 08:14:22 [DEBUG] test_canary_01: fake_flag="FLAG{TRY_AGAIN_AMATEUR_DECOY}"' },
  { line: 175, text: '2026-09-29 11:22:04 [WARN] intruder_trap: canary_probe="FLAG{HONEYPOT_DETECTED_NOT_HERE}"' },
  { line: 310, text: '2026-09-29 14:05:39 [TRACE] decoy_buffer: legacy_string="FLAG{FALSE_LEAD_KEEP_LOOKING}"' }
];

const secretLine = {
  line: 220,
  text: '2026-09-29 12:45:10 [AUDIT] user=shadow_agent STATUS=CONFIDENTIAL payload="RkxBR3tEMUdHMU5HX0QzM1BfSU5fTDBHU30="'
};

const ips = ['192.168.1.14', '192.168.1.55', '10.0.0.12', '172.16.2.80', '198.51.100.4', '203.0.113.19', '192.168.10.33'];
const endpoints = ['/index.html', '/login.php', '/api/v1/status', '/dashboard', '/assets/app.js', '/favicon.ico', '/healthz', '/auth/token'];
const users = ['admin', 'operator', 'roshan', 'system', 'guest', 'network_svc'];

const header = [
  '================================================================================',
  'CYBERTHON ARCHIVE • SYSTEM ACCESS & AUDIT LOG DUMP',
  'HOST: CAMPUS-SRV-CORE-01 | LOG DATE: 2026-09-29 | LEVEL 2 CHALLENGE FILE',
  '================================================================================',
  'INVESTIGATION NOTE FOR 1ST YEAR CTF OPERATIVES:',
  'This log file records network traffic, user authentications, and system events.',
  'Beware: The system contains CANARY HONEYPOT FLAGS designed to catch lazy searchers.',
  'If you simply search for "FLAG", you will only find fake decoy flags!',
  '',
  'MISSION CLUE:',
  'Locate the confidential audit record associated with: user=shadow_agent',
  'where STATUS=CONFIDENTIAL. The authentic flag is stored in the Base64 payload.',
  'Decode the Base64 string to find the real flag.',
  '================================================================================',
  ''
];

const lines = [...header];
const totalLines = 360;

function pad(n) { return n < 10 ? '0' + n : '' + n; }

for (let i = header.length; i < totalLines; i++) {
  const d = decoys.find(item => item.line === i);
  if (d) {
    lines.push(d.text);
    continue;
  }
  if (i === secretLine.line) {
    lines.push(secretLine.text);
    continue;
  }

  const h = 8 + Math.floor(i / 45);
  const m = (i * 3) % 60;
  const s = (i * 11) % 60;
  const time = '2026-09-29 ' + pad(h) + ':' + pad(m) + ':' + pad(s);

  const type = i % 4;
  if (type === 0) {
    const ip = ips[i % ips.length];
    const ep = endpoints[(i * 2) % endpoints.length];
    const sc = (i % 5 === 0) ? 404 : 200;
    lines.push(time + ' [HTTP] ' + ip + ' GET ' + ep + ' HTTP/1.1 ' + sc + ' bytes=' + (200 + (i * 23) % 4000));
  } else if (type === 1) {
    const u = users[i % users.length];
    const ip = ips[(i + 3) % ips.length];
    lines.push(time + ' [AUTH] sshd[' + (1200 + i) + ']: Accepted password for ' + u + ' from ' + ip + ' port ' + (22000 + i));
  } else if (type === 2) {
    lines.push(time + ' [KERNEL] firewall-rule: ALLOW proto=TCP src=' + ips[i % ips.length] + ' dst=192.168.10.33 dport=443');
  } else {
    lines.push(time + ' [SYS] healthcheck_daemon[' + (200 + (i % 50)) + ']: cluster heartbeat status=OK ping=' + (2 + (i % 8)) + 'ms');
  }
}

const content = lines.join('\n');
fs.writeFileSync('c:/Users/pecul/Desktop/roshan/level2_challenge.txt', content, 'utf8');
console.log('Successfully wrote', lines.length, 'lines to level2_challenge.txt');
