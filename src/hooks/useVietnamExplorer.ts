import { useState, useEffect, useMemo, useCallback } from 'react';
import { MAP_DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';
import { normalizeCityName, getMarkerTier, getDestinationStartingPrice } from '../utils/destinationContent';

export type RegionKey = 'All' | 'North' | 'Central' | 'South' | 'Islands' | 'Hidden';
export type FilterKey = 'ALL' | 'POPULAR' | 'BEACHES' | 'CULTURE' | 'FOOD' | 'NATURE' | 'ADVENTURE' | 'HIDDEN GEMS';

export interface UseVietnamExplorerReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeRegion: RegionKey;
  setActiveRegion: (region: RegionKey) => void;
  activeFilter: FilterKey;
  setActiveFilter: (filter: FilterKey) => void;
  selectedDestination: string | null;
  setSelectedDestination: (destName: string | null) => void;
  filteredDestinations: Destination[];
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
  mapCenter: [number, number];
  setMapCenter: (center: [number, number]) => void;
  handleSurpriseMe: () => void;
  resetView: () => void;
  searchResults: Destination[];
}

export function useVietnamExplorer(): UseVietnamExplorerReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState<RegionKey>('All');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('ALL');
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  
  // Viewport tracking (zoom and map center coordinates)
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapCenter, setMapCenter] = useState<[number, number]>([107.5, 16.2]);

  // Synchronize state with URL search parameters safely
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const r = params.get('region');
      const d = params.get('destination');
      
      if (r) {
        const matchingRegion = ['All', 'North', 'Central', 'South', 'Islands', 'Hidden'].find(
          key => key.toLowerCase() === r.toLowerCase()
        );
        if (matchingRegion) setActiveRegion(matchingRegion as RegionKey);
      }
      if (d) {
        const matchingDest = MAP_DESTINATIONS.find(
          dest => normalizeCityName(dest.name) === normalizeCityName(d)
        );
        if (matchingDest) {
          setSelectedDestination(matchingDest.name);
          setMapCenter([matchingDest.lng, matchingDest.lat]);
          setZoomLevel(2.5);
        }
      }
    } catch (e) {
      console.error('Failed to parse initial URL state', e);
    }
  }, []);

  // Update URL state when region or destination changes
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (activeRegion !== 'All') {
        params.set('region', activeRegion.toLowerCase());
      } else {
        params.delete('region');
      }

      if (selectedDestination) {
        params.set('destination', normalizeCityName(selectedDestination));
      } else {
        params.delete('destination');
      }

      const queryStr = params.toString();
      const newUrl = `${window.location.pathname}${queryStr ? '?' + queryStr : ''}${window.location.hash}`;
      window.history.replaceState(null, '', newUrl);
    } catch (e) {
      console.error('Failed to update URL state', e);
    }
  }, [activeRegion, selectedDestination]);

  // Compute search results dropdown based on queries (aliases, names, regions)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.trim().toLowerCase();
    
    return MAP_DESTINATIONS.filter(dest => {
      const nameMatch = dest.name.toLowerCase().includes(query) || normalizeCityName(dest.name).includes(query);
      const descMatch = dest.desc.toLowerCase().includes(query);
      
      // Regions matching
      let regionMatch = false;
      if (query === 'north' || query === 'northern') {
        regionMatch = ['Hanoi', 'Sapa', 'Ha Long Bay', 'Ninh Binh', 'Phong Nha'].includes(dest.name);
      } else if (query === 'central') {
        regionMatch = ['Hue', 'Da Nang', 'Hoi An'].includes(dest.name);
      } else if (query === 'south' || query === 'southern') {
        regionMatch = ['Mui Ne', 'Ho Chi Minh City', 'Mekong Delta', 'Phu Quoc', 'Da Lat', 'Nha Trang', 'Vung Tau'].includes(dest.name);
      }
      
      // Interest matches
      const tagMatch = dest.desc.toLowerCase().includes(query) || (dest as any).tags?.some((t: string) => t.toLowerCase().includes(query));

      return nameMatch || descMatch || regionMatch || tagMatch;
    }).slice(0, 5); // cap results at 5 for popup readability
  }, [searchQuery]);

  // Filter destinations list dynamically based on selected tabs and queries
  const filteredDestinations = useMemo(() => {
    return MAP_DESTINATIONS.filter(dest => {
      // 1. Region Filter
      if (activeRegion === 'North') {
        if (!['Hanoi', 'Sapa', 'Ha Long Bay', 'Ninh Binh', 'Phong Nha', 'Cao Bang', 'Mai Chau', 'Moc Chau', 'Cat Ba'].includes(dest.name)) return false;
      }
      if (activeRegion === 'Central') {
        if (!['Hue', 'Da Nang', 'Hoi An', 'Quang Binh', 'Quy Nhon', 'Phu Yen'].includes(dest.name)) return false;
      }
      if (activeRegion === 'South') {
        if (!['Mui Ne', 'Ho Chi Minh City', 'Mekong Delta', 'Phu Quoc', 'Da Lat', 'Nha Trang', 'Vung Tau', 'Ben Tre', 'Chau Doc', 'Con Dao'].includes(dest.name)) return false;
      }
      if (activeRegion === 'Islands') {
        const isIslandOrBeach = ['Phu Quoc', 'Ha Long Bay', 'Nha Trang', 'Mui Ne', 'Cat Ba', 'Con Dao', 'Vung Tau', 'Quy Nhon', 'Phu Yen'].includes(dest.name);
        if (!isIslandOrBeach) return false;
      }
      if (activeRegion === 'Hidden') {
        const isHiddenGem = getMarkerTier(dest.name) === 'discovery' || ['Cao Bang', 'Phong Nha', 'Chau Doc', 'Con Dao', 'Phu Yen'].includes(dest.name);
        if (!isHiddenGem) return false;
      }

      // 2. Travel Interest Filters
      if (activeFilter !== 'ALL') {
        const desc = dest.desc.toLowerCase();
        if (activeFilter === 'POPULAR' && getMarkerTier(dest.name) !== 'primary') return false;
        if (activeFilter === 'BEACHES' && !['beach', 'coast', 'water', 'island'].some(k => desc.includes(k))) return false;
        if (activeFilter === 'CULTURE' && !['cultural', 'history', 'ancient', 'imperial', 'temple', 'pagoda', 'town'].some(k => desc.includes(k))) return false;
        if (activeFilter === 'FOOD' && !['food', 'culinary', 'dining', 'veg', 'jain', 'fruit', 'fish', 'metropolis'].some(k => desc.includes(k))) return false;
        if (activeFilter === 'NATURE' && !['mountain', 'lake', 'terrace', 'valley', 'cave', 'jungle', 'delta', 'river'].some(k => desc.includes(k))) return false;
        if (activeFilter === 'ADVENTURE' && !['cave', 'adventure', 'trek', 'hike', 'climb', 'trail', 'loop'].some(k => desc.includes(k))) return false;
        if (activeFilter === 'HIDDEN GEMS' && getMarkerTier(dest.name) !== 'discovery') return false;
      }

      return true;
    });
  }, [activeRegion, activeFilter]);

  // Surprise Me logic - selects a random destination and zooms the viewport
  const handleSurpriseMe = useCallback(() => {
    const list = MAP_DESTINATIONS;
    if (list.length === 0) return;
    const randomIndex = Math.floor(Math.random() * list.length);
    const chosen = list[randomIndex];
    
    setSelectedDestination(chosen.name);
    setMapCenter([chosen.lng, chosen.lat]);
    setZoomLevel(3);
  }, []);

  // Reset view back to full Vietnam view
  const resetView = useCallback(() => {
    setSelectedDestination(null);
    setMapCenter([107.5, 16.2]);
    setZoomLevel(1);
    setSearchQuery('');
    setActiveRegion('All');
    setActiveFilter('ALL');
  }, []);

  return {
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
  };
}
