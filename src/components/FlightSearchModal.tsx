import React, { useState, useEffect, useRef } from 'react';
import Modal from './ui/Modal';
import { Heading, Text } from './ui/Typography';
import { useTranslation } from '../contexts/LanguageContext';
import { searchFlights, getAirportSuggestions, FlightRoute, AirportOption, SearchParams } from '../services/kiwiApi';
import Icon from './ui/Icon';

interface FlightSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FlightSearchModal: React.FC<FlightSearchModalProps> = ({ isOpen, onClose }) => {
  const { language } = useTranslation();

  // Search parameters states
  const [tripType, setTripType] = useState<'oneway' | 'round'>('oneway');
  const [originInput, setOriginInput] = useState('Delhi (DEL)');
  const [originCode, setOriginCode] = useState('DEL');
  const [originSuggestions, setOriginSuggestions] = useState<AirportOption[]>([]);
  
  const [destInput, setDestInput] = useState('Ho Chi Minh City (SGN)');
  const [destCode, setDestCode] = useState('SGN');
  const [destSuggestions, setDestSuggestions] = useState<AirportOption[]>([]);
  
  const [departureDate, setDepartureDate] = useState(() => {
    const future = new Date();
    future.setDate(future.getDate() + 7);
    return future.toISOString().split('T')[0];
  });
  
  const [returnDate, setReturnDate] = useState(() => {
    const future = new Date();
    future.setDate(future.getDate() + 14);
    return future.toISOString().split('T')[0];
  });

  // Passengers splits
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  
  const [cabinClass, setCabinClass] = useState<'M' | 'W' | 'C' | 'F'>('M');
  const [sort, setSort] = useState<'price' | 'duration'>('price');
  
