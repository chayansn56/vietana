import React, { useState, useEffect } from 'react';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Button from './ui/Button';
import { trackEvent, handleLeadSuccess } from '../utils/analytics';
import { getAttributionPayload } from '../utils/attribution';

const MONTH_OPTIONS = [
  'July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026',
  'January 2027', 'February 2027', 'March 2027', 'April 2027', 'May 2027', 'June 2027'
];

export default function InquiryForm({ onSuccess, isDrawer = false, onStart, minimal = false }: { onSuccess?: () => void, isDrawer?: boolean, onStart?: () => void, minimal?: boolean } = {}) {
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [formData, setFormData] = useState(() => {
    const defaultData = {
      name: '',
      travelMonth: 'October 2026',
      travelers: '2 Travelers',
      phoneCode: '+91',
      phone: '',
      notes: '',
    };
    try {
      const saved = sessionStorage.getItem('vietana_inquiry_draft');
      if (saved) {
        return { ...defaultData, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error(e);
    }
    return defaultData;
  });

  useEffect(() => {
    try {
      const savedTitlesRaw = localStorage.getItem('vietana_saved_attractions_titles');
      if (savedTitlesRaw) {
        const titles: string[] = JSON.parse(savedTitlesRaw);
        if (titles.length > 0) {
          setFormData(prev => ({
            ...prev,
            notes: `Saved Attractions Checklist: ${titles.join(', ')}. Please customize my Vietnam trip containing these spots!`
          }));
          localStorage.removeItem('vietana_saved_attractions_titles');
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const handleDraftUpdate = () => {
      try {
        const saved = sessionStorage.getItem('vietana_inquiry_draft');
        if (saved) {
          setFormData((prev) => ({ ...prev, ...JSON.parse(saved) }));
        }
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener('vietana_inquiry_draft_updated', handleDraftUpdate);
    return () => window.removeEventListener('vietana_inquiry_draft_updated', handleDraftUpdate);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const phoneCodes = [
    { code: '+91', country: 'India' },
    { code: '+84', country: 'Vietnam' },
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+971', country: 'UAE' },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{7,12}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (7-12 digits)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('form_submit_attempt', { form_name: isDrawer ? 'inquiry_drawer' : 'main_inquiry' });
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError(null);
    
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: 'short-form-lead@vietana.com',
          phoneCode: formData.phoneCode,
          phone: formData.phone,
          travelDate: formData.travelMonth,
          travelers: formData.travelers,
          service: 'Tour Package',
          message: `Inquiry from ${formData.name}`,
          source: isDrawer ? 'Inquiry Drawer' : 'Main Inquiry Form',
          ...getAttributionPayload()
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success || !result.leadId) {
        throw new Error(result.error || 'Failed to submit inquiry');
      }

      sessionStorage.setItem('vietana_lead_name', 'Traveler');
      handleLeadSuccess(result, isDrawer ? 'inquiry_drawer' : 'main_inquiry');
      
      if (isDrawer) trackEvent('inquiry_drawer_submit');
      if (onSuccess) onSuccess();

      window.location.hash = '#/thank-you';
    } catch (err: any) {
      console.error('Inquiry Submission Error:', err);
      setApiError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
      if (onStart) onStart();
      trackEvent('form_start', { form_name: isDrawer ? 'inquiry_drawer' : 'main_inquiry' });
    }

    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {apiError && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
          {apiError}
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-white/90">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
          className="w-full bg-white border border-[#E6D9BF] rounded-xl px-4 py-3 text-base sm:text-sm text-[#12302B] focus:outline-none focus:border-brand-gold touch-manipulation"
        />
        {errors.name && <span className="text-xs text-red-600 mt-1">{errors.name}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Travel Month */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="travelMonth" className="text-[10px] font-bold uppercase tracking-wider text-white/90">
            Travel Month
          </label>
          <select
            id="travelMonth"
            name="travelMonth"
            value={formData.travelMonth}
            onChange={handleInputChange}
            className="w-full bg-white border border-[#E6D9BF] rounded-xl px-4 py-3 text-base sm:text-sm text-[#12302B] focus:outline-none focus:border-brand-gold cursor-pointer touch-manipulation"
          >
            {MONTH_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {/* Travelers */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="travelers" className="text-[10px] font-bold uppercase tracking-wider text-white/90">
            Travelers
          </label>
          <select
            id="travelers"
            name="travelers"
            value={formData.travelers}
            onChange={handleInputChange}
            className="w-full bg-white border border-[#E6D9BF] rounded-xl px-4 py-3 text-base sm:text-sm text-[#12302B] focus:outline-none focus:border-brand-gold cursor-pointer touch-manipulation"
          >
            <option value="1 Traveler">1 Traveler</option>
            <option value="2 Travelers">2 Travelers</option>
            <option value="3 Travelers">3 Travelers</option>
            <option value="4+ Travelers">4+ Travelers</option>
          </select>
        </div>
      </div>

      {/* WhatsApp Number */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-white/90">
          WhatsApp Number *
        </label>
        <div className="flex gap-2">
          <select
            name="phoneCode"
            value={formData.phoneCode}
            onChange={handleInputChange}
            className="bg-white border border-[#E6D9BF] rounded-xl px-3 py-3 text-base sm:text-sm text-[#12302B] focus:outline-none focus:border-brand-gold cursor-pointer touch-manipulation"
          >
            {phoneCodes.map(pc => (
              <option key={pc.code} value={pc.code}>{pc.code}</option>
            ))}
          </select>
          <div className="flex-1">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                handleInputChange({ target: { name: 'phone', value: val } } as any);
              }}
              placeholder="Enter WhatsApp number"
              className="w-full bg-white border border-[#E6D9BF] rounded-xl px-4 py-3 text-base sm:text-sm text-[#12302B] focus:outline-none focus:border-brand-gold touch-manipulation"
            />
          </div>
        </div>
        {errors.phone && <span className="text-xs text-red-600 mt-1">{errors.phone}</span>}
      </div>

      {/* Notes / Saved Attractions */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="notes" className="text-[10px] font-bold uppercase tracking-wider text-white/90">
          Trip Details & Saved Attractions
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="e.g. Places you want to visit, hotel preferences, dietary requirements (Jain/Veg), or flight details..."
          rows={3}
          className="w-full flex-1 bg-white border border-[#E6D9BF] rounded-xl px-4 py-3 text-base sm:text-sm text-[#12302B] focus:outline-none focus:border-brand-gold resize-none touch-manipulation"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 bg-[#12302B] hover:bg-[#1E4D45] text-white py-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? 'Sending Request...' : 'Get My Quote on WhatsApp ➔'}
      </button>

      <div className="text-center mt-1">
        <Text size="xs" className="text-gray-500">
          We'll use your WhatsApp number to discuss your trip and prepare your quote.
        </Text>
      </div>
    </form>
  );

  if (minimal) {
    return formContent;
  }

  return (
    <Section id="inquiry" className="py-16 border-t border-[#E6D9BF]/50 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat" 
        style={{ backgroundImage: 'url(/plan_bg.png)' }} 
      />
      <div className="absolute inset-0 z-0 bg-black/40" /> {/* Dark overlay for readability without blur */}

      <Container size="lg" className="relative z-10">
        <div className="bg-white/10 border border-white/20 rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          <div className="text-center mb-8">
            <Heading as="h2" size="3xl" font="serif" className="mb-2 text-white drop-shadow-lg">
              PLAN YOUR TRIP
            </Heading>
            <Text className="text-white/90 text-sm max-w-xl mx-auto drop-shadow-md">
              Tell us what you're looking for and our local team will contact you on WhatsApp with a personalized itinerary.
            </Text>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {apiError && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                {apiError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Column 1: Personal Details */}
              <div className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] font-extrabold uppercase tracking-wider text-[#1D4ED8]">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full bg-white border border-[#E6D9BF] rounded-xl px-4 py-2.5 text-sm text-[#12302B] focus:outline-none focus:border-[#3B82F6] placeholder-gray-400"
                  />
                  {errors.name && <span className="text-xs text-red-600 mt-1">{errors.name}</span>}
                </div>

                {/* WhatsApp Number */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-[10px] font-extrabold uppercase tracking-wider text-[#1D4ED8]">
                    WhatsApp Number *
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="phoneCode"
                      value={formData.phoneCode}
                      onChange={handleInputChange}
                      className="bg-white border border-[#E6D9BF] rounded-xl px-3 py-2.5 text-sm text-[#12302B] focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                    >
                      {phoneCodes.map(pc => (
                        <option key={pc.code} value={pc.code}>{pc.code}</option>
                      ))}
                    </select>
                    <div className="flex-1">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          handleInputChange({ target: { name: 'phone', value: val } } as any);
                        }}
                        placeholder="WhatsApp number"
                        className="w-full bg-white border border-[#E6D9BF] rounded-xl px-4 py-2.5 text-sm text-[#12302B] focus:outline-none focus:border-[#3B82F6] placeholder-gray-400"
                      />
                    </div>
                  </div>
                  {errors.phone && <span className="text-xs text-red-600 mt-1">{errors.phone}</span>}
                </div>
              </div>

              {/* Column 2: Travel Details */}
              <div className="flex flex-col gap-4">
                {/* Travel Month */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="travelMonth" className="text-[10px] font-extrabold uppercase tracking-wider text-[#1D4ED8]">
                    Travel Month
                  </label>
                  <select
                    id="travelMonth"
                    name="travelMonth"
                    value={formData.travelMonth}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#E6D9BF] rounded-xl px-4 py-2.5 text-sm text-[#12302B] focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                  >
                    {MONTH_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                {/* Travelers */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="travelers" className="text-[10px] font-extrabold uppercase tracking-wider text-[#1D4ED8]">
                    Travelers
                  </label>
                  <select
                    id="travelers"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#E6D9BF] rounded-xl px-4 py-2.5 text-sm text-[#12302B] focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                  >
                    <option value="1 Traveler">1 Traveler</option>
                    <option value="2 Travelers">2 Travelers</option>
                    <option value="3 Travelers">3 Travelers</option>
                    <option value="4+ Travelers">4+ Travelers</option>
                  </select>
                </div>
              </div>

              {/* Column 3: Trip Details & Saved Attractions */}
              <div className="flex flex-col gap-1.5 h-full">
                <label htmlFor="notes" className="text-[10px] font-extrabold uppercase tracking-wider text-[#1D4ED8]">
                  Trip Details & Saved Attractions
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. Places you want to visit, hotel preferences, dietary requirements (Jain/Veg), or flight details..."
                  className="w-full flex-1 bg-white border border-[#E6D9BF] rounded-xl px-4 py-2.5 text-sm text-[#12302B] focus:outline-none focus:border-[#3B82F6] resize-none h-[116px] md:h-full min-h-[116px] placeholder-gray-400"
                />
              </div>
            </div>

            {/* Bottom Submit Action */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E6D9BF]/50">
              <div className="text-center md:text-left">
                <Text size="xs" className="text-gray-500 max-w-md leading-relaxed">
                  We'll use your WhatsApp number to discuss your trip details and prepare your customized itinerary quote.
                </Text>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-8 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                {isSubmitting ? 'Sending Request...' : 'Get My Quote on WhatsApp ➔'}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </Section>
  );
}
