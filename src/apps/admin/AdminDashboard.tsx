import React, { useState, useMemo } from 'react';
import Icon from '../../components/ui/Icon';
import { Heading, Text } from '../../components/ui/Typography';

interface JourneyAudit {
  id: string;
  timestamp: string;
  agent: string;
  action: string;
  detail: string;
  reason: string;
}

interface AgentPerformance {
  name: string;
  status: 'Online' | 'Offline';
  activeJourneys: number;
  conversionRate: number;
  revenue: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  completedTrips: number;
  activeStatus: string;
}

interface Supplier {
  id: string;
  name: string;
  category: 'Hotel' | 'Transport' | 'Guide' | 'Visa';
  location: string;
  netRate: string;
  marginPercent: number;
}

const initialAudits: JourneyAudit[] = [
  { id: '1', timestamp: '10:32', agent: 'Agent Rahul', action: 'Changed Hotel in Da Nang', detail: 'Hilton ➔ Novotel', reason: 'Customer Request' },
  { id: '2', timestamp: '11:15', agent: 'Agent Priya', action: 'Applied B2B Markup', detail: '10% ➔ 14%', reason: 'Agency contract renewal' }
];

const initialAgents: AgentPerformance[] = [
  { name: 'Chayan Soni', status: 'Online', activeJourneys: 15, conversionRate: 94, revenue: '₹42L' },
  { name: 'Rahul Kumar', status: 'Online', activeJourneys: 12, conversionRate: 88, revenue: '₹34L' }
];

const initialCustomers: Customer[] = [
  { id: 'CUST-08291', name: 'Amit Verma', email: 'amit.verma@gmail.com', phone: '+91 99583 28192', completedTrips: 3, activeStatus: 'Traveling' },
  { id: 'CUST-08292', name: 'Rahul Singh', email: 'rahul.singh@yahoo.com', phone: '+91 98123 45678', completedTrips: 1, activeStatus: 'Proposal Sent' }
];

