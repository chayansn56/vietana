import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { 
  AttractionProduct, 
  searchCatalogue, 
  getCatalogueHierarchy,
  REGIONS,
  RegionName
} from '../data/attractions';
import { useCurrency, Currency } from '../contexts/CurrencyContext';
import { WHATSAPP_DEFAULT, buildWhatsAppLink } from '../utils/whatsapp';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import Modal from './ui/Modal';
import Container from './ui/layout/Container';
import Section from './ui/layout/Section';
import AttractionBookingWidget from './attractions/AttractionBookingWidget';

interface AttractionCatalogueProps {
  onClose?: () => void;
  onQuoteClick?: () => void;
  initialProductId?: string | null;
}

export const formatPriceVND = (vnd: number | null, currency: Currency): string => {
  if (vnd === null || vnd === undefined) return 'Pricing on Request';
  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(vnd);
  }
  if (currency === 'EUR') {
    const eur = Math.round(vnd / 27600);
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(eur);
  }
  if (currency === 'INR') {
    // Exact user business rate: 1,000,000 VND = 3,700 INR (0.0037)
    const inr = Math.round(vnd * 0.0037);
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(inr);
  }
  // USD (1 USD = 25,400 VND)
  const usd = Math.round(vnd / 25400);
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usd);
};

export const getMultiCurrencyRates = (vnd: number | null) => {
  if (vnd === null || vnd === undefined) return null;
  return {
    vnd: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(vnd),
    eur: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Math.round(vnd / 27600)),
    usd: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(vnd / 25400)),
    inr: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.round(vnd * 0.0037))
  };
};

const PRODUCT_TYPES = [
  'ALL',
  'Theme Park',
  'Cable Car',
  'Admission',
  'Water Park',
  'Show',
  'Combo',
  'Safari',
  'Buffet'
];

