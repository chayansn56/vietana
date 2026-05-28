export type IntentType = 'generate' | 'refine' | 'food_preference' | 'group_preference' | 'unknown';

export interface Intent {
  type: IntentType;
  payload?: any;
}

export const IntentService = {
  parseIntent: (text: string): Intent => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes("generate") || lowerText.includes("final")) {
      return { type: 'generate' };
    }

    const negations = ["no", "wrong", "not this", "don't like", "change", "something else", "nope", "not good", "hmm", "maybe not"];
    if (negations.some(n => lowerText === n || lowerText.startsWith(n + " "))) {
      return { type: 'refine' };
    }

    if (lowerText.includes("indian food") || lowerText.includes("indian")) {
      return { type: 'food_preference', payload: "Indian" };
    }
    
    if (lowerText.includes("parent") || lowerText.includes("elderly") || lowerText.includes("family")) {
      return { type: 'group_preference', payload: "Family/Elderly" };
    }

    return { type: 'unknown' };
  }
};
