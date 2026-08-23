# VIETANA PHASE 0 — STEP 1: ATTRIBUTION STORAGE & LEAD FAILURE UX REPORT

## 1. Executive Summary & Mapping Table
This report documents the completion of **Step 1: Backend Attribution Storage + Lead Failure UX Repair**. 
We have corrected `/api/inquiry.js` to explicitly map incoming attribution fields into the dedicated Supabase database columns created by `docs/supabase_migration_attribution.sql`, and repaired all canonical frontend lead-entry flows to ensure fail-closed UX behavior on backend API errors.

### Confirmed Attribution Mapping Table

| FRONTEND PAYLOAD FIELD | BACKEND RECEIVED FIELD | SUPABASE COLUMN | TYPE | NULLABLE? | NORMALIZATION REQUIRED? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `attribution.utm_source` | `req.body.attribution.utm_source` | `utm_source` | `text` | Yes | Normalize `undefined`/`empty` to `null` |
| `attribution.utm_medium` | `req.body.attribution.utm_medium` | `utm_medium` | `text` | Yes | Normalize `undefined`/`empty` to `null` |
| `attribution.utm_campaign` | `req.body.attribution.utm_campaign` | `utm_campaign` | `text` | Yes | Normalize `undefined`/`empty` to `null` |
| `attribution.utm_term` | `req.body.attribution.utm_term` | `utm_term` | `text` | Yes | Normalize `undefined`/`empty` to `null` |
| `attribution.utm_content` | `req.body.attribution.utm_content` | `utm_content` | `text` | Yes | Normalize `undefined`/`empty` to `null` |
| `attribution.gclid` | `req.body.attribution.gclid` | `gclid` | `text` | Yes | Normalize `undefined`/`empty` to `null` |
| `attribution.fbclid` | `req.body.attribution.fbclid` | `fbclid` | `text` | Yes | Normalize `undefined`/`empty` to `null` |
| `attribution.msclkid` | `req.body.attribution.msclkid` | `msclkid` | `text` | Yes | Normalize `undefined`/`empty` to `null` |
| `attribution.landing_page` | `req.body.attribution.landing_page` | `landing_page` | `text` | Yes | Normalize `undefined`/`empty` to `null` |
| `attribution.document_referrer` | `req.body.attribution.document_referrer` | `document_referrer` | `text` | Yes | Normalize `undefined`/`empty` to `null` |
| `attribution.first_touch` | `req.body.attribution.first_touch` | `first_touch_attribution` | `jsonb` | Yes | Normalize `undefined` to `null` |
| `attribution.current_session` | `req.body.attribution.current_session` | `current_session_attribution` | `jsonb` | Yes | Normalize `undefined` to `null` |

---

## 2. Null Normalization Handling
In `/api/inquiry.js`, every attribution field is extracted from `req.body.attribution` using explicit ternary conditional evaluation:
```javascript
utm_source: (attribution && attribution.utm_source) ? attribution.utm_source : null,
...
first_touch_attribution: (attribution && attribution.first_touch) ? attribution.first_touch : null,
```
- If `req.body.attribution` is missing, `undefined`, or null, every database column evaluates strictly to `null`.
- If an individual UTM or click ID field is an empty string `""` or `undefined`, it evaluates to `null`.
- No `undefined` values are passed to the Supabase client, preventing serialization errors or accidental schema pollution.

---

## 3. Proof of No Client Payload Spreading
In `/api/inquiry.js`, we strictly construct an explicit `insertPayload` object:
```javascript
const insertPayload = {
  name: name.trim(),
  phone: finalPhone,
  email: email ? email.trim() : null,
  service: service || null,
  'travel dates': travelDate,
  travelers: travelers || null,
  message: finalMessage || null,
  source: finalSource,
  status: 'New',
  utm_source: (attribution && attribution.utm_source) ? attribution.utm_source : null,
  utm_medium: (attribution && attribution.utm_medium) ? attribution.utm_medium : null,
  utm_campaign: (attribution && attribution.utm_campaign) ? attribution.utm_campaign : null,
  utm_term: (attribution && attribution.utm_term) ? attribution.utm_term : null,
  utm_content: (attribution && attribution.utm_content) ? attribution.utm_content : null,
  gclid: (attribution && attribution.gclid) ? attribution.gclid : null,
  fbclid: (attribution && attribution.fbclid) ? attribution.fbclid : null,
  msclkid: (attribution && attribution.msclkid) ? attribution.msclkid : null,
  landing_page: (attribution && attribution.landing_page) ? attribution.landing_page : null,
  document_referrer: (attribution && attribution.document_referrer) ? attribution.document_referrer : null,
  first_touch_attribution: (attribution && attribution.first_touch) ? attribution.first_touch : null,
  current_session_attribution: (attribution && attribution.current_session) ? attribution.current_session : null
};
```
- **Zero Spreading**: Neither `...req.body` nor `...attribution` is spread into the insert payload.
- **Backend Success Enforcement**: Furthermore, backend success is strictly validated before returning an HTTP 200:
```javascript
if (dbError || !data || !Array.isArray(data) || data.length === 0 || !data[0] || !data[0].id) {
  return res.status(500).json({
    success: false,
    error: dbError ? `Database insert failed: ${dbError.message}` : 'Database insert failed to return a valid saved lead ID'
  });
}
```

