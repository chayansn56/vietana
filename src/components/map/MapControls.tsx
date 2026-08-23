import React from 'react';
import Icon from '../ui/Icon';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({ onZoomIn, onZoomOut, onReset }) => {
  return (
    <div className="absolute bottom-6 right-6 z-30 flex flex-col gap-2 bg-white/90 dark:bg-[#1A2120]/90 backdrop-blur-md p-1.5 rounded-xl border border-black/5 dark:border-white/10 shadow-md">
      <button
        onClick={onZoomIn}
        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-[#12302B] dark:text-white transition-colors cursor-pointer"
        title="Zoom In"
        aria-label="Zoom In"
      >
        <Icon name="Plus" size={20} />
      </button>
      <button
        onClick={onZoomOut}
        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-[#12302B] dark:text-white transition-colors cursor-pointer border-t border-b border-black/5 dark:border-white/5"
        title="Zoom Out"
        aria-label="Zoom Out"
      >
        <Icon name="Minus" size={20} />
      </button>
      <button
        onClick={onReset}
        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-[#12302B] dark:text-white transition-colors cursor-pointer"
        title="Reset Map View"
        aria-label="Reset Map View"
      >
        <Icon name="RotateCcw" size={18} />
      </button>
    </div>
  );
};

export default MapControls;
