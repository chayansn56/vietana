import React, { useEffect, useState } from 'react';
import { Heading, Text } from './ui/Typography';
import Button from './ui/Button';
import Icon from './ui/Icon';

interface Lead {
  id: string | number;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  'travel dates': string;
  travelers: string | null;
  message: string | null;
  source: string;
  status: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  gclid: string | null;
  landing_page: string | null;
  booking_value?: number;
  revenue?: number;
  gross_profit?: number;
  loss_reason?: string;
}

const LeadsDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Auth state
  const [adminSecret, setAdminSecret] = useState(() => sessionStorage.getItem('vietana_admin_secret') || '');
  const [secretInput, setSecretInput] = useState('');
  
  // Edit states
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [statusVal, setStatusVal] = useState('');
  const [valBooking, setValBooking] = useState('');
  const [valRevenue, setValRevenue] = useState('');
  const [valProfit, setValProfit] = useState('');
  const [valLossReason, setValLossReason] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchLeads = async (secretOverride?: string) => {
    const activeSecret = secretOverride || adminSecret;
    if (!activeSecret) return;
    
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/leads', {
        headers: {
          'Authorization': `Bearer ${activeSecret}`
        }
      });
      if (res.status === 401 || res.status === 403) {
        throw new Error('Unauthorized admin access.');
      }
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        // Fallback to local storage preview
        const local = localStorage.getItem('vietana_local_leads');
        data = { success: true, data: local ? JSON.parse(local) : [] };
      }
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch leads');
      }
      setLeads(data.data || []);
      if (secretOverride) {
        setAdminSecret(secretOverride);
        sessionStorage.setItem('vietana_admin_secret', secretOverride);
      }
    } catch (err: any) {
      setError(err.message || 'Fetch failed');
      if (secretOverride) {
        setAdminSecret('');
        sessionStorage.removeItem('vietana_admin_secret');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminSecret) {
      fetchLeads();
    }
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretInput.trim()) return;
    fetchLeads(secretInput.trim());
  };

  const openEditModal = (lead: Lead) => {
    setSelectedLead(lead);
    setStatusVal(lead.status || 'New');
    setValBooking(String(lead.booking_value || ''));
    setValRevenue(String(lead.revenue || ''));
    setValProfit(String(lead.gross_profit || ''));
    setValLossReason(lead.loss_reason || '');
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    setIsUpdating(true);
    try {
      let result;
      try {
        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminSecret}`
          },
          body: JSON.stringify({
            id: selectedLead.id,
            status: statusVal,
            booking_value: valBooking ? parseFloat(valBooking) : null,
            revenue: valRevenue ? parseFloat(valRevenue) : null,
            gross_profit: valProfit ? parseFloat(valProfit) : null,
            loss_reason: statusVal === 'Lost' ? valLossReason : null
          })
        });
        const text = await res.text();
        result = JSON.parse(text);
      } catch (err) {
        // Local preview updates
        const local = localStorage.getItem('vietana_local_leads');
        const list = local ? JSON.parse(local) : [];
        const updated = list.map((l: any) => l.id === selectedLead.id ? {
          ...l,
          status: statusVal,
          booking_value: valBooking ? parseFloat(valBooking) : null,
          revenue: valRevenue ? parseFloat(valRevenue) : null,
          gross_profit: valProfit ? parseFloat(valProfit) : null,
          loss_reason: statusVal === 'Lost' ? valLossReason : null
        } : l);
        localStorage.setItem('vietana_local_leads', JSON.stringify(updated));
        result = { success: true };
      }

      if (!result.success) {
        throw new Error(result.error || 'Failed to update lead');
      }

      setSelectedLead(null);
      fetchLeads();
    } catch (err: any) {
      alert(err.message || 'Update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!adminSecret) {
    return (
      <div className="max-w-md mx-auto my-20 p-6 md:p-8 bg-white border border-black/5 rounded-3xl shadow-deep text-[#12302B] flex flex-col gap-6">
        <div className="flex flex-col gap-1.5 text-center">
          <span className="text-[9px] font-mono font-bold tracking-widest text-[#3A9BD9] uppercase">Restricted Access Portal</span>
          <Heading as="h3" size="none" className="text-xl font-serif font-extrabold m-0">Enter Admin Passcode</Heading>
          <Text className="opacity-70 text-xs">Verify your credentials to view PII travel leads and conversion reports.</Text>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <input 
              type="password" 
              value={secretInput} 
              onChange={(e) => setSecretInput(e.target.value)} 
              placeholder="Enter admin secret key" 
              className="w-full bg-[#FAF8F3] border border-black/10 rounded-xl p-3 text-xs font-bold text-center focus:outline-none focus:border-[#3A9BD9]" 
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#E8C84A] hover:bg-[#d8b83a] text-[#12302B] rounded-xl font-bold uppercase text-xs tracking-wider cursor-pointer shadow-lg active:scale-95 duration-200"
          >
            Authorize Access
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 text-[#12302B]">
      <div className="flex justify-between items-center mb-8 border-b border-black/10 pb-6">
        <div>
          <Heading as="h1" size="xl" className="font-serif uppercase m-0">Leads Administration CRM</Heading>
          <Text className="opacity-75 text-xs">Verify campaigns, UTM params, WhatsApp inquiries and conversion states</Text>
        </div>
        <Button onClick={() => fetchLeads()} variant="outline" className="flex items-center gap-2 text-xs">
          <Icon name="RefreshCw" size={12} /> Refresh
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-xs font-mono">Fetching leads list from Supabase...</div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-xs border border-red-100">{error}</div>
      ) : leads.length === 0 ? (
        <div className="text-center py-20 text-xs font-mono">No leads captured in the system yet.</div>
      ) : (
        <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px] font-sans">
              <thead>
                <tr className="bg-[#FAF8F3] border-b border-black/10 font-bold text-gray-500">
                  <th className="p-4">Date</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Campaign Attribution</th>
                  <th className="p-4 text-right">Profit / Value</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-[#FAF8F3]/50">
                    <td className="p-4 whitespace-nowrap font-mono">{new Date(l.created_at).toLocaleDateString()}</td>
                    <td className="p-4 font-bold">{l.name}</td>
                    <td className="p-4 whitespace-nowrap">{l.phone}</td>
                    <td className="p-4">{l.service || 'General Inquiry'}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        l.status === 'New' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        l.status === 'Qualified' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        l.status === 'Lost' ? 'bg-red-50 text-red-600 border border-red-100' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-0.5">
                        {l.utm_source && <span className="text-[9px]"><strong className="text-gray-400">src:</strong> {l.utm_source}</span>}
                        {l.utm_campaign && <span className="text-[9px]"><strong className="text-gray-400">cmp:</strong> {l.utm_campaign}</span>}
                        {l.gclid && <span className="text-[9px] text-[#3A9BD9] font-mono"><strong className="text-gray-400">gclid:</strong> {l.gclid.substring(0, 10)}...</span>}
                      </div>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap font-mono font-bold">
                      {l.gross_profit ? `₹${l.gross_profit}` : '—'}
                    </td>
                    <td className="p-4 text-center">
                      <Button onClick={() => openEditModal(l)} className="px-3 py-1 bg-brand-gold/10 hover:bg-brand-gold/20 text-[#12302B] rounded-lg text-[9px] font-bold uppercase tracking-wider">
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Status Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-deep flex flex-col gap-5 border border-black/5">
            <div className="flex justify-between items-center border-b border-black/5 pb-4">
              <Heading as="h3" size="none" className="text-lg font-serif font-bold">Update Lead: {selectedLead.name}</Heading>
              <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-600">
                <Icon name="X" size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-mono font-bold tracking-wider text-gray-500 uppercase">Lead Status</label>
                <select value={statusVal} onChange={(e) => setStatusVal(e.target.value)} className="w-full bg-[#FAF8F3] border border-black/10 rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#3A9BD9]">
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Unqualified">Unqualified</option>
                  <option value="Quote Sent">Quote Sent</option>
                  <option value="Follow Up">Follow Up</option>
                  <option value="Deposit Paid">Deposit Paid</option>
                  <option value="Booked">Booked</option>
                  <option value="Lost">Lost</option>
                  <option value="Spam">Spam</option>
                </select>
              </div>

              {statusVal === 'Lost' && (
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-mono font-bold tracking-wider text-gray-500 uppercase">Loss Reason</label>
                  <select value={valLossReason} onChange={(e) => setValLossReason(e.target.value)} className="w-full bg-[#FAF8F3] border border-black/10 rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#3A9BD9]">
                    <option value="">Select loss reason</option>
                    <option value="PRICE">Price Too High</option>
                    <option value="NO_RESPONSE">No Response</option>
                    <option value="DATES_CHANGED">Dates Changed</option>
                    <option value="COMPETITOR">Competitor Booked</option>
                    <option value="FLIGHT_COST">Flight Cost Issues</option>
                    <option value="TRUST">Trust Issue</option>
                    <option value="ITINERARY_MISMATCH">Itinerary Mismatch</option>
                    <option value="BUDGET">No Budget Available</option>
                    <option value="DUPLICATE">Duplicate Submission</option>
                    <option value="OTHER">Other Reason</option>
                  </select>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-mono font-bold tracking-wider text-gray-500 uppercase">Booking (₹)</label>
                  <input type="number" value={valBooking} onChange={(e) => setValBooking(e.target.value)} placeholder="0" className="w-full bg-[#FAF8F3] border border-black/10 rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#3A9BD9]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-mono font-bold tracking-wider text-gray-500 uppercase">Revenue (₹)</label>
                  <input type="number" value={valRevenue} onChange={(e) => setValRevenue(e.target.value)} placeholder="0" className="w-full bg-[#FAF8F3] border border-black/10 rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#3A9BD9]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-mono font-bold tracking-wider text-gray-500 uppercase">Profit (₹)</label>
                  <input type="number" value={valProfit} onChange={(e) => setValProfit(e.target.value)} placeholder="0" className="w-full bg-[#FAF8F3] border border-black/10 rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#3A9BD9]" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full mt-4 py-3 bg-[#E8C84A] hover:bg-[#d8b83a] text-[#12302B] rounded-xl font-bold uppercase tracking-wider text-xs cursor-pointer shadow-lg active:scale-95 duration-200"
              >
                {isUpdating ? 'Saving status...' : 'Update Lead Status ➔'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsDashboard;