---

## 4. Frontend Lead-Entry Flows Inspected & Modified
All four canonical frontend lead-entry flows in the repository were inspected and repaired:
1. `src/components/Hero.tsx` (Horizontal Search Bar Modal)
2. `src/components/QuickQuoteSection.tsx` (Quick Quote Horizontal Bar Modal)
3. `src/components/CustomTripBuilder.tsx` (AI Itinerary Lead Gate Modal)
4. `src/components/InquiryForm.tsx` (Main Inquiry Form & Drawer Form)

---

## 5. Exact Before/After UX Behavior on Backend Failure

### A. `src/components/Hero.tsx`
- **Before**: When `/api/inquiry` failed, `catch (err)` logged the error to the console and execution continued directly to saving drafts in `localStorage`, setting WhatsApp redirect links, closing the modal, and redirecting the browser to `#/thank-you`.
- **After**:
  - Requires `response.ok && result.success === true && result.leadId` before calling `handleLeadSuccess(result, 'Hero Search Bar')`.
  - All local/session storage saving, modal closing, and routing to `#/thank-you` occur strictly inside the `try` block *after* verified backend success.
  - On failure, `catch (err)` sets an accessible inline error message (`apiError`), keeps the modal open, preserves all user-entered form data, restores the submit button, and prevents any redirect or conversion tracking.

### B. `src/components/QuickQuoteSection.tsx`
- **Before**: Identical false-success bug as `Hero.tsx`; network/DB failures were logged to the console while redirecting the user to `#/thank-you` and generating WhatsApp quotes.
- **After**:
  - Enforces `response.ok && result.success && result.leadId`.
  - On failure, aborts navigation, displays an accessible inline error box (`bg-red-50 text-red-700`), preserves phone number and travel selections, and allows immediate retry.

### C. `src/components/CustomTripBuilder.tsx`
- **Before**: In `handleLeadSubmit`, `setShowLeadGate(false)` and `localStorage` lead info caching executed *before* calling `/api/inquiry`. If the API failed, `triggerTimelineGeneration()` still fired, unlocking the AI itinerary proposal without a valid saved lead in Supabase.
- **After**:
  - Added `isSubmitting` and `apiError` states to the lead gate modal.
  - State updates (`setShowLeadGate(false)`, local storage caching, and `triggerTimelineGeneration()`) execute strictly inside `try` after `response.ok && result.success && result.leadId` is verified and `handleLeadSuccess` completes.
  - On failure, the lead gate remains open, displays an inline red error alert, keeps user inputs intact, and enables retry.

### D. `src/components/InquiryForm.tsx`
- **Before**: Checked `if (!response.ok || !result.success)`, but did not verify that a valid `result.leadId` was returned by the database.
- **After**:
  - Enforces `if (!response.ok || !result.success || !result.leadId)`.
  - On failure, throws to `catch (err)`, displays `apiError`, restores button state, and blocks routing to `#/thank-you` or conversion firing.

---

## 6. Verification & Build Confirmation
Both required verification suites were executed on the terminal and passed without errors:

1. **Static Architecture Assertions (`node scripts/verify-phase-0.js`)**:
   - Added new assertions (#12 and #13) to verify `result.leadId` checks across all 4 canonical forms and explicit `utm_source` / lead ID validation in `api/inquiry.js`.
   - **Result**: `30 Passed | 0 Failed`.
2. **Production Bundle Build (`npm run build`)**:
   - **Result**: `✓ 2317 modules transformed. built in 3.39s`.
