import masterData from './master.json';
import { 
  RawAttractionProduct, 
  AttractionProduct, 
  TicketVariant, 
  RegionName, 
  CommercialStatus 
} from './types';

// Verified high-resolution imagery per attraction venue
export const VENUE_IMAGES: Record<string, string> = {
  'Sun World Ba Na Hills': '/images/attractions/sun-world-ba-na-hills.jpg',
  'Sun World Fansipan Legend': '/images/attractions/sun-world-fansipan-legend.jpg',
  'Sun World Ha Long Complex': '/images/attractions/sun-world-ha-long-complex.jpg',
  'Sun World Ba Den Mountain': '/images/attractions/sun-world-ba-den-mountain.jpg',
  'Sun World Hon Thom': '/images/attractions/sun-world-hon-thom.jpg',
  'Sun World Cat Ba': '/images/attractions/sun-world-cat-ba.jpg',
  'Sun World Sam Son Water Park': '/images/attractions/sun-world-sam-son-water-park.jpg',
  'Sun World Ha Nam': '/images/attractions/sun-world-ha-nam.jpg',
  'Sun World Vung Tau (Aqua Adventure)': '/images/attractions/sun-world-vung-tau.jpg',
  'VinWonders Phu Quoc': '/images/attractions/vinwonders-phu-quoc.jpg',
  'Vinpearl Safari Phu Quoc': '/images/attractions/vinpearl-safari-phu-quoc.jpg',
  'VinWonders & Vinpearl Safari Phu Quoc': '/images/attractions/vinwonders-safari-phu-quoc.jpg',
  'Grand World Phu Quoc': '/images/attractions/grand-world-phu-quoc.jpg',
  'VinWonders Nam Hoi An': '/images/attractions/vinwonders-nam-hoi-an.jpg',
  'VinWonders Nha Trang': '/images/attractions/vinwonders-nha-trang.jpg',
  'Hon Tam Island': '/images/attractions/hon-tam-island-nha-trang.jpg',
  'VinWonders Grand Park': '/images/attractions/vinwonders-grand-park.jpg',
  'VinWonders Ocean City / Grand World Hanoi': '/images/attractions/vinwonders-ocean-city-hanoi.jpg',
  'VinWonders Vu Yen': '/images/attractions/vinwonders-vu-yen.jpg',
  'VinWonders Cua Hoi': '/images/attractions/vinwonders-cua-hoi.jpg',
  'Ho May Park': '/images/attractions/ho-may-park-vung-tau.jpg',
  'The Amazing Bay': '/images/attractions/the-amazing-bay-dong-nai.jpg',
  'Samten Hills Dalat': '/images/attractions/samten-hills-dalat.jpg',
  'TTC World Ta Cu': '/images/attractions/ttc-world-ta-cu.jpg',
  'Tropicana Park Ho Tram': '/images/attractions/tropicana-park-ho-tram.jpg',
  'NovaWorld Ho Tram': '/images/attractions/novaworld-ho-tram.jpg',
  'Wonder Museum Ho Tram': '/images/attractions/wonder-museum-ho-tram.jpg',
  'Circus Land Phan Thiet': '/images/attractions/circus-land-phan-thiet.jpg',
  'Dino Park Phan Thiet': '/images/attractions/dino-park-phan-thiet.jpg',
  'Safari Cafe Phan Thiet': '/images/attractions/safari-cafe-phan-thiet.jpg',
  'Wonderland Water Park Phan Thiet': '/images/attractions/wonderland-water-park-phan-thiet.jpg',
  'Wonder Hill Phan Thiet': '/images/attractions/wonder-hill-phan-thiet.jpg',
  'NovaWorld Phan Thiet': '/images/attractions/novaworld-phan-thiet.jpg',
  'NovaDreams Royal Garden Cau Dat': '/images/attractions/novadreams-royal-garden-cau-dat.jpg'
};

const parseNum = (val: any): number | null => {
  if (val === null || val === undefined) return null;
  const str = String(val).trim();
  if (str === '' || str === '-' || str.toLowerCase() === 'none') return null;
  const n = Number(str);
  return isNaN(n) ? null : n;
};

const parseBool = (val: any): boolean => {
  if (!val) return false;
  const str = String(val).trim().toLowerCase();
  return str === 'yes' || str === 'true' || str === '1' || str === 'included';
};

const rawProducts: RawAttractionProduct[] = (masterData as any).products || [];

