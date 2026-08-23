import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let errors = 0;
let passed = 0;

function checkFileNotContains(relPath, badPattern, description) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`[FAIL] File not found: ${relPath}`);
    errors++;
    return;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  if (badPattern.test(content)) {
    console.error(`[FAIL] STATIC ASSERTION: ${description} found in ${relPath}`);
    errors++;
  } else {
    console.log(`[PASS] STATIC ASSERTION: ${description} strictly absent in ${relPath}`);
    passed++;
  }
}

function checkFileContains(relPath, goodPattern, description) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`[FAIL] File not found: ${relPath}`);
    errors++;
    return;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  if (goodPattern.test(content)) {
    console.log(`[PASS] STATIC ASSERTION: ${description} present in ${relPath}`);
    passed++;
  } else {
    console.error(`[FAIL] STATIC ASSERTION: Missing required pattern: ${description} in ${relPath}`);
    errors++;
  }
}

function checkRepoWideNotContains(dirRelPath, badPattern, description) {
  const dirPath = path.join(rootDir, dirRelPath);
  let found = false;
  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const fullPath = path.join(dir, f);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && f !== 'node_modules' && f !== 'dist' && f !== '.git') {
        scanDir(fullPath);
      } else if (stat.isFile() && (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js') || f.endsWith('.html'))) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (badPattern.test(content)) {
          console.error(`[FAIL] STATIC ASSERTION: ${description} found in ${path.relative(rootDir, fullPath)}`);
          found = true;
          errors++;
        }
      }
    }
  }
  scanDir(dirPath);
  if (!found) {
    console.log(`[PASS] STATIC ASSERTION: ${description} strictly absent across ${dirRelPath}`);
    passed++;
  }
}

console.log('=== VIETANA PHASE 0 — STATIC ARCHITECTURE ASSERTIONS ===\n');
console.log('NOTE: These automated static checks verify codebase architecture and rule compliance.');
console.log('They DO NOT prove real end-to-end production conversion receipt or live Supabase insertion.\n');

// 1. Old fallback Ads label is absent repository-wide
checkRepoWideNotContains('src', /lI_8CL_m_osZELaTvs0q/i, 'Old Ads fallback label (lI_8CL_m_osZELaTvs0q)');
checkRepoWideNotContains('api', /lI_8CL_m_osZELaTvs0q/i, 'Old Ads fallback label in API');

// 2. analytics.ts does not contain hardcoded fallback conversion behavior
checkFileNotContains('src/utils/analytics.ts', /\|\|\s*['"][a-zA-Z0-9_-]{10,}/, 'Hardcoded fallback conversion label in analytics.ts');

// 3. Google Ads conversion is disabled when VITE_GOOGLE_ADS_LEAD_LABEL is absent
checkFileContains('src/utils/analytics.ts', /if\s*\(\s*adsLabel\s*\)\s*\{\s*trackConversion\(adsLabel\);\s*\}\s*else/, 'Google Ads conversion fail-closed check when VITE_GOOGLE_ADS_LEAD_LABEL is absent');

// 4. generate_lead contains no invented value/currency
checkFileNotContains('src/utils/analytics.ts', /currency:\s*['"]USD['"]|value:\s*50/, 'Invented currency/value in generate_lead');
checkRepoWideNotContains('src/components', /generate_lead/, 'Unauthorized generate_lead events in UI components');

// 5. FIRST_TOUCH_RETENTION_DAYS exists and equals 90
checkFileContains('src/utils/attribution.ts', /export const FIRST_TOUCH_RETENTION_DAYS = 90;/, 'FIRST_TOUCH_RETENTION_DAYS = 90 definition');

// 6. Attribution expiry comparison exists
checkFileContains('src/utils/attribution.ts', /ageDays <= FIRST_TOUCH_RETENTION_DAYS/, 'Attribution age comparison against retention limit');

// 7. Malformed localStorage parsing is handled safely
checkFileContains('src/utils/attribution.ts', /try\s*\{\s*const ftParsed = JSON\.parse/, 'Safe try/catch JSON parsing around localStorage attribution data');

// 8. ThankYouPage contains no conversion firing
checkFileNotContains('src/components/ThankYouPage.tsx', /gtag|trackConversion|generate_lead/i, 'Conversion tracking on ThankYouPage mount');

// 9. WhatsApp utilities contain no Ads conversion firing
checkFileNotContains('src/utils/whatsapp.ts', /trackConversion|gtag/i, 'Google Ads conversion tracking in WhatsApp builder');
checkFileNotContains('src/components/Contact.tsx', /trackConversion/i, 'trackConversion import/call in Contact.tsx');
checkFileNotContains('src/components/ui/WhatsAppPopup.tsx', /trackConversion|gtag/i, 'Google Ads conversion tracking in WhatsAppPopup');

// 10. Automatic drawer timers remain absent
checkFileNotContains('src/App.tsx', /autoOpenTimer/i, 'autoOpenTimer ref/logic in App.tsx');
checkFileNotContains('src/components/ThingsToDo.tsx', /autoOpenTimer/i, 'autoOpenTimer ref/logic in ThingsToDo.tsx');

// 11. stale triggerRef remains absent
checkFileNotContains('src/components/ThingsToDo.tsx', /triggerRef/i, 'stale triggerRef attribute');

// 12. Canonical lead forms use backend-confirmed success architecture
const forms = [
  'src/components/Hero.tsx',
  'src/components/CustomTripBuilder.tsx',
  'src/components/InquiryForm.tsx',
  'src/components/QuickQuoteSection.tsx'
];

forms.forEach(form => {
  checkFileContains(form, /handleLeadSuccess/, `Canonical handleLeadSuccess call in ${form}`);
  checkFileContains(form, /getAttributionPayload\(\)/, `getAttributionPayload call in ${form}`);
  checkFileContains(form, /result\.leadId/, `Verification of result.leadId before handleLeadSuccess in ${form}`);
});

// 13. API inquiry explicitly maps attribution columns and verifies saved lead ID
checkFileContains('api/inquiry.js', /utm_source:\s*\(attribution\s*&&\s*attribution\.utm_source\)/, 'Explicit mapping of utm_source in api/inquiry.js');
checkFileContains('api/inquiry.js', /!data\[0\]\.id/, 'Validation of savedLead.id in api/inquiry.js');

console.log('\n======================================================');
console.log(`Static Assertion Summary: ${passed} Passed | ${errors} Failed`);
if (errors > 0) {
  console.error('STATIC ASSERTION AUDIT FAILED: Please fix errors above.');
  process.exit(1);
} else {
  console.log('STATIC ARCHITECTURE ASSERTIONS PASSED: Phase 0 architecture verified!');
  process.exit(0);
}
