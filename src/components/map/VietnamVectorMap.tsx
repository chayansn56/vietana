import React, { useState, useEffect, useRef, useCallback } from 'react';
import { geoMercator, geoPath, GeoProjection } from 'd3-geo';
import { json } from 'd3-fetch';
import { feature } from 'topojson-client';
import { MAP_DESTINATIONS } from '../../data/destinations';
import { Text, Heading } from '../ui/Typography';
import { motion, AnimatePresence } from 'motion/react';

// Warm Ivory background / Dark Emerald palette constants
const BACKGROUND_COLOR = '#FAF8F3'; // Warm Ivory
const LAND_FILL = '#F2EFE8';
const LAND_STROKE = '#1E4D45'; // Dark Emerald
const MARKER_COLOR = '#1E4D45';
const MARKER_HOVER_COLOR = '#D4AF37'; // Gold accent

interface VietnamVectorMapProps {
  selectedCities?: string[];
  onAddCity?: (city: string) => void;
}

const VietnamVectorMap: React.FC<VietnamVectorMapProps> = ({ selectedCities = [], onAddCity }) => {
  const [hoveredDest, setHoveredDest] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [geoData, setGeoData] = useState<any>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // D3 projection (same as previous map)
  const projection = geoMercator()
    .scale(2800)
    .center([106, 16.5]); // Center of Vietnam

  const pathGenerator = geoPath().projection(projection as GeoProjection);

  // Load TopoJSON once
  useEffect(() => {
    json('/vietnam.topo.json')
      .then((topology) => {
        // Convert to GeoJSON FeatureCollection
        const geojson = feature(topology as any, topology.objects.default);
        setGeoData(geojson);
      })
      .catch((err) => console.error('Failed to load map data', err));
  }, []);

  // Ensure map fades in when data ready
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

  // Clamp card so it doesn't overflow the container
  const CARD_W = 256;
  const CARD_H = 200;
  const cardStyle = containerRef.current
    ? {
        left: Math.min(mousePos.x + 16, containerRef.current.clientWidth - CARD_W - 8),
        top: Math.min(mousePos.y + 16, containerRef.current.clientHeight - CARD_H - 8),
      }
    : { left: mousePos.x + 16, top: mousePos.y + 16 };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ backgroundColor: BACKGROUND_COLOR }}
      onMouseMove={handleMouseMove}
    >
      <svg
        ref={svgRef}
        className="w-full h-full max-w-4xl mx-auto outline-none"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Render country shapes */}
        {geoData && (
          <g>
            {(geoData as any).features.map((feature: any, i: number) => (
              <path
                key={i}
                d={pathGenerator(feature) ?? undefined}
                fill={LAND_FILL}
                stroke={LAND_STROKE}
                strokeWidth={0.5}
                className="transition-all duration-700"
                style={{ opacity: mapLoaded ? 1 : 0 }}
              />
            ))}
          </g>
        )}
        {/* Destination markers */}
        {MAP_DESTINATIONS.map((dest, idx) => {
          const [x, y] = projection([dest.lng, dest.lat]) as [number, number];
          const isSelected = selectedCities.includes(dest.name);
          const currentMarkerColor = isSelected ? '#D4AF37' : MARKER_COLOR;
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
            >
              {/* Glowing ring */}
              <motion.circle
                cx={x}
                cy={y}
                r={isSelected ? 12 : 8}
                fill={currentMarkerColor}
                opacity={0.2}
                animate={{ scale: isSelected ? [1, 1.3, 1] : [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Center dot */}
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
      </svg>

      {/* Hover Cards (Apple Style) */}
      <AnimatePresence>
        {hoveredDest !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute pointer-events-none z-50 w-64 bg-white/95 backdrop-blur-xl rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#1D1D1F]/5"
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
            <div className="p-4 bg-white flex flex-col gap-2">
              <Text size="sm" className="text-[#2B2B2B]/70 leading-snug">
                {MAP_DESTINATIONS[hoveredDest].desc}
              </Text>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1D1D1F]/5">
                <span className={`text-[0.6rem] font-bold tracking-widest uppercase ${selectedCities.includes(MAP_DESTINATIONS[hoveredDest].name) ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                  {selectedCities.includes(MAP_DESTINATIONS[hoveredDest].name) ? '✓ IN ITINERARY' : 'CLICK TO ADD'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VietnamVectorMap;
