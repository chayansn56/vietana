import React, { useState } from 'react';
import { Destination } from '../../types';
import { 
  getDestinationContentCounts, 
  getDestinationStartingPrice, 
  getDestinationImage,
  getMarkerTier 
} from '../../utils/destinationContent';
import Icon from '../ui/Icon';
import { Heading, Text } from '../ui/Typography';

interface MobileExplorerSheetProps {
  destinationName: string;
  onClose: () => void;
  onAddCity: (city: string) => void;
  onOpenPlanner: (destination?: string) => void;
  selectedCities: string[];
}

const MobileExplorerSheet: React.FC<MobileExplorerSheetProps> = ({
  destinationName,
  onClose,
  onAddCity,
  onOpenPlanner,
  selectedCities
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const counts = getDestinationContentCounts(destinationName);
  const priceInfo = getDestinationStartingPrice(destinationName);
  const imageUrl = getDestinationImage(destinationName);
  const tier = getMarkerTier(destinationName);

  const destObj = React.useMemo(() => {
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

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', `/${path}`);
    window.dispatchEvent(new Event('popstate'));
    onClose();
  };

  const handleOpenTripBuilder = () => {
    if (!isAlreadyAdded) {
      onAddCity(destinationName);
    }
    window.dispatchEvent(new Event('open_builder'));
    onClose();
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-[3100] bg-white dark:bg-[#1A2120] border-t border-black/10 dark:border-white/10 rounded-t-[32px] shadow-2xl transition-all duration-500 ease-[0.25,1,0.5,1] flex flex-col ${
        isExpanded ? 'h-[80vh]' : 'h-[148px]'
      }`}
    >
      {/* Drag handle line & Collapsed View trigger */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex flex-col items-center py-3 cursor-pointer shrink-0"
      >
        <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-white/20 mb-3" />
        
        {/* Collapsed view layout */}
        {!isExpanded && (
          <div className="w-full px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={imageUrl}
                alt={destinationName}
                className="w-14 h-14 rounded-2xl object-cover"
              />
              <div className="flex flex-col">
                <span className="text-[9px] font-bold tracking-wider text-[#B8860B] uppercase">{destObj.region} Vietnam</span>
                <Heading as="h3" size="lg" font="serif" className="text-[#12302B] dark:text-white leading-tight">
                  {destinationName}
                </Heading>
                <span className="text-[10px] text-gray-500 dark:text-white/60 font-light mt-0.5 line-clamp-1">{destObj.bestFor}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center cursor-pointer text-gray-500 hover:text-red-500"
              >
                <Icon name="X" size={14} />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#12302B] border border-[#B8860B]/40 text-white flex items-center justify-center">
                <Icon name="ChevronUp" size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Expanded View Content */}
      {isExpanded && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Scrollable body content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-bold font-mono tracking-widest text-[#B8860B] uppercase">
                  {destObj.region} Vietnam • {tier.toUpperCase()} HUB
                </span>
                <Heading as="h3" size="xl" font="serif" className="leading-tight text-[#12302B] dark:text-white">
                  {destinationName}
                </Heading>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center cursor-pointer text-gray-500"
              >
                <Icon name="ChevronDown" size={16} />
              </button>
            </div>

            {/* Banner image inside scroll */}
            <img
              src={imageUrl}
              alt={destinationName}
              className="w-full h-44 rounded-2xl object-cover shadow-sm"
            />

            {/* Quick Price Information */}
            <div className="p-4 rounded-2xl bg-[#FAF8F3] dark:bg-white/5 border border-[#E6D9BF]/40 dark:border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Starting Price</span>
                <span className="text-xs font-serif font-bold text-[#12302B] dark:text-brand-gold mt-0.5">
                  {priceInfo ? priceInfo.display : 'Explore Options'}
                </span>
              </div>
              <button
                onClick={() => onOpenPlanner(destinationName)}
                className="px-3.5 py-1.5 bg-[#12302B] hover:bg-[#1E4D45] text-white text-[9px] font-bold uppercase tracking-widest rounded-lg cursor-pointer"
              >
                VINA AI Ask ➔
              </button>
            </div>

            {/* Dynamic Sights and Content Counts */}
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Available Content</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigateTo('things-to-do')}
                  disabled={counts.thingsToDo === 0}
                  className="p-3 rounded-lg border border-black/5 dark:border-white/5 bg-white dark:bg-[#1E2625] text-left flex flex-col disabled:opacity-50"
                >
                  <span className="text-base font-bold text-gray-700 dark:text-white">{counts.thingsToDo}</span>
                  <span className="text-[9px] text-gray-400">Things to Do</span>
                </button>
                <button
                  onClick={() => navigateTo('experiences')}
                  disabled={counts.experiences === 0}
                  className="p-3 rounded-lg border border-black/5 dark:border-white/5 bg-white dark:bg-[#1E2625] text-left flex flex-col disabled:opacity-50"
                >
                  <span className="text-base font-bold text-gray-700 dark:text-white">{counts.experiences}</span>
                  <span className="text-[9px] text-gray-400">Experiences</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="p-6 border-t border-black/5 dark:border-white/10 bg-[#FAF8F3]/60 dark:bg-[#1A2120]/60 shrink-0 flex flex-col gap-2.5">
            <button
              onClick={handleOpenTripBuilder}
              className="w-full py-3 bg-[#12302B] hover:bg-[#1E4D45] text-white rounded-xl text-xs font-bold tracking-widest uppercase transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <Icon name="MapPin" size={12} /> Build Custom Trip
            </button>
            <button
              onClick={() => onAddCity(destinationName)}
              className={`w-full py-2.5 border text-[10px] font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer ${
                isAlreadyAdded
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                  : 'border-[#12302B] text-[#12302B] dark:text-white'
              }`}
            >
              {isAlreadyAdded ? '✓ Added to Custom Trip' : '+ Add to Itinerary'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileExplorerSheet;
