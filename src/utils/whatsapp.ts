export const WHATSAPP_NUMBERS = {
  VIETNAM: "84902434006",
  INDIA: "919990977002",
  DEFAULT: "84902434006"
};

export const buildWhatsAppLink = (phone: string, text?: string): string => {
  const base = `https://wa.me/${phone}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};

export const WHATSAPP_VIETNAM = buildWhatsAppLink(WHATSAPP_NUMBERS.VIETNAM, "Hi VIETANA, I'd like to plan my Vietnam trip!");
export const WHATSAPP_INDIA = buildWhatsAppLink(WHATSAPP_NUMBERS.INDIA, "Hi VIETANA, I'd like to plan my Vietnam trip!");
export const WHATSAPP_DEFAULT = WHATSAPP_VIETNAM;
