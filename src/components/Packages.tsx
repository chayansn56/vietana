import React, { useState, useRef, useMemo } from 'react';
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

import PackageFilters from './packages/PackageFilters';
import PackageCard from './packages/PackageCard';
import PackageDetailsModal from './packages/PackageDetailsModal';

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
    <Section id="experiences" spacing="lg" className="bg-[#FAF7F0] dark:bg-surface-dark text-text-dark dark:text-white relative overflow-hidden">
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
                            className="px-4 py-2 border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 text-text-dark dark:text-white text-[11px] font-bold tracking-widest uppercase rounded transition-all duration-300 cursor-pointer"
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
        <div className="mb-8">
          <span className="text-xs font-bold tracking-[0.2em] text-brand-sage uppercase mb-3 block">
            VIETANA CURATED
          </span>
          <Heading as="h2" size="h3" font="serif" className="mb-3 tracking-tight text-brand-green dark:text-brand-gold-light">
            Explore Packages
          </Heading>
          <div className="w-12 h-px bg-brand-gold mb-5"></div>
          <Text variant="none" className="text-text-subtle dark:text-white/70 font-light max-w-2xl text-sm md:text-base">
            Handpicked itineraries crafted for premium Indian travelers, with local support from Ho Chi Minh City.
          </Text>
        </div>

        <PackageFilters
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            const cats = tab === 'theme' ? BY_THEME_CATEGORIES : BY_REGION_CATEGORIES;
            setActiveCategoryName(cats[0].name);
            if (cats[0].packages.length > 0) {
              setActivePackageId(cats[0].packages[0].id);
            }
          }}
          jainVegOnly={jainVegOnly}
          onToggleJainVeg={setJainVegOnly}
          categories={categories}
          activeCategoryName={activeCategoryName}
          onCategoryChange={handleCategoryChange}
        />

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
            displayedPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onSetCustomizerPkg={setCustomizerPkg}
                onOpenPlanner={handleOpenPlanner}
                onSetSelectedPackage={setSelectedPackage}
              />
            ))
          )}
        </div>

        {/* FULLY CUSTOM BUILDER BANNER */}
        <div
          className="mt-20 flex flex-col md:flex-row items-center gap-8 p-8 md:p-16 rounded-xl bg-white dark:bg-surface-dark border border-[#E8E4D9] dark:border-white/10 shadow-sm relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:-translate-y-1"
          onClick={() => onOpenBuilder([])}
        >
          {/* Light Mode Background */}
          <div className="absolute inset-[-10%] z-0 bg-cover bg-center transition-transform duration-[1500ms] group-hover:scale-101 dark:hidden" style={{ backgroundImage: `linear-gradient(135deg, rgba(250, 247, 240, 0.9), rgba(250, 247, 240, 0.95)), url("https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80")` }} />
          {/* Dark Mode Background */}
          <div className="absolute inset-[-10%] z-0 bg-cover bg-center transition-transform duration-[1500ms] group-hover:scale-101 hidden dark:block" style={{ backgroundImage: `linear-gradient(135deg, rgba(17, 22, 21, 0.85), rgba(17, 22, 21, 0.95)), url("https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80")` }} />

          <div className="flex-1 text-center md:text-left relative z-10">
            <span className="text-xs font-bold tracking-[0.2em] text-brand-sage uppercase">Bespoke Curation</span>
            <Heading as="h3" size="2xl" className="mt-2 mb-4 text-brand-green dark:text-brand-gold-light font-serif font-bold tracking-tight">
              Build Your Own Story
            </Heading>
            <Text variant="none" className="text-text-subtle dark:text-white/70 text-base font-light max-w-xl">
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
        <div className="mt-8 p-6 text-center bg-brand-green/5 dark:bg-brand-green/10 border border-brand-green/15 dark:border-brand-green/20 rounded-xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F0] dark:bg-surface-dark border border-[#E8E4D9] dark:border-white/10 text-[11px] font-mono tracking-widest text-brand-gold-muted dark:text-brand-gold-light uppercase font-bold mb-3 shadow-xs">
            📢 UPCOMING OFFERINGS
          </span>
          <Heading as="h4" variant="none" className="text-xl font-serif text-brand-green dark:text-brand-gold-light mb-2 font-semibold">
            More Budget Tours Coming Soon!
          </Heading>
          <Text variant="none" className="text-text-subtle dark:text-white/70 text-xs font-light max-w-md mx-auto">
            Our team is packaging more pocket-friendly packages featuring certified budget stays, shared group excursions, and seasonal deals. Stay tuned!
          </Text>
        </div>
      </Container>

      <PackageDetailsModal
        selectedPackage={selectedPackage}
        expandedDay={expandedDay}
        onSetExpandedDay={setExpandedDay}
        onClose={() => {
          setSelectedPackage(null);
          setExpandedDay(1);
        }}
        onSetCustomizerPkg={setCustomizerPkg}
        onOpenPlanner={handleOpenPlanner}
      />

      <PDFCustomizerModal
        isOpen={customizerPkg !== null}
        onClose={() => setCustomizerPkg(null)}
        pkg={customizerPkg}
      />
    </Section>
  );
};

export default Packages;
