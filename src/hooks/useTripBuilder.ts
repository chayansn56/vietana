import { useEffect, useCallback, useMemo, useState } from 'react';
import { calculateTripEstimate } from '../services/pricingService';
import { useTripBuilderStore } from '../store/tripBuilderStore';

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
  const store = useTripBuilderStore();
  
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState("Connected");

  useEffect(() => {
    if (isOpen) {
      if (initialDestinations.length > 0) {
        store.setSelectedCities(initialDestinations);
      }
      if (initialSights.length > 0) {
        store.setSelectedSights(initialSights);
      }
    }
  }, [isOpen, initialDestinations, initialSights]);

  useEffect(() => {
    if (onUpdateCities) onUpdateCities(store.selectedCities);
  }, [store.selectedCities, onUpdateCities]);

  useEffect(() => {
    if (onUpdateSights) onUpdateSights(store.selectedSights);
  }, [store.selectedSights, onUpdateSights]);

  const estimate = useMemo(() => {
    const rawEstimate = calculateTripEstimate(
      store.selectedCities, 
      store.style, 
      store.days, 
      store.pax, 
      store.flightType, 
      store.visaType
    );
    
    if (store.b2bEnabled && store.priceMarkup > 0) {
      const multiplier = 1 + (store.priceMarkup / 100);
      return {
        flight: Math.round(rawEstimate.flight * multiplier),
        visa: Math.round(rawEstimate.visa * multiplier),
        transfers: Math.round(rawEstimate.transfers * multiplier),
        hotels: Math.round(rawEstimate.hotels * multiplier),
        food: Math.round(rawEstimate.food * multiplier),
        transport: Math.round(rawEstimate.transport * multiplier),
        experiences: Math.round(rawEstimate.experiences * multiplier),
        dailyTotal: Math.round(rawEstimate.dailyTotal * multiplier),
        total: Math.round(rawEstimate.total * multiplier)
      };
    }
    return rawEstimate;
  }, [
    store.selectedCities, 
    store.style, 
    store.days, 
    store.pax, 
    store.flightType, 
    store.visaType, 
    store.b2bEnabled, 
    store.priceMarkup
  ]);

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
        }, 300);
      }, 300);
    }, 400);
  }, []);

  const handleLogoUpload = useCallback((file?: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        store.setAgencyLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [store]);

  return {
    state: {
      ...store,
      lastSyncTime,
      isSyncing,
      syncStatus,
      estimate
    },
    actions: {
      setSelectedCities: store.setSelectedCities,
      setSelectedSights: store.setSelectedSights,
      setStyle: store.setStyle,
      setFlightType: store.setFlightType,
      setVisaType: store.setVisaType,
      setDays: store.setDays,
      setPax: store.setPax,
      setNotes: store.setNotes,
      setB2bEnabled: store.setB2bEnabled,
      setAgencyName: store.setAgencyName,
      setAgencyLogo: store.setAgencyLogo,
      setPriceMarkup: store.setPriceMarkup,
      handleSyncNow,
      toggleCity: store.toggleCity,
      toggleSight: store.toggleSight,
      handleLogoUpload
    }
  };
}
