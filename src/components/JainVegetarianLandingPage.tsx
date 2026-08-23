import React, { useState } from 'react';
import { Heading, Text } from './ui/Typography';
import Button from './ui/Button';
import Icon from './ui/Icon';
import Modal from './ui/Modal';
import { WHATSAPP_DEFAULT } from '../utils/whatsapp';
import { getAttributionPayload } from '../utils/attribution';
import { handleLeadSuccess } from '../utils/analytics';

const DEPARTURE_CITIES = [
  'Delhi (DEL)', 'Mumbai (BOM)', 'Bangalore (BLR)', 'Chennai (MAA)', 'Kolkata (CCU)', 'Hyderabad (HYD)', 'Ahmedabad (AMD)', 'Other Indian City'
];

const MONTH_OPTIONS = [
  'July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026',
  'January 2027', 'February 2027', 'March 2027', 'April 2027', 'May 2027', 'June 2027'
];

const DIETARY_OPTIONS = [
  'Strict Jain (No Onion, Garlic, Potatoes, Root Veggies)',
  'Pure Vegetarian (No Meat, Fish, Egg, but Onion/Garlic okay)',
  'Eggitarian / Vegetarian mix',
  'Other / Custom Dietary request'
];

const JainVegetarianLandingPage: React.FC = () => {
  // Form state
  const [fromCity, setFromCity] = useState('Ahmedabad (AMD)');
  const [travelMonth, setTravelMonth] = useState('October 2026');
  const [travelers, setTravelers] = useState('2 Travelers');
  const [duration, setDuration] = useState('7 Days');
  const [dietary, setDietary] = useState('Strict Jain (No Onion, Garlic, Potatoes, Root Veggies)');
  const [whatsapp, setWhatsapp] = useState('');
  const [name, setName] = useState('');
  
  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Full Name is required');
      return;
    }
    if (!whatsapp.trim() || whatsapp.trim().length < 8) {
      setErrorMessage('Valid WhatsApp Number is required');
      return;
    }
    
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        phoneCode: '+91',
        phone: whatsapp.trim(),
        travelDate: travelMonth,
        travelers: travelers,
        service: 'Jain/Vegetarian Tour Curation',
        message: `Dietary Requirement: ${dietary}\nTrip Duration: ${duration}\nDeparture City: ${fromCity}`,
        source: 'Google Ads Jain Campaign',
        ...getAttributionPayload()
      };

      let result;
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Local preview fallback
        const local = localStorage.getItem('vietana_local_leads');
        const list = local ? JSON.parse(local) : [];
        const newLead = {
          id: 'local_' + Date.now(),
          created_at: new Date().toISOString(),
          name: payload.name,
          phone: `+91 ${payload.phone}`,
          email: '',
          service: payload.service,
          'travel dates': payload.travelDate,
          travelers: payload.travelers,
          message: payload.message,
          source: payload.source,
          status: 'New',
          utm_source: payload.attribution?.utm_source || 'direct',
          utm_medium: payload.attribution?.utm_medium || 'none',
          utm_campaign: payload.attribution?.utm_campaign || 'none',
          gclid: payload.attribution?.gclid || null,
          landing_page: payload.attribution?.landing_page || '/'
        };
        list.unshift(newLead);
        localStorage.setItem('vietana_local_leads', JSON.stringify(list));
        result = { success: true, leadId: newLead.id };
      } else {
        try {
          const res = await fetch('/api/inquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const text = await res.text();
          result = JSON.parse(text);
        } catch (e) {
          result = { success: false, error: 'Connection failed' };
        }
      }

      handleLeadSuccess(result, 'landing_page_jain');
      setIsSuccessModalOpen(true);
      
      // Clear inputs
      setName('');
      setWhatsapp('');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const text = `Hi VIETANA, I’m planning a Vietnam trip and need Jain/vegetarian meal arrangements. \n\nTravel Month: ${travelMonth}\nTravelers: ${travelers}\nDeparture: ${fromCity}\nDiet: ${dietary}`;
    const url = `https://wa.me/84902434006?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#12302B]">
      {/* Hero Section */}
      <section className="relative bg-[#0A1110] text-white py-16 px-6 md:px-12 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url('/hero_couple_hcmc.jpg')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1110] via-[#0A1110]/80 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-[#E8C84A] uppercase w-fit">
              🟢 Jain & Vegetarian Meal Arrangements
            </span>
            <Heading as="h1" size="2xl" variant="none" className="font-serif leading-tight text-white uppercase max-w-2xl">
              Planning a Jain-Friendly or Vegetarian Vietnam Trip?
            </Heading>
            <Text variant="white" size="lg" className="opacity-90 max-w-xl">
              Get a custom Vietnam itinerary with dietary planning, premium hotels, transfers, sightseeing and local on-ground support from our Ho Chi Minh City team.
            </Text>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <Button 
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-[#E8C84A] hover:bg-[#d8b83a] text-[#12302B] rounded-full font-bold uppercase text-xs tracking-wider shadow-lg"
              >
                Get My Custom Plan
              </Button>
              <Button 
                onClick={handleWhatsAppRedirect}
                variant="outline"
                className="w-full sm:w-auto px-8 py-4 border-white/20 hover:bg-white/10 text-white rounded-full font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2"
              >
                <Icon name="MessageCircle" size={14} /> Chat on WhatsApp
              </Button>
            </div>
          </div>

          {/* Side Lead Capture Form */}
          <div id="lead-form" className="lg:col-span-5 bg-white text-[#12302B] rounded-3xl p-6 md:p-8 shadow-deep flex flex-col gap-5 border border-black/5">
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#3A9BD9] uppercase">Get Free Itinerary Quote</span>
              <Heading as="h3" size="none" className="text-xl font-serif font-extrabold m-0">Tell Us About Your Plan</Heading>
            </div>

            {errorMessage && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 flex items-center gap-2">
                <Icon name="Ban" size={14} /> {errorMessage}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-mono font-extrabold tracking-wider text-gray-500 uppercase">From</label>
                  <select value={fromCity} onChange={(e) => setFromCity(e.target.value)} className="w-full bg-[#FAF8F3] border border-black/10 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-[#3A9BD9]">
                    {DEPARTURE_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-mono font-extrabold tracking-wider text-gray-500 uppercase">Month</label>
                  <select value={travelMonth} onChange={(e) => setTravelMonth(e.target.value)} className="w-full bg-[#FAF8F3] border border-black/10 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-[#3A9BD9]">
                    {MONTH_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-mono font-extrabold tracking-wider text-gray-500 uppercase">Travelers</label>
                  <select value={travelers} onChange={(e) => setTravelers(e.target.value)} className="w-full bg-[#FAF8F3] border border-black/10 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-[#3A9BD9]">
                    <option value="1 Traveler">1 Traveler</option>
                    <option value="2 Travelers">2 Travelers</option>
                    <option value="3 Travelers">3 Travelers</option>
                    <option value="4+ Travelers">4+ Travelers</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-mono font-extrabold tracking-wider text-gray-500 uppercase">Duration</label>
                  <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-[#FAF8F3] border border-black/10 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-[#3A9BD9]">
                    <option value="5 Days">5 Days</option>
                    <option value="6 Days">6 Days</option>
                    <option value="7 Days">7 Days</option>
                    <option value="8-10 Days">8-10 Days</option>
                    <option value="11+ Days">11+ Days</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono font-extrabold tracking-wider text-gray-500 uppercase">Dietary Requirements</label>
                <select value={dietary} onChange={(e) => setDietary(e.target.value)} className="w-full bg-[#FAF8F3] border border-black/10 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-[#3A9BD9]">
                  {DIETARY_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono font-extrabold tracking-wider text-gray-500 uppercase">Your Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter full name" 
                  className="w-full bg-[#FAF8F3] border border-black/10 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-[#3A9BD9]" 
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono font-extrabold tracking-wider text-gray-500 uppercase">WhatsApp Number</label>
                <div className="flex gap-2">
                  <span className="bg-[#FAF8F3] border border-black/10 rounded-xl p-2.5 text-xs font-bold flex items-center justify-center w-12">+91</span>
                  <input 
                    type="tel" 
                    value={whatsapp} 
                    onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ''))} 
                    placeholder="Enter phone number" 
                    className="flex-1 bg-[#FAF8F3] border border-black/10 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-[#3A9BD9]" 
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#E8C84A] hover:bg-[#d8b83a] text-[#12302B] rounded-xl font-bold uppercase text-xs tracking-wider cursor-pointer transition-colors shadow-lg active:scale-95 duration-200 mt-2"
              >
                {isSubmitting ? 'Submitting plan...' : 'Get My Free Vietnam Trip Plan ➔'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Services Grid (How VIETANA Helps) */}
      <section className="py-16 px-6 max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col gap-2 max-w-xl mx-auto">
          <Heading as="h2" size="lg" className="font-serif uppercase">Bespoke Curation For Indian Travelers</Heading>
          <Text className="opacity-70">We handle the full logistics from transfers to certified meal plans so you can explore Vietnam stress-free.</Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-xs flex flex-col gap-4">
            <div className="w-10 h-10 rounded-full bg-[#3A9BD9]/10 text-[#3A9BD9] flex items-center justify-center">
              <Icon name="Soup" size={20} />
            </div>
            <Heading as="h4" size="sm" className="font-serif">Jain & Vegetarian Meals</Heading>
            <Text size="sm" className="opacity-75">We plan and coordinate your meal preferences with local hotel kitchens, cruise dining rooms, and select Indian restaurants.</Text>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-xs flex flex-col gap-4">
            <div className="w-10 h-10 rounded-full bg-[#3A9BD9]/10 text-[#3A9BD9] flex items-center justify-center">
              <Icon name="Building" size={20} />
            </div>
            <Heading as="h4" size="sm" className="font-serif">Premium Accommodations</Heading>
            <Text size="sm" className="opacity-75">Hand-picked 4-star and 5-star hotels and boutique heritage stays tested and loved by families and couples.</Text>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-xs flex flex-col gap-4">
            <div className="w-10 h-10 rounded-full bg-[#3A9BD9]/10 text-[#3A9BD9] flex items-center justify-center">
              <Icon name="Phone" size={20} />
            </div>
            <Heading as="h4" size="sm" className="font-serif">On-Ground Support</Heading>
            <Text size="sm" className="opacity-75">A 24/7 dedicated WhatsApp support thread directly connected to our coordinators in Ho Chi Minh City.</Text>
          </div>
        </div>
      </section>

      {/* Dietary Process */}
      <section className="bg-white py-16 px-6 border-y border-black/5">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div className="text-center flex flex-col gap-2">
            <Heading as="h2" size="lg" className="font-serif uppercase">Dietary Arrangement Process</Heading>
            <Text className="opacity-75">How we custom plan your meals step-by-step:</Text>
          </div>

          <div className="flex flex-col gap-6 font-sans">
            <div className="flex gap-4">
              <div className="font-serif font-bold text-2xl text-[#3A9BD9]">01</div>
              <div>
                <span className="font-bold block text-sm">Specify Your Diet Requirements</span>
                <Text size="sm" className="opacity-75 mt-1">Whether you need strictly no onion/garlic, vegan alternatives, or pure vegetarian Indian food options, you share it with us.</Text>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-serif font-bold text-2xl text-[#3A9BD9]">02</div>
              <div>
                <span className="font-bold block text-sm">Hotel & Restaurant Communication</span>
                <Text size="sm" className="opacity-75 mt-1">Our on-ground coordinators forward your meal requirements to verified hotels and local partners to prepare arrangements prior to check-in.</Text>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-serif font-bold text-2xl text-[#3A9BD9]">03</div>
              <div>
                <span className="font-bold block text-sm">Alternative Proposing</span>
                <Text size="sm" className="opacity-75 mt-1">In remote areas of Vietnam where strict Jain preparations are unavailable, we identify alternative local fresh options or suggest suitable options to prevent gaps.</Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6 max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center">
          <Heading as="h2" size="lg" className="font-serif uppercase">Frequently Asked Questions</Heading>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white p-5 rounded-2xl border border-black/5">
            <span className="font-bold block text-sm">Can you arrange strictly Jain meals in Vietnam?</span>
            <Text size="sm" className="opacity-75 mt-2">Yes, we regularly arrange Jain meals (no onion, garlic, potatoes, or root vegetables) for our guests. We coordinate directly with select Indian restaurants and international hotel kitchens in major hubs like Hanoi, Da Nang, Hoi An, and Ho Chi Minh City.</Text>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-black/5">
            <span className="font-bold block text-sm">Are flights included in your quotes?</span>
            <Text size="sm" className="opacity-75 mt-2">Inclusions depend on the final custom quote. Normally we handle internal Vietnam flights, transfers, hotel accommodation, and meals, but international flights can also be custom-curated on request.</Text>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-black/5">
            <span className="font-bold block text-sm">Do you help with Vietnam visa applications?</span>
            <Text size="sm" className="opacity-75 mt-2">Absolutely. We provide visa guidance and handle processing of the required pre-approval letters and tourist e-visas as part of our custom holiday packages.</Text>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-black/10 py-3.5 px-6 flex items-center justify-between md:hidden shadow-lg">
        <div className="flex flex-col">
          <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Custom Vietnam Tour</span>
          <span className="text-xs font-serif font-bold text-[#12302B]">Jain & Veg Curations</span>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleWhatsAppRedirect}
            className="p-2.5 rounded-xl border border-green-200 bg-green-50 text-green-600 flex items-center justify-center"
            title="Chat on WhatsApp"
          >
            <Icon name="MessageCircle" size={16} />
          </Button>
          <Button 
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-5 py-2.5 bg-[#E8C84A] hover:bg-[#d8b83a] text-[#12302B] rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Get Custom Plan
          </Button>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Inquiry Received"
      >
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <Icon name="Check" size={24} />
          </div>
          <Heading as="h4" size="md" className="font-serif">Thank You!</Heading>
          <Text size="sm" className="opacity-75 max-w-sm">
            We have saved your travel inquiry details. Our Ho Chi Minh City team is already planning your customized plan.
          </Text>
          <Button 
            onClick={handleWhatsAppRedirect}
            className="mt-2 w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2"
          >
            <Icon name="MessageCircle" size={14} /> Connect Instantly on WhatsApp
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default JainVegetarianLandingPage;
