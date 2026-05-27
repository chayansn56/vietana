import React, { useState, useMemo, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useTranslation } from '../contexts/LanguageContext';
import './ComboSection.css';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet markers
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const EXPERIENCES = [
  { id: 1, t: 'Hidden Temple of Hue', d: 'A 12th-century pagoda hidden in the pine forests.', lat: 16.4677, lng: 107.5905, img: 'https://images.unsplash.com/photo-1583569704200-8b43bd1265fa?w=600&q=80' },
  { id: 2, t: 'Midnight Food Train', d: 'Dine on a moving train through Hanoi\'s narrow streets.', lat: 21.0285, lng: 105.8542, img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80' },
  { id: 3, t: 'Secret Lagoon of Ninh Binh', d: 'A crystal clear lagoon accessible only by a small cave.', lat: 20.2178, lng: 105.9382, img: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&q=80' },
  { id: 4, t: 'The Last Weaver of Sapa', d: 'Meet the only remaining practitioner of an ancient indigo technique.', lat: 22.3364, lng: 103.8438, img: 'https://images.unsplash.com/photo-1504457047772-27faf1c005b7?w=600&q=80' },
  { id: 5, t: 'Lantern Maker\'s Garden', d: 'Create your own lantern in a private 200-year-old courtyard.', lat: 15.8801, lng: 108.3384, img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80' },
  { id: 6, t: 'Coffee in the Clouds', d: 'A floating cafe at the edge of Da Lat\'s highest peak.', lat: 11.9404, lng: 108.4583, img: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&q=80' },
  { id: 7, t: 'Jazz in the Alleyway', d: 'Speakeasy jazz club hidden behind a noodle shop in HCMC.', lat: 10.7769, lng: 106.7009, img: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&q=80' },
  { id: 8, t: 'Waterfall Meditation', d: 'Private sunrise meditation at the base of Ban Gioc.', lat: 22.8550, lng: 106.7228, img: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=600&q=80' },
  { id: 9, t: 'The Salt Fields of Mui Ne', d: 'Watch the sunrise reflect off the pristine salt crystals.', lat: 10.9333, lng: 108.2833, img: 'https://images.unsplash.com/photo-1504457047772-27faf1c005b7?w=600&q=80' },
  { id: 10, t: 'Fisherman\'s Secret Cove', d: 'A hidden beach in Quy Nhon only known to locals.', lat: 13.7767, lng: 109.2242, img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80' }
];

const EV_DESTINATIONS = [
  {name:'Sapa', time:'Sep - Nov, Mar - May', desc:'Misty mountains and terraced rice fields.', lat:22.3364, lng:103.8438, img:'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=400&q=80'},
  {name:'Hanoi', time:'Oct - Apr', desc:'The cultural and historical heart of Vietnam.', lat:21.0285, lng:105.8542, img:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80'},
  {name:'Ha Long Bay', time:'Oct - Apr', desc:'Thousands of limestone karsts in emerald waters.', lat:20.9101, lng:107.1839, img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80'},
  {name:'Ninh Binh', time:'Jan - Mar, May - Aug', desc:'The Halong Bay on land with stunning rivers.', lat:20.2539, lng:105.9750, img:'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&q=80'},
  {name:'Phong Nha', time:'Feb - Aug', desc:'World-class caves and jungle adventures.', lat:17.5947, lng:106.2842, img:'https://images.unsplash.com/photo-1541355416-64fae10f135b?w=400&q=80'},
  {name:'Hue', time:'Jan - Aug', desc:'Ancient imperial city and royal tombs.', lat:16.4637, lng:107.5909, img:'https://images.unsplash.com/photo-1548023487-1cbb394f28ba?w=400&q=80'},
  {name:'Da Nang', time:'Feb - May', desc:'Modern city with beautiful beaches and bridges.', lat:16.0544, lng:108.2022, img:'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80'},
  {name:'Hoi An', time:'Feb - Apr', desc:'Charming lantern-lit ancient trading port.', lat:15.8801, lng:108.3380, img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'},
  {name:'Mui Ne', time:'Nov - Apr', desc:'Red and white sand dunes with kitesurfing.', lat:10.9575, lng:108.2753, img:'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&q=80'},
  {name:'Ho Chi Minh City', time:'Dec - Apr', desc:'The vibrant, energetic southern metropolis.', lat:10.8231, lng:106.6297, img:'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80'},
  {name:'Mekong Delta', time:'Sep - Nov', desc:'Lush waterways and floating markets.', lat:10.0452, lng:105.7469, img:'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80'},
  {name:'Phu Quoc', time:'Nov - Apr', desc:'Tropical island paradise with white sand beaches.', lat:10.2289, lng:103.9572, img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'}
];

const HANOI: [number, number] = [21.0285, 105.8542];
const DANANG: [number, number] = [16.0544, 108.2022];
const HCMC: [number, number] = [10.8231, 106.6297];

// Plane Animation Component
const PlaneAnimation = () => {
    const [planePos, setPlanePos] = useState<[number, number]>(HANOI);
    const [planeAngle, setPlaneAngle] = useState(165);
    const progressRef = useRef(0);

    useEffect(() => {
        let frame: number;
        const animate = () => {
            progressRef.current += 0.0015;
            if (progressRef.current > 2) progressRef.current = 0;

            let p1, p2, f, angle;
            if (progressRef.current < 1) {
                p1 = HANOI; p2 = DANANG; f = progressRef.current;
                angle = 165;
            } else {
                p1 = DANANG; p2 = HCMC; f = progressRef.current - 1;
                angle = 175;
            }

            const lat = p1[0] + (p2[0] - p1[0]) * f;
            const lng = p1[1] + (p2[1] - p1[1]) * f;
            setPlanePos([lat, lng]);
            setPlaneAngle(angle);
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, []);

    const planeIcon = L.divIcon({
        html: `<div class="plane-icon-wrapper" style="transform: rotate(${planeAngle}deg);">✈️</div>`,
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

interface ComboSectionProps {
    onOpenPlanner: (destination?: string) => void;
}

const ComboSection: React.FC<ComboSectionProps> = ({ onOpenPlanner }) => {
  const { t } = useTranslation();
  const [shattered, setShattered] = useState(false);
  const [selectedExp, setSelectedExp] = useState<any>(null);
  
  const [selectedCityIdx, setSelectedCityIdx] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([16.0, 106.0]);

  const nodes = useMemo(() => {
    return EXPERIENCES.map((exp) => ({
      ...exp,
      top: `${20 + Math.random() * 60}%`,
      left: `${10 + Math.random() * 80}%`,
      dur: `${3 + Math.random() * 3}s`,
      del: `${Math.random() * 2}s`
    }));
  }, []);

  const handleCityClick = (idx: number) => {
    setSelectedCityIdx(idx);
    setMapCenter([EV_DESTINATIONS[idx].lat, EV_DESTINATIONS[idx].lng]);
  };

  return (
    <section id="combo-section">
      
      {/* LEFT: EXPERIENCES */}
      <div id="experiences" className="sc-exp-sec">
        <div className="exp-bg-gradient"></div>
        <div className="exp-blob exp-blob-blue"></div>
        <div className="exp-blob exp-blob-green"></div>
        
        {!shattered ? (
          <div className="exp-orb-container" onClick={() => setShattered(true)}>
            <div className="exp-orb">
              <span className="lbl">{t.exp.title}</span>
              <h2>Unlock<br />15 Hidden Experiences</h2>
              <p>Tap to Explore</p>
            </div>
            <div className="exp-orb-glow"></div>
          </div>
        ) : (
          <div className="exp-nodes-container">
            {nodes.map((node) => (
              <div 
                key={node.id} 
                className="exp-node-wrap scattered" 
                style={{ top: node.top, left: node.left }}
                onClick={() => setSelectedExp(node)}
              >
                <div className="exp-node-float" style={{ '--float-dur': node.dur, '--float-del': node.del } as any}>
                  <div className="exp-node">
                    <span className="exp-node-icon">✨</span>
                    <div className="exp-tooltip">{node.t}</div>
                  </div>
                </div>
              </div>
            ))}
            <button className="exp-reset-btn show" onClick={() => setShattered(false)}>← Back</button>
          </div>
        )}

        <AnimatePresence>
          {selectedExp && (
            <div className="exp-modal-overlay" onClick={() => setSelectedExp(null)}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="exp-modal"
                onClick={e => e.stopPropagation()}
              >
                <button className="exp-modal-close" onClick={() => setSelectedExp(null)}>×</button>
                <img src={selectedExp.img} alt={selectedExp.t} />
                <div className="exp-modal-content">
                  <h3>{selectedExp.t}</h3>
                  <p>{selectedExp.d}</p>
                  <div className="exp-modal-actions">
                    <a href={`https://maps.google.com/?q=${encodeURIComponent(selectedExp.t)}`} target="_blank" rel="noreferrer" className="exp-modal-btn">📍 View on Map</a>
                    <button className="exp-modal-btn secondary" onClick={() => { setSelectedExp(null); onOpenPlanner(selectedExp.t); }}>Plan with AI</button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT: MAP */}
      <div id="explore-vietnam" className="ev-section">
        <div className="side-label">FEEL VIETNAM YOUR WAY</div>
        <div className="ev-header">
          <h2>Explore Vietnam</h2>
        </div>
        
        <div className="ev-content-wrap">
          <div className="ev-map-container r">
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
              
              {EV_DESTINATIONS.map((d, i) => (
                <Marker 
                  key={i} 
                  position={[d.lat, d.lng]} 
                  icon={L.divIcon({
                    className: 'custom-leaflet-pin',
                    html: `<div class="ev-pin ${selectedCityIdx === i ? 'active' : ''}" data-idx="${i}"><span class="ev-pin-label">${d.name}</span></div>`,
                    iconSize: [24, 24],
                    iconAnchor: [12, 12]
                  })}
                  eventHandlers={{ click: () => handleCityClick(i) }}
                />
              ))}

              <Polyline positions={[HANOI, DANANG, HCMC]} color="#0056b3" weight={2} className="glowing-route" />
              <PlaneAnimation />
              <MapController center={mapCenter} />
            </MapContainer>
          </div>

          <AnimatePresence>
            {selectedCityIdx !== null && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="ev-popup show"
              >
                <div className="ev-popup-close" onClick={() => setSelectedCityIdx(null)}>×</div>
                <img src={EV_DESTINATIONS[selectedCityIdx].img} alt={EV_DESTINATIONS[selectedCityIdx].name} />
                <h3>{EV_DESTINATIONS[selectedCityIdx].name}</h3>
                <p className="evp-time">Best time: {EV_DESTINATIONS[selectedCityIdx].time}</p>
                <p className="evp-desc">{EV_DESTINATIONS[selectedCityIdx].desc}</p>
                <div className="evp-actions">
                  <button className="evp-btn" onClick={() => onOpenPlanner(EV_DESTINATIONS[selectedCityIdx].name)}>Plan My Trip</button>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(EV_DESTINATIONS[selectedCityIdx].name + ' Vietnam')}`} target="_blank" rel="noreferrer" className="evp-btn-sec">View on Map</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
};

export default ComboSection;
