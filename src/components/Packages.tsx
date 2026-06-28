import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BY_THEME_CATEGORIES, 
  BY_REGION_CATEGORIES, 
  PackageProduct, 
  CategoryData 
} from '../data/packagesData';
import Button from './ui/Button';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Badge from './ui/Badge';
import Icon from './ui/Icon';
import Modal from './ui/Modal';
import PDFCustomizerModal from './PDFCustomizerModal';

interface PackagesProps {
  onOpenBuilder: (dest?: string[]) => void;
  onOpenPlanner?: (destination?: string, prompt?: string) => void;
}

const Packages: React.FC<PackagesProps> = ({ onOpenBuilder, onOpenPlanner }) => {
  const [activeTab, setActiveTab] = useState<'theme' | 'region'>('theme');
  const [activeCategoryName, setActiveCategoryName] = useState<string>(
    BY_THEME_CATEGORIES[0].name
  );
  const [activePackageId, setActivePackageId] = useState<string | null>(
    BY_THEME_CATEGORIES[0].packages[0]?.id || null
  );
  const [selectedPackage, setSelectedPackage] = useState<PackageProduct | null>(null);
  const [customizerPkg, setCustomizerPkg] = useState<PackageProduct | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [jainVegOnly, setJainVegOnly] = useState(false);

  const categories = activeTab === 'theme' ? BY_THEME_CATEGORIES : BY_REGION_CATEGORIES;
  const activeCategory = categories.find(c => c.name === activeCategoryName) || categories[0];
  
  const displayedPackages = useMemo(() => {
    if (jainVegOnly) {
      return activeCategory.packages.filter(p => p.isJainVegFriendly);
    }
    return activeCategory.packages;
  }, [activeCategory, jainVegOnly]);

  const activePackage = displayedPackages.find(p => p.id === activePackageId) || displayedPackages[0] || activeCategory.packages[0];

  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryChange = (catName: string) => {
    setActiveCategoryName(catName);
    const newCat = categories.find(c => c.name === catName) || categories[0];
    if (newCat && newCat.packages.length > 0) {
      setActivePackageId(newCat.packages[0].id);
    }
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const getDownloadPaths = (pkg: PackageProduct) => {
    const category = pkg.category;
    const filename = pkg.title.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '.pdf';
    return {
      pdf: `/itineraries/PDFs/${category}/${filename}`
    };
  };


  const handleOpenPlanner = (pkg: PackageProduct) => {
    if (onOpenPlanner) {
      const prompt = `I'd like to plan and customize the following trip package:
Package: ${pkg.title}
Duration: ${pkg.duration}
Destinations: ${pkg.destinations.join(', ')}
Hotels: ${pkg.hotels.join(', ')}

Please load this itinerary and let me customize it!`;
      onOpenPlanner(pkg.destinations[0], prompt);
    }
  };

  return (
    <Section id="experiences" spacing="lg" className="bg-[#FAF7F0] text-text-dark relative overflow-hidden">
      {/* Editorial layout elements */}
      <div className="absolute top-[10%] left-[-5%] w-[350px] h-[350px] bg-surface-warm/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-[#AAB7A1]/15 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10 w-full max-w-[1400px]">
        {/* Featured Packages — redesigned editorial cards */}
        {(() => {
          const hotPkg1 = BY_THEME_CATEGORIES.find(c => c.name === "Beach Escapes")?.packages.find(p => p.id === "hcmc-phu-quoc-explorer-5d4n");
          const hotPkg2 = BY_THEME_CATEGORIES.find(c => c.name === "Beach Escapes")?.packages.find(p => p.id === "hcmc-dalat-explorer-5d4n");
          if (!hotPkg1 || !hotPkg2) return null;
          return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
              {[hotPkg1, hotPkg2].map((pkg, idx) => (
                <div key={pkg.id} className="relative">
                  <div className="absolute top-3 right-0 z-20">
                    <div className="bg-brand-gold-light text-brand-green-dark text-[11px] font-bold tracking-widest text-center py-1 px-5 uppercase shadow-sm border-y border-white/20 rounded-l-sm">
                      Bestseller
                    </div>
                  </div>
                  <div className="group rounded-xl bg-gradient-to-br from-brand-green via-brand-green-dark to-brand-green-extra-dark border border-white/10 transition-all duration-500 hover:border-white/20 overflow-hidden">
                  {/* Gold top accent line */}
                  <div className="h-[2px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-brand-sage/20 text-brand-sage text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded">
                        {idx === 0 ? 'Coastal' : 'Highlands'}
                      </span>
                      <span className="text-white/50 text-[11px] font-mono tracking-wider">{pkg.duration}</span>
                    </div>
                    <Heading as="h3" size="h4" font="serif" variant="white" className="mb-3">
                      {pkg.title}
                    </Heading>
                    <p className="text-white/70 text-sm font-light leading-relaxed mb-5 max-w-prose">
                      {idx === 0
                        ? 'From Ho Chi Minh to Phu Quoc — Cu Chi Tunnels, Mekong Delta cruise, and 3 Island speedboating with snorkeling.'
                        : 'From Ho Chi Minh to Da Lat — Saigon River Sunset Cruise, Cu Chi Tunnels, Datanla Coaster, and Clay Tunnel.'}
                    </p>
                    <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-5">
                      <div>
                        <span className="text-white/40 text-[11px] uppercase tracking-widest font-semibold block mb-1">From</span>
                        <span className="text-2xl font-mono font-bold text-brand-gold-light tabular-nums">{pkg.price} <span className="text-xs font-normal text-white/50">PP</span></span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenPlanner(pkg)}
                          className="px-4 py-2 bg-brand-gold-light hover:bg-[#d8b83a] text-brand-green-dark text-[11px] font-bold tracking-widest uppercase rounded transition-all duration-300 cursor-pointer"
                        >
                          Customize
                        </button>
                        <button
                          onClick={() => setSelectedPackage(pkg)}
                          className="px-4 py-2 border border-white/20 hover:bg-white/10 text-white text-[11px] font-bold tracking-widest uppercase rounded transition-all duration-300 cursor-pointer"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold tracking-wide-em text-brand-sage uppercase mb-3 block">
              VIETANA CURATED
            </span>
            <Heading as="h2" size="h3" font="serif" className="mb-3 tracking-tight text-brand-green">
              Explore Packages
            </Heading>
            <div className="w-12 h-px bg-brand-gold mb-5"></div>
            <Text variant="none" className="text-text-subtle font-light max-w-2xl text-sm md:text-base">
              Handpicked itineraries crafted for premium Indian travelers, with local support from Ho Chi Minh City.
            </Text>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-start sm:items-center self-start">
            {/* Interest vs Region Selector */}
            <div className="flex bg-[#FAF7F0] border border-[#E8E4D9] p-1.5 rounded-lg gap-2 w-full md:w-auto">
              <button
                className={`flex-1 md:flex-none px-5 py-2.5 rounded text-xs font-semibold tracking-widest uppercase transition duration-300 ${
                  activeTab === 'theme' 
                    ? 'bg-brand-green text-white shadow-sm' 
                    : 'text-brand-green/60 hover:text-brand-green'
                }`}
                onClick={() => {
                  setActiveTab('theme');
                  setActiveCategoryName(BY_THEME_CATEGORIES[0].name);
                  if (BY_THEME_CATEGORIES[0].packages.length > 0) {
                    setActivePackageId(BY_THEME_CATEGORIES[0].packages[0].id);
                  }
                }}
              >
                By Theme
              </button>
              <button
                className={`flex-1 md:flex-none px-5 py-2.5 rounded text-xs font-semibold tracking-widest uppercase transition duration-300 ${
                  activeTab === 'region' 
                    ? 'bg-brand-green text-white shadow-sm' 
                    : 'text-brand-green/60 hover:text-brand-green'
                }`}
                onClick={() => {
                  setActiveTab('region');
                  setActiveCategoryName(BY_REGION_CATEGORIES[0].name);
                  if (BY_REGION_CATEGORIES[0].packages.length > 0) {
                    setActivePackageId(BY_REGION_CATEGORIES[0].packages[0].id);
                  }
                }}
              >
                By Region
              </button>
            </div>

            {/* Jain Veg Option filter */}
            <label className="flex items-center gap-3 cursor-pointer self-start sm:self-auto py-2">
              <input 
                type="checkbox" 
                checked={jainVegOnly}
                onChange={() => setJainVegOnly(!jainVegOnly)}
                className="w-4.5 h-4.5 accent-brand-green cursor-pointer"
              />
              <span className="text-xs font-mono uppercase tracking-wider text-brand-green">
                🟢 Jain & Veg Only
              </span>
            </label>
          </div>
        </div>

        {/* Category Tabs list horizontal */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 border-b border-[#E8E4D9] scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`px-4 py-2 border rounded-full text-xs font-medium tracking-wide uppercase transition shrink-0 duration-300 ${
                activeCategoryName === cat.name
                  ? 'border-brand-green bg-brand-green/5 text-brand-green'
                  : 'border-[#E8E4D9] text-text-subtle hover:border-brand-green/50'
              }`}
              onClick={() => handleCategoryChange(cat.name)}
            >
              {cat.name} ({cat.packages.length})
            </button>
          ))}
        </div>

        {/* Snapping Horizontal Slider Deck */}
        <div 
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-8 pt-2 relative z-10 w-full"
        >
          {displayedPackages.length === 0 ? (
            <div className="w-full max-w-xl mx-auto min-h-[300px] flex flex-col items-center justify-center text-center p-10 bg-white border border-[#E8E4D9] rounded-xl gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-2">
                <Icon name="Leaf" size={24} />
              </div>
              <Heading as="h4" variant="none" className="text-xl font-serif text-brand-green tracking-wide">Custom Jain & Veg Tours Available</Heading>
              <Text variant="none" className="text-text-subtle text-xs font-light leading-relaxed max-w-md">
                We craft bespoke itineraries with certified Jain kitchens, Indian chefs, and 100% vegetarian catering for this region. Let's build your perfect tour!
              </Text>
              <div className="flex gap-3 mt-4 w-full justify-center">
                <button 
                  className="px-6 py-3 bg-brand-green hover:bg-brand-green-dark text-white text-xs tracking-wider uppercase rounded shadow"
                  onClick={() => onOpenBuilder([])}
                >
                  Custom Planner
                </button>
              </div>
            </div>
          ) : (
            displayedPackages.map((pkg) => {
              const downloadPaths = getDownloadPaths(pkg);
              return (
                <div
                  key={pkg.id}
                  className="w-[85vw] sm:w-[420px] h-[540px] editorial-card rounded-xl flex flex-col justify-between shrink-0 snap-start relative group overflow-hidden border border-[#E8E4D9]"
                >
                  {/* Photo area */}
                  <div className="h-[220px] relative w-full overflow-hidden shrink-0 border-b border-[#E8E4D9]">
                    <img 
                      src={pkg.img} 
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-[1200ms]"
                    />
                    
                    {/* Top tags */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                      <span className="bg-brand-green text-white font-semibold text-[11px] tracking-widest uppercase px-2.5 py-1 rounded shadow-sm">
                        {pkg.badge}
                      </span>
                      {pkg.price ? (
                        <span className="bg-brand-gold-light text-brand-green-dark px-2.5 py-1 rounded text-[11px] tracking-wider uppercase font-mono font-bold shadow-sm border border-white/20">
                          {pkg.price} PP
                        </span>
                      ) : (
                        <span className="bg-white text-brand-green border border-[#E8E4D9] px-2.5 py-1 rounded text-[11px] tracking-widest uppercase font-mono font-bold">
                          {pkg.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Editorial Body / Content */}
                  <div className="flex-1 px-6 py-5 flex flex-col justify-between relative bg-white">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-lg font-bold font-serif text-brand-green tracking-tight leading-tight flex-1">
                          {pkg.title}
                        </h4>
                        {pkg.price && (
                          <span className="text-xs text-brand-gold-muted font-bold border border-brand-gold-muted/20 bg-[#FAF7F0] px-2 py-0.5 rounded font-mono shrink-0">
                            {pkg.duration}
                          </span>
                        )}
                      </div>
                      
                      <div className="editorial-meta-tag pb-1 border-b border-[#E8E4D9]">
                        ROUTE // {pkg.destinations.join(' ➔ ')}
                      </div>

                      <p className="text-text-subtle text-xs font-light leading-relaxed line-clamp-3">
                        {pkg.desc}
                      </p>
                    </div>

                    <div className="py-2.5 border-t border-[#E8E4D9] flex items-center justify-between gap-4 mt-2">
                      <div>
                        <span className="text-[11px] uppercase tracking-widest text-brand-gold-muted font-bold block mb-0.5">Stay Curation</span>
                        <span className="text-[11px] text-brand-green truncate block font-medium">🏨 {pkg.hotels[0]}</span>
                      </div>
                      
                      {pkg.isJainVegFriendly && (
                        <span className="text-[11px] bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200 uppercase font-mono">
                          Veg Friendly
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Vogue Editorial Action Footer */}
                  <div className="bg-[#FAF7F0] border-t border-[#E8E4D9] p-4 flex gap-3 shrink-0">
                    <button
                      onClick={() => setCustomizerPkg(pkg)}
                      className="flex-1 py-2 px-3 bg-white hover:bg-[#FAF7F0] border border-[#E8E4D9] rounded text-brand-green text-[11px] font-bold uppercase tracking-widest text-center flex items-center justify-center gap-1.5 transition duration-300 cursor-pointer"
                    >
                      <Icon name="FileText" size={11} className="text-brand-gold-muted" />
                      PDF Info
                    </button>
                    <button
                      className="flex-1 py-2 px-3 text-[11px] tracking-widest uppercase font-bold rounded cursor-pointer editorial-btn flex items-center justify-center gap-1"
                      onClick={() => handleOpenPlanner(pkg)}
                    >
                      <Icon name="Sparkles" size={10} /> AI Customization
                    </button>
                    <button
                      className="py-2 px-3 text-[11px] tracking-widest uppercase font-bold text-text-subtle hover:text-text-dark bg-white border border-[#E8E4D9] rounded transition duration-300 cursor-pointer"
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            }))}
        </div>

        {/* FULLY CUSTOM BUILDER BANNER */}
        <div 
          className="mt-20 flex flex-col md:flex-row items-center gap-8 p-8 md:p-16 rounded-xl bg-white border border-[#E8E4D9] shadow-sm relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:-translate-y-1" 
          onClick={() => onOpenBuilder([])}
        >
          <div className="absolute inset-[-10%] z-0 bg-cover bg-center transition-transform duration-[1500ms] group-hover:scale-101" style={{ backgroundImage: `linear-gradient(135deg, rgba(250, 247, 240, 0.9), rgba(250, 247, 240, 0.95)), url("https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80")` }} />
          <div className="flex-1 text-center md:text-left relative z-10">
            <span className="text-xs font-bold tracking-[0.2em] text-brand-sage uppercase">Bespoke Curation</span>
            <Heading as="h3" size="2xl" className="mt-2 mb-4 text-brand-green font-serif font-bold tracking-tight">
              Build Your Own Story
            </Heading>
            <Text variant="none" className="text-text-subtle text-base font-light max-w-xl">
              Select your destinations, travel style, and let our on-ground expert team plan the rest.
            </Text>
          </div>

          <button 
            className="w-full md:w-auto px-8 py-4 bg-brand-green hover:bg-brand-green-dark text-white border-none shadow transition-all duration-300 rounded text-xs tracking-widest uppercase font-bold z-10"
          >
            Open Trip Builder <span className="ml-2">→</span>
          </button>
        </div>

        {/* MORE BUDGET TOURS COMING SOON BANNER */}
        <div className="mt-8 p-6 text-center bg-brand-green/5 border border-brand-green/15 rounded-xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#E8E4D9] text-[11px] font-mono tracking-widest text-brand-gold-muted uppercase font-bold mb-3 shadow-xs">
            📢 UPCOMING OFFERINGS
          </span>
          <Heading as="h4" variant="none" className="text-xl font-serif text-brand-green mb-2 font-semibold">
            More Budget Tours Coming Soon!
          </Heading>
          <Text variant="none" className="text-text-subtle text-xs font-light max-w-md mx-auto">
            Our team is packaging more pocket-friendly packages featuring certified budget stays, shared group excursions, and seasonal deals. Stay tuned!
          </Text>
        </div>
      </Container>

      {/* Package Detail Modal (Accordion Itinerary overview) */}
      <AnimatePresence>
        {selectedPackage && (
          <Modal
            isOpen={!!selectedPackage}
            onClose={() => { setSelectedPackage(null); setExpandedDay(1); }}
            maxWidth="max-w-4xl"
            className="h-[80vh] flex flex-col p-0 overflow-hidden bg-white border border-[#E8E4D9] rounded-xl shadow-heavy"
          >
            {/* Header image details */}
            <div className="h-48 w-full overflow-hidden relative shrink-0">
              <img 
                src={selectedPackage.img} 
                alt={selectedPackage.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              {/* Vietana Brand Logo Label */}
              <div className="absolute top-5 left-6 text-white/85 text-xs tracking-widest font-mono font-bold uppercase flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                <Icon name="Leaf" size={12} className="text-brand-gold-light" /> VIETANA CURATED
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end gap-4">
                <div>
                  <Text variant="none" className="text-caption uppercase tracking-widest text-brand-gold font-mono font-bold mb-1.5 block">
                    {selectedPackage.duration} · {selectedPackage.badge}
                  </Text>
                  <Heading as="h3" variant="none" className="text-2xl font-serif text-white tracking-wide">
                    {selectedPackage.title}
                  </Heading>
                </div>
                {selectedPackage.price && (
                  <div className="bg-brand-gold-light text-brand-green-dark px-4 py-2 rounded shadow-md border border-white/20 text-center shrink-0">
                    <span className="text-[11px] uppercase tracking-widest font-bold block opacity-85 leading-none mb-1">Indian Price</span>
                    <span className="text-lg font-mono font-extrabold leading-none tabular-nums">{selectedPackage.price} PP</span>
                  </div>
                )}
              </div>
            </div>

            {/* Scrollable details tab */}
            <div className="flex-1 overflow-y-auto p-8 md:p-10 scrollbar-thin">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-[#E8E4D9]">
                <div>
                  <Heading as="h4" variant="none" className="text-xs text-brand-gold-muted uppercase tracking-widest font-mono font-semibold mb-3">
                    RECOMMENDED HOTELS
                  </Heading>
                  <div className="flex flex-col gap-2">
                    {selectedPackage.hotels.map((h, idx) => (
                      <Text key={idx} variant="none" className="text-text-subtle text-xs font-light">
                        🏨 {h}
                      </Text>
                    ))}
                  </div>
                </div>

                <div>
                  <Heading as="h4" variant="none" className="text-xs text-brand-gold-muted uppercase tracking-widest font-mono font-semibold mb-3">
                    KEY INCLUSIONS
                  </Heading>
                  <div className="flex flex-col gap-1.5">
                    {selectedPackage.inclusions.slice(0, 4).map((inc, idx) => (
                      <Text key={idx} variant="none" className="text-text-subtle text-xs font-light flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span> <span>{inc}</span>
                      </Text>
                    ))}
                    {selectedPackage.inclusions.length > 4 && (
                      <Text variant="none" className="text-text-subtle/60 text-caption italic pl-5">
                        + {selectedPackage.inclusions.length - 4} more inclusions
                      </Text>
                    )}
                  </div>
                </div>
              </div>

              {/* Day-by-Day Accordion preview */}
              <div className="mb-6">
                <Heading as="h4" variant="none" className="text-xs text-brand-gold-muted uppercase tracking-widest font-mono font-semibold mb-6">
                  DAY-BY-DAY ITINERARY PREVIEW
                </Heading>

                <div className="flex flex-col gap-3 pl-4 border-l border-dashed border-[#E8E4D9]">
                  {selectedPackage.days.map((day) => {
                    const isExpanded = expandedDay === day.day;
                    return (
                      <div key={day.day} className="relative">
                        <div className={`absolute -left-[21px] top-3.5 w-2 h-2 rounded-full ${
                          isExpanded ? 'bg-brand-green' : 'bg-[#E8E4D9]'
                        }`} />

                        <div 
                          className={`border rounded-xl p-4.5 cursor-pointer transition-all duration-300 ${
                            isExpanded ? 'bg-[#FAF7F0] border-brand-green/30' : 'bg-white border-[#E8E4D9]/80 hover:bg-[#FAF7F0]'
                          }`}
                          onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                        >
                          <div className="flex justify-between items-center">
                            <Text variant="none" className="text-xs font-serif text-brand-green font-bold">
                              Day {day.day}: {day.title}
                            </Text>
                            <span className="text-text-subtle/65 text-xs">
                              <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={14} />
                            </span>
                          </div>

                          {isExpanded && (
                            <div className="mt-3 text-xs flex flex-col gap-3 animate-msg-fade-in font-light leading-relaxed text-text-subtle">
                              <Text variant="none" className="italic text-text-subtle/85 mb-1">{day.description}</Text>
                              <div>
                                <span className="text-caption uppercase tracking-widest text-brand-gold-muted font-bold block mb-1">Activities:</span>
                                {day.activities.map((act, i) => (
                                  <div key={i} className="pl-2 flex gap-2"><span>-</span> <span>{act}</span></div>
                                ))}
                              </div>
                              <div>
                                <span className="text-caption uppercase tracking-widest text-brand-gold-muted font-bold block mb-1">Gastronomy:</span>
                                {day.food.map((f, i) => (
                                  <div key={i} className="pl-2 flex gap-2 italic text-text-subtle/80"><span>✦</span> <span>{f}</span></div>
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

            {/* Premium Download Buttons */}
            {(() => {
              const paths = getDownloadPaths(selectedPackage);
              return (
                <div className="px-6 py-4 bg-[#FAF7F0] border-t border-[#E8E4D9] shrink-0 flex flex-col gap-2">
                  <span className="text-caption uppercase tracking-widest text-brand-gold-muted font-semibold text-center mb-1">
                    Download Luxury Handbook
                  </span>
                  <div className="flex border border-[#E8E4D9] rounded overflow-hidden shadow-sm">
                    <button
                      onClick={() => {
                        setSelectedPackage(null);
                        setCustomizerPkg(selectedPackage);
                      }}
                      className="w-full py-3 px-4 bg-brand-green hover:bg-brand-green-dark text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors duration-300 cursor-pointer"
                    >
                      <Icon name="FileText" size={14} className="text-brand-gold" />
                      Customize & Download PDF
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Modal Actions */}
            <div className="p-6 bg-white border-t border-[#E8E4D9] shrink-0 flex flex-col sm:flex-row gap-3">
              <Button
                variant="glass"
                className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-brand-green bg-[#FAF7F0] border border-[#E8E4D9] hover:bg-brand-green/5"
                onClick={() => {
                  const itemsList = selectedPackage.days.map(d => `Day ${d.day}: ${d.title}`).join('\n');
                  const msg = `Hi Vietana! I'm interested in the "${selectedPackage.title}" package:\n\n${itemsList}`;
                  window.open(`https://wa.me/919953294543?text=${encodeURIComponent(msg)}`, '_blank');
                }}
              >
                <Icon name="MessageCircle" size={16} className="mr-2" /> Book via WhatsApp
              </Button>
              <Button
                className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-white bg-brand-green hover:bg-brand-green-dark flex items-center justify-center gap-1.5"
                onClick={() => {
                  const pkg = selectedPackage;
                  setSelectedPackage(null);
                  handleOpenPlanner(pkg);
                }}
              >
                <Icon name="Mic" size={16} /> Customize with Voice
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      <PDFCustomizerModal 
        isOpen={customizerPkg !== null} 
        onClose={() => setCustomizerPkg(null)} 
        pkg={customizerPkg} 
      />
    </Section>
  );
};

export default Packages;
