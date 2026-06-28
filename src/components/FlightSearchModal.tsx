import React, { useState } from 'react';
import Modal from './ui/Modal';
import { Heading, Text } from './ui/Typography';
import { useTranslation } from '../contexts/LanguageContext';
import { searchFlights, FlightRoute } from '../services/kiwiApi';
import Icon from './ui/Icon';

interface FlightSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FlightSearchModal: React.FC<FlightSearchModalProps> = ({ isOpen, onClose }) => {
  const { language } = useTranslation();
  
  // Default search values
  const [origin, setOrigin] = useState('DEL');
  const [destination, setDestination] = useState('SGN');
  
  // Set default date to 7 days in the future
  const [date, setDate] = useState(() => {
    const future = new Date();
    future.setDate(future.getDate() + 7);
    return future.toISOString().split('T')[0];
  });
  
  const [passengers, setPassengers] = useState(1);
  const [flights, setFlights] = useState<FlightRoute[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !date) {
      setError('Please fill in all search details.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSearched(true);
    
    try {
      const results = await searchFlights(origin, destination, date, passengers);
      setFlights(results);
    } catch (err) {
      setError('Failed to fetch flight schedules. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const popularCities = [
    { code: 'DEL', label: 'Delhi (DEL)' },
    { code: 'BOM', label: 'Mumbai (BOM)' },
    { code: 'BLR', label: 'Bangalore (BLR)' },
    { code: 'HAN', label: 'Hanoi (HAN)' },
    { code: 'SGN', label: 'Ho Chi Minh (SGN)' },
    { code: 'DAD', label: 'Da Nang (DAD)' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-4xl"
      className="p-8 bg-[#111111] border border-white/10"
    >
      <div className="flex flex-col gap-6 text-left">
        <div>
          <Heading
            as="h2"
            size="2xl"
            font="serif"
            className="text-brand-gold tracking-wide mb-2"
          >
            {language === 'HI' ? 'उड़ान खोजें' : language === 'VI' ? 'Tìm chuyến bay' : 'Search Flights'}
          </Heading>
          <Text size="sm" className="text-white/60">
            {language === 'HI' 
              ? 'वियतनाम के लिए सर्वोत्तम उड़ान दरें खोजें और सीधे एयरलाइन के साथ बुक करें।' 
              : language === 'VI' 
              ? 'Tìm giá vé máy bay tốt nhất đến Việt Nam và đặt vé trực tiếp với hãng hàng không.' 
              : 'Find the best flight rates to Vietnam and book directly with the airline.'}
          </Text>
        </div>

        {/* Search Panel */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/5 p-5 rounded-2xl border border-white/10">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/50 font-bold uppercase tracking-wider">From</label>
            <input
              type="text"
              placeholder="e.g. DEL or Delhi"
              value={origin}
              onChange={(e) => setOrigin(e.target.value.toUpperCase())}
              className="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold/50 placeholder-white/20 uppercase"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/50 font-bold uppercase tracking-wider">To</label>
            <input
              type="text"
              placeholder="e.g. SGN or Saigon"
              value={destination}
              onChange={(e) => setDestination(e.target.value.toUpperCase())}
              className="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold/50 placeholder-white/20 uppercase"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/50 font-bold uppercase tracking-wider">Departure Date</label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold/50 cursor-pointer"
              required
            />
          </div>

          <div className="flex flex-col gap-2 justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-gold hover:bg-brand-gold/90 text-black font-bold uppercase tracking-wider py-3 rounded-xl transition-all duration-300 shadow-lg shadow-brand-gold/25 hover:shadow-brand-gold/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Icon name="Search" size={16} />
                  Search Flights
                </>
              )}
            </button>
          </div>
        </form>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-white/40 font-bold uppercase tracking-wider mr-1">Popular:</span>
          {popularCities.map((city) => (
            <button
              key={city.code}
              type="button"
              onClick={() => {
                if (['DEL', 'BOM', 'BLR'].includes(city.code)) {
                  setOrigin(city.code);
                } else {
                  setDestination(city.code);
                }
              }}
              className="bg-white/5 border border-white/10 hover:border-brand-gold/40 text-white/80 hover:text-white px-3 py-1 rounded-full cursor-pointer transition-colors duration-250 font-medium"
            >
              {city.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Search Results */}
        <div className="flex flex-col gap-4 max-h-[380px] overflow-y-auto pr-1">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
              <Text size="sm" className="text-white/60 animate-pulse">
                Fetching real flight schedules and rates...
              </Text>
            </div>
          )}

          {!isLoading && searched && flights.length === 0 && (
            <div className="text-center py-12 text-white/50 border border-white/5 rounded-2xl">
              No flights found for the selected route or date. Please try another combination.
            </div>
          )}

          {!isLoading && flights.map((flight, idx) => (
            <div 
              key={idx} 
              className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 border border-white/10 hover:border-brand-gold/40 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/5"
            >
              {/* Airline Detail */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <img 
                  src={flight.airlineLogo} 
                  alt={flight.airlineName} 
                  className="w-12 h-12 rounded-xl object-cover border border-white/10 bg-white/5"
                />
                <div>
                  <Heading as="h4" size="md" className="font-semibold text-white">
                    {flight.airlineName}
                  </Heading>
                  <Text size="xs" className="text-white/40 font-mono tracking-wider">
                    {flight.flightNumber}
                  </Text>
                </div>
              </div>

              {/* Time info */}
              <div className="flex items-center justify-between md:justify-center gap-8 w-full md:w-auto text-center">
                <div>
                  <Heading as="h3" size="lg" className="font-bold text-white">
                    {flight.departureTime}
                  </Heading>
                  <Text size="xs" className="text-white/40 uppercase tracking-widest">
                    {origin}
                  </Text>
                </div>

                <div className="flex flex-col items-center min-w-[100px]">
                  <Text size="xs" className="text-brand-gold font-medium mb-1">
                    {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop`}
                  </Text>
                  <div className="relative w-full h-[2px] bg-white/10 my-1">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-gold" />
                  </div>
                  <Text size="xs" className="text-white/30 font-mono">
                    {flight.duration}
                  </Text>
                </div>

                <div>
                  <Heading as="h3" size="lg" className="font-bold text-white">
                    {flight.arrivalTime}
                  </Heading>
                  <Text size="xs" className="text-white/40 uppercase tracking-widest">
                    {destination}
                  </Text>
                </div>
              </div>

              {/* Price & Book */}
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                <div className="text-left md:text-right">
                  <Text size="xs" className="text-white/40 block">Price per traveler</Text>
                  <Heading as="h3" size="lg" className="font-bold text-brand-gold">
                    ₹{flight.price.toLocaleString('en-IN')}
                  </Heading>
                </div>
                <a 
                  href={flight.bookingUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-white/10 hover:bg-brand-gold hover:text-black border border-white/20 hover:border-transparent px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:shadow-lg hover:shadow-brand-gold/15"
                >
                  Book Flight
                  <Icon name="ExternalLink" size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/5 pt-4">
          <span>
            * Flight searches are powered by Kiwi Tequila flight feeds.
          </span>
          <span className="flex items-center gap-1">
            Redirecting to airline partner sites to complete booking.
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default FlightSearchModal;
