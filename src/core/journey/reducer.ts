import { JourneyState, JourneyEvent } from './state';

export type JourneyAction =
  | { type: 'UPDATE_PROFILE'; payload: Partial<JourneyState['travelerProfile']> }
  | { type: 'SET_ITINERARY'; payload: JourneyState['itinerary'] }
  | { type: 'SET_PRICING'; payload: JourneyState['pricing'] }
  | { type: 'SET_VALIDATION'; payload: JourneyState['validation'] }
  | { type: 'SET_BOOKING_STATUS'; payload: JourneyState['bookingStatus'] }
  | { type: 'SET_FEATURE_FLAGS'; payload: Partial<JourneyState['featureFlags']> }
  | { type: 'LOG_EVENT'; payload: { type: string; payload: Record<string, any> } }
  | { type: 'LOAD_STATE'; payload: JourneyState };

export function journeyReducer(state: JourneyState, action: JourneyAction): JourneyState {
  const timestamp = new Date().toISOString();

  switch (action.type) {
    case 'UPDATE_PROFILE': {
      const updatedProfile = { ...state.travelerProfile, ...action.payload };
      const event: JourneyEvent = {
        timestamp,
        type: 'UPDATE_PROFILE',
        payload: action.payload,
      };
      return {
        ...state,
        travelerProfile: updatedProfile,
        events: [...state.events, event],
      };
    }
    case 'SET_ITINERARY': {
      const event: JourneyEvent = {
        timestamp,
        type: 'SET_ITINERARY',
        payload: { count: action.payload.length },
      };
      return {
        ...state,
        itinerary: action.payload,
        events: [...state.events, event],
      };
    }
    case 'SET_PRICING': {
      const event: JourneyEvent = {
        timestamp,
        type: 'SET_PRICING',
        payload: { minTotal: action.payload.minTotal, maxTotal: action.payload.maxTotal },
      };
      return {
        ...state,
        pricing: action.payload,
        events: [...state.events, event],
      };
    }
    case 'SET_VALIDATION': {
      return {
        ...state,
        validation: action.payload,
      };
    }
    case 'SET_BOOKING_STATUS': {
      return {
        ...state,
        bookingStatus: action.payload,
      };
    }
    case 'SET_FEATURE_FLAGS': {
      return {
        ...state,
        featureFlags: { ...state.featureFlags, ...action.payload },
      };
    }
    case 'LOG_EVENT': {
      const event: JourneyEvent = {
        timestamp,
        type: action.payload.type,
        payload: action.payload.payload,
      };
      return {
        ...state,
        events: [...state.events, event],
      };
    }
    case 'LOAD_STATE': {
      return {
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
