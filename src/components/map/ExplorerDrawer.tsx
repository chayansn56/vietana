import React from 'react';
import { Destination } from '../../types';
import { 
  getDestinationContentCounts, 
  getDestinationStartingPrice, 
  getDestinationImage,
  getMarkerTier 
} from '../../utils/destinationContent';
import Icon from '../ui/Icon';
import { Heading, Text } from '../ui/Typography';

interface ExplorerDrawerProps {
  destinationName: string;
  onClose: () => void;
  onAddCity: (city: string) => void;
  onOpenPlanner: (destination?: string) => void;
  selectedCities: string[];
}

const ExplorerDrawer: React.FC<ExplorerDrawerProps> = ({
  destinationName,
  onClose,
  onAddCity,
  onOpenPlanner,
  selectedCities
}) => {
  const counts = getDestinationContentCounts(destinationName);
  const priceInfo = getDestinationStartingPrice(destinationName);
  const imageUrl = getDestinationImage(destinationName);
  const tier = getMarkerTier(destinationName);
  
  // Find matching destination object to get description and other metadata
  const destObj = React.useMemo(() => {
    // Look up sights or packages to construct travel details dynamically
    return {
      name: destinationName,
      region: destinationName === 'Hanoi' || destinationName === 'Sapa' || destinationName === 'Ha Long Bay' || destinationName === 'Ninh Binh' || destinationName === 'Phong Nha' ? 'Northern' :
              destinationName === 'Hue' || destinationName === 'Da Nang' || destinationName === 'Hoi An' ? 'Central' : 'Southern',
      bestTime: destinationName === 'Hanoi' || destinationName === 'Ha Long Bay' ? 'October to April' :
                destinationName === 'Sapa' ? 'September to November' :
                destinationName === 'Da Nang' || destinationName === 'Hoi An' ? 'February to May' : 'December to April',
      suggestedStay: destinationName === 'Hanoi' || destinationName === 'Ho Chi Minh City' ? '3 Days / 2 Nights' :
                     destinationName === 'Ha Long Bay' ? '2 Days / 1 Night' : '2 Days',
      bestFor: destinationName === 'Sapa' || destinationName === 'Ha Giang' ? 'Trekking, Nature, Culture' :
               destinationName === 'Ha Long Bay' || destinationName === 'Phu Quoc' ? 'Cruises, Beaches, Luxury' :
               destinationName === 'Hoi An' || destinationName === 'Hue' ? 'History, Ancient Streets, Food' :
               'Local Sights, Food, Street Markets'
    };
  }, [destinationName]);

  const isAlreadyAdded = selectedCities.includes(destinationName);

  // General routing wrapper helper
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', `/${path}`);
    window.dispatchEvent(new Event('popstate'));
    onClose();
  };

  const handleOpenTripBuilder = () => {
    // Add destination to cities list first
    if (!isAlreadyAdded) {
      onAddCity(destinationName);
    }
    // Launch trip builder
    window.dispatchEvent(new Event('open_builder'));
    onClose();
  };

  return (
    <div className="w-[380px] md:w-[420px] bg-white dark:bg-[#1A2120] border-l border-black/5 dark:border-white/10 flex flex-col h-full z-40 relative shadow-2xl overflow-hidden animate-slide-left">
      {/* Top Banner Cover Image */}
      <div className="h-56 w-full relative shrink-0">
        <img
          src={imageUrl}
          alt={destinationName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Floating Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Close details"
        >
          <Icon name="X" size={16} />
        </button>

        <div className="absolute bottom-4 left-6 pr-6 text-white">
          <span className="text-[10px] font-bold font-mono tracking-widest text-[#D4AF37] uppercase">
            {destObj.region} Vietnam • {tier.toUpperCase()} HUB
          </span>
          <Heading as="h3" size="2xl" font="serif" className="leading-tight mt-1 drop-shadow-sm text-white">
            {destinationName}
          </Heading>
        </div>
      </div>

      {/* Main details body scrollable pane */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 scrollbar-thin">
        {/* Dynamic Pricing Alert Callout */}
        <div className="p-4 rounded-2xl bg-[#FAF8F3] dark:bg-white/5 border border-[#E6D9BF]/40 dark:border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Starting Price</span>
            <span className="text-sm font-serif font-bold text-[#12302B] dark:text-brand-gold mt-0.5">
              {priceInfo ? priceInfo.display : 'Explore Options'}
            </span>
          </div>
          <button
            onClick={() => onOpenPlanner(destinationName)}
            className="px-4 py-2 bg-[#12302B] hover:bg-[#1E4D45] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
          >
            VINA AI Ask ➔
          </button>
        </div>

        {/* Travel Info Bullet Points */}
        <div className="flex flex-col gap-3.5">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#12302B] dark:text-[#D4AF37]">Quick Travel Facts</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-gray-400">Best Time to Visit</span>
              <span className="text-xs font-semibold text-gray-700 dark:text-white/80">{destObj.bestTime}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-gray-400">Suggested Stay</span>
              <span className="text-xs font-semibold text-gray-700 dark:text-white/80">{destObj.suggestedStay}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-gray-400">Ideal For</span>
            <span className="text-xs font-semibold text-gray-700 dark:text-white/80">{destObj.bestFor}</span>
          </div>
        </div>

        {/* Content availability counts adapters */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#12302B] dark:text-[#D4AF37]">Available Content</h4>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Things to do */}
            <button
              onClick={() => navigateTo('things-to-do')}
              disabled={counts.thingsToDo === 0}
              className="p-3 rounded-xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#1E2625] hover:border-[#B8860B]/30 transition-all text-left flex flex-col cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span className="text-lg font-bold text-gray-700 dark:text-white group-hover:text-[#B8860B]">{counts.thingsToDo}</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Things to Do</span>
            </button>

            {/* Experiences */}
            <button
              onClick={() => navigateTo('experiences')}
              disabled={counts.experiences === 0}
              className="p-3 rounded-xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#1E2625] hover:border-[#B8860B]/30 transition-all text-left flex flex-col cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span className="text-lg font-bold text-gray-700 dark:text-white group-hover:text-[#B8860B]">{counts.experiences}</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Experiences</span>
            </button>

            {/* Packages */}
            <button
              onClick={() => navigateTo('packages')}
              disabled={counts.packages === 0}
              className="p-3 rounded-xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#1E2625] hover:border-[#B8860B]/30 transition-all text-left flex flex-col cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span className="text-lg font-bold text-gray-700 dark:text-white group-hover:text-[#B8860B]">{counts.packages}</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Tour Packages</span>
            </button>

            {/* Stories */}
            <button
              onClick={() => navigateTo('journal')}
              disabled={counts.journal === 0}
              className="p-3 rounded-xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#1E2625] hover:border-[#B8860B]/30 transition-all text-left flex flex-col cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span className="text-lg font-bold text-gray-700 dark:text-white group-hover:text-[#B8860B]">{counts.journal}</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Journal Articles</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Conversion CTAs Panel */}
      <div className="p-6 border-t border-black/5 dark:border-white/10 bg-[#FAF8F3]/60 dark:bg-[#1A2120]/60 shrink-0 flex flex-col gap-3">
        <button
          onClick={handleOpenTripBuilder}
          className="w-full py-3.5 bg-[#12302B] hover:bg-[#1E4D45] text-white rounded-xl text-xs font-bold tracking-widest uppercase transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
        >
          <Icon name="MapPin" size={14} /> Build My {destinationName} Trip
        </button>

        <button
          onClick={() => onAddCity(destinationName)}
          className={`w-full py-3 border text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer ${
            isAlreadyAdded
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
              : 'border-[#12302B] hover:bg-[#12302B] hover:text-white text-[#12302B] dark:text-white'
          }`}
        >
          {isAlreadyAdded ? '✓ Added to Custom Trip' : '+ Add to Itinerary'}
        </button>
      </div>
    </div>
  );
};

export default ExplorerDrawer;
