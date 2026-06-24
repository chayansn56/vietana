import React, { useState, useRef } from 'react';
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

  const categories = activeTab === 'theme' ? BY_THEME_CATEGORIES : BY_REGION_CATEGORIES;
  const activeCategory = categories.find(c => c.name === activeCategoryName) || categories[0];
  const activePackage = activeCategory.packages.find(p => p.id === activePackageId) || activeCategory.packages[0];

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
    <Section id="experiences" spacing="lg" className="bg-[#111111] text-white relative overflow-hidden">
      {/* Background blobs for premium glass feel */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-brand-gold/5 rounded-full pointer-events-none z-0 hidden animate-blob-float" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-brand-green/5 rounded-full pointer-events-none z-0 hidden animate-blob-float" style={{ animationDelay: '2.5s' }} />

      <Container className="relative z-10 w-full max-w-[1400px]">
        {/* Main Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 reveal">
          <div>
            <Badge variant="gold-filled" className="mb-4 bg-brand-gold/90">
              EXPLORE PACKAGES
            </Badge>
            <Heading as="h2" size="4xl" font="serif" className="mb-4 tracking-tight text-white">
              Curated Journeys
            </Heading>
            <Heading as="h3" size="xl" className="font-sans font-light text-white/70 tracking-wide max-w-2xl">
              Locally crafted itineraries for the discerning Indian traveler.
            </Heading>
          </div>

          {/* Interest vs Region Selector */}
          <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl gap-2 w-full md:w-auto self-start">
            <button
              className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                activeTab === 'theme' 
                  ? 'bg-brand-gold text-brand-green-extra-dark shadow-strong' 
                  : 'text-white/40 hover:text-white/85'
              }`}
              onClick={() => {
                setActiveTab('theme');
                setActiveCategoryName(BY_THEME_CATEGORIES[0].name);
                if (BY_THEME_CATEGORIES[0].packages.length > 0) {
                  setActivePackageId(BY_THEME_CATEGORIES[0].packages[0].id);
                }
              }}
            >
              Browse By Interest
            </button>
            <button
              className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                activeTab === 'region' 
                  ? 'bg-brand-gold text-brand-green-extra-dark shadow-strong' 
                  : 'text-white/40 hover:text-white/85'
              }`}
              onClick={() => {
                setActiveTab('region');
                setActiveCategoryName(BY_REGION_CATEGORIES[0].name);
                if (BY_REGION_CATEGORIES[0].packages.length > 0) {
                  setActivePackageId(BY_REGION_CATEGORIES[0].packages[0].id);
                }
              }}
            >
              Browse By Region
            </button>
          </div>
        </div>

        {/* Indian Market Fit Trust Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
          {[
            { label: "Veg & Jain Dining", desc: "Curated Indian comfort & veg restaurants", icon: "Leaf", color: "text-brand-green-light" },
            { label: "24/7 Local Support", desc: "On-ground team contactable via WhatsApp", icon: "MessageCircle", color: "text-brand-gold-light" },
            { label: "Express Visa Support", desc: "Seamless e-visa approval letter service", icon: "FileText", color: "text-brand-gold-light" },
            { label: "Expert Local Guides", desc: "Hindi & English speaking verified guides", icon: "Users", color: "text-brand-green-light" }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              <span className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 ${item.color}`}>
                <Icon name={item.icon as any} size={20} />
              </span>
              <div>
                <Text variant="white" weight="bold" size="sm" className="tracking-wide">{item.label}</Text>
                <Text variant="none" className="text-white/50 text-[0.7rem] leading-snug mt-0.5">{item.desc}</Text>
              </div>
            </div>
          ))}
        </div>

        {/* Category horizontal tab bar */}
        <div className="flex flex-wrap border-b border-white/10 gap-1 mb-10 overflow-x-auto scrollbar-none pb-2 relative z-10">
          {categories.map((cat) => {
            const isActive = cat.name === activeCategoryName;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryChange(cat.name)}
                className={`px-6 py-3 text-xs tracking-widest font-semibold uppercase border-b-2 transition-all duration-300 ${
                  isActive
                    ? 'border-brand-gold text-brand-gold-light'
                    : 'border-transparent text-white/50 hover:text-white/80'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Category Header with Scroll Buttons (Apple Style) */}
        <div className="flex justify-between items-end mb-8 relative z-10">
          <div>
            <span className="text-[0.65rem] uppercase tracking-widest text-white/40 font-bold">Category Vibe</span>
            <Heading as="h4" variant="none" className="text-2xl font-serif text-white tracking-wide mt-1">
              {activeCategory.name}
            </Heading>
            <Text variant="none" className="text-white/55 text-xs font-light italic mt-1 block">
              "{activeCategory.tagline}"
            </Text>
          </div>

          {/* Apple-style circular slide controls */}
          <div className="flex gap-2.5">
            <button
              onClick={() => scrollSlider('left')}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
            >
              <Icon name="ChevronLeft" size={18} />
            </button>
            <button
              onClick={() => scrollSlider('right')}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
            >
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>
        </div>

        {/* Snapping Horizontal Slider Deck */}
        <div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-8 pt-2 relative z-10"
        >
          {activeCategory.packages.map((pkg) => {
            const downloadPaths = getDownloadPaths(pkg.id);
            return (
              <div
                key={pkg.id}
                className="w-[85vw] sm:w-[420px] h-[580px] bg-[#161616]/80 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col justify-between shrink-0 snap-start relative group hover:border-brand-gold/45 hover:shadow-gold transition-all duration-500"
              >
                {/* Visual background image with zoom hover effect */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img 
                    src={pkg.img} 
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] opacity-45"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Top header badge */}
                <div className="p-6 relative z-10 flex justify-between items-start">
                  <Badge variant="gold-filled" className="bg-brand-gold/90 text-brand-green-extra-dark font-bold text-[0.65rem] tracking-widest uppercase">
                    {pkg.badge}
                  </Badge>
                  <span className="bg-black/55 backdrop-blur-md text-brand-gold-light border border-brand-gold/25 px-3 py-1 rounded-full text-[0.6rem] tracking-widest uppercase font-bold">
                    {pkg.duration}
                  </span>
                </div>

                {/* Bottom Glassmorphic Card Panel */}
                <div className="p-6 m-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl relative z-10 flex flex-col gap-4 shadow-heavy">
                  <div>
                    <Heading as="h4" variant="none" className="text-xl font-serif text-white tracking-wide mb-1 leading-tight">
                      {pkg.title}
                    </Heading>
                    <Text variant="none" className="text-brand-gold-light text-[0.65rem] uppercase tracking-widest font-semibold block mb-2">
                      📍 {pkg.destinations.join(' → ')}
                    </Text>
                    <Text variant="none" className="text-white/70 text-xs font-light leading-relaxed line-clamp-3">
                      {pkg.desc}
                    </Text>
                  </div>

                  {/* Recommended Hotels */}
                  <div className="py-2 border-y border-white/5">
                    <span className="text-[0.6rem] uppercase tracking-widest text-white/40 font-bold block mb-1">Key Stay</span>
                    <span className="text-xs text-white/80 truncate block font-light">🏨 {pkg.hotels[0]}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <a
                      href={downloadPaths.pdf}
                      download
                      className="w-full py-2.5 px-4 bg-[#1E4D45]/60 hover:bg-[#1E4D45]/90 border border-white/10 rounded-xl text-white text-[0.65rem] font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
                    >
                      <Icon name="FileText" size={12} className="text-brand-gold" />
                      PDF Handbook
                    </a>
                    <div className="flex gap-2">
                      <Button
                        variant="glass"
                        className="flex-1 py-2.5 text-[0.6rem] tracking-widest uppercase font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl"
                        onClick={() => setSelectedPackage(pkg)}
                      >
                        Details
                      </Button>
                      <Button
                        className="flex-1 py-2.5 text-[0.6rem] tracking-widest uppercase font-bold text-brand-green-extra-dark bg-brand-gold hover:bg-brand-gold-light rounded-xl"
                        onClick={() => handleOpenPlanner(pkg)}
                      >
                        Customize
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FULLY CUSTOM BUILDER BANNER */}
        <div 
          className="mt-20 flex flex-col md:flex-row items-center gap-8 p-8 md:p-16 rounded-[2.5rem] bg-black/40 backdrop-blur-[40px] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.15)] relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:-translate-y-2" 
          onClick={() => onOpenBuilder([])}
        >
          <div className="absolute inset-[-10%] z-0 bg-cover bg-center transition-transform duration-[1500ms] group-hover:scale-105" style={{ backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80")` }} />
          <div className="flex-1 text-center md:text-left relative z-10">
            <Badge variant="gold-filled" className="mb-4">
              Fully Custom
            </Badge>
            <Heading as="h3" size="2xl" className="mt-2 mb-4 text-white font-extrabold tracking-tight">
              Build Your Own Story
            </Heading>
            <Text variant="white" size="xl" className="opacity-90">
              Select your destinations, travel style, and let our on-ground expert team plan the rest.
            </Text>
          </div>

          <Button 
            variant="glass"
            className="w-full md:w-auto px-10 py-5 bg-brand-gold text-white border-none shadow-[0_10px_30px_rgba(202,138,4,0.3)] hover:shadow-[0_15px_40px_rgba(202,138,4,0.5)] group/btn relative z-10 text-lg font-semibold"
          >
            Open Trip Builder <span className="transition-transform duration-300 group-hover/btn:translate-x-2 ml-2">→</span>
          </Button>
        </div>
      </Container>

      {/* Package Detail Modal (Accordion Itinerary overview) */}
      <AnimatePresence>
        {selectedPackage && (
          <Modal
            isOpen={!!selectedPackage}
            onClose={() => { setSelectedPackage(null); setExpandedDay(1); }}
            maxWidth="max-w-4xl"
            className="h-[80vh] flex flex-col p-0 overflow-hidden glass-dark rounded-[32px] shadow-heavy"
          >
            {/* Header image details */}
            <div className="h-48 w-full overflow-hidden relative shrink-0">
              <img 
                src={selectedPackage.img} 
                alt={selectedPackage.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-black/35" />
              <div className="absolute bottom-6 left-6 right-6">
                <Text variant="none" className="text-[0.6rem] uppercase tracking-widest text-brand-gold font-bold mb-1.5 block">
                  {selectedPackage.duration} · {selectedPackage.badge}
                </Text>
                <Heading as="h3" variant="none" className="text-2xl font-serif text-white tracking-wide">
                  {selectedPackage.title}
                </Heading>
              </div>
            </div>

            {/* Scrollable details tab */}
            <div className="flex-1 overflow-y-auto p-8 md:p-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-white/5">
                <div>
                  <Heading as="h4" variant="none" className="text-xs text-brand-gold-light uppercase tracking-widest font-semibold mb-3">
                    RECOMMENDED HOTELS
                  </Heading>
                  <div className="flex flex-col gap-2">
                    {selectedPackage.hotels.map((h, idx) => (
                      <Text key={idx} variant="none" className="text-white/80 text-xs font-light">
                        🏨 {h}
                      </Text>
                    ))}
                  </div>
                </div>

                <div>
                  <Heading as="h4" variant="none" className="text-xs text-brand-gold-light uppercase tracking-widest font-semibold mb-3">
                    KEY INCLUSIONS
                  </Heading>
                  <div className="flex flex-col gap-1.5">
                    {selectedPackage.inclusions.slice(0, 4).map((inc, idx) => (
                      <Text key={idx} variant="none" className="text-white/80 text-xs font-light flex items-start gap-2">
                        <span className="text-brand-green-light mt-0.5">✓</span> <span>{inc}</span>
                      </Text>
                    ))}
                    {selectedPackage.inclusions.length > 4 && (
                      <Text variant="none" className="text-white/40 text-[0.65rem] italic pl-5">
                        + {selectedPackage.inclusions.length - 4} more inclusions
                      </Text>
                    )}
                  </div>
                </div>
              </div>

              {/* Day-by-Day Accordion preview */}
              <div className="mb-6">
                <Heading as="h4" variant="none" className="text-xs text-brand-gold-light uppercase tracking-widest font-semibold mb-6">
                  DAY-BY-DAY ITINERARY PREVIEW
                </Heading>

                <div className="flex flex-col gap-3 pl-4 border-l border-dashed border-white/10">
                  {selectedPackage.days.map((day) => {
                    const isExpanded = expandedDay === day.day;
                    return (
                      <div key={day.day} className="relative">
                        <div className={`absolute -left-[21px] top-3.5 w-2 h-2 rounded-full ${
                          isExpanded ? 'bg-brand-gold shadow-[0_0_6px_rgba(201,168,76,0.6)]' : 'bg-white/20'
                        }`} />

                        <div 
                          className={`border rounded-xl p-4.5 cursor-pointer transition-all duration-300 ${
                            isExpanded ? 'bg-white/5 border-brand-gold/30' : 'bg-[#1a1a1a]/40 border-white/5 hover:bg-white/5'
                          }`}
                          onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                        >
                          <div className="flex justify-between items-center">
                            <Text variant="none" className="text-xs font-serif text-brand-gold-light font-bold">
                              Day {day.day}: {day.title}
                            </Text>
                            <span className="text-white/30 text-xs">
                              <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={14} />
                            </span>
                          </div>

                          {isExpanded && (
                            <div className="mt-3 text-xs flex flex-col gap-3 animate-msg-fade-in font-light leading-relaxed text-white/80">
                              <Text variant="none" className="italic text-white/60 mb-1">{day.description}</Text>
                              <div>
                                <span className="text-[0.6rem] uppercase tracking-widest text-brand-gold-light block mb-1">Activities:</span>
                                {day.activities.map((act, i) => (
                                  <div key={i} className="pl-2 flex gap-2"><span>-</span> <span>{act}</span></div>
                                ))}
                              </div>
                              <div>
                                <span className="text-[0.6rem] uppercase tracking-widest text-brand-gold-light block mb-1">Gastronomy:</span>
                                {day.food.map((f, i) => (
                                  <div key={i} className="pl-2 flex gap-2 italic text-white/60"><span>✦</span> <span>{f}</span></div>
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
                <div className="px-6 py-4 bg-white/5 border-t border-white/5 shrink-0 flex flex-col gap-2">
                  <span className="text-[0.65rem] uppercase tracking-widest text-brand-gold-light font-semibold text-center mb-1">
                    Download Luxury Handbook (No Pricing)
                  </span>
                  <div className="flex border border-white/10 rounded-2xl overflow-hidden shadow-strong">
                    <a
                      href={paths.pdf}
                      download
                      className="w-full py-3 px-4 bg-[#1E4D45]/45 hover:bg-[#1E4D45]/75 text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors duration-300"
                    >
                      <Icon name="FileText" size={14} className="text-brand-gold" />
                      Download PDF Itinerary
                    </a>
                  </div>
                </div>
              );
            })()}

            {/* Modal Actions */}
            <div className="p-6 bg-black/60 border-t border-white/5 shrink-0 flex flex-col sm:flex-row gap-3">
              <Button
                variant="glass"
                className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-white bg-white/5 border border-white/10 hover:bg-white/10"
                onClick={() => {
                  const itemsList = selectedPackage.days.map(d => `Day ${d.day}: ${d.title}`).join('\n');
                  const msg = `Hi Vietana! I'm interested in the "${selectedPackage.title}" package:\n\n${itemsList}`;
                  window.open(`https://wa.me/919953294543?text=${encodeURIComponent(msg)}`, '_blank');
                }}
              >
                <Icon name="MessageCircle" size={16} className="mr-2" /> Book via WhatsApp
              </Button>
              <Button
                className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-brand-green-extra-dark bg-brand-gold hover:bg-brand-gold-light shadow-gold"
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
