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
  SQ: { name: 'Singapore Airlines', logo: 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=80&h=80&fit=crop&q=80' },
  QH: { name: 'Bamboo Airways', logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=80&h=80&fit=crop&q=80' },
  UK: { name: 'Vistara', logo: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=80&h=80&fit=crop&q=80' },
  TG: { name: 'Thai Airways', logo: 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=80&h=80&fit=crop&q=80' },
  MH: { name: 'Malaysia Airlines', logo: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=80&h=80&fit=crop&q=80' }
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
    const passengerCount = params.adults + params.children;
    const bookingUrl = `https://www.kiwi.com/deep?from=${origin}&to=${destination}&departure=${params.departureDate}${params.returnDate ? `&return=${params.returnDate}` : ''}&passengers=${passengers}&cabinClass=${params.cabinClass}`;

    let mockList: FlightRoute[] = [];

    // Helper to generate a flight record
    const makeFlight = (
      airlineCode: string, 
      flightNo: string, 
      dep: string, 
      arr: string, 
      durStr: string, 
      stopsCount: number, 
      baseCost: number
    ): FlightRoute => {
      const carrier = AIRLINES[airlineCode] || { name: 'Airlines', logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=80&h=80&fit=crop&q=80' };
      const calculatedPrice = Math.round(baseCost * classMultiplier * tripMultiplier * passengerCount);
      return {
        airline: airlineCode,
        airlineName: carrier.name,
        airlineLogo: carrier.logo,
        flightNumber: `${airlineCode}${flightNo}`,
        departureTime: dep,
        arrivalTime: arr,
        duration: durStr,
        stops: stopsCount,
        price: calculatedPrice,
        bookingUrl
      };
    };

    if (isVietnam(origin) && isVietnam(destination)) {
      // Vietnam Domestic Route
      mockList = [
        makeFlight('VN', '213', '06:00', '08:15', '2h 15m', 0, 4800),
        makeFlight('VJ', '152', '09:15', '11:25', '2h 10m', 0, 3100),
        makeFlight('QH', '244', '12:30', '14:45', '2h 15m', 0, 3600),
        makeFlight('VN', '258', '15:20', '17:30', '2h 10m', 0, 5200),
        makeFlight('VJ', '178', '18:45', '20:55', '2h 10m', 0, 2900),
        makeFlight('QH', '202', '21:10', '23:25', '2h 15m', 0, 3400)
      ];
    } else if (isIndia(origin) && isIndia(destination)) {
      // India Domestic Route
      mockList = [
        makeFlight('6E', '2248', '06:30', '08:45', '2h 15m', 0, 4500),
        makeFlight('AI', '812', '09:10', '11:30', '2h 20m', 0, 5500),
        makeFlight('UK', '945', '13:00', '15:15', '2h 15m', 0, 5800),
        makeFlight('6E', '512', '16:40', '18:55', '2h 15m', 0, 4200),
        makeFlight('AI', '452', '18:10', '20:25', '2h 15m', 0, 5200),
        makeFlight('UK', '988', '20:45', '23:00', '2h 15m', 0, 5600)
      ];
    } else {
      // International Routes (e.g. India to Vietnam)
      mockList = [
        // Direct Flights
        makeFlight('VJ', '896', '13:50', '19:40', '4h 20m', 0, 16000),
        makeFlight('VN', '502', '23:35', '06:10', '5h 05m', 0, 21000),
        makeFlight('6E', '1611', '08:45', '14:25', '4h 10m', 0, 15500),
        makeFlight('AI', '342', '21:00', '03:15', '4h 45m', 0, 19500),
        
        // 1-Stop Layovers
        makeFlight('SQ', '401', '09:20', '18:15', '7h 25m', 1, 28000),
        makeFlight('TG', '316', '11:45', '20:10', '6h 55m', 1, 26000),
        makeFlight('MH', '191', '07:30', '16:50', '7h 50m', 1, 24500),
        makeFlight('SQ', '403', '16:10', '01:05', '7h 25m', 1, 29000),
        makeFlight('TG', '324', '18:30', '02:40', '6h 40m', 1, 27000),
        makeFlight('MH', '195', '23:00', '08:20', '7h 50m', 1, 25000)
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
