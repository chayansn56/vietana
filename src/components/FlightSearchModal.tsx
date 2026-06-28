import React, { useState, useEffect, useRef } from 'react';
import Modal from './ui/Modal';
import { Heading, Text } from './ui/Typography';
import { useTranslation } from '../contexts/LanguageContext';
import { useFlightSearch } from '../hooks/useFlightSearch';
import { searchFlights, getAirportSuggestions, FlightRoute, AirportOption, SearchParams } from '../services/kiwiApi';
import Icon from './ui/Icon';
import { flightApiConfig } from '../config/travelpayouts';

interface FlightSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_AIRPORTS_RESOLVER = [
  { code: 'DEL', city: 'Delhi', name: 'Indira Gandhi International Airport' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj Airport' },
  { code: 'BLR', city: 'Bangalore', name: 'Kempegowda International Airport' },
  { code: 'HAN', city: 'Hanoi', name: 'Noi Bai International Airport' },
  { code: 'SGN', city: 'Ho Chi Minh City', name: 'Tan Son Nhat International Airport' },
  { code: 'DAD', city: 'Da Nang', name: 'Da Nang International Airport' },
  { code: 'PQC', city: 'Phu Quoc', name: 'Phu Quoc International Airport' }
];

const FlightSearchModal: React.FC<FlightSearchModalProps> = ({ isOpen, onClose }) => {
  const { language } = useTranslation();

  // Search parameters states
  const { state, actions } = useFlightSearch();

  const {
    tripType, originInput, originCode, originSuggestions, destInput, destCode, destSuggestions,
    departureDate, returnDate, adults, children, infants, showPassengerDropdown,
    cabinClass, sort, flights, isLoading, searched, error, filterDirectOnly
  } = state;

  const {
    setTripType, setOriginInput, setOriginCode, setOriginSuggestions, setDestInput, setDestCode, setDestSuggestions,
    setDepartureDate, setReturnDate, setAdults, setChildren, setInfants, setShowPassengerDropdown,
    setCabinClass, setSort, setFlights, setIsLoading, setSearched, setError, setFilterDirectOnly,
    handleSwap, handleOriginChange, handleDestChange, performSearch, getAirportCodeFromInput
  } = actions;

  const cabinLabels: Record<'M' | 'W' | 'C' | 'F', string> = {
    'M': 'Economy',
    'W': 'Premium Economy',
    'C': 'Business',
    'F': 'First'
  };

  const displayedFlights = flights.filter(f => !filterDirectOnly || f.stops === 0);

  const passengerRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (passengerRef.current && !passengerRef.current.contains(e.target as Node)) {
        setShowPassengerDropdown(false);
      }
      if (originRef.current && !originRef.current.contains(e.target as Node)) {
        setOriginSuggestions([]);
      }
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setDestSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await performSearch();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-4xl"
      className="p-8 bg-surface-cream border border-[#E8E4D9] text-text-dark"
    >
      <div className="flex flex-col gap-6 text-left">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Heading
              as="h2"
              size="2xl"
              font="serif"
              className="text-brand-green tracking-wide mb-2 flex items-center gap-3"
            >
              {language === 'HI' ? 'प्रीमियम उड़ान खोज' : language === 'VI' ? 'Tìm chuyến bay cao cấp' : 'Premium Flight Search'}
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${flightApiConfig.kiwiApiKey
                ? 'bg-green-500/10 text-green-600 border-green-500/30'
                : 'bg-orange-500/10 text-orange-600 border-orange-500/30'
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${flightApiConfig.kiwiApiKey ? 'bg-green-600 animate-pulse' : 'bg-orange-500'}`} />
                {flightApiConfig.kiwiApiKey ? 'Live Feed' : 'Demo Mode'}
              </span>
            </Heading>
            <Text size="sm" className="text-text-subtle/85">
              {language === 'HI'
                ? 'वियतनाम के लिए सर्वोत्तम उड़ान दरें खोजें और सीधे एयरलाइन के साथ बुक करें।'
                : language === 'VI'
                  ? 'Tìm giá vé máy bay tốt nhất đến Việt Nam và đặt vé trực tiếp với hãng hàng không.'
                  : 'Find the best flight rates to Vietnam and book directly with the airline.'}
            </Text>
          </div>
        </div>

        {/* Global Search Config Panel */}
        <form onSubmit={handleSearch} className="flex flex-col gap-4 bg-white p-6 rounded-3xl border border-[#E8E4D9]">

          {/* Trip Type & Cabin Class Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E4D9] pb-4">
            {/* Trip Type Selector */}
            <div className="flex bg-[#FAF7F0] p-1 rounded-xl border border-[#E8E4D9] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setTripType('oneway')}
                className={`px-4 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${tripType === 'oneway' ? 'bg-brand-green text-white shadow-md' : 'text-brand-green/60 hover:text-brand-green'}`}
              >
                One Way
              </button>
              <button
                type="button"
                onClick={() => setTripType('round')}
                className={`px-4 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${tripType === 'round' ? 'bg-brand-green text-white shadow-md' : 'text-brand-green/60 hover:text-brand-green'}`}
              >
                Round Trip
              </button>
            </div>

            {/* Cabin Class Selector */}
            <div className="flex bg-[#FAF7F0] p-1 rounded-xl border border-[#E8E4D9] text-xs font-semibold">
              {(['M', 'W', 'C', 'F'] as const).map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setCabinClass(cls)}
                  className={`px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${cabinClass === cls ? 'bg-brand-green text-white shadow-md' : 'text-brand-green/60 hover:text-brand-green'}`}
                >
                  {cabinLabels[cls]}
                </button>
              ))}
            </div>
          </div>

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">

            {/* Swap Button (Absolute Positioned between columns on desktop) */}
            <button
              type="button"
              onClick={handleSwap}
              className="absolute left-[23.5%] top-[55%] -translate-y-1/2 z-50 w-8 h-8 rounded-full bg-brand-green text-white hover:bg-brand-gold hover:text-black flex items-center justify-center border border-surface-cream hover:scale-110 transition-transform cursor-pointer hidden md:flex shadow-lg"
              title="Swap Cities"
            >
              <Icon name="ArrowLeftRight" size={14} />
            </button>

            {/* Origin Autocomplete Input */}
            <div className="flex flex-col gap-2 relative" ref={originRef}>
              <label className="text-xs text-brand-green/70 font-bold uppercase tracking-wider">From</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Origin city/airport"
                  value={originInput}
                  onChange={(e) => handleOriginChange(e.target.value)}
                  className="w-full bg-white border border-[#E8E4D9] rounded-xl px-4 py-3 text-text-dark focus:outline-none focus:border-brand-green placeholder-black/20"
                  required
                />
                {originSuggestions.length > 0 && (
                  <div className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white border border-[#E8E4D9] rounded-xl overflow-hidden shadow-2xl z-[300]">
                    {originSuggestions.map((sug) => (
                      <button
                        key={sug.code}
                        type="button"
                        onClick={() => {
                          setOriginInput(`${sug.city} (${sug.code})`);
                          setOriginCode(sug.code);
                          setOriginSuggestions([]);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-[#FAF7F0] text-text-dark border-b border-[#E8E4D9]/50 text-xs transition-colors duration-200"
                      >
                        <span className="font-bold text-brand-green">{sug.code}</span> - {sug.city}, {sug.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Destination Autocomplete Input */}
            <div className="flex flex-col gap-2 relative" ref={destRef}>
              <label className="text-xs text-brand-green/70 font-bold uppercase tracking-wider">To</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Destination city/airport"
                  value={destInput}
                  onChange={(e) => handleDestChange(e.target.value)}
                  className="w-full bg-white border border-[#E8E4D9] rounded-xl px-4 py-3 text-text-dark focus:outline-none focus:border-brand-green placeholder-black/20"
                  required
                />
                {destSuggestions.length > 0 && (
                  <div className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white border border-[#E8E4D9] rounded-xl overflow-hidden shadow-2xl z-[300]">
                    {destSuggestions.map((sug) => (
                      <button
                        key={sug.code}
                        type="button"
                        onClick={() => {
                          setDestInput(`${sug.city} (${sug.code})`);
                          setDestCode(sug.code);
                          setDestSuggestions([]);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-[#FAF7F0] text-text-dark border-b border-[#E8E4D9]/50 text-xs transition-colors duration-200"
                      >
                        <span className="font-bold text-brand-green">{sug.code}</span> - {sug.city}, {sug.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Departure / Return Date Pickers */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-brand-green/70 font-bold uppercase tracking-wider">
                {tripType === 'round' ? 'Departure - Return Dates' : 'Departure Date'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={departureDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full bg-white border border-[#E8E4D9] rounded-xl px-3 py-3 text-text-dark focus:outline-none focus:border-brand-green cursor-pointer text-xs"
                  required
                />
                {tripType === 'round' ? (
                  <input
                    type="date"
                    value={returnDate}
                    min={departureDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-white border border-[#E8E4D9] rounded-xl px-3 py-3 text-text-dark focus:outline-none focus:border-brand-green cursor-pointer text-xs"
                    required
                  />
                ) : (
                  <div className="w-full bg-[#FAF7F0] border border-[#E8E4D9]/50 text-brand-green/30 rounded-xl px-3 py-3 text-xs flex items-center justify-center select-none font-bold">
                    One Way
                  </div>
                )}
              </div>
            </div>

            {/* Passenger Dropdown Selector */}
            <div className="flex flex-col gap-2 relative" ref={passengerRef}>
              <label className="text-xs text-brand-green/70 font-bold uppercase tracking-wider">Travelers</label>
              <button
                type="button"
                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                className="w-full bg-white border border-[#E8E4D9] rounded-xl px-4 py-3 text-left text-text-dark focus:outline-none focus:border-brand-green flex items-center justify-between text-sm cursor-pointer"
              >
                <span>
                  {adults + children + infants} Traveler{adults + children + infants > 1 ? 's' : ''}
                </span>
                <Icon name="ChevronDown" size={14} className="opacity-50" />
              </button>

              {showPassengerDropdown && (
                <div className="absolute top-[calc(100%+0.5rem)] right-0 w-64 bg-white border border-[#E8E4D9] rounded-2xl p-4 shadow-2xl z-[300] flex flex-col gap-4 text-xs">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-brand-green">Adults</p>
                      <p className="text-[10px] text-text-subtle/60">Age 12+</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        disabled={adults <= 1}
                        onClick={() => setAdults(adults - 1)}
                        className="w-6 h-6 rounded-full bg-[#FAF7F0] hover:bg-[#E8E4D9] text-brand-green flex items-center justify-center font-bold cursor-pointer disabled:opacity-30 border border-[#E8E4D9]"
                      >
                        -
                      </button>
                      <span className="font-bold min-w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="w-6 h-6 rounded-full bg-[#FAF7F0] hover:bg-[#E8E4D9] text-brand-green flex items-center justify-center font-bold cursor-pointer border border-[#E8E4D9]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-brand-green">Children</p>
                      <p className="text-[10px] text-text-subtle/60">Age 2-11</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        disabled={children <= 0}
                        onClick={() => setChildren(children - 1)}
                        className="w-6 h-6 rounded-full bg-[#FAF7F0] hover:bg-[#E8E4D9] text-brand-green flex items-center justify-center font-bold cursor-pointer disabled:opacity-30 border border-[#E8E4D9]"
                      >
                        -
                      </button>
                      <span className="font-bold min-w-4 text-center">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(children + 1)}
                        className="w-6 h-6 rounded-full bg-[#FAF7F0] hover:bg-[#E8E4D9] text-brand-green flex items-center justify-center font-bold cursor-pointer border border-[#E8E4D9]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-brand-green">Infants</p>
                      <p className="text-[10px] text-text-subtle/60">Under 2 (on lap)</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        disabled={infants <= 0}
                        onClick={() => setInfants(infants - 1)}
                        className="w-6 h-6 rounded-full bg-[#FAF7F0] hover:bg-[#E8E4D9] text-brand-green flex items-center justify-center font-bold cursor-pointer disabled:opacity-30 border border-[#E8E4D9]"
                      >
                        -
                      </button>
                      <span className="font-bold min-w-4 text-center">{infants}</span>
                      <button
                        type="button"
                        onClick={() => setInfants(infants + 1)}
                        className="w-6 h-6 rounded-full bg-[#FAF7F0] hover:bg-[#E8E4D9] text-brand-green flex items-center justify-center font-bold cursor-pointer border border-[#E8E4D9]"
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
          <div className="flex items-center justify-end border-t border-[#E8E4D9] pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-brand-green hover:bg-brand-green/90 text-white font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-brand-green/15 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
          <div className="bg-red-500/10 border border-red-500/30 text-red-600 p-4 rounded-xl text-sm font-semibold">
            {error}
          </div>
        )}

        {/* Filters and Sorting Controls */}
        {searched && !isLoading && flights.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-[#E8E4D9] px-5 py-3.5 rounded-2xl">
            {/* Filter */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-green select-none">
              <input
                type="checkbox"
                checked={filterDirectOnly}
                onChange={(e) => setFilterDirectOnly(e.target.checked)}
                className="w-4 h-4 rounded border-[#E8E4D9] bg-white text-brand-green focus:ring-0 cursor-pointer"
              />
              Direct Flights Only
            </label>

            {/* Sort */}
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-green/80">
              <span>Sort by:</span>
              <button
                type="button"
                onClick={() => setSort('price')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${sort === 'price' ? 'bg-brand-green border-transparent text-white' : 'border-[#E8E4D9] text-brand-green/60 hover:border-brand-green/40 hover:text-brand-green'}`}
              >
                Price (Cheapest)
              </button>
              <button
                type="button"
                onClick={() => setSort('duration')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${sort === 'duration' ? 'bg-brand-green border-transparent text-white' : 'border-[#E8E4D9] text-brand-green/60 hover:border-brand-green/40 hover:text-brand-green'}`}
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
              <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
              <Text size="sm" className="text-brand-green/60 animate-pulse">
                Fetching real flight schedules and rates...
              </Text>
            </div>
          )}

          {!isLoading && searched && displayedFlights.length === 0 && (
            <div className="text-center py-12 text-text-subtle/50 border border-[#E8E4D9] rounded-2xl">
              No flights found matching the filters. Please try checking another route.
            </div>
          )}

          {!isLoading && displayedFlights.map((flight, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-[#E8E4D9] hover:border-brand-green rounded-2xl p-5 transition-all duration-300 hover:shadow-xl"
            >
              {/* Airline Detail */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <img
                  src={flight.airlineLogo}
                  alt={flight.airlineName}
                  className="w-12 h-12 rounded-xl object-cover border border-[#E8E4D9] bg-surface-cream"
                />
                <div>
                  <Heading as="h4" size="md" className="font-semibold text-brand-green">
                    {flight.airlineName}
                  </Heading>
                  <Text size="xs" className="text-text-subtle/60 font-mono tracking-wider">
                    {flight.flightNumber}
                  </Text>
                </div>
              </div>

              {/* Time info */}
              <div className="flex items-center justify-between md:justify-center gap-8 w-full md:w-auto text-center">
                <div>
                  <Heading as="h3" size="lg" className="font-bold text-brand-green">
                    {flight.departureTime}
                  </Heading>
                  <Text size="xs" className="text-text-subtle/50 uppercase tracking-widest">
                    {originCode}
                  </Text>
                </div>

                <div className="flex flex-col items-center min-w-[100px]">
                  <Text size="xs" className="text-brand-green font-medium mb-1">
                    {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop`}
                  </Text>
                  <div className="relative w-full h-[2px] bg-[#E8E4D9] my-1">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-green" />
                  </div>
                  <Text size="xs" className="text-text-subtle/40 font-mono">
                    {flight.duration}
                  </Text>
                </div>

                <div>
                  <Heading as="h3" size="lg" className="font-bold text-brand-green">
                    {flight.arrivalTime}
                  </Heading>
                  <Text size="xs" className="text-text-subtle/50 uppercase tracking-widest">
                    {destCode}
                  </Text>
                </div>
              </div>

              {/* Price & Book */}
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-[#E8E4D9] pt-4 md:pt-0">
                <div className="text-left md:text-right">
                  <Text size="xs" className="text-text-subtle/65 block">Total Price</Text>
                  <Heading as="h3" size="lg" className="font-bold text-brand-green">
                    ₹{flight.price.toLocaleString('en-IN')}
                  </Heading>
                </div>
                <a
                  href={flight.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-brand-green hover:bg-brand-green/90 text-white border border-transparent px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg"
                >
                  Book Search
                  <Icon name="ExternalLink" size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-text-subtle/60 border-t border-[#E8E4D9] pt-4">
          <span>
            * Dynamic locations resolved via Kiwi API.
          </span>
          <span>
            Redirecting to airline partner sites to complete booking.
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default FlightSearchModal;
