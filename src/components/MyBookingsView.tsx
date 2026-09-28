import React, { useState } from 'react';
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  Clock, 
  Train, 
  Bus, 
  Plane, 
  Car, 
  Search, 
  Trash2, 
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { BookingRecord } from '../types/transport';

interface MyBookingsViewProps {
  bookings: BookingRecord[];
  onViewTicket: (booking: BookingRecord) => void;
  onCancelBooking: (bookingId: string) => void;
  onStartSearch: () => void;
}

export const MyBookingsView: React.FC<MyBookingsViewProps> = ({
  bookings,
  onViewTicket,
  onCancelBooking,
  onStartSearch,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'Confirmed' | 'Cancelled'>('all');

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === 'all') return true;
    return b.status === filterStatus;
  });

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'flight': return <Plane className="w-4 h-4 text-cyan-600" />;
      case 'train': return <Train className="w-4 h-4 text-purple-600" />;
      case 'bus': return <Bus className="w-4 h-4 text-pink-600" />;
      default: return <Car className="w-4 h-4 text-amber-600" />;
    }
  };

  const handleCancelClick = (b: BookingRecord) => {
    if (b.status === 'Cancelled') return;
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel booking ${b.bookingRef} for ${b.transport.name}? A refund will be initiated to your original payment method.`
    );
    if (confirmCancel) {
      onCancelBooking(b.id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-bold mb-2">
            <Ticket className="w-3.5 h-3.5" />
            <span>Travel History & Passes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            My Bookings
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Manage your booked journeys, download boarding passes, or check PNR status
          </p>
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          {[
            { id: 'all', label: `All (${bookings.length})` },
            { id: 'Confirmed', label: `Confirmed (${bookings.filter(b => b.status === 'Confirmed').length})` },
            { id: 'Cancelled', label: `Cancelled (${bookings.filter(b => b.status === 'Cancelled').length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-100 via-pink-100 to-cyan-100 text-purple-600 flex items-center justify-center mx-auto mb-4">
            <Ticket className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-heading">
            {filterStatus === 'all' ? 'No Bookings Found' : `No ${filterStatus} Bookings`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            {filterStatus === 'all'
              ? 'You haven’t booked any travel yet. Search across trains, buses, and flights to plan your next journey!'
              : `You don’t have any journeys currently marked as ${filterStatus.toLowerCase()}.`}
          </p>
          <button
            onClick={onStartSearch}
            className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search & Book Transport</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className={`bg-white rounded-2xl border ${
                b.status === 'Cancelled' ? 'border-slate-200 opacity-75' : 'border-slate-200 shadow-sm hover:shadow-md'
              } p-5 transition-all`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    {getTransportIcon(b.transport.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 font-heading">
                        {b.transport.name}
                      </span>
                      <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        PNR: {b.bookingRef}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Booked on {b.bookingDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      b.status === 'Confirmed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {b.status === 'Confirmed' ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    )}
                    <span>{b.status}</span>
                  </span>
                </div>
              </div>

              {/* Journey Route Details */}
              <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Departure</span>
                  <div className="text-lg font-bold text-slate-900">{b.transport.departureTime}</div>
                  <div className="text-xs font-semibold text-slate-800">{b.transport.from}</div>
                  <div className="text-[11px] text-slate-400 truncate">{b.transport.fromStation}</div>
                </div>

                <div className="text-center sm:border-x border-slate-100 px-2">
                  <div className="text-xs font-bold text-blue-700 flex items-center justify-center gap-1 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{b.travelDate}</span>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full inline-block">
                    {b.transport.durationFormatted} direct
                  </span>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Arrival</span>
                  <div className="text-lg font-bold text-slate-900">{b.transport.arrivalTime}</div>
                  <div className="text-xs font-semibold text-slate-800">{b.transport.to}</div>
                  <div className="text-[11px] text-slate-400 truncate">{b.transport.toStation}</div>
                </div>
              </div>

              {/* Passenger summary & Actions */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">
                    {b.passengers.length} {b.passengers.length === 1 ? 'Passenger' : 'Passengers'}:
                  </span>{' '}
                  {b.passengers.map(p => p.name).join(', ')} • Total Paid:{' '}
                  <strong className="text-slate-950 font-bold">
                    ₹{b.totalPrice.toLocaleString('en-IN')}
                  </strong>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => onViewTicket(b)}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors border border-purple-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Ticket</span>
                  </button>

                  {b.status === 'Confirmed' && (
                    <button
                      onClick={() => handleCancelClick(b)}
                      className="px-3 py-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      title="Cancel Booking"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
