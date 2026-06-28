import React, { useState, useEffect, useRef, useCallback } from 'react';
import { geoMercator, geoPath, GeoProjection } from 'd3-geo';
import { json } from 'd3-fetch';
import { feature } from 'topojson-client';
import { MAP_DESTINATIONS, MAP_SIGHTS, MapSight } from '../../data/destinations';
import { Text, Heading } from '../ui/Typography';
import { motion, AnimatePresence } from 'motion/react';

const BACKGROUND_COLOR = '#FAF8F3'; // Warm Ivory
const LAND_FILL = '#F2EFE8';
const LAND_STROKE = '#1E4D45'; // Dark Emerald
const MARKER_COLOR = '#1E4D45';
const MARKER_HOVER_COLOR = '#D4AF37'; // Gold accent

const REGIONS = {
  North: {
    name: "Northern Heritage",
    cities: ['Hanoi', 'Sapa', 'Ha Long Bay', 'Ninh Binh', 'Phong Nha'],
    desc: "Mist-covered rice terraces, towering limestone karsts, and centuries of preserved tribal traditions and royal history.",
    color: "rgba(30, 77, 69, 0.12)",
    border: "#1E4D45",
  },
  Central: {
    name: "Central Coastline",
    cities: ['Hue', 'Da Nang', 'Hoi An'],
    desc: "Imperial citadels, poetic rivers, romantic lantern-lit ancient ports, and pristine sandy beaches.",
    color: "rgba(212, 175, 55, 0.1)",
    border: "#D4AF37",
  },
  South: {
    name: "Southern Pulse",
    cities: ['Mui Ne', 'Ho Chi Minh City', 'Mekong Delta', 'Phu Quoc', 'Da Lat', 'Nha Trang', 'Vung Tau'],
    desc: "The energetic southern metropolis, fertile riverways of the Mekong delta, cool pine highlands, and tropical island beaches.",
    color: "rgba(16, 185, 129, 0.08)",
    border: "#10B981",
  }
};

interface VietnamVectorMapProps {
  selectedCities?: string[];
  onAddCity?: (city: string) => void;
  selectedSights?: string[];
  onAddSight?: (city: string, sight: string) => void;
}

