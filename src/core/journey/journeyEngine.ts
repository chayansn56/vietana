import { JourneyState, JourneyEvent } from './state';
import { journeyReducer, JourneyAction } from './reducer';

export type JourneyLifecycleStage =
  | 'INQUIRY'
  | 'AI_PLANNING'
  | 'PROPOSAL_GENERATED'
  | 'AGENT_REVIEW'
  | 'CUSTOMER_APPROVED'
  | 'BOOKING'
  | 'PAYMENT'
  | 'TRAVEL'
  | 'COMPLETED';

export type UserRole = 'Customer' | 'Agent' | 'Admin' | 'Partner' | 'Traveler';

export interface JourneyAlert {
  id: string;
  type: 'warning' | 'info' | 'critical';
  message: string;
  timestamp: string;
}

export class JourneyEngine {
  private state: JourneyState;
  private alerts: JourneyAlert[] = [];

  constructor(initialState: JourneyState) {
    this.state = initialState;
    this.initializeAlerts();
  }

  private initializeAlerts() {
    // Generate initial intelligence alert diagnostics based on state variables
    if (!this.state.travelerProfile.passportUploaded) {
      this.alerts.push({
        id: 'alt_1',
        type: 'warning',
        message: 'Customer has not uploaded passport scans yet.',
        timestamp: new Date().toLocaleTimeString()
      });
    }
    if (this.state.bookingStatus.readinessScore < 95) {
      this.alerts.push({
        id: 'alt_2',
        type: 'info',
        message: 'Travel dates confirmation pending customer check.',
        timestamp: new Date().toLocaleTimeString()
      });
    }
  }

  public getStage(): JourneyLifecycleStage {
    const status = this.state.bookingStatus.status;
    if (status === 'confirmed') return 'COMPLETED';
    if (status === 'deposit_paid') return 'TRAVEL';
    if (status === 'reviewing') return 'AGENT_REVIEW';
    if (status === 'sent') return 'CUSTOMER_APPROVED';
    return 'INQUIRY';
  }

  // Record a lifecycle or editing action in the event ledger
  public dispatch(action: JourneyAction) {
    this.state = journeyReducer(this.state, action);

    // Dynamic intelligence checks
    if (action.type === 'SET_PRICING') {
      this.alerts.push({
        id: `alt_override_${Date.now()}`,
        type: 'info',
        message: `Agent refined pricing to ₹${this.state.pricing.minTotal.toLocaleString('en-IN')}`,
        timestamp: new Date().toLocaleTimeString()
      });
    }
  }

  // Get active intelligence warnings and price notifications
  public getIntelligenceAlerts(): JourneyAlert[] {
    return this.alerts;
  }

  // Role-Based Views Filter
  public getRoleView(role: UserRole) {
    switch (role) {
      case 'Customer':
        return {
          itinerary: this.state.itinerary,
          pricing: {
            minTotal: this.state.pricing.minTotal,
            maxTotal: this.state.pricing.maxTotal
          },
          readiness: this.state.bookingStatus.readinessScore,
          vinaTips: [
            'Mid-week departures are often more economical.',
            'Booking 30–45 days in advance usually provides better choices.'
          ]
        };

      case 'Agent':
        return {
          itinerary: this.state.itinerary,
          pricing: this.state.pricing,
          margin: this.state.pricing.minTotal * 0.14,
          internalNotes: 'Grand Beach Hotel is offering 14% group booking contract margin.',
          timelineLedger: this.state.events
        };

      case 'Admin':
        return {
          fullState: this.state,
          alerts: this.alerts,
          auditHistory: this.state.events
        };

      case 'Partner':
        return {
          commission: this.state.pricing.minTotal * 0.14 * 0.3,
          travelerName: this.state.travelerProfile.name,
          route: this.state.itinerary.map(day => day.city)
        };

      case 'Traveler':
        return {
          liveItinerary: this.state.itinerary,
          vouchers: [
            { type: 'Flight', ref: 'VJ8912K', details: 'DEL -> DAD' },
            { type: 'Hotel', ref: 'Room 504', details: 'Grand Beach Hotel' }
          ],
          emergencyContact: '+84 90 243 4006 (VIETANA Direct Support)'
        };
    }
  }
}
export { JourneyEngine as default };
