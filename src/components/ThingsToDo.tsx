import React, { useState, useEffect, useMemo } from 'react';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { EXPERIENCES_DATA, ExperienceProduct } from '../data/experiencesData';
import ExperienceDetailsPopup from './ExperienceDetailsPopup';

interface ThingsToDoProps {
  onOpenPlanner?: (destination?: string, prompt?: string) => void;
}

const DESTINATIONS = [
  'ALL', 'HO CHI MINH CITY', 'HANOI', 'DA NANG', 'HOI AN', 'PHU QUOC', 'NINH BINH', 'HA LONG', 'SAPA', 'NHA TRANG'
];

const CATEGORIES = [
  'ALL', 'SIGHTSEEING', 'CULTURE', 'FOOD', 'ADVENTURE', 'NATURE', 'CRUISES', 'NIGHTLIFE', 'FAMILY', 'FREE'
];

export default function ThingsToDo({ onOpenPlanner }: ThingsToDoProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDest, setSelectedDest] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [savedExperiences, setSavedExperiences] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceProduct | null>(null);

  // Load saved items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('vietana_saved_experiences');
    if (saved) {
      try {
        setSavedExperiences(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved experiences', e);
      }
    }
  }, []);

  // Sync saved items to localStorage
  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedExperiences.includes(id)
      ? savedExperiences.filter(x => x !== id)
      : [...savedExperiences, id];
    setSavedExperiences(updated);
    localStorage.setItem('vietana_saved_experiences', JSON.stringify(updated));
  };

  // Filter experiences based on search query and chips
  const filteredExperiences = useMemo(() => {
    return EXPERIENCES_DATA.filter(exp => {
      // 1. Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = exp.title.toLowerCase().includes(query);
        const matchesDest = exp.destination.toLowerCase().includes(query);
        const matchesCat = exp.category.toLowerCase().includes(query);
        const matchesDesc = exp.shortDesc.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDest && !matchesCat && !matchesDesc) {
          return false;
        }
      }

      // 2. Destination filter
      if (selectedDest !== 'ALL') {
        const formattedDest = exp.destination.toUpperCase();
        const targetDest = selectedDest.toUpperCase();
        if (formattedDest !== targetDest && !formattedDest.includes(targetDest)) {
          return false;
        }
      }

      // 3. Category filter
      if (selectedCategory !== 'ALL') {
        if (selectedCategory === 'FREE') {
          const isFree = exp.pricing.displayPrice.toUpperCase().includes('FREE') || exp.difficulty === 'Easy' && exp.pricing.displayPrice.includes('FREE');
          if (!isFree) return false;
        } else if (selectedCategory === 'NATURE') {
          if (exp.category !== 'Nature & Beaches') return false;
        } else if (selectedCategory === 'FOOD') {
          if (exp.category !== 'Food & Drink') return false;
        } else {
          if (exp.category.toUpperCase() !== selectedCategory.toUpperCase()) {
            return false;
          }
        }
      }

      return true;
    });
  }, [searchQuery, selectedDest, selectedCategory]);

  const handleBuildTripClick = () => {
    // Collect titles of saved experiences
    const savedTitles = EXPERIENCES_DATA
      .filter(exp => savedExperiences.includes(exp.id))
      .map(exp => exp.title);

    localStorage.setItem('vietana_saved_attractions_titles', JSON.stringify(savedTitles));
    
    // Route to Contact page
    window.history.pushState({}, '', '/contact');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Section id="experiences" spacing="none" className="bg-[#FAF8F3] text-gray-800 relative pb-32 min-h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat fixed" 
        style={{ backgroundImage: 'url(/experiences_bg.png)' }} 
      />
      
      {/* Searchable Header Hero */}
      <div className="bg-transparent text-white py-3.5 relative overflow-hidden shrink-0 border-b border-white/10 z-10">
        <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay for header readability */}
        <Container size="lg" className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[7px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded drop-shadow-md">
              DIRECTORY
            </span>
            <Heading as="h1" size="lg" font="serif" className="leading-none font-bold tracking-tight uppercase flex items-center select-none text-white drop-shadow-lg">
              Things to Do in Vietnam
            </Heading>
          </div>

          {/* Compact Search Bar */}
          <div className="w-full md:w-80 relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1E4D45] transition-colors">
              <Icon name="Search" size={13} />
            </div>
            <input 
              type="text"
              placeholder="Search experiences or cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-gray-800 pl-9 pr-3 py-1.5 rounded-full text-[11px] border-none shadow-sm outline-none transition-all font-sans font-medium"
            />
          </div>
        </Container>
      </div>

      {/* Interactive Filters Area */}
      <div className="sticky top-20 bg-[#FAF8F3]/95 backdrop-blur-md z-40 border-b border-[#E6D9BF]/20 py-4 shadow-xs">
        <Container size="lg" className="flex flex-col gap-4">
          {/* Primary Filters (Destinations) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[9px] font-bold tracking-widest text-[#B8860B] uppercase font-mono mr-2 shrink-0">City:</span>
            {DESTINATIONS.map(dest => (
              <button
                key={dest}
                onClick={() => setSelectedDest(dest)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer border ${
                  selectedDest === dest
                    ? 'bg-[#12302B] text-white border-[#12302B]'
                    : 'bg-white text-gray-600 border-[#E8E4D9] hover:bg-gray-50'
                }`}
              >
                {dest}
              </button>
            ))}
          </div>

          {/* Secondary Filters (Categories) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[9px] font-bold tracking-widest text-[#B8860B] uppercase font-mono mr-2 shrink-0">Type:</span>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-[#B8860B] text-white border-[#B8860B]'
                    : 'bg-white text-gray-500 border-[#E8E4D9] hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Directory Grid */}
      <Container size="lg" className="py-8">
        {/* Ask AI (Beta) Widget */}
        {/* VINA ( AI ) Premium Midnight Blue Card */}
        <div className="bg-[#0B192C] border-2 border-[#1E3E62] rounded-3xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg mb-10 relative overflow-hidden">
          {/* Subtle blue background glow */}
          <div className="absolute right-0 top-0 w-48 h-48 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-11 h-11 rounded-2xl bg-[#1E3E62] flex items-center justify-center text-white shrink-0 shadow-md">
              <Icon name="Bot" size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#3B82F6] text-white text-[8px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-full font-mono shadow-xs">
                  BETA
                </span>
                <h4 className="font-serif font-bold text-sm md:text-base text-white tracking-wide">
                  VINA ( AI )
                </h4>
              </div>
              <p className="text-xs text-[#E2E8F0]/80 font-light mt-1 max-w-xl">
                Ask anything about sightseeing in Vietnam—clothing tips, crowds, best hours, or custom travel plans.
              </p>
            </div>
          </div>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const input = form.elements.namedItem('aiQuery') as HTMLInputElement;
              if (input.value.trim() && onOpenPlanner) {
                onOpenPlanner(undefined, input.value.trim());
                input.value = '';
              }
            }}
            className="w-full md:w-96 relative flex gap-2 relative z-10"
          >
            <input 
              type="text"
              name="aiQuery"
              required
              placeholder="e.g. Is Halong Bay cruise safe for seniors?"
              className="flex-1 bg-white text-[#0B192C] px-4 py-3 rounded-xl text-xs border border-[#1E3E62]/40 outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all placeholder:text-[#0B192C]/45 font-medium shadow-xs"
            />
            <button 
              type="submit"
              className="bg-[#3B82F6] hover:bg-[#2563EB] active:scale-98 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-none flex items-center gap-1.5 shadow-md shrink-0"
            >
              Ask <Icon name="ArrowRight" size={12} />
            </button>
          </form>
        </div>

        {filteredExperiences.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E6D9BF]/20 rounded-3xl p-8 max-w-md mx-auto">
            <Icon name="Search" size={32} className="text-gray-300 mb-4 mx-auto" />
            <h3 className="font-bold text-gray-700 mb-1">No attractions found</h3>
            <p className="text-xs text-gray-400 font-light">Try adjusting your search filters or destination chips.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map(exp => {
              const isSaved = savedExperiences.includes(exp.id);
              const isFreeAttraction = exp.pricing.displayPrice.toUpperCase().includes('FREE') || exp.isFree;
              
              return (
                <div 
                  key={exp.id}
                  onClick={() => setSelectedExperience(exp)}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E8E4D9] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group"
                >
                  {/* Card Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-50 shrink-0">
                    <img 
                      src={exp.images.hero} 
                      alt={exp.title} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    {/* Floating Destination Badge */}
                    <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-gray-800 text-[8px] font-bold tracking-widest uppercase shadow-sm">
                      📍 {exp.destination}
                    </span>

                    {/* Heart Save Button */}
                    <button 
                      onClick={(e) => toggleSave(exp.id, e)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md hover:bg-white text-gray-700 shadow-sm flex items-center justify-center transition border-none cursor-pointer z-10"
                      title={isSaved ? 'Remove from My Trip' : 'Add to My Trip'}
                    >
                      <Icon 
                        name="Heart" 
                        size={14} 
                        className={isSaved ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-red-500"} 
                      />
                    </button>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Meta */}
                      <span className="text-[8px] font-bold text-[#B8860B] uppercase tracking-widest font-mono block mb-1">
                        {exp.destination} · {exp.category}
                      </span>
                      <h3 className="font-serif font-bold text-[#12302B] text-base group-hover:text-[#B8860B] transition-colors leading-snug mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-light line-clamp-2 leading-relaxed mb-4">
                        {exp.shortDesc}
                      </p>
                    </div>

                    <div className="border-t border-[#E8E4D9] pt-4 mt-auto">
                      {/* Price Section */}
                      <div className="flex flex-col mb-3">
                        <span className="text-[10px] font-bold text-[#12302B] tracking-wide uppercase">
                          {isFreeAttraction ? (
                            <span className="text-green-700">FREE TO VISIT</span>
                          ) : (
                            <span>FROM {exp.pricing.displayPrice} per person</span>
                          )}
                        </span>
                        <span className="text-[8px] text-gray-400 font-light mt-0.5">
                          {isFreeAttraction ? 'Free admission entry' : 'Prices may vary by date and availability.'}
                        </span>
                      </div>

                      {/* Info & View Link */}
                      <div className="flex items-center justify-between text-[9px] font-bold tracking-wider text-gray-400 uppercase">
                        <span>{exp.visitorInfo.recommendedDuration} · {exp.ratings.familyScore > 85 ? 'FAMILY FRIENDLY' : 'RATED 5★'}</span>
                        <span className="text-[#12302B] group-hover:text-[#B8860B] transition-colors inline-flex items-center gap-1">
                          VIEW DETAILS <Icon name="ArrowRight" size={10} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>

      {/* Floating Itinerary Lead Bar (Sticky Drawer at bottom) */}
      {savedExperiences.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#12302B] text-white py-4 px-6 border-t border-[#D4AF37]/30 shadow-2xl z-[150] flex flex-col sm:flex-row items-center justify-between gap-4 animate-slide-up">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white relative shrink-0">
              <Icon name="CheckCircle" size={18} className="text-[#D4AF37]" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#B8860B] text-white text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-[#12302B]">
                {savedExperiences.length}
              </span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">
                Saved {savedExperiences.length} experiences to your trip list
              </h4>
              <p className="text-[10px] text-white/70 font-light">
                Want us to turn your saved experiences into a customized Vietnam itinerary?
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setSavedExperiences([]);
                localStorage.removeItem('vietana_saved_experiences');
              }}
              className="flex-1 sm:flex-none py-2 px-4 bg-white/10 hover:bg-white/20 border-none rounded-lg text-[10px] font-bold text-white uppercase tracking-wider transition-colors cursor-pointer"
            >
              Clear List
            </button>
            <button
              onClick={handleBuildTripClick}
              className="flex-1 sm:flex-none py-2.5 px-6 bg-[#D4AF37] hover:bg-[#b89524] text-[#12302B] border-none rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-1"
            >
              Build My Trip <Icon name="ArrowRight" size={10} />
            </button>
          </div>
        </div>
      )}

      {/* Details Article Popup */}
      <ExperienceDetailsPopup
        isOpen={selectedExperience !== null}
        onClose={() => setSelectedExperience(null)}
        experience={selectedExperience}
        onBuildTrip={(exp) => {
          setSelectedExperience(null);
          // Add to saved experiences automatically
          if (!savedExperiences.includes(exp.id)) {
            const updated = [...savedExperiences, exp.id];
            setSavedExperiences(updated);
            localStorage.setItem('vietana_saved_experiences', JSON.stringify(updated));
          }
          handleBuildTripClick();
        }}
      />
    </Section>
  );
}
