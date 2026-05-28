import React, { useState, useMemo, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useTranslation } from '../contexts/LanguageContext';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { Heading, Text } from './ui/Typography';
import Card from './ui/Card';
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
    <section id="combo-section" className="flex flex-wrap w-full min-h-[800px] bg-white items-stretch">
      
      {/* LEFT: EXPERIENCES */}
      <div id="experiences" className="flex-1 min-w-[320px] relative py-24 px-[2%] flex items-center justify-center overflow-hidden border-r border-black/5 bg-brand-green-extra-dark min-h-[800px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(13,79,46,0.2)_0%,transparent_70%)] z-0" />
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-15 animate-[blobFloat_20s_infinite_alternate] bg-brand-blue top-[10%] left-[10%]" />
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-15 animate-[blobFloat_20s_infinite_alternate_delay-5s] bg-brand-green bottom-[10%] right-[10%]" />
        
        {!shattered ? (
          <div className="relative z-10 cursor-pointer transition-transform duration-600 ease-elastic text-center hover:scale-105" onClick={() => setShattered(true)}>
            <div className="w-56 h-56 rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--color-brand-gold),var(--color-brand-green))] flex flex-col items-center justify-center p-8 shadow-strong">
              <span className="text-[0.68rem] font-semibold tracking-[0.28em] uppercase text-brand-gold mb-2">{t.exp.title}</span>
              <Heading as="h2" className="text-3xl text-white mb-2 leading-tight">Unlock<br />15 Hidden Experiences</Heading>
              <Text variant="white" size="xs" className="opacity-60 font-bold tracking-[0.1em] uppercase">Tap to Explore</Text>
            </div>
            <div className="absolute inset-[-20px] rounded-full border border-dashed border-brand-gold/30 animate-[spin_15s_linear_infinite]" />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-[5]">
            {nodes.map((node) => (
              <div 
                key={node.id} 
                className="absolute cursor-pointer transition-all duration-400 group" 
                style={{ top: node.top, left: node.left }}
                onClick={() => setSelectedExp(node)}
              >
                <div className="animate-[nfloat_var(--dur)_var(--del)_infinite_ease-in-out]" style={{ '--float-dur': node.dur, '--float-del': node.del } as any}>
                  <div className="w-3.5 h-3.5 bg-brand-gold rounded-full shadow-[0_0_15px_var(--color-brand-gold)] relative group-hover:scale-[1.8] group-hover:bg-white group-hover:shadow-[0_0_25px_#fff] transition-all duration-300">
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[0.8rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">✨</span>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/85 text-white px-4 py-2 rounded-lg text-[0.7rem] whitespace-nowrap opacity-0 pointer-events-none transition-all duration-300 border border-white/10 backdrop-blur-md group-hover:opacity-100 group-hover:bottom-7.5">
                      {node.t}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 text-white px-6 py-2.5 rounded-full text-[0.8rem] cursor-pointer transition-all duration-300 z-20 hover:bg-white/15 hover:border-brand-gold" onClick={() => setShattered(false)}>
              ← Back
            </button>
          </div>
        )}

        <Modal 
          isOpen={!!selectedExp} 
          onClose={() => setSelectedExp(null)}
          maxWidth="max-w-[500px]"
          className="bg-brand-green-dark border-brand-gold/20 overflow-hidden"
        >
          {selectedExp && (
            <>
              <img src={selectedExp.img} alt={selectedExp.t} className="w-full h-64 object-cover" />
              <div className="p-8">
                <Heading as="h3" className="text-3xl text-brand-gold mb-4">
                  {selectedExp.t}
                </Heading>
                <Text variant="white" className="opacity-70 leading-relaxed mb-8">
                  {selectedExp.d}
                </Text>
                <div className="flex gap-4">
                  <Button 
                    variant="primary" 
                    className="flex-1"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(selectedExp.t)}`, '_blank')}
                  >
                    📍 View on Map
                  </Button>
                  <Button 
                    variant="glass" 
                    className="flex-1"
                    onClick={() => { setSelectedExp(null); onOpenPlanner(selectedExp.t); }}
                  >
                    Plan with AI
                  </Button>
                </div>
              </div>
            </>
          )}
        </Modal>
      </div>

      {/* RIGHT: MAP */}
      <div id="explore-vietnam" className="flex-1 min-w-[320px] relative py-24 px-[2%] bg-surface-cream flex flex-col items-center justify-center min-h-[800px]">
        <div className="absolute left-[3%] top-1/2 -translate-y-1/2 -rotate-180 vertical-rl text-center font-serif text-[3rem] text-brand-gold/10 font-bold italic tracking-[4px] whitespace-nowrap pointer-events-none z-0">
          FEEL VIETNAM YOUR WAY
        </div>
        <div className="mb-8 text-center reveal">
          <Heading as="h2" className="text-[2.8rem] text-text-dark font-serif font-normal">
            Explore Vietnam
          </Heading>
        </div>
        
        <div className="relative w-full max-w-[600px] flex flex-col lg:flex-row justify-center items-center reveal reveal-d1">
          <div className="w-full aspect-square rounded-[30px] overflow-hidden border-8 border-white shadow-heavy relative z-[2] h-[500px]">
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
                    html: `
                      <div class="relative w-3.5 h-3.5 bg-brand-gold rounded-full border-[3px] border-white shadow-[0_0_15px_rgba(201,168,76,0.5)] cursor-pointer transition-all duration-300 group ${selectedCityIdx === i ? 'bg-white scale-125 shadow-[0_0_20px_var(--color-brand-gold)]' : ''}">
                        <span class="absolute -top-6.5 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-0.5 rounded text-[0.65rem] whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 ${selectedCityIdx === i ? 'opacity-100' : ''} transition-opacity duration-300">
                          ${d.name}
                        </span>
                      </div>
                    `,
                    iconSize: [24, 24],
                    iconAnchor: [12, 12]
                  })}
                  eventHandlers={{ click: () => handleCityClick(i) }}
                />
              ))}

              <Polyline positions={[HANOI, DANANG, HCMC]} color="#C9A84C" weight={2} className="glowing-route" />
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
                className="relative lg:absolute lg:top-1/2 lg:-right-15 lg:-translate-y-1/2 w-full lg:w-[260px] bg-white/98 backdrop-blur-2xl rounded-2xl p-6 shadow-deep z-[100] border border-black/5 mt-8 lg:mt-0"
              >
                <div className="absolute top-4 right-4 cursor-pointer text-2xl text-text-subtle leading-none" onClick={() => setSelectedCityIdx(null)}>×</div>
                <img src={EV_DESTINATIONS[selectedCityIdx].img} alt={EV_DESTINATIONS[selectedCityIdx].name} className="w-full h-32 object-cover rounded-xl mb-4" />
                <Heading as="h3" className="text-xl text-text-dark mb-1.5 font-serif font-bold">
                  {EV_DESTINATIONS[selectedCityIdx].name}
                </Heading>
                <Text size="xs" className="text-brand-gold font-bold uppercase mb-2.5 tracking-wider">
                  Best time: {EV_DESTINATIONS[selectedCityIdx].time}
                </Text>
                <Text size="sm" variant="muted" className="leading-relaxed mb-5">
                  {EV_DESTINATIONS[selectedCityIdx].desc}
                </Text>
                <div className="flex flex-col gap-2.5">
                  <Button variant="primary" size="sm" className="w-full" onClick={() => onOpenPlanner(EV_DESTINATIONS[selectedCityIdx].name)}>Plan My Trip</Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(EV_DESTINATIONS[selectedCityIdx].name + ' Vietnam')}`, '_blank')}
                  >
                    View on Map
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .vertical-rl { writing-mode: vertical-rl; }
        @keyframes blobFloat { from { transform: translate(0,0); } to { transform: translate(50px, 50px); } }
        @keyframes nfloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .glowing-route { filter: drop-shadow(0 0 10px rgba(201,168,76,0.5)); stroke-dasharray: 5, 10; animation: dash 20s linear infinite; }
        @keyframes dash { to { stroke-dashoffset: -100; } }
      `}</style>
    </section>
  );
};

export default ComboSection;
