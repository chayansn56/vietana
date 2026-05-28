import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_DEFAULT_ROUTE } from '../../data/destinations';

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

const PlaneAnimation: React.FC<PlaneAnimationProps> = ({ routeCoords }) => {
    const [planePos, setPlanePos] = useState<[number, number]>(routeCoords[0] || [21.0285, 105.8542]);
    const [planeAngle, setPlaneAngle] = useState(165);
    const progressRef = useRef(0);

    useEffect(() => {
        if (routeCoords.length < 2) return;

        let frame: number;
        const numLegs = routeCoords.length - 1;

        const animate = () => {
            progressRef.current += 0.0015;
            if (progressRef.current > numLegs) progressRef.current = 0;

            const legIndex = Math.min(Math.floor(progressRef.current), numLegs - 1);
            const f = progressRef.current - legIndex;

            const p1 = routeCoords[legIndex];
            const p2 = routeCoords[legIndex + 1];

            const lat = p1[0] + (p2[0] - p1[0]) * f;
            const lng = p1[1] + (p2[1] - p1[1]) * f;
            
            const dLng = p2[1] - p1[1];
            const dLat = p2[0] - p1[0];
            const angle = (Math.atan2(dLng, dLat) * 180) / Math.PI + 10;

            setPlanePos([lat, lng]);
            setPlaneAngle(angle);
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [routeCoords]);

    const planeIcon = L.divIcon({
        html: `<div class="text-2xl drop-shadow-md" style="transform: rotate(${planeAngle}deg);">✈️</div>`,
        className: '',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });

    return <Marker position={planePos} icon={planeIcon} zIndexOffset={1000} />;
};

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
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            
            {destinations.map((d, i) => (
                <Marker 
                    key={i} 
                    position={[d.lat, d.lng]} 
                    icon={L.divIcon({
                        className: 'custom-leaflet-pin',
                        html: `
                            <div class="relative w-3.5 h-3.5 bg-[var(--color-brand-gold)] rounded-full border-[3px] border-white shadow-[0_0_15px_rgba(201,168,76,0.5)] cursor-pointer transition-all duration-300 group ${selectedCityIdx === i ? 'bg-white scale-125 shadow-[0_0_20px_var(--color-brand-gold)]' : ''}">
                                <span class="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-0.5 rounded text-xs whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 ${selectedCityIdx === i ? 'opacity-100' : ''} transition-opacity duration-300">
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
                <Polyline positions={routeCoords} color="#C9A84C" weight={2} className="glowing-route" />
            )}
            {routeCoords.length >= 2 && <PlaneAnimation routeCoords={routeCoords} />}
            <MapController center={mapCenter} />
        </MapContainer>
    );
};

export default LeafletMap;
