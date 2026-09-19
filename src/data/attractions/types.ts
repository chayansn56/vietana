// =============================================================================
// VIETANA Attractions — Authoritative Type System
// Based on VIETANA_ATTRACTIONS_FINAL_MASTER.json
// =============================================================================

export type RegionName = 'SOUTH VIETNAM' | 'CENTRAL VIETNAM' | 'NORTH VIETNAM';

export type CommercialStatus = 
  | 'READY' 
  | 'STRATEGIC_LOW_MARGIN' 
  | 'REVIEW_REQUIRED' 
  | 'RESTRICTED' 
  | 'MISSING_DATA';

export type ProductType = 
  | 'Admission'
  | 'Theme Park'
  | 'Cable Car'
  | 'Water Park'
  | 'Show'
  | 'Combo'
  | 'Safari'
  | 'Buffet'
  | 'Mountain Train'
  | 'Island Experience'
  | 'Water Activity'
  | 'Transport'
  | 'Other';

export interface RawAttractionProduct {
  'Product ID': string;
  'Region': RegionName;
  'Destination': string;
  'City/Province': string;
  'Attraction/Venue': string;
  'Product Name': string;
  'Product Type': string;
  'Original Supplier Product Name': string;
  'Supplier Adult Price': number | string;
  'Supplier Child Price': number | string;
  'Supplier Senior Price': number | string;
  'Supplier Student Price': number | string;
  'Supplier Local Price': number | string;
  'Group Price': number | string;
  'Other Price': number | string;
  'FINAL VIETANA Adult Price': number | string;
  'FINAL VIETANA Child Price': number | string;
  'FINAL VIETANA Senior Price': number | string;
  'FINAL VIETANA Student Price': number | string;
  'FINAL VIETANA Local Price': number | string;
  'Gross Profit': number | string;
  'Markup %': number | string;
  'Gross Margin %': number | string;
  'Source Price Ceiling': number | string;
  'Price Notes': string;
  'Age Requirement': string;
  'Height Requirement': string;
  'Eligibility': string;
  'Validity': string;
  'Visit Date Requirement': string;
  'Time Slot Requirement': string;
  'Booking Cut-off': string;
  'Cancellation Policy': string;
  'Refund Policy': string;
  'Included': string;
  'Excluded': string;
  'Combo Details': string;
  'Food/Buffet Included': string;
  'Show Included': string;
  'Cable Car Included': string;
  'Transport Included': string;
  'PDF Source': string;
  'PDF Page': string | number;
  'Source Reference': string;
  'Commercial Status': CommercialStatus;
  'Review Required': string | boolean;
  'Review Reason': string;
}

export interface TicketVariant {
  type: 'Adult' | 'Child' | 'Senior' | 'Student' | 'Local' | 'Group';
  supplierPriceVND: number | null;
  vietanaPriceVND: number | null;
  priceNotes?: string;
  eligibility?: string;
}

export interface AttractionProduct {
  id: string; // e.g. VN-HMP-001
  name: string;
  type: string;
  venue: string;
  destination: string;
  cityProvince: string;
  region: RegionName;
  
  // Pricing (VND)
  supplierPrices: {
    adult: number | null;
    child: number | null;
    senior: number | null;
    student: number | null;
    local: number | null;
    group: number | null;
  };
  vietanaPrices: {
    adult: number | null;
    child: number | null;
    senior: number | null;
    student: number | null;
    local: number | null;
  };
  margin: {
    grossProfit: number | null;
    markupPercent: number | null;
    grossMarginPercent: number | null;
  };
  priceNotes: string;
  variants: TicketVariant[];

  // Eligibility & Requirements
  ageRequirement: string;
  heightRequirement: string;
  eligibility: string;
  validity: string;
  visitDateRequirement: string;
  timeSlotRequirement: string;
  bookingCutoff: string;
  cancellationPolicy: string;
  refundPolicy: string;

  // Inclusions & Features
  inclusions: string;
  exclusions: string;
  comboDetails: string;
  foodBuffetIncluded: boolean;
  showIncluded: boolean;
  cableCarIncluded: boolean;
  transportIncluded: boolean;

  // Source Traceability
  originalSupplierProductName: string;
  pdfSource: string;
  pdfPage: string | number;
  sourceReference: string;

  // Commercial & Governance
  commercialStatus: CommercialStatus;
  reviewRequired: boolean;
  reviewReason: string;

  // Media
  image: string;
}

export interface AttractionVenue {
  name: string;
  destination: string;
  cityProvince: string;
  region: RegionName;
  productCount: number;
  products: AttractionProduct[];
  image: string;
}

export interface AttractionDestination {
  name: string;
  cityProvince: string;
  region: RegionName;
  venues: AttractionVenue[];
  productCount: number;
}

export interface AttractionRegion {
  name: RegionName;
  destinations: AttractionDestination[];
  productCount: number;
}

export interface CatalogueHierarchy {
  regions: AttractionRegion[];
  totalProducts: number;
  totalVenues: number;
  totalDestinations: number;
}
