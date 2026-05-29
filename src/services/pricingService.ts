import { TRIP_BUILDER_CONSTANTS, TRIP_BUILDER_RATES } from '../data/tripBuilder';
import { TripEstimate } from '../types';

export const calculateTripEstimate = (
  selectedCities: string[],
  style: 'budget' | 'comfort' | 'luxury',
  days: number,
  pax: number
): TripEstimate => {
  const flightTot = TRIP_BUILDER_CONSTANTS.flight * pax;
  const visaTot = TRIP_BUILDER_CONSTANTS.visa * pax;
  const hops = Math.max(0, selectedCities.length - 1);
  const transitTot = hops * TRIP_BUILDER_CONSTANTS.transitPerHop * pax;
  const dailyTot = TRIP_BUILDER_RATES[style] * days * pax;
  const total = flightTot + visaTot + transitTot + dailyTot;

  return {
    flight: flightTot,
    visa: visaTot,
    transit: transitTot,
    daily: dailyTot,
    total: total
  };
};
