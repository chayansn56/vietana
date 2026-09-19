// =============================================================================
// VIETANA Central WhatsApp Configuration
// =============================================================================

export const VIETANA_WHATSAPP_VIETNAM = "84902434006";
export const VIETANA_WHATSAPP_INDIA = "919990977002";

export const WHATSAPP_NUMBERS = {
  VIETNAM: VIETANA_WHATSAPP_VIETNAM,
  INDIA: VIETANA_WHATSAPP_INDIA,
  DEFAULT: VIETANA_WHATSAPP_VIETNAM
};

export const buildWhatsAppLink = (phone: string, text?: string): string => {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  const base = `https://wa.me/${cleanPhone}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};

export const WHATSAPP_VIETNAM = buildWhatsAppLink(WHATSAPP_NUMBERS.VIETNAM, "Hi VIETANA, I'd like to plan my Vietnam trip!");
export const WHATSAPP_INDIA = buildWhatsAppLink(WHATSAPP_NUMBERS.INDIA, "Hi VIETANA, I'd like to plan my Vietnam trip!");
export const WHATSAPP_DEFAULT = WHATSAPP_VIETNAM;

/**
 * Builds pre-filled WhatsApp message for bookable attraction products
 */
export interface BookingMessageParams {
  attraction: string;
  productName: string;
  visitDate: string;
  adults: number;
  children?: number;
  estimatedTotal?: string;
  currency?: string;
}

export const buildAttractionBookingMessage = ({
  attraction,
  productName,
  visitDate,
  adults,
  children = 0,
  estimatedTotal,
  currency = 'VND'
}: BookingMessageParams): string => {
  let msg = `Hello VIETANA,\n\nI would like to book an attraction:\n\nAttraction: ${attraction}\nProduct: ${productName}\n\nVisit date: ${visitDate}\n\nAdults: ${adults}`;
  
  if (children > 0) {
    msg += `\nChildren: ${children}`;
  }

  if (estimatedTotal) {
    msg += `\n\nEstimated total: ${estimatedTotal}`;
    if (!estimatedTotal.includes(currency)) {
      msg += ` (${currency})`;
    }
  }

  msg += `\n\nPlease confirm availability and payment instructions.\n\nThank you.`;
  return msg;
};

/**
 * Builds pre-filled WhatsApp message for enquiry-only / restricted / review attraction products
 */
export interface EnquiryMessageParams {
  attraction: string;
  productName: string;
  visitDate?: string;
  adults?: number;
  children?: number;
}

export const buildAttractionEnquiryMessage = ({
  attraction,
  productName,
  visitDate,
  adults,
  children
}: EnquiryMessageParams): string => {
  let msg = `Hello VIETANA,\n\nI would like to enquire about:\n\nAttraction: ${attraction}\nProduct: ${productName}`;

  if (visitDate) {
    msg += `\n\nVisit date: ${visitDate}`;
  }

  if (adults !== undefined || children !== undefined) {
    msg += `\n\nNumber of adults: ${adults ?? 1}`;
    if (children && children > 0) {
      msg += `\nNumber of children: ${children}`;
    }
  }

  msg += `\n\nPlease confirm availability, eligibility and price.\n\nThank you.`;
  return msg;
};
