import { AttractionDestination, RegionName } from './types';
import { getAllVenues, getVenuesByDestination } from './attractions';

export const getAllDestinations = (): AttractionDestination[] => {
  const venues = getAllVenues();
  const destMap = new Map<string, AttractionDestination>();

  for (const venue of venues) {
    const destName = venue.destination;
    if (!destMap.has(destName)) {
      destMap.set(destName, {
        name: destName,
        cityProvince: venue.cityProvince,
        region: venue.region,
        venues: [],
        productCount: 0
      });
    }

    const dest = destMap.get(destName)!;
    dest.venues.push(venue);
    dest.productCount += venue.productCount;
  }

  return Array.from(destMap.values()).sort((a, b) => a.name.localeCompare(b.name));
};

export const getDestinationByName = (name: string): AttractionDestination | undefined => {
  return getAllDestinations().find((d) => d.name.toLowerCase() === name.toLowerCase());
};

export const getDestinationsByRegion = (region: RegionName): AttractionDestination[] => {
  return getAllDestinations().filter(
    (d) => d.region.toUpperCase() === region.toUpperCase()
  );
};
