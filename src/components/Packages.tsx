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

  const getDownloadPaths = (id: string) => {
    let category = '';
    let filename = '';

    switch (id) {
      case 'budget-explorer':
        category = 'First Time in Vietnam';
        filename = '1_Vietnam_Essentials_5D4N';
        break;
      case 'hanoi-escape':
        category = 'Adventure & Offbeat';
        filename = '17_Hanoi_Discovery_4D3N';
        break;
      case 'danang-discovery':
        category = 'Beach Escapes';
        filename = '7_Danang_Beaches_5D4N';
        break;
      case 'vietnam-classic':
        category = 'First Time in Vietnam';
        filename = '2_Best_of_Vietnam_7D6N';
        break;
      case 'vietnam-complete':
        category = 'First Time in Vietnam';
        filename = '3_Complete_Vietnam_10D9N';
        break;
      case 'vietnam-honeymoon':
        category = 'Honeymoons & Romance';
        filename = '9_Romantic_Escapes_6D5N';
        break;
      case 'vietnam-family':
        category = 'Family Holidays';
        filename = '11_Family_Favorites_7D6N';
        break;
      case 'phuquoc-paradise':
        category = 'Beach Escapes';
        filename = '6_Phu_Quoc_Escapes_5D4N';
        break;
      case 'luxury-vietnam':
        category = 'Luxury & Wellness';
        filename = '23_Signature_Luxury_7D6N';
        break;
      default:
        category = 'First Time in Vietnam';
        filename = '1_Vietnam_Essentials_5D4N';
    }

    return {
      pdf: `/itineraries/PDFs/${category}/${filename}.pdf`
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
    <Section id="experiences" spacing="lg" className="bg-[#FAF7F0] text-[#111111] relative overflow-hidden">
      {/* Editorial layout elements */}
      <div className="absolute top-[10%] left-[-5%] w-[350px] h-[350px] bg-[#E9DFC8]/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-[#AAB7A1]/15 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10 w-full max-w-[1400px]">
        {/* Main Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#B8860B] uppercase mb-3 block">
              CURATED JOURNEYS
            </span>
            <Heading as="h2" size="4xl" font="serif" className="mb-4 tracking-tight text-[#1E4D45]">
              Explore Experiences
            </Heading>
            <div className="w-16 h-px bg-[#D4AF37] mb-6"></div>
            <Text variant="none" className="text-[#555555] font-light max-w-2xl text-base md:text-lg">
              Locally handpicked and customized itineraries matching the preferences of premium Indian travelers.
            </Text>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-start sm:items-center self-start">
            {/* Interest vs Region Selector */}
            <div className="flex bg-[#FAF7F0] border border-[#E8E4D9] p-1.5 rounded-lg gap-2 w-full md:w-auto">
              <button
                className={`flex-1 md:flex-none px-5 py-2.5 rounded text-xs font-semibold tracking-widest uppercase transition duration-300 ${
                  activeTab === 'theme' 
                    ? 'bg-[#1E4D45] text-white shadow-sm' 
                    : 'text-[#1E4D45]/60 hover:text-[#1E4D45]'
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
                    ? 'bg-[#1E4D45] text-white shadow-sm' 
                    : 'text-[#1E4D45]/60 hover:text-[#1E4D45]'
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
                className="w-4.5 h-4.5 accent-[#1E4D45] cursor-pointer"
              />
              <span className="text-xs font-mono uppercase tracking-wider text-[#1E4D45]">
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
                  ? 'border-[#1E4D45] bg-[#1E4D45]/5 text-[#1E4D45]'
                  : 'border-[#E8E4D9] text-[#555555] hover:border-[#1E4D45]/50'
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
              <div className="w-12 h-12 rounded-full bg-[#1E4D45]/10 text-[#1E4D45] flex items-center justify-center mb-2">
                <Icon name="Leaf" size={24} />
              </div>
              <Heading as="h4" variant="none" className="text-xl font-serif text-[#1E4D45] tracking-wide">Custom Jain & Veg Tours Available</Heading>
              <Text variant="none" className="text-[#555555] text-xs font-light leading-relaxed max-w-md">
                We craft bespoke itineraries with certified Jain kitchens, Indian chefs, and 100% vegetarian catering for this region. Let's build your perfect tour!
              </Text>
              <div className="flex gap-3 mt-4 w-full justify-center">
                <button 
                  className="px-6 py-3 bg-[#1E4D45] hover:bg-[#12302B] text-white text-xs tracking-wider uppercase rounded shadow"
                  onClick={() => onOpenBuilder([])}
                >
                  Custom Planner
                </button>
              </div>
            </div>
          ) : (
            displayedPackages.map((pkg) => {
              const downloadPaths = getDownloadPaths(pkg.id);
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
                      <span className="bg-[#1E4D45] text-white font-semibold text-[8px] tracking-widest uppercase px-2.5 py-1 rounded shadow-sm">
                        {pkg.badge}
                      </span>
                      <span className="bg-white text-[#1E4D45] border border-[#E8E4D9] px-2.5 py-1 rounded text-[8px] tracking-widest uppercase font-mono font-bold">
                        {pkg.duration}
                      </span>
                    </div>
                  </div>

                  {/* Editorial Body / Content */}
                  <div className="flex-1 px-6 py-5 flex flex-col justify-between relative bg-white">
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold font-serif text-[#1E4D45] tracking-tight leading-tight">
                        {pkg.title}
                      </h4>
                      
                      <div className="editorial-meta-tag pb-1 border-b border-[#E8E4D9]">
                        ROUTE // {pkg.destinations.join(' ➔ ')}
                      </div>

                      <p className="text-[#555555] text-xs font-light leading-relaxed line-clamp-3">
                        {pkg.desc}
                      </p>
                    </div>

                    <div className="py-2.5 border-t border-[#E8E4D9] flex items-center justify-between gap-4 mt-2">
                      <div>
                        <span className="text-[8px] uppercase tracking-widest text-[#B8860B] font-bold block mb-0.5">Stay Curation</span>
                        <span className="text-[11px] text-[#1E4D45] truncate block font-medium">🏨 {pkg.hotels[0]}</span>
                      </div>
                      
                      {pkg.isJainVegFriendly && (
                        <span className="text-[9px] bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200 uppercase font-mono">
                          Veg Friendly
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Vogue Editorial Action Footer */}
                  <div className="bg-[#FAF7F0] border-t border-[#E8E4D9] p-4 flex gap-3 shrink-0">
                    <a
                      href={downloadPaths.pdf}
                      download
                      className="flex-1 py-2 px-3 bg-white hover:bg-[#FAF7F0] border border-[#E8E4D9] rounded text-[#1E4D45] text-[9px] font-bold uppercase tracking-widest text-center flex items-center justify-center gap-1.5 transition duration-300"
                    >
                      <Icon name="FileText" size={11} className="text-[#B8860B]" />
                      PDF Info
                    </a>
                    <button
                      className="flex-1 py-2 px-3 text-[9px] tracking-widest uppercase font-bold rounded cursor-pointer editorial-btn"
                      onClick={() => handleOpenPlanner(pkg)}
                    >
                      Customize
                    </button>
                    <button
                      className="py-2 px-3 text-[9px] tracking-widest uppercase font-bold text-[#555555] hover:text-[#111111] bg-white border border-[#E8E4D9] rounded transition duration-300 cursor-pointer"
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
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#B8860B] uppercase">Bespoke Curation</span>
            <Heading as="h3" size="2xl" className="mt-2 mb-4 text-[#1E4D45] font-serif font-bold tracking-tight">
              Build Your Own Story
            </Heading>
            <Text variant="none" className="text-[#555555] text-base font-light max-w-xl">
              Select your destinations, travel style, and let our on-ground expert team plan the rest.
            </Text>
          </div>

          <button 
            className="w-full md:w-auto px-8 py-4 bg-[#1E4D45] hover:bg-[#12302B] text-white border-none shadow transition-all duration-300 rounded text-xs tracking-widest uppercase font-bold z-10"
          >
            Open Trip Builder <span className="ml-2">→</span>
          </button>
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
              <div className="absolute bottom-6 left-6 right-6">
                <Text variant="none" className="text-[0.65rem] uppercase tracking-widest text-[#D4AF37] font-mono font-bold mb-1.5 block">
                  {selectedPackage.duration} · {selectedPackage.badge}
                </Text>
                <Heading as="h3" variant="none" className="text-2xl font-serif text-white tracking-wide">
                  {selectedPackage.title}
                </Heading>
              </div>
            </div>

            {/* Scrollable details tab */}
            <div className="flex-1 overflow-y-auto p-8 md:p-10 scrollbar-thin">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-[#E8E4D9]">
                <div>
                  <Heading as="h4" variant="none" className="text-xs text-[#B8860B] uppercase tracking-widest font-mono font-semibold mb-3">
                    RECOMMENDED HOTELS
                  </Heading>
                  <div className="flex flex-col gap-2">
                    {selectedPackage.hotels.map((h, idx) => (
                      <Text key={idx} variant="none" className="text-[#555555] text-xs font-light">
                        🏨 {h}
                      </Text>
                    ))}
                  </div>
                </div>

                <div>
                  <Heading as="h4" variant="none" className="text-xs text-[#B8860B] uppercase tracking-widest font-mono font-semibold mb-3">
                    KEY INCLUSIONS
                  </Heading>
                  <div className="flex flex-col gap-1.5">
                    {selectedPackage.inclusions.slice(0, 4).map((inc, idx) => (
                      <Text key={idx} variant="none" className="text-[#555555] text-xs font-light flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span> <span>{inc}</span>
                      </Text>
                    ))}
                    {selectedPackage.inclusions.length > 4 && (
                      <Text variant="none" className="text-[#555555]/60 text-[0.65rem] italic pl-5">
                        + {selectedPackage.inclusions.length - 4} more inclusions
                      </Text>
                    )}
                  </div>
                </div>
              </div>

              {/* Day-by-Day Accordion preview */}
              <div className="mb-6">
                <Heading as="h4" variant="none" className="text-xs text-[#B8860B] uppercase tracking-widest font-mono font-semibold mb-6">
                  DAY-BY-DAY ITINERARY PREVIEW
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
                            <Text variant="none" className="text-xs font-serif text-[#1E4D45] font-bold">
                              Day {day.day}: {day.title}
                            </Text>
                            <span className="text-[#555555]/65 text-xs">
                              <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={14} />
                            </span>
                          </div>

                          {isExpanded && (
                            <div className="mt-3 text-xs flex flex-col gap-3 animate-msg-fade-in font-light leading-relaxed text-[#555555]">
                              <Text variant="none" className="italic text-[#555555]/85 mb-1">{day.description}</Text>
                              <div>
                                <span className="text-[0.6rem] uppercase tracking-widest text-[#B8860B] font-bold block mb-1">Activities:</span>
                                {day.activities.map((act, i) => (
                                  <div key={i} className="pl-2 flex gap-2"><span>-</span> <span>{act}</span></div>
                                ))}
                              </div>
                              <div>
                                <span className="text-[0.6rem] uppercase tracking-widest text-[#B8860B] font-bold block mb-1">Gastronomy:</span>
                                {day.food.map((f, i) => (
                                  <div key={i} className="pl-2 flex gap-2 italic text-[#555555]/80"><span>✦</span> <span>{f}</span></div>
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
              const getDownloadPaths = (id: string) => {
                let category = '';
                let filename = '';

                switch (id) {
                  case 'budget-explorer':
                    category = 'First Time in Vietnam';
                    filename = '1_Vietnam_Essentials_5D4N';
                    break;
                  case 'hanoi-escape':
                    category = 'Adventure & Offbeat';
                    filename = '17_Hanoi_Discovery_4D3N';
                    break;
                  case 'danang-discovery':
                    category = 'Beach Escapes';
                    filename = '7_Danang_Beaches_5D4N';
                    break;
                  case 'vietnam-classic':
                    category = 'First Time in Vietnam';
                    filename = '2_Best_of_Vietnam_7D6N';
                    break;
                  case 'vietnam-complete':
                    category = 'First Time in Vietnam';
                    filename = '3_Complete_Vietnam_10D9N';
                    break;
                  case 'vietnam-honeymoon':
                    category = 'Honeymoons & Romance';
                    filename = '9_Romantic_Escapes_6D5N';
                    break;
                  case 'vietnam-family':
                    category = 'Family Holidays';
                    filename = '11_Family_Favorites_7D6N';
                    break;
                  case 'phuquoc-paradise':
                    category = 'Beach Escapes';
                    filename = '6_Phu_Quoc_Escapes_5D4N';
                    break;
                  case 'luxury-vietnam':
                    category = 'Luxury & Wellness';
                    filename = '23_Signature_Luxury_7D6N';
                    break;
                  default:
                    category = 'First Time in Vietnam';
                    filename = '1_Vietnam_Essentials_5D4N';
                }

                return {
                  pdf: `/itineraries/PDFs/${category}/${filename}.pdf`
                };
              };

              const paths = getDownloadPaths(selectedPackage.id);
              return (
                <div className="px-6 py-4 bg-[#FAF7F0] border-t border-[#E8E4D9] shrink-0 flex flex-col gap-2">
                  <span className="text-[0.65rem] uppercase tracking-widest text-[#B8860B] font-semibold text-center mb-1">
                    Download Luxury Handbook
                  </span>
                  <div className="flex border border-[#E8E4D9] rounded overflow-hidden shadow-sm">
                    <a
                      href={paths.pdf}
                      download
                      className="w-full py-3 px-4 bg-[#1E4D45] hover:bg-[#12302B] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors duration-300"
                    >
                      <Icon name="FileText" size={14} className="text-[#D4AF37]" />
                      Download PDF Itinerary
                    </a>
                  </div>
                </div>
              );
            })()}

            {/* Modal Actions */}
            <div className="p-6 bg-white border-t border-[#E8E4D9] shrink-0 flex flex-col sm:flex-row gap-3">
              <Button
                variant="glass"
                className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-[#1E4D45] bg-[#FAF7F0] border border-[#E8E4D9] hover:bg-[#1E4D45]/5"
                onClick={() => {
                  const itemsList = selectedPackage.days.map(d => `Day ${d.day}: ${d.title}`).join('\n');
                  const msg = `Hi Vietana! I'm interested in the "${selectedPackage.title}" package:\n\n${itemsList}`;
                  window.open(`https://wa.me/919953294543?text=${encodeURIComponent(msg)}`, '_blank');
                }}
              >
                <Icon name="MessageCircle" size={16} className="mr-2" /> Book via WhatsApp
              </Button>
              <Button
                className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#1E4D45] hover:bg-[#12302B]"
                onClick={() => {
                  const pkg = selectedPackage;
                  setSelectedPackage(null);
                  handleOpenPlanner(pkg);
                }}
              >
                <Icon name="Sparkles" size={16} className="mr-2" /> Customize with AI
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Packages;
