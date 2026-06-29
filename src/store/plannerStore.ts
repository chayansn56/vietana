import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  text: string;
  type: 'bot' | 'user' | 'blueprint';
}

export interface Preferences {
  focus?: string;
  vibe?: string;
  style?: string;
  food?: string;
  group?: string;
  nightlife?: string;
  extras?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  food: string[];
}

export interface Itinerary {
  title: string;
  days: ItineraryDay[];
}

export interface HistoryPart {
  text: string;
}

export interface HistoryItem {
  role: string;
  parts: HistoryPart[];
}

interface PlannerState {
  messages: Message[];
  history: HistoryItem[];
  preferences: Preferences;
  itinerary: Itinerary | null;
  
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  setHistory: (history: HistoryItem[] | ((prev: HistoryItem[]) => HistoryItem[])) => void;
  setPreferences: (preferences: Preferences | ((prev: Preferences) => Preferences)) => void;
  setItinerary: (itinerary: Itinerary | null) => void;
  
  resetPlanner: () => void;
}

const DEFAULT_GREETING = "Namaste! I'm your local Vietana expert. Ask me anything about Vietnam, from the best Indian restaurants in Hanoi to hidden gems in Da Nang! How can I help you plan your dream trip today?";

export const usePlannerStore = create<PlannerState>()(
  persist(
    (set) => ({
      messages: [],
      history: [],
      preferences: {},
      itinerary: null,

      setMessages: (messages) => set((state) => ({
        messages: typeof messages === 'function' ? messages(state.messages) : messages
      })),
      
      setHistory: (history) => set((state) => ({
        history: typeof history === 'function' ? history(state.history) : history
      })),
      
      setPreferences: (preferences) => set((state) => ({
        preferences: typeof preferences === 'function' ? preferences(state.preferences) : preferences
      })),
      
      setItinerary: (itinerary) => set({ itinerary }),
      
      resetPlanner: () => set({
        messages: [{ text: DEFAULT_GREETING, type: 'bot' }],
        history: [],
        preferences: {},
        itinerary: null,
      })
    }),
    {
      name: 'vietana-ai-storage',
    }
  )
);
