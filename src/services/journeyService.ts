import { JourneyState } from '../core/journey/state';

export function formatWhatsAppSummary(state: JourneyState): string {
  const profile = state.travelerProfile;
  const cities = state.itinerary.map(day => day.city).filter((v, i, a) => a.indexOf(v) === i);
  const routeString = cities.length > 0 ? cities.join(" ➔ ") : "Vietnam Itinerary";

  return `*VIETANA AI Journey Proposal* 🇻🇳
-------------------------------
👤 *Traveler Profile:*
- Departure: ${profile.departureCity}
- Duration: ${profile.duration} Days
- Style: ${profile.travelStyle.toUpperCase()}
- Group Size: ${profile.pax.adults} Adults ${profile.pax.children > 0 ? `, ${profile.pax.children} Children` : ''}
- Food Preference: ${profile.foodPreference.toUpperCase()}

✈ *Planned Route:*
${routeString}

💰 *Estimated Budget Range (INR):*
₹${state.pricing.minTotal.toLocaleString('en-IN')} - ₹${state.pricing.maxTotal.toLocaleString('en-IN')}
(Market rate baseline estimate)

📋 *Booking Readiness:* ${state.bookingStatus.readinessScore}%
-------------------------------
Prepared for client. Contact VIETANA agent for bookings.`;
}

export function generatePDFProposal(state: JourneyState): Blob {
  // Return a mock PDF blob for frontend export preview trigger
  const mockContent = `VIETANA TRAVEL PROPOSAL\n\nRoute: ${state.itinerary.map(d => d.city).join(" -> ")}`;
  return new Blob([mockContent], { type: 'application/pdf' });
}