const initialSuppliers: Supplier[] = [
  { id: 'SUP-001', name: 'Indochina DMC Ground Services', category: 'Transport', location: 'Saigon', netRate: '₹4,500/day', marginPercent: 12 },
  { id: 'SUP-002', name: 'Grand Beach Hotel Da Nang', category: 'Hotel', location: 'Da Nang', netRate: '₹3,200/night', marginPercent: 14 }
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'journeys' | 'customers' | 'agents' | 'suppliers' | 'ai' | 'pricing' | 'audit' | 'roles' | 'settings'>('dashboard');

  // Search parameters for Journeys
  const [journeySearch, setJourneySearch] = useState('');
  const [journeyFilter, setJourneyFilter] = useState('All');

  // AI model settings
  const [model, setModel] = useState('gemini-2.5-pro');
  const [temperature, setTemperature] = useState(0.2);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Active pricing registry rates
  const [comfortHotelRate, setComfortHotelRate] = useState(4500);
  const [comfortFlightRate, setComfortFlightRate] = useState(28000);

  // Roles permission checkmarks state
  const [ownerPerms, setOwnerPerms] = useState<string[]>(['read', 'write', 'delete', 'ai_rollback']);
  const [agentPerms, setAgentPerms] = useState<string[]>(['read', 'write']);

  const handleSaveConfigs = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const togglePermission = (role: 'owner' | 'agent', perm: string) => {
    if (role === 'owner') {
      setOwnerPerms(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]);
    } else {
      setAgentPerms(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 flex flex-col gap-6">
      
      {/* Header Banner */}
      <div className="bg-[#12302B] text-white p-6 rounded-2xl flex justify-between items-center shadow-md border-b-4 border-[#D4AF37] select-none shrink-0">
        <div>
          <Heading as="h2" variant="white" className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <Icon name="Settings" className="text-brand-gold animate-spin-slow" /> VIETANA Control Center
          </Heading>
          <Text className="text-xs text-white/60">Configure supplier contracts, agent assignments, AI prompts, and granular system roles.</Text>
        </div>
        <div className="flex items-center gap-2 text-xs bg-black/20 border border-white/10 px-3.5 py-1.5 rounded-full">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono">Owner Access Dashboard</span>
        </div>
      </div>

      {/* Tabs Menu Controls */}
      <div className="flex gap-2 border-b pb-2 overflow-x-auto select-none shrink-0">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: 'Activity' },
          { id: 'journeys', label: 'Journey Monitoring', icon: 'Compass' },
          { id: 'customers', label: 'Customers', icon: 'Users' },
          { id: 'agents', label: 'Agent Management', icon: 'Users' },
          { id: 'suppliers', label: 'Supplier Registry', icon: 'Home' },
          { id: 'ai', label: 'AI Control Center', icon: 'Cpu' },
          { id: 'pricing', label: 'Pricing Center', icon: 'TrendingUp' },
          { id: 'roles', label: 'Roles & Permissions', icon: 'Settings' },
          { id: 'audit', label: 'Audit Logs', icon: 'FileText' },
          { id: 'settings', label: 'System Settings', icon: 'Settings' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all flex items-center gap-1.5 shrink-0
              ${activeTab === tab.id ? 'bg-[#12302B] text-white border-[#12302B]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'}`}
          >
            <Icon name={tab.icon as any} size={11} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Pages */}
      <div className="flex-1 overflow-y-auto">
        
        {activeTab === 'dashboard' && (
          <div className="flex flex-col gap-6 animate-msg-fade-in">
            {/* Stats Metrics Panels */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {[
                { label: "Today's Revenue", value: "₹12,80,000", color: "text-emerald-700" },
                { label: "New Journeys", value: "26", color: "text-blue-600" },
                { label: "Active Travelers", value: "43", color: "text-indigo-600" },
                { label: "Pending Payments", value: "7", color: "text-amber-600" },
                { label: "Open Support", value: "3", color: "text-rose-600" },
                { label: "AI Success Rate", value: "97%", color: "text-purple-600" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white border p-4 rounded-xl shadow-xs text-center flex flex-col justify-center items-center">
                  <span className="text-[9px] uppercase font-bold text-gray-400 block mb-0.5">{stat.label}</span>
                  <span className={`text-lg font-extrabold ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-white border rounded-xl p-5 shadow-xs flex flex-col gap-4">
              <Heading as="h3" className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-1.5">
                <Icon name="TrendingUp" className="text-[#1E4D45]" /> Seasonal Analytics Overview
              </Heading>
              <div className="grid grid-cols-3 gap-6 text-xs text-gray-600">
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-0.5 items-center text-center">
                  <span className="font-bold text-gray-400 text-[8px] uppercase">Popular City Mapped</span>
                  <strong className="text-lg text-gray-900">Da Nang (62%)</strong>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-0.5 items-center text-center">
                  <span className="font-bold text-gray-400 text-[8px] uppercase">Average Trip Duration</span>
                  <strong className="text-lg text-gray-900">8.4 Days</strong>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-0.5 items-center text-center">
                  <span className="font-bold text-gray-400 text-[8px] uppercase">India Leads Share</span>
                  <strong className="text-lg text-gray-900">92% Delhi/Mumbai</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'journeys' && (
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-4 animate-msg-fade-in">
            <Heading as="h3" className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-1.5">
              <Icon name="Compass" className="text-[#1E4D45]" /> Journey Monitoring Dashboard
            </Heading>

            {/* Search Filter Header */}
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Search Journey ID, Customer, Phone, Email..." 
                value={journeySearch}
                onChange={e => setJourneySearch(e.target.value)}
                className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none"
              />
              <select 
                value={journeyFilter} 
                onChange={e => setJourneyFilter(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none cursor-pointer"
              >
                <option value="All">All Stages</option>
                <option value="Planning">Planning</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Booked">Booked</option>
              </select>
            </div>

            <div className="flex flex-col gap-2.5 mt-2">
              <div className="border border-gray-100 rounded-lg p-3 flex justify-between items-center text-xs bg-gray-50">
                <div>
                  <span className="font-bold">Rahul Sharma (#VT-2026-00421)</span>
                  <p className="text-[10px] text-gray-500">Da Nang ➔ Hoi An • 13 Days • Comfort Style • Agent: Chayan</p>
                </div>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full uppercase">Booked</span>
              </div>
              <div className="border border-gray-100 rounded-lg p-3 flex justify-between items-center text-xs bg-gray-50">
                <div>
                  <span className="font-bold">Priya Patel (#VT-2026-00422)</span>
                  <p className="text-[10px] text-gray-500">Hanoi ➔ Halong Bay • 8 Days • Comfort Style • Agent: Rahul</p>
                </div>
                <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded-full uppercase">Negotiating</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-4 animate-msg-fade-in">
            <Heading as="h3" className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-1.5">
              <Icon name="Users" className="text-[#1E4D45]" /> Customer Profile Registry
            </Heading>

            <div className="flex flex-col gap-2.5">
              {initialCustomers.map(cust => (
                <div key={cust.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-gray-900">{cust.name}</span>
                    <span className="text-[8px] bg-gray-200 font-bold px-2 py-0.5 rounded-full uppercase ml-2">{cust.id}</span>
                    <p className="text-[10px] text-gray-500 mt-1">{cust.email} • {cust.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#1E4D45]">{cust.completedTrips} Trips Mapped</p>
                    <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">{cust.activeStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-4 animate-msg-fade-in">
            <Heading as="h3" className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-1.5">
              <Icon name="Users" className="text-[#1E4D45]" /> Agent Operations Controller
            </Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {initialAgents.map(agent => (
                <div key={agent.name} className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex flex-col gap-3 relative">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">{agent.name}</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full uppercase">{agent.status}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-500">
                    <div>
                      <span>Active:</span>
                      <strong className="block text-gray-900">{agent.activeJourneys} Journeys</strong>
                    </div>
                    <div>
                      <span>Conversion:</span>
                      <strong className="block text-gray-900">{agent.conversionRate}%</strong>
                    </div>
                    <div>
                      <span>Revenue:</span>
                      <strong className="block text-[#1E4D45]">{agent.revenue}</strong>
                    </div>
                  </div>
                  <div className="flex gap-2 border-t pt-3 border-gray-200 mt-1">
                    <button className="bg-[#12302B] text-white px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider cursor-pointer">Assign Leads</button>
                    <button className="bg-white border text-gray-600 px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider cursor-pointer">Disable Account</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'suppliers' && (
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-4 animate-msg-fade-in">
            <Heading as="h3" className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-1.5">
              <Icon name="Home" className="text-[#1E4D45]" /> Contracted Supplier Registry
            </Heading>

            <div className="flex flex-col gap-2.5">
              {initialSuppliers.map(sup => (
                <div key={sup.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-gray-900">{sup.name}</span>
                    <span className="text-[8px] bg-gray-200 font-bold px-2 py-0.5 rounded-full ml-2">{sup.category}</span>
                    <p className="text-[10px] text-gray-500 mt-1">Location: {sup.location} • Mapped contract rates: {sup.netRate}</p>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-lg">
                    {sup.marginPercent}% Net Margin
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-4 animate-msg-fade-in">
            <Heading as="h3" className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-1.5">
              <Icon name="Cpu" className="text-[#1E4D45]" /> AI Model Parameters Control
            </Heading>

            <form onSubmit={handleSaveConfigs} className="flex flex-col gap-4 max-w-md">
              <div>
                <label htmlFor="ai-model" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Active Reasoning Model</label>
                <select 
                  id="ai-model"
                  value={model} 
                  onChange={e => setModel(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none"
                >
                  <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep Reasoning)</option>
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash (Latency Optimized)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ai-temp" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Temperature</label>
                  <input 
                    id="ai-temp"
                    type="number" step="0.1" min="0" max="1" 
                    value={temperature} 
                    onChange={e => setTemperature(parseFloat(e.target.value) || 0)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="ai-tokens" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Max Output Tokens</label>
                  <input 
                    id="ai-tokens"
                    type="number" 
                    value={maxTokens} 
                    onChange={e => setMaxTokens(parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <button 
                  type="submit" 
                  className="w-full bg-[#12302B] hover:bg-[#1E4D45] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-xs"
                >
                  Apply Parameters
                </button>
                {saveSuccess && (
                  <span className="text-emerald-700 text-[10px] font-bold text-center animate-pulse">✓ Parameters mapped into LLM gateway router.</span>
                )}
              </div>
            </form>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-4 animate-msg-fade-in">
            <Heading as="h3" className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-1.5">
              <Icon name="TrendingUp" className="text-[#1E4D45]" /> Centralized Tariffs Registry
            </Heading>

            <form onSubmit={handleSaveConfigs} className="flex flex-col gap-4 max-w-md">
              <div>
                <label htmlFor="pricing-hotel" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Comfort Hotel Room Rate / Night (INR)</label>
                <input 
                  id="pricing-hotel"
                  type="number" 
                  value={comfortHotelRate} 
                  onChange={e => setComfortHotelRate(parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none"
                />
              </div>
              <div>
                <label htmlFor="pricing-flight" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Comfort Flight Fare - Round (INR)</label>
                <input 
                  id="pricing-flight"
                  type="number" 
                  value={comfortFlightRate} 
                  onChange={e => setComfortFlightRate(parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <button 
                  type="submit" 
                  className="bg-[#12302B] hover:bg-[#1E4D45] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-xs"
                >
                  Save Base Tariffs
                </button>
                {saveSuccess && (
                  <span className="text-emerald-700 text-[10px] font-bold text-center animate-pulse">✓ Registry configurations successfully updated.</span>
                )}
              </div>
            </form>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-4 animate-msg-fade-in">
            <Heading as="h3" className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-1.5">
              <Icon name="Settings" className="text-[#1E4D45]" /> Roles & Granular Permissions
            </Heading>

            <div className="flex flex-col gap-4 text-xs">
              <div className="border border-gray-200 p-4 rounded-xl bg-gray-50">
                <span className="font-bold text-gray-900">Owner Role permissions</span>
                <div className="flex gap-4 mt-2">
                  {['read', 'write', 'delete', 'ai_rollback'].map(p => (
                    <label key={p} className="flex items-center gap-1.5">
                      <input 
                        type="checkbox" 
                        checked={ownerPerms.includes(p)} 
                        onChange={() => togglePermission('owner', p)}
                        className="accent-[#12302B]"
                      />
                      <span className="capitalize">{p.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 p-4 rounded-xl bg-gray-50">
                <span className="font-bold text-gray-900">Agent Role permissions</span>
                <div className="flex gap-4 mt-2">
                  {['read', 'write', 'delete', 'ai_rollback'].map(p => (
                    <label key={p} className="flex items-center gap-1.5">
                      <input 
                        type="checkbox" 
                        checked={agentPerms.includes(p)} 
                        onChange={() => togglePermission('agent', p)}
                        className="accent-[#12302B]"
                      />
                      <span className="capitalize">{p.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-4 animate-msg-fade-in">
            <Heading as="h3" className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-1.5">
              <Icon name="FileText" className="text-[#1E4D45]" /> Operational Traceable Audit Log
            </Heading>

            <div className="flex flex-col gap-2 font-mono text-[10px]">
              {initialAudits.map(audit => (
                <div key={audit.id} className="border-b pb-3 border-gray-100 flex flex-col gap-1">
                  <p className="text-gray-400">Time: {audit.timestamp} • Agent: {audit.agent}</p>
                  <p><strong>Action:</strong> {audit.action} ➔ <span className="text-[#1E4D45] font-bold">{audit.detail}</span></p>
                  <p className="text-gray-500 italic">Reason: {audit.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-4 animate-msg-fade-in">
            <Heading as="h3" className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-1.5">
              <Icon name="Settings" className="text-[#1E4D45]" /> System Settings & Localization
            </Heading>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Company Legal Name</label>
                <input type="text" defaultValue="VIETANA Travel Private Limited" className="w-full bg-gray-50 border rounded-lg p-2 outline-none" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Platform Timezone</label>
                <input type="text" defaultValue="Asia/Kolkata (IST)" className="w-full bg-gray-50 border rounded-lg p-2 outline-none" />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
export { AdminDashboard };
