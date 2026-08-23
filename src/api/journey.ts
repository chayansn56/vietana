import { interpretIntent } from '../ai/interpreter';
import { designJourney } from '../ai/planner';
import { reviewJourney } from '../ai/reviewer';
import { applyBusinessRules } from '../core/rules/rulesEngine';
import { estimateTripCost } from '../core/pricing/pricingEstimator';
import { JourneyState, initialJourneyState } from '../core/journey/state';
import { journeyReducer } from '../core/journey/reducer';

export interface JourneyRequest {
  message: string;
  history: any[];
  contextState?: JourneyState;
}

export async function processJourneyRequest(
  request: JourneyRequest,
  apiKey?: string
): Promise<JourneyState> {
  const { message, history, contextState } = request;
  
  // 1. Load initial or existing state
  let state = contextState || { ...initialJourneyState, journeyId: `journey_${Date.now()}` };

  // 2. Parse conversational intent (Layer 1)
  const intentResult = await interpretIntent(message, history, apiKey);
  
  // Apply intent changes to profile state via reducer
  if (intentResult.travelerProfile) {
    state = journeyReducer(state, {
      type: 'UPDATE_PROFILE',
      payload: intentResult.travelerProfile
    });
  }

  // 3. Apply deterministic business rules
  const rulesResult = applyBusinessRules(state.travelerProfile);
  if (rulesResult.notes.length > 0) {
    state = journeyReducer(state, {
      type: 'LOG_EVENT',
      payload: { type: 'RULES_APPLIED', payload: rulesResult }
    });
  }

  // 4. Design detailed itinerary (Layer 2)
  const plannerResult = await designJourney(state.travelerProfile, message, apiKey);
  if (plannerResult.itinerary && plannerResult.itinerary.days.length > 0) {
    state = journeyReducer(state, {
      type: 'SET_ITINERARY',
      payload: plannerResult.itinerary.days
    });
  }

  // 5. Estimate cost via pure pricing engine (Layer 3)
  const estimatedPricing = estimateTripCost(state.travelerProfile);
  state = journeyReducer(state, {
    type: 'SET_PRICING',
    payload: estimatedPricing
  });

  // 6. Feasibility validation check (Layer 4)
  const reviewerResult = await reviewJourney(state, apiKey);
  state = journeyReducer(state, {
    type: 'SET_VALIDATION',
    payload: {
      isValid: reviewerResult.isValid,
      confidenceScore: reviewerResult.confidenceScore,
      warnings: reviewerResult.warnings
    }
  });

  return state;
}
