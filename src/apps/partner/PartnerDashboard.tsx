import React, { useState } from 'react';
import Icon from '../../components/ui/Icon';
import { Heading, Text } from '../../components/ui/Typography';

interface BookingRequest {
  id: string;
  leadName: string;
  service: string;
  dates: string;
  pax: string;
  netRate: number;
  status: 'pending' | 'confirmed' | 'rejected';
}

const initialRequests: BookingRequest[] = [
  { id: 'req_1', leadName: 'Rahul Sharma', service: 'Comfort Hotel Allocation (8 nights)', dates: 'Oct 12 - Oct 20', pax: '2 Adults', netRate: 36000, status: 'pending' },
  { id: 'req_2', leadName: 'Amit Verma', service: 'Private Minivan Ground Logistics', dates: 'Oct 15 - Oct 25', pax: '4 Adults', netRate: 11200, status: 'pending' }
];

const PartnerDashboard: React.FC = () => {
  const [requests, setRequests] = useState<BookingRequest[]>(initialRequests);
  const [guideRate, setGuideRate] = useState(4500); // Guide daily rate baseline
  const [carRate, setCarRate] = useState(3200);   // Car daily rate baseline
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleConfirmRequest = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'confirmed' } : r));
  };

  const handleRejectRequest = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 flex flex-col gap-6">
      
      {/* Header Banner */}
      <div className="bg-[#12302B] text-white p-6 rounded-2xl flex justify-between items-center shadow-md">
        <div>
          <Heading as="h2" variant="white" className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <Icon name="Users" className="text-brand-gold animate-pulse" /> VIETANA B2B Supplier Portal
          </Heading>
          <Text className="text-xs text-white/60">Upload contract rate sheets, manage ground allocations, and confirm bookings.</Text>
        </div>
        <div className="flex items-center gap-2 text-xs bg-black/20 border border-white/10 px-3.5 py-1.5 rounded-full">
          <span className="font-mono text-white/60">Supplier Partner: Indochina DMC</span>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Incoming Allocation Requests */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-4">
          <Heading as="h3" className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-1.5">
            <Icon name="Inbox" className="text-[#1E4D45]" /> Pending Booking Allocations
          </Heading>

          <div className="flex flex-col gap-3">
            {requests.map(req => (
              <div key={req.id} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-2 relative bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-xs text-gray-900">{req.leadName}</span>
                    <p className="text-[10px] text-gray-500 font-semibold">{req.service}</p>
                  </div>
                  <span className={`text-[8px] uppercase font-extrabold px-2 py-0.5 rounded-full ${
                    req.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                    req.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[10px] text-gray-500 border-t pt-2 border-gray-200/60 mt-1">
                  <span>{req.dates} • {req.pax}</span>
                  <span className="font-mono font-bold text-[#1E4D45]">Net: ₹{req.netRate.toLocaleString('en-IN')}</span>
                </div>

                {req.status === 'pending' && (
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={() => handleConfirmRequest(req.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Confirm
                    </button>
                    <button 
                      onClick={() => handleRejectRequest(req.id)}
                      className="bg-white border border-gray-200 hover:border-gray-400 text-gray-600 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Tariffs Sheet Upload & Local Rates */}
        <div className="flex flex-col gap-6">
          
          {/* Contracts Manager */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-4">
            <Heading as="h3" className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-1.5">
              <Icon name="Settings" size={16} className="text-[#1E4D45]" /> Contract Tariffs Sheet
            </Heading>

            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="partner-guide-rate" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">English Tour Guide / Day (INR)</label>
                <input 
                  id="partner-guide-rate"
                  type="number" 
                  value={guideRate} 
                  onChange={e => setGuideRate(parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none"
                />
              </div>

              <div>
                <label htmlFor="partner-car-rate" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Standard Sedan + Driver / Day (INR)</label>
                <input 
                  id="partner-car-rate"
                  type="number" 
                  value={carRate} 
                  onChange={e => setCarRate(parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none"
                />
              </div>
            </div>
          </div>

          {/* Rate Sheets Upload dropzone */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-3">
            <Heading as="h3" className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <Icon name="FileText" size={14} className="text-[#1E4D45]" /> Bulk Contract Uploads (.CSV / .PDF)
            </Heading>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-emerald-600 transition-colors relative">
              <input 
                type="file" 
                onChange={handleFileUpload} 
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />
              <Icon name="Upload" className="text-gray-300 mb-2" size={24} />
              <span className="text-[10px] font-bold text-gray-500">Drop your pricing sheets here to parse contract rates</span>
            </div>

            {uploadSuccess && (
              <span className="text-emerald-700 text-[10px] font-bold text-center animate-pulse mt-1">✓ Rate file successfully parsed and mapped into system database.</span>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default PartnerDashboard;
export { PartnerDashboard };
