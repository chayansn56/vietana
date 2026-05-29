import { buildWhatsAppLink, WHATSAPP_NUMBERS } from '../utils/whatsapp';

export const MessagingService = {
  // WhatsApp Generation
  generateCustomTripWhatsApp: (
    selectedCities: string[],
    style: string,
    days: number,
    pax: number,
    estimateTotal: number,
    notes: string
  ): string => {
    const styleText = style === 'budget' ? 'Backpacker' : style === 'comfort' ? 'Comfort' : 'Luxury';
    let msg = `Hi VIETANA! I just built a custom trip on your website.\n\n`;
    msg += `*Details:*\n`;
    msg += `- Destinations: ${selectedCities.length > 0 ? selectedCities.join(', ') : 'Not selected'}\n`;
    msg += `- Style: ${styleText}\n`;
    msg += `- Duration: ${days} Days\n`;
    msg += `- Travelers: ${pax} ${pax === 1 ? 'Person' : 'People'}\n\n`;
    msg += `*Estimated Budget:* ₹${estimateTotal.toLocaleString('en-IN')}\n`;
    
    if (notes.trim()) {
      msg += `\n*My Notes:*\n${notes}\n`;
    }
    
    msg += `\nCould you send me a detailed itinerary?`;
    
    return buildWhatsAppLink(WHATSAPP_NUMBERS.INDIA, msg);
  },

  generateBlueprintWhatsApp: (
    focus: string | undefined,
    vibe: string | undefined,
    style: string | undefined,
    food: string | undefined,
    country: 'INDIA' | 'VIETNAM' = 'INDIA'
  ): string => {
    const msg = `Hi VIETANA! I just finished my planning session:\n\nFocus: ${focus}\nVibe: ${vibe}\nStyle: ${style}\nFood: ${food}\n\nI'd like to discuss this further!`;
    return buildWhatsAppLink(WHATSAPP_NUMBERS[country], msg);
  },

  generateFoodInterestWhatsApp: (foodName: string): string => {
    const msg = `Hi VIETANA, I'm interested in trying ${foodName} during my trip!`;
    return buildWhatsAppLink(WHATSAPP_NUMBERS.INDIA, msg);
  },

  generateFoodPreferencesWhatsApp: (preferences: string): string => {
    const msg = `Hi VIETANA, my food preferences: ${preferences}`;
    return buildWhatsAppLink(WHATSAPP_NUMBERS.INDIA, msg);
  },

  // Email Generation
  generateBlueprintEmail: (
    focus: string | undefined,
    vibe: string | undefined,
    style: string | undefined,
    food: string | undefined,
    email: string = 'support@vietana.com'
  ): string => {
    const body = `Hi VIETANA! I just finished my planning session:\n\nFocus: ${focus}\nVibe: ${vibe}\nStyle: ${style}\nFood: ${food}\n\nI'd like to discuss this further!`;
    return `mailto:${email}?subject=${encodeURIComponent('My Vietnam Journey Blueprint')}&body=${encodeURIComponent(body)}`;
  },
  
  generateGeneralSupportEmail: (): string => {
    return 'mailto:info@vietana.com';
  }
};
