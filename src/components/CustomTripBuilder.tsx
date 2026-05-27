import React, { useState, useEffect } from 'react';
import { WHATSAPP_INDIA } from '../config';
import './CustomTripBuilder.css';

interface CustomTripBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

const CITIES = [
  "Hanoi", "Sapa", "Halong Bay", "Ninh Binh", "Da Nang", "Hoi An", "Hue", "Nha Trang", "Da Lat", "Ho Chi Minh City", "Phu Quoc"
];

// Based on production snippet: ₹4,200 for 2 pax = ₹2,100/pax
// Daily for 2 pax, 7 days, budget style = ₹46,200 => ₹3,300/pax/day
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

  if (!isOpen) return null;

  return (
    <div className="ct-modal-overlay show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ct-modal">
        <button className="ct-modal-close" onClick={onClose}>×</button>
        <div className="ct-modal-header">
          <h2>Build Your Trip</h2>
          <p>Select your destinations and get a real-time estimate.</p>
        </div>
        
        <div className="ct-modal-body">
          {/* Destinations Section */}
          <div className="ct-section">
            <h3>📍 Select Destinations</h3>
            <div className="ct-city-grid">
              {CITIES.map(city => (
                <label key={city} className={`ct-city-btn ${selectedCities.includes(city) ? 'active' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={selectedCities.includes(city)} 
                    onChange={() => toggleCity(city)}
                    className="ct-city-chk" 
                  />
                  <span>{city}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Calculator Section */}
          <div className="ct-section calc-container">
            <h3>💰 Trip Settings & Estimate</h3>
            <div className="ct-settings-grid">
              <div className="ct-setting">
                 <label>Travel Style</label>
                 <div className="bc-toggle-group">
                   <button className={`bc-toggle ${style === 'budget' ? 'active' : ''}`} onClick={() => setStyle('budget')}>Backpacker</button>
                   <button className={`bc-toggle ${style === 'comfort' ? 'active' : ''}`} onClick={() => setStyle('comfort')}>Comfort</button>
                   <button className={`bc-toggle ${style === 'luxury' ? 'active' : ''}`} onClick={() => setStyle('luxury')}>Luxury</button>
                 </div>
              </div>
              <div className="ct-setting">
                 <label>Duration: <span className="highlight">{days} Days</span></label>
                 <input type="range" min="3" max="30" value={days} onChange={(e) => setDays(parseInt(e.target.value))} className="bc-slider ct-slider" />
                 
                 <label style={{ marginTop: '1rem' }}>Travelers: <span className="highlight">{pax} {pax === 1 ? 'Person' : 'People'}</span></label>
                 <input type="range" min="1" max="10" value={pax} onChange={(e) => setPax(parseInt(e.target.value))} className="bc-slider ct-slider" />
              </div>
            </div>
            
            <div className="ct-estimate-box">
               <div className="est-line">
                 <span>✈️ Flights (India ↔ VN)</span>
                 <span>₹{estimate.flight.toLocaleString('en-IN')}</span>
               </div>
               <div className="est-line">
                 <span>🛂 E-Visa</span>
                 <span>₹{estimate.visa.toLocaleString('en-IN')}</span>
               </div>
               <div className="est-line">
                 <span>🚄 Inter-city Transit <small>(₹3,000/hop - exact API coming soon)</small></span>
                 <span>₹{estimate.transit.toLocaleString('en-IN')}</span>
               </div>
               <div className="est-line">
                 <span>🏨 Daily Expenses</span>
                 <span>₹{estimate.daily.toLocaleString('en-IN')}</span>
               </div>
               <div className="est-total">
                 <span>Total Estimate</span>
                 <span>₹{estimate.total.toLocaleString('en-IN')}</span>
               </div>
            </div>
          </div>
          
          {/* Notes Section */}
          <div className="ct-section">
            <h3>📝 Additional Notes</h3>
            <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell us about special requests, dietary restrictions, preferred flight cities, etc..." 
            />
          </div>
        </div>
        
        <div className="ct-modal-footer">
          <button className="bc-cta" onClick={sendToWhatsApp}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.333.158 11.893c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.332 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/></svg>
            Send Custom Trip to WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTripBuilder;
