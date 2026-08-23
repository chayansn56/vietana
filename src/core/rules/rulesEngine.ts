import { TravelerProfile } from '../journey/state';

export interface RulesResult {
  avoidOvernightCruise: boolean;
  forceVegetarianMenu: boolean;
  notes: string[];
}

export function applyBusinessRules(profile: TravelerProfile): RulesResult {
  const notes: string[] = [];
  let avoidOvernightCruise = false;
  let forceVegetarianMenu = false;

  // Rule 1: Children under 3 years old -> Avoid overnight cruise
  if (profile.pax.children > 0) {
    avoidOvernightCruise = true;
    notes.push("Avoid overnight cruise stays due to baby safety preferences.");
  }

  // Rule 2: Vegetarian or Jain diet selection -> Force vegetarian menus
  if (profile.foodPreference === 'vegetarian' || profile.foodPreference === 'jain') {
    forceVegetarianMenu = true;
    notes.push("Mandate vegetarian dining options throughout the journey.");
  }

  return {
    avoidOvernightCruise,
    forceVegetarianMenu,
    notes
  };
}
