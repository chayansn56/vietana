import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, GeoJSON, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ReactDOMServer from 'react-dom/server';
import { MAP_DEFAULT_ROUTE } from '../../data/destinations';
import Icon from '../ui/Icon';
import { Heading, Text } from '../ui/Typography';
import vietnamGeoJson from '../../data/vietnam.json';

// Fix for Leaflet markers
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({ 
  iconUrl: icon, 
  shadowUrl: iconShadow, 
  iconSize: [25, 41], 
  iconAnchor: [12, 41] 
});

L.Marker.prototype.options.icon = DefaultIcon;

interface PlaneAnimationProps {
    routeCoords: [number, number][];
}

// RoutePulse removed

const MapController = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.panTo(center, { animate: true, duration: 1 });
    }, [center, map]);
    return null;
};

interface LeafletMapProps {
    destinations: { name: string; lat: number; lng: number; time?: string; desc?: string; img?: string }[];
    selectedCityIdx: number | null;
    mapCenter: [number, number];
    onCityClick: (idx: number) => void;
    routeCoords?: [number, number][];
    onOpenPlanner?: (dest: string) => void;
    onDeselect?: () => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ 
    destinations, 
    selectedCityIdx, 
    mapCenter, 
    onCityClick,
    routeCoords = MAP_DEFAULT_ROUTE,
    onOpenPlanner,
    onDeselect
}) => {
    return (
        <MapContainer 
            className="bg-noise"
            center={[16.0, 106.0]} 
            zoom={5.5} 
            zoomSnap={0.5}
            zoomControl={false}
            attributionControl={false}
            scrollWheelZoom={false} 
            style={{ height: '100%', width: '100%', backgroundColor: '#f4f4f4' }}
        >
            {/* Minimalist Light Mode TileLayer (Fast & Mobile Friendly) */}
            <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    className="map-tiles-light"
                />
            
            {/* Highlight Vietnam in Green (Living Topography) */}
            <GeoJSON 
                data={vietnamGeoJson as any} 
                className="living-topography"
            />
            
            {destinations.map((d, i) => (
                <Marker 
                    key={i} 
                    position={[d.lat, d.lng]} 
                    icon={L.divIcon({
                        className: 'custom-leaflet-pin',
                        html: `
                            <div class="relative w-3.5 h-3.5 bg-[var(--color-brand-gold)] rounded-full border-[3px] border-[#0A1210] shadow-[0_0_15px_rgba(201,168,76,0.8)] cursor-pointer transition-all duration-300 group ${selectedCityIdx === i ? 'bg-white scale-125 shadow-[0_0_25px_var(--color-brand-gold)]' : ''}">
                                <span class="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/90 text-brand-gold px-3 py-1 rounded text-xs font-semibold whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 ${selectedCityIdx === i ? 'opacity-100' : ''} transition-opacity duration-300 backdrop-blur-sm border border-brand-gold/30">
                                    ${d.name}
                                </span>
                            </div>
                        `,
                        iconSize: [24, 24],
                        iconAnchor: [12, 12]
                    })}
                    eventHandlers={{ 
                        click: () => onCityClick(i),
                        popupclose: () => onDeselect && onDeselect()
                    }}
                >
                    <Popup className="glassmorphism-popup" closeButton={false} autoPanPadding={[20, 20]}>
                        <div className="w-[320px] bg-surface-cream/90 backdrop-blur-xl rounded-xl border border-black/10 overflow-hidden shadow-2xl flex flex-col">
                            {(d.images && d.images.length > 0) ? (
                                <div className="w-full h-40 relative flex overflow-x-auto snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                    {d.images.map((imgUrl, imgIdx) => (
                                        <div key={imgIdx} className="min-w-full h-full relative snap-center shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-t from-surface-cream/90 to-transparent z-10" />
                                            <img src={imgUrl} alt={`${d.name} view ${imgIdx + 1}`} className="w-full h-full object-cover" />
                                            {/* Indicators */}
                                            <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full z-20">
                                                {imgIdx + 1} / {d.images!.length}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                d.img && (
                                    <div className="w-full h-40 relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-surface-cream/90 to-transparent z-10" />
                                        <img src={d.img} alt={d.name} className="w-full h-full object-cover" />
                                    </div>
                                )
                            )}
                            <div className="p-6 relative z-20 -mt-6">
                                <Text className="text-editorial-meta text-brand-gold mb-2 editorial-line-accent inline-block">
                                    Destination
                                </Text>
                                <Heading as="h3" className="text-2xl font-serif text-brand-green-extra-dark mb-2 mt-1">
                                    {d.name}
                                </Heading>
                                {d.time && (
                                    <Text className="text-[0.6rem] tracking-[0.2em] uppercase text-black/50 mb-4">
                                        Season: <span className="text-brand-green-extra-dark font-bold">{d.time}</span>
                                    </Text>
                                )}
                                {d.desc && (
                                    <Text className="text-xs font-light text-text-muted leading-relaxed mb-6">
                                        {d.desc}
                                    </Text>
                                )}
                                <div className="flex items-center gap-4">
                                    <button 
                                        className="editorial-border px-4 py-2 text-[0.6rem] tracking-[0.2em] uppercase text-brand-green-extra-dark hover:bg-brand-green-extra-dark hover:text-white transition-colors duration-500"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if(onOpenPlanner) onOpenPlanner(d.name);
                                        }}
                                    >
                                        Plan Visit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}

            <MapController center={mapCenter} />
        </MapContainer>
    );
};

export default LeafletMap;
