import React, { useState, useEffect, useMemo } from 'react';
import { useTripBuilder } from '../hooks/useTripBuilder';
import { TRIP_BUILDER_CITIES } from '../data/tripBuilder';
import { CITIES } from '../data/destinations';
import { MessagingService } from '../services/messagingService';
import { VIETNAM_TOP_10 } from '../data/siteContent';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import BrandName from './ui/BrandName';
import Slider from './ui/Slider';
import Input from './ui/Input';
import { Compass, Heart, Sparkles, Gem } from 'lucide-react';

interface CustomTripBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestinations?: string[];
  initialSights?: string[];
  onUpdateCities?: (cities: string[]) => void;
  onUpdateSights?: (sights: string[]) => void;
  onOpenAIPlanner?: (prompt: string) => void;
}

const CustomTripBuilder: React.FC<CustomTripBuilderProps> = ({
  isOpen,
  onClose,
  initialDestinations = [],
  initialSights = [],
  onUpdateCities,
  onUpdateSights,
  onOpenAIPlanner
}) => {
  const { state, actions } = useTripBuilder({
    initialDestinations,
    initialSights,
    isOpen,
    onUpdateCities,
    onUpdateSights
  });

  const {
    selectedCities, selectedSights, style, flightType, visaType, days, pax, notes,
    b2bEnabled, agencyName, agencyLogo, priceMarkup, lastSyncTime, isSyncing, syncStatus, estimate
  } = state;

  const {
    setSelectedCities, setSelectedSights, setStyle, setFlightType, setVisaType, setDays, setPax, setNotes,
    setB2bEnabled, setAgencyName, setAgencyLogo, setPriceMarkup, handleSyncNow, toggleCity, toggleSight
  } = actions;

  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen) {
      interval = setInterval(() => {
        setCurrentBg((prev) => (prev + 1) % VIETNAM_TOP_10.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    actions.handleLogoUpload(file || undefined);
  };

  const clearTripSelections = () => {
    setSelectedCities([]);
    setSelectedSights([]);
    setStyle('comfort');
    setFlightType('round');
    setVisaType('single');
    setDays(5);
    setPax(2);
    setNotes('');
    localStorage.removeItem('vietana_trip_cities');
    localStorage.removeItem('vietana_trip_sights');
    localStorage.removeItem('vietana_trip_style');
    localStorage.removeItem('vietana_trip_flight');
    localStorage.removeItem('vietana_trip_visa');
    localStorage.removeItem('vietana_trip_days');
    localStorage.removeItem('vietana_trip_pax');
    localStorage.removeItem('vietana_trip_notes');
  };

  const sendToWhatsApp = () => {
    const sightsText = selectedSights.length > 0 ? `\n- Sights: ${selectedSights.join(', ')}` : '';
    const detailsWithSights = `${notes}${sightsText}`;
    const link = MessagingService.generateCustomTripWhatsApp(selectedCities, style, days, pax, estimate.total, detailsWithSights);
    window.open(link, '_blank');
  };

  const suggestedRoute = useMemo(() => {
    if (selectedCities.length === 0) return "Da Nang → Hoi An";
    if (selectedCities.length === 1) return selectedCities[0];
    return selectedCities.join(" → ");
  }, [selectedCities]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-6xl"
      className="h-[95vh] max-h-[900px] flex flex-col p-0 overflow-hidden glass-dark rounded-[32px] shadow-heavy relative"
    >
      {VIETNAM_TOP_10.map((img, i) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${i === currentBg ? 'opacity-30' : 'opacity-0'
            }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />


      {/* HEADER */}
      <div className="p-10 pb-8 border-b border-white/5 relative z-10 flex flex-col items-center text-center select-none shrink-0">
        <div className="flex items-center gap-2 mb-3 bg-black/20 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-xs">
          <Icon name="Leaf" size={14} className="text-brand-gold-light" />
          <span className="font-sans font-black tracking-wide-em text-mini text-white uppercase">VIETANA</span>
        </div>
        <Heading as="h2" variant="white" className="text-3xl md:text-4xl font-serif mb-2 tracking-wide">
          Craft Your <span className="text-brand-gold-light italic">Journey</span>
        </Heading>
        <Text variant="none" className="text-white/40 text-mini font-mono tracking-widest uppercase">
          REAL-TIME ESTIMATE ENGINE V4
        </Text>
      </div>

      {/* CONTENT SPLIT */}
      <div className="flex-1 overflow-y-auto flex flex-col md:flex-row relative z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

        {/* LEFT: Parameters & Destinations */}
        <div className="flex-shrink-0 md:flex-1 md:flex-[0.5] p-6 md:p-10 border-b md:border-b-0 md:border-r border-white/5 flex flex-col gap-8 md:gap-10">

          <div className="flex flex-col gap-8">
            <Heading as="h3" variant="none" className="text-brand-gold/70 uppercase tracking-[0.2em] text-xs font-semibold flex items-center gap-3">
              <Icon name="Settings" size={16} /> Trip Settings
            </Heading>

            {/* Travel Style */}
            <div>
              <Text variant="none" className="text-white/50 text-caption uppercase tracking-widest mb-4 font-semibold">Travel Style</Text>
              <div className="grid grid-cols-2 lg:grid-cols-4 bg-white/5 border border-white/10 rounded-xl p-1.5 gap-1 relative ">
                {(['budget', 'comfort', 'premium', 'luxury'] as const).map(s => {
                  const IconComponent = s === 'budget' ? Compass : s === 'comfort' ? Heart : s === 'premium' ? Sparkles : Gem;
                  return (
                    <button
                      key={s}
                      className={`py-3.5 px-2 rounded-lg text-caption font-semibold tracking-widest uppercase transition-all duration-500 cursor-pointer flex items-center justify-center gap-1.5
                        ${style === s ? 'bg-brand-gold text-brand-green-extra-dark shadow-strong scale-[1.02]' : 'bg-transparent text-white/40 hover:text-white/80 hover:bg-white/5'}`}
                      onClick={() => setStyle(s)}
                    >
                      <IconComponent size={12} className="shrink-0" />
                      <span>{s}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggles: Flight & Visa */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Text variant="none" className="text-white/50 text-caption uppercase tracking-widest mb-4 font-semibold">Flight Type</Text>
                <div className="flex bg-white/5 border border-white/10 rounded-xl p-1.5 gap-1">
                  <button
                    className={`flex-1 py-2.5 rounded-lg text-xs transition-all cursor-pointer ${flightType === 'oneway' ? 'bg-black/5 dark:bg-white/10 text-text-dark dark:text-white' : 'text-text-muted dark:text-white/40 hover:text-text-dark dark:hover:text-white/80'}`}
                    onClick={() => setFlightType('oneway')}
                  >One Way</button>
                  <button
                    className={`flex-1 py-2.5 rounded-lg text-xs transition-all cursor-pointer ${flightType === 'round' ? 'bg-black/5 dark:bg-white/10 text-text-dark dark:text-white' : 'text-text-muted dark:text-white/40 hover:text-text-dark dark:hover:text-white/80'}`}
                    onClick={() => setFlightType('round')}
                  >Round Trip</button>
                </div>
              </div>
              <div>
                <Text variant="none" className="text-white/50 text-caption uppercase tracking-widest mb-4 font-semibold">Vietnam E-Visa</Text>
                <div className="flex bg-white/5 border border-white/10 rounded-xl p-1.5 gap-1">
                  <button
                    className={`flex-1 py-2.5 rounded-lg text-xs transition-all cursor-pointer ${visaType === 'single' ? 'bg-black/5 dark:bg-white/10 text-text-dark dark:text-white' : 'text-text-muted dark:text-white/40 hover:text-text-dark dark:hover:text-white/80'}`}
                    onClick={() => setVisaType('single')}
                  >Single</button>
                  <button
                    className={`flex-1 py-2.5 rounded-lg text-xs transition-all cursor-pointer ${visaType === 'multiple' ? 'bg-black/5 dark:bg-white/10 text-text-dark dark:text-white' : 'text-text-muted dark:text-white/40 hover:text-text-dark dark:hover:text-white/80'}`}
                    onClick={() => setVisaType('multiple')}
                  >Multiple</button>
                </div>
              </div>
            </div>

            {/* Duration & Pax Sliders */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <label htmlFor="trip-duration" className="text-white/50 text-caption uppercase tracking-widest font-semibold">Duration</label>
                  <Text variant="none" className="text-brand-gold-light text-xl font-serif">{days} Days</Text>
                </div>
                <Slider
                  id="trip-duration"
                  min="3" max="30"
                  value={days} onChange={(e) => setDays(parseInt(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <label htmlFor="trip-pax" className="text-white/50 text-caption uppercase tracking-widest font-semibold">Travelers</label>
                  <Text variant="none" className="text-brand-gold-light text-xl font-serif">{pax} {pax === 1 ? 'Person' : 'People'}</Text>
                </div>
                <Slider
                  id="trip-pax"
                  min="1" max="10"
                  value={pax} onChange={(e) => setPax(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* B2B Agent Portal */}
          <div className="border border-white/10 rounded-xl p-5 bg-white/5 flex flex-col gap-4">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setB2bEnabled(!b2bEnabled)}>
              <Heading as="h4" variant="none" className="text-sm font-semibold tracking-wide text-white flex items-center gap-2">
                <Icon name="Briefcase" size={16} className="text-brand-gold" /> B2B Agent Portal
              </Heading>
              <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${b2bEnabled ? 'bg-brand-gold' : 'bg-white/20'}`}>
                <div className={`w-3 h-3 rounded-full bg-brand-green-extra-dark transition-transform duration-300 ${b2bEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </div>

            {b2bEnabled && (
              <div className="flex flex-col gap-5 pt-4 border-t border-white/5 animate-msg-fade-in">
                <div>
                  <label htmlFor="b2b-agency-name" className="text-white/50 text-caption uppercase tracking-widest block mb-2 font-semibold">Agency Name</label>
                  <Input
                    id="b2b-agency-name"
                    type="text"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    placeholder="e.g. Royal India Travels"
                  />
                </div>

                <div>
                  <label htmlFor="b2b-agency-logo" className="text-white/50 text-caption uppercase tracking-widest block mb-2 font-semibold">Agency Logo</label>
                  <div className="flex items-center gap-4">
                    {agencyLogo && (
                      <img src={agencyLogo} alt="Logo" className="w-12 h-12 object-contain bg-white/10 rounded border border-white/10 p-1" />
                    )}
                    <input
                      id="b2b-agency-logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="text-xs text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-gold file:text-brand-green-extra-dark file:hover:bg-brand-gold-light file:cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label htmlFor="b2b-price-markup" className="text-white/50 text-caption uppercase tracking-widest font-semibold">Price Markup</label>
                    <span className="text-brand-gold-light text-sm font-semibold">{priceMarkup}%</span>
                  </div>
                  <Slider
                    id="b2b-price-markup"
                    min="0"
                    max="30"
                    value={priceMarkup}
                    onChange={(e) => setPriceMarkup(parseInt(e.target.value))}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <div className="flex justify-between items-center">
              <Heading as="h3" variant="none" className="text-brand-gold/70 uppercase tracking-[0.2em] text-xs font-semibold flex items-center gap-3">
                <Icon name="MapPin" size={16} /> Destinations
              </Heading>
              {(selectedCities.length > 0 || selectedSights.length > 0) && (
                <button
                  onClick={clearTripSelections}
                  className="text-caption text-white/40 hover:text-brand-gold font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Reset Selections
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
              {TRIP_BUILDER_CITIES.map(city => {
                const isSelected = selectedCities.includes(city);
                return (
                  <label
                    key={city}
                    className={`relative overflow-hidden group flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all duration-300
                      ${isSelected ? 'bg-brand-gold/15 border-brand-gold/50 shadow-gold' : 'bg-white/5 border-white/10 hover:border-brand-gold/30 hover:bg-white/10'}`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleCity(city)}
                      className="hidden"
                    />
                    <Text
                      variant="none"
                      className={`relative z-10 text-sm tracking-wide transition-colors duration-300 ${isSelected ? 'text-brand-gold-light font-medium' : 'text-white/80 font-light group-hover:text-white'}`}
                    >
                      {city}
                    </Text>
                  </label>
                );
              })}
            </div>

            {/* Sights Checklist for Selected Cities */}
            {selectedCities.map(cityName => {
              const cityData = CITIES.find(c => c.name.toLowerCase() === cityName.toLowerCase());
              if (!cityData || !cityData.sights || cityData.sights.length === 0) return null;
              return (
                <div key={cityName} className="mt-4 p-4 border border-white/5 bg-white/5 rounded-2xl animate-msg-fade-in">
                  <Heading as="h4" variant="none" className="text-xs font-semibold text-brand-gold-light tracking-wide mb-3 flex items-center gap-1.5">
                    <Icon name="Map" size={12} /> {cityName} Attractions
                  </Heading>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {cityData.sights.map(sight => {
                      const isSightSelected = selectedSights.includes(sight.name);
                      return (
                        <label
                          key={sight.id}
                          className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all duration-300 text-xs
                            ${isSightSelected ? 'bg-brand-gold/10 border-brand-gold/30 text-white' : 'bg-white/5 border-white/10 text-white/60 hover:border-brand-gold/30'}`}
                        >
                          <input
                            type="checkbox"
                            checked={isSightSelected}
                            onChange={() => toggleSight(sight.name)}
                            className="w-3.5 h-3.5 rounded border-white/10 text-brand-gold bg-transparent accent-brand-gold focus:ring-0 focus:ring-offset-0"
                          />
                          <span className="font-light truncate">{sight.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* RIGHT: Estimate Receipt & Insights */}
        <div className="flex-shrink-0 md:flex-1 md:flex-[0.5] p-6 md:p-10 bg-black/60 flex flex-col shadow-inner border-t md:border-t-0 md:border-l border-white/5 rounded-none md:overflow-y-auto">

          {/* Smart Insights Panel */}
          <div className="mb-10 bg-brand-gold/5 border border-brand-gold/20 rounded-2xl p-6">
            <Heading as="h4" variant="none" className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-6 flex items-center gap-2">
              <Icon name="Lightbulb" size={16} /> Smart Insights
            </Heading>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <Text variant="none" className="text-white/40 text-caption uppercase tracking-widest mb-1">📍 Suggested Route</Text>
                <Text variant="none" className="text-white/90 text-sm">{suggestedRoute}</Text>
              </div>
              <div>
                <Text variant="none" className="text-white/40 text-caption uppercase tracking-widest mb-1">🍛 Food</Text>
                <Text variant="none" className="text-white/90 text-sm">Rich culinary diversity</Text>
              </div>
              <div>
                <Text variant="none" className="text-white/40 text-caption uppercase tracking-widest mb-1">💰 Daily Budget</Text>
                <Text variant="none" className="text-white/90 text-sm font-mono">₹{(estimate.dailyTotal / days).toLocaleString('en-IN')}</Text>
              </div>
              <div>
                <Text variant="none" className="text-white/40 text-caption uppercase tracking-widest mb-1">✨ Travel Vibe</Text>
                <Text variant="none" className="text-white/90 text-sm capitalize">{style} Explorer</Text>
              </div>
            </div>
          </div>

          {/* Receipt */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden  shadow-inner before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-transparent before:via-brand-gold/50 before:to-transparent">
            <Heading as="h4" variant="none" className="text-brand-gold/80 uppercase tracking-widest text-caption font-semibold mb-6 flex items-center justify-between gap-2">
              <span>Real-time Estimate Receipt</span>
              <span className="flex items-center gap-1.5 text-micro font-mono text-emerald-400 normal-case tracking-normal">
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${isSyncing ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
                <span>{isSyncing ? syncStatus : 'Synced'}</span>
              </span>
            </Heading>

            {/* Dynamic Price Sync Panel */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-6 flex justify-between items-center gap-2">
              <div className="flex flex-col">
                <span className="text-tiny uppercase tracking-widest text-white/40">Hourly Feed Status</span>
                <span className="text-mini text-white/80 font-mono">
                  Last query: {lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              <button
                onClick={handleSyncNow}
                disabled={isSyncing}
                className="bg-brand-gold/10 hover:bg-brand-gold/25 border border-brand-gold/30 hover:border-brand-gold/50 rounded-lg px-2.5 py-1.5 text-micro font-mono text-brand-gold-light uppercase tracking-wider flex items-center gap-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer"
              >
                <Icon name="RefreshCw" size={10} className={isSyncing ? 'animate-spin' : ''} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Tariff'}</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center group">
                <Text variant="none" className="text-white/60 text-sm font-light tracking-wide flex items-center gap-2"><Icon name="Plane" size={14} className="text-brand-gold/60" /> ✈ Flights ({flightType === 'round' ? 'Round Trip' : 'One Way'})</Text>
                <Text variant="none" className="text-white/90 text-sm font-mono tracking-wider group-hover:text-brand-gold transition-colors">₹{estimate.flight.toLocaleString('en-IN')}</Text>
              </div>
              <div className="flex justify-between items-center group">
                <Text variant="none" className="text-white/60 text-sm font-light tracking-wide flex items-center gap-2"><Icon name="FileText" size={14} className="text-brand-gold/60" /> 📄 E-Visa ({visaType === 'single' ? 'Single' : 'Multiple'} Entry)</Text>
                <Text variant="none" className="text-white/90 text-sm font-mono tracking-wider group-hover:text-brand-gold transition-colors">₹{estimate.visa.toLocaleString('en-IN')}</Text>
              </div>
              <div className="flex justify-between items-center group mb-4">
                <Text variant="none" className="text-white/60 text-sm font-light tracking-wide flex items-center gap-2">
                  <Icon name="Truck" size={14} className="text-brand-gold/60" /> 🚘 Transfers <span className="text-white/30 text-micro">(T&C Apply)</span>
                </Text>
                <Text variant="none" className="text-white/90 text-sm font-mono tracking-wider group-hover:text-brand-gold transition-colors">₹{estimate.transfers.toLocaleString('en-IN')}</Text>
              </div>

              <Text variant="none" className="text-white/30 text-mini uppercase tracking-widest font-semibold border-b border-white/5 pb-2 mb-2">Daily Costs Breakdown ({days} Days × {pax} Pax)</Text>

              <div className="flex justify-between items-center group">
                <Text variant="none" className="text-white/50 text-sm font-light tracking-wide flex items-center gap-2 pl-4">🏨 Hotels</Text>
                <Text variant="none" className="text-white/80 text-sm font-mono tracking-wider group-hover:text-brand-gold transition-colors">₹{estimate.hotels.toLocaleString('en-IN')}</Text>
              </div>
              <div className="flex justify-between items-center group">
                <Text variant="none" className="text-white/50 text-sm font-light tracking-wide flex items-center gap-2 pl-4">🍛 Food</Text>
                <Text variant="none" className="text-white/80 text-sm font-mono tracking-wider group-hover:text-brand-gold transition-colors">₹{estimate.food.toLocaleString('en-IN')}</Text>
              </div>
              <div className="flex justify-between items-center group">
                <Text variant="none" className="text-white/50 text-sm font-light tracking-wide flex items-center gap-2 pl-4">🚕 Transport</Text>
                <Text variant="none" className="text-white/80 text-sm font-mono tracking-wider group-hover:text-brand-gold transition-colors">₹{estimate.transport.toLocaleString('en-IN')}</Text>
              </div>
              <div className="flex justify-between items-center group">
                <Text variant="none" className="text-white/50 text-sm font-light tracking-wide flex items-center gap-2 pl-4">🎟 Experiences</Text>
                <Text variant="none" className="text-white/80 text-sm font-mono tracking-wider group-hover:text-brand-gold transition-colors">₹{estimate.experiences.toLocaleString('en-IN')}</Text>
              </div>

              <div className="mt-4 pt-6 border-t border-dashed border-white/20 flex justify-between items-end">
                <Text variant="none" className="text-brand-gold uppercase tracking-[0.2em] text-xs font-semibold mb-1">Estimated Total</Text>
                <Heading variant="none" as="div" className="text-3xl sm:text-4xl font-serif text-brand-gold-light">
                  ₹{estimate.total.toLocaleString('en-IN')}
                </Heading>
              </div>
            </div>

            <Text variant="none" className="text-white/30 text-mini leading-relaxed mt-6 text-center italic">
              Actual pricing may vary based on season, hotel selection, flight availability and travel style.<br />
              Travel Gets Better with <BrandName />
            </Text>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-6 border-t border-white/5 relative z-10 bg-black/50 flex flex-wrap gap-4 items-center shrink-0">
        <div className="flex-1 w-full min-w-[300px] relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-brand-gold flex items-center justify-center">
            <Icon name="Edit3" size={16} />
          </span>
          <Input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Special requests? (e.g., Honeymoon, Halal food)"
            className="rounded-xl py-4 pl-12 pr-6"
          />
        </div>

        <div className="flex flex-row flex-wrap justify-end gap-3 w-full lg:w-auto">
          {onOpenAIPlanner && (
            <Button
              variant="glass"
              className="w-full sm:w-auto sm:flex-1 xl:flex-none px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold tracking-widest uppercase text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
              onClick={() => {
                onClose();
                const details = `I'd like to plan a trip with the following parameters:
- Destinations: ${selectedCities.length > 0 ? selectedCities.join(', ') : 'Not sure yet'}
- Style: ${style}
- Flight: ${flightType === 'round' ? 'Round Trip' : 'One Way'}
- Visa: ${visaType} entry
- Duration: ${days} Days
- Travelers: ${pax} People
- Special Notes: ${notes || 'None'}

Please generate a structured day-by-day itinerary right away for this trip!`;
                onOpenAIPlanner(details);
              }}
            >
              <Icon name="Sparkles" size={18} /> Plan with AI
            </Button>
          )}

          <Button
            variant="glass"
            className="w-full sm:w-auto sm:flex-1 xl:flex-none px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold tracking-widest uppercase text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
            onClick={() => window.print()}
          >
            <Icon name="Download" size={18} /> Download PDF
          </Button>

          <Button
            className="w-full sm:w-auto sm:flex-1 xl:flex-none px-6 py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-green-extra-dark font-bold tracking-widest uppercase text-xs rounded-xl shadow-gold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
            onClick={sendToWhatsApp}
          >
            <Icon name="MessageCircle" size={18} /> Send to WhatsApp
          </Button>
        </div>
      </div>

      {/* PRINT-ONLY AREA */}
      <div id="print-area" className="hidden print:block bg-white text-black p-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center border-b pb-6 mb-6">
          {b2bEnabled ? (
            <div className="flex items-center gap-4">
              {agencyLogo ? (
                <img src={agencyLogo} alt={agencyName} className="w-16 h-16 object-contain" />
              ) : (
                <h1 className="text-2xl font-serif font-bold text-brand-green">{agencyName || 'Travel Desk'}</h1>
              )}
              <div className="text-left">
                <h2 className="text-lg font-serif font-semibold text-gray-800">{agencyName || 'Bespoke Travel'} Proposal</h2>
                <p className="text-mini uppercase tracking-widest text-gray-500 mt-0.5">Prepared for your escape to Vietnam</p>
              </div>
            </div>
          ) : (
            <div className="text-left">
              <h1 className="text-3xl font-serif font-bold text-brand-green">VIETANA</h1>
              <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">Real-time Estimate Receipt & Itinerary</p>
            </div>
          )}
          <div className="text-right">
            <p className="text-sm font-semibold text-brand-gold">Premium Bespoke Vietnam Travel</p>
            <p className="text-xs text-gray-500">Managed from Ho Chi Minh City</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8 border-b pb-6">
          <div className="text-left">
            <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Trip Specifications</h3>
            <p className="text-sm"><strong>Suggested Route:</strong> {suggestedRoute}</p>
            <p className="text-sm capitalize"><strong>Travel Vibe:</strong> {style} Explorer</p>
            <p className="text-sm"><strong>Duration:</strong> {days} Days</p>
            <p className="text-sm"><strong>Travelers:</strong> {pax} {pax === 1 ? 'Person' : 'People'}</p>
            {selectedSights.length > 0 && (
              <p className="text-sm mt-2"><strong>Attractions Included:</strong> {selectedSights.join(', ')}</p>
            )}
          </div>
          <div className="text-left">
            <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Flight & Entry</h3>
            <p className="text-sm"><strong>Flight Type:</strong> {flightType === 'round' ? 'Round Trip' : 'One Way'}</p>
            <p className="text-sm"><strong>E-Visa Type:</strong> {visaType === 'single' ? 'Single Entry' : 'Multiple Entry'}</p>
            {notes && <p className="text-sm mt-2"><strong>Notes:</strong> {notes}</p>}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-4">Cost Breakdown (Estimate)</h3>
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b font-semibold text-gray-600">
                <th className="py-2">Item</th>
                <th className="py-2 text-right">Estimated Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Flights estimate ({flightType === 'round' ? 'Round' : 'One-way'})</td>
                <td className="py-2 text-right">₹{estimate.flight.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Vietnam E-Visa support</td>
                <td className="py-2 text-right">₹{estimate.visa.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Transfers & Airport greeting</td>
                <td className="py-2 text-right">₹{estimate.transfers.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Hotels ({days} days)</td>
                <td className="py-2 text-right">₹{estimate.hotels.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Culinary allowance (Jain/Indian/Local mapped)</td>
                <td className="py-2 text-right">₹{estimate.food.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Local transport</td>
                <td className="py-2 text-right">₹{estimate.transport.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Curated & Hidden experiences</td>
                <td className="py-2 text-right">₹{estimate.experiences.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="font-bold text-brand-green text-lg">
                <td className="py-4">Grand Total (INR)</td>
                <td className="py-4 text-right">₹{estimate.total.toLocaleString('en-IN')}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="border-t pt-6 text-center text-xs text-gray-400">
          <p>{b2bEnabled ? `This proposal was compiled on behalf of ${agencyName || 'our agency'}.` : 'This is a custom digital quote prepared by Vietana.'}</p>
          <p className="mt-1">{b2bEnabled ? 'Please contact your travel agent for bookings and adjustments.' : 'For changes or offline bookings, message us on WhatsApp: +91 9953294543'}</p>
        </div>
      </div>
    </Modal>
  );
};

export default CustomTripBuilder;
