import visaPrices from '../../pricing/visa_prices.json';
import flightPrices from '../../pricing/flight_prices.json';
import transferPrices from '../../pricing/airport_transfer.json';
import hotelCategories from '../../pricing/hotel_categories.json';

import { TravelerProfile, TripEstimate, TripEstimateItem } from '../journey/state';

export interface PricingOptions {
  b2bMarkupPercent?: number; // 0 to 30
}

export function estimateTripCost(
  profile: TravelerProfile,
  options: PricingOptions = {}
): TripEstimate {
  const { pax, duration, travelStyle, foodPreference } = profile;
  const totalPax = pax.adults + pax.children;

  // 1. Visa Calculations
  const visaBaseRate = visaPrices[profile.visaType as keyof typeof visaPrices] || visaPrices.single;
  const visaBase = visaBaseRate * totalPax;

  // 2. Flight Calculations
  const flightBaseRates = flightPrices[profile.flightType as keyof typeof flightPrices] || flightPrices.round;
  const flightRate = flightBaseRates[travelStyle as keyof typeof flightBaseRates] || flightBaseRates.comfort;
  const flightsBase = flightRate * totalPax;

  // 3. Airport Transfer Calculations
  const transferRate = transferPrices[travelStyle as keyof typeof transferPrices] || transferPrices.comfort;
  const transfersBase = transferRate * totalPax;

  // 4. Daily Allowances
  const dailyRates = hotelCategories[travelStyle as keyof typeof hotelCategories] || hotelCategories.comfort;
  
  // Accommodation
  const hotelsBase = dailyRates.hotels * duration * totalPax;
  
  // Meals & Dining (Apply a 15% discount helper if Jain/Vegetarian dining profile)
  const mealRateModifier = foodPreference !== 'all' ? 0.85 : 1.0;
  const foodBase = Math.round(dailyRates.food * mealRateModifier) * duration * totalPax;
  
  // Local Sightseeing Logistics
  const transportBase = dailyRates.transport * duration * totalPax;
  
  // Curated Experiences
  const experiencesBase = dailyRates.experiences * duration * totalPax;

  // Apply B2B markup factor if present
  const markupFactor = 1 + (options.b2bMarkupPercent ? options.b2bMarkupPercent / 100 : 0);

  // Compile Estimate Items
  const items: TripEstimateItem[] = [
    {
      name: 'Flights (Round-trip)',
      amount: Math.round(flightsBase * markupFactor),
      description: `Flight fare from ${profile.departureCity} for ${totalPax} traveler(s)`
    },
    {
      name: 'Accommodation',
      amount: Math.round(hotelsBase * markupFactor),
      description: `${duration} nights in ${travelStyle} hotels/resorts`
    },
    {
      name: 'Meals & Dining',
      amount: Math.round(foodBase * markupFactor),
      description: `Daily breakfast & dinner mapping (${foodPreference} preference)`
    },
    {
      name: 'Airport Transfers',
      amount: Math.round(transfersBase * markupFactor),
      description: `Greeting & transfers style: ${travelStyle}`
    },
    {
      name: 'Experiences & Activities',
      amount: Math.round(experiencesBase * markupFactor),
      description: `Sightseeing & curated itineraries`
    },
    {
      name: 'Government E-Visa Support',
      amount: Math.round(visaBase * markupFactor),
      description: `Processing & single entry clearance fee`
    }
  ];

  const totalBase = items.reduce((sum, item) => sum + item.amount, 0);

  // Return a market variation estimate range (+/- 3%)
  return {
    minTotal: Math.round(totalBase * 0.97),
    maxTotal: Math.round(totalBase * 1.03),
    items,
    currency: 'INR'
  };
}
