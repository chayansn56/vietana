import React, { useState, useEffect, useMemo, useRef } from 'react';
import { HERO_SLIDES } from '../data/siteContent';
import { WHATSAPP_NUMBERS, buildWhatsAppLink, WHATSAPP_DEFAULT } from '../utils/whatsapp';
import { useTranslation } from '../contexts/LanguageContext';
import { handleLeadSuccess } from '../utils/analytics';
import { getAttributionPayload } from '../utils/attribution';
import Button from './ui/Button';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Clock from './Clock';
import Badge from './ui/Badge';
import Icon from './ui/Icon';
import BrandName from './ui/BrandName';
import Modal from './ui/Modal';

interface HeroProps {
  onOpenMagic: () => void;
}

const TRIPTYCH_PANELS = [
  { img: '/hero_sapa.png', label: 'Mountains & Culture' },
  { img: '/hero_hoian.png', label: 'Heritage & Coastlines' },
  { img: '/hero_halong.png', label: 'Delta & Energy' },
];

const DEPARTURE_CITIES = [
  'Delhi (DEL)', 'Mumbai (BOM)', 'Bangalore (BLR)', 'Chennai (MAA)', 'Kolkata (CCU)', 'Hyderabad (HYD)', 'Other Indian City'
];

const MONTH_OPTIONS = [
  'July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026',
  'January 2027', 'February 2027', 'March 2027', 'April 2027', 'May 2027', 'June 2027'
];

const HERO_BACKGROUNDS = [
  '/hero_couple_hcmc.jpg', // with people (locked on mobile)
  '/hero_bg_only_hcmc.jpg'  // background only
];

