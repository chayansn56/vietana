export interface JourneyEvent {
  timestamp: string;
  type: string;
  payload: Record<string, any>;
}

export interface TravelerProfile {
  name?: string;
  passportUploaded?: boolean;
  nationality: string;
  pax: {
    adults: number;
    children: number;
  };
  duration: number; // in days
  budget: number; // target budget in INR
  travelStyle: 'budget' | 'comfort' | 'premium' | 'luxury';
  foodPreference: 'all' | 'vegetarian' | 'jain';
  departureCity: string;
  flightType: 'round' | 'oneway';
  visaType: 'single' | 'multiple';
}

export interface ItineraryDay {
  day: number;
  city: string;
  hotelClass: string;
  activities: string[];
  transfers: string;
  foodOptions?: string[];
  description?: string;
}

export interface TripEstimateItem {
  name: string;
  amount: number;
  description: string;
}

export interface TripEstimate {
  minTotal: number;
  maxTotal: number;
  items: TripEstimateItem[];
  currency: 'INR';
}

export interface JourneyState {
  version: "1.0.0";
  journeyId: string;
  events: JourneyEvent[];
  travelerProfile: TravelerProfile;
  itinerary: ItineraryDay[];
  pricing: TripEstimate;
  validation: {
    isValid: boolean;
    confidenceScore: {
      feasibility: number;
      budget: number;
      weather: number;
      pace: number;
      overall: number;
    };
    warnings: string[];
  };
  bookingStatus: {
    status?: 'inquiry' | 'reviewing' | 'sent' | 'deposit_paid' | 'confirmed';
    readinessScore: number;
    missingItems: string[];
  };
  featureFlags: {
    aiPlanner: boolean;
    aiHotelMatching: boolean;
    liveFlights: boolean;
    b2bPortal: boolean;
  };
}

export const initialJourneyState: JourneyState = {
  version: "1.0.0",
  journeyId: "",
  events: [],
  travelerProfile: {
    nationality: "Indian",
    pax: { adults: 2, children: 0 },
    duration: 5,
    budget: 150000,
    travelStyle: "comfort",
    foodPreference: "all",
    departureCity: "Delhi",
    flightType: "round",
    visaType: "single",
  },
  itinerary: [],
  pricing: {
    minTotal: 0,
    maxTotal: 0,
    items: [],
    currency: "INR"
  },
  validation: {
    isValid: true,
    confidenceScore: {
      feasibility: 100,
      budget: 100,
      weather: 100,
      pace: 100,
      overall: 100
    },
    warnings: []
  },
  bookingStatus: {
    readinessScore: 50,
    missingItems: ["Passport Details", "Flight Confirmation", "Initial Deposit"]
  },
  featureFlags: {
    aiPlanner: true,
    aiHotelMatching: false,
    liveFlights: false,
    b2bPortal: true
  }
};
