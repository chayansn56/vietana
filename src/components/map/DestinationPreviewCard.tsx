import React from 'react';
import { Destination } from '../../types';
import { getDestinationStartingPrice, getDestinationImage } from '../../utils/destinationContent';
import { Text } from '../ui/Typography';
import Icon from '../ui/Icon';

interface DestinationPreviewCardProps {
  destination: Destination;
  position: { x: number; y: number };
}

const DestinationPreviewCard: React.FC<DestinationPreviewCardProps> = ({ destination, position }) => {
  const priceInfo = getDestinationStartingPrice(destination.name);
  const imageUrl = getDestinationImage(destination.name);

  // Derive simple tag labels from description
  const tags = React.useMemo(() => {
    const desc = destination.desc.toLowerCase();
    const list = [];
    if (desc.includes('beach') || desc.includes('coast') || desc.includes('sea')) list.push('Beaches');
    if (desc.includes('culture') || desc.includes('historic') || desc.includes('ancient') || desc.includes('imperial')) list.push('Culture');
    if (desc.includes('mountain') || desc.includes('terrace') || desc.includes('hill') || desc.includes('valley')) list.push('Nature');
    if (desc.includes('cave') || desc.includes('adventure') || desc.includes('jungle')) list.push('Adventure');
    if (desc.includes('food') || desc.includes('cuisine') || desc.includes('delta')) list.push('Local Flavors');
    if (list.length === 0) list.push('Sightseeing');
    return list.slice(0, 3);
  }, [destination]);

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x + 16,
        top: position.y + 16,
        transform: 'translate3d(0, 0, 0)',
        pointerEvents: 'none'
      }}
      className="z-50 w-64 bg-white/95 dark:bg-[#1A2120]/95 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/10 shadow-lg overflow-hidden animate-fade-in"
    >
      <div className="h-32 w-full relative">
        <img
          src={imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute bottom-3 left-4 text-[9px] font-bold font-mono tracking-widest text-[#E9DFC8] uppercase">
          {tags.join(' • ')}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-1.5">
        <h4 className="font-serif font-bold text-base text-[#12302B] dark:text-white leading-tight">
          {destination.name}
        </h4>
        
        <p className="text-[11px] text-gray-500 dark:text-white/60 font-light leading-relaxed line-clamp-2">
          {destination.desc}
        </p>

        <div className="pt-2 mt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-bold font-mono tracking-wider text-[#B8860B]">
            {priceInfo ? priceInfo.display : 'Explore options'}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#12302B] dark:text-white flex items-center gap-1">
            Explore <Icon name="ArrowRight" size={10} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default DestinationPreviewCard;
