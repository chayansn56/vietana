export const trackConversion = (label: string) => {
  const adsId = import.meta.env.VITE_GOOGLE_ADS_ID;
  if (!adsId || !label) {
    console.debug('[Analytics] VITE_GOOGLE_ADS_ID or label is missing, skipping tracking.');
    return;
  }

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      send_to: `${adsId}/${label}`,
    });
    console.debug(`[Analytics] Successfully sent conversion event: ${adsId}/${label}`);
  } else {
    console.warn(`[Analytics] gtag is not loaded. Event details: ${adsId}/${label}`);
  }
};

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    const defaultParams: Record<string, any> = {
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.hash,
      page_title: document.title,
    };

    if (eventName.startsWith('inquiry_drawer_')) {
      defaultParams.page_type = window.location.pathname === '/experiences' || window.location.hash.startsWith('#/experiences')
        ? 'experiences'
        : 'homepage';
    }

    const combinedParams = {
      ...defaultParams,
      ...params
    };

    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, combinedParams);
      console.debug(`[Analytics] Successfully sent custom event: ${eventName}`, combinedParams);
    } else {
      console.debug(`[Analytics Log] Custom Event (No gtag): ${eventName}`, combinedParams);
    }
  }
};

export const handleLeadSuccess = (result: { success?: boolean; leadId?: string | number }, source: string) => {
  if (!result || !result.success || !result.leadId) {
    console.warn('Lead submission did not return a valid success status or leadId:', result);
    return false;
  }

  const leadIdStr = String(result.leadId);
  const storageKey = `vietana_lead_tracked_${leadIdStr}`;

  if (typeof window !== 'undefined' && sessionStorage.getItem(storageKey) === 'true') {
    console.log(`Lead ${leadIdStr} already tracked in this session. Skipping duplicate conversion events.`);
    return false;
  }

  if (typeof window !== 'undefined') {
    sessionStorage.setItem(storageKey, 'true');
  }

  trackEvent('generate_lead', {
    lead_id: leadIdStr,
    source: source
  });

  const adsLabel = import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL;
  if (adsLabel) {
    trackConversion(adsLabel);
  } else {
    console.warn(
      '[Analytics] Google Ads Lead conversion disabled: no verified lead label configured.'
    );
  }

  return true;
};

