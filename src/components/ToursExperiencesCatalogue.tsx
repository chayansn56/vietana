import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  TourExperience, 
  TourExperienceVariant,
  TOURS_EXPERIENCES_DATA, 
  searchToursExperiences,
  getAllDestinations,
  getAllCategories
} from '../data/toursExperiencesData';
import { 
  VIETANA_WHATSAPP_VIETNAM,
  VIETANA_WHATSAPP_INDIA,
  WHATSAPP_DEFAULT, 
  buildWhatsAppLink, 
  buildTourExperienceBookingMessage 
} from '../utils/whatsapp';
import Icon from './ui/Icon';
import Modal from './ui/Modal';
import Container from './ui/layout/Container';
import Section from './ui/layout/Section';
import { Heading, Text } from './ui/Typography';

interface ToursExperiencesCatalogueProps {
  onClose?: () => void;
  onQuoteClick?: () => void;
  initialTourId?: string | null;
}

const REGIONS = ['ALL', 'North Vietnam', 'Central Vietnam', 'South Vietnam', 'Transfers'];
const DURATION_OPTIONS = ['ALL', 'Half Day', 'Full Day', 'Evening', 'Multi Day', 'Transfer'];

export default function ToursExperiencesCatalogue({ 
  onClose, 
  onQuoteClick, 
  initialTourId 
}: ToursExperiencesCatalogueProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedDestination, setSelectedDestination] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDuration, setSelectedDuration] = useState<string>('ALL');
  const [selectedTour, setSelectedTour] = useState<TourExperience | null>(null);

  // Booking widget form states for modal
  const [bookingDate, setBookingDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [adultsCount, setAdultsCount] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [contactCountry, setContactCountry] = useState<'VIETNAM' | 'INDIA'>('VIETNAM');
  const [dietaryPref, setDietaryPref] = useState<string>('Standard');
  const [pickupAddress, setPickupAddress] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const availableDestinations = useMemo(() => {
    if (selectedRegion === 'ALL') {
      return ['ALL', ...getAllDestinations()];
    }
    const filtered = TOURS_EXPERIENCES_DATA
      .filter((t) => t.region.toLowerCase() === selectedRegion.toLowerCase())
      .flatMap((t) => (t.destinations && t.destinations.length > 0 ? t.destinations : [t.destination]));
    return ['ALL', ...Array.from(new Set(filtered)).sort()];
  }, [selectedRegion]);
  const allCategories = useMemo(() => ['ALL', ...getAllCategories()], []);

  // If destination is no longer available under selected region, reset to ALL
  useEffect(() => {
    if (selectedDestination !== 'ALL' && !availableDestinations.includes(selectedDestination)) {
      setSelectedDestination('ALL');
    }
  }, [selectedRegion, availableDestinations, selectedDestination]);

  // Sync initialTourId
  useEffect(() => {
    if (initialTourId) {
      const found = TOURS_EXPERIENCES_DATA.find(
        (t) => t.id.toLowerCase() === initialTourId.toLowerCase() || t.slug.toLowerCase() === initialTourId.toLowerCase()
      );
      if (found) {
        setSelectedTour(found);
      }
    }
  }, [initialTourId]);

  // Check pending region from navbar
  useEffect(() => {
    const pendingRegion = localStorage.getItem('pending_tour_region');
    if (pendingRegion) {
      setSelectedRegion(pendingRegion);
      localStorage.removeItem('pending_tour_region');
    }
  }, []);

  // When selectedTour changes, initialize variant and form
  useEffect(() => {
    if (selectedTour) {
      document.title = `${selectedTour.title} | VIETANA Tours & Experiences`;
      if (selectedTour.variants && selectedTour.variants.length > 0) {
        setSelectedVariantId(selectedTour.variants[0].id);
      } else {
        setSelectedVariantId('');
      }
    } else {
      document.title = "Vietnam Tours & Experiences | VIETANA Concierge";
    }
  }, [selectedTour]);

  // Filtered tours
  const filteredTours = useMemo(() => {
    return searchToursExperiences({
      query: searchQuery,
      region: selectedRegion,
      destination: selectedDestination,
      category: selectedCategory,
      duration: selectedDuration
    });
  }, [searchQuery, selectedRegion, selectedDestination, selectedCategory, selectedDuration]);

  // Active variant and price for detail modal
  const activeModalVariant = useMemo(() => {
    if (!selectedTour) return null;
    return selectedTour.variants.find(v => v.id === selectedVariantId) || selectedTour.variants[0] || null;
  }, [selectedTour, selectedVariantId]);

  const modalPriceVND = activeModalVariant?.priceVND ?? selectedTour?.priceVND;
  const modalPriceINR = activeModalVariant?.priceINR ?? selectedTour?.priceINR;

  // Format WhatsApp message & trigger
  const handleBookTourWhatsApp = (tour: TourExperience) => {
    const activeVariant = tour.variants.find(v => v.id === selectedVariantId) || tour.variants[0];
    const variantName = activeVariant ? activeVariant.name : (tour.tourFormats[0] || 'Standard');

    const message = buildTourExperienceBookingMessage({
      tourTitle: tour.title,
      destination: tour.destination,
      preferredDate: bookingDate,
      adults: adultsCount,
      children: childrenCount,
      tourFormat: variantName,
      rateVND: activeVariant?.priceVND ?? tour.priceVND,
      rateINR: activeVariant?.priceINR ?? tour.priceINR,
      dietaryPreference: dietaryPref,
      pickupLocation: pickupAddress.trim() || undefined,
      specialRequests: specialNotes.trim() || undefined
    });

    const targetPhone = contactCountry === 'INDIA' ? VIETANA_WHATSAPP_INDIA : VIETANA_WHATSAPP_VIETNAM;
    const url = buildWhatsAppLink(targetPhone, message);
    window.open(url, '_blank');
  };

  const handleQuickEnquireWhatsApp = (tour: TourExperience, country?: 'VIETNAM' | 'INDIA') => {
    let rateText = '';
    if (tour.priceVND) {
      rateText = `\nStarting Rate: ${tour.priceVND.toLocaleString('vi-VN')} VND`;
      if (tour.priceINR) {
        rateText += ` (approx. ₹${tour.priceINR.toLocaleString('en-IN')})`;
      }
    }
    const message = `Hello VIETANA, I would like to inquire about the tour experience:\n\n*${tour.title}*\nDestination: ${tour.destination} (${tour.region})\nDuration: ${tour.duration}${rateText}\n\nPlease share availability and booking details.`;
    const targetCountry = country || contactCountry;
    const targetPhone = targetCountry === 'INDIA' ? VIETANA_WHATSAPP_INDIA : VIETANA_WHATSAPP_VIETNAM;
    const url = buildWhatsAppLink(targetPhone, message);
    window.open(url, '_blank');
  };

  const handleCardClick = (tour: TourExperience) => {
    setSelectedTour(tour);
    window.history.pushState({}, '', `/tours-experiences/${tour.slug}`);
  };

  const handleCloseModal = () => {
    setSelectedTour(null);
    window.history.pushState({}, '', '/tours-experiences');
  };

  return (
    <div className="min-h-screen bg-stone-50/60 pb-28">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-stone-900 to-stone-850 text-white pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
        <Container>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium uppercase tracking-widest mb-4">
              <Icon name="compass" className="w-3.5 h-3.5" />
              VIETANA Concierge Excursions
            </div>
            <Heading level={1} className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight mb-4">
              Tours & Experiences in Vietnam
            </Heading>
            <Text className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
              Explore authentic day excursions, UNESCO World Heritage cruises, mountain treks, cultural craft villages, and private transfers curated by verified local operators.
            </Text>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-3 mt-8 max-w-md mx-auto">
              <div className="bg-stone-800/80 border border-stone-700/60 rounded-xl p-3 text-center">
                <div className="text-xl sm:text-2xl font-serif text-amber-400 font-medium">100%</div>
                <div className="text-[11px] text-stone-400 uppercase tracking-wider">English Guides</div>
              </div>
              <div className="bg-stone-800/80 border border-stone-700/60 rounded-xl p-3 text-center">
                <div className="text-xl sm:text-2xl font-serif text-amber-400 font-medium">Door-to-Door</div>
                <div className="text-[11px] text-stone-400 uppercase tracking-wider">Hotel Pickup</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Filter & Search Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
        <Container className="py-4">
          <div className="flex flex-col gap-3">
            {/* Top Search & Region Row */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Search Input */}
              <div className="relative flex-1">
                <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search experiences (e.g. Ha Long Bay, Cu Chi, Ninh Binh, Sapa, Jeep...)"
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                    aria-label="Clear search"
                  >
                    <Icon name="x" className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Region Selector Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {REGIONS.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setSelectedRegion(r);
                      setSelectedDestination('ALL');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      selectedRegion === r
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
                    }`}
                  >
                    {r === 'ALL' ? 'All Regions' : r}
                  </button>
                ))}
              </div>
            </div>

            {/* Secondary Filter Dropdowns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1 border-t border-stone-100">
              {/* Destination Filter */}
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider mb-1">Destination</label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full py-1.5 px-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-700 focus:outline-none focus:border-amber-500"
                >
                  {availableDestinations.map((d) => (
                    <option key={d} value={d}>
                      {d === 'ALL' ? 'All Destinations' : d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Filter */}
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider mb-1">Duration</label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full py-1.5 px-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-700 focus:outline-none focus:border-amber-500"
                >
                  {DURATION_OPTIONS.map((dur) => (
                    <option key={dur} value={dur}>
                      {dur === 'ALL' ? 'All Durations' : dur}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider mb-1">Category / Type</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-1.5 px-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-700 focus:outline-none focus:border-amber-500"
                >
                  {allCategories.map((c) => (
                    <option key={c} value={c}>
                      {c === 'ALL' ? 'All Categories' : c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filters */}
              <div className="flex flex-col justify-end">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRegion('ALL');
                    setSelectedDestination('ALL');
                    setSelectedCategory('ALL');
                    setSelectedDuration('ALL');
                  }}
                  className="w-full py-1.5 px-2.5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Icon name="refresh-cw" className="w-3 h-3" />
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content Grid */}
      <Container className="py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-sm font-medium text-stone-800">
              Showing <span className="font-semibold text-amber-600">{filteredTours.length}</span> experiences
            </span>
            {selectedRegion !== 'ALL' && (
              <span className="text-xs text-stone-500 ml-2">in {selectedRegion}</span>
            )}
          </div>
          <span className="text-xs text-stone-500 font-light hidden sm:inline-block">
            All-Inclusive Rates in VND & INR • Direct WhatsApp Concierge
          </span>
        </div>

        {/* Empty State */}
        {filteredTours.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Icon name="search" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif text-stone-800 font-medium mb-1">No experiences found</h3>
            <p className="text-stone-500 text-sm mb-6">
              We couldn't find any tours matching your active filters. Try broadening your criteria or reset the search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('ALL');
                setSelectedDestination('ALL');
                setSelectedCategory('ALL');
                setSelectedDuration('ALL');
              }}
              className="px-4 py-2 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              onClick={() => handleCardClick(tour)}
              className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer group hover:border-amber-400/60"
            >
              {/* Card Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <img
                  src={tour.heroImage}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                
                {/* Region & Category Pills */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider">
                    {tour.region}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-semibold uppercase tracking-wider">
                    {tour.category}
                  </span>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-white text-xs font-medium">
                  <Icon name="clock" className="w-3.5 h-3.5 text-amber-300" />
                  <span>{tour.duration}</span>
                </div>

                {/* Destination Badge */}
                <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-white text-xs font-medium">
                  <Icon name="map-pin" className="w-3.5 h-3.5 text-amber-300" />
                  <span>{tour.destination}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2 mb-2 leading-snug">
                    {tour.title}
                  </h3>
                  <p className="text-stone-600 text-xs line-clamp-2 font-light leading-relaxed mb-4">
                    {tour.description}
                  </p>
                </div>

                {/* Transport & Guide Indicators */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Icon name="navigation" className="w-3 h-3 text-stone-400" />
                    <span className="truncate max-w-[120px]">{tour.transportOptions[0] || 'AC Tourist Coach'}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="user-check" className="w-3 h-3 text-stone-400" />
                    <span>English Guide</span>
                  </span>
                </div>

                {/* Action CTA & Price */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">From</span>
                    <span className="text-xs font-bold text-stone-900">
                      {tour.priceVND ? `${tour.priceVND.toLocaleString('vi-VN')} VND` : 'On Request'}
                    </span>
                    {tour.priceINR && (
                      <span className="text-[11px] text-amber-700 font-medium">
                        ≈ ₹{tour.priceINR.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickEnquireWhatsApp(tour);
                      }}
                      className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                      title="Quick Inquiry on WhatsApp"
                      aria-label="Quick Inquiry on WhatsApp"
                    >
                      <Icon name="message-circle" className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="px-3.5 py-2 rounded-xl bg-stone-900 text-white hover:bg-stone-800 text-xs font-medium transition-colors whitespace-nowrap"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedTour && (
          <Modal isOpen={!!selectedTour} onClose={handleCloseModal} maxWidth="max-w-4xl">
            <div className="bg-white rounded-2xl overflow-hidden max-h-[88vh] flex flex-col">
              {/* Modal Hero Header */}
              <div className="relative h-48 sm:h-72 md:h-80 w-full overflow-hidden bg-stone-900 flex-shrink-0">
                <img
                  src={selectedTour.heroImage}
                  alt={selectedTour.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 backdrop-blur-sm transition-colors"
                  aria-label="Close modal"
                >
                  <Icon name="x" className="w-5 h-5" />
                </button>

                {/* Header Content */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center mb-2 sm:mb-3">
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-amber-500 text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                      {selectedTour.category}
                    </span>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-stone-800/80 backdrop-blur-sm text-stone-200 text-[11px] sm:text-xs">
                      {selectedTour.destinations && selectedTour.destinations.length > 1 ? selectedTour.destinations.join(' • ') : selectedTour.destination} • {selectedTour.region}
                    </span>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-stone-800/80 backdrop-blur-sm text-stone-200 text-[11px] sm:text-xs flex items-center gap-1">
                      <Icon name="clock" className="w-3.5 h-3.5 text-amber-300" />
                      {selectedTour.duration}
                    </span>
                    {modalPriceVND && (
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-stone-800/90 backdrop-blur-sm text-amber-300 text-[11px] sm:text-xs font-semibold">
                        From {modalPriceVND.toLocaleString('vi-VN')} VND {modalPriceINR ? `(≈ ₹${modalPriceINR.toLocaleString('en-IN')})` : ''}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-white leading-tight">
                    {selectedTour.title}
                  </h2>
                </div>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 pb-28 sm:pb-8 space-y-6 sm:space-y-8 text-stone-800">
                {/* Description */}
                <div>
                  <h3 className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-2">Overview</h3>
                  <p className="text-stone-700 text-sm sm:text-base font-light leading-relaxed">
                    {selectedTour.description}
                  </p>
                </div>

                {/* Traveler Advisory Notice (if present) */}
                {selectedTour.advisory && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
                    <Icon name="alert-triangle" className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-wider text-amber-900 mb-1">
                        Traveler Advisory
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed">
                        {selectedTour.advisory}
                      </p>
                    </div>
                  </div>
                )}

                {/* Key Highlights */}
                <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-5">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-amber-900 mb-3 flex items-center gap-2">
                    <Icon name="sparkles" className="w-4 h-4 text-amber-600" />
                    Key Experience Highlights
                  </h3>
                  <ul className="space-y-2 text-sm text-stone-700">
                    {selectedTour.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-amber-600 font-bold mt-0.5">•</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Day-by-Day or Step-by-Step Itinerary */}
                {selectedTour.itinerary && selectedTour.itinerary.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-4 flex items-center gap-2">
                      <Icon name="calendar" className="w-4 h-4 text-stone-500" />
                      Detailed Tour Itinerary
                    </h3>
                    <div className="relative pl-6 border-l-2 border-stone-200 space-y-6">
                      {selectedTour.itinerary.map((step, idx) => (
                        <div key={idx} className="relative">
                          {/* Dot */}
                          <div className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white shadow-sm" />
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1">
                            {step.time && (
                              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md self-start">
                                {step.time}
                              </span>
                            )}
                            <h4 className="text-sm font-semibold text-stone-900">{step.title}</h4>
                          </div>
                          <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inclusions & Exclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Inclusions */}
                  <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-xl p-5">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-emerald-900 mb-3 flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      What's Included
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                      {selectedTour.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="bg-rose-50/40 border border-rose-200/60 rounded-xl p-5">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-rose-900 mb-3 flex items-center gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      What's Excluded
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                      {selectedTour.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-600 font-bold">•</span>
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Operational Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm bg-stone-50 rounded-xl p-5 border border-stone-200">
                  <div>
                    <h5 className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                      <Icon name="map-pin" className="w-3.5 h-3.5 text-stone-500" />
                      Pickup & Dropoff
                    </h5>
                    <p className="text-stone-600 leading-relaxed">{selectedTour.pickupInformation}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                      <Icon name="navigation" className="w-3.5 h-3.5 text-stone-500" />
                      Transportation
                    </h5>
                    <p className="text-stone-600 leading-relaxed">{selectedTour.transportOptions.join(', ')}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                      <Icon name="users" className="w-3.5 h-3.5 text-stone-500" />
                      Tour Formats & Groups
                    </h5>
                    <p className="text-stone-600 leading-relaxed">{selectedTour.tourFormats.join(' • ')}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                      <Icon name="user-check" className="w-3.5 h-3.5 text-stone-500" />
                      Guide Languages
                    </h5>
                    <p className="text-stone-600 leading-relaxed">{selectedTour.languages.join(', ')}</p>
                  </div>
                </div>

                {/* Dietary Policy Section */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-stone-700 mb-2 flex items-center gap-2">
                    <Icon name="coffee" className="w-4 h-4 text-amber-600" />
                    Dietary & Meal Information
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 mb-2">
                    {selectedTour.dietaryInformation.standard}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className={`px-2.5 py-1 rounded-md font-medium ${
                      selectedTour.dietaryInformation.vegetarianAvailable 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      Vegetarian: {selectedTour.dietaryInformation.vegetarianAvailable ? 'Available on request' : 'Contact concierge'}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-stone-200 text-stone-700 font-medium">
                      Jain: Available on request (to be reconfirmed)
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-2 italic">
                    {selectedTour.dietaryInformation.notes}
                  </p>
                </div>

                {/* Policies: Child & Cancellation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 bg-stone-50 rounded-xl p-5 border border-stone-200">
                  <div>
                    <h5 className="font-semibold text-stone-900 mb-1">Child Policy</h5>
                    <p>{selectedTour.childPolicy}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-stone-900 mb-1">Cancellation Policy</h5>
                    <p>{selectedTour.cancellationPolicy}</p>
                  </div>
                </div>

                {/* Interactive WhatsApp Booking Section */}
                <div id="tour-modal-booking-section" className="bg-gradient-to-br from-stone-900 to-stone-850 text-white rounded-2xl p-6 sm:p-8 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                      <Icon name="message-circle" className="w-4 h-4" />
                      Direct Concierge Reservation
                    </div>
                    {modalPriceVND && (
                      <div className="text-left sm:text-right">
                        <span className="text-base sm:text-lg font-bold text-amber-400">
                          {modalPriceVND.toLocaleString('vi-VN')} VND
                        </span>
                        {modalPriceINR && (
                          <span className="text-xs text-stone-300 ml-2 font-medium">
                            (≈ ₹{modalPriceINR.toLocaleString('en-IN')}) / person
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-2">
                    Check Availability & Book on WhatsApp
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm font-light mb-6">
                    Enter your travel details below. We will format a structured booking message and connect you directly with the VIETANA operations desk in Vietnam to confirm availability, exact pickup time, and final price.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Variant Selector */}
                    {selectedTour.variants && selectedTour.variants.length > 0 && (
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-stone-300 mb-1.5">
                          Select Tour Format / Variant
                        </label>
                        <select
                          value={selectedVariantId}
                          onChange={(e) => setSelectedVariantId(e.target.value)}
                          className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                        >
                          {selectedTour.variants.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.name} {v.groupSize ? `(${v.groupSize})` : ''} {v.priceVND ? `— ${v.priceVND.toLocaleString('vi-VN')} VND (₹${v.priceINR?.toLocaleString('en-IN')})` : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Preferred Date */}
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1.5">
                        Preferred Tour Date
                      </label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {/* Passenger Counts */}
                    <div>
                      <div className="grid grid-cols-2 gap-3 mb-2">
                        {/* Adults Stepper */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-medium text-stone-300">Adults (12+ yrs)</label>
                            <span className="text-[10px] text-amber-400 font-mono">Min 1</span>
                          </div>
                          <div className="flex items-center justify-between bg-stone-800 border border-stone-700 rounded-xl p-1">
                            <button
                              type="button"
                              onClick={() => setAdultsCount(prev => Math.max(1, prev - 1))}
                              disabled={adultsCount <= 1}
                              className="w-9 h-9 rounded-lg bg-stone-700 hover:bg-stone-600 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold flex items-center justify-center text-base transition-all cursor-pointer border-none touch-manipulation"
                              aria-label="Decrease adults count"
                            >
                              -
                            </button>
                            <span className="w-10 text-center text-sm font-bold text-white font-mono select-none">
                              {adultsCount}
                            </span>
                            <button
                              type="button"
                              onClick={() => setAdultsCount(prev => Math.min(99, prev + 1))}
                              disabled={adultsCount >= 99}
                              className="w-9 h-9 rounded-lg bg-stone-700 hover:bg-stone-600 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold flex items-center justify-center text-base transition-all cursor-pointer border-none touch-manipulation"
                              aria-label="Increase adults count"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Children Stepper */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-medium text-stone-300">Children (Under 12)</label>
                            <span className="text-[10px] text-stone-500 font-mono">Optional</span>
                          </div>
                          <div className="flex items-center justify-between bg-stone-800 border border-stone-700 rounded-xl p-1">
                            <button
                              type="button"
                              onClick={() => setChildrenCount(prev => Math.max(0, prev - 1))}
                              disabled={childrenCount <= 0}
                              className="w-9 h-9 rounded-lg bg-stone-700 hover:bg-stone-600 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold flex items-center justify-center text-base transition-all cursor-pointer border-none touch-manipulation"
                              aria-label="Decrease children count"
                            >
                              -
                            </button>
                            <span className="w-10 text-center text-sm font-bold text-white font-mono select-none">
                              {childrenCount}
                            </span>
                            <button
                              type="button"
                              onClick={() => setChildrenCount(prev => Math.min(50, prev + 1))}
                              disabled={childrenCount >= 50}
                              className="w-9 h-9 rounded-lg bg-stone-700 hover:bg-stone-600 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold flex items-center justify-center text-base transition-all cursor-pointer border-none touch-manipulation"
                              aria-label="Increase children count"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Quick Group Size Selector */}
                      <div className="bg-stone-850 border border-stone-800 rounded-xl p-2.5">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono flex items-center gap-1">
                            <Icon name="Users" size={11} className="text-amber-400" />
                            Group Size Quick Select
                          </span>
                          <span className="text-[10px] text-amber-400/90 font-mono font-medium">
                            {adultsCount} Adult{adultsCount > 1 ? 's' : ''}{childrenCount > 0 ? ` + ${childrenCount} Child${childrenCount > 1 ? 'ren' : ''}` : ''}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {[1, 2, 4, 6, 8, 10, 15, 20, 25, 30].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setAdultsCount(num)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border active:scale-95 touch-manipulation ${
                                adultsCount === num
                                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-xs'
                                  : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700 hover:text-white'
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Dietary Preference */}
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1.5">Dietary Preference</label>
                      <select
                        value={dietaryPref}
                        onChange={(e) => setDietaryPref(e.target.value)}
                        className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Standard Vietnamese">Standard Vietnamese</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Jain (on request)">Jain (on request)</option>
                        <option value="Pure Veg (on request)">Pure Veg (on request)</option>
                        <option value="No Pork / No Beef">No Pork / No Beef</option>
                      </select>
                    </div>

                    {/* Pickup Hotel */}
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1.5">Pickup Hotel / Location</label>
                      <input
                        type="text"
                        value={pickupAddress}
                        onChange={(e) => setPickupAddress(e.target.value)}
                        placeholder="e.g. Hotel in Old Quarter / District 1"
                        className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {/* Special Requests */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-stone-300 mb-1.5">Special Requests (Optional)</label>
                      <input
                        type="text"
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        placeholder="e.g. Baby stroller, wheelchair assistance, private guide request..."
                        className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {/* Concierge Desk Selection (Vietnam vs India) */}
                    <div className="sm:col-span-2 pt-2 border-t border-stone-800">
                      <label className="block text-xs font-medium text-stone-300 mb-1.5">
                        Connect with Concierge Office
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setContactCountry('VIETNAM')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            contactCountry === 'VIETNAM'
                              ? 'bg-amber-500/20 border-amber-500 text-white shadow-sm'
                              : 'bg-stone-800/80 border-stone-700 text-stone-400 hover:text-stone-200 hover:bg-stone-750'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-base">🇻🇳</span>
                            <span className="text-xs font-bold uppercase tracking-wider text-white">Vietnam Desk</span>
                          </div>
                          <span className={`text-[11px] font-mono block ${contactCountry === 'VIETNAM' ? 'text-amber-400 font-semibold' : 'text-stone-400'}`}>
                            +84 902 434 006
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setContactCountry('INDIA')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            contactCountry === 'INDIA'
                              ? 'bg-amber-500/20 border-amber-500 text-white shadow-sm'
                              : 'bg-stone-800/80 border-stone-700 text-stone-400 hover:text-stone-200 hover:bg-stone-750'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-base">🇮🇳</span>
                            <span className="text-xs font-bold uppercase tracking-wider text-white">India Desk</span>
                          </div>
                          <span className={`text-[11px] font-mono block ${contactCountry === 'INDIA' ? 'text-amber-400 font-semibold' : 'text-stone-400'}`}>
                            +91 99909 77002
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => handleBookTourWhatsApp(selectedTour)}
                      className="flex-1 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition-colors"
                    >
                      <Icon name="message-circle" className="w-5 h-5" />
                      Book / Check Availability ({contactCountry === 'INDIA' ? '🇮🇳 India Desk' : '🇻🇳 Vietnam Desk'})
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickEnquireWhatsApp(selectedTour, contactCountry)}
                      className="py-3 px-5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm font-medium transition-colors"
                    >
                      Ask a Question ({contactCountry === 'INDIA' ? '🇮🇳' : '🇻🇳'})
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-3 text-center">
                    VIETANA {contactCountry === 'INDIA' ? 'India Concierge (+91 99909 77002)' : 'Vietnam Operations (+84 902 434 006)'} will confirm availability and send final quote via WhatsApp.
                  </p>
                </div>
              </div>

              {/* Mobile Sticky Booking Action Bar */}
              <div className="sm:hidden flex-shrink-0 p-3 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg pb-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-3">
                {modalPriceVND && (
                  <div className="flex flex-col shrink-0">
                    <span className="text-[9px] uppercase font-bold text-stone-400">Rate / pax</span>
                    <span className="text-xs font-bold text-stone-900 leading-tight">
                      {modalPriceVND.toLocaleString('vi-VN')} VND
                    </span>
                    {modalPriceINR && (
                      <span className="text-[10px] text-amber-700 font-semibold">
                        ≈ ₹{modalPriceINR.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const bookingEl = document.getElementById('tour-modal-booking-section');
                    if (bookingEl) {
                      bookingEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/20 active:scale-[0.98] transition-all"
                >
                  <Icon name="message-circle" className="w-4 h-4 shrink-0" />
                  <span className="truncate font-semibold">Book on WhatsApp ({contactCountry === 'INDIA' ? '🇮🇳 +91' : '🇻🇳 +84'})</span>
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
