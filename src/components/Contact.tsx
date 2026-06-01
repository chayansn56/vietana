import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import BrandName from './ui/BrandName';
import { MapContainer, TileLayer, Marker, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONTACT_LOCATIONS = [
  {
    id: 'india',
    name: 'New Delhi, India',
    coords: [28.6219, 77.0661] as [number, number],
    title: '🇮🇳 INDIA — NEW DELHI',
    person: 'Vikram Sonker',
    phone: '+91 9953294543',
    waUrl: 'https://wa.me/919953294543',
    email: 'vikram@vietana.com',
    address: 'RZ 35/36, Indra Park Ext.\nUttam Nagar, East Delhi',
    mapUrl: 'https://maps.google.com/?q=RZ+35/36,+Indra+Park+Extension+Uttam+Nagar,+East+Delhi+110059',
    bgColor: 'bg-brand-gold/10',
    borderColor: 'border-brand-gold/30',
    themeColorClass: 'text-brand-gold',
    hoverBgClass: 'hover:bg-brand-gold',
    hoverBorderClass: 'hover:border-brand-gold'
  },
  {
    id: 'vietnam',
    name: 'Ho Chi Minh City, Vietnam',
    coords: [10.8033, 106.7445] as [number, number],
    title: '🇻🇳 VIETNAM — HCM CITY',
    person: 'Chayan Soni',
    phone: '+84 902434006',
    waUrl: 'https://wa.me/84902434006',
    email: 'chayan@vietana.com',
    address: '45 Nguyễn Quý Đức\nAn Phú, Ho Chi Minh City',
    mapUrl: 'https://maps.google.com/?q=45+Nguyễn+Quý+Đức+An+Phú+Ho+Chi+Minh+City+Vietnam',
    bgColor: 'bg-brand-blue/10',
    borderColor: 'border-brand-blue/30',
    themeColorClass: 'text-brand-blue',
    hoverBgClass: 'hover:bg-brand-blue',
    hoverBorderClass: 'hover:border-brand-blue'
  }
];

const MapController = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    React.useEffect(() => {
        map.flyTo(center, 5, { animate: true, duration: 1.5 });
    }, [center, map]);
    return null;
};

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [activeLoc, setActiveLoc] = useState(0);
  const activeData = CONTACT_LOCATIONS[activeLoc];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      maxWidth="max-w-6xl" 
      variant="light"
      className="overflow-hidden !bg-white/95 [20px] !rounded-[24px] shadow-2xl border border-white/60 p-0"
    >
      <div className="flex flex-col md:flex-row min-h-[600px] max-h-[85vh]">
        
        {/* LEFT MAP PANEL */}
        <div className="w-full md:w-1/2 h-[300px] md:h-auto relative bg-surface-dark border-r border-black/10">
          <div className="absolute top-4 left-4 z-[500] bg-white/90  px-4 py-2 rounded-xl shadow-md pointer-events-none">
            <Text size="xs" weight="bold" className="tracking-widest uppercase text-brand-green-dark">Our Offices</Text>
          </div>
          
          <MapContainer 
            center={activeData.coords} 
            zoom={5} 
            zoomControl={false}
            attributionControl={false}
            style={{ height: '100%', width: '100%' }}
            className="z-10"
          >
            {/* Minimal dark map tiles for premium look */}
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
            
            {CONTACT_LOCATIONS.map((loc, idx) => (
              <Marker 
                key={loc.id} 
                position={loc.coords}
                eventHandlers={{ click: () => setActiveLoc(idx) }}
                icon={L.divIcon({
                  className: 'bg-transparent',
                  html: `
                    <div class="w-5 h-5 rounded-full ${idx === activeLoc ? 'bg-brand-green-dark border-2 border-white scale-125 shadow-lg' : 'bg-brand-gold border-2 border-white opacity-60'} transition-all duration-300"></div>
                  `,
                  iconSize: [20, 20],
                  iconAnchor: [10, 10]
                })}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={idx === activeLoc}>
                  {loc.name}
                </Tooltip>
              </Marker>
            ))}
            <MapController center={activeData.coords} />
          </MapContainer>
        </div>

        {/* RIGHT INFO PANEL */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto scrollbar-thin scrollbar-thumb-brand-blue/30 bg-white">
          <div className="mb-8">
            <Heading as="h2" size="2xl" font="serif" variant="dark" className="mb-2 text-brand-green-dark">Talk to Us</Heading>
            <Text variant="muted" size="sm" className="leading-relaxed">
              Click the pins on the map to view our local offices. We reply quickly in Hindi & English to help craft your perfect journey.
            </Text>
          </div>

          {/* DYNAMIC CONTACT CARD */}
          <div className={`space-y-5 p-6 rounded-2xl border transition-colors duration-500 ${activeData.bgColor} ${activeData.borderColor}`}>
            <Text size="xs" variant="accent" weight="bold" className="tracking-widest border-b border-black/10 pb-2 inline-block text-brand-green-dark">{activeData.title}</Text>
            <Heading as="h3" size="lg" variant="dark" className="text-brand-green-dark">{activeData.person}</Heading>
            
            <div className="space-y-4 text-text-dark font-medium text-sm pt-2">
              <p className="flex items-center gap-3"><Icon name="Phone" size={18} className={activeData.themeColorClass} /> <a href={activeData.waUrl} target="_blank" rel="noreferrer" className={`hover:${activeData.themeColorClass} hover:underline`}>{activeData.phone}</a></p>
              <p className="flex items-center gap-3"><Icon name="Mail" size={18} className={activeData.themeColorClass} /> <a href={`mailto:${activeData.email}`} className={`hover:${activeData.themeColorClass} hover:underline`}>{activeData.email}</a></p>
              <p className="flex items-start gap-3"><Icon name="MapPin" size={18} className={`${activeData.themeColorClass} mt-0.5 shrink-0`} /> <span className="whitespace-pre-line">{activeData.address}</span></p>
            </div>
            
            <Button variant="outline" className={`w-full mt-4 bg-white text-brand-green-dark ${activeData.borderColor} ${activeData.hoverBgClass} hover:text-white flex items-center justify-center gap-2 text-xs py-2`} onClick={() => window.open(activeData.mapUrl, '_blank')}>
              <Icon name="MapPin" size={14} /> Get Directions
            </Button>
          </div>

          {/* ONLINE SUPPORT (STATIC) */}
          <div className="mt-8 bg-surface-warm p-6 rounded-2xl border border-black/5">
            <Text size="xs" variant="accent" weight="bold" className="tracking-widest mb-4 text-brand-green-dark border-b border-black/10 pb-2 flex items-center gap-2"><Icon name="Globe" size={14} /> ONLINE SUPPORT</Text>
            <div className="space-y-3 text-text-dark font-medium text-sm">
              <p className="flex items-center gap-3"><Icon name="Leaf" size={16} className="text-brand-green" /> <a href="https://www.vietana.com" className="hover:underline hover:text-brand-green">www.vietana.com</a></p>
              <p className="flex items-center gap-3"><Icon name="Mail" size={16} className="text-brand-blue" /> <a href="mailto:info@vietana.com" className="hover:underline hover:text-brand-blue">info@vietana.com</a></p>
              <p className="flex items-center gap-3"><Icon name="Check" size={16} className="text-[#25D366]" /> Fast Response • Hindi & English</p>
            </div>
          </div>
          
          <div className="text-center pt-8">
            <Text variant="accent" size="xs" className="italic font-bold text-brand-gold-muted">Travel Gets Better with <BrandName /></Text>
          </div>
        </div>

      </div>
    </Modal>
  );
};

export default ContactModal;
