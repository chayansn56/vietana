import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ReactDOMServer from 'react-dom/server';
import { MAP_DEFAULT_ROUTE } from '../../data/destinations';
import Icon from '../ui/Icon';

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
    destinations: { name: string; lat: number; lng: number }[];
    selectedCityIdx: number | null;
    mapCenter: [number, number];
    onCityClick: (idx: number) => void;
    routeCoords?: [number, number][];
}

const LeafletMap: React.FC<LeafletMapProps> = ({ 
    destinations, 
    selectedCityIdx, 
    mapCenter, 
    onCityClick,
    routeCoords = MAP_DEFAULT_ROUTE
}) => {
    return (
        <MapContainer 
            center={[16.0, 106.0]} 
            zoom={5.5} 
            zoomSnap={0.5}
            zoomControl={false}
            attributionControl={false}
            scrollWheelZoom={false} 
            style={{ height: '100%', width: '100%', backgroundColor: '#0A1210' }}
        >
            {/* Minimalist Dark Mode TileLayer (Fast & Mobile Friendly) */}
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            
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
                    eventHandlers={{ click: () => onCityClick(i) }}
                />
            ))}

            {routeCoords.length >= 2 && (
                <>
                    {/* The Static Golden Thread (Background) */}
                    <Polyline positions={routeCoords} color="#C9A84C" weight={3} opacity={0.25} className="glowing-route" />
                    {/* The Marching Dashes (Animated Foreground) */}
                    <Polyline 
                        positions={routeCoords} 
                        color="#C9A84C" 
                        weight={2} 
                        opacity={0.9} 
                        dashArray="8, 12"
                        className="marching-dashes drop-shadow-[0_0_8px_rgba(201,168,76,1)]" 
                    />
                </>
            )}
            <MapController center={mapCenter} />
        </MapContainer>
    );
};

export default LeafletMap;
