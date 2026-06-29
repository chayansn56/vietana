import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TravelStyle, FlightType, VisaType } from '../services/pricingService';
import { CITIES } from '../data/destinations';

interface TripBuilderState {
  selectedCities: string[];
  selectedSights: string[];
  style: TravelStyle;
  flightType: FlightType;
  visaType: VisaType;
  days: number;
  pax: number;
  notes: string;
  
  b2bEnabled: boolean;
  agencyName: string;
  agencyLogo: string;
  priceMarkup: number;

  setSelectedCities: (cities: string[] | ((prev: string[]) => string[])) => void;
  setSelectedSights: (sights: string[] | ((prev: string[]) => string[])) => void;
  setStyle: (style: TravelStyle) => void;
  setFlightType: (flight: FlightType) => void;
  setVisaType: (visa: VisaType) => void;
  setDays: (days: number) => void;
  setPax: (pax: number) => void;
  setNotes: (notes: string) => void;
  
  setB2bEnabled: (enabled: boolean) => void;
  setAgencyName: (name: string) => void;
  setAgencyLogo: (logo: string) => void;
  setPriceMarkup: (markup: number) => void;

  toggleCity: (city: string) => void;
  toggleSight: (sight: string) => void;
}

export const useTripBuilderStore = create<TripBuilderState>()(
  persist(
    (set) => ({
      selectedCities: [],
      selectedSights: [],
      style: 'comfort',
      flightType: 'round',
      visaType: 'single',
      days: 5,
      pax: 2,
      notes: '',
      
      b2bEnabled: false,
      agencyName: '',
      agencyLogo: '',
      priceMarkup: 10,

      setSelectedCities: (cities) => set((state) => ({
        selectedCities: typeof cities === 'function' ? cities(state.selectedCities) : cities
      })),
      
      setSelectedSights: (sights) => set((state) => ({
        selectedSights: typeof sights === 'function' ? sights(state.selectedSights) : sights
      })),
      
      setStyle: (style) => set({ style }),
      setFlightType: (flightType) => set({ flightType }),
      setVisaType: (visaType) => set({ visaType }),
      setDays: (days) => set({ days }),
      setPax: (pax) => set({ pax }),
      setNotes: (notes) => set({ notes }),
      
      setB2bEnabled: (b2bEnabled) => set({ b2bEnabled }),
      setAgencyName: (agencyName) => set({ agencyName }),
      setAgencyLogo: (agencyLogo) => set({ agencyLogo }),
      setPriceMarkup: (priceMarkup) => set({ priceMarkup }),

      toggleCity: (city) => set((state) => {
        const nextCities = state.selectedCities.includes(city) 
          ? state.selectedCities.filter(c => c !== city) 
          : [...state.selectedCities, city];
          
        let nextSights = state.selectedSights;
        if (state.selectedCities.includes(city)) {
          // City was removed, remove its sights
          const cityData = CITIES.find(c => c.name.toLowerCase() === city.toLowerCase());
          if (cityData) {
            const sightNames = cityData.sights.map(s => s.name);
            nextSights = state.selectedSights.filter(s => !sightNames.includes(s));
          }
        }
        
        return { selectedCities: nextCities, selectedSights: nextSights };
      }),
      
      toggleSight: (sight) => set((state) => ({
        selectedSights: state.selectedSights.includes(sight)
          ? state.selectedSights.filter(s => s !== sight)
          : [...state.selectedSights, sight]
      })),
    }),
    {
      name: 'vietana-trip-builder-storage',
    }
  )
);
