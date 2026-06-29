import { useState } from 'react';
import { searchFlights, getAirportSuggestions, FlightRoute, AirportOption, SearchParams } from '../services/kiwiApi';

const MOCK_AIRPORTS_RESOLVER = [
  { code: 'DEL', city: 'Delhi', name: 'Indira Gandhi International Airport' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj Airport' },
  { code: 'BLR', city: 'Bangalore', name: 'Kempegowda International Airport' },
  { code: 'HAN', city: 'Hanoi', name: 'Noi Bai International Airport' },
  { code: 'SGN', city: 'Ho Chi Minh City', name: 'Tan Son Nhat International Airport' },
  { code: 'DAD', city: 'Da Nang', name: 'Da Nang International Airport' },
  { code: 'PQC', city: 'Phu Quoc', name: 'Phu Quoc International Airport' }
];

export function useFlightSearch() {
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

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  const [cabinClass, setCabinClass] = useState<'M' | 'W' | 'C' | 'F'>('M');
  const [sort, setSort] = useState<'price' | 'duration'>('price');

  const [flights, setFlights] = useState<FlightRoute[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const [filterDirectOnly, setFilterDirectOnly] = useState(false);

  const handleSwap = () => {
    const tempInput = originInput;
    const tempCode = originCode;
    setOriginInput(destInput);
    setOriginCode(destCode);
    setDestInput(tempInput);
    setDestCode(tempCode);
  };

  const getAirportCodeFromInput = (val: string, fallbackCode: string) => {
    const match = val.match(/\(([A-Z]{3})\)/);
    if (match) return match[1];

    const cleanVal = val.trim().toUpperCase();
    if (cleanVal.length === 3 && /^[A-Z]+$/.test(cleanVal)) {
      return cleanVal;
    }

    const found = MOCK_AIRPORTS_RESOLVER.find(
      (a) => a.city.toUpperCase() === cleanVal || a.name.toUpperCase() === cleanVal
    );
    if (found) return found.code;

    return fallbackCode;
  };

  const handleOriginChange = async (val: string) => {
    setOriginInput(val);
    const code = getAirportCodeFromInput(val, '');
    if (code) {
      setOriginCode(code);
    }
    if (val.length >= 2) {
      const sugs = await getAirportSuggestions(val);
      setOriginSuggestions(sugs);
    } else {
      setOriginSuggestions([]);
    }
  };

  const handleDestChange = async (val: string) => {
    setDestInput(val);
    const code = getAirportCodeFromInput(val, '');
    if (code) {
      setDestCode(code);
    }
    if (val.length >= 2) {
      const sugs = await getAirportSuggestions(val);
      setDestSuggestions(sugs);
    } else {
      setDestSuggestions([]);
    }
  };

  const performSearch = async () => {
    setIsLoading(true);
    setError('');
    setSearched(true);

    // Resolve origin/dest codes directly if user didn't select from dropdown
    const finalOriginCode = getAirportCodeFromInput(originInput, originCode);
    const finalDestCode = getAirportCodeFromInput(destInput, destCode);

    setOriginCode(finalOriginCode);
    setDestCode(finalDestCode);

    const params: SearchParams = {
      origin: finalOriginCode,
      destination: finalDestCode,
      departureDate,
      adults,
      children,
      infants,
      cabinClass,
      sort,
      tripType
    };

    if (tripType === 'round') {
      params.returnDate = returnDate;
    }

    try {
      const results = await searchFlights(params);
      setFlights(results);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch flights. Please try again later.');
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    state: {
      tripType, originInput, originCode, originSuggestions, destInput, destCode, destSuggestions,
      departureDate, returnDate, adults, children, infants, showPassengerDropdown,
      cabinClass, sort, flights, isLoading, searched, error, filterDirectOnly
    },
    actions: {
      setTripType, setOriginInput, setOriginCode, setOriginSuggestions, setDestInput, setDestCode, setDestSuggestions,
      setDepartureDate, setReturnDate, setAdults, setChildren, setInfants, setShowPassengerDropdown,
      setCabinClass, setSort, setFlights, setIsLoading, setSearched, setError, setFilterDirectOnly,
      handleSwap, handleOriginChange, handleDestChange, performSearch, getAirportCodeFromInput
    }
  };
}
