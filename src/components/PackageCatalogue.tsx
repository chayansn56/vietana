import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { 
  BY_THEME_CATEGORIES, 
  BY_REGION_CATEGORIES, 
  PackageProduct 
} from '../data/packagesData';
import Button from './ui/Button';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import Modal from './ui/Modal';

interface PackageCatalogueProps {
  onClose: () => void;
  onQuoteClick: () => void;
}

const PackageCatalogue: React.FC<PackageCatalogueProps> = ({ onClose, onQuoteClick }) => {
  const [activeTab, setActiveTab] = useState<'theme' | 'region'>('theme');
  const [activeCategoryName, setActiveCategoryName] = useState<string>(
    BY_THEME_CATEGORIES[0].name
  );
  const [selectedPackage, setSelectedPackage] = useState<PackageProduct | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [jainVegOnly, setJainVegOnly] = useState(false);

  React.useEffect(() => {
    const pendingFilter = localStorage.getItem('pending_package_category');
    if (pendingFilter) {
      localStorage.removeItem('pending_package_category');
      if (pendingFilter === 'All') {
        setActiveTab('theme');
        setActiveCategoryName(BY_THEME_CATEGORIES[0].name);
      } else {
        const MAPPED_CATEGORIES: Record<string, string> = {
          'Classic': 'First Time in Vietnam',
          'Honeymoon': 'Honeymoons & Romance',
          'Family': 'Family Holidays',
          'Luxury': 'Luxury Vietnam'
        };
        const mappedName = MAPPED_CATEGORIES[pendingFilter];
        if (mappedName) {
          const inTheme = BY_THEME_CATEGORIES.some(c => c.name === mappedName);
          if (inTheme) {
            setActiveTab('theme');
            setActiveCategoryName(mappedName);
          } else {
            const inRegion = BY_REGION_CATEGORIES.some(c => c.name === mappedName);
            if (inRegion) {
              setActiveTab('region');
              setActiveCategoryName(mappedName);
            }
          }
        }
      }
    }
  }, []);

  const categories = activeTab === 'theme' ? BY_THEME_CATEGORIES : BY_REGION_CATEGORIES;
  const activeCategory = categories.find(c => c.name === activeCategoryName) || categories[0];
  
  const displayedPackages = useMemo(() => {
    if (jainVegOnly) {
      return activeCategory.packages.filter(p => p.isJainVegFriendly);
    }
    return activeCategory.packages;
  }, [activeCategory, jainVegOnly]);

  const handleCategoryChange = (catName: string) => {
    setActiveCategoryName(catName);
  };

  const handleGetQuote = (pkg: PackageProduct) => {
    // Optionally pre-fill some form state if needed
    onQuoteClick();
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col pt-16 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat" 
        style={{ backgroundImage: 'url(/packages_bg.png)' }} 
      />
      <Section id="catalogue" spacing="md" className="flex-1 relative z-10 bg-transparent">
        <Container className="w-full max-w-[1400px]">
          {/* Main Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-3 block drop-shadow-md">
                FULL CATALOGUE
              </span>
              <Heading as="h2" size="4xl" font="serif" className="mb-4 tracking-tight text-white drop-shadow-lg">
                Explore 82 Curated Packages
              </Heading>
              <div className="w-16 h-px bg-[#D4AF37] mb-6 shadow-sm"></div>
              <Text className="text-white/95 font-light max-w-2xl text-base md:text-lg drop-shadow-md">
                Locally handpicked itineraries matching the preferences of premium Indian travelers.
              </Text>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-start sm:items-center self-start">
              {/* Interest vs Region Selector */}
              <div className="flex bg-[#FAF7F0] border border-[#E8E4D9] p-1.5 rounded-lg gap-2 w-full md:w-auto shadow-sm">
                <button
                  className={`flex-1 md:flex-none px-5 py-2.5 rounded text-xs font-semibold tracking-widest uppercase transition duration-300 ${
                    activeTab === 'theme' 
                      ? 'bg-[#1E4D45] text-white shadow-sm' 
                      : 'text-[#1E4D45]/60 hover:text-[#1E4D45]'
                  }`}
                  onClick={() => {
                    setActiveTab('theme');
                    setActiveCategoryName(BY_THEME_CATEGORIES[0].name);
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
                  }}
                >
                  By Region
                </button>
              </div>

              {/* Jain Veg Option filter */}
              <label className="flex items-center gap-3 cursor-pointer self-start sm:self-auto py-2 bg-white px-4 rounded-lg shadow-sm border border-[#E8E4D9]">
                <input 
                  type="checkbox" 
                  checked={jainVegOnly}
                  onChange={() => setJainVegOnly(!jainVegOnly)}
                  className="w-4.5 h-4.5 accent-[#1E4D45] cursor-pointer"
                />
                <span className="text-xs font-mono uppercase tracking-wider text-[#1E4D45] font-bold mt-0.5">
                  🟢 Jain & Veg Only
                </span>
              </label>
            </div>
          </div>

          {/* Category Tabs list horizontal */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E8E4D9] scrollbar-none">
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

          {/* Grid of Packages */}
          {displayedPackages.length === 0 ? (
            activeCategoryName === 'Budget Itineraries' ? (
              <div className="w-full max-w-xl mx-auto min-h-[300px] flex flex-col items-center justify-center text-center p-10 bg-white border border-[#E8E4D9] rounded-xl gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#1E4D45]/10 text-[#1E4D45] flex items-center justify-center mb-2">
                  <Icon name="Wallet" size={24} />
                </div>
                <Heading as="h4" size="xl" font="serif" className="text-[#1E4D45] tracking-wide">Budget Itineraries - More Coming Soon</Heading>
                <Text className="text-[#555555] text-sm font-light leading-relaxed max-w-md">
                  Our local team is currently curating the best budget-friendly experiences in Vietnam. Please check back later or request a custom quote.
                </Text>
                <div className="mt-4">
                  <Button 
                    onClick={onQuoteClick}
                    className="bg-[#1E4D45] hover:bg-[#12302B] text-white px-6 py-3 rounded-lg text-xs font-bold tracking-wider uppercase shadow-sm border-none"
                  >
                    Request Custom Quote
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-xl mx-auto min-h-[300px] flex flex-col items-center justify-center text-center p-10 bg-white border border-[#E8E4D9] rounded-xl gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#1E4D45]/10 text-[#1E4D45] flex items-center justify-center mb-2">
                  <Icon name="Leaf" size={24} />
                </div>
                <Heading as="h4" size="xl" font="serif" className="text-[#1E4D45] tracking-wide">Custom Jain & Veg Tours Available</Heading>
                <Text className="text-[#555555] text-sm font-light leading-relaxed max-w-md">
                  We craft bespoke itineraries with certified Jain kitchens, Indian chefs, and 100% vegetarian catering for this region. Let's build your perfect tour!
                </Text>
                <div className="mt-4">
                  <Button 
                    onClick={onQuoteClick}
                    className="bg-[#1E4D45] hover:bg-[#12302B] text-white px-6 py-3 rounded-lg text-xs font-bold tracking-wider uppercase shadow-sm border-none"
                  >
                    Request Custom Quote
                  </Button>
                </div>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedPackages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E8E4D9] flex flex-col group">
                  <div className="h-48 relative overflow-hidden shrink-0 border-b border-[#E8E4D9]">
                    <img 
                      src={pkg.img} 
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                    />
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10 w-full pr-6">
                      {(['hcmc-phu-quoc-explorer-5d4n', 'hcmc-dalat-explorer-5d4n', 'saigon-beach-combo'].includes(pkg.id) || ['vietnam-highlights-express', 'northern-jewels', 'vietnam-grand-heritage'].includes(pkg.id)) ? (
                        <div className="flex flex-col gap-1 z-20">
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
                      ) : (
                        <span className="bg-[#1E4D45] text-white font-semibold text-[9px] tracking-widest uppercase px-2.5 py-1 rounded shadow-sm">
                          {pkg.badge}
                        </span>
                      )}
                      
                      {(['hcmc-phu-quoc-explorer-5d4n', 'hcmc-dalat-explorer-5d4n', 'saigon-beach-combo'].includes(pkg.id) || ['vietnam-highlights-express', 'northern-jewels', 'vietnam-grand-heritage'].includes(pkg.id)) && (
                        <span className="bg-[#1E4D45] text-white font-semibold text-[9px] tracking-widest uppercase px-2.5 py-1 rounded shadow-sm">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col bg-white">
                    <h4 className="text-lg font-bold font-serif text-[#1E4D45] tracking-tight leading-tight mb-3">
                      {pkg.title}
                    </h4>
                    
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Icon name="Clock" size={14} className="text-[#1E4D45]" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Icon name="MapPin" size={14} className="text-[#1E4D45]" />
                        <span className="truncate">{pkg.destinations.join(', ')}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-[#E6D9BF]/20 text-[#1E4D45] text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider">Flights: Excluded</span>
                      {pkg.isJainVegFriendly && (
                        <span className="bg-green-50 text-green-700 text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider border border-green-200">
                          Veg Friendly
                        </span>
                      )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-[#E8E4D9]">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase tracking-widest font-bold block text-gray-500 mb-0.5">Starting from</span>
                          <span className="text-sm font-bold text-[#1E4D45]">
                            {pkg.price || 'NOT AVAILABLE'}
                          </span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Per Person</span>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2">
                        <button
                          onClick={() => setSelectedPackage(pkg)}
                          className="flex-1 bg-transparent border border-[#E8E4D9] hover:bg-[#FAF7F0] text-[#1E4D45] py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleGetQuote(pkg)}
                          className="flex-1 bg-[#12302B] hover:bg-[#1E4D45] text-white py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors"
                        >
                          Get Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>

        {/* Package Detail Modal */}
        <AnimatePresence>
          {selectedPackage && (
            <Modal
              isOpen={!!selectedPackage}
              onClose={() => { setSelectedPackage(null); setExpandedDay(1); }}
              maxWidth="max-w-4xl"
              className="h-[85vh] md:h-[80vh] flex flex-col p-0 overflow-hidden bg-white border border-[#E8E4D9] rounded-xl shadow-2xl"
            >
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-[#E8E4D9]">
                  <div>
                    <Heading as="h4" size="xs" className="text-[#B8860B] uppercase tracking-widest font-mono font-semibold mb-3">
                      RECOMMENDED HOTELS
                    </Heading>
                    <div className="flex flex-col gap-2">
                      {selectedPackage.hotels.map((h, idx) => (
                        <Text key={idx} className="text-[#555555] text-sm font-light">
                          🏨 {h}
                        </Text>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Heading as="h4" size="xs" className="text-[#B8860B] uppercase tracking-widest font-mono font-semibold mb-3">
                      KEY INCLUSIONS
                    </Heading>
                    <div className="flex flex-col gap-2">
                      {selectedPackage.inclusions.map((inc, idx) => (
                        <Text key={idx} className="text-[#555555] text-sm font-light flex items-start gap-2">
                          <span className="text-green-600 mt-0.5 font-bold">✓</span> <span>{inc}</span>
                        </Text>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <Heading as="h4" size="xs" className="text-[#B8860B] uppercase tracking-widest font-mono font-semibold mb-6">
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
                      {selectedPackage.price || 'NOT AVAILABLE'} <span className="text-xs font-normal text-gray-500">/ person</span>
                    </span>
                  </div>
                  <span className="bg-[#E6D9BF]/20 text-[#1E4D45] text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider hidden sm:block">Flights: Excluded</span>
                </div>
                <button
                  onClick={() => handleGetQuote(selectedPackage)}
                  className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#1E4D45] hover:bg-[#12302B] flex items-center justify-center gap-2 rounded-xl transition-colors shadow-sm cursor-pointer border-none"
                >
                  Get My Quote on WhatsApp ➔
                </button>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </Section>
    </div>
  );
};

export default PackageCatalogue;
