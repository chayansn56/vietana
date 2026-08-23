import React from 'react';
import Icon from '../../components/ui/Icon';
import { Heading, Text } from '../../components/ui/Typography';

interface Ticket {
  id: string;
  type: 'flight' | 'hotel' | 'activity' | 'visa';
  title: string;
  subtitle: string;
  date: string;
  status: 'confirmed' | 'pending';
  pnr?: string;
  room?: string;
  pickup?: string;
}

const travelerTickets: Ticket[] = [
  { id: 't_1', type: 'flight', title: 'VietJet Air VJ-896', subtitle: 'DEL ➔ DAD (Da Nang International)', date: 'Oct 12, 14:30', status: 'confirmed', pnr: 'VJ8912K' },
  { id: 't_2', type: 'hotel', title: 'Grand Beach Hotel Da Nang', subtitle: 'Ocean View Deluxe (Deluxe Double Room)', date: 'Oct 12 - Oct 16', status: 'confirmed', room: 'Room 504' },
  { id: 't_3', type: 'activity', title: 'Ba Na Hills & Golden Bridge Tour', subtitle: 'Private English Guide + Cable Car Tickets', date: 'Oct 14, 08:00', status: 'confirmed', pickup: 'Lobby greeting at 08:00 AM' },
  { id: 't_4', type: 'visa', title: 'Vietnam Single Entry E-Visa', subtitle: 'Electronic Visa Approval Letter Mapped', date: 'Valid Oct 12 - Nov 12', status: 'confirmed', pnr: 'EV82103K' }
];

const TravelerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 flex flex-col gap-6">
      
      {/* Header Banner */}
      <div className="bg-[#12302B] text-white p-6 rounded-2xl flex justify-between items-center shadow-md">
        <div>
          <Heading as="h2" variant="white" className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <Icon name="Compass" className="text-brand-gold animate-spin-slow" /> Your VIETANA Digital Voucher Wallet
          </Heading>
          <Text className="text-xs text-white/60">Manage your confirmed bookings, e-tickets, and voucher slips.</Text>
        </div>
        <div className="flex items-center gap-2 text-xs bg-black/20 border border-white/10 px-3.5 py-1.5 rounded-full">
          <span className="font-mono font-bold text-brand-gold">Trip Reference: VN-82910</span>
        </div>
      </div>

      {/* Tickets List Container */}
      <div className="flex-1 flex flex-col gap-4">
        <Heading as="h3" className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
          <Icon name="FileText" className="text-[#1E4D45]" /> Active Vouchers & Passes
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {travelerTickets.map(ticket => (
            <div key={ticket.id} className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden flex flex-col justify-between">
              
              {/* Card top */}
              <div className="p-5 flex gap-4 items-start">
                <div className={`p-3 rounded-lg text-white ${
                  ticket.type === 'flight' ? 'bg-blue-600' :
                  ticket.type === 'hotel' ? 'bg-purple-600' :
                  ticket.type === 'activity' ? 'bg-amber-600' : 'bg-emerald-600'
                }`}>
                  <Icon name={
                    ticket.type === 'flight' ? 'Plane' :
                    ticket.type === 'hotel' ? 'Home' :
                    ticket.type === 'activity' ? 'Compass' : 'FileText'
                  } size={20} />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-gray-900">{ticket.title}</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 uppercase font-extrabold px-2 py-0.5 rounded-full">
                      {ticket.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">{ticket.subtitle}</span>
                  <span className="text-[10px] text-gray-400 font-mono mt-1">{ticket.date}</span>
                </div>
              </div>

              {/* Card bottom details */}
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center text-xs">
                {ticket.type === 'flight' && (
                  <>
                    <span className="text-gray-500">Flight Booking Reference (PNR):</span>
                    <span className="font-mono font-bold text-gray-800 uppercase">{ticket.pnr}</span>
                  </>
                )}
                {ticket.type === 'hotel' && (
                  <>
                    <span className="text-gray-500">Room Status:</span>
                    <span className="font-mono font-bold text-gray-800">{ticket.room}</span>
                  </>
                )}
                {ticket.type === 'activity' && (
                  <>
                    <span className="text-gray-500">Pick-up Logistics:</span>
                    <span className="font-mono font-bold text-gray-800 text-right truncate max-w-[200px]">{ticket.pickup}</span>
                  </>
                )}
                {ticket.type === 'visa' && (
                  <>
                    <span className="text-gray-500">E-Visa Reference ID:</span>
                    <span className="font-mono font-bold text-gray-800 uppercase">{ticket.pnr}</span>
                  </>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TravelerDashboard;
export { TravelerDashboard };
