import { useState, useEffect, useCallback } from 'react';
import { calculateTripEstimate, TravelStyle, FlightType, VisaType } from '../services/pricingService';
import { TripEstimate } from '../types';
import { CITIES } from '../data/destinations';

interface UseTripBuilderProps {
  initialDestinations?: string[];
  initialSights?: string[];
  isOpen: boolean;
  onUpdateCities?: (cities: string[]) => void;
  onUpdateSights?: (sights: string[]) => void;
}

export function useTripBuilder({
  initialDestinations = [],
  initialSights = [],
  isOpen,
  onUpdateCities,
  onUpdateSights
}: UseTripBuilderProps) {
  const [selectedCities, setSelectedCities] = useState<string[]>(() => {
    const cached = localStorage.getItem('vietana_trip_cities');
    return cached ? JSON.parse(cached) : initialDestinations;
  });
  const [selectedSights, setSelectedSights] = useState<string[]>(() => {
    const cached = localStorage.getItem('vietana_trip_sights');
    return cached ? JSON.parse(cached) : initialSights;
  });
  const [style, setStyle] = useState<TravelStyle>(() => {
    const cached = localStorage.getItem('vietana_trip_style');
    return (cached as TravelStyle) || 'comfort';
  });
  const [flightType, setFlightType] = useState<FlightType>(() => {
    const cached = localStorage.getItem('vietana_trip_flight');
    return (cached as FlightType) || 'round';
  });
  const [visaType, setVisaType] = useState<VisaType>(() => {
    const cached = localStorage.getItem('vietana_trip_visa');
    return (cached as VisaType) || 'single';
  });
  const [days, setDays] = useState<number>(() => {
    const cached = localStorage.getItem('vietana_trip_days');
    return cached ? parseInt(cached, 10) : 5;
  });
  const [pax, setPax] = useState<number>(() => {
    const cached = localStorage.getItem('vietana_trip_pax');
    return cached ? parseInt(cached, 10) : 2;
  });
  const [notes, setNotes] = useState<string>(() => {
    return localStorage.getItem('vietana_trip_notes') || '';
  });

  // B2B States
  const [b2bEnabled, setB2bEnabled] = useState<boolean>(() => {
    return localStorage.getItem('vietana_b2b_enabled') === 'true';
  });
  const [agencyName, setAgencyName] = useState<string>(() => {
    return localStorage.getItem('vietana_b2b_agency_name') || '';
  });
  const [agencyLogo, setAgencyLogo] = useState<string>(() => {
    return localStorage.getItem('vietana_b2b_agency_logo') || '';
  });
  const [priceMarkup, setPriceMarkup] = useState<number>(() => {
    const cached = localStorage.getItem('vietana_b2b_markup');
    return cached ? parseFloat(cached) : 10;
  });

  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState("Connected");

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
    if (isOpen) {
      if (initialDestinations.length > 0) {
        setSelectedCities(initialDestinations);
      }
      if (initialSights.length > 0) {
        setSelectedSights(initialSights);
      }
    }
  }, [isOpen, initialDestinations, initialSights]);

  useEffect(() => {
    localStorage.setItem('vietana_trip_cities', JSON.stringify(selectedCities));
    if (onUpdateCities) onUpdateCities(selectedCities);
  }, [selectedCities, onUpdateCities]);

  useEffect(() => {
    localStorage.setItem('vietana_trip_sights', JSON.stringify(selectedSights));
    if (onUpdateSights) onUpdateSights(selectedSights);
  }, [selectedSights, onUpdateSights]);

  useEffect(() => localStorage.setItem('vietana_trip_style', style), [style]);
  useEffect(() => localStorage.setItem('vietana_trip_flight', flightType), [flightType]);
  useEffect(() => localStorage.setItem('vietana_trip_visa', visaType), [visaType]);
  useEffect(() => localStorage.setItem('vietana_trip_days', days.toString()), [days]);
  useEffect(() => localStorage.setItem('vietana_trip_pax', pax.toString()), [pax]);
  useEffect(() => localStorage.setItem('vietana_trip_notes', notes), [notes]);
  useEffect(() => localStorage.setItem('vietana_b2b_enabled', b2bEnabled.toString()), [b2bEnabled]);
  useEffect(() => localStorage.setItem('vietana_b2b_agency_name', agencyName), [agencyName]);
  useEffect(() => localStorage.setItem('vietana_b2b_agency_logo', agencyLogo), [agencyLogo]);
  useEffect(() => localStorage.setItem('vietana_b2b_markup', priceMarkup.toString()), [priceMarkup]);

  useEffect(() => {
    const rawEstimate = calculateTripEstimate(selectedCities, style, days, pax, flightType, visaType);
    if (b2bEnabled && priceMarkup > 0) {
      const multiplier = 1 + (priceMarkup / 100);
      setEstimate({
        flight: Math.round(rawEstimate.flight * multiplier),
        visa: Math.round(rawEstimate.visa * multiplier),
        transfers: Math.round(rawEstimate.transfers * multiplier),
        hotels: Math.round(rawEstimate.hotels * multiplier),
        food: Math.round(rawEstimate.food * multiplier),
        transport: Math.round(rawEstimate.transport * multiplier),
        experiences: Math.round(rawEstimate.experiences * multiplier),
        dailyTotal: Math.round(rawEstimate.dailyTotal * multiplier),
        total: Math.round(rawEstimate.total * multiplier)
      });
    } else {
      setEstimate(rawEstimate);
    }
  }, [selectedCities, style, days, pax, flightType, visaType, b2bEnabled, priceMarkup]);

  const handleSyncNow = useCallback(() => {
    setIsSyncing(true);
    setSyncStatus("Fetching flight tariffs...");
    setTimeout(() => {
      setSyncStatus("Querying conversion rates...");
      setTimeout(() => {
        setSyncStatus("Updating hotel rates...");
        setTimeout(() => {
          setLastSyncTime(new Date());
          setIsSyncing(false);
          setSyncStatus("Connected");

          const rawEstimate = calculateTripEstimate(selectedCities, style, days, pax, flightType, visaType);
          if (b2bEnabled && priceMarkup > 0) {
            const multiplier = 1 + (priceMarkup / 100);
            setEstimate({
              flight: Math.round(rawEstimate.flight * multiplier),
              visa: Math.round(rawEstimate.visa * multiplier),
              transfers: Math.round(rawEstimate.transfers * multiplier),
              hotels: Math.round(rawEstimate.hotels * multiplier),
              food: Math.round(rawEstimate.food * multiplier),
              transport: Math.round(rawEstimate.transport * multiplier),
              experiences: Math.round(rawEstimate.experiences * multiplier),
              dailyTotal: Math.round(rawEstimate.dailyTotal * multiplier),
              total: Math.round(rawEstimate.total * multiplier)
            });
          } else {
            setEstimate(rawEstimate);
          }
        }, 300);
      }, 300);
    }, 400);
  }, [selectedCities, style, days, pax, flightType, visaType, b2bEnabled, priceMarkup]);

  const toggleCity = useCallback((city: string) => {
    setSelectedCities(prev => {
      const next = prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city];
      if (prev.includes(city)) {
        const cityData = CITIES.find(c => c.name.toLowerCase() === city.toLowerCase());
        if (cityData) {
          const sightNames = cityData.sights.map(s => s.name);
          setSelectedSights(sights => sights.filter(s => !sightNames.includes(s)));
        }
      }
      return next;
    });
  }, []);

  const toggleSight = useCallback((sight: string) => {
    setSelectedSights(prev =>
      prev.includes(sight) ? prev.filter(s => s !== sight) : [...prev, sight]
    );
  }, []);

  const handleLogoUpload = useCallback((file?: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAgencyLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  return {
    state: {
      selectedCities,
      selectedSights,
      style,
      flightType,
      visaType,
      days,
      pax,
      notes,
      b2bEnabled,
      agencyName,
      agencyLogo,
      priceMarkup,
      lastSyncTime,
      isSyncing,
      syncStatus,
      estimate
    },
    actions: {
      setSelectedCities,
      setSelectedSights,
      setStyle,
      setFlightType,
      setVisaType,
      setDays,
      setPax,
      setNotes,
      setB2bEnabled,
      setAgencyName,
      setAgencyLogo,
      setPriceMarkup,
      handleSyncNow,
      toggleCity,
      toggleSight,
      handleLogoUpload
    }
  };
}