  // Results, loading, and display states
  const [flights, setFlights] = useState<FlightRoute[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  // Local filter states
  const [filterDirectOnly, setFilterDirectOnly] = useState(false);

  const passengerRef = useRef<HTMLDivElement>(null);

  // Close passenger dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (passengerRef.current && !passengerRef.current.contains(e.target as Node)) {
        setShowPassengerDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Fetch suggestions for Origin
  const handleOriginChange = async (val: string) => {
    setOriginInput(val);
    if (val.length >= 2) {
      const sugs = await getAirportSuggestions(val);
      setOriginSuggestions(sugs);
    } else {
      setOriginSuggestions([]);
    }
  };

  // Fetch suggestions for Destination
  const handleDestChange = async (val: string) => {
    setDestInput(val);
    if (val.length >= 2) {
      const sugs = await getAirportSuggestions(val);
      setDestSuggestions(sugs);
    } else {
      setDestSuggestions([]);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originCode || !destCode || !departureDate) {
      setError('Please fill in correct city details.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSearched(true);
    
    const params: SearchParams = {
      origin: originCode,
      destination: destCode,
      departureDate,
      returnDate: tripType === 'round' ? returnDate : undefined,
      tripType,
      adults,
      children,
      infants,
      cabinClass,
      sort
    };

    try {
      const results = await searchFlights(params);
      setFlights(results);
    } catch (err) {
      setError('Failed to fetch flight schedules. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger search again if sorting changes after search
  useEffect(() => {
    if (searched) {
      const triggerSortReload = async () => {
        const params: SearchParams = {
          origin: originCode,
          destination: destCode,
          departureDate,
          returnDate: tripType === 'round' ? returnDate : undefined,
          tripType,
          adults,
          children,
          infants,
          cabinClass,
          sort
        };
        try {
          const results = await searchFlights(params);
          setFlights(results);
        } catch (e) {
          console.error(e);
        }
      };
      triggerSortReload();
    }
  }, [sort]);

  const cabinLabels = {
    M: 'Economy',
    W: 'Premium Economy',
    C: 'Business',
    F: 'First Class'
  };

  // Filtered flights (Client-side filters)
  const displayedFlights = flights.filter(
    (f) => !filterDirectOnly || f.stops === 0
  );

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
            {language === 'HI' ? 'प्रीमियम उड़ान खोज' : language === 'VI' ? 'Tìm chuyến bay cao cấp' : 'Premium Flight Search'}
          </Heading>
          <Text size="sm" className="text-white/60">
            {language === 'HI' 
              ? 'वियतनाम के लिए सर्वोत्तम उड़ान दरें खोजें और सीधे एयरलाइन के साथ बुक करें।' 
              : language === 'VI' 
              ? 'Tìm giá vé máy bay tốt nhất đến Việt Nam và đặt vé trực tiếp với hãng hàng không.' 
              : 'Find the best flight rates to Vietnam and book directly with the airline.'}
          </Text>
        </div>

        {/* Global Search Config Panel */}
        <form onSubmit={handleSearch} className="flex flex-col gap-4 bg-white/5 p-6 rounded-3xl border border-white/10">
          
          {/* Trip Type & Cabin Class Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
            {/* Trip Type Selector */}
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setTripType('oneway')}
                className={`px-4 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${tripType === 'oneway' ? 'bg-brand-gold text-black shadow-md' : 'text-white/60 hover:text-white'}`}
              >
                One Way
              </button>
              <button
                type="button"
                onClick={() => setTripType('round')}
                className={`px-4 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${tripType === 'round' ? 'bg-brand-gold text-black shadow-md' : 'text-white/60 hover:text-white'}`}
              >
                Round Trip
              </button>
            </div>

            {/* Cabin Class Selector */}
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 text-xs font-semibold">
              {(['M', 'W', 'C', 'F'] as const).map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setCabinClass(cls)}
                  className={`px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${cabinClass === cls ? 'bg-brand-gold text-black shadow-md' : 'text-white/60 hover:text-white'}`}
                >
                  {cabinLabels[cls]}
                </button>
              ))}
            </div>
          </div>

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Origin Autocomplete Input */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-xs text-white/50 font-bold uppercase tracking-wider">From</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Origin city/airport"
                  value={originInput}
                  onChange={(e) => handleOriginChange(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold/50 placeholder-white/20"
                  required
                />
                {originSuggestions.length > 0 && (
                  <div className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-[#1c1c1c] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[300]">
                    {originSuggestions.map((sug) => (
                      <button
                        key={sug.code}
                        type="button"
                        onClick={() => {
                          setOriginInput(`${sug.city} (${sug.code})`);
                          setOriginCode(sug.code);
                          setOriginSuggestions([]);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-brand-gold/10 text-white/90 hover:text-white border-b border-white/5 text-xs transition-colors duration-200"
                      >
                        <span className="font-bold text-brand-gold">{sug.code}</span> - {sug.city}, {sug.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Destination Autocomplete Input */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-xs text-white/50 font-bold uppercase tracking-wider">To</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Destination city/airport"
                  value={destInput}
                  onChange={(e) => handleDestChange(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold/50 placeholder-white/20"
                  required
                />
                {destSuggestions.length > 0 && (
                  <div className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-[#1c1c1c] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[300]">
                    {destSuggestions.map((sug) => (
                      <button
                        key={sug.code}
                        type="button"
                        onClick={() => {
                          setDestInput(`${sug.city} (${sug.code})`);
                          setDestCode(sug.code);
                          setDestSuggestions([]);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-brand-gold/10 text-white/90 hover:text-white border-b border-white/5 text-xs transition-colors duration-200"
                      >
                        <span className="font-bold text-brand-gold">{sug.code}</span> - {sug.city}, {sug.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Departure / Return Date Pickers */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/50 font-bold uppercase tracking-wider">
                {tripType === 'round' ? 'Departure - Return Dates' : 'Departure Date'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={departureDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-brand-gold/50 cursor-pointer text-xs"
                  required
                />
                {tripType === 'round' ? (
                  <input
                    type="date"
                    value={returnDate}
                    min={departureDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-brand-gold/50 cursor-pointer text-xs"
                    required
                  />
                ) : (
                  <div className="w-full bg-black/20 border border-white/5 text-white/20 rounded-xl px-3 py-3 text-xs flex items-center justify-center select-none font-bold">
                    One Way
                  </div>
                )}
              </div>
            </div>

            {/* Passenger Dropdown Selector */}
            <div className="flex flex-col gap-2 relative" ref={passengerRef}>
              <label className="text-xs text-white/50 font-bold uppercase tracking-wider">Travelers</label>
              <button
                type="button"
                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-left text-white focus:outline-none focus:border-brand-gold/50 flex items-center justify-between text-sm cursor-pointer"
              >
                <span>
                  {adults + children + infants} Traveler{adults + children + infants > 1 ? 's' : ''}
                </span>
                <Icon name="ChevronDown" size={14} className="opacity-50" />
              </button>

              {showPassengerDropdown && (
                <div className="absolute top-[calc(100%+0.5rem)] right-0 w-64 bg-[#1c1c1c] border border-white/10 rounded-2xl p-4 shadow-2xl z-[300] flex flex-col gap-4 text-xs">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white/90">Adults</p>
                      <p className="text-[10px] text-white/40">Age 12+</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        disabled={adults <= 1}
                        onClick={() => setAdults(adults - 1)}
                        className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold cursor-pointer disabled:opacity-30"
                      >
                        -
                      </button>
                      <span className="font-bold min-w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white/90">Children</p>
                      <p className="text-[10px] text-white/40">Age 2-11</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        disabled={children <= 0}
                        onClick={() => setChildren(children - 1)}
                        className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold cursor-pointer disabled:opacity-30"
                      >
                        -
                      </button>
                      <span className="font-bold min-w-4 text-center">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(children + 1)}
                        className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white/90">Infants</p>
                      <p className="text-[10px] text-white/40">Under 2 (on lap)</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        disabled={infants <= 0}
                        onClick={() => setInfants(infants - 1)}
                        className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold cursor-pointer disabled:opacity-30"
                      >
                        -
                      </button>
                      <span className="font-bold min-w-4 text-center">{infants}</span>
                      <button
                        type="button"
                        onClick={() => setInfants(infants + 1)}
                        className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end border-t border-white/5 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-brand-gold hover:bg-brand-gold/90 text-black font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-brand-gold/25 hover:shadow-brand-gold/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Searching Live Flights...
                </>
              ) : (
                <>
                  <Icon name="Search" size={16} />
                  Find Flights
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Filters and Sorting Controls */}
        {searched && !isLoading && flights.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 border border-white/10 px-5 py-3.5 rounded-2xl">
            {/* Filter */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-white/80 select-none">
              <input
                type="checkbox"
                checked={filterDirectOnly}
                onChange={(e) => setFilterDirectOnly(e.target.checked)}
                className="w-4 h-4 rounded border-white/10 bg-blackaccent text-brand-gold focus:ring-0 cursor-pointer"
              />
              Direct Flights Only
            </label>

            {/* Sort */}
            <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
              <span>Sort by:</span>
              <button
                type="button"
                onClick={() => setSort('price')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${sort === 'price' ? 'bg-brand-gold border-transparent text-black' : 'border-white/10 hover:border-white/20'}`}
              >
                Price (Cheapest)
              </button>
              <button
                type="button"
                onClick={() => setSort('duration')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${sort === 'duration' ? 'bg-brand-gold border-transparent text-black' : 'border-white/10 hover:border-white/20'}`}
              >
                Duration (Fastest)
              </button>
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto pr-1">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
              <Text size="sm" className="text-white/60 animate-pulse">
                Fetching real flight schedules and rates...
              </Text>
            </div>
          )}

          {!isLoading && searched && displayedFlights.length === 0 && (
            <div className="text-center py-12 text-white/50 border border-white/5 rounded-2xl">
              No flights found matching the filters. Please try checking another route.
            </div>
          )}

          {!isLoading && displayedFlights.map((flight, idx) => (
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
                    {originCode}
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
                    {destCode}
                  </Text>
                </div>
              </div>

              {/* Price & Book */}
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                <div className="text-left md:text-right">
                  <Text size="xs" className="text-white/40 block">Total Price</Text>
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
                  Book Search
                  <Icon name="ExternalLink" size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/5 pt-4">
          <span>
            * Dynamic locations resolved via Kiwi API.
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
