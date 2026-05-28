import React, { useState, useEffect } from 'react';
import { WHATSAPP_INDIA } from '../config';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { Heading, Text } from './ui/Typography';
import Card from './ui/Card';

interface CustomTripBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

const CITIES = [
  "Hanoi", "Sapa", "Halong Bay", "Ninh Binh", "Da Nang", "Hoi An", "Hue", "Nha Trang", "Da Lat", "Ho Chi Minh City", "Phu Quoc"
];

const CONSTANTS = { flight: 25000, visa: 2100 };
const RATES = { budget: 3300, comfort: 6500, luxury: 12000 };

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
    const flightTot = CONSTANTS.flight * pax;
    const visaTot = CONSTANTS.visa * pax;
    const hops = Math.max(0, selectedCities.length - 1);
    const transitTot = hops * 3000 * pax;
    const dailyTot = RATES[style] * days * pax;
    const total = flightTot + visaTot + transitTot + dailyTot;

    setEstimate({
      flight: flightTot,
      visa: visaTot,
      transit: transitTot,
      daily: dailyTot,
      total: total
    });
  }, [selectedCities, style, days, pax]);

  const toggleCity = (city: string) => {
    setSelectedCities(prev => 
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  const sendToWhatsApp = () => {
    const styleText = style === 'budget' ? 'Backpacker' : style === 'comfort' ? 'Comfort' : 'Luxury';
    let msg = `Hi VIETANA! I just built a custom trip on your website.\n\n`;
    msg += `*Details:*\n`;
    msg += `- Destinations: ${selectedCities.length > 0 ? selectedCities.join(', ') : 'Not selected'}\n`;
    msg += `- Style: ${styleText}\n`;
    msg += `- Duration: ${days} Days\n`;
    msg += `- Travelers: ${pax} ${pax === 1 ? 'Person' : 'People'}\n\n`;
    msg += `*Estimated Budget:* ₹${estimate.total.toLocaleString('en-IN')}\n`;
    
    if(notes.trim()) {
      msg += `\n*My Notes:*\n${notes}\n`;
    }
    
    msg += `\nCould you send me a detailed itinerary?`;
    
    window.open(`${WHATSAPP_INDIA}&text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      maxWidth="max-w-2xl"
      className="h-[90vh] max-h-[800px] flex flex-col p-0 border-brand-gold/20 shadow-deep"
    >
      <div className="p-8 md:p-12 pb-6 border-b border-white/5 bg-brand-green-extra-dark">
        <Heading as="h2" size="xl" variant="accent" className="mb-2">Build Your Trip</Heading>
        <Text variant="white" size="sm" className="opacity-50">Select your destinations and get a real-time estimate.</Text>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 md:p-12 flex flex-col gap-10 bg-brand-green-extra-dark/95 scrollbar-thin scrollbar-thumb-white/10">
        {/* Destinations Section */}
        <div>
          <Heading as="h3" size="xs" font="sans" className="text-white/40 uppercase mb-6 flex items-center gap-3">📍 Select Destinations</Heading>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CITIES.map(city => (
              <label 
                key={city} 
                className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all duration-300
                  ${selectedCities.includes(city) ? 'bg-brand-gold/15 border-brand-gold' : 'bg-white/5 border-white/10 hover:border-brand-gold/40 hover:bg-brand-gold/5'}`}
              >
                <input 
                  type="checkbox" 
                  checked={selectedCities.includes(city)} 
                  onChange={() => toggleCity(city)}
                  className="hidden" 
                />
                <Text 
                  size="sm" 
                  variant="none"
                  className={selectedCities.includes(city) ? 'text-brand-gold-light' : 'text-white/70'}
                >
                  {city}
                </Text>
              </label>
            ))}
          </div>
        </div>
        
        {/* Settings Section */}
        <Card variant="glass" padding="md" hover={false} className="border-brand-gold/20 bg-white/[0.02]">
          <Heading as="h3" size="xs" font="sans" className="text-white/40 uppercase mb-8">💰 Trip Settings & Estimate</Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col">
               <Text size="xs" variant="none" weight="bold" className="text-white/40 uppercase tracking-widest mb-4">Travel Style</Text>
               <div className="flex bg-white/5 rounded-xl p-1 gap-1">
                 {(['budget', 'comfort', 'luxury'] as const).map(s => (
                   <button 
                    key={s}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer
                      ${style === s ? 'bg-brand-gold text-brand-green-dark shadow-medium' : 'bg-transparent text-white/50 hover:text-white'}`} 
                    onClick={() => setStyle(s)}
                   >
                     {s.charAt(0).toUpperCase() + s.slice(1)}
                   </button>
                 ))}
               </div>
            </div>
            <div className="flex flex-col gap-6">
               <div className="flex flex-col gap-3">
                 <Text size="xs" variant="none" weight="bold" className="text-white/40 uppercase tracking-widest flex justify-between">
                   Duration <span className="text-brand-gold">{days} Days</span>
                 </Text>
                 <input type="range" min="3" max="30" value={days} onChange={(e) => setDays(parseInt(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-brand-gold [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-brand-green-dark" />
               </div>
               
               <div className="flex flex-col gap-3">
                 <Text size="xs" variant="none" weight="bold" className="text-white/40 uppercase tracking-widest flex justify-between">
                   Travelers <span className="text-brand-gold">{pax} {pax === 1 ? 'Person' : 'People'}</span>
                 </Text>
                 <input type="range" min="1" max="10" value={pax} onChange={(e) => setPax(parseInt(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-brand-gold [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-brand-green-dark" />
               </div>
            </div>
          </div>
          
          <div className="bg-black/40 rounded-lg p-6 flex flex-col gap-3.5">
             <div className="flex justify-between">
               <Text size="sm" variant="subtle">✈️ Flights (India ↔ VN)</Text>
               <Text size="sm" variant="white" weight="semibold">₹{estimate.flight.toLocaleString('en-IN')}</Text>
             </div>
             <div className="flex justify-between">
               <Text size="sm" variant="subtle">🛂 E-Visa</Text>
               <Text size="sm" variant="white" weight="semibold">₹{estimate.visa.toLocaleString('en-IN')}</Text>
             </div>
             <div className="flex justify-between">
               <Text size="sm" variant="subtle" className="flex items-center gap-1.5">
                 🚄 Inter-city Transit 
                 <Text size="xs" variant="none" className="text-brand-gold opacity-70 inline">(₹3k/hop)</Text>
               </Text>
               <Text size="sm" variant="white" weight="semibold">₹{estimate.transit.toLocaleString('en-IN')}</Text>
             </div>
             <div className="flex justify-between">
               <Text size="sm" variant="subtle">🏨 Daily Expenses</Text>
               <Text size="sm" variant="white" weight="semibold">₹{estimate.daily.toLocaleString('en-IN')}</Text>
             </div>
             <div className="mt-2.5 pt-5 border-t border-white/10 flex justify-between items-center">
               <Text variant="none" weight="medium" className="text-brand-gold">Total Estimate</Text>
               <Heading size="xl" font="serif" variant="accent" weight="bold">₹{estimate.total.toLocaleString('en-IN')}</Heading>
             </div>
          </div>
        </Card>
        
        {/* Notes Section */}
        <div>
          <Heading as="h3" size="xs" font="sans" className="text-white/40 uppercase mb-5">📝 Additional Notes</Heading>
          <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us about special requests, dietary restrictions, preferred flight cities, etc..." 
              className="w-full h-24 bg-white/5 border border-white/10 rounded-lg p-4 text-white text-sm font-light resize-none focus:border-brand-gold focus:outline-none transition-colors"
          />
        </div>
      </div>
      
      <div className="p-8 md:p-10 bg-brand-green-extra-dark border-t border-white/5">
        <Button 
          className="w-full py-4 font-bold" 
          onClick={sendToWhatsApp}
          icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.333.158 11.893c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.332 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/></svg>}
        >
          Send Custom Trip to WhatsApp
        </Button>
      </div>
    </Modal>
  );
};

export default CustomTripBuilder;
