import React, { useState, useEffect, useMemo } from 'react';
import { TRIP_BUILDER_CITIES } from '../data/tripBuilder';
import { calculateTripEstimate, TravelStyle, FlightType, VisaType } from '../services/pricingService';
import { MessagingService } from '../services/messagingService';
import { TripEstimate } from '../types';
import { VIETNAM_TOP_10 } from '../data/siteContent';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import BrandName from './ui/BrandName';

interface CustomTripBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestinations?: string[];
  onOpenAIPlanner?: (prompt: string) => void;
}

const CustomTripBuilder: React.FC<CustomTripBuilderProps> = ({ isOpen, onClose, initialDestinations = [], onOpenAIPlanner }) => {
  const [selectedCities, setSelectedCities] = useState<string[]>(initialDestinations);
  const [style, setStyle] = useState<TravelStyle>('comfort');
  const [flightType, setFlightType] = useState<FlightType>('round');
  const [visaType, setVisaType] = useState<VisaType>('single');
  const [days, setDays] = useState(5);
  const [pax, setPax] = useState(2);
  const [notes, setNotes] = useState('');
  const [currentBg, setCurrentBg] = useState(0);

  const [estimate, setEstimate] = useState<TripEstimate>({
    flight: 0,
    visa: 0,
    transfers: 0,
    hotels: 0,
    food: 0,
    transport: 0,
    experiences: 0,
    dailyTotal: 0,
    total: 0
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen) {
      interval = setInterval(() => {
        setCurrentBg((prev) => (prev + 1) % VIETNAM_TOP_10.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    setEstimate(calculateTripEstimate(selectedCities, style, days, pax, flightType, visaType));
  }, [selectedCities, style, days, pax, flightType, visaType]);

  useEffect(() => {
    if (isOpen) {
      setSelectedCities(initialDestinations);
    }
  }, [isOpen, initialDestinations]);

  const toggleCity = (city: string) => {
    setSelectedCities(prev => 
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  const sendToWhatsApp = () => {
    const link = MessagingService.generateCustomTripWhatsApp(selectedCities, style, days, pax, estimate.total, notes);
    window.open(link, '_blank');
  };

  const suggestedRoute = useMemo(() => {
     if (selectedCities.length === 0) return "Da Nang → Hoi An";
     if (selectedCities.length === 1) return selectedCities[0];
     return selectedCities.join(" → ");
  }, [selectedCities]);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      maxWidth="max-w-6xl"
      className="h-[95vh] max-h-[900px] flex flex-col p-0 overflow-hidden glass-dark rounded-[32px] shadow-heavy relative"
    >
      {VIETNAM_TOP_10.map((img, i) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            i === currentBg ? 'opacity-30' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />


      {/* HEADER */}
      <div className="p-10 pb-8 border-b border-white/5 relative z-10 flex flex-col items-center text-center">
        <Heading as="h2" variant="white" className="text-4xl font-serif mb-3 tracking-wide flex items-center gap-3">
           Craft Your <span className="text-brand-gold-light italic">Journey</span>
        </Heading>
        <Text variant="none" className="text-white/50 text-sm font-light tracking-widest uppercase">
          <BrandName /> REAL-TIME ESTIMATE ENGINE V4
        </Text>
      </div>

      {/* CONTENT SPLIT */}
      <div className="flex-1 overflow-y-auto flex flex-col md:flex-row relative z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        
        {/* LEFT: Parameters & Destinations */}
        <div className="flex-1 md:flex-[0.5] p-10 border-r border-white/5 flex flex-col gap-10">
          
          <div className="flex flex-col gap-8">
            <Heading as="h3" variant="none" className="text-brand-gold/70 uppercase tracking-[0.2em] text-xs font-semibold flex items-center gap-3">
              <Icon name="Settings" size={16} /> Trip Settings
            </Heading>

            {/* Travel Style */}
            <div>
              <Text variant="none" className="text-white/50 text-[0.65rem] uppercase tracking-widest mb-4 font-semibold">Travel Style</Text>
              <div className="grid grid-cols-2 lg:grid-cols-4 bg-white/5 border border-white/10 rounded-xl p-1.5 gap-1 relative ">
                {(['budget', 'comfort', 'premium', 'luxury'] as const).map(s => (
                  <button 
                   key={s}
                   className={`py-3.5 rounded-lg text-[0.65rem] font-semibold tracking-widest uppercase transition-all duration-500 cursor-pointer
                     ${style === s ? 'bg-brand-gold text-brand-green-extra-dark shadow-strong scale-[1.02]' : 'bg-transparent text-white/40 hover:text-white/80 hover:bg-white/5'}`} 
                   onClick={() => setStyle(s)}
                  >
                    {s}{s === 'comfort' ? ' ⭐' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles: Flight & Visa */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Text variant="none" className="text-white/50 text-[0.65rem] uppercase tracking-widest mb-4 font-semibold">Flight Type</Text>
                <div className="flex bg-white/5 border border-white/10 rounded-xl p-1.5 gap-1">
                  <button 
                    className={`flex-1 py-2.5 rounded-lg text-xs transition-all ${flightType === 'oneway' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/80'}`}
                    onClick={() => setFlightType('oneway')}
                  >One Way</button>
                  <button 
                    className={`flex-1 py-2.5 rounded-lg text-xs transition-all ${flightType === 'round' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/80'}`}
                    onClick={() => setFlightType('round')}
                  >Round Trip</button>
                </div>
              </div>
              <div>
                <Text variant="none" className="text-white/50 text-[0.65rem] uppercase tracking-widest mb-4 font-semibold">Vietnam E-Visa</Text>
                <div className="flex bg-white/5 border border-white/10 rounded-xl p-1.5 gap-1">
                  <button 
                    className={`flex-1 py-2.5 rounded-lg text-xs transition-all ${visaType === 'single' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/80'}`}
                    onClick={() => setVisaType('single')}
                  >Single</button>
                  <button 
                    className={`flex-1 py-2.5 rounded-lg text-xs transition-all ${visaType === 'multiple' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/80'}`}
                    onClick={() => setVisaType('multiple')}
                  >Multiple</button>
                </div>
              </div>
            </div>

            {/* Duration & Pax Sliders */}
            <div className="grid grid-cols-2 gap-6">
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
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <Heading as="h3" variant="none" className="text-brand-gold/70 uppercase tracking-[0.2em] text-xs font-semibold flex items-center gap-3">
              <Icon name="MapPin" size={16} /> Destinations
            </Heading>
            
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
              {TRIP_BUILDER_CITIES.map(city => {
                const isSelected = selectedCities.includes(city);
                return (
                  <label 
                    key={city} 
                    className={`relative overflow-hidden group flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all duration-300
                      ${isSelected ? 'bg-brand-gold/15 border-brand-gold/50 shadow-gold' : 'bg-white/5 border-white/10 hover:border-brand-gold/30 hover:bg-white/10'}`}
                  >
                    <input 
                      type="checkbox" 
                      checked={isSelected} 
                      onChange={() => toggleCity(city)}
                      className="hidden" 
                    />
                    <Text 
                      variant="none" 
                      className={`relative z-10 text-sm tracking-wide transition-colors duration-300 ${isSelected ? 'text-brand-gold-light font-medium' : 'text-white/80 font-light group-hover:text-white'}`}
                    >
                      {city}
                    </Text>
                  </label>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT: Estimate Receipt & Insights */}
        <div className="flex-1 md:flex-[0.5] p-10 bg-black/60 flex flex-col shadow-inner border-l border-white/5 rounded-none border-t-0 border-r-0 border-b-0 overflow-y-auto">
           
           {/* Smart Insights Panel */}
           <div className="mb-10 bg-brand-gold/5 border border-brand-gold/20 rounded-2xl p-6">
              <Heading as="h4" variant="none" className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-6 flex items-center gap-2">
                <Icon name="Lightbulb" size={16} /> Smart Insights
              </Heading>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <Text variant="none" className="text-white/40 text-[0.65rem] uppercase tracking-widest mb-1">📍 Suggested Route</Text>
                  <Text variant="none" className="text-white/90 text-sm">{suggestedRoute}</Text>
                </div>
                <div>
                  <Text variant="none" className="text-white/40 text-[0.65rem] uppercase tracking-widest mb-1">🍛 Food</Text>
                  <Text variant="none" className="text-white/90 text-sm">Rich culinary diversity</Text>
                </div>
                <div>
                  <Text variant="none" className="text-white/40 text-[0.65rem] uppercase tracking-widest mb-1">💰 Daily Budget</Text>
                  <Text variant="none" className="text-white/90 text-sm font-mono">₹{(estimate.dailyTotal / days).toLocaleString('en-IN')}</Text>
                </div>
                <div>
                  <Text variant="none" className="text-white/40 text-[0.65rem] uppercase tracking-widest mb-1">✨ Travel Vibe</Text>
                  <Text variant="none" className="text-white/90 text-sm capitalize">{style} Explorer</Text>
                </div>
              </div>
           </div>

           {/* Receipt */}
           <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden  shadow-inner before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-transparent before:via-brand-gold/50 before:to-transparent">
             <Heading as="h4" variant="none" className="text-brand-gold/80 uppercase tracking-widest text-[0.65rem] font-semibold mb-6 flex items-center gap-2">
               Real-time Estimate Receipt
             </Heading>
             
             <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center group">
                  <Text variant="none" className="text-white/60 text-sm font-light tracking-wide flex items-center gap-2"><Icon name="Plane" size={14} className="text-brand-gold/60"/> ✈ Flights ({flightType === 'round' ? 'Round Trip' : 'One Way'})</Text>
                  <Text variant="none" className="text-white/90 text-sm font-mono tracking-wider group-hover:text-brand-gold transition-colors">₹{estimate.flight.toLocaleString('en-IN')}</Text>
                </div>
                <div className="flex justify-between items-center group">
                  <Text variant="none" className="text-white/60 text-sm font-light tracking-wide flex items-center gap-2"><Icon name="FileText" size={14} className="text-brand-gold/60"/> 📄 E-Visa ({visaType === 'single' ? 'Single' : 'Multiple'} Entry)</Text>
                  <Text variant="none" className="text-white/90 text-sm font-mono tracking-wider group-hover:text-brand-gold transition-colors">₹{estimate.visa.toLocaleString('en-IN')}</Text>
                </div>
                <div className="flex justify-between items-center group mb-4">
                  <Text variant="none" className="text-white/60 text-sm font-light tracking-wide flex items-center gap-2">
                    <Icon name="Truck" size={14} className="text-brand-gold/60"/> 🚘 Transfers <span className="text-white/30 text-[0.55rem]">(T&C Apply)</span>
                  </Text>
                  <Text variant="none" className="text-white/90 text-sm font-mono tracking-wider group-hover:text-brand-gold transition-colors">₹{estimate.transfers.toLocaleString('en-IN')}</Text>
                </div>

                <Text variant="none" className="text-white/30 text-[0.6rem] uppercase tracking-widest font-semibold border-b border-white/5 pb-2 mb-2">Daily Costs Breakdown ({days} Days × {pax} Pax)</Text>
                
                <div className="flex justify-between items-center group">
                  <Text variant="none" className="text-white/50 text-sm font-light tracking-wide flex items-center gap-2 pl-4">🏨 Hotels</Text>
                  <Text variant="none" className="text-white/80 text-sm font-mono tracking-wider group-hover:text-brand-gold transition-colors">₹{estimate.hotels.toLocaleString('en-IN')}</Text>
                </div>
                <div className="flex justify-between items-center group">
                  <Text variant="none" className="text-white/50 text-sm font-light tracking-wide flex items-center gap-2 pl-4">🍛 Food</Text>
                  <Text variant="none" className="text-white/80 text-sm font-mono tracking-wider group-hover:text-brand-gold transition-colors">₹{estimate.food.toLocaleString('en-IN')}</Text>
                </div>
                <div className="flex justify-between items-center group">
                  <Text variant="none" className="text-white/50 text-sm font-light tracking-wide flex items-center gap-2 pl-4">🚕 Transport</Text>
                  <Text variant="none" className="text-white/80 text-sm font-mono tracking-wider group-hover:text-brand-gold transition-colors">₹{estimate.transport.toLocaleString('en-IN')}</Text>
                </div>
                <div className="flex justify-between items-center group">
                  <Text variant="none" className="text-white/50 text-sm font-light tracking-wide flex items-center gap-2 pl-4">🎟 Experiences</Text>
                  <Text variant="none" className="text-white/80 text-sm font-mono tracking-wider group-hover:text-brand-gold transition-colors">₹{estimate.experiences.toLocaleString('en-IN')}</Text>
                </div>
                
                <div className="mt-4 pt-6 border-t border-dashed border-white/20 flex justify-between items-end">
                  <Text variant="none" className="text-brand-gold uppercase tracking-[0.2em] text-xs font-semibold mb-1">Estimated Total</Text>
                  <Heading variant="none" as="div" className="text-4xl font-serif text-brand-gold-light">
                    ₹{estimate.total.toLocaleString('en-IN')}
                  </Heading>
                </div>
             </div>
             
             <Text variant="none" className="text-white/30 text-[0.6rem] leading-relaxed mt-6 text-center italic">
               Actual pricing may vary based on season, hotel selection, flight availability and travel style.<br/>
               Travel Gets Better with <BrandName />
             </Text>
           </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-6 border-t border-white/5 relative z-10 bg-black/50  flex flex-col md:flex-row gap-4 items-center shrink-0">
        <div className="flex-1 w-full relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-brand-gold flex items-center justify-center">
              <Icon name="Edit3" size={16} />
            </span>
            <input 
               type="text"
               value={notes}
               onChange={(e) => setNotes(e.target.value)}
               placeholder="Special requests? (e.g., Honeymoon, Halal food)"
               className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white text-sm outline-none focus:border-brand-gold/40 focus:bg-white/10 transition-all placeholder:text-white/30"
            />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {onOpenAIPlanner && (
            <Button 
               variant="glass"
               className="w-full sm:flex-1 md:flex-none px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold tracking-widest uppercase text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
               onClick={() => {
                 onClose();
                 const details = `I'd like to plan a trip with the following parameters:
- Destinations: ${selectedCities.length > 0 ? selectedCities.join(', ') : 'Not sure yet'}
- Style: ${style}
- Flight: ${flightType === 'round' ? 'Round Trip' : 'One Way'}
- Visa: ${visaType} entry
- Duration: ${days} Days
- Travelers: ${pax} People
- Special Notes: ${notes || 'None'}`;
                 onOpenAIPlanner(details);
               }}
            >
              <Icon name="Sparkles" size={18} /> Plan with AI
            </Button>
          )}

          <Button 
             className="w-full sm:flex-1 md:flex-none px-6 py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-green-extra-dark font-bold tracking-widest uppercase text-xs rounded-xl shadow-gold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
             onClick={sendToWhatsApp}
          >
            <Icon name="MessageCircle" size={18} /> Send to WhatsApp
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomTripBuilder;
