import { RegionName, AttractionRegion } from './types';
import { ALL_ATTRACTION_PRODUCTS } from './products';
import { getDestinationsByRegion } from './destinations';

export const REGIONS: RegionName[] = [
  'SOUTH VIETNAM',
  'CENTRAL VIETNAM',
  'NORTH VIETNAM'
];

export const getRegionData = (regionName: RegionName): AttractionRegion => {
  const destinations = getDestinationsByRegion(regionName);
  const products = ALL_ATTRACTION_PRODUCTS.filter(
    (p) => p.region.toUpperCase() === regionName.toUpperCase()
  );

  return {
    name: regionName,
    destinations,
    productCount: products.length
  };
};

export const getAllRegions = (): AttractionRegion[] => {
  return REGIONS.map((r) => getRegionData(r));
};
