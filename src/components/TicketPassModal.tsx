import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Printer, 
  Calendar, 
  Clock, 
  MapPin, 
  Train, 
  Bus, 
  Plane, 
  Car, 
  QrCode, 
  Download,
  Share2
} from 'lucide-react';
import { BookingRecord } from '../types/transport';

interface TicketPassModalProps {
  booking: BookingRecord;
  onClose: () => void;
  onGoToBookings?: () => void;
}

export const TicketPassModal: React.FC<TicketPassModalProps> = ({
  booking,
  onClose,
  onGoToBookings,
}) => {
  const getTransportIcon = () => {
    switch (booking.transport.type) {
      case 'flight': return <Plane className="w-5 h-5 text-cyan-600" />;
      case 'train': return <Train className="w-5 h-5 text-purple-600" />;
      case 'bus': return <Bus className="w-5 h-5 text-pink-600" />;
      default: return <Car className="w-5 h-5 text-amber-600" />;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-xl w-full overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
        
        {/* Celebration Header */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-full bg-white text-emerald-600 mx-auto flex items-center justify-center shadow-lg mb-2">
            <CheckCircle2 className="w-8 h-8 fill-emerald-100" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight">
            Booking Confirmed!
          </h2>
          <p className="text-xs text-cyan-100 mt-1">
            Your e-ticket has been generated and confirmed.
          </p>

          <div className="inline-block mt-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-mono font-bold tracking-wider">
            PNR: {booking.bookingRef}
          </div>
        </div>

        {/* Boarding Pass Body */}
        <div className="p-6 space-y-5 bg-slate-50/50">
          
          {/* Main Card with Ticket Notches */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
            
            {/* Top Pass section */}
            <div className="p-5 border-b border-dashed border-slate-200">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-50">
                    {getTransportIcon()}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block font-heading">
                      {booking.transport.operator}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {booking.transport.name} {booking.transport.code ? `(${booking.transport.code})` : ''}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Date of Travel</span>
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-blue-500" />
                    {booking.travelDate}
                  </span>
                </div>
              </div>

              {/* Origin -> Destination */}
              <div className="grid grid-cols-3 gap-2 items-center py-2 bg-slate-50/80 rounded-xl px-3">
                <div>
                  <span className="text-xs font-extrabold text-slate-900 block font-heading">
                    {booking.transport.departureTime}
                  </span>
                  <span className="text-xs font-bold text-purple-700 block">
                    {booking.transport.from}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {booking.transport.fromStation}
                  </span>
                </div>

                <div className="text-center">
                  <span className="text-[10px] text-slate-500 font-bold bg-white px-2 py-0.5 rounded-full border border-slate-200">
                    {booking.transport.durationFormatted}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-slate-900 block font-heading">
                    {booking.transport.arrivalTime}
                  </span>
                  <span className="text-xs font-bold text-pink-700 block">
                    {booking.transport.to}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {booking.transport.toStation}
                  </span>
                </div>
              </div>
            </div>

            {/* Passenger List on Ticket */}
            <div className="p-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Passengers & Seats ({booking.passengers.length})
              </span>
              <div className="space-y-2">
                {booking.passengers.map((p, idx) => (
                  <div
                    key={p.id || idx}
                    className="flex items-center justify-between text-xs bg-slate-50 px-3 py-2 rounded-xl border border-slate-100"
                  >
                    <div>
                      <strong className="text-slate-800 font-bold">{p.name}</strong>
                      <span className="text-slate-400 text-[11px] ml-2 font-normal">
                        ({p.age} yrs • {p.gender})
                      </span>
                    </div>
                    <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      Seat {idx + 1}A • {p.seatPreference}
                    </span>
                  </div>
                ))}
              </div>

              {/* Fare & Barcode row */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Total Paid via {booking.paymentMethod}
                  </span>
                  <span className="text-xl font-extrabold text-slate-900 font-heading">
                    ₹{booking.totalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold block">
                    ✓ Payment Verified
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <QrCode className="w-12 h-12 text-slate-700 p-0.5 border border-slate-200 rounded-lg bg-white" />
                  <span className="text-[9px] font-mono text-slate-400 mt-1">SCAN AT GATE</span>
                </div>
              </div>

            </div>

          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print / Save Ticket</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {onGoToBookings && (
                <button
                  onClick={() => {
                    onClose();
                    onGoToBookings();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
                >
                  View in My Bookings
                </button>
              )}
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
