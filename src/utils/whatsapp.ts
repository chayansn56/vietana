export const WHATSAPP_NUMBERS = {
  INDIA: "919953294543",
  VIETNAM: "84904123456",
  DEFAULT: "919953294543"
};

export const buildWhatsAppLink = (phone: string, text?: string): string => {
  const base = `https://wa.me/${phone}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};

export const WHATSAPP_INDIA = buildWhatsAppLink(WHATSAPP_NUMBERS.INDIA, "Hi VIETANA, I'd like to plan my Vietnam trip!");
export const WHATSAPP_VIETNAM = buildWhatsAppLink(WHATSAPP_NUMBERS.VIETNAM, "Hi VIETANA, I'd like to plan my Vietnam trip!");
export const WHATSAPP_DEFAULT = WHATSAPP_INDIA;