export const ALL_ATTRACTION_PRODUCTS: AttractionProduct[] = rawProducts.map((p) => {
  const venue = p['Attraction/Venue'] || '';
  const image = VENUE_IMAGES[venue] || '/experiences_bg.png';

  const supAdult = parseNum(p['Supplier Adult Price']);
  const supChild = parseNum(p['Supplier Child Price']);
  const supSenior = parseNum(p['Supplier Senior Price']);
  const supStudent = parseNum(p['Supplier Student Price']);
  const supLocal = parseNum(p['Supplier Local Price']);
  const supGroup = parseNum(p['Group Price']);

  const vAdult = parseNum(p['FINAL VIETANA Adult Price']) || supAdult;
  const vChild = parseNum(p['FINAL VIETANA Child Price']) || supChild;
  const vSenior = parseNum(p['FINAL VIETANA Senior Price']) || supSenior;
  const vStudent = parseNum(p['FINAL VIETANA Student Price']) || supStudent;
  const vLocal = parseNum(p['FINAL VIETANA Local Price']) || supLocal;

  // Build variants
  const variants: TicketVariant[] = [];
  if (vAdult !== null) {
    variants.push({
      type: 'Adult',
      supplierPriceVND: supAdult,
      vietanaPriceVND: vAdult,
      eligibility: p['Height Requirement'] || p['Age Requirement'] || 'Adult (≥1.4m)'
    });
  }
  if (vChild !== null) {
    variants.push({
      type: 'Child',
      supplierPriceVND: supChild,
      vietanaPriceVND: vChild,
      eligibility: p['Height Requirement'] || p['Age Requirement'] || 'Child (1.0m – 1.4m)'
    });
  }
  if (vSenior !== null) {
    variants.push({
      type: 'Senior',
      supplierPriceVND: supSenior,
      vietanaPriceVND: vSenior,
      eligibility: p['Age Requirement'] || 'Senior (≥60 yrs)'
    });
  }
  if (vStudent !== null) {
    variants.push({
      type: 'Student',
      supplierPriceVND: supStudent,
      vietanaPriceVND: vStudent,
      eligibility: 'Valid Student ID'
    });
  }
  if (vLocal !== null) {
    variants.push({
      type: 'Local',
      supplierPriceVND: supLocal,
      vietanaPriceVND: vLocal,
      eligibility: 'Vietnam National / Resident ID'
    });
  }

  return {
    id: p['Product ID'],
    name: p['Product Name'],
    type: p['Product Type'] || 'Admission',
    venue: venue,
    destination: p['Destination'] || '',
    cityProvince: p['City/Province'] || '',
    region: p['Region'],
    supplierPrices: {
      adult: supAdult,
      child: supChild,
      senior: supSenior,
      student: supStudent,
      local: supLocal,
      group: supGroup
    },
    vietanaPrices: {
      adult: vAdult,
      child: vChild,
      senior: vSenior,
      student: vStudent,
      local: vLocal
    },
    margin: {
      grossProfit: parseNum(p['Gross Profit']),
      markupPercent: parseNum(p['Markup %']),
      grossMarginPercent: parseNum(p['Gross Margin %'])
    },
    priceNotes: p['Price Notes'] || '',
    variants,
    ageRequirement: p['Age Requirement'] || '',
    heightRequirement: p['Height Requirement'] || '',
    eligibility: p['Eligibility'] || '',
    validity: p['Validity'] || '',
    visitDateRequirement: p['Visit Date Requirement'] || '',
    timeSlotRequirement: p['Time Slot Requirement'] || '',
    bookingCutoff: p['Booking Cut-off'] || '',
    cancellationPolicy: p['Cancellation Policy'] || '',
    refundPolicy: p['Refund Policy'] || '',
    inclusions: p['Included'] || '',
    exclusions: p['Excluded'] || '',
    comboDetails: p['Combo Details'] || '',
    foodBuffetIncluded: parseBool(p['Food/Buffet Included']),
    showIncluded: parseBool(p['Show Included']),
    cableCarIncluded: parseBool(p['Cable Car Included']),
    transportIncluded: parseBool(p['Transport Included']),
    originalSupplierProductName: p['Original Supplier Product Name'] || '',
    pdfSource: p['PDF Source'] || '',
    pdfPage: p['PDF Page'] || '',
    sourceReference: p['Source Reference'] || '',
    commercialStatus: p['Commercial Status'] || 'READY',
    reviewRequired: Boolean(p['Review Required']),
    reviewReason: p['Review Reason'] || '',
    image
  };
});

export const getAllProducts = (): AttractionProduct[] => ALL_ATTRACTION_PRODUCTS;

export const getProductById = (id: string): AttractionProduct | undefined => {
  return ALL_ATTRACTION_PRODUCTS.find((p) => p.id === id);
};

export const getProductsByRegion = (region: RegionName): AttractionProduct[] => {
  return ALL_ATTRACTION_PRODUCTS.filter((p) => p.region.toUpperCase() === region.toUpperCase());
};

export const getProductsByVenue = (venue: string): AttractionProduct[] => {
  return ALL_ATTRACTION_PRODUCTS.filter((p) => p.venue.toLowerCase() === venue.toLowerCase());
};

export const getProductsByDestination = (dest: string): AttractionProduct[] => {
  return ALL_ATTRACTION_PRODUCTS.filter((p) => p.destination.toLowerCase() === dest.toLowerCase());
};
