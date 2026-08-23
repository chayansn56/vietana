import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ITINERARIES_DATABASE, PackageProduct } from '../data/packagesData';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import Modal from './ui/Modal';
import { WHATSAPP_NUMBERS, buildWhatsAppLink } from '../utils/whatsapp';

import PackageFilters from './packages/PackageFilters';
import PackageCard from './packages/PackageCard';
import PackageDetailsModal from './packages/PackageDetailsModal';

interface PackagesProps {
  onOpenBuilder: (dest?: string[]) => void;
  onOpenPlanner?: (destination?: string, prompt?: string) => void;
}

const TARGET_PACKAGE_IDS = [
  'hcmc-phu-quoc-explorer-5d4n',
  'hcmc-dalat-explorer-5d4n',
  'saigon-beach-combo',
  'saigon-mekong-delta-explorer',
  'central-vietnam-essentials',
  'vietnam-highlights-express',
  'classic-trio-discovery',
  'northern-jewels',
  'vietnam-grand-heritage',
  'the-absolute-vietnam'
];

const Packages: React.FC<PackagesProps> = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackageProduct | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const getPackageColors = (id: string) => {
    const themes: Record<string, {
      bg: string;
      border: string;
      badgeBg: string;
      titleColor: string;
      accentColor: string;
      iconColor: string;
      btnBg: string;
    }> = {
      'hcmc-phu-quoc-explorer-5d4n': {
        bg: 'bg-rose-50/30 hover:bg-rose-50/60',
        border: 'border-rose-200/60 hover:border-rose-400',
        badgeBg: 'bg-rose-100 text-rose-700 border-rose-200/50',
        titleColor: 'text-rose-950',
        accentColor: 'text-rose-700',
        iconColor: 'text-rose-600',
        btnBg: 'bg-rose-700 hover:bg-rose-800'
      },
      'hcmc-dalat-explorer-5d4n': {
        bg: 'bg-emerald-50/30 hover:bg-emerald-50/60',
        border: 'border-emerald-200/60 hover:border-emerald-400',
        badgeBg: 'bg-emerald-100 text-emerald-700 border-emerald-200/50',
        titleColor: 'text-emerald-950',
        accentColor: 'text-emerald-700',
        iconColor: 'text-emerald-600',
        btnBg: 'bg-emerald-700 hover:bg-emerald-800'
      },
      'saigon-beach-combo': {
        bg: 'bg-sky-50/30 hover:bg-sky-50/60',
        border: 'border-sky-200/60 hover:border-sky-400',
        badgeBg: 'bg-sky-100 text-sky-700 border-sky-200/50',
        titleColor: 'text-sky-950',
        accentColor: 'text-sky-700',
        iconColor: 'text-sky-600',
        btnBg: 'bg-sky-700 hover:bg-sky-800'
      },
      'saigon-mekong-delta-explorer': {
        bg: 'bg-amber-50/30 hover:bg-amber-50/60',
        border: 'border-amber-200/60 hover:border-amber-400',
        badgeBg: 'bg-amber-100 text-amber-700 border-amber-200/50',
        titleColor: 'text-amber-950',
        accentColor: 'text-amber-700',
        iconColor: 'text-amber-600',
        btnBg: 'bg-amber-700 hover:bg-amber-800'
      },
      'central-vietnam-essentials': {
        bg: 'bg-purple-50/30 hover:bg-purple-50/60',
        border: 'border-purple-200/60 hover:border-purple-400',
        badgeBg: 'bg-purple-100 text-purple-700 border-purple-200/50',
        titleColor: 'text-purple-950',
        accentColor: 'text-purple-700',
        iconColor: 'text-purple-600',
        btnBg: 'bg-purple-700 hover:bg-purple-800'
      },
      'vietnam-highlights-express': {
        bg: 'bg-teal-50/30 hover:bg-teal-50/60',
        border: 'border-teal-200/60 hover:border-teal-400',
        badgeBg: 'bg-teal-100 text-teal-700 border-teal-200/50',
        titleColor: 'text-teal-950',
        accentColor: 'text-teal-700',
        iconColor: 'text-teal-600',
        btnBg: 'bg-teal-700 hover:bg-teal-800'
      },
      'classic-trio-discovery': {
        bg: 'bg-indigo-50/30 hover:bg-indigo-50/60',
        border: 'border-indigo-200/60 hover:border-indigo-400',
        badgeBg: 'bg-indigo-100 text-indigo-700 border-indigo-200/50',
        titleColor: 'text-indigo-950',
        accentColor: 'text-indigo-700',
        iconColor: 'text-indigo-600',
        btnBg: 'bg-indigo-700 hover:bg-indigo-800'
      },
      'northern-jewels': {
        bg: 'bg-pink-50/30 hover:bg-pink-50/60',
        border: 'border-pink-200/60 hover:border-pink-400',
        badgeBg: 'bg-pink-100 text-pink-700 border-pink-200/50',
        titleColor: 'text-pink-950',
        accentColor: 'text-pink-700',
        iconColor: 'text-pink-600',
        btnBg: 'bg-pink-700 hover:bg-pink-800'
      },
      'vietnam-grand-heritage': {
        bg: 'bg-fuchsia-50/30 hover:bg-fuchsia-50/60',
        border: 'border-fuchsia-200/60 hover:border-fuchsia-400',
        badgeBg: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200/50',
        titleColor: 'text-fuchsia-950',
        accentColor: 'text-fuchsia-700',
        iconColor: 'text-fuchsia-600',
        btnBg: 'bg-fuchsia-700 hover:bg-fuchsia-800'
      },
      'the-absolute-vietnam': {
        bg: 'bg-orange-50/30 hover:bg-orange-50/60',
        border: 'border-orange-200/60 hover:border-orange-400',
        badgeBg: 'bg-orange-100 text-orange-700 border-orange-200/50',
        titleColor: 'text-orange-950',
        accentColor: 'text-orange-700',
        iconColor: 'text-orange-600',
        btnBg: 'bg-orange-700 hover:bg-orange-800'
      }
    };
    return themes[id] || {
      bg: 'bg-white',
      border: 'border-[#E8E4D9]',
      badgeBg: 'bg-[#1E4D45]/10 text-[#1E4D45] border-transparent',
      titleColor: 'text-[#12302B]',
      accentColor: 'text-[#1E4D45]',
      iconColor: 'text-[#1E4D45]',
      btnBg: 'bg-[#12302B] hover:bg-[#1E4D45]'
    };
  };

  const displayedPackages = ITINERARIES_DATABASE.filter(p => TARGET_PACKAGE_IDS.includes(p.id));

  // Sort display packages to exactly match TARGET_PACKAGE_IDS order
  displayedPackages.sort((a, b) => {
    return TARGET_PACKAGE_IDS.indexOf(a.id) - TARGET_PACKAGE_IDS.indexOf(b.id);
  });

  const handleQuoteClick = () => {
    const el = document.getElementById('inquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetQuoteFromModal = () => {
    setSelectedPackage(null);
    handleQuoteClick();
  };

  return (
    <Section id="packages" spacing="lg" className="bg-white text-[#111111] relative overflow-hidden border-t border-[#E8E4D9]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat" 
        style={{ backgroundImage: 'url(/packages_bg.png)' }} 
      />
      
      <Container className="relative z-10 w-full max-w-[1400px]">
        <div className="mb-10 text-center flex flex-col items-center">
          <Heading as="h2" size="4xl" font="serif" className="mb-4 tracking-tight uppercase flex items-center justify-center font-black select-none text-white drop-shadow-lg">
            PACKAGES
          </Heading>
          <div className="w-16 h-px bg-[#D4AF37] mb-6 shadow-sm"></div>
          <Text className="max-w-2xl text-white/95 mb-2 drop-shadow-md font-medium">
            Discover our hand-crafted Vietnam trips and itineraries.
          </Text>
          <div className="mt-3 flex flex-col items-center text-center">
            <p className="text-xs sm:text-sm font-extrabold tracking-widest text-[#D4AF37] uppercase flex items-center gap-1.5 mb-3 select-none drop-shadow-md">
              <span>🌿</span> TRAVEL YOUR WAY. EAT YOUR WAY.
            </p>
            <p className="text-xs sm:text-sm text-[#111111] bg-yellow-400 px-4 py-2 rounded shadow-md font-bold max-w-lg inline-block">
              Jain & Vegetarian Meal Options Available Across Our Itineraries
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {displayedPackages.map((pkg: PackageProduct) => {
            const colors = getPackageColors(pkg.id);
            return (
              <div key={pkg.id} className="[perspective:1000px] relative group h-[420px]">
                <div className={`w-full h-full relative transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-sm group-hover:shadow-[0_0_30px_rgba(230,217,191,0.8)] rounded-2xl`}>
                  
                  {/* Front Face */}
                  <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] ${colors.bg} rounded-2xl overflow-hidden border ${colors.border} flex flex-col bg-white`}>
                <div className="h-36 overflow-hidden relative shrink-0">
                  <img 
                    src={pkg.img} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  
                  {/* Brand badges overlay */}
                  {(['hcmc-phu-quoc-explorer-5d4n', 'hcmc-dalat-explorer-5d4n', 'saigon-beach-combo'].includes(pkg.id) || ['vietnam-highlights-express', 'northern-jewels', 'vietnam-grand-heritage'].includes(pkg.id)) && (
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-20">
                      {['hcmc-phu-quoc-explorer-5d4n', 'hcmc-dalat-explorer-5d4n', 'saigon-beach-combo'].includes(pkg.id) && (
                        <span className="bg-[#B8860B] text-white text-[7px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider shadow-md flex items-center gap-1 select-none w-max">
                          ★ MOST SOLD
                        </span>
                      )}
                      {['hcmc-phu-quoc-explorer-5d4n', 'hcmc-dalat-explorer-5d4n', 'saigon-beach-combo', 'vietnam-highlights-express', 'northern-jewels', 'vietnam-grand-heritage'].includes(pkg.id) && (
                        <span className="bg-red-600 text-white text-[7px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider shadow-md flex items-center gap-1 select-none animate-pulse w-max">
                          🔥 HOT
                        </span>
                      )}
                    </div>
                  )}

                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <span className={`text-[8px] uppercase font-bold tracking-widest ${colors.accentColor} mb-1.5`}>
                    Land Package
                  </span>
                  <h3 className={`font-serif font-bold text-base ${colors.titleColor} mb-2 leading-tight min-h-[44px] line-clamp-2`}>
                    {pkg.title}
                  </h3>
                  
                  <div className="flex flex-col gap-1.5 mb-3.5">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Icon name="Clock" size={13} className={colors.iconColor} />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Icon name="MapPin" size={13} className={colors.iconColor} />
                      <span className="truncate">{pkg.destinations.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="bg-red-50 text-red-700 border border-red-100 text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-0.5"><Icon name="X" size={8} /> Flights Excluded</span>
                    <span className="bg-green-50 text-green-800 border border-green-100 text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-0.5"><Icon name="Check" size={8} /> Visa Assistance</span>
                    <span className="bg-[#FAF7F0] text-[#CD7F32] border border-[#CD7F32]/25 text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-0.5"><Icon name="Utensils" size={8} /> Jain / Veg Food Available</span>
                  </div>

                  <div className={`mt-auto pt-3 border-t ${colors.border} flex items-center justify-between`}>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest font-bold block text-gray-500 mb-0.5">Starting from</span>
                      <span className={`text-xs font-black ${colors.accentColor}`}>
                        {pkg.price}
                      </span>
                    </div>
                    <button 
                      onClick={handleQuoteClick}
                      className={`${colors.btnBg} text-white px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors shadow-sm cursor-pointer border-none shrink-0 ml-1`}
                    >
                      Get Quote
                    </button>
                  </div>
                  </div>
                  </div>
                  
                  {/* Back Face */}
                  <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] ${colors.bg} rounded-2xl overflow-hidden border ${colors.border} flex flex-col items-center justify-center p-6 text-center shadow-inner`}>
                    <div className="w-16 h-16 rounded-full bg-[#E6D9BF]/30 flex items-center justify-center mb-6 text-[#12302B]">
                      <Icon name="Compass" size={32} />
                    </div>
                    <h3 className={`font-serif font-bold text-xl ${colors.titleColor} mb-2 leading-tight line-clamp-2`}>
                      {pkg.title}
                    </h3>
                    <div className="flex flex-col mb-8 items-center">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">Starting from</span>
                      <span className={`text-lg font-black ${colors.accentColor}`}>
                        {pkg.price}
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-3 w-full">
                      <button 
                        onClick={() => setSelectedPackage(pkg)}
                        className={`w-full bg-white text-[#12302B] px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors shadow-sm cursor-pointer border border-[#E6D9BF]/60 hover:bg-[#FAF8F3] flex items-center justify-center gap-2`}
                      >
                        <Icon name="Eye" size={14} /> View Details
                      </button>
                      <button 
                        onClick={handleQuoteClick}
                        className={`w-full ${colors.btnBg} text-white px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors shadow-sm cursor-pointer border-none flex items-center justify-center gap-2`}
                      >
                        <Icon name="Sparkles" size={14} /> Get Quote
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>



        <div className="mt-12 flex flex-col items-center gap-6">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open_package_catalogue'))}
            className="bg-transparent border border-[#12302B] text-[#12302B] hover:bg-[#12302B] hover:text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-sm cursor-pointer inline-flex items-center gap-2"
          >
            View All {ITINERARIES_DATABASE.length} Packages <Icon name="ArrowRight" size={14} />
          </button>
          
          <a 
            href={buildWhatsAppLink(WHATSAPP_NUMBERS.VIETNAM, "Hello VIETANA! I'd like to chat about planning a trip to Vietnam.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#25D366] hover:text-[#128C7E] transition-colors bg-white border border-[#E8E4D9] px-6 py-3 rounded-full shadow-sm hover:shadow-md"
          >
            <Icon name="MessageCircle" size={16} /> Connect With Us
          </a>
        </div>

        {/* Details Modal */}
        <AnimatePresence>
          {selectedPackage && (() => {
            // Parse hotels dynamically to build a beautiful "Hotels by City" table
            const parsedHotels = selectedPackage.hotels.map(h => {
              const parts = h.split(':');
              if (parts.length >= 2) {
                return { city: parts[0].trim(), hotel: parts.slice(1).join(':').trim() };
              }
              return { city: 'Hotel', hotel: h };
            });

            return (
              <Modal
                isOpen={!!selectedPackage}
                onClose={() => { setSelectedPackage(null); setExpandedDay(1); }}
                maxWidth="max-w-4xl"
                variant="light"
                className="h-[85vh] md:h-[80vh] flex flex-col p-0 overflow-hidden bg-white border border-[#E8E4D9] rounded-xl shadow-2xl"
              >
                {/* Header Banner */}
                <div className="h-48 md:h-56 w-full overflow-hidden relative shrink-0">
                  <img 
                    src={selectedPackage.img} 
                    alt={selectedPackage.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute top-5 left-6 text-white/90 text-[10px] tracking-widest font-mono font-bold uppercase flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                    <Icon name="Leaf" size={12} className="text-[#E8C84A]" /> VIETANA CURATED
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <Text className="text-[0.65rem] uppercase tracking-widest text-[#D4AF37] font-mono font-bold mb-1.5 block">
                      {selectedPackage.duration} · {selectedPackage.badge}
                    </Text>
                    <Heading as="h3" size="3xl" font="serif" className="text-white tracking-wide leading-tight">
                      {selectedPackage.title}
                    </Heading>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-thin">
                  {/* PRICE GUIDE & RECOMMENDED HOTELS SECTION */}
                  <div className="mb-8 pb-8 border-b border-[#E8E4D9]">
                    <Heading as="h4" size="xs" className="text-[#B8860B] uppercase tracking-widest font-mono font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Layers" size={16} /> PRICE GUIDE & HOTELS
                    </Heading>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                      {/* Hotels table (spans 2 columns on desktop) */}
                      <div className="lg:col-span-2 overflow-x-auto">
                        <table className="w-full border-collapse border border-[#E8E4D9] text-left text-sm rounded-xl overflow-hidden shadow-xs">
                          <thead>
                            <tr className="bg-[#1E4D45] text-white">
                              <th className="p-3 font-serif font-bold uppercase tracking-wider text-xs border-r border-[#1E4D45]/20">City</th>
                              <th className="p-3 font-serif font-bold uppercase tracking-wider text-xs">Recommended 4★ Hotel / Cruise</th>
                            </tr>
                          </thead>
                          <tbody>
                            {parsedHotels.map((item, idx) => (
                              <tr key={idx} className="border-b border-[#E8E4D9] hover:bg-[#FAF7F0] transition-colors">
                                <td className="p-3 font-bold text-[#1E4D45] border-r border-[#E8E4D9] bg-[#E6D9BF]/10">{item.city}</td>
                                <td className="p-3 text-gray-600 font-light">{item.hotel}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Price display box */}
                      <div className="bg-[#FAF7F0] border border-[#E8E4D9] rounded-xl p-5 flex flex-col justify-between items-center text-center shadow-xs">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest font-bold text-gray-500 block mb-1">Standard Package Price</span>
                          <Heading as="h3" size="3xl" font="serif" className="text-[#1E4D45] font-extrabold mb-1">
                            {selectedPackage.price}
                          </Heading>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-4">Per Person (Twin Share)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* INCLUSIONS & EXCLUSIONS SIDE-BY-SIDE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-[#E8E4D9]">
                    {/* Inclusions */}
                    <div className="bg-green-50/20 border border-green-100 p-5 rounded-2xl flex flex-col gap-4">
                      <Heading as="h4" size="xs" className="text-green-800 uppercase tracking-widest font-mono font-bold flex items-center gap-2">
                        <Icon name="CheckCircle" size={16} /> PACKAGE INCLUSIONS
                      </Heading>
                      <div className="flex flex-col gap-2.5">
                        {selectedPackage.inclusions.map((inc, idx) => (
                          <Text key={idx} className="text-[#555555] text-xs font-light flex items-start gap-2">
                            <span className="text-green-600 font-bold shrink-0">✓</span> <span>{inc}</span>
                          </Text>
                        ))}
                      </div>
                    </div>

                    {/* Exclusions */}
                    <div className="bg-red-50/20 border border-red-100 p-5 rounded-2xl flex flex-col gap-4">
                      <Heading as="h4" size="xs" className="text-red-800 uppercase tracking-widest font-mono font-bold flex items-center gap-2">
                        <Icon name="XCircle" size={16} /> PACKAGE EXCLUDES
                      </Heading>
                      <div className="flex flex-col gap-2.5">
                        {selectedPackage.exclusions?.map((exc, idx) => (
                          <Text key={idx} className="text-[#555555] text-xs font-light flex items-start gap-2">
                            <span className="text-red-500 font-bold shrink-0">✗</span> <span>{exc}</span>
                          </Text>
                        )) || (
                          <Text className="text-[#555555]/50 text-xs italic font-light">Exclusion list not specified. Please contact us for custom exclusions.</Text>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ITINERARY ACCORDION PREVIEW */}
                  <div className="mb-6">
                    <Heading as="h4" size="xs" className="text-[#B8860B] uppercase tracking-widest font-mono font-semibold mb-6 flex items-center gap-2">
                      <Icon name="Calendar" size={16} /> DAY-BY-DAY ITINERARY PREVIEW
                    </Heading>
                    <div className="flex flex-col gap-3 pl-4 border-l border-dashed border-[#E8E4D9]">
                      {selectedPackage.days.map((day) => {
                        const isExpanded = expandedDay === day.day;
                        return (
                          <div key={day.day} className="relative">
                            <div className={`absolute -left-[21px] top-3.5 w-2 h-2 rounded-full ${
                              isExpanded ? 'bg-[#1E4D45]' : 'bg-[#E8E4D9]'
                            }`} />
                            <div 
                              className={`border rounded-xl p-4.5 cursor-pointer transition-all duration-300 ${
                                isExpanded ? 'bg-[#FAF7F0] border-[#1E4D45]/30' : 'bg-white border-[#E8E4D9]/80 hover:bg-[#FAF7F0]'
                              }`}
                              onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                            >
                              <div className="flex justify-between items-center">
                                <Text className="text-sm font-serif text-[#1E4D45] font-bold">
                                  Day {day.day}: {day.title}
                                </Text>
                                <span className="text-[#555555]/65 text-xs">
                                  <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={14} />
                                </span>
                              </div>
                              {isExpanded && (
                                <div className="mt-3 text-sm flex flex-col gap-3 font-light leading-relaxed text-[#555555]">
                                  <Text className="italic text-[#555555]/85 mb-1">{day.description}</Text>
                                  <div>
                                    <span className="text-[0.6rem] uppercase tracking-widest text-[#B8860B] font-bold block mb-1">Activities:</span>
                                    {day.activities.map((act, i) => (
                                      <div key={i} className="pl-2 flex gap-2"><span>-</span> <span>{act}</span></div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white border-t border-[#E8E4D9] shrink-0 flex flex-col gap-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest font-bold block opacity-70 mb-0.5">Starting from</span>
                      <span className="text-sm font-bold text-[#1E4D45]">
                        {selectedPackage.price} <span className="text-xs font-normal text-gray-500">/ person</span>
                      </span>
                    </div>
                    <span className="bg-[#E6D9BF]/20 text-[#1E4D45] text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider hidden sm:block">Flights: Excluded</span>
                  </div>
                  <button
                    onClick={handleGetQuoteFromModal}
                    className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#1E4D45] hover:bg-[#12302B] flex items-center justify-center gap-2 rounded-xl transition-colors shadow-sm cursor-pointer border-none"
                  >
                    Get My Quote ➔
                  </button>
                </div>
              </Modal>
            );
          })()}
        </AnimatePresence>
      </Container>
    </Section>
  );
};

export default Packages;
