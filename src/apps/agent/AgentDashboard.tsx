import React, { useState, useMemo } from 'react';
import Icon from '../../components/ui/Icon';
import { Heading, Text } from '../../components/ui/Typography';
import Button from '../../components/ui/Button';

interface Lead {
  id: string;
  name: string;
  destination: string;
  departure: string;
  days: number;
  paxAdults: number;
  paxChildren: number;
  targetBudget: string;
  style: 'comfort' | 'premium' | 'luxury';
  food: string;
  confidence: number;
  status: 'Proposal Ready' | 'Negotiating' | 'Payment Pending' | 'Confirmed';
  phone: string;
  email: string;
  // Dynamic pricing
  flightCost: number;
  hotelCost: number;
  transferCost: number;
  visaCost: number;
  // Selected suppliers
  supplierHotel: string;
  supplierFlight: string;
  supplierTransfer: string;
  // Notes
  customerNotes: string;
  internalNotes: string;
}

const initialLeads: Lead[] = [
  {
    id: 'VT-2026-00421',
    name: 'Rahul Sharma',
    destination: 'Da Nang ➔ Hoi An',
    departure: 'Mumbai',
    days: 13,
    paxAdults: 2,
    paxChildren: 0,
    targetBudget: '₹2.5L',
    style: 'comfort',
    food: 'Vegetarian',
    confidence: 94,
    status: 'Proposal Ready',
    phone: '+84 90 243 4006',
    email: 'rahul.sharma@gmail.com',
    flightCost: 55000,
    hotelCost: 117000,
    transferCost: 3000,
    visaCost: 2500,
    supplierHotel: 'Grand Beach Hotel (Da Nang)',
    supplierFlight: 'VietJet Air',
    supplierTransfer: 'Airport Sedan Shuttle',
    customerNotes: 'Prefers hotels close to beachfront area. Strictly vegetarian breakfasts.',
    internalNotes: 'Grand Beach Hotel is offering 14% group booking contract margin this month.'
  },
  {
    id: 'VT-2026-00422',
    name: 'Priya Patel',
    destination: 'Hanoi ➔ Halong Bay',
    departure: 'Delhi',
    days: 8,
    paxAdults: 2,
    paxChildren: 1,
    targetBudget: '₹2.1L',
    style: 'comfort',
    food: 'All meals',
    confidence: 90,
    status: 'Negotiating',
    phone: '+91 98101 23456',
    email: 'priya.patel@yahoo.com',
    flightCost: 65000,
    hotelCost: 82000,
    transferCost: 4000,
    visaCost: 3750,
    supplierHotel: 'Hanoi Silk Boutique',
    supplierFlight: 'Air India',
    supplierTransfer: 'Private Minivan',
    customerNotes: 'Requested early check-in at Hanoi and child car seat.',
    internalNotes: 'Child seat is mapped with local driver DMC. Extra visa charge added for kid.'
  }
];

const AgentDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  
  // Versions comparison state
  const [activeVersion, setActiveVersion] = useState<1 | 2 | 3>(1);

  // AI Co-Pilot command console state
  const [copilotCommand, setCopilotCommand] = useState('');
  const [copilotResponse, setCopilotResponse] = useState<string | null>(null);

  // Active Journey Mapped Details
  const activeLead = useMemo(() => {
    return leads.find(l => l.id === activeLeadId) || null;
  }, [leads, activeLeadId]);

  // Handle lead selection
  const handleSelectLead = (lead: Lead) => {
    setActiveLeadId(lead.id);
  };

  // Handle price edits in workspace
  const handleUpdatePrice = (key: 'flightCost' | 'hotelCost' | 'transferCost' | 'visaCost', value: number) => {
    if (!activeLeadId) return;
    setLeads(prev => prev.map(l => l.id === activeLeadId ? { ...l, [key]: value } : l));
  };

  // Handle supplier swap
  const handleSwapSupplier = (key: 'supplierHotel' | 'supplierFlight' | 'supplierTransfer', value: string) => {
    if (!activeLeadId) return;
    setLeads(prev => prev.map(l => l.id === activeLeadId ? { ...l, [key]: value } : l));
  };

  // Handle status update
  const handleUpdateStatus = (status: Lead['status']) => {
    if (!activeLeadId) return;
    setLeads(prev => prev.map(l => l.id === activeLeadId ? { ...l, status } : l));
  };

  // Edit notes
  const handleUpdateNotes = (key: 'customerNotes' | 'internalNotes', text: string) => {
    if (!activeLeadId) return;
    setLeads(prev => prev.map(l => l.id === activeLeadId ? { ...l, [key]: text } : l));
  };

  // Recalculate financial margins
  const financials = useMemo(() => {
    if (!activeLead) return { total: 0, supplierNet: 0, profit: 0, commission: 0, marginPercent: 0 };
    
    // Version multiplier mock shifts
    let versionMultiplier = 1.0;
    if (activeVersion === 2) versionMultiplier = 1.25;
    if (activeVersion === 3) versionMultiplier = 1.65;

    const baseTotal = activeLead.flightCost + activeLead.hotelCost + activeLead.transferCost + activeLead.visaCost;
    const total = Math.round(baseTotal * versionMultiplier);
    
    const marginPercent = activeLead.style === 'luxury' ? 18 : 14;
    const profit = Math.round(total * (marginPercent / 100));
    const supplierNet = total - profit;
    const commission = Math.round(profit * 0.3); // 30% split
    
    return {
      total,
      supplierNet,
      profit,
      commission,
      marginPercent
    };
  }, [activeLead, activeVersion]);

  // AI Co-Pilot command handler
  const handleCopilotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!copilotCommand.trim() || !activeLead) return;

    const cmd = copilotCommand.toLowerCase();
    if (cmd.includes('reduce') || cmd.includes('budget') || cmd.includes('cheaper') || cmd.includes('20')) {
      setCopilotResponse(`💡 Vina's Advice: To reduce this journey by ₹20,000:\n- Switch ${activeLead.supplierHotel} ➔ Boutique Silk Hostel (Saves ₹14,000)\n- Replace ${activeLead.supplierTransfer} with Shared Bus Transfer (Saves ₹6,000).\nEstimated savings: ₹20,000.`);
    } else if (cmd.includes('beach') || cmd.includes('extra')) {
      setCopilotResponse(`💡 Vina's Advice: Mapped 1 extra beach day at Da Nang:\n- Accommodation increases by ₹4,800.\n- Recalculating transfers & flights... All flight return timings compatible.`);
    } else {
      setCopilotResponse(`💡 Vina's Advice: Command parsed successfully. Recommendation: Change flight package class to comfort to optimize budget margins.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 flex flex-col gap-6">
      
      {/* HEADER BANNER */}
      <div className="bg-[#12302B] text-white p-6 rounded-2xl flex justify-between items-center shadow-md select-none shrink-0 border-b-4 border-[#D4AF37]">
        <div className="flex items-center gap-4">
          {activeLeadId && (
            <button 
              onClick={() => setActiveLeadId(null)}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-xl text-white cursor-pointer transition-colors"
            >
              <Icon name="ArrowLeft" size={16} />
            </button>
          )}
          <div>
            <Heading as="h2" variant="white" className="text-xl font-serif font-bold text-white flex items-center gap-2">
              <Icon name="Compass" className="text-brand-gold" /> VIETANA Agent Workspace Portal
            </Heading>
            <Text className="text-xs text-white/60">Welcome back, Chayan • Operations Lead Dashboard</Text>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs bg-black/20 border border-white/10 px-4 py-2 rounded-full">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono">Today's Revenue: ₹8,45,000</span>
        </div>
      </div>

      {!activeLeadId ? (
        /* MAIN LANDING DASHBOARD VIEW */
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { title: "Today's Leads", value: 18, color: 'text-blue-600', icon: "Users" },
              { title: "Ready for Proposal", value: 6, color: 'text-purple-600', icon: "FileText" },
              { title: "Awaiting Customer", value: 9, color: 'text-amber-600', icon: "Clock" },
              { title: "Confirmed Bookings", value: 4, color: 'text-emerald-600', icon: "ThumbsUp" },
              { title: "Today's Revenue", value: "₹8,45,000", color: 'text-indigo-600', icon: "TrendingUp" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-xs">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400">{stat.title}</span>
                  <span className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</span>
                </div>
                <div className="text-gray-200">
                  <Icon name={stat.icon as any} size={24} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left/Middle: CRM AI Journey Cards Inbox */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <Heading as="h3" className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <Icon name="Inbox" className="text-[#1E4D45]" /> AI Journey Inbox
              </Heading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leads.map(lead => (
                  <div key={lead.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col gap-4 relative hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">Journey #{lead.id}</span>
                        <Heading as="h4" className="text-base font-bold text-gray-900 mt-0.5">{lead.name}</Heading>
                        <p className="text-xs text-gray-500">{lead.destination}</p>
                      </div>
                      <span className="text-[10px] font-mono bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full uppercase">
                        AI Conf. {lead.confidence}%
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div>
                        <span className="block text-gray-400 font-bold uppercase text-[8px]">Hub</span>
                        <strong>{lead.departure}</strong>
                      </div>
                      <div>
                        <span className="block text-gray-400 font-bold uppercase text-[8px]">Group</span>
                        <strong>{lead.paxAdults} Adults</strong>
                      </div>
                      <div>
                        <span className="block text-gray-400 font-bold uppercase text-[8px]">Target</span>
                        <strong className="text-emerald-700">{lead.targetBudget}</strong>
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t pt-4 border-gray-100">
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase">
                        {lead.status}
                      </span>
                      <button 
                        onClick={() => handleSelectLead(lead)}
                        className="bg-[#12302B] hover:bg-[#1E4D45] text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Open Journey
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Agent Performance Panel */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-4">
              <Heading as="h3" className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-1.5">
                <Icon name="Activity" className="text-[#1E4D45]" /> Your Performance Metrics
              </Heading>

              <div className="flex flex-col gap-4 text-xs text-gray-600">
                <div className="flex justify-between items-center">
                  <span>Leads Assigned this Month:</span>
                  <span className="font-bold text-gray-900">42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Conversion Rate:</span>
                  <span className="font-bold text-emerald-700">88%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Revenue Mapped:</span>
                  <span className="font-bold text-indigo-700">₹18,40,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Avg response speed:</span>
                  <span className="font-bold text-gray-900">14 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>CSAT Customer Score:</span>
                  <span className="font-bold text-[#8B6508]">4.8/5 ⭐</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* THREE-COLUMN WORKSPACE VIEW */
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Proposal Timeline Tracker Banner */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex justify-between items-center overflow-x-auto text-[10px] font-bold uppercase tracking-wider text-gray-400 select-none">
            {[
              { id: 'Created', label: '1. Created ✓' },
              { id: 'AI Designed', label: '2. AI Designed ✓' },
              { id: 'Agent Reviewed', label: '3. Agent Reviewed ✓' },
              { id: 'Proposal Ready', label: '4. Proposal Sent' },
              { id: 'Viewed', label: '5. Viewed' },
              { id: 'Replied', label: '6. Customer Replied' },
              { id: 'Negotiating', label: '7. Negotiation' },
              { id: 'Payment Pending', label: '8. Payment' },
              { id: 'Confirmed', label: '9. Confirmed' }
            ].map(step => {
              const isActive = activeLead.status === 'Proposal Ready' && step.id === 'Proposal Ready' ||
                               activeLead.status === 'Negotiating' && step.id === 'Negotiating' ||
                               activeLead.status === 'Payment Pending' && step.id === 'Payment Pending' ||
                               activeLead.status === 'Confirmed' && step.id === 'Confirmed';
              return (
                <span 
                  key={step.id} 
                  className={`${isActive ? 'text-[#1E4D45] font-extrabold border-b-2 border-[#1E4D45] pb-1' : ''}`}
                >
                  {step.label}
                </span>
              );
            })}
          </div>

          {/* Three-Column Workspace Grid */}
          <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* COLUMN 1: Customer Specifications & Documents */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-5 justify-between">
              <div>
                <Heading as="h3" className="text-xs font-bold text-gray-900 border-b pb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <Icon name="Users" size={14} className="text-[#1E4D45]" /> Column 1: Customer Specifications
                </Heading>

                <div className="flex flex-col gap-4 mt-3 text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">Contact Details</span>
                    <p className="font-semibold mt-0.5">{activeLead.name}</p>
                    <p className="text-gray-500">{activeLead.phone} • {activeLead.email}</p>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">Traveler Preferences</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-[9px] font-bold">{activeLead.food} Food</span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-[9px] font-bold capitalize">{activeLead.style} Style</span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-[9px] font-bold">{activeLead.days} Days</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">Customer Comments</span>
                    <textarea 
                      value={activeLead.customerNotes}
                      onChange={e => handleUpdateNotes('customerNotes', e.target.value)}
                      rows={3}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs outline-none mt-1"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Uploaded Documents</span>
                    <div className="flex flex-col gap-1.5">
                      <p className="flex items-center gap-1 text-[10px] text-[#1E4D45] font-semibold bg-[#1E4D45]/5 px-3 py-1.5 rounded-lg border border-[#1E4D45]/10">
                        📄 passport_scans.pdf
                      </p>
                      <p className="flex items-center gap-1 text-[10px] text-[#1E4D45] font-semibold bg-[#1E4D45]/5 px-3 py-1.5 rounded-lg border border-[#1E4D45]/10">
                        📄 flight_tickets_draft.pdf
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: AI Journey Timeline & Cost Editor */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-5">
              <div>
                <div className="flex justify-between items-center border-b pb-2">
                  <Heading as="h3" className="text-xs font-bold text-gray-900 flex items-center gap-1.5 uppercase tracking-wider">
                    <Icon name="Compass" size={14} className="text-[#1E4D45]" /> Column 2: AI Journey Editor
                  </Heading>
                  
                  {/* Version comparison tabs */}
                  <div className="flex gap-1">
                    {[1, 2, 3].map(v => (
                      <button 
                        key={v}
                        onClick={() => setActiveVersion(v as any)}
                        className={`px-2 py-0.5 text-[8px] font-bold rounded-md uppercase border cursor-pointer
                          ${activeVersion === v ? 'bg-[#1E4D45] text-white border-[#1E4D45]' : 'bg-white text-gray-500 border-gray-200'}`}
                      >
                        V{v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Day-by-Day Route Planner */}
                <div className="flex flex-col gap-3 mt-3 text-xs max-h-[220px] overflow-y-auto pr-1">
                  <div className="border-l-2 border-[#E6D9BF] pl-3 ml-1 flex flex-col gap-2.5">
                    <p><strong>Day 1 - 3:</strong> Da Nang beach resort check-in. Evening walks in Hoi An Ancient Town.</p>
                    <p><strong>Day 4 - 6:</strong> Private Ba Na Hills tour & Golden Bridge photography excursion.</p>
                    <p><strong>Day 7 - 10:</strong> Domestic transit to Hanoi. Sightseeing at Hoan Kiem Lake.</p>
                    <p><strong>Day 11 - 13:</strong> Overnight Halong Bay luxury cruise stateroom accommodation.</p>
                  </div>
                </div>

                {/* Pricing Fields Overrides */}
                <div className="flex flex-col gap-3.5 border-t pt-4 border-gray-100 mt-4">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Supplier Tariff Cost Overrides</span>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label htmlFor="agent-hotel" className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Accommodation (INR)</label>
                      <input 
                        id="agent-hotel"
                        type="number" 
                        value={activeLead.hotelCost} 
                        onChange={e => handleUpdatePrice('hotelCost', parseInt(e.target.value) || 0)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="agent-flight" className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Flight Tariff (INR)</label>
                      <input 
                        id="agent-flight"
                        type="number" 
                        value={activeLead.flightCost} 
                        onChange={e => handleUpdatePrice('flightCost', parseInt(e.target.value) || 0)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-[#FAF8F3] border border-[#E6D9BF] rounded-xl p-3.5 flex justify-between items-center text-xs">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-wider text-gray-400 font-bold">Total Estimated Budget</span>
                    <span className="text-sm font-bold text-[#1E4D45]">Version {activeVersion} Selected</span>
                  </div>
                  <span className="text-xl font-serif text-[#1E4D45] font-extrabold">
                    ₹{financials.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* COLUMN 3: Operations Margin & Supplier Panel */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-5 justify-between">
              
              <div className="flex flex-col gap-4">
                <Heading as="h3" className="text-xs font-bold text-gray-900 border-b pb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <Icon name="Activity" size={14} className="text-[#1E4D45]" /> Column 3: B2B Operations
                </Heading>

                {/* Supplier selection checklist */}
                <div className="flex flex-col gap-2.5 text-xs">
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Active Local Suppliers Mapped</span>
                  <div className="flex flex-col gap-1.5">
                    <p className="flex justify-between items-center bg-gray-50 border rounded-lg p-2 text-[10px]">
                      <span>🏨 {activeLead.supplierHotel}</span>
                      <span className="text-emerald-700 font-bold font-mono">14% Margin</span>
                    </p>
                    <p className="flex justify-between items-center bg-gray-50 border rounded-lg p-2 text-[10px]">
                      <span>✈ {activeLead.supplierFlight}</span>
                      <span className="text-indigo-700 font-bold font-mono">Net Cost Tariffs</span>
                    </p>
                  </div>
                </div>

                {/* Financial Ledger Margin splits */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-2.5 text-[10px] text-gray-600">
                  <span className="font-bold uppercase tracking-wider text-gray-400">Financial margin ledger split</span>
                  <div className="flex justify-between">
                    <span>Supplier Net Cost:</span>
                    <span className="font-mono font-bold">₹{financials.supplierNet.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Markup Profit ({financials.marginPercent}%):</span>
                    <span className="font-mono font-bold text-emerald-700">₹{financials.profit.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 border-gray-200">
                    <span>Agent Commission (30%):</span>
                    <span className="font-mono font-bold text-indigo-700">₹{financials.commission.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Internal notes */}
                <div className="flex flex-col gap-1.5 mt-2">
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">Internal Operations Notes</span>
                  <textarea 
                    value={activeLead.internalNotes}
                    onChange={e => handleUpdateNotes('internalNotes', e.target.value)}
                    rows={2}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-[10px] outline-none font-medium text-gray-600"
                  />
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex gap-2 border-t pt-4 border-gray-100">
                <button 
                  onClick={() => handleUpdateStatus('Proposal Ready')}
                  className="flex-1 bg-emerald-600 text-white py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                >
                  Send Proposal
                </button>
                <button 
                  onClick={() => handleUpdateStatus('Confirmed')}
                  className="flex-1 bg-[#12302B] text-white py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                >
                  Confirm Booking
                </button>
              </div>

            </div>

          </div>

          {/* AI Co-Pilot Console at the bottom */}
          <div className="bg-[#FAF8F3] border-2 border-dashed border-[#E6D9BF] rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" className="text-brand-gold animate-pulse" />
              <Heading as="h4" className="text-xs font-bold text-[#12302B] uppercase tracking-wider">Vina's Agent AI Co-Pilot Console</Heading>
            </div>

            <form onSubmit={handleCopilotSubmit} className="flex gap-3">
              <input 
                type="text" 
                placeholder="Instruct Vina (e.g., 'Reduce this journey by ₹20,000' or 'Add extra beachfront hotel night')" 
                value={copilotCommand}
                onChange={e => setCopilotCommand(e.target.value)}
                className="flex-1 bg-white border border-[#E6D9BF] rounded-xl px-4 py-3 text-xs outline-none"
              />
              <button 
                type="submit" 
                className="bg-[#12302B] hover:bg-[#1E4D45] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                Run Instruction
              </button>
            </form>

            {copilotResponse && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-xs text-indigo-900 leading-relaxed font-semibold whitespace-pre-line animate-msg-fade-in shadow-inner">
                {copilotResponse}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default AgentDashboard;
export { AgentDashboard };
