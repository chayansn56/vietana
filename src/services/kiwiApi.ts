import { flightApiConfig, travelpayoutsConfig } from '../config/travelpayouts';

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

// Map airline codes to logo URLs and names
const AIRLINES: Record<string, { name: string; logo: string }> = {
  VN: { name: 'Vietnam Airlines', logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=80&h=80&fit=crop&q=80' },
  VJ: { name: 'VietJet Air', logo: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=80&h=80&fit=crop&q=80' },
  '6E': { name: 'IndiGo', logo: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=80&h=80&fit=crop&q=80' },
  AI: { name: 'Air India', logo: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=80&h=80&fit=crop&q=80' },
  SQ: { name: 'Singapore Airlines', logo: 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=80&h=80&fit=crop&q=80' }
};

export async function searchFlights(
  from: string,
  to: string,
  date: string,
  passengers: number = 1
): Promise<FlightRoute[]> {
  const origin = from.toUpperCase().trim();
  const destination = to.toUpperCase().trim();
  
  // Try Kiwi API if API key is present
  if (flightApiConfig.kiwiApiKey) {
    try {
      // Date format for Kiwi is DD/MM/YYYY
      const dateParts = date.split('-');
      const kiwiDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
      
      const response = await fetch(
        `https://api.tequila.kiwi.com/v2/search?fly_from=${origin}&fly_to=${destination}&date_from=${kiwiDate}&date_to=${kiwiDate}&adults=${passengers}&curr=INR&limit=10`,
        {
          headers: {
            apikey: flightApiConfig.kiwiApiKey
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        return data.data.map((flight: any) => {
          const airline = flight.airlines[0] || 'VN';
          const airlineInfo = AIRLINES[airline] || { name: flight.airlines[0], logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=80&h=80&fit=crop&q=80' };
          
          // Format duration (seconds to hours/minutes)
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
            bookingUrl: `https://c112.travelpayouts.com/click?shmarker=${travelpayoutsConfig.marker}&promo_id=7399&destination=https%3A%2F%2Fwww.kiwi.com%2Fdeep%3Ffrom%3D${origin}%26to%3D${destination}%26departure%3D${kiwiDate}`
          };
        });
      }
    } catch (e) {
      console.error('Error fetching live flights:', e);
      if (!flightApiConfig.useMockFallback) {
        throw e;
      }
    }
  }

  // Fallback / Mock Data Generator (Extremely realistic and customized based on parameters)
  if (flightApiConfig.useMockFallback) {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network latency

    const basePrice = origin === 'DEL' && destination === 'SGN' ? 18500 : 22000;
    
    return [
      {
        airline: 'VJ',
        airlineName: 'VietJet Air',
        airlineLogo: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=80&h=80&fit=crop&q=80',
        flightNumber: 'VJ896',
        departureTime: '13:50',
        arrivalTime: '19:40',
        duration: '4h 20m',
        stops: 0,
        price: basePrice * passengers,
        bookingUrl: `https://c112.travelpayouts.com/click?shmarker=${travelpayoutsConfig.marker}&promo_id=7399&destination=https%3A%2F%2Fwww.vietjetair.com`
      },
      {
        airline: 'VN',
        airlineName: 'Vietnam Airlines',
        airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=80&h=80&fit=crop&q=80',
        flightNumber: 'VN502',
        departureTime: '23:35',
        arrivalTime: '06:10',
        duration: '5h 05m',
        stops: 0,
        price: Math.round(basePrice * 1.25) * passengers,
        bookingUrl: `https://c112.travelpayouts.com/click?shmarker=${travelpayoutsConfig.marker}&promo_id=7399&destination=https%3A%2F%2Fwww.vietnamairlines.com`
      },
      {
        airline: '6E',
        airlineName: 'IndiGo',
        airlineLogo: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=80&h=80&fit=crop&q=80',
        flightNumber: '6E1611',
        departureTime: '08:45',
        arrivalTime: '14:25',
        duration: '4h 10m',
        stops: 0,
        price: Math.round(basePrice * 0.95) * passengers,
        bookingUrl: `https://c112.travelpayouts.com/click?shmarker=${travelpayoutsConfig.marker}&promo_id=7399&destination=https%3A%2F%2Fwww.goindigo.in`
      },
      {
        airline: 'SQ',
        airlineName: 'Singapore Airlines (1-Stop)',
        airlineLogo: 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=80&h=80&fit=crop&q=80',
        flightNumber: 'SQ401',
        departureTime: '09:20',
        arrivalTime: '18:15',
        duration: '7h 25m',
        stops: 1,
        price: Math.round(basePrice * 1.6) * passengers,
        bookingUrl: `https://c112.travelpayouts.com/click?shmarker=${travelpayoutsConfig.marker}&promo_id=7399&destination=https%3A%2F%2Fwww.singaporeair.com`
      }
    ];
  }

  return [];
}