const Hero: React.FC<HeroProps> = ({ onOpenMagic }) => {
  const { t } = useTranslation();
  
  const [clocks, setClocks] = useState({
    vn: { time: '--:--', date: '---' },
    in: { time: '--:--', date: '---' }
  });

  // Crossfade state for cinematic background swap
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(1);
  const [bgOpacity, setBgOpacity] = useState(1);

  // Cycle background images every 10 seconds with a 1.5s crossfade
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    const isMobile = checkMobile();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReduced) return;

    const interval = setInterval(() => {
      // 1. Fade out top active layer
      setBgOpacity(0);

      // 2. Preload the next background in sequence
      setNextIdx(prevNextIdx => {
        const nextNextIdx = (prevNextIdx + 1) % HERO_BACKGROUNDS.length;
        const img = new Image();
        img.src = HERO_BACKGROUNDS[nextNextIdx];

        // 3. Swap roles and reset opacity after 1.5s crossfade duration
        setTimeout(() => {
          setCurrentIdx(prevNextIdx);
          setBgOpacity(1);
        }, 1500);

        return nextNextIdx;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Quick form states
  const [fromCity, setFromCity] = useState('Delhi (DEL)');
  const [goingTo, setGoingTo] = useState('Vietnam');
  const [travelMonth, setTravelMonth] = useState('October 2026');
  const [travelers, setTravelers] = useState('2 Travelers');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeVibe, setActiveVibe] = useState('🌴 Beach & Cruise');

  // Generate stable particles for cinematic light leaks
  const lightLeaks = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 80}%`,
      top: `${Math.random() * 80}%`,
      dur: `${15 + Math.random() * 10}s`,
      del: `${Math.random() * 5}s`,
      op: `${0.1 + Math.random() * 0.15}`,
      size: `${200 + Math.random() * 300}px`
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const fmt = (tz: string) => {
        const d = new Date(now.toLocaleString('en-US', { timeZone: tz }));
        const h = String(d.getHours()).padStart(2, '0');
        const m = String(d.getMinutes()).padStart(2, '0');
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return {
          time: `${h}:${m}`,
          date: `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`
        };
      };
      setClocks({
        vn: fmt('Asia/Ho_Chi_Minh'),
        in: fmt('Asia/Kolkata')
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = heroRef.current;
    if (!section) return;

    const handleScroll = () => {
      section.style.setProperty('--scroll-y', `${window.scrollY * 0.25}px`);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const x = (e.clientX / width - 0.5) * 12;
      const y = (e.clientY / height - 0.5) * 12;
      section.style.setProperty('--mouse-x', `${x}px`);
      section.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    section.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappNumber.trim()) return;
    setIsSubmitting(true);

    // 1. Submit lead details to Vercel API
    try {
      const payload = {
        name: `Lead from Hero Search Bar`,
        email: 'search-lead@vietana.com',
        phoneCode: countryCode,
        phone: whatsappNumber.trim(),
        travelDate: travelMonth,
        travelers: travelers,
        service: 'Tour Package',
        message: `Inquiry from Hero Search bar (Vibe: ${activeVibe}): From ${fromCity} going to ${goingTo}. Month of Travel: ${travelMonth}. Travelers: ${travelers}.`,
        source: 'hero_search',
        ...getAttributionPayload()
      };
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok || !result.success || !result.leadId) {
        throw new Error(result.error || 'Failed to submit inquiry');
      }
      handleLeadSuccess(result, 'hero_search');
    } catch (err) {
      console.error('Failed to submit search lead:', err);
      setIsSubmitting(false);
      return;
    }

    // 2. Save locally and pre-fill main inquiry form
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

    // 3. Store name and WhatsApp redirect link
    sessionStorage.setItem('vietana_lead_name', `Search Lead (${travelers})`);
    
    const message = `Hello VIETANA! I want to plan a trip from ${fromCity} to ${goingTo} in ${travelMonth} for ${travelers}. My WhatsApp number is ${countryCode} ${whatsappNumber.trim()}. Please send me a free quote!`;
    const waLink = buildWhatsAppLink(WHATSAPP_NUMBERS.VIETNAM, message);
    sessionStorage.setItem('vietana_redirect_whatsapp', waLink);

    setIsSubmitting(false);
    setIsModalOpen(false);

    // 4. Redirect to thank you page
    window.location.hash = '#/thank-you';
  };

  return (
    <Section 
      id="hero" 
      ref={heroRef}
      spacing="none" 
      className="h-[88svh] min-h-[620px] lg:h-[100svh] lg:min-h-[750px] flex w-full items-center justify-start relative overflow-hidden"
    >
      {/* Background Image Stack: Dual layers for cinematic 10-second crossfade */}
      <div className="absolute inset-0 z-0 select-none">
        {/* Underlay: Preloaded next scene (hidden on mobile) */}
        <div 
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{ 
            backgroundImage: `url('${HERO_BACKGROUNDS[nextIdx]}')`,
            transform: 'translateY(var(--scroll-y, 0px))',
            willChange: 'transform'
          }}
        />
        
        {/* Overlay: Active scene fading out */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out"
          style={{ 
            backgroundImage: `url('${HERO_BACKGROUNDS[currentIdx]}')`,
            opacity: bgOpacity,
            transform: 'translateY(var(--scroll-y, 0px))',
            willChange: 'opacity, transform'
          }}
        />
      </div>
      
      {/* Soft Vignette Overlay: Light and airy */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45 pointer-events-none z-10" />
      <Container className="relative z-20 w-full max-w-6xl px-6 sm:px-10 flex flex-col items-start text-left pt-[130px] md:pt-[160px] pb-6">
        
        {/* Welcome brand message block */}
        <div className="max-w-3xl flex flex-col items-start text-white mb-6">


          {t.hero.welcome && (
            <span className="text-xs font-bold tracking-[0.3em] text-[#3B71CA] uppercase mb-3 drop-shadow-sm font-mono block">
              {t.hero.welcome}
            </span>
          )}

          <Heading 
            as="h1" 
            size="none"
            variant="none" 
            font="serif"
            className="mb-5 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold drop-shadow-[0_2px_15px_rgba(0,0,0,0.7)] tracking-tight leading-[1.1] text-white uppercase"
          >
            Feel Vietnam Your Way
          </Heading>



          <Text 
            variant="none"
            className="max-w-2xl mb-8 text-white/95 text-sm sm:text-base lg:text-lg font-medium leading-relaxed drop-shadow-md"
          >
            {t.hero.sub}
          </Text>

          {/* Action Buttons Side-by-Side: Hidden on mobile to avoid duplicate CTAs and vertical cutoffs */}
          <div className="hidden sm:flex flex-row items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={() => {
                const el = document.getElementById('inquiry');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-[#E8C84A] hover:bg-[#d8b83a] text-[#12302B] px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase cursor-pointer transition-colors shadow-lg active:scale-95 duration-200"
            >
              🔥 Plan My Trip ➔
            </button>
            
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open_whatsapp', { detail: { message: "Hello VIETANA! I'd like to chat about planning a trip to Vietnam." } }))}
              type="button"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-lg cursor-pointer"
            >
              <Icon name="MessageCircle" size={15} /> Chat on WhatsApp
            </button>
          </div>
        </div>

        {/* Horizontal Vibe Selector Tabs */}
        <div className="flex gap-1.5 mb-[-12px] ml-4 relative z-25 pointer-events-auto w-[92vw] overflow-x-auto scrollbar-none flex-nowrap shrink-0 pr-6">
          {['🌴 Beach & Cruise', '🏔️ Adventure & Hills', '🏯 Ancient Heritage'].map((vibe) => (
            <button
              type="button"
              key={vibe}
              className={`px-3 py-1.5 rounded-t-xl text-[9px] font-extrabold tracking-wider uppercase border-t border-x transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0
                ${activeVibe === vibe 
                  ? 'bg-white border-[#E6D9BF] text-[#1E4D45] shadow-xs translate-y-[2px]' 
                  : 'bg-[#12302B]/85 backdrop-blur-md border-[#E6D9BF]/20 text-white/80 hover:bg-[#12302B] hover:text-white'}`}
              onClick={() => setActiveVibe(vibe)}
            >
              {vibe}
            </button>
          ))}
        </div>

        {/* Horizontal Search/Inquiry Bar */}
        <form 
          onSubmit={handleSearchClick}
          className="w-full max-w-[1100px] bg-white border border-[#E6D9BF] rounded-3xl p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between shadow-2xl gap-4 pointer-events-auto text-left relative z-20"
        >
          {/* 2x2 Grid container for inputs on mobile, standard row on desktop */}
          <div className="grid grid-cols-2 lg:flex lg:flex-row gap-2.5 lg:gap-0 flex-1 w-full lg:w-auto">
            {/* From City */}
            <div className="flex flex-col gap-1 p-2.5 px-3 rounded-2xl bg-[#E6D9BF]/10 lg:bg-transparent border border-[#E6D9BF]/20 lg:border-none lg:border-r lg:border-[#E6D9BF]/30">
              <label className="text-[9px] lg:text-[10px] font-mono tracking-wider uppercase text-[#1E4D45] font-extrabold flex items-center gap-1">
                <Icon name="MapPin" size={11} className="text-[#1E4D45]" /> From
              </label>
              <select 
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="w-full bg-transparent border-none p-0 text-xs text-[#12302B] focus:outline-none cursor-pointer font-bold h-7"
              >
                {DEPARTURE_CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Going To */}
            <div className="flex flex-col gap-1 p-2.5 px-3 rounded-2xl bg-[#E6D9BF]/10 lg:bg-transparent border border-[#E6D9BF]/20 lg:border-none lg:border-r lg:border-[#E6D9BF]/30">
              <label className="text-[9px] lg:text-[10px] font-mono tracking-wider uppercase text-[#1E4D45] font-extrabold flex items-center gap-1">
                <Icon name="MapPin" size={11} className="text-[#1E4D45]" /> Going to
              </label>
              <select 
                value={goingTo}
                onChange={(e) => setGoingTo(e.target.value)}
                className="w-full bg-transparent border-none p-0 text-xs text-[#12302B] focus:outline-none cursor-pointer font-bold h-7"
              >
                <option value="Vietnam">Vietnam</option>
              </select>
            </div>

            {/* Travel Dates */}
            <div className="flex flex-col gap-1 p-2.5 px-3 rounded-2xl bg-[#E6D9BF]/10 lg:bg-transparent border border-[#E6D9BF]/20 lg:border-none lg:border-r lg:border-[#E6D9BF]/30">
              <label className="text-[9px] lg:text-[10px] font-mono tracking-wider uppercase text-[#1E4D45] font-extrabold flex items-center gap-1">
                <Icon name="Calendar" size={11} className="text-[#1E4D45]" /> Dates
              </label>
              <select 
                value={travelMonth}
                onChange={(e) => setTravelMonth(e.target.value)}
                className="w-full bg-transparent border-none p-0 text-xs text-[#12302B] focus:outline-none cursor-pointer font-bold h-7"
              >
                {MONTH_OPTIONS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Travelers */}
            <div className="flex flex-col gap-1 p-2.5 px-3 rounded-2xl bg-[#E6D9BF]/10 lg:bg-transparent border border-[#E6D9BF]/20 lg:border-none">
              <label className="text-[9px] lg:text-[10px] font-mono tracking-wider uppercase text-[#1E4D45] font-extrabold flex items-center gap-1">
                <Icon name="Users" size={11} className="text-[#1E4D45]" /> Travelers
              </label>
              <select 
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full bg-transparent border-none p-0 text-xs text-[#12302B] focus:outline-none cursor-pointer font-bold h-7"
              >
                <option value="1 Traveler">1 Traveler</option>
                <option value="2 Travelers">2 Travelers</option>
                <option value="3 Travelers">3 Travelers</option>
                <option value="4+ Travelers">4+ Travelers</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="bg-[#E8C84A] hover:bg-[#d8b83a] text-[#12302B] px-8 py-4 rounded-2xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-colors border-none shrink-0 w-full lg:w-auto"
          >
            🔥 Plan My Trip <Icon name="Search" size={13} className="text-[#12302B]" />
          </button>
        </form>

      </Container>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <Text as="div" size="xs" variant="none" className="flex items-center gap-4 text-white/40 tracking-[0.22em] uppercase">
          <div className="relative w-12 h-px bg-gradient-to-r from-brand-gold to-transparent animate-sla" />
          <span>Scroll to explore</span>
        </Text>
      </div>

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
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider uppercase text-[#1E4D45] font-extrabold flex items-center gap-1">
                <Icon name="MessageCircle" size={11} /> WhatsApp Number
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-white border border-[#E6D9BF] rounded-xl px-3 py-3 text-sm text-[#12302B] focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold cursor-pointer font-bold shrink-0 w-20"
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
                  className="flex-1 bg-white border border-[#E6D9BF] rounded-xl px-4 py-3 text-sm text-[#12302B] focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold font-bold placeholder-[#12302B]/40"
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
    </Section>
  );
};

export default Hero;
