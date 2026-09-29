const fs = require('fs');
const crypto = require('crypto');

function sha256(s) {
  return crypto.createHash('sha256').update(s.trim()).digest('hex');
}

const ctfHtml = fs.readFileSync('c:/Users/pecul/Desktop/roshan/cyberthon_ctf_locked_download.html', 'utf8');
const appleVaultHtml = fs.readFileSync('c:/Users/pecul/Desktop/roshan/secret_apple_vault.html', 'utf8');
const winnerPortalHtml = fs.readFileSync('c:/Users/pecul/Desktop/roshan/winner_portal.html', 'utf8');

let allPassed = true;
function assertTest(desc, condition) {
  if (condition) {
    console.log(`[PASS] ${desc}`);
  } else {
    console.error(`[FAIL] ${desc}`);
    allPassed = false;
  }
}

console.log('=== TEST 1: ALL 7 LEVEL FLAGS & SHA-256 HASHES ===');
const flags = [
  { level: 1, flag: 'FLAG{W3LC0M3_T0_CYB3R}', expectedHash: '74cd77e767d262f6ce718367016d6cd57c422e9a6420741d0155e3f40db416da' },
  { level: 2, flag: 'FLAG{D1GG1NG_D33P_IN_L0GS}', expectedHash: '84bd2768819d18ad0222c01fe6b5f80795ab11d9b9355b0ffa5657bb2b1c91b7' },
  { level: 3, flag: 'FLAG{UTF16_D3C0D3_PR0}', expectedHash: 'a56fa51a273bff82ea254a38eb362ed5cc3d8af033c1a07eba42bf8989d83f4f' },
  { level: 4, flag: 'FLAG{NETWORK_SECURE}', expectedHash: 'b5c490d3762937a8b93329a86c829629b2002f40ba19721fc6e18da6721e96ab' },
  { level: 5, flag: 'FLAG{APP1E_R1DDL3_UNL0CK3D}', expectedHash: '1482184581c647617ebb5a358da6979c3e32e98eea1a956d47fa5377d74a82de' },
  { level: 6, flag: 'FLAG{SECURITY}', expectedHash: '33736960f46085775e57ea690f2cc247b3466b3259d40141152a155318f38f4d' },
  { level: 7, flag: 'FLAG{FIREWALL}', expectedHash: '4183943f49b994a8d84c638190bd60621219ef2d911085e5cc6f96e3e994580e' }
];

flags.forEach(f => {
  const computed = sha256(f.flag);
  assertTest(`Level ${f.level} hash computes to expected: ${computed === f.expectedHash}`, computed === f.expectedHash);
  assertTest(`Level ${f.level} hash embedded in HTML: ${f.expectedHash}`, ctfHtml.includes(f.expectedHash));
});

console.log('\n=== TEST 2: PENALTY SYSTEM (-2 MARKS PER WRONG ATTEMPT) ===');
assertTest('Score formula subtracts (wrongAttempts * 2)', ctfHtml.includes('(wrongAttempts * 2)'));
assertTest('Wrong answer increments wrongAttempts++', ctfHtml.includes('wrongAttempts++'));
assertTest('Penalty HUD displays -2 pts per error', ctfHtml.includes('penalties') && ctfHtml.includes('penaltyPts'));

console.log('\n=== TEST 3: LEVEL 3 UTF-16 CIPHER ===');
assertTest('Level 3 contains UTF-16 Unicode escape sequence', ctfHtml.includes('\\u0046\\u004c\\u0041\\u0047\\u007b\\u0055\\u0054\\u0046\\u0031\\u0036'));
assertTest('Level 3 mentions UTF-16 decode', ctfHtml.includes('UTF-16'));

console.log('\n=== TEST 4: LEVEL 5 APPLE RIDDLE & 3-ATTEMPT VAULT ===');
assertTest('Level 5 contains Apple SVG and QR code', ctfHtml.includes('<svg') && ctfHtml.includes('apple-preview'));
assertTest('Level 5 links to secret_apple_vault.html', ctfHtml.includes('secret_apple_vault.html'));
assertTest('Level 5 has NO hint button', !ctfHtml.includes('toggleHint(5)'));
assertTest('Vault enforces 3-attempt limit', appleVaultHtml.includes('attemptsLeft = 3'));
assertTest('Vault locks out on 3 wrong attempts', appleVaultHtml.includes('renderLockout'));
assertTest('Vault provides bypass link & token on lockout', appleVaultHtml.includes('FLAG{BYPASS_LEVEL5_FAILED}'));
assertTest('Main arena has bypass hash for Level 5', ctfHtml.includes(sha256('FLAG{BYPASS_LEVEL5_FAILED}')));
assertTest('Bypass awards 0 points and unlocks Level 6', ctfHtml.includes('0 / 100 Points') && ctfHtml.includes('level5Failed = true'));

console.log('\n=== TEST 5: LEVEL 7 PARAGRAPH CRACK (NO BOLD, NO HINT) ===');
assertTest('Level 7 has NO hint button', !ctfHtml.includes('toggleHint(7)'));
const level7Section = ctfHtml.substring(ctfHtml.indexOf('id="level7"'), ctfHtml.indexOf('id="finish"'));
assertTest('Level 7 paragraph contains NO <b> or <strong> tags', !level7Section.includes('<b>') && !level7Section.includes('<strong>'));
assertTest('Level 7 paragraph contains capitalized FIREWALL letters', 
  level7Section.includes('Fibers') && 
  level7Section.includes('Inspect') && 
  level7Section.includes('Routine') && 
  level7Section.includes('Every') && 
  level7Section.includes('Without') && 
  level7Section.includes('All') && 
  level7Section.includes('Logs') && 
  level7Section.includes('Lastly'));

console.log('\n=== TEST 6: GRAND FINALE WINNER QR & PORTAL (RIDDLE ANSWER 3,4) ===');
assertTest('Finish screen contains winner-qr-box', ctfHtml.includes('winner-qr-box'));
assertTest('Finish screen links to winner_portal.html', ctfHtml.includes('winner_portal.html'));
assertTest('Finish screen provides downloadWinnerQR()', ctfHtml.includes('downloadWinnerQR()'));
assertTest('winner_portal.html exists and is accessible', winnerPortalHtml.length > 500);
assertTest('winner_portal.html contains the 3,4 coordinate riddle', 
  winnerPortalHtml.includes('3 rows down') && 
  winnerPortalHtml.includes('4 columns across') && 
  winnerPortalHtml.includes('3rd row') && 
  winnerPortalHtml.includes('4th column'));
assertTest('winner_portal.html accepts 3,4 as valid answer', 
  winnerPortalHtml.includes("raw === '3,4'") && 
  winnerPortalHtml.includes("raw === '4,3'") && 
  winnerPortalHtml.includes("raw.includes('3rd row')"));
assertTest('winner_portal.html renders interactive 5x5 matrix grid', winnerPortalHtml.includes('matrixGrid') && winnerPortalHtml.includes('cell_3_4'));
assertTest('winner_portal.html fires celebration confetti', winnerPortalHtml.includes('launchConfetti'));

console.log('\n=============================================');
if (allPassed) {
  console.log('✅ ALL TESTS PASSED! CTF ARENA & WINNER PORTAL FULLY VERIFIED!');
} else {
  console.error('❌ SOME TESTS FAILED. CHECK LOGS ABOVE.');
  process.exit(1);
}