export default function AttractionCatalogue({ onClose, onQuoteClick, initialProductId }: AttractionCatalogueProps) {
  const { currency } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedDestination, setSelectedDestination] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedTicket, setSelectedTicket] = useState<AttractionProduct | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'hierarchy'>('grid');

  const hierarchy = useMemo(() => getCatalogueHierarchy(), []);

  // Sync initialProductId with selectedTicket
  useEffect(() => {
    if (initialProductId) {
      const allProducts = hierarchy.regions
        .flatMap((r) => r.destinations)
        .flatMap((d) => d.venues)
        .flatMap((v) => v.products);
      const found = allProducts.find(
        (p) => p.id.toLowerCase() === initialProductId.toLowerCase()
      );
      if (found) {
        setSelectedTicket(found);
      }
    }
  }, [initialProductId, hierarchy]);

  // Update page title dynamically when viewing a specific ticket
  useEffect(() => {
    if (selectedTicket) {
      document.title = `${selectedTicket.name} | ${selectedTicket.venue} | VIETANA`;
    } else {
      document.title = "Vietnam Attraction Tickets & Passes | VIETANA Wholesale";
    }
  }, [selectedTicket]);

  // Check URL params or localStorage for initial filters
  useEffect(() => {
    const pendingRegion = localStorage.getItem('pending_attraction_region');
    if (pendingRegion) {
      setSelectedRegion(pendingRegion);
      localStorage.removeItem('pending_attraction_region');
    }
    const pendingType = localStorage.getItem('pending_attraction_type');
    if (pendingType) {
      setSelectedType(pendingType);
      localStorage.removeItem('pending_attraction_type');
    }
  }, []);

  // Available destinations for selected region
  const availableDestinations = useMemo(() => {
    if (selectedRegion === 'ALL') {
      const allDests = new Set<string>();
      hierarchy.regions.forEach((r) => r.destinations.forEach((d) => allDests.add(d.name)));
      return ['ALL', ...Array.from(allDests).sort()];
    }
    const reg = hierarchy.regions.find((r) => r.name.toUpperCase() === selectedRegion.toUpperCase());
    if (!reg) return ['ALL'];
    return ['ALL', ...reg.destinations.map((d) => d.name).sort()];
  }, [selectedRegion, hierarchy]);

  // Filtered tickets
  const filteredTickets = useMemo(() => {
    return searchCatalogue({
      query: searchQuery,
      region: selectedRegion,
      destination: selectedDestination !== 'ALL' ? selectedDestination : undefined,
      productType: selectedType !== 'ALL' ? selectedType : undefined
    });
  }, [searchQuery, selectedRegion, selectedDestination, selectedType]);

  const handleBookWhatsApp = (ticket: AttractionProduct) => {
    const message = `Hello VIETANA! I would like to book or inquire about attraction tickets:
*${ticket.name}*
Product ID: ${ticket.id}
Venue: ${ticket.venue}
Destination: ${ticket.destination} (${ticket.region})
Adult Rate: ${formatPriceVND(ticket.vietanaPrices.adult, currency)}
${ticket.vietanaPrices.child ? `Child Rate: ${formatPriceVND(ticket.vietanaPrices.child, currency)}` : ''}

Please confirm availability, booking cutoff, and instant e-voucher issuance.`;

    const url = buildWhatsAppLink(WHATSAPP_DEFAULT, message);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#111111] flex flex-col pt-16 relative">
      {/* Background Subtle Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat opacity-40 pointer-events-none" 
        style={{ backgroundImage: 'url(/packages_bg.png)' }} 
      />

      <Section id="attractions-catalogue" spacing="md" className="flex-1 relative z-10 bg-transparent">
        <Container className="w-full max-w-[1440px]">
          {/* Main Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Heading as="h1" size="4xl" font="serif" className="mb-3 tracking-tight text-[#12302B] dark:text-white drop-shadow-sm font-black">
                Vietnam Attraction Tickets & Passes
              </Heading>
              <div className="w-16 h-1 bg-[#D4AF37] mb-4 shadow-sm rounded-full"></div>
              <Text className="text-gray-600 dark:text-gray-300 font-light max-w-2xl text-base md:text-lg leading-relaxed">
                Wholesale negotiated admissions, cable car passes, theme parks, shows, and combo tickets across Vietnam. Instant WhatsApp voucher confirmation with on-ground concierge support.
              </Text>
            </div>

            {/* Search Input & View Toggle */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <div className="w-full md:w-80 relative group">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#12302B] transition-colors">
                  <Icon name="Search" size={15} />
                </div>
                <input 
                  type="text"
                  placeholder="Search ticket, venue, city, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-gray-800 pl-10 pr-4 py-3 rounded-full text-base sm:text-xs border border-[#E8E4D9] shadow-sm outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all font-sans font-medium"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 border-none bg-transparent cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Hierarchy vs Grid View Toggle */}
              <div className="flex bg-white border border-[#E8E4D9] p-1 rounded-full shadow-xs">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border-none cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'grid' 
                      ? 'bg-[#12302B] text-white shadow-xs' 
                      : 'bg-transparent text-gray-500 hover:text-[#12302B]'
                  }`}
                >
                  <Icon name="Grid" size={13} /> Grid
                </button>
                <button
                  onClick={() => setViewMode('hierarchy')}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border-none cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'hierarchy' 
                      ? 'bg-[#12302B] text-white shadow-xs' 
                      : 'bg-transparent text-gray-500 hover:text-[#12302B]'
                  }`}
                >
                  <Icon name="Layers" size={13} /> Hierarchy
                </button>
              </div>
            </div>
          </div>

          {/* Region Selector Tabs */}
          <div className="flex bg-[#FAF7F0] border border-[#E8E4D9] p-1.5 rounded-xl gap-2 overflow-x-auto mb-3 shadow-xs scrollbar-none">
            <button
              className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer border-none ${
                selectedRegion === 'ALL' 
                  ? 'bg-[#12302B] text-white shadow-sm' 
                  : 'bg-transparent text-gray-600 hover:text-[#12302B] hover:bg-white/60'
              }`}
              onClick={() => {
                setSelectedRegion('ALL');
                setSelectedDestination('ALL');
              }}
            >
              🇻🇳 All Regions ({hierarchy.totalProducts})
            </button>
            {REGIONS.map((region) => {
              const count = hierarchy.regions.find((r) => r.name === region)?.productCount || 0;
              return (
                <button
                  key={region}
                  className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer border-none ${
                    selectedRegion === region 
                      ? 'bg-[#12302B] text-white shadow-sm' 
                      : 'bg-transparent text-gray-600 hover:text-[#12302B] hover:bg-white/60'
                  }`}
                  onClick={() => {
                    setSelectedRegion(region);
                    setSelectedDestination('ALL');
                  }}
                >
                  {region} ({count})
                </button>
              );
            })}
          </div>

          {/* Destination Dropdown / Chips */}
          {availableDestinations.length > 2 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8860B] font-bold shrink-0">
                City / Destination:
              </span>
              {availableDestinations.map((dest) => (
                <button
                  key={dest}
                  onClick={() => setSelectedDestination(dest)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wide transition shrink-0 cursor-pointer border ${
                    selectedDestination === dest
                      ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                      : 'bg-white text-gray-600 border-[#E8E4D9] hover:bg-gray-50'
                  }`}
                >
                  {dest}
                </button>
              ))}
            </div>
          )}

          {/* Category / Type Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E8E4D9] scrollbar-none items-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8860B] font-bold mr-1 shrink-0">
              Type:
            </span>
            {PRODUCT_TYPES.map((type) => (
              <button
                key={type}
                className={`px-3.5 py-1.5 border rounded-full text-xs font-semibold tracking-wide uppercase transition shrink-0 duration-200 cursor-pointer ${
                  selectedType === type
                    ? 'border-[#12302B] bg-[#12302B] text-white shadow-xs'
                    : 'border-[#E8E4D9] bg-white text-gray-600 hover:border-[#12302B]/40 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
            <span className="ml-auto text-xs text-gray-500 font-mono hidden md:block shrink-0">
              Showing {filteredTickets.length} of {hierarchy.totalProducts} tickets
            </span>
          </div>

          {/* HIERARCHY TREE VIEW */}
          {viewMode === 'hierarchy' && (
            <div className="space-y-10 mb-16">
              {hierarchy.regions
                .filter((r) => selectedRegion === 'ALL' || r.name.toUpperCase() === selectedRegion.toUpperCase())
                .map((reg) => (
                  <div key={reg.name} className="bg-white rounded-3xl border border-[#E8E4D9] p-6 md:p-8 shadow-xs">
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8E4D9]">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-[#D4AF37]"></span>
                        <h2 className="font-serif font-black text-2xl text-[#12302B] tracking-tight">
                          {reg.name}
                        </h2>
                      </div>
                      <span className="text-xs font-mono font-bold bg-[#FAF7F0] border border-[#E8E4D9] px-3 py-1 rounded-full text-[#12302B]">
                        {reg.productCount} Products · {reg.destinations.length} Destinations
                      </span>
                    </div>

                    <div className="space-y-8">
                      {reg.destinations
                        .filter((d) => selectedDestination === 'ALL' || d.name.toLowerCase() === selectedDestination.toLowerCase())
                        .map((dest) => (
                          <div key={dest.name} className="pl-2 md:pl-4 border-l-2 border-[#D4AF37]/30">
                            <h3 className="font-serif font-bold text-lg text-emerald-950 mb-4 flex items-center gap-2">
                              <span>📍 {dest.name}</span>
                              <span className="text-xs font-sans font-normal text-gray-400">
                                ({dest.productCount} tickets across {dest.venues.length} venues)
                              </span>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {dest.venues.map((venue) => (
                                <div key={venue.name} className="bg-[#FAF8F3] border border-[#E8E4D9] rounded-2xl p-4 hover:shadow-md transition-shadow">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-serif font-bold text-sm text-[#12302B] truncate">
                                      {venue.name}
                                    </h4>
                                    <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-[#E8E4D9] font-bold text-gray-600">
                                      {venue.productCount}
                                    </span>
                                  </div>
                                  <div className="space-y-1.5 mt-3">
                                    {venue.products.slice(0, 3).map((p) => (
                                      <div 
                                        key={p.id}
                                        onClick={() => setSelectedTicket(p)}
                                        className="text-xs flex items-center justify-between gap-2 p-1.5 hover:bg-white rounded cursor-pointer transition-colors"
                                      >
                                        <span className="truncate text-gray-700 font-medium">{p.name}</span>
                                        <span className="text-[11px] font-bold text-[#12302B] shrink-0">
                                          {formatPriceVND(p.vietanaPrices.adult, currency)}
                                        </span>
                                      </div>
                                    ))}
                                    {venue.products.length > 3 && (
                                      <button 
                                        onClick={() => {
                                          setSelectedRegion(reg.name);
                                          setSelectedDestination(dest.name);
                                          setSearchQuery(venue.name);
                                          setViewMode('grid');
                                        }}
                                        className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B] hover:underline pt-1 block border-none bg-transparent cursor-pointer"
                                      >
                                        View all {venue.products.length} products ➔
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* GRID VIEW */}
          {viewMode === 'grid' && (
            <>
              {filteredTickets.length === 0 ? (
                <div className="text-center py-20 bg-white border border-[#E6D9BF]/30 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
                  <Icon name="Search" size={36} className="text-gray-300 mb-4 mx-auto" />
                  <h3 className="font-bold text-gray-800 text-lg mb-1">No attraction tickets match your criteria</h3>
                  <p className="text-xs text-gray-500 font-light mb-4">Try clearing the search query or switching to 'All Regions'.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRegion('ALL');
                      setSelectedDestination('ALL');
                      setSelectedType('ALL');
                    }}
                    className="bg-[#12302B] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border-none cursor-pointer hover:bg-[#1E4D45]"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredTickets.map((ticket) => {
                    const isReady = ticket.commercialStatus === 'READY';
                    const isStrategic = ticket.commercialStatus === 'STRATEGIC_LOW_MARGIN';

                    return (
                      <div 
                        key={ticket.id}
                        className="bg-white rounded-2xl overflow-hidden border border-[#E8E4D9] shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                      >
                        {/* Card Image Banner */}
                        <div className="relative h-44 overflow-hidden bg-gray-100 shrink-0">
                          <img 
                            src={ticket.image} 
                            alt={ticket.name} 
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          
                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                            <span className="bg-[#12302B]/90 backdrop-blur-md text-[#D4AF37] text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                              {ticket.region.replace(' VIETNAM', '')}
                            </span>
                            <span className="bg-white/95 text-gray-800 text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                              {ticket.type}
                            </span>
                          </div>

                          {/* Bottom Image Overlay: Venue & Destination */}
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <span className="text-[10px] font-mono text-[#D4AF37] font-bold block truncate">
                              📍 {ticket.destination}
                            </span>
                            <h4 className="text-xs font-semibold text-white/95 truncate">
                              {ticket.venue}
                            </h4>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[8px] font-mono text-gray-400 font-semibold uppercase">
                                {ticket.id}
                              </span>
                              {isStrategic && (
                                <span className="text-[7.5px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded">
                                  Best Value
                                </span>
                              )}
                            </div>

                            <h3 className="font-serif font-bold text-[#12302B] text-base leading-snug mb-2 group-hover:text-[#B8860B] transition-colors line-clamp-2">
                              {ticket.name}
                            </h3>

                            {ticket.inclusions && (
                              <p className="text-[11px] text-gray-500 font-light line-clamp-2 leading-relaxed mb-3">
                                {ticket.inclusions}
                              </p>
                            )}
                          </div>

                          <div className="border-t border-[#E8E4D9] pt-4 mt-auto">
                            {/* Price Block */}
                            <div className="flex items-baseline justify-between mb-3">
                              {isReady || isStrategic ? (
                                <>
                                  <div>
                                    <span className="text-[8px] uppercase tracking-widest font-bold text-gray-400 block">
                                      Adult Ticket
                                    </span>
                                    <span className="text-base font-extrabold text-[#12302B]">
                                      {formatPriceVND(ticket.vietanaPrices.adult, currency)}
                                    </span>
                                    {currency !== 'VND' && ticket.vietanaPrices.adult !== null && (
                                      <span className="text-[8.5px] text-gray-400 font-mono block">
                                        Base: {formatPriceVND(ticket.vietanaPrices.adult, 'VND')}
                                      </span>
                                    )}
                                  </div>
                                  {ticket.vietanaPrices.child !== null && (
                                    <div className="text-right">
                                      <span className="text-[8px] uppercase tracking-widest font-bold text-gray-400 block">
                                        Child
                                      </span>
                                      <span className="text-xs font-bold text-emerald-700">
                                        {formatPriceVND(ticket.vietanaPrices.child, currency)}
                                      </span>
                                      {currency !== 'VND' && (
                                        <span className="text-[8.5px] text-gray-400 font-mono block">
                                          Base: {formatPriceVND(ticket.vietanaPrices.child, 'VND')}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div>
                                  <span className="text-[8px] uppercase tracking-widest font-bold text-amber-600 block">
                                    Concierge Enquiry
                                  </span>
                                  <span className="text-sm font-bold text-amber-900">
                                    Rates on Request
                                  </span>
                                  <span className="text-[8.5px] text-gray-400 font-mono block">
                                    Custom quotation
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedTicket(ticket)}
                                className="flex-1 bg-transparent border border-[#E8E4D9] hover:bg-[#FAF7F0] text-[#12302B] py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer"
                              >
                                Details
                              </button>
                              {isReady || isStrategic ? (
                                <button
                                  onClick={() => setSelectedTicket(ticket)}
                                  className="flex-1 bg-[#12302B] hover:bg-[#1E4D45] text-white py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer border-none shadow-xs"
                                >
                                  <Icon name="MessageCircle" size={12} /> Book on WhatsApp
                                </button>
                              ) : (
                                <button
                                  onClick={() => setSelectedTicket(ticket)}
                                  className="flex-1 bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer border-none shadow-xs"
                                >
                                  <Icon name="MessageCircle" size={12} /> Enquire on WhatsApp
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </Container>

        {/* Ticket Detail Modal */}
        <AnimatePresence>
          {selectedTicket && (
            <Modal
              isOpen={!!selectedTicket}
              onClose={() => setSelectedTicket(null)}
              maxWidth="max-w-5xl"
              hideDefaultClose={true}
              className="max-h-[92vh] flex flex-col p-0 overflow-hidden bg-white border border-[#E8E4D9] rounded-2xl sm:rounded-3xl shadow-2xl"
            >
              {/* Modal Breadcrumbs & Header Bar */}
              <div className="px-4 sm:px-5 py-3 bg-[#FAF8F3] border-b border-[#E8E4D9] flex items-center justify-between gap-3 text-xs font-medium text-gray-500 overflow-x-auto scrollbar-none shrink-0">
                <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 shrink-0 overflow-x-auto scrollbar-none max-w-[calc(100%-48px)]">
                  <button 
                    onClick={() => setSelectedTicket(null)}
                    className="hover:text-[#12302B] hover:underline cursor-pointer bg-transparent border-none p-0 text-gray-500 font-medium shrink-0"
                  >
                    Attractions
                  </button>
                  <span className="text-gray-400 shrink-0">/</span>
                  <button 
                    onClick={() => {
                      setSelectedRegion(selectedTicket.region);
                      setSelectedTicket(null);
                    }}
                    className="hover:text-[#12302B] hover:underline cursor-pointer bg-transparent border-none p-0 text-gray-500 font-medium shrink-0"
                  >
                    {selectedTicket.region}
                  </button>
                  <span className="text-gray-400 shrink-0">/</span>
                  <button 
                    onClick={() => {
                      setSelectedRegion(selectedTicket.region);
                      setSelectedDestination(selectedTicket.destination);
                      setSelectedTicket(null);
                    }}
                    className="hover:text-[#12302B] hover:underline cursor-pointer bg-transparent border-none p-0 text-gray-500 font-medium shrink-0"
                  >
                    {selectedTicket.destination}
                  </button>
                  <span className="text-gray-400 shrink-0">/</span>
                  <button 
                    onClick={() => {
                      setSelectedRegion(selectedTicket.region);
                      setSelectedDestination(selectedTicket.destination);
                      setSearchQuery(selectedTicket.venue);
                      setSelectedTicket(null);
                    }}
                    className="hover:text-[#12302B] hover:underline cursor-pointer bg-transparent border-none p-0 text-gray-500 font-medium truncate max-w-[100px] sm:max-w-[130px] shrink-0"
                  >
                    {selectedTicket.venue}
                  </button>
                  <span className="text-gray-400 shrink-0">/</span>
                  <span className="text-[#12302B] font-bold truncate max-w-[120px] sm:max-w-[180px] shrink-0">
                    {selectedTicket.name}
                  </span>
                </nav>

                <button
                  onClick={() => setSelectedTicket(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition border-none bg-transparent cursor-pointer shrink-0 touch-manipulation"
                  aria-label="Close modal"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>

              {/* Modal Body: Two-Column Responsive Layout */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Comprehensive Product Details */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Image Banner */}
                    <div className="h-56 sm:h-64 w-full overflow-hidden relative rounded-2xl border border-[#E8E4D9]">
                      <img 
                        src={selectedTicket.image} 
                        alt={selectedTicket.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute top-3 left-3 text-white/90 text-[10px] tracking-widest font-mono font-bold uppercase flex items-center gap-1.5 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm border border-white/15">
                        <span>📍 {selectedTicket.destination}</span> · <span>{selectedTicket.region}</span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono font-bold block">
                            {selectedTicket.venue} · {selectedTicket.type}
                          </span>
                          <span className="text-[8px] font-mono bg-white/20 px-2 py-0.5 rounded text-white/90">
                            ID: {selectedTicket.id}
                          </span>
                        </div>
                        <Heading as="h3" size="xl" font="serif" className="text-white tracking-wide leading-tight">
                          {selectedTicket.name}
                        </Heading>
                      </div>
                    </div>

                    {/* Verified Pricing & 4-Currency Conversion */}
                    <div className="bg-[#FAF7F0] border border-[#E8E4D9] rounded-2xl p-5 shadow-xs">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-[#B8860B] font-bold">
                          Verified VIETANA Rates ({currency})
                        </h4>
                        <span className="text-[9px] text-gray-500 font-mono">Official Negotiated Price</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-center">
                        <div className="bg-white p-2.5 rounded-xl border border-[#E8E4D9]">
                          <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block mb-0.5">Adult</span>
                          <span className="text-sm font-black text-[#12302B]">
                            {formatPriceVND(selectedTicket.vietanaPrices.adult, currency)}
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-[#E8E4D9]">
                          <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block mb-0.5">Child</span>
                          <span className="text-sm font-black text-emerald-700">
                            {formatPriceVND(selectedTicket.vietanaPrices.child, currency)}
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-[#E8E4D9]">
                          <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block mb-0.5">Senior</span>
                          <span className="text-sm font-black text-gray-700">
                            {formatPriceVND(selectedTicket.vietanaPrices.senior, currency)}
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-[#E8E4D9]">
                          <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block mb-0.5">Student</span>
                          <span className="text-sm font-black text-blue-700">
                            {formatPriceVND(selectedTicket.vietanaPrices.student, currency)}
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-[#E8E4D9]">
                          <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block mb-0.5">Local</span>
                          <span className="text-sm font-black text-purple-700">
                            {formatPriceVND(selectedTicket.vietanaPrices.local, currency)}
                          </span>
                        </div>
                      </div>

                      {/* Live 4-Currency Rate Converter Bar (VND Base + EUR, USD, INR) */}
                      {selectedTicket.vietanaPrices.adult !== null && (
                        <div className="mt-4 pt-3 border-t border-[#E8E4D9]">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono font-bold">
                              💱 4-Currency Live Conversion (Fixed Base: VND)
                            </span>
                            <span className="text-[8px] text-gray-400 font-mono">Adult Ticket</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                            <div className="bg-white p-2 rounded-lg border border-emerald-200 bg-emerald-50/40">
                              <span className="text-[8px] text-emerald-800 uppercase font-bold block">₫ VND (Base)</span>
                              <span className="text-xs font-bold text-emerald-900">
                                {formatPriceVND(selectedTicket.vietanaPrices.adult, 'VND')}
                              </span>
                            </div>
                            <div className="bg-white p-2 rounded-lg border border-blue-200 bg-blue-50/40">
                              <span className="text-[8px] text-blue-800 uppercase font-bold block">€ EURO</span>
                              <span className="text-xs font-bold text-blue-900">
                                {formatPriceVND(selectedTicket.vietanaPrices.adult, 'EUR')}
                              </span>
                            </div>
                            <div className="bg-white p-2 rounded-lg border border-amber-200 bg-amber-50/40">
                              <span className="text-[8px] text-amber-800 uppercase font-bold block">$ US DOLLAR</span>
                              <span className="text-xs font-bold text-amber-900">
                                {formatPriceVND(selectedTicket.vietanaPrices.adult, 'USD')}
                              </span>
                            </div>
                            <div className="bg-white p-2 rounded-lg border border-purple-200 bg-purple-50/40">
                              <span className="text-[8px] text-purple-800 uppercase font-bold block">₹ INR</span>
                              <span className="text-xs font-bold text-purple-900">
                                {formatPriceVND(selectedTicket.vietanaPrices.adult, 'INR')}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 text-center">
                            <span className="text-[8px] text-gray-500 font-mono">
                              Fixed Base: ₫ VND · Dynamic: 1,000,000 VND = ₹3,700 INR · €1 ≈ 27,600 VND · $1 ≈ 25,400 VND
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Inclusions & Highlights */}
                    {selectedTicket.inclusions && (
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-[#12302B] font-bold mb-2">
                          Inclusions & Highlights
                        </h4>
                        <p className="text-xs text-gray-700 leading-relaxed bg-[#FAF8F3] border border-[#E8E4D9] p-4 rounded-xl">
                          {selectedTicket.inclusions}
                        </p>
                      </div>
                    )}

                    {/* Height & Eligibility */}
                    {(selectedTicket.heightRequirement || selectedTicket.ageRequirement || selectedTicket.eligibility) && (
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-[#12302B] font-bold mb-2">
                          Eligibility & Child/Senior Rules
                        </h4>
                        <div className="text-xs text-gray-700 leading-relaxed bg-[#FAF8F3] border border-[#E8E4D9] p-4 rounded-xl space-y-1.5">
                          {selectedTicket.heightRequirement && <div><strong>Height Policy:</strong> {selectedTicket.heightRequirement}</div>}
                          {selectedTicket.ageRequirement && <div><strong>Age Policy:</strong> {selectedTicket.ageRequirement}</div>}
                          {selectedTicket.eligibility && <div><strong>Conditions:</strong> {selectedTicket.eligibility}</div>}
                        </div>
                      </div>
                    )}

                    {/* Validity & Time Slots */}
                    {(selectedTicket.validity || selectedTicket.visitDateRequirement || selectedTicket.timeSlotRequirement || selectedTicket.bookingCutoff) && (
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-[#12302B] font-bold mb-2">
                          Validity & Schedule
                        </h4>
                        <div className="text-xs text-gray-700 leading-relaxed bg-[#FAF8F3] border border-[#E8E4D9] p-4 rounded-xl space-y-1.5">
                          {selectedTicket.validity && <div><strong>Validity:</strong> {selectedTicket.validity}</div>}
                          {selectedTicket.visitDateRequirement && <div><strong>Visit Date:</strong> {selectedTicket.visitDateRequirement}</div>}
                          {selectedTicket.timeSlotRequirement && <div><strong>Time Slot:</strong> {selectedTicket.timeSlotRequirement}</div>}
                          {selectedTicket.bookingCutoff && <div><strong>Booking Cut-off:</strong> {selectedTicket.bookingCutoff}</div>}
                        </div>
                      </div>
                    )}

                    {/* Policies */}
                    {(selectedTicket.cancellationPolicy || selectedTicket.refundPolicy) && (
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-[#12302B] font-bold mb-2">
                          Cancellation & Refund Policy
                        </h4>
                        <div className="text-xs text-gray-700 leading-relaxed bg-[#FAF8F3] border border-[#E8E4D9] p-4 rounded-xl space-y-1.5">
                          {selectedTicket.cancellationPolicy && <div><strong>Cancellation:</strong> {selectedTicket.cancellationPolicy}</div>}
                          {selectedTicket.refundPolicy && <div><strong>Refund:</strong> {selectedTicket.refundPolicy}</div>}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Attraction Booking & Enquiry Widget */}
                  <div id="booking-widget-section" className="lg:col-span-5 lg:sticky lg:top-4">
                    <AttractionBookingWidget 
                      product={selectedTicket} 
                      currency={currency}
                      onBookSubmitted={() => {}}
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Sticky Bottom Action Bar */}
              <div 
                className="lg:hidden sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E8E4D9] p-3.5 flex items-center justify-between gap-3 shadow-lg z-20"
                style={{ paddingBottom: 'max(0.875rem, env(safe-area-inset-bottom))' }}
              >
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">
                    {(selectedTicket.commercialStatus === 'READY' || selectedTicket.commercialStatus === 'STRATEGIC_LOW_MARGIN') && selectedTicket.vietanaPrices.adult ? 'Estimated From' : 'Status'}
                  </span>
                  <span className="text-base font-black text-[#12302B]">
                    {(selectedTicket.commercialStatus === 'READY' || selectedTicket.commercialStatus === 'STRATEGIC_LOW_MARGIN') && selectedTicket.vietanaPrices.adult 
                      ? formatPriceVND(selectedTicket.vietanaPrices.adult, currency) 
                      : 'Enquiry Only'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('booking-widget-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-[#12302B] hover:bg-[#1E4D45] text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border-none cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95 transition-transform touch-manipulation"
                >
                  <Icon name="MessageCircle" size={14} /> {(selectedTicket.commercialStatus === 'READY' || selectedTicket.commercialStatus === 'STRATEGIC_LOW_MARGIN') && selectedTicket.vietanaPrices.adult ? 'Book on WhatsApp' : 'Enquire'}
                </button>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </Section>
    </div>
  );
}
