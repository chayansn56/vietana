import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { geoMercator, geoPath, GeoProjection } from 'd3-geo';
import topologyData from '../../../public/vietnam.topo.json';
import { feature } from 'topojson-client';
import { MAP_DESTINATIONS, MAP_SIGHTS, MapSight } from '../../data/destinations';
import { Destination } from '../../types';
import { Text, Heading } from '../ui/Typography';
import { motion, AnimatePresence } from 'motion/react';
import { normalizeCityName, getMarkerTier, getDestinationStartingPrice, getDestinationImage } from '../../utils/destinationContent';
import MapControls from './MapControls';
import DestinationPreviewCard from './DestinationPreviewCard';

// Centralized premium colorful cartographic palette
const COLOR_OCEAN = '#E0F2FE'; // Vibrant soft sky/ocean blue
const COLOR_LAND = '#D4EFDF'; // Lush, colorful light emerald green landmass
const COLOR_LAND_HOVER = '#A9DFBF'; // Deeper tropical green on hover
const COLOR_COASTLINE = '#1E4D45'; // Deep Forest green coastline boundary
const COLOR_PROVINCE_BORDER = 'rgba(30, 77, 69, 0.1)'; // Faint internal province borders
const COLOR_GOLD = '#F5B041'; // Vibrant Gold Accent
const COLOR_MUTED_GOLD = '#EB984E'; // Muted orange/amber
const COLOR_TEXT = '#12302B';

const REGIONS = {
  North: {
    name: "Northern Heritage",
    cities: ['Hanoi', 'Sapa', 'Ha Long Bay', 'Ninh Binh', 'Phong Nha', 'Cao Bang', 'Mai Chau', 'Moc Chau', 'Cat Ba'],
    color: "rgba(18, 48, 43, 0.08)",
  },
  Central: {
    name: "Central Coastline",
    cities: ['Hue', 'Da Nang', 'Hoi An', 'Quang Binh', 'Quy Nhon', 'Phu Yen'],
    color: "rgba(184, 134, 11, 0.07)",
  },
  South: {
    name: "Southern Pulse",
    cities: ['Mui Ne', 'Ho Chi Minh City', 'Mekong Delta', 'Phu Quoc', 'Da Lat', 'Nha Trang', 'Vung Tau', 'Ben Tre', 'Chau Doc', 'Con Dao'],
    color: "rgba(18, 48, 43, 0.05)",
  }
};

interface VietnamVectorMapProps {
  selectedCities?: string[];
  onAddCity?: (city: string) => void;
  selectedSights?: string[];
  onAddSight?: (city: string, sight: string) => void;
  searchQuery: string;
  activeRegion: string;
  activeFilter: string;
  selectedDestination: string | null;
  setSelectedDestination: (dest: string | null) => void;
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
  mapCenter: [number, number];
  setMapCenter: (center: [number, number]) => void;
  filteredDestinations: Destination[];
}