const VietnamVectorMap: React.FC<VietnamVectorMapProps> = ({ selectedCities = [], onAddCity, selectedSights = [], onAddSight }) => {
  const [activeRegion, setActiveRegion] = useState<keyof typeof REGIONS | null>(null);
  const [hoveredDest, setHoveredDest] = useState<number | null>(null);
  const [hoveredSight, setHoveredSight] = useState<MapSight | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [geoData, setGeoData] = useState<any>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Adjusted center coordinate to offset for the sidebar panel
  const projection = geoMercator()
    .scale(2700)
    .center([107.5, 16.2]);

  const pathGenerator = geoPath().projection(projection as GeoProjection);

  useEffect(() => {
    json('/vietnam.topo.json')
      .then((topology) => {
        const geojson = feature(topology as any, topology.objects.default);
        setGeoData(geojson);
      })
      .catch((err) => console.error('Failed to load map data', err));
  }, []);

  const [mapLoaded, setMapLoaded] = useState(false);
  useEffect(() => {
    if (geoData) setMapLoaded(true);
  }, [geoData]);

  const containerRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const CARD_W = 256;
  const CARD_H = 200;
  const cardStyle = containerRef.current
    ? {
        left: Math.min(mousePos.x + 16, containerRef.current.clientWidth - CARD_W - 8),
        top: Math.min(mousePos.y + 16, containerRef.current.clientHeight - CARD_H - 8),
      }
    : { left: mousePos.x + 16, top: mousePos.y + 16 };

  const getCityRegion = (cityName: string): keyof typeof REGIONS | null => {
    if (REGIONS.North.cities.includes(cityName)) return 'North';
    if (REGIONS.Central.cities.includes(cityName)) return 'Central';
    if (REGIONS.South.cities.includes(cityName)) return 'South';
    return null;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col md:flex-row items-stretch select-none"
      style={{ backgroundColor: BACKGROUND_COLOR }}
      onMouseMove={handleMouseMove}
    >
      {/* Side Control Panel */}
      <div className="w-full md:w-80 bg-white/80 dark:bg-[#1A2120]/90 backdrop-blur-md border-r border-[#111111]/5 dark:border-white/5 p-6 flex flex-col gap-6 relative z-20 shrink-0">
        <div>
          <span className="text-[9px] font-bold tracking-[0.22em] text-[#1E4D45] dark:text-brand-gold uppercase block mb-1">Illustrative Cartography</span>
          <Heading as="h3" size="lg" font="serif" className="text-[#1E4D45] dark:text-white tracking-wide">Regions of Vietnam</Heading>
        </div>

        <div className="flex flex-col gap-4">
          {(Object.keys(REGIONS) as Array<keyof typeof REGIONS>).map((key) => {
            const reg = REGIONS[key];
            const isHovered = activeRegion === key;
            return (
              <button
                key={key}
                className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isHovered 
                    ? 'bg-[#1E4D45]/5 dark:bg-white/5 border-[#1E4D45] dark:border-brand-gold shadow-sm' 
                    : 'bg-white/50 dark:bg-white/5 border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15'
                }`}
                onMouseEnter={() => setActiveRegion(key)}
                onMouseLeave={() => setActiveRegion(null)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold font-mono tracking-widest text-[#B8860B] dark:text-brand-gold uppercase">{key}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#1E4D45] dark:text-[#E9DFC8] font-semibold">{reg.cities.length} Hotspots</span>
                </div>
                <h4 className="text-sm font-semibold font-serif text-[#1E4D45] dark:text-white">{reg.name}</h4>
                <p className="text-[11px] text-[#555555] dark:text-white/60 font-light leading-relaxed mt-2 line-clamp-3">{reg.desc}</p>
              </button>
            );
          })}
        </div>
        
        <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/5">
          <p className="text-[10px] text-gray-400 dark:text-white/40 font-mono">Pulsing icons indicate major custom itinerary hotspots for Indian travelers. Hover over region tabs to highlight territory.</p>
        </div>
      </div>

      {/* Vector Canvas Area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <svg
          ref={svgRef}
          className="w-full h-full max-w-4xl mx-auto outline-none transition-opacity duration-500"
          viewBox="0 0 800 800"
          preserveAspectRatio="xMidYMid meet"
        >
          {geoData && (
            <g>
              {(geoData as any).features.map((feature: any, i: number) => {
                const provName = feature.properties?.name || '';
                
                let fill = LAND_FILL;
                if (activeRegion) {
                  const reg = REGIONS[activeRegion];
                  const matchesActive = reg.cities.some(c => provName.toLowerCase().includes(c.toLowerCase()));
                  if (matchesActive) {
                    fill = reg.color;
                  }
                }
                
                return (
                  <path
                    key={i}
                    d={pathGenerator(feature) ?? undefined}
                    fill={fill}
                    stroke={LAND_STROKE}
                    strokeWidth={0.5}
                    className="transition-all duration-500"
                    style={{ opacity: mapLoaded ? 1 : 0 }}
                  />
                );
              })}
            </g>
          )}
          
          {/* Destination markers */}
          {MAP_DESTINATIONS.map((dest, idx) => {
            const [x, y] = projection([dest.lng, dest.lat]) as [number, number];
            const isSelected = selectedCities.includes(dest.name);
            const currentMarkerColor = isSelected ? '#D4AF37' : MARKER_COLOR;
            const destReg = getCityRegion(dest.name);
            const isRegionHighlighted = activeRegion === null || activeRegion === destReg;
            
            return (
              <g
                key={dest.name}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredDest(idx)}
                onMouseLeave={() => setHoveredDest(null)}
                onClick={() => {
                  if (onAddCity) {
                    onAddCity(dest.name);
                  }
                }}
                style={{ opacity: isRegionHighlighted ? 1 : 0.2, transition: 'opacity 0.4s ease' }}
              >
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 12 : 8}
                  fill={currentMarkerColor}
                  opacity={0.2}
                  animate={{ scale: isSelected ? [1, 1.3, 1] : [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 4 : 3}
                  fill={hoveredDest === idx ? MARKER_HOVER_COLOR : currentMarkerColor}
                  className="transition-colors duration-300"
                />
              </g>
            );
          })}

          {/* Sight markers (Gold Diamonds) */}
          {MAP_SIGHTS.map((sight, idx) => {
            const [x, y] = projection([sight.lng, sight.lat]) as [number, number];
            const isSelected = selectedSights.includes(sight.name);
            const currentMarkerColor = '#D4AF37';
            const sightReg = getCityRegion(sight.cityName);
            const isRegionHighlighted = activeRegion === null || activeRegion === sightReg;
            
            return (
              <g
                key={sight.name}
                className="cursor-pointer font-sans"
                onMouseEnter={() => setHoveredSight(sight)}
                onMouseLeave={() => setHoveredSight(null)}
                onClick={() => {
                  if (onAddSight) {
                    onAddSight(sight.cityName, sight.name);
                  }
                }}
                style={{ opacity: isRegionHighlighted ? 1 : 0.15, transition: 'opacity 0.4s ease' }}
              >
                <motion.polygon
                  points={`${x},${y-8} ${x+8},${y} ${x},${y+8} ${x-8},${y}`}
                  fill={currentMarkerColor}
                  opacity={0.15}
                  animate={{ scale: isSelected ? [1, 1.4, 1] : [1, 1.6, 1], opacity: [0.15, 0.4, 0.15] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.1 }}
                />
                <polygon
                  points={`${x},${y-4} ${x+4},${y} ${x},${y+4} ${x-4},${y}`}
                  fill={isSelected ? '#D4AF37' : '#FAF8F3'}
                  stroke="#1E4D45"
                  strokeWidth={1}
                  className="transition-colors duration-300"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Cards (Apple Style) */}
        <AnimatePresence>
          {hoveredDest !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute pointer-events-none z-50 w-64 bg-white dark:bg-[#1A2120] rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#111111]/5 dark:border-white/5"
              style={cardStyle}
            >
              <div className="h-32 w-full relative">
                <img
                  src={MAP_DESTINATIONS[hoveredDest].img}
                  alt={MAP_DESTINATIONS[hoveredDest].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Text size="xs" weight="bold" className="tracking-widest uppercase text-brand-gold mb-1">
                    {MAP_DESTINATIONS[hoveredDest].time}
                  </Text>
                  <Heading as="h4" size="xl" font="serif" className="leading-none drop-shadow-md">
                    {MAP_DESTINATIONS[hoveredDest].name}
                  </Heading>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <Text size="sm" className="text-[#2B2B2B]/70 dark:text-white/70 leading-snug">
                  {MAP_DESTINATIONS[hoveredDest].desc}
                </Text>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#111111]/5 dark:border-white/5">
                  <span className={`text-[0.6rem] font-bold tracking-widest uppercase ${selectedCities.includes(MAP_DESTINATIONS[hoveredDest].name) ? 'text-[#D4AF37]' : 'text-gray-400 dark:text-white/40'}`}>
                    {selectedCities.includes(MAP_DESTINATIONS[hoveredDest].name) ? '✓ IN ITINERARY' : 'CLICK TO ADD'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sight Hover Cards */}
        <AnimatePresence>
          {hoveredSight !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute pointer-events-none z-50 w-64 bg-white dark:bg-[#1A2120] rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#111111]/5 dark:border-white/5"
              style={cardStyle}
            >
              <div className="h-32 w-full relative">
                <img
                  src={hoveredSight.img}
                  alt={hoveredSight.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Text size="xs" weight="bold" className="tracking-widest uppercase text-brand-gold mb-1">
                    📍 {hoveredSight.cityName} Attraction
                  </Text>
                  <Heading as="h4" size="lg" font="serif" className="leading-none drop-shadow-md">
                    {hoveredSight.name}
                  </Heading>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <Text size="sm" className="text-[#2B2B2B]/70 dark:text-white/70 leading-snug">
                  {hoveredSight.desc}
                </Text>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#111111]/5 dark:border-white/5">
                  <span className={`text-[0.6rem] font-bold tracking-widest uppercase ${selectedSights.includes(hoveredSight.name) ? 'text-[#D4AF37]' : 'text-gray-400 dark:text-white/40'}`}>
                    {selectedSights.includes(hoveredSight.name) ? '✓ IN ITINERARY' : 'CLICK TO ADD'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VietnamVectorMap;
