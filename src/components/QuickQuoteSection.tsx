import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { WHATSAPP_NUMBERS, buildWhatsAppLink } from '../utils/whatsapp';
import { handleLeadSuccess } from '../utils/analytics';
import { getAttributionPayload } from '../utils/attribution';
import Icon from './ui/Icon';
import { Heading, Text } from './ui/Typography';
import Container from './ui/layout/Container';
import Modal from './ui/Modal';

const MONTH_OPTIONS = [
  'July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026',
  'January 2027', 'February 2027', 'March 2027', 'April 2027', 'May 2027', 'June 2027'
];

const DEPARTURE_CITIES = [
  'Delhi (DEL)', 'Mumbai (BOM)', 'Bangalore (BLR)', 'Chennai (MAA)', 'Kolkata (CCU)', 'Hyderabad (HYD)', 'Other Indian City'
];

const DESTINATIONS = [
  'Vietnam (All Highlights)', 'Hanoi & Ha Long Bay', 'Da Nang & Hoi An', 'Ho Chi Minh & South'
];

const TRAVELERS_OPTIONS = [
  '1 Traveler', '2 Travelers (Couple)', '3 Travelers', '4+ Travelers (Family/Group)'
];

export default function QuickQuoteSection() {
  const { t } = useTranslation();
  
  // Selection states
  const [fromCity, setFromCity] = useState('Delhi (DEL)');
  const [goingTo, setGoingTo] = useState('Vietnam (All Highlights)');
  const [travelMonth, setTravelMonth] = useState('October 2026');
  const [travelers, setTravelers] = useState('2 Travelers (Couple)');
  
  // Modal & Contact states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappNumber.trim()) return;
    setIsSubmitting(true);
    setApiError(null);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `Lead from Delhi/BOM Search Bar`,
          email: 'search-lead@vietana.com',
          phoneCode: countryCode,
          phone: whatsappNumber.trim(),
          travelDate: travelMonth,
          travelers: travelers,
          service: 'Tour Package',
          message: `Inquiry from Search bar: From ${fromCity} going to ${goingTo}. Month of Travel: ${travelMonth}. Travelers: ${travelers}.`,
          source: 'Mockup Style Horizontal Search Bar',
          ...getAttributionPayload()
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success || !result.leadId) {
        throw new Error(result.error || 'Failed to submit inquiry');
      }

      handleLeadSuccess(result, 'Quick Quote Bar');

      // 2. Save locally and pre-fill the main inquiry form draft
      const leadData = {
        fromCity,
        goingTo,
        travelMonth,
        travelers,
        whatsappNumber: `${countryCode}${whatsappNumber.trim()}`
      };
      localStorage.setItem('vietana_search_lead', JSON.stringify(leadData));
      
      sessionStorage.setItem('vietana_inquiry_draft', JSON.stringify({
        phoneCode: countryCode,
        phone: whatsappNumber.trim(),
        travelDate: travelMonth,
        travelers: travelers.includes('1') ? '1' : (travelers.includes('2') ? '2' : '4'),
        message: `Search Lead details submitted. From ${fromCity} going to ${goingTo}. Traveling with: ${travelers}.`
      }));
      window.dispatchEvent(new CustomEvent('vietana_inquiry_draft_updated'));

      // 3. Store name and WhatsApp redirect link for the Thank You page
      sessionStorage.setItem('vietana_lead_name', `Search Lead (${travelers})`);
      
      const message = `Hello VIETANA! I want to plan a trip from ${fromCity} to ${goingTo} in ${travelMonth} for ${travelers}. My WhatsApp number is ${countryCode} ${whatsappNumber.trim()}. Please send me a free quote!`;
      const waLink = buildWhatsAppLink(WHATSAPP_NUMBERS.VIETNAM, message);
      sessionStorage.setItem('vietana_redirect_whatsapp', waLink);

      setIsModalOpen(false);

      // 4. Redirect to thank you page
      window.location.hash = '#/thank-you';
    } catch (err: any) {
      console.error('Failed to submit search lead:', err);
      setApiError(err.message || 'Failed to save inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quick-quote" className="py-10 bg-[#FAF8F3] dark:bg-black border-b border-black/5 dark:border-white/5">
      <Container className="max-w-6xl px-6 flex flex-col items-center text-center">
        
        {/* Mockup styled Horizontal Search Bar */}
        <form 
          onSubmit={handleSearchClick}
          className="w-full max-w-[1150px] bg-white dark:bg-[#111] border border-[#E6D9BF] dark:border-white/10 rounded-[28px] p-4.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between shadow-2xl gap-4 text-left pointer-events-auto"
        >
          {/* From City */}
          <div className="flex-1 flex flex-col gap-1 px-3 border-r border-[#E6D9BF]/30 dark:border-white/10 lg:last:border-none">
            <label className="text-[10px] font-mono tracking-wider uppercase text-[#1E4D45] dark:text-brand-gold font-extrabold flex items-center gap-1.5">
              <Icon name="MapPin" size={12} className="text-[#1E4D45] dark:text-brand-gold" /> From
            </label>
            <select 
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full bg-transparent border-none p-0 text-xs text-[#12302B] dark:text-white focus:outline-none cursor-pointer font-bold h-7"
            >
              {DEPARTURE_CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Going To */}
          <div className="flex-1 flex flex-col gap-1 px-3 border-r border-[#E6D9BF]/30 dark:border-white/10 lg:last:border-none">
            <label className="text-[10px] font-mono tracking-wider uppercase text-[#1E4D45] dark:text-brand-gold font-extrabold flex items-center gap-1.5">
              <Icon name="MapPin" size={12} className="text-[#1E4D45] dark:text-brand-gold" /> Going to
            </label>
            <select 
              value={goingTo}
              onChange={(e) => setGoingTo(e.target.value)}
              className="w-full bg-transparent border-none p-0 text-xs text-[#12302B] dark:text-white focus:outline-none cursor-pointer font-bold h-7"
            >
              {DESTINATIONS.map((dest) => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>

          {/* Travel Dates */}
          <div className="flex-1 flex flex-col gap-1 px-3 border-r border-[#E6D9BF]/30 dark:border-white/10 lg:last:border-none">
            <label className="text-[10px] font-mono tracking-wider uppercase text-[#1E4D45] dark:text-brand-gold font-extrabold flex items-center gap-1.5">
              <Icon name="Calendar" size={12} className="text-[#1E4D45] dark:text-brand-gold" /> Travel Dates
            </label>
            <select 
              value={travelMonth}
              onChange={(e) => setTravelMonth(e.target.value)}
              className="w-full bg-transparent border-none p-0 text-xs text-[#12302B] dark:text-white focus:outline-none cursor-pointer font-bold h-7"
            >
              {MONTH_OPTIONS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Travelers */}
          <div className="flex-1 flex flex-col gap-1 px-3 border-r border-[#E6D9BF]/30 dark:border-white/10 lg:last:border-none">
            <label className="text-[10px] font-mono tracking-wider uppercase text-[#1E4D45] dark:text-brand-gold font-extrabold flex items-center gap-1.5">
              <Icon name="Users" size={12} className="text-[#1E4D45] dark:text-brand-gold" /> Travelers
            </label>
            <select 
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="w-full bg-transparent border-none p-0 text-xs text-[#12302B] dark:text-white focus:outline-none cursor-pointer font-bold h-7"
            >
              {TRAVELERS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="bg-[#E8C84A] hover:bg-[#d8b83a] text-[#12302B] px-8 py-4 rounded-2xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-colors border-none shrink-0"
          >
            🔥 Plan My Trip <Icon name="Search" size={13} className="text-[#12302B]" />
          </button>
        </form>

        {/* Social Proof Badges row below search bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-6 text-[#12302B] dark:text-white/80 text-xxs sm:text-xs font-semibold">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <img className="w-6 h-6 rounded-full border border-white dark:border-black object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80" alt="Traveler" />
              <img className="w-6 h-6 rounded-full border border-white dark:border-black object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" alt="Traveler" />
              <img className="w-6 h-6 rounded-full border border-white dark:border-black object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" alt="Traveler" />
            </div>
            <span className="flex items-center gap-1">
              ⭐⭐⭐⭐⭐ <span className="opacity-80">4.9/5 from 1,200+ Indian travelers</span>
            </span>
          </div>
          
          <span className="flex items-center gap-1.5">
            <Icon name="Users" size={13} className="text-brand-gold" /> 8,000+ Indian travelers planned with Vietana
          </span>

          <span className="flex items-center gap-1.5">
            <Icon name="Shield" size={13} className="text-brand-gold" /> Trusted local partner in Vietnam
          </span>
        </div>

      </Container>

      {/* Frosted Glass Contact Details capture modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Send Custom Plan"
        className="max-w-md p-6 bg-white/95 supports-[backdrop-filter]:bg-white/80 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-deep"
      >
        <div className="text-left flex flex-col gap-4 mt-2">
          <Heading as="h3" size="none" font="serif" className="text-[#12302B] text-xl font-extrabold m-0">
            Almost Ready!
          </Heading>
          <Text size="sm" className="text-[#12302B]/85 font-medium">
            Where should we send your custom itinerary from **{fromCity}** to **{goingTo}**?
          </Text>

          <form onSubmit={handleModalSubmit} className="flex flex-col gap-4 mt-1">
            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl text-xs text-center">
                {apiError}
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider uppercase text-[#1E4D45] font-extrabold flex items-center gap-1">
                <Icon name="MessageCircle" size={11} /> WhatsApp Number
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-white border border-[#E6D9BF] rounded-xl px-3 py-3 text-base md:text-sm text-[#12302B] focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold cursor-pointer font-bold shrink-0 w-20"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+84">🇻🇳 +84</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+971">🇦🇪 +971</option>
                </select>
                <input 
                  type="tel"
                  required
                  autoFocus
                  placeholder="Enter phone number"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 bg-white border border-[#E6D9BF] rounded-xl px-4 py-3 text-base md:text-sm text-[#12302B] focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold font-bold placeholder-[#12302B]/40"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#E8C84A] hover:bg-[#d8b83a] text-[#12302B] py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors border-none w-full"
            >
              {isSubmitting ? 'Sending...' : 'Get Custom Plan on WhatsApp ➔'}
            </button>
          </form>
        </div>
      </Modal>
    </section>
  );
}