const VietnamVectorMap: React.FC<VietnamVectorMapProps> = ({
  selectedCities = [],
  onAddCity,
  selectedSights = [],
  onAddSight,
  searchQuery,
  activeRegion,
  activeFilter,
  selectedDestination,
  setSelectedDestination,
  zoomLevel,
  setZoomLevel,
  mapCenter,
  setMapCenter,
  filteredDestinations
}) => {
  const [hoveredDest, setHoveredDest] = useState<Destination | null>(null);
  const [hoveredSight, setHoveredSight] = useState<MapSight | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [geoData, setGeoData] = useState<any>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mobile check to completely bypass mouse move logic and disable repaints
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Large editorial map projection scale and offsets
  const projection = useMemo(() => {
    return geoMercator()
      .scale(3500)
      .center([108.3, 16.2]);
  }, []);

  const pathGenerator = useMemo(() => {
    return geoPath().projection(projection as GeoProjection);
  }, [projection]);

  useEffect(() => {
    try {
      const geojson = feature(topologyData as any, (topologyData as any).objects.default);
      setGeoData(geojson);
    } catch (err) {
      console.error('Failed to parse map data', err);
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, [isMobile]);

  const getCityRegion = (cityName: string): string | null => {
    if (REGIONS.North.cities.includes(cityName)) return 'North';
    if (REGIONS.Central.cities.includes(cityName)) return 'Central';
    if (REGIONS.South.cities.includes(cityName)) return 'South';
    return null;
  };

  const getLabelOffset = (name: string): { dx: number; dy: number; textAnchor: 'start' | 'end' | 'middle' } => {
    const norm = normalizeCityName(name);
    if (norm === 'da nang') return { dx: 12, dy: -4, textAnchor: 'start' };
    if (norm === 'hoi an') return { dx: 12, dy: 10, textAnchor: 'start' };
    if (norm === 'hue') return { dx: -12, dy: -4, textAnchor: 'end' };
    return { dx: 10, dy: 4, textAnchor: 'start' };
  };

  const handleZoomIn = () => setZoomLevel(Math.min(zoomLevel + 0.5, 4));
  const handleZoomOut = () => setZoomLevel(Math.max(zoomLevel - 0.5, 1));
  const handleReset = () => {
    setSelectedDestination(null);
    setMapCenter([108.3, 16.2]);
    setZoomLevel(1);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-stretch select-none overflow-hidden"
      style={{ backgroundColor: COLOR_OCEAN }}
      onMouseMove={handleMouseMove}
    >
      {/* Background paper texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 mix-blend-multiply opacity-[0.03]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Vector Canvas Area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden w-full h-full">
        <motion.div
          className="w-full h-full flex items-center justify-center"
          style={{ willChange: 'transform' }} // GPU Hardware acceleration
          animate={{
            scale: zoomLevel,
            x: (108.3 - mapCenter[0]) * 120 * zoomLevel,
            y: (mapCenter[1] - 16.2) * 120 * zoomLevel
          }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <svg
            ref={svgRef}
            className="w-full h-full max-h-[85vh] outline-none"
            viewBox="0 0 800 800"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid Line Coordinates (Latitude / Longitude markers) */}
            <g className="opacity-40">
              <line x1="50" y1="220" x2="750" y2="220" stroke={COLOR_COASTLINE} strokeOpacity={0.06} strokeDasharray="4,6" />
              <text x="60" y="214" fill={COLOR_COASTLINE} fillOpacity={0.25} className="font-mono text-[8px]">20° N</text>

              <line x1="50" y1="460" x2="750" y2="460" stroke={COLOR_COASTLINE} strokeOpacity={0.06} strokeDasharray="4,6" />
              <text x="60" y="454" fill={COLOR_COASTLINE} fillOpacity={0.25} className="font-mono text-[8px]">16° N</text>

              <line x1="50" y1="700" x2="750" y2="700" stroke={COLOR_COASTLINE} strokeOpacity={0.06} strokeDasharray="4,6" />
              <text x="60" y="694" fill={COLOR_COASTLINE} fillOpacity={0.25} className="font-mono text-[8px]">12° N</text>
            </g>

            {/* Sea Names / Gulf Naming Bodies */}
            <g className="select-none pointer-events-none font-serif tracking-[0.25em] text-[9px] uppercase font-bold text-[#12302B]/20 italic">
              <text x="560" y="160" textAnchor="middle">Gulf of Tonkin</text>
              <text x="620" y="480" textAnchor="middle">East Sea</text>
              <text x="320" y="740" textAnchor="middle">Gulf of Thailand</text>
            </g>

            {/* Base land borders & coastlines */}
            {geoData && (
              <g>
                {(geoData as any).features.map((feature: any, i: number) => {
                  const provName = feature.properties?.name || '';
                  let fill = COLOR_LAND;

                  // Highlight hovered or selected region
                  if (activeRegion && activeRegion !== 'All') {
                    const reg = REGIONS[activeRegion as keyof typeof REGIONS];
                    if (reg && reg.cities.some(c => provName.toLowerCase().includes(c.toLowerCase()))) {
                      fill = COLOR_LAND_HOVER;
                    }
                  }

                  return (
                    <path
                      key={i}
                      d={pathGenerator(feature) ?? undefined}
                      fill={fill}
                      stroke={COLOR_PROVINCE_BORDER}
                      strokeWidth={0.4}
                      vectorEffect="non-scaling-stroke" // Extremely fast scaling repaint
                      className="transition-all duration-500"
                    />
                  );
                })}

                {/* Coastline visual separator */}
                {(geoData as any).features.map((feature: any, i: number) => {
                  return (
                    <path
                      key={`coast-${i}`}
                      d={pathGenerator(feature) ?? undefined}
                      fill="none"
                      stroke={COLOR_COASTLINE}
                      strokeWidth={0.65}
                      strokeOpacity={0.65}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </g>
            )}

            {/* Decorative Compass Rose Ornament */}
            <g transform="translate(140, 240) scale(0.7)" className="opacity-30 select-none pointer-events-none">
              <circle cx="0" cy="0" r="32" fill="none" stroke={COLOR_COASTLINE} strokeWidth="0.5" strokeDasharray="2,3" />
              <circle cx="0" cy="0" r="26" fill="none" stroke={COLOR_COASTLINE} strokeWidth="0.8" />
              {/* North Arrow */}
              <polygon points="0,-36 4,-6 0,0" fill={COLOR_COASTLINE} />
              <polygon points="0,-36 -4,-6 0,0" fill={COLOR_GOLD} />
              {/* South Arrow */}
              <polygon points="0,36 4,6 0,0" fill={COLOR_COASTLINE} />
              <polygon points="0,36 -4,6 0,0" fill={COLOR_GOLD} />
              {/* East Arrow */}
              <polygon points="36,0 6,4 0,0" fill={COLOR_COASTLINE} />
              <polygon points="36,0 6,-4 0,0" fill={COLOR_GOLD} />
              {/* West Arrow */}
              <polygon points="-36,0 -6,4 0,0" fill={COLOR_COASTLINE} />
              <polygon points="-36,0 -6,-4 0,0" fill={COLOR_GOLD} />
              
              <text x="0" y="-42" textAnchor="middle" className="font-serif font-bold text-[11px] fill-[#12302B]">N</text>
            </g>

            {/* Render dynamically filtered destination markers */}
            {filteredDestinations.map((dest) => {
              const projCoord = projection([dest.lng, dest.lat]);
              if (!projCoord) return null;
              const [x, y] = projCoord;

              const isSelected = selectedDestination === dest.name;
              const isHovered = hoveredDest?.name === dest.name;
              const tier = getMarkerTier(dest.name);
              const labelConfig = getLabelOffset(dest.name);

              // Compact marker styles matching the cartographic hierarchy
              const markerStyle = {
                primary: { innerR: 3.5, outerR: 7.5, pulse: true, labelAlways: true, color: '#E74C3C' },
                secondary: { innerR: 2.5, outerR: 5.5, pulse: false, labelAlways: false, color: '#1E4D45' },
                discovery: { innerR: 1.8, outerR: 4, pulse: false, labelAlways: false, color: '#EB984E' }
              }[tier];

              const isRegionHighlighted = activeRegion === 'All' || activeRegion === getCityRegion(dest.name);
              
              return (
                <g
                  key={dest.name}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredDest(dest)}
                  onMouseLeave={() => setHoveredDest(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDestination(dest.name);
                    setMapCenter([dest.lng, dest.lat]);
                    setZoomLevel(2.5);
                    if (onAddCity) onAddCity(dest.name);
                  }}
                  style={{ opacity: isRegionHighlighted ? 1 : 0.28, transition: 'opacity 0.4s ease' }}
                >
                  {/* Selected / Trending outer halo ring - disabled pulse on mobile to prevent paint lags */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={x}
                      cy={y}
                      r={markerStyle.outerR + 2.5}
                      fill="none"
                      stroke={COLOR_GOLD}
                      strokeWidth={1}
                      className={isMobile ? "" : "animate-pulse"}
                    />
                  )}

                  {/* Base marker outer boundary */}
                  <circle
                    cx={x}
                    cy={y}
                    r={markerStyle.outerR}
                    fill={COLOR_OCEAN}
                    stroke={isSelected ? COLOR_GOLD : markerStyle.color}
                    strokeWidth={1.2}
                  />

                  {/* Solid inner core */}
                  <circle
                    cx={x}
                    cy={y}
                    r={markerStyle.innerR}
                    fill={isSelected ? COLOR_GOLD : markerStyle.color}
                  />

                  {/* Elegant text label with Ivory halo backdrop card */}
                  {(markerStyle.labelAlways || isHovered || isSelected || zoomLevel > 1.8) && (
                    <g transform={`translate(${x + labelConfig.dx}, ${y + labelConfig.dy})`}>
                      {/* Text halo backing card */}
                      <text
                        x="0"
                        y="0"
                        textAnchor={labelConfig.textAnchor}
                        stroke={COLOR_OCEAN}
                        strokeWidth={3}
                        strokeLinejoin="round"
                        className="font-serif text-[9px] font-bold fill-none select-none pointer-events-none"
                      >
                        {dest.name}
                      </text>
                      <text
                        x="0"
                        y="0"
                        textAnchor={labelConfig.textAnchor}
                        fill={COLOR_TEXT}
                        className="font-serif text-[9px] font-bold select-none pointer-events-none"
                      >
                        {dest.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Sights coordinates markers */}
            {MAP_SIGHTS.map((sight) => {
              const projCoord = projection([sight.lng, sight.lat]);
              if (!projCoord) return null;
              const [x, y] = projCoord;

              // Hide sights if zoomed out to avoid clutter
              if (zoomLevel < 1.8) return null;

              const isSelected = selectedSights.includes(sight.name);
              const isHovered = hoveredSight?.name === sight.name;

              return (
                <g
                  key={sight.name}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredSight(sight)}
                  onMouseLeave={() => setHoveredSight(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onAddSight) onAddSight(sight.cityName, sight.name);
                  }}
                >
                  {/* Outer circle halo for sights */}
                  <circle
                    cx={x}
                    cy={y}
                    r={5.5}
                    fill={COLOR_OCEAN}
                    stroke={COLOR_GOLD}
                    strokeWidth={0.8}
                  />
                  <polygon
                    points={`${x},${y-2.5} ${x+2.5},${y} ${x},${y+2.5} ${x-2.5},${y}`}
                    fill={isSelected || isHovered ? COLOR_GOLD : COLOR_COASTLINE}
                  />
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Small Cartographic Legend (Desktop Only) */}
        {!searchQuery && (
          <div className="absolute bottom-6 left-6 z-30 hidden md:flex flex-col gap-2.5 bg-white/90 dark:bg-[#1A2120]/90 backdrop-blur-md p-4 rounded-2xl border border-black/5 dark:border-white/10 shadow-md w-48">
            <span className="text-[8px] font-bold font-mono tracking-widest text-[#B8860B] uppercase">Atlas Legend</span>
            <div className="flex flex-col gap-2 text-[10px] text-gray-700 dark:text-white/80 font-serif">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#12302B] border border-gold" />
                <span>Primary Hubs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#12302B]" />
                <span>Secondary Cities</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
                <span>Hidden Gems</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rotate-45 border border-[#B8860B] bg-[#12302B]" />
                <span>Attraction Sights</span>
              </div>
            </div>
          </div>
        )}

        {/* Floating Zoom & Reset Map Controls */}
        <MapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
        />

        {/* Floating Preview Tooltip Card overlay on hover */}
        <AnimatePresence>
          {hoveredDest && (
            <DestinationPreviewCard
              destination={hoveredDest}
              position={mousePos}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VietnamVectorMap;
