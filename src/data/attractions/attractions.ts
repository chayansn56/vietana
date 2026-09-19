import { AttractionVenue, RegionName } from './types';
import { ALL_ATTRACTION_PRODUCTS, VENUE_IMAGES } from './products';

export const getAllVenues = (): AttractionVenue[] => {
  const venueMap = new Map<string, AttractionVenue>();

  for (const product of ALL_ATTRACTION_PRODUCTS) {
    const venueName = product.venue;
    if (!venueMap.has(venueName)) {
      venueMap.set(venueName, {
        name: venueName,
        destination: product.destination,
        cityProvince: product.cityProvince,
        region: product.region,
        productCount: 0,
        products: [],
        image: VENUE_IMAGES[venueName] || '/experiences_bg.png'
      });
    }

    const venue = venueMap.get(venueName)!;
    venue.productCount++;
    venue.products.push(product);
  }

  return Array.from(venueMap.values()).sort((a, b) => a.name.localeCompare(b.name));
};

export const getVenueByName = (name: string): AttractionVenue | undefined => {
  return getAllVenues().find((v) => v.name.toLowerCase() === name.toLowerCase());
};

export const getVenuesByDestination = (destination: string): AttractionVenue[] => {
  return getAllVenues().filter(
    (v) => v.destination.toLowerCase() === destination.toLowerCase()
  );
};

export const getVenuesByRegion = (region: RegionName): AttractionVenue[] => {
  return getAllVenues().filter(
    (v) => v.region.toUpperCase() === region.toUpperCase()
  );
};
