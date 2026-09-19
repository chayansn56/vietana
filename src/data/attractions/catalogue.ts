import { 
  CatalogueHierarchy, 
  AttractionProduct, 
  RegionName, 
  CommercialStatus 
} from './types';
import { ALL_ATTRACTION_PRODUCTS } from './products';
import { getAllRegions } from './regions';
import { getAllDestinations } from './destinations';
import { getAllVenues } from './attractions';

export interface CatalogueFilterOptions {
  query?: string;
  region?: string;
  destination?: string;
  venue?: string;
  productType?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const getCatalogueHierarchy = (): CatalogueHierarchy => {
  const regions = getAllRegions();
  const venues = getAllVenues();
  const destinations = getAllDestinations();

  return {
    regions,
    totalProducts: ALL_ATTRACTION_PRODUCTS.length,
    totalVenues: venues.length,
    totalDestinations: destinations.length
  };
};

export const searchCatalogue = (options: CatalogueFilterOptions): AttractionProduct[] => {
  const {
    query,
    region,
    destination,
    venue,
    productType,
    status,
    minPrice,
    maxPrice
  } = options;

  return ALL_ATTRACTION_PRODUCTS.filter((product) => {
    // 1. Search query
    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesVenue = product.venue.toLowerCase().includes(q);
      const matchesDest = product.destination.toLowerCase().includes(q);
      const matchesInclusions = product.inclusions.toLowerCase().includes(q);
      const matchesId = product.id.toLowerCase().includes(q);
      if (!matchesName && !matchesVenue && !matchesDest && !matchesInclusions && !matchesId) {
        return false;
      }
    }

    // 2. Region filter
    if (region && region !== 'ALL') {
      if (product.region.toUpperCase() !== region.toUpperCase()) {
        return false;
      }
    }

    // 3. Destination filter
    if (destination && destination !== 'ALL') {
      if (product.destination.toLowerCase() !== destination.toLowerCase()) {
        return false;
      }
    }

    // 4. Venue filter
    if (venue && venue !== 'ALL') {
      if (product.venue.toLowerCase() !== venue.toLowerCase()) {
        return false;
      }
    }

    // 5. Product Type filter
    if (productType && productType !== 'ALL') {
      if (!product.type.toLowerCase().includes(productType.toLowerCase())) {
        return false;
      }
    }

    // 6. Status filter
    if (status && status !== 'ALL') {
      if (product.commercialStatus.toUpperCase() !== status.toUpperCase()) {
        return false;
      }
    }

    // 7. Price range (Adult Price VND)
    if (minPrice !== undefined && product.vietanaPrices.adult !== null) {
      if (product.vietanaPrices.adult < minPrice) return false;
    }
    if (maxPrice !== undefined && product.vietanaPrices.adult !== null) {
      if (product.vietanaPrices.adult > maxPrice) return false;
    }

    return true;
  });
};

export const getCatalogueStatistics = () => {
  const total = ALL_ATTRACTION_PRODUCTS.length;
  const ready = ALL_ATTRACTION_PRODUCTS.filter((p) => p.commercialStatus === 'READY').length;
  const strategic = ALL_ATTRACTION_PRODUCTS.filter((p) => p.commercialStatus === 'STRATEGIC_LOW_MARGIN').length;
  const review = ALL_ATTRACTION_PRODUCTS.filter((p) => p.commercialStatus === 'REVIEW_REQUIRED').length;
  const restricted = ALL_ATTRACTION_PRODUCTS.filter((p) => p.commercialStatus === 'RESTRICTED').length;
  const missingData = ALL_ATTRACTION_PRODUCTS.filter((p) => p.commercialStatus === 'MISSING_DATA').length;

  return {
    total,
    ready,
    strategic,
    review,
    restricted,
    missingData,
    regions: {
      south: ALL_ATTRACTION_PRODUCTS.filter((p) => p.region === 'SOUTH VIETNAM').length,
      central: ALL_ATTRACTION_PRODUCTS.filter((p) => p.region === 'CENTRAL VIETNAM').length,
      north: ALL_ATTRACTION_PRODUCTS.filter((p) => p.region === 'NORTH VIETNAM').length
    }
  };
};
