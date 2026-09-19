import React, { useState, useMemo } from 'react';
import { AttractionProduct } from '../../data/attractions/types';
import { Currency } from '../../contexts/CurrencyContext';
import { formatPriceVND } from '../AttractionCatalogue';
import { 
  VIETANA_WHATSAPP_VIETNAM, 
  VIETANA_WHATSAPP_INDIA, 
  buildWhatsAppLink, 
  buildAttractionBookingMessage, 
  buildAttractionEnquiryMessage 
} from '../../utils/whatsapp';
import { trackEvent } from '../../utils/analytics';
import Icon from '../ui/Icon';

interface AttractionBookingWidgetProps {
  product: AttractionProduct;
  currency: Currency;
  onBookSubmitted?: () => void;
  className?: string;
}

export default function AttractionBookingWidget({
  product,
  currency,
  onBookSubmitted,
  className = ''
}: AttractionBookingWidgetProps) {
  // Tomorrow as default visit date
  const defaultDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  const [visitDate, setVisitDate] = useState<string>(defaultDate);
  const [adultQty, setAdultQty] = useState<number>(1);
  const [childQty, setChildQty] = useState<number>(0);
  const [contactCountry, setContactCountry] = useState<'VIETNAM' | 'INDIA'>('VIETNAM');

  // Bookable check: READY or STRATEGIC_LOW_MARGIN with a valid adult price
  const isBookable = useMemo(() => {
    return (
      (product.commercialStatus === 'READY' || product.commercialStatus === 'STRATEGIC_LOW_MARGIN') &&
      product.vietanaPrices.adult !== null &&
      product.vietanaPrices.adult > 0
    );
  }, [product]);

  const hasChildPrice = product.vietanaPrices.child !== null && product.vietanaPrices.child > 0;

  // Total VND calculation
  const totalVND = useMemo(() => {
    if (!isBookable || product.vietanaPrices.adult === null) return 0;
    const adultTotal = adultQty * product.vietanaPrices.adult;
    const childTotal = hasChildPrice && product.vietanaPrices.child ? childQty * product.vietanaPrices.child : 0;
    return adultTotal + childTotal;
  }, [isBookable, product.vietanaPrices, adultQty, childQty, hasChildPrice]);

  // Formatted date string for WhatsApp message (e.g. "25 September 2026")
  const formattedVisitDate = useMemo(() => {
    if (!visitDate) return 'Flexible';
    try {
      const [y, m, d] = visitDate.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return visitDate;
    }
  }, [visitDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setVisitDate(val);
    trackEvent('attraction_date_selected', {
      product_id: product.id,
      visit_date: val
    });
  };

  const handleAdultChange = (delta: number) => {
    const next = Math.max(1, Math.min(20, adultQty + delta));
    setAdultQty(next);
    trackEvent('attraction_quantity_changed', {
      product_id: product.id,
      variant: 'adult',
      quantity: next
    });
  };

  const handleChildChange = (delta: number) => {
    const next = Math.max(0, Math.min(20, childQty + delta));
    setChildQty(next);
    trackEvent('attraction_quantity_changed', {
      product_id: product.id,
      variant: 'child',
      quantity: next
    });
  };

  const selectedPhone = contactCountry === 'VIETNAM' ? VIETANA_WHATSAPP_VIETNAM : VIETANA_WHATSAPP_INDIA;

  const handleActionClick = () => {
    // Analytics tracking with safe non-PII metadata
    trackEvent('whatsapp_booking_clicked', {
      product_id: product.id,
      destination: product.destination,
      attraction: product.venue,
      product_type: product.type,
      contact_region: contactCountry,
      is_bookable: isBookable,
      adults: adultQty,
      children: hasChildPrice ? childQty : 0
    });

    let message = '';
    if (isBookable) {
      message = buildAttractionBookingMessage({
        attraction: product.venue,
        productName: product.name,
        visitDate: formattedVisitDate,
        adults: adultQty,
        children: hasChildPrice ? childQty : 0,
        estimatedTotal: formatPriceVND(totalVND, currency),
        currency: currency
      });
    } else {
      message = buildAttractionEnquiryMessage({
        attraction: product.venue,
        productName: product.name,
        visitDate: formattedVisitDate,
        adults: adultQty,
        children: childQty > 0 ? childQty : undefined
      });
    }

    const waUrl = buildWhatsAppLink(selectedPhone, message);
    window.open(waUrl, '_blank');
    onBookSubmitted?.();
  };

  return (
    <div className={`bg-[#FAF7F0] border border-[#E8E4D9] rounded-2xl p-5 space-y-5 shadow-xs ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-3">
        <div>
          <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-[#B8860B] block">
            {isBookable ? '⚡ Direct WhatsApp Booking' : '💬 WhatsApp Enquiry'}
          </span>
          <h3 className="text-sm font-bold text-[#12302B]">
            {isBookable ? 'Reserve Your Tickets' : 'Enquire About Availability'}
          </h3>
        </div>
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
          <Icon name="MessageCircle" size={18} />
        </div>
      </div>

      {/* Field 1: Visit Date */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-mono">
          1. Select Visit Date <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            min={todayStr}
            value={visitDate}
            onChange={handleDateChange}
            className="w-full bg-white border border-[#E8E4D9] rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-[#12302B] font-medium focus:outline-none focus:border-[#12302B] transition-colors cursor-pointer touch-manipulation"
          />
        </div>
        {product.visitDateRequirement && (
          <p className="text-[9px] text-gray-500 mt-1 font-mono">
            ℹ️ {product.visitDateRequirement}
          </p>
        )}
      </div>

      {/* Field 2: Quantities */}
      <div className="space-y-3">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 font-mono">
          2. Select Quantity
        </label>

        {/* Adult Quantity */}
        <div className="bg-white border border-[#E8E4D9] rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#12302B] block">Adult</span>
            <span className="text-[10px] text-gray-500">
              {product.vietanaPrices.adult !== null 
                ? formatPriceVND(product.vietanaPrices.adult, currency) 
                : 'Price on Enquiry'}
            </span>
            {product.heightRequirement && (
              <span className="text-[8.5px] text-gray-400 block font-mono">
                {product.heightRequirement}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleAdultChange(-1)}
              disabled={adultQty <= 1}
              className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg border border-[#E8E4D9] bg-[#FAF7F0] text-[#12302B] font-bold hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center text-sm touch-manipulation"
              aria-label="Decrease adult count"
            >
              -
            </button>
            <span className="w-7 sm:w-6 text-center text-sm sm:text-xs font-black font-mono text-[#12302B]">
              {adultQty}
            </span>
            <button
              type="button"
              onClick={() => handleAdultChange(1)}
              disabled={adultQty >= 20}
              className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg border border-[#E8E4D9] bg-[#FAF7F0] text-[#12302B] font-bold hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center text-sm touch-manipulation"
              aria-label="Increase adult count"
            >
              +
            </button>
          </div>
        </div>

        {/* Child Quantity (ONLY if child price exists in dataset) */}
        {hasChildPrice ? (
          <div className="bg-white border border-[#E8E4D9] rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-800 block">Child</span>
              <span className="text-[10px] text-emerald-700">
                {formatPriceVND(product.vietanaPrices.child, currency)}
              </span>
              {product.ageRequirement && (
                <span className="text-[8.5px] text-gray-400 block font-mono">
                  {product.ageRequirement}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleChildChange(-1)}
                disabled={childQty <= 0}
                className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg border border-[#E8E4D9] bg-[#FAF7F0] text-[#12302B] font-bold hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center text-sm touch-manipulation"
                aria-label="Decrease child count"
              >
                -
              </button>
              <span className="w-7 sm:w-6 text-center text-sm sm:text-xs font-black font-mono text-[#12302B]">
                {childQty}
              </span>
              <button
                type="button"
                onClick={() => handleChildChange(1)}
                disabled={childQty >= 20}
                className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg border border-[#E8E4D9] bg-[#FAF7F0] text-[#12302B] font-bold hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center text-sm touch-manipulation"
                aria-label="Increase child count"
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/60 border border-dashed border-[#E8E4D9] rounded-xl p-2.5 text-center">
            <span className="text-[9.5px] text-gray-500 font-mono">
              Child pricing: Contact us on WhatsApp for age & height eligibility
            </span>
          </div>
        )}
      </div>

      {/* Field 3: WhatsApp Support Channel Selection */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 font-mono">
          3. How would you like to contact VIETANA?
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setContactCountry('VIETNAM')}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              contactCountry === 'VIETNAM'
                ? 'bg-[#12302B] text-white border-[#12302B] shadow-xs'
                : 'bg-white text-gray-700 border-[#E8E4D9] hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-sm">🇻🇳</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Vietnam</span>
            </div>
            <span className={`text-[9px] font-mono block ${contactCountry === 'VIETNAM' ? 'text-emerald-300' : 'text-gray-500'}`}>
              +84 902 434 006
            </span>
          </button>

          <button
            type="button"
            onClick={() => setContactCountry('INDIA')}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              contactCountry === 'INDIA'
                ? 'bg-[#12302B] text-white border-[#12302B] shadow-xs'
                : 'bg-white text-gray-700 border-[#E8E4D9] hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-sm">🇮🇳</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">India</span>
            </div>
            <span className={`text-[9px] font-mono block ${contactCountry === 'INDIA' ? 'text-emerald-300' : 'text-gray-500'}`}>
              +91 99909 77002
            </span>
          </button>
        </div>
        <p className="text-[8.5px] text-gray-400 italic">
          Not sure which number to use? Choose either — our team will assist you.
        </p>
      </div>

      {/* Booking Summary Box */}
      <div className="bg-white border border-[#E8E4D9] rounded-xl p-3.5 space-y-2">
        <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-2">
          <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-gray-500">
            Booking Summary
          </span>
          <span className="text-[8.5px] font-mono text-gray-400">
            {formattedVisitDate}
          </span>
        </div>

        <div className="space-y-1 text-xs text-[#12302B]">
          <div className="flex justify-between">
            <span>Adult × {adultQty}</span>
            <span className="font-mono">
              {product.vietanaPrices.adult !== null 
                ? formatPriceVND(adultQty * product.vietanaPrices.adult, currency) 
                : 'Quote on Request'}
            </span>
          </div>

          {hasChildPrice && childQty > 0 && product.vietanaPrices.child && (
            <div className="flex justify-between text-emerald-800">
              <span>Child × {childQty}</span>
              <span className="font-mono">
                {formatPriceVND(childQty * product.vietanaPrices.child, currency)}
              </span>
            </div>
          )}

          {isBookable && (
            <div className="border-t border-[#E8E4D9] pt-2 mt-2 flex items-baseline justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#12302B]">
                Estimated Total:
              </span>
              <div className="text-right">
                <span className="text-base font-black text-[#12302B]">
                  {formatPriceVND(totalVND, currency)}
                </span>
                {currency !== 'VND' && (
                  <span className="text-[8.5px] text-gray-400 font-mono block">
                    Base: {formatPriceVND(totalVND, 'VND')}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trust & Payment Notice */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-[9.5px] text-amber-900 leading-relaxed space-y-1">
        <div className="font-bold flex items-center gap-1 text-[#12302B]">
          <span>⚡</span>
          <span>Availability will be confirmed by VIETANA before payment.</span>
        </div>
        <p className="text-gray-600">
          After we confirm availability, our team will send you payment instructions. Your ticket will be processed after payment confirmation.
        </p>
        <p className="text-emerald-800 font-bold font-mono">
          ✓ Fast confirmation — usually within 30 minutes after payment confirmation.
        </p>
      </div>

      {/* Primary CTA Button */}
      <button
        type="button"
        onClick={handleActionClick}
        className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer border-none ${
          isBookable
            ? 'bg-[#12302B] hover:bg-[#1E4D45] text-white'
            : 'bg-emerald-700 hover:bg-emerald-800 text-white'
        }`}
      >
        <Icon name="MessageCircle" size={18} />
        <span>
          {isBookable 
            ? `BOOK ON WHATSAPP (${contactCountry === 'VIETNAM' ? '🇻🇳 +84' : '🇮🇳 +91'})`
            : `ENQUIRE ON WHATSAPP (${contactCountry === 'VIETNAM' ? '🇻🇳 +84' : '🇮🇳 +91'})`
          }
        </span>
      </button>
    </div>
  );
}
