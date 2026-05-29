import { IntentService } from '../services/intentService';

export interface Preferences {
  vibe?: string;
  style?: string;
  food?: string;
  group?: string;
  nightlife?: string;
  focus?: string;
  extras?: string;
}

export interface CoreQuestion {
  field: keyof Preferences;
  q: string;
  opts: string[];
}

export const CORE_QUESTIONS: CoreQuestion[] = [
  { field: 'vibe', q: "First, what's your ultimate Vietnam dream?", opts: ['🏖️ Beautiful Beaches','🗺️ Hidden & Adventure','⚖️ A mix of both'] },
  { field: 'style', q: "What is your travel style and budget?", opts: ['✨ Premium & Luxury','🎒 Backpacking & Budget','🏨 Smart Comfortable Stays'] },
  { field: 'food', q: "Is food comfort important to you?", opts: ['🍛 Need Indian food mostly','🍜 Excited for local food','⚖️ Balance of both'] },
  { field: 'extras', q: "How do you like your travel pace?", opts: ['Chill & slow','Packed with adventure','Balanced'] },
  { field: 'nightlife', q: "Are you looking for vibrant nightlife or peaceful escapes?", opts: ['🌙 Vibrant Nightlife','🧘 Peaceful & Quiet','⚖️ A bit of both'] }
];

export type PlannerMode = 'GATHERING_PREFS' | 'REFINING' | 'FINISHED';

export interface PlannerStateResult {
  nextBotMessages: { text: string; options?: string[]; type?: 'bot' | 'blueprint'; delay?: number }[];
  updatedPreferences: Preferences;
  mode: PlannerMode;
  questionIndex: number;
}

export const PlannerStateMachine = {
  getInitialState: (greeting: string, initialDestination?: string): PlannerStateResult => {
    const defaultPrefs: Preferences = {
      focus: initialDestination || undefined
    };

    const firstQ = CORE_QUESTIONS[0];
    const msgs = [];

    if (initialDestination) {
      msgs.push({ text: `I see you are interested in exploring <strong>${initialDestination}</strong>. Let's build your trip around this beautiful destination!`, delay: 0 });
      msgs.push({ text: firstQ.q, options: firstQ.opts, delay: 500 });
    } else {
      msgs.push({ text: greeting, delay: 0 });
      msgs.push({ text: firstQ.q, options: firstQ.opts, delay: 500 });
    }

    return {
      nextBotMessages: msgs,
      updatedPreferences: defaultPrefs,
      mode: 'GATHERING_PREFS',
      questionIndex: 0
    };
  },

  processInput: (
    currentPreferences: Preferences,
    mode: PlannerMode,
    questionIndex: number,
    text: string
  ): PlannerStateResult => {
    const intent = IntentService.parseIntent(text);
    const result: PlannerStateResult = {
      nextBotMessages: [],
      updatedPreferences: { ...currentPreferences },
      mode,
      questionIndex
    };

    switch (intent.type) {
      case 'generate':
        result.mode = 'FINISHED';
        result.nextBotMessages.push({ text: "Beautiful! 🌿 Crafting your personalized Vietnam story based on your preferences..." });
        result.nextBotMessages.push({ text: '', type: 'blueprint', delay: 1500 });
        break;
      
      case 'refine':
        result.mode = 'REFINING';
        result.nextBotMessages.push({ 
          text: "😊 No worries. I may have missed something. Tell me what feels wrong and I’ll improve it.", 
          options: ['🍛 Food','🌊 Beaches','🌃 Nightlife','💰 Budget','💕 Romance','👨‍👩‍👧 Family','🌴 Hidden places'] 
        });
        break;

      case 'food_preference':
        result.updatedPreferences.food = intent.payload;
        result.nextBotMessages.push({ 
          text: `🍛 Got it. Updated your journey:<br><br>Indian food priority: HIGH<br><br>Refining recommendations... What should I improve next?`, 
          options: ['No, generate itinerary', 'Change pace', 'Add luxury'] 
        });
        break;

      case 'group_preference':
        result.updatedPreferences.group = intent.payload;
        result.nextBotMessages.push({ 
          text: `🏠 Got it. Updated your journey:<br><br>Family comfort mode: ON<br><br>Refining recommendations... What should I improve next?`, 
          options: ['No, generate itinerary', 'Change food', 'Add luxury'] 
        });
        break;

      case 'unknown':
      default:
        if (mode === 'REFINING') {
          result.mode = 'GATHERING_PREFS';
          result.nextBotMessages.push({ 
            text: "Got it! I've updated your plan with those details. Should we generate your final match now?", 
            options: ['Generate Itinerary', 'Wait, add one more thing'] 
          });
        } else if (mode === 'GATHERING_PREFS') {
          const currentQIndex = CORE_QUESTIONS.findIndex(q => !currentPreferences[q.field]);
          const currentQ = CORE_QUESTIONS[currentQIndex];
          
          if (currentQ) {
            result.updatedPreferences[currentQ.field] = text;
            
            const nextQIndex = CORE_QUESTIONS.findIndex(q => !result.updatedPreferences[q.field]);
            const nextQ = CORE_QUESTIONS[nextQIndex];
            
            if (nextQ) {
              result.questionIndex = nextQIndex;
              result.nextBotMessages.push({ text: nextQ.q, options: nextQ.opts });
            } else {
              result.nextBotMessages.push({ 
                text: "YOUR VIETANA™ MATCH is ready! I have high confidence in these recommendations based on your profile.<br><br>Does everything look good?", 
                options: ['Generate Itinerary', 'Change something'] 
              });
            }
          }
        }
        break;
    }

    return result;
  }
};
