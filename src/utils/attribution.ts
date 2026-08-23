export interface AttributionData {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  fbclid: string | null;
  msclkid: string | null;
  landing_page: string | null;
  document_referrer: string | null;
  timestamp: string;
}

const FIRST_TOUCH_KEY = 'vietana_first_touch_attribution';
const SESSION_TOUCH_KEY = 'vietana_session_attribution';

export const FIRST_TOUCH_RETENTION_DAYS = 90;

export const initAttribution = () => {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  
  const currentData: AttributionData = {
    utm_source: urlParams.get('utm_source') || null,
    utm_medium: urlParams.get('utm_medium') || null,
    utm_campaign: urlParams.get('utm_campaign') || null,
    utm_term: urlParams.get('utm_term') || null,
    utm_content: urlParams.get('utm_content') || null,
    gclid: urlParams.get('gclid') || null,
    fbclid: urlParams.get('fbclid') || null,
    msclkid: urlParams.get('msclkid') || null,
    landing_page: window.location.pathname + window.location.search,
    document_referrer: document.referrer || null,
    timestamp: new Date().toISOString()
  };

  try {
    sessionStorage.setItem(SESSION_TOUCH_KEY, JSON.stringify(currentData));

    let replaceFirstTouch = true;
    const ftRaw = localStorage.getItem(FIRST_TOUCH_KEY);
    if (ftRaw) {
      try {
        const ftParsed = JSON.parse(ftRaw) as AttributionData;
        if (ftParsed && ftParsed.timestamp && !isNaN(Date.parse(ftParsed.timestamp))) {
          const ageMs = Date.now() - new Date(ftParsed.timestamp).getTime();
          const ageDays = ageMs / (1000 * 60 * 60 * 24);
          if (ageDays <= FIRST_TOUCH_RETENTION_DAYS && ageDays >= 0) {
            replaceFirstTouch = false;
          }
        }
      } catch (err) {
        console.warn('Malformed first-touch attribution data in localStorage, replacing:', err);
      }
    }

    if (replaceFirstTouch) {
      localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(currentData));
    }
  } catch (e) {
    console.warn('Storage access failed for attribution tracking:', e);
  }
};

export const getAttributionPayload = () => {
  if (typeof window === 'undefined') return {};

  let firstTouch: AttributionData | null = null;
  let currentSession: AttributionData | null = null;

  try {
    const ftRaw = localStorage.getItem(FIRST_TOUCH_KEY);
    if (ftRaw) {
      try {
        const ftParsed = JSON.parse(ftRaw) as AttributionData;
        if (ftParsed && ftParsed.timestamp && !isNaN(Date.parse(ftParsed.timestamp))) {
          const ageMs = Date.now() - new Date(ftParsed.timestamp).getTime();
          const ageDays = ageMs / (1000 * 60 * 60 * 24);
          if (ageDays <= FIRST_TOUCH_RETENTION_DAYS && ageDays >= 0) {
            firstTouch = ftParsed;
          }
        }
      } catch (err) {
        console.warn('Malformed first-touch attribution in localStorage during payload retrieval:', err);
      }
    }

    const csRaw = sessionStorage.getItem(SESSION_TOUCH_KEY);
    if (csRaw) currentSession = JSON.parse(csRaw);
  } catch (e) {
    console.warn('Error reading attribution storage:', e);
  }

  if (!currentSession) {
    const urlParams = new URLSearchParams(window.location.search);
    currentSession = {
      utm_source: urlParams.get('utm_source') || null,
      utm_medium: urlParams.get('utm_medium') || null,
      utm_campaign: urlParams.get('utm_campaign') || null,
      utm_term: urlParams.get('utm_term') || null,
      utm_content: urlParams.get('utm_content') || null,
      gclid: urlParams.get('gclid') || null,
      fbclid: urlParams.get('fbclid') || null,
      msclkid: urlParams.get('msclkid') || null,
      landing_page: window.location.pathname + window.location.search,
      document_referrer: document.referrer || null,
      timestamp: new Date().toISOString()
    };
  }

  return {
    attribution: {
      first_touch: firstTouch || currentSession,
      current_session: currentSession,
      utm_source: currentSession.utm_source || (firstTouch ? firstTouch.utm_source : null),
      utm_medium: currentSession.utm_medium || (firstTouch ? firstTouch.utm_medium : null),
      utm_campaign: currentSession.utm_campaign || (firstTouch ? firstTouch.utm_campaign : null),
      utm_term: currentSession.utm_term || (firstTouch ? firstTouch.utm_term : null),
      utm_content: currentSession.utm_content || (firstTouch ? firstTouch.utm_content : null),
      gclid: currentSession.gclid || (firstTouch ? firstTouch.gclid : null),
      fbclid: currentSession.fbclid || (firstTouch ? firstTouch.fbclid : null),
      msclkid: currentSession.msclkid || (firstTouch ? firstTouch.msclkid : null),
      landing_page: currentSession.landing_page,
      document_referrer: currentSession.document_referrer
    }
  };
};
