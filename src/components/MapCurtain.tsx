import React, { Suspense, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Heading, Text } from './ui/Typography';
import Button from './ui/Button';
import Card from './ui/Card';
import Icon from './ui/Icon';
import { useVietnamExplorer, RegionKey, FilterKey } from '../hooks/useVietnamExplorer';
import { getDestinationContentCounts, getMarkerTier } from '../utils/destinationContent';
import { MAP_DESTINATIONS } from '../data/destinations';

import ExplorerDrawer from './map/ExplorerDrawer';
import MobileExplorerSheet from './map/MobileExplorerSheet';

const VietnamMap = React.lazy(() => import('./map/VietnamVectorMap'));

interface MapCurtainProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPlanner: (destination?: string, prompt?: string) => void;
  selectedCities?: string[];
  onAddCity?: (city: string) => void;
  selectedSights?: string[];
  onAddSight?: (city: string, sight: string) => void;
}

const MapCurtain: React.FC<MapCurtainProps> = ({
  isOpen,
  onClose,
  onOpenPlanner,
  selectedCities = [],
  onAddCity,
  selectedSights = [],
  onAddSight
}) => {
  // Use state custom hook for all search, filter, and map coordinate tracking
  const {
    searchQuery,
    setSearchQuery,
    activeRegion,
    setActiveRegion,
    activeFilter,
    setActiveFilter,
    selectedDestination,
    setSelectedDestination,
    filteredDestinations,
    zoomLevel,
    setZoomLevel,
    mapCenter,
    setMapCenter,
    handleSurpriseMe,
    resetView,
    searchResults
  } = useVietnamExplorer();

  // Desktop vs Mobile tracking
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Keyboard Escape handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedDestination) {
          setSelectedDestination(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, selectedDestination, onClose, setSelectedDestination]);

  // Compute region counts dynamically from dataset
  const regionCounts = React.useMemo(() => {
    return {
      All: MAP_DESTINATIONS.length,
      North: MAP_DESTINATIONS.filter(d => ['Hanoi', 'Sapa', 'Ha Long Bay', 'Ninh Binh', 'Phong Nha', 'Cao Bang', 'Mai Chau', 'Moc Chau', 'Cat Ba'].includes(d.name)).length,
      Central: MAP_DESTINATIONS.filter(d => ['Hue', 'Da Nang', 'Hoi An', 'Quang Binh', 'Quy Nhon', 'Phu Yen'].includes(d.name)).length,
      South: MAP_DESTINATIONS.filter(d => ['Mui Ne', 'Ho Chi Minh City', 'Mekong Delta', 'Phu Quoc', 'Da Lat', 'Nha Trang', 'Vung Tau', 'Ben Tre', 'Chau Doc', 'Con Dao'].includes(d.name)).length,
      Islands: MAP_DESTINATIONS.filter(d => ['Phu Quoc', 'Ha Long Bay', 'Nha Trang', 'Mui Ne', 'Cat Ba', 'Con Dao', 'Vung Tau', 'Quy Nhon', 'Phu Yen'].includes(d.name)).length,
      Hidden: MAP_DESTINATIONS.filter(d => getMarkerTier(d.name) === 'discovery' || ['Cao Bang', 'Phong Nha', 'Chau Doc', 'Con Dao', 'Phu Yen'].includes(d.name)).length
    };
  }, []);

  const filterChips: FilterKey[] = ['ALL', 'POPULAR', 'BEACHES', 'CULTURE', 'FOOD', 'NATURE', 'ADVENTURE', 'HIDDEN GEMS'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[3000] bg-[#FAF8F3] dark:bg-[#111615] flex flex-col overflow-hidden"
        >
          {/* Header Section */}
          <header className="h-[80px] bg-white/90 dark:bg-[#1A2120]/90 backdrop-blur-md border-b border-black/5 dark:border-white/10 px-6 md:px-12 flex items-center justify-between shrink-0 z-50 relative">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold font-mono tracking-widest text-[#B8860B] uppercase">Cartography</span>
              <Heading as="h2" size="lg" font="serif" className="text-[#12302B] dark:text-white leading-none mt-1">Explore Vietnam</Heading>
            </div>

            {/* Global Search Bar with popup results */}
            <div className="hidden md:flex items-center gap-4 relative w-[320px]">
              <div className="w-full flex items-center gap-2 px-3 py-2 bg-[#FAF8F3] dark:bg-[#111615] border border-black/5 dark:border-white/15 rounded-full">
                <Icon name="Search" size={14} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none text-xs focus:outline-none w-full text-gray-800 dark:text-white"
                />
              </div>

              {/* Dynamic search results popup */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-12 left-0 right-0 bg-white dark:bg-[#1A2120] border border-black/5 dark:border-white/15 rounded-2xl shadow-xl overflow-hidden p-2 z-50 flex flex-col gap-1"
                  >
                    {searchResults.map((result) => (
                      <button
                        key={result.name}
                        onClick={() => {
                          setSelectedDestination(result.name);
                          setMapCenter([result.lng, result.lat]);
                          setZoomLevel(2.5);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl cursor-pointer text-left w-full"
                      >
                        <img
                          src={result.img}
                          alt={result.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-serif font-bold text-gray-800 dark:text-white">{result.name}</span>
                          <span className="text-[9px] text-gray-400">{result.desc.substring(0, 45)}...</span>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions & Close */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSurpriseMe}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 border border-[#B8860B] text-[#B8860B] rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#B8860B] hover:text-[#FAF8F3] transition-all cursor-pointer"
              >
                Surprise Me <Icon name="Sparkles" size={12} />
              </button>

              <button
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#12302B] hover:bg-[#1E4D45] text-white text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer"
              >
                Close Map <Icon name="X" size={14} />
              </button>
            </div>
          </header>

          {/* Main Dashboard Layout Area */}
          <div className="flex-1 flex items-stretch relative min-h-0">
            {/* Left discovery sidebar - desktop only */}
            {!isMobile && (
              <aside className="w-80 bg-white/85 dark:bg-[#1A2120]/80 backdrop-blur-md border-r border-black/5 dark:border-white/10 p-6 flex flex-col gap-6 shrink-0 z-40 relative">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold tracking-[0.22em] text-[#B8860B] uppercase">Navigation</span>
                  <Heading as="h3" size="lg" font="serif" className="text-[#12302B] dark:text-white mt-1">Where to go?</Heading>
                </div>

                {/* Region selection list tabs */}
                <div className="flex flex-col gap-2">
                  {(['All', 'North', 'Central', 'South', 'Islands', 'Hidden'] as RegionKey[]).map((region) => (
                    <button
                      key={region}
                      onClick={() => {
                        setActiveRegion(region);
                        setSelectedDestination(null);
                        // Reset center focus based on selected region
                        if (region === 'North') setMapCenter([105.8, 20.8]);
                        else if (region === 'Central') setMapCenter([108.0, 16.0]);
                        else if (region === 'South') setMapCenter([106.6, 10.8]);
                        else setMapCenter([107.5, 16.2]);
                        setZoomLevel(1.5);
                      }}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                        activeRegion === region
                          ? 'border-[#12302B] bg-[#12302B]/5 dark:bg-white/5 dark:border-[#B8860B] shadow-xs'
                          : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="text-xs font-serif font-bold text-gray-800 dark:text-white">
                        {region === 'All' ? 'All Vietnam' : region + ' Vietnam'}
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-gray-600 dark:text-white/70 font-bold">
                        {regionCounts[region]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Footer Info details */}
                <div className="mt-auto border-t border-black/5 dark:border-white/5 pt-4">
                  <button
                    onClick={resetView}
                    className="text-[10px] font-bold font-mono tracking-widest text-[#B8860B] uppercase hover:underline cursor-pointer"
                  >
                    Reset Explorer view
                  </button>
                </div>
              </aside>
            )}

            {/* Interactive Vector Map Canvas container */}
            <main className="flex-1 relative flex flex-col min-h-0 bg-[#FAF8F3]">
              {/* Horizontal filter chips at top of the map area */}
              <div className="absolute top-4 left-6 right-6 z-30 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {filterChips.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setSelectedDestination(null);
                    }}
                    className={`px-4 py-1.5 rounded-full border text-[10px] font-bold tracking-widest uppercase transition-all shrink-0 cursor-pointer ${
                      activeFilter === filter
                        ? 'bg-[#12302B] border-[#B8860B] text-[#FAF8F3] shadow-md'
                        : 'bg-[#FAF8F3]/90 hover:bg-[#E4D5B7]/50 dark:bg-[#1A2120]/80 backdrop-blur-md border-black/5 dark:border-white/15 text-[#12302B] dark:text-white/80'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* The Lazy loaded SVG D3 Map */}
              <div className="flex-1 w-full h-full relative">
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center bg-[#FAF8F3]">
                      <Text font="serif" className="text-[#1E4D45] text-xl animate-pulse tracking-wider">
                        Drawing travel atlas...
                      </Text>
                    </div>
                  }
                >
                  <VietnamMap
                    selectedCities={selectedCities}
                    onAddCity={onAddCity}
                    selectedSights={selectedSights}
                    onAddSight={onAddSight}
                    searchQuery={searchQuery}
                    activeRegion={activeRegion}
                    activeFilter={activeFilter}
                    selectedDestination={selectedDestination}
                    setSelectedDestination={setSelectedDestination}
                    zoomLevel={zoomLevel}
                    setZoomLevel={setZoomLevel}
                    mapCenter={mapCenter}
                    setMapCenter={setMapCenter}
                    filteredDestinations={filteredDestinations}
                  />
                </Suspense>
              </div>

              {/* Bottom discovery status bar */}
              <div className="absolute bottom-6 left-6 z-30 hidden md:flex items-center gap-4 bg-white/95 dark:bg-[#1A2120]/95 backdrop-blur-md border border-black/5 dark:border-white/10 px-6 py-3.5 rounded-2xl shadow-md max-w-lg">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold tracking-widest text-[#B8860B] uppercase">Trending Loop</span>
                  <div className="flex items-center gap-3 mt-1 overflow-x-auto scrollbar-none">
                    {['Ha Giang', 'Sapa', 'Da Nang', 'Ninh Binh'].map(trend => (
                      <button
                        key={trend}
                        onClick={() => {
                          const dest = MAP_DESTINATIONS.find(d => d.name === trend);
                          if (dest) {
                            setSelectedDestination(trend);
                            setMapCenter([dest.lng, dest.lat]);
                            setZoomLevel(2.5);
                          }
                        }}
                        className="text-xs font-semibold text-gray-700 dark:text-white/80 hover:text-[#1D4ED8] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        {trend}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-px h-8 bg-black/5 dark:bg-white/10 shrink-0" />
                <button
                  onClick={() => {
                    window.dispatchEvent(new Event('open_builder'));
                    onClose();
                  }}
                  className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] hover:text-[#12302B] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Trip Builder ➔
                </button>
              </div>
            </main>

            {/* Right side Detail Drawer (Desktop) */}
            <AnimatePresence>
              {!isMobile && selectedDestination && (
                <ExplorerDrawer
                  destinationName={selectedDestination}
                  onClose={() => setSelectedDestination(null)}
                  onAddCity={onAddCity || (() => {})}
                  onOpenPlanner={(dest) => onOpenPlanner(dest)}
                  selectedCities={selectedCities}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Swipeable Bottom Sheet (Mobile Viewport overlay) */}
          <AnimatePresence>
            {isMobile && selectedDestination && (
              <MobileExplorerSheet
                destinationName={selectedDestination}
                onClose={() => setSelectedDestination(null)}
                onAddCity={onAddCity || (() => {})}
                onOpenPlanner={(dest) => onOpenPlanner(dest)}
                selectedCities={selectedCities}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MapCurtain;
