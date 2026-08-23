# VIETANA Phase 0: Pre-Implementation Baseline Report

**Date:** 2026-07-07  
**Phase:** Phase 0 — Measurement & Critical Mobile Funnel Repair (Step 1)  

---

## 1. Executive Summary
Before executing Phase 0 funnel repairs, a comprehensive baseline audit was performed on the codebase to map all existing Google Ads conversion tags, GA4 tracking events, attribution handling mechanisms, and route stability. This document serves as the canonical reference point prior to implementing STEP 2 through STEP 14.

---

## 2. Existing Conversion Tag Inventory
An exhaustive search of the repository revealed several critical tracking vulnerabilities and improper conversion firing mechanisms:

### A. Hardcoded Global Tags (`index.html`)
- **Location:** `index.html` (Lines 18, 23-26)
- **Tag ID:** `AW-18279926757`
- **Issue:** An unconditional `gtag('event', 'conversion', { ... })` snippet is hardcoded directly into the `<head>` of `index.html`.
- **Impact:** **Every single page view** (including homepage bounces after 2 seconds) fires a conversion event to Google Ads, inflating conversion counts and corrupting Smart Bidding algorithms.

### B. Thank You Page Static Firing (`ThankYouPage.tsx`)
- **Location:** `src/components/ThankYouPage.tsx` (Lines 38-45)
- **Tag ID & Label:** `AW-18279926757/KHuxCPyngMccEOWXxoxE`
- **Issue:** Fired unconditionally inside a `useEffect` on component mount whenever a user views `/thank-you`.
- **Impact:** Lacks idempotency protection. If a user refreshes the page, navigates back and forth, or accesses the URL directly without submitting a form, duplicate conversion events are fired.

### C. WhatsApp Click Tracking (`WhatsAppPopup.tsx`)
- **Location:** `src/components/ui/WhatsAppPopup.tsx` (Lines 53-61)
- **Tag ID & Label:** `AW-18279926757/E5RVCOO168ocEOWXxoxE`
- **Issue:** Fires a direct Google Ads conversion event immediately upon clicking "Chat on WhatsApp" (India team).
- **Impact:** Counts top-of-funnel or exploratory chat clicks as primary conversions, treating unverified clicks the same as qualified backend-confirmed leads.

### D. Generic Button Clicks via `trackConversion`
- **Location:** `src/utils/analytics.ts` (`trackConversion`), invoked in:
  - `Hero.tsx` (Line 130)
  - `Contact.tsx` (Line 128)
  - `CustomTripBuilder.tsx` (Line 156)
  - `AIPlanner.tsx` (Line 145)
  - `Packages.tsx` (Line 668)
  - `QuickQuoteSection.tsx` (Line 52)
- **Issue:** Firing conversion tags on exploratory UI interactions (e.g., clicking WhatsApp CTAs or trip builder buttons).
- **Impact:** Dilutes lead quality signals sent to Google Ads.

---

## 3. GA4 Event Architecture Baseline
Currently, GA4 tracking is routed through `src/utils/analytics.ts` using the `trackEvent` helper:
- **Default Parameters Injected:** `page_location`, `page_path`, `page_title`.
- **Custom Drawer Tracking:** Auto-injects `trigger_type: 'time_delay'`, `trigger_delay_ms: 2000`, and `page_type` when event names start with `inquiry_drawer_`.
- **Missing Core Events:** There is no standardized tracking for:
  - `section_view` (homepage scroll depth and section visibility)
  - `form_start` (standardized across all lead forms)
  - `form_submit_attempt` (distinguishing submission attempts from failures)
  - `generate_lead` (canonical event fired only upon backend confirmation)

---

## 4. Lead Attribution & Persistence Baseline
- **Current Attribution Capture:** None. UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) and click IDs (`gclid`, `fbclid`, `msclkid`) from incoming paid campaigns are ignored on landing.
- **Payload Transmission:** In `src/components/InquiryForm.tsx` (Line 104) and `Hero.tsx` search bar submission, the lead source is statically hardcoded as `source: 'Google Ads'` or `source: 'Mockup Style Horizontal Search Bar in Hero'`.
- **Backend API (`api/inquiry.js`):** Receives `source` from `req.body` and inserts it into the Supabase `leads` table and Resend admin email notifications, but receives zero granular attribution data.

---

## 5. Build & Route Verification Baseline
- **Git Status:** Clean branch on `main` with minor uncommitted working tree adjustments in `App.tsx`, `ThingsToDo.tsx`, `InquiryForm.tsx`, and `analytics.ts` from initial bug diagnostics.
- **Production Build:** Verified via `npm run build`. Build succeeds in **3.79s** without compilation errors or TypeScript type failures.
- **Route Matrix:**
  - `/` (Homepage) -> Stable
  - `/experiences` -> Previously suffered from a fatal crash due to an undeclared `triggerRef` in `ThingsToDo.tsx`.
  - `/thank-you` -> Accessible, but lacks session validation/idempotency guards.

---

## 6. Action Plan for Next Steps
With the baseline established, we proceed immediately to:
1. **Step 2:** Repair Google Ads Conversion Integrity (remove global tag from `index.html`, disable duplicate triggers, implement idempotency).
2. **Step 3:** Formally verify and lock in the fix for `/experiences` in `ThingsToDo.tsx`.
3. **Step 4:** Disable the automatic 2000ms inquiry drawer interrupt in `App.tsx`.
