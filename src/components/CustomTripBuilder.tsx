import React, { useState, useEffect } from 'react';
import { WHATSAPP_INDIA } from '../utils/whatsapp';
import { TRIP_BUILDER_CITIES } from '../data/tripBuilder';
import { calculateTripEstimate } from '../services/pricingService';
import { MessagingService } from '../services/messagingService';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { Heading, Text } from './ui/Typography';

interface CustomTripBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomTripBuilder: React.FC<CustomTripBuilderProps> = ({ isOpen, onClose }) => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [style, setStyle] = useState<'budget' | 'comfort' | 'luxury'>('budget');
  const [days, setDays] = useState(7);
  const [pax, setPax] = useState(2);
  const [notes, setNotes] = useState('');

  const [estimate, setEstimate] = useState({
    flight: 0,
    visa: 0,
    transit: 0,
    daily: 0,
    total: 0
  });

  useEffect(() => {
    setEstimate(calculateTripEstimate(selectedCities, style, days, pax));
  }, [selectedCities, style, days, pax]);

  const toggleCity = (city: string) => {
    setSelectedCities(prev => 
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  const sendToWhatsApp = () => {
    const link = MessagingService.generateCustomTripWhatsApp(selectedCities, style, days, pax, estimate.total, notes);
    window.open(link, '_blank');
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      maxWidth="max-w-5xl"
      className="h-[90vh] max-h-[850px] flex flex-col p-0 overflow-hidden glass-dark rounded-[32px] shadow-heavy"
    >
      {/* Lush Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none z-0 animate-blob-float" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none z-0 animate-blob-float" style={{ animationDelay: '2s' }} />

      {/* HEADER */}
      <div className="p-10 pb-8 border-b border-white/5 relative z-10 flex flex-col items-center text-center">
        <Heading as="h2" variant="white" className="text-4xl font-serif mb-3 tracking-wide">
           Craft Your <span className="text-brand-gold-light italic">Journey</span>
        </Heading>
        <Text variant="none" className="text-white/50 text-sm font-light tracking-widest uppercase">
          Select destinations & tailor your experience
        </Text>
      </div>

      {/* CONTENT SPLIT */}
      <div className="flex-1 overflow-y-auto flex flex-col md:flex-row relative z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        
        {/* LEFT: Destinations */}
        <div className="flex-1 md:flex-[0.55] p-10 border-r border-white/5 flex flex-col gap-8">
          <Heading as="h3" variant="none" className="text-brand-gold/70 uppercase tracking-[0.2em] text-xs font-semibold flex items-center gap-3">
            <span>📍</span> Destinations
          </Heading>
          
          <div className="grid grid-cols-2 gap-4">
            {TRIP_BUILDER_CITIES.map(city => {
              const isSelected = selectedCities.includes(city);
              return (
                <label 
                  key={city} 
                  className={`relative overflow-hidden group flex items-center justify-center p-6 rounded-2xl border cursor-pointer transition-all duration-500
                    ${isSelected ? 'bg-brand-gold/15 border-brand-gold/50 shadow-gold' : 'bg-white/5 border-white/10 hover:border-brand-gold/30 hover:bg-white/10'}`}
                >
                  <input 
                    type="checkbox" 
                    checked={isSelected} 
                    onChange={() => toggleCity(city)}
                    className="hidden" 
                  />
                  {isSelected && <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-transparent pointer-events-none" />}
                  <Text 
                    variant="none" 
                    className={`relative z-10 text-lg tracking-wide transition-colors duration-500 ${isSelected ? 'text-brand-gold-light font-medium' : 'text-white/80 font-light group-hover:text-white'}`}
                  >
                    {city}
                  </Text>
                </label>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Settings & Estimate */}
        <div className="flex-1 md:flex-[0.45] p-10 glass-dark bg-black/40 flex flex-col shadow-inner border-l border-white/5 rounded-none border-t-0 border-r-0 border-b-0">
           <Heading as="h3" variant="none" className="text-white/40 uppercase tracking-[0.2em] text-xs font-semibold mb-8 flex items-center gap-3">
              <span>⚙️</span> Trip Parameters
           </Heading>

           {/* Travel Style */}
           <div className="mb-10">
              <Text variant="none" className="text-white/50 text-[0.65rem] uppercase tracking-widest mb-4 font-semibold">Travel Style</Text>
              <div className="flex bg-white/5 border border-white/10 rounded-xl p-1.5 gap-1 relative backdrop-blur-sm">
                {(['budget', 'comfort', 'luxury'] as const).map(s => (
                  <button 
                   key={s}
                   className={`flex-1 py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-500 cursor-pointer
                     ${style === s ? 'bg-brand-gold text-brand-green-extra-dark shadow-strong scale-[1.02]' : 'bg-transparent text-white/40 hover:text-white/80 hover:bg-white/5'}`} 
                   onClick={() => setStyle(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
           </div>

           {/* Duration & Pax Sliders */}
           <div className="flex flex-col gap-8 mb-12">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <Text variant="none" className="text-white/50 text-[0.65rem] uppercase tracking-widest font-semibold">Duration</Text>
                  <Text variant="none" className="text-brand-gold-light text-xl font-serif">{days} Days</Text>
                </div>
                <input 
                  type="range" min="3" max="30" 
                  value={days} onChange={(e) => setDays(parseInt(e.target.value))} 
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-brand-gold [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(201,168,76,0.6)] transition-all" 
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <Text variant="none" className="text-white/50 text-[0.65rem] uppercase tracking-widest font-semibold">Travelers</Text>
                  <Text variant="none" className="text-brand-gold-light text-xl font-serif">{pax} {pax === 1 ? 'Person' : 'People'}</Text>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={pax} onChange={(e) => setPax(parseInt(e.target.value))} 
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-brand-gold [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(201,168,76,0.6)] transition-all" 
                />
              </div>
           </div>

           {/* Receipt */}
           <div className="mt-auto bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden backdrop-blur-md shadow-inner before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-transparent before:via-brand-gold/50 before:to-transparent">
             <Heading as="h4" variant="none" className="text-brand-gold/80 uppercase tracking-widest text-[0.65rem] font-semibold mb-6 flex items-center gap-2">
               Real-time Estimate
             </Heading>
             
             <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <Text variant="none" className="text-white/60 text-sm font-light tracking-wide">✈️ Flights (IN ↔ VN)</Text>
                  <Text variant="none" className="text-white/90 text-sm font-mono tracking-wider">₹{estimate.flight.toLocaleString('en-IN')}</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text variant="none" className="text-white/60 text-sm font-light tracking-wide">🛂 E-Visa</Text>
                  <Text variant="none" className="text-white/90 text-sm font-mono tracking-wider">₹{estimate.visa.toLocaleString('en-IN')}</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text variant="none" className="text-white/60 text-sm font-light tracking-wide flex items-center gap-2">
                    🚄 Transit <span className="text-brand-gold/40 text-[0.55rem] uppercase tracking-widest">₹3k/hop</span>
                  </Text>
                  <Text variant="none" className="text-white/90 text-sm font-mono tracking-wider">₹{estimate.transit.toLocaleString('en-IN')}</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text variant="none" className="text-white/60 text-sm font-light tracking-wide">🏨 Daily Expenses</Text>
                  <Text variant="none" className="text-white/90 text-sm font-mono tracking-wider">₹{estimate.daily.toLocaleString('en-IN')}</Text>
                </div>
                
                <div className="mt-4 pt-6 border-t border-dashed border-white/20 flex justify-between items-end">
                  <Text variant="none" className="text-brand-gold uppercase tracking-[0.2em] text-xs font-semibold mb-1">Total</Text>
                  <Heading variant="none" as="div" className="text-3xl font-serif text-brand-gold-light">
                    ₹{estimate.total.toLocaleString('en-IN')}
                  </Heading>
                </div>
             </div>
           </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-8 border-t border-white/5 relative z-10 bg-black/30 backdrop-blur-3xl flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-brand-gold">📝</span>
            <input 
               type="text"
               value={notes}
               onChange={(e) => setNotes(e.target.value)}
               placeholder="Special requests? (e.g., Honeymoon, Halal food)"
               className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white text-sm outline-none focus:border-brand-gold/40 focus:bg-white/10 transition-all placeholder:text-white/30"
            />
        </div>
        <Button 
           className="w-full md:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-green-extra-dark font-bold tracking-widest uppercase text-xs rounded-xl shadow-gold transition-all duration-300 flex items-center justify-center gap-3 whitespace-nowrap"
           onClick={sendToWhatsApp}
        >
          💬 Send to WhatsApp
        </Button>
      </div>
    </Modal>
  );
};

export default CustomTripBuilder;
