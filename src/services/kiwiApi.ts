import { flightApiConfig } from '../config/travelpayouts';

export interface FlightRoute {
  airline: string;
  airlineName: string;
  airlineLogo: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  bookingUrl: string;
}

export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  tripType: 'oneway' | 'round';
  adults: number;
  children: number;
  infants: number;
  cabinClass: 'M' | 'W' | 'C' | 'F'; // Economy, Premium Economy, Business, First Class
  sort: 'price' | 'duration';
}

export interface AirportOption {
  code: string;
  name: string;
  city: string;
  country: string;
}

const AIRLINES: Record<string, { name: string; logo: string }> = {
  VN: { name: 'Vietnam Airlines', logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=80&h=80&fit=crop&q=80' },
  VJ: { name: 'VietJet Air', logo: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=80&h=80&fit=crop&q=80' },
  '6E': { name: 'IndiGo', logo: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=80&h=80&fit=crop&q=80' },
  AI: { name: 'Air India', logo: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=80&h=80&fit=crop&q=80' },
  SQ: { name: 'Singapore Airlines', logo: 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=80&h=80&fit=crop&q=80' }
};

// Popular mock airports list for immediate offline autocomplete resolution
const MOCK_AIRPORTS: AirportOption[] = [
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj Airport', city: 'Mumbai', country: 'India' },
  { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bangalore', country: 'India' },
  { code: 'HAN', name: 'Noi Bai International Airport', city: 'Hanoi', country: 'Vietnam' },
  { code: 'SGN', name: 'Tan Son Nhat International Airport', city: 'Ho Chi Minh City', country: 'Vietnam' },
  { code: 'DAD', name: 'Da Nang International Airport', city: 'Da Nang', country: 'Vietnam' },
  { code: 'PQC', name: 'Phu Quoc International Airport', city: 'Phu Quoc', country: 'Vietnam' },
  { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
  { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
  { code: 'KUL', name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia' }
];

/** Fetch airport suggestions from Kiwi Locations API or resolve locally */
export async function getAirportSuggestions(query: string): Promise<AirportOption[]> {
  const term = query.trim().toUpperCase();
  if (term.length < 2) return [];

  if (flightApiConfig.kiwiApiKey) {
    try {
      const response = await fetch(
        `https://api.tequila.kiwi.com/locations/query?term=${encodeURIComponent(term)}&locale=en-US&location_types=airport&limit=5`,
        {
          headers: { apikey: flightApiConfig.kiwiApiKey }
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data.locations.map((loc: any) => ({
          code: loc.code,
          name: loc.name,
          city: loc.city?.name || loc.name,
          country: loc.country?.name || ''
        }));
      }
    } catch (e) {
      console.error('Error fetching airport suggestions:', e);
    }
  }

  // Local matching fallback
  return MOCK_AIRPORTS.filter(
    (airport) =>
      airport.code.includes(term) ||
      airport.name.toUpperCase().includes(term) ||
      airport.city.toUpperCase().includes(term)
  );
}

/** Fetch flight search results via Kiwi Tequila Search API or dynamic mock resolver */
export async function searchFlights(params: SearchParams): Promise<FlightRoute[]> {
  const origin = params.origin.toUpperCase().trim();
  const destination = params.destination.toUpperCase().trim();
  const passengers = params.adults + params.children + params.infants;
  
  // Date format conversion YYYY-MM-DD to DD/MM/YYYY
  const parseDate = (dStr: string) => {
    const parts = dStr.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };
  
  const depDate = parseDate(params.departureDate);
  const retDate = params.returnDate ? parseDate(params.returnDate) : undefined;

  if (flightApiConfig.kiwiApiKey) {
    try {
      let queryUrl = `https://api.tequila.kiwi.com/v2/search?fly_from=${origin}&fly_to=${destination}&date_from=${depDate}&date_to=${depDate}&adults=${params.adults}&children=${params.children}&infants=${params.infants}&selected_cabins=${params.cabinClass}&curr=INR&sort=${params.sort}&limit=12`;
      
      if (params.tripType === 'round' && retDate) {
        queryUrl += `&return_from=${retDate}&return_to=${retDate}`;
      }
      
      const response = await fetch(queryUrl, {
        headers: { apikey: flightApiConfig.kiwiApiKey }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.data.map((flight: any) => {
          const airline = flight.airlines[0] || 'VN';
          const airlineInfo = AIRLINES[airline] || { name: flight.airlines[0], logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=80&h=80&fit=crop&q=80' };
          const durationHrs = Math.floor(flight.duration.total / 3600);
          const durationMins = Math.floor((flight.duration.total % 3600) / 60);
          
          return {
            airline,
            airlineName: airlineInfo.name,
            airlineLogo: airlineInfo.logo,
            flightNumber: `${airline}${flight.route[0]?.flight_no || '101'}`,
            departureTime: new Date(flight.local_departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            arrivalTime: new Date(flight.local_arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            duration: `${durationHrs}h ${durationMins}m`,
            stops: flight.route.length - 1,
            price: Math.round(flight.price),
            bookingUrl: `https://www.kiwi.com/deep?from=${origin}&to=${destination}&departure=${params.departureDate}${params.returnDate ? `&return=${params.returnDate}` : ''}&passengers=${passengers}&cabinClass=${params.cabinClass}`
          };
        });
      }
    } catch (e) {
      console.error('Error fetching live Kiwi flights:', e);
      if (!flightApiConfig.useMockFallback) throw e;
    }
  }

  // Enhanced Dynamic Mock Generator
  if (flightApiConfig.useMockFallback) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isIndia = (code: string) => ['DEL', 'BOM', 'BLR', 'MAA', 'CCU', 'HYD'].includes(code);
    const isVietnam = (code: string) => ['SGN', 'HAN', 'DAD', 'PQC', 'CXR'].includes(code);
    
    // Class multiplier
    const classMultiplier = params.cabinClass === 'C' ? 2.5 : params.cabinClass === 'W' ? 1.4 : params.cabinClass === 'F' ? 4.5 : 1.0;
    
    // Trip type multiplier
    const tripMultiplier = params.tripType === 'round' ? 1.85 : 1.0;
    
    const passengerCount = params.adults + params.children; // Infants don't get full seat charges usually
    const basePrice = (isVietnam(origin) && isVietnam(destination) ? 3500 : isIndia(origin) && isIndia(destination) ? 5500 : isIndia(origin) && isVietnam(destination) ? 19000 : 35000);
    const calculatedPrice = Math.round(basePrice * classMultiplier * tripMultiplier * passengerCount);

    const bookingUrl = `https://www.kiwi.com/deep?from=${origin}&to=${destination}&departure=${params.departureDate}${params.returnDate ? `&return=${params.returnDate}` : ''}&passengers=${passengers}&cabinClass=${params.cabinClass}`;

    let mockList: FlightRoute[] = [];

    if (isVietnam(origin) && isVietnam(destination)) {
      mockList = [
        {
          airline: 'VJ',
          airlineName: 'VietJet Air',
          airlineLogo: AIRLINES.VJ.logo,
          flightNumber: 'VJ152',
          departureTime: '09:15',
          arrivalTime: '11:25',
          duration: '2h 10m',
          stops: 0,
          price: Math.round(calculatedPrice * 0.8),
          bookingUrl
        },
        {
          airline: 'VN',
          airlineName: 'Vietnam Airlines',
          airlineLogo: AIRLINES.VN.logo,
          flightNumber: 'VN244',
          departureTime: '15:20',
          arrivalTime: '17:30',
          duration: '2h 10m',
          stops: 0,
          price: calculatedPrice,
          bookingUrl
        }
      ];
    } else if (isIndia(origin) && isIndia(destination)) {
      mockList = [
        {
          airline: '6E',
          airlineName: 'IndiGo',
          airlineLogo: AIRLINES['6E'].logo,
          flightNumber: '6E2248',
          departureTime: '06:30',
          arrivalTime: '08:45',
          duration: '2h 15m',
          stops: 0,
          price: Math.round(calculatedPrice * 0.85),
          bookingUrl
        },
        {
          airline: 'AI',
          airlineName: 'Air India',
          airlineLogo: AIRLINES.AI.logo,
          flightNumber: 'AI812',
          departureTime: '18:10',
          arrivalTime: '20:25',
          duration: '2h 15m',
          stops: 0,
          price: calculatedPrice,
          bookingUrl
        }
      ];
    } else {
      // Standard international / Indo-Vietnam
      mockList = [
        {
          airline: 'VJ',
          airlineName: 'VietJet Air',
          airlineLogo: AIRLINES.VJ.logo,
          flightNumber: 'VJ896',
          departureTime: '13:50',
          arrivalTime: '19:40',
          duration: '4h 20m',
          stops: 0,
          price: Math.round(calculatedPrice * 0.75),
          bookingUrl
        },
        {
          airline: 'VN',
          airlineName: 'Vietnam Airlines',
          airlineLogo: AIRLINES.VN.logo,
          flightNumber: 'VN502',
          departureTime: '23:35',
          arrivalTime: '06:10',
          duration: '5h 05m',
          stops: 0,
          price: calculatedPrice,
          bookingUrl
        },
        {
          airline: '6E',
          airlineName: 'IndiGo',
          airlineLogo: AIRLINES['6E'].logo,
          flightNumber: '6E1611',
          departureTime: '08:45',
          arrivalTime: '14:25',
          duration: '4h 10m',
          stops: 0,
          price: Math.round(calculatedPrice * 0.72),
          bookingUrl
        },
        {
          airline: 'SQ',
          airlineName: 'Singapore Airlines',
          airlineLogo: AIRLINES.SQ.logo,
          flightNumber: 'SQ401',
          departureTime: '09:20',
          arrivalTime: '18:15',
          duration: '7h 25m',
          stops: 1,
          price: Math.round(calculatedPrice * 1.35),
          bookingUrl
        }
      ];
    }

    // Sort mock list dynamically based on selection
    if (params.sort === 'duration') {
      return mockList.sort((a, b) => {
        const getMins = (d: string) => {
          const match = d.match(/(\d+)h\s*(\d+)m/);
          if (!match) return 999;
          return parseInt(match[1]) * 60 + parseInt(match[2]);
        };
        return getMins(a.duration) - getMins(b.duration);
      });
    }
    
    return mockList.sort((a, b) => a.price - b.price);
  }

  return [];
}
