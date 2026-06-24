import React, { useState } from 'react';
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
  const [selectedPackage, setSelectedPackage] = useState<PackageProduct | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const categories = activeTab === 'theme' ? BY_THEME_CATEGORIES : BY_REGION_CATEGORIES;
  const activeCategory = categories.find(c => c.name === activeCategoryName) || categories[0];

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

        {/* Side-by-Side Explorer Grid */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* LEFT: Category lists */}
          <div className="w-full lg:w-[28%] flex flex-wrap lg:flex-col gap-2 shrink-0">
            {categories.map((cat) => {
              const isActive = cat.name === activeCategoryName;
              return (
                <button
                  key={cat.name}
                  className={`w-full text-left px-6 py-4.5 rounded-2xl border text-sm tracking-wider font-medium transition-all duration-300 flex items-center justify-between group ${
                    isActive 
                      ? 'bg-brand-gold/10 border-brand-gold/40 text-brand-gold-light shadow-gold' 
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20 hover:text-white'
                  }`}
                  onClick={() => setActiveCategoryName(cat.name)}
                >
                  <span>{cat.name}</span>
                  <span className={`transition-transform duration-300 ${isActive ? 'translate-x-1 text-brand-gold-light' : 'text-white/20 group-hover:text-white/40'}`}>→</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Category details and packages */}
          <div className="flex-1 w-full">
            <div className="mb-10">
              <Heading as="h4" variant="none" className="text-2xl font-serif text-white tracking-wide mb-2">
                {activeCategory.name}
              </Heading>
              <Text variant="none" className="text-white/55 text-sm font-light italic mb-6 block">
                "{activeCategory.tagline}"
              </Text>

              {/* Sub-sections pills */}
              <div className="flex flex-wrap gap-2">
                {activeCategory.subsections.map((sub, idx) => (
                  <span key={idx} className="bg-white/5 border border-white/10 text-white/50 px-4 py-1.5 rounded-full text-[0.65rem] uppercase tracking-widest font-semibold">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeCategory.packages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden group hover:border-brand-gold/40 hover:shadow-gold transition-all duration-500 flex flex-col justify-between h-[450px]"
                >
                  <div className="h-44 w-full overflow-hidden relative shrink-0">
                    <img 
                      src={pkg.img} 
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <Badge variant="gold-filled" className="absolute top-6 left-6 shadow-lg bg-brand-gold/90 text-brand-green-extra-dark font-bold text-[0.65rem] tracking-widest uppercase">
                      {pkg.badge}
                    </Badge>
                  </div>

                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <Heading as="h5" variant="none" className="text-lg font-serif text-white mb-2 leading-tight">
                        {pkg.title}
                      </Heading>
                      <Text variant="none" className="text-white/50 text-[0.7rem] uppercase tracking-widest font-semibold block mb-4">
                        📍 {pkg.destinations.join(' → ')}
                      </Text>
                      <Text variant="none" className="text-white/70 text-xs font-light leading-relaxed line-clamp-3">
                        {pkg.desc}
                      </Text>
                    </div>

                    <div className="flex gap-3 mt-6 pt-4 border-t border-white/5">
                      <Button
                        variant="glass"
                        className="flex-1 py-3 text-[0.65rem] tracking-widest uppercase font-bold text-white bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl"
                        onClick={() => setSelectedPackage(pkg)}
                      >
                        View Details
                      </Button>
                      <Button
                        className="flex-1 py-3 text-[0.65rem] tracking-widest uppercase font-bold text-brand-green-extra-dark bg-brand-gold hover:bg-brand-gold-light rounded-xl shadow-gold"
                        onClick={() => handleOpenPlanner(pkg)}
                      >
                        Customize It
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
