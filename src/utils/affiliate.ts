/**
 * Affiliate link generator
 */

export const generateAffiliateUrl = (type: 'hotel' | 'flight' | 'insurance' | 'experience', destination: string) => {
  const baseUrls = {
    hotel: 'https://booking.com/searchresults.html',
    flight: 'https://skyscanner.com/transport/flights',
    insurance: 'https://worldnomads.com/travel-insurance',
    experience: 'https://getyourguide.com/s'
  };
  
  const partnerId = process.env.VITE_AFFILIATE_ID || 'vietana_partner_01';
  
  const params = new URLSearchParams({
    aid: partnerId,
    q: destination,
    campaign: 'ai_planner'
  });
  
  return `${baseUrls[type]}?${params.toString()}`;
};
