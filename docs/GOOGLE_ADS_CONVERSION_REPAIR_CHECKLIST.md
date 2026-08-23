# GOOGLE ADS CONVERSION REPAIR & CONFIGURATION CHECKLIST
## VIETANA Travel E-Commerce Acquisition Funnel

**Status:** ✅ STATIC ARCHITECTURE ASSERTIONS PASSED | PRODUCTION BUILD PASSED | LIVE END-TO-END VERIFICATION PENDING  
**Safe to Restart Ads:** **NO** *(Pending manual verification of test lead in Supabase + Google Ads preview mode)*

> [!IMPORTANT]
> **LIMITATIONS OF AUTOMATED CHECKS:**  
> Automated static architecture assertions and builds **DO NOT** prove:
> - Real Supabase insertion in production
> - GA4 event receipt
> - Google Ads conversion receipt
> - Correct Google Ads Primary goal configuration in the UI
> - Real attribution persistence in production across all browser/network conditions
> - Absence of duplicate events under all browser/network conditions  
> **SAFE TO RESTART ADS: NO**

---

## 1. Google Ads UI Configuration Mandate

To prevent Google Ads algorithms from bidding on spam, page views, or WhatsApp button clicks, you must configure your conversion actions in the Google Ads UI exactly as outlined below before enabling any campaigns.

### A. Primary vs. Secondary Action Settings
- **`Generate Lead` (Website Form Submission):**
  - **Action Optimization:** Set to **PRIMARY (Biddable)**. This is the only conversion action Smart Bidding should optimize for.
- **`WhatsApp Click` (Outbound Click / Contact):**
  - **Action Optimization:** Set to **SECONDARY (Observation Only)**. Do **NOT** set this as Primary. Bidding on WhatsApp clicks caused 100% bounce/exit rates and 0 genuine leads in Phase 0.
- **`Page View` / `Thank You Page Visit`:**
  - **Action Optimization:** Remove or set to **SECONDARY (Observation Only)**. Never bid on page visits.

### B. Count Setting (One vs. Every)
- **Setting:** **ONE** (Count only one conversion per ad click).
- **Reasoning:** If a user submits two inquiries or refreshes the thank-you page after clicking an ad, it represents one unique prospective traveler. Counting "Every" inflates conversion reports and misleads CPA bidding algorithms.

### C. Attribution Model
- **Setting:** **Data-Driven Attribution (DDA)** *(Recommended)* or **Time Decay / Position Based**.
- **Reasoning:** Data-driven attribution credits touchpoints across the entire traveler discovery journey rather than artificially giving 100% credit to the last click. Avoid "Last Click" unless DDA is unavailable due to low data volume.

### D. Conversion Windows
- **Click-Through Conversion Window:** **30 Days** (or 60 Days for high-ticket luxury packages where planning cycles exceed 1 month).
- **Engaged-View Conversion Window:** **3 Days**.
- **View-Through Conversion Window:** **1 Day**.

---

## 2. Technical Remediation Checklist

| Status | Item | Technical Implementation Details |
| :---: | :--- | :--- |
| ✅ | **Remove Auto-Open Drawer Timers** | Eradicated 2-second `autoOpenTimer` from `App.tsx` and `ThingsToDo.tsx`. Visitors can now browse mobile pages without forced interruptions. |
| ✅ | **Remove ThankYouPage Conversion Scripts** | Stripped `gtag('event', 'generate_lead')` and `trackConversion()` from `ThankYouPage.tsx`. Page refreshes no longer inflate conversion metrics. |
| ✅ | **Remove WhatsApp Conversion Triggers** | Removed Google Ads `trackConversion` calls from `whatsapp.ts`, `WhatsAppPopup.tsx`, and `Contact.tsx`. WhatsApp clicks now only fire GA4 `whatsapp_click` observation events. |
| ✅ | **Implement Canonical Conversion Path** | Created `handleLeadSuccess` in `src/utils/analytics.ts`. All form components route through this single wrapper after backend HTTP 200 confirmation. |
| ✅ | **Implement Fail-Closed Google Ads Tracking** | Updated `trackConversion` and `handleLeadSuccess` to fail closed if `VITE_GOOGLE_ADS_LEAD_LABEL` is absent. Removed legacy fallback labels. |
| ✅ | **Remove Invented Monetary Values** | Removed unvalidated `$50` USD value/currency parameters from `generate_lead` events. |
| ✅ | **Implement Session Deduplication** | Added `sessionStorage.setItem('vietana_lead_tracked_' + leadId)` locking in `handleLeadSuccess` to guarantee idempotency across double clicks and page reloads. |
| ✅ | **Implement Attribution Persistence & 90-Day Expiry** | Built `src/utils/attribution.ts` to capture UTMs, GCLID, landing page, and referrer with explicit 90-day retention limits (`FIRST_TOUCH_RETENTION_DAYS = 90`) and safe JSON parsing. |
| ✅ | **Backend Attribution Preservation** | Updated `api/inquiry.js` to accept attribution payload, append formatted attribution summary to Supabase `message` column, and display an Attribution table in Admin emails. |

---

## 3. Pre-Launch Manual Verification Protocol

**DO NOT RESTART ADS UNTIL EVERY CHECKBOX BELOW IS MANUALLY CHECKED AND VERIFIED:**

- [ ] **1. Supabase Schema Migration Executed**
  - Run `docs/supabase_migration_attribution.sql` in the Supabase project SQL Editor to ensure dedicated attribution columns exist.
- [ ] **2. Google Tag Assistant Preview Test**
  - Open Google Tag Assistant (`tagassistant.google.com`) and connect to your staging/production URL with test parameters: `https://vietana.com/?utm_source=google&utm_medium=cpc&utm_campaign=audit_test&gclid=test_12345`.
- [ ] **3. Verify No Conversion Fires on Landing Page or WhatsApp Click**
  - Click around the homepage, open the contact modal, and click the WhatsApp button. Verify in Tag Assistant that **NO** Google Ads conversion action fires.
- [ ] **4. Verify Canonical Lead Submission & Conversion Fire**
  - Complete and submit an inquiry form (e.g., in `CustomTripBuilder` or `Hero`).
  - Verify in Tag Assistant that upon successful form submission, the Google Ads conversion tag fires exactly **ONCE**.
- [ ] **5. Verify Idempotency on Page Refresh**
  - Refresh the browser page or click submit again. Verify in Tag Assistant that the Google Ads conversion tag **DOES NOT** fire a second time.
- [ ] **6. Verify Supabase Database Record**
  - Log into Supabase Dashboard -> Table Editor -> `leads`. Verify the test lead record exists with `status = 'New'`, correct phone/email, and intact attribution data (`gclid = 'test_12345'`).
- [ ] **7. Verify Admin Email Delivery**
  - Check `booking@vietana.com` inbox. Confirm receipt of the branded admin notification email containing the formatted **Attribution Table**.

---

## 4. Final Sign-Off

| Role | Name / Signature | Verification Date | Approved to Restart Ads? |
| :--- | :--- | :--- | :---: |
| **Lead Engineer** | Antigravity AI Engineering | July 7, 2026 | **NO** *(Static assertions passed; awaiting manual UI test)* |
| **Marketing Director** | *[Pending]* | *[Pending]* | **NO** |
| **Product Owner** | *[Pending]* | *[Pending]* | **NO** |
