import React, { useState } from 'react';
import { 
  Train, 
  Bus, 
  Plane, 
  Car, 
  Clock, 
  Users, 
  ArrowRight, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { TransportItem } from '../types/transport';

interface TransportCardProps {
  item: TransportItem;
  onBook: (item: TransportItem) => void;
  index: number;
}

export const TransportCard: React.FC<TransportCardProps> = ({ item, onBook, index }) => {
  const [expanded, setExpanded] = useState(false);

  // Transport Type Specific Theme
  const getTheme = () => {
    switch (item.type) {
      case 'flight':
        return {
          icon: <Plane className="w-5 h-5 text-cyan-600" />,
          badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
          accentBorder: 'border-l-cyan-500',
          btnGradient: 'from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white',
          typeLabel: 'Flight',
          glow: 'hover:shadow-cyan-100',
        };
      case 'train':
        return {
          icon: <Train className="w-5 h-5 text-purple-600" />,
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          accentBorder: 'border-l-purple-500',
          btnGradient: 'from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white',
          typeLabel: 'Express Train',
          glow: 'hover:shadow-purple-100',
        };
      case 'bus':
        return {
          icon: <Bus className="w-5 h-5 text-pink-600" />,
          badgeBg: 'bg-pink-50 text-pink-700 border-pink-200',
          accentBorder: 'border-l-pink-500',
          btnGradient: 'from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white',
          typeLabel: 'Express Bus',
          glow: 'hover:shadow-pink-100',
        };
      default:
        return {
          icon: <Car className="w-5 h-5 text-amber-600" />,
          badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
          accentBorder: 'border-l-amber-500',
          btnGradient: 'from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold',
          typeLabel: 'Cab / Shuttle',
          glow: 'hover:shadow-amber-100',
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      style={{ animationDelay: `${index * 50}ms` }}
      className={`bg-white rounded-2xl border border-slate-200/90 border-l-4 ${theme.accentBorder} shadow-sm hover:shadow-xl ${theme.glow} transition-all duration-300 overflow-hidden flex flex-col`}
    >
      <div className="p-4 sm:p-5">
        
        {/* Top Header: Type + Operator & Special Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-xl ${theme.badgeBg} border`}>
              {theme.icon}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900">
                  {item.operator}
                </span>
                {item.code && (
                  <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {item.code}
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                {item.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {item.badge && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                <Sparkles className="w-3 h-3 text-amber-600" />
                {item.badge}
              </span>
            )}
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>{item.rating}</span>
              <span className="text-[10px] text-slate-400 font-normal">({item.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Route Details: From -> To */}
        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 my-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Departure */}
            <div className="sm:col-span-4">
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Departure
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                {item.departureTime}
              </div>
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>{item.from}</span>
              </div>
              <div className="text-[11px] text-slate-500 truncate" title={item.fromStation}>
                {item.fromStation}
              </div>
            </div>

            {/* Duration / Arrow Journey */}
            <div className="sm:col-span-4 flex flex-col items-center justify-center py-1 sm:py-0 text-center">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {item.durationFormatted}
              </span>
              <div className="w-full flex items-center gap-2">
                <div className="h-0.5 flex-1 bg-slate-300 rounded-full" />
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <div className="h-0.5 flex-1 bg-slate-300 rounded-full" />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 font-medium">
                {item.vehicleDetails || 'Direct journey'}
              </span>
            </div>

            {/* Arrival */}
            <div className="sm:col-span-4 sm:text-right">
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Arrival
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                {item.arrivalTime}
              </div>
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1 sm:justify-end mt-0.5">
                <span>{item.to}</span>
                <MapPin className="w-3.5 h-3.5 text-pink-600 shrink-0" />
              </div>
              <div className="text-[11px] text-slate-500 truncate" title={item.toStation}>
                {item.toStation}
              </div>
            </div>

          </div>
        </div>

        {/* Footer Row: Seats, Price, Book Now Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Seats & Amenities snippet */}
          <div className="flex flex-wrap items-center gap-2">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border ${
              item.seatsAvailable <= 10
                ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}>
              <Users className="w-3.5 h-3.5" />
              <span>Available Tickets: <strong className="font-extrabold">{item.seatsAvailable}</strong></span>
            </div>

            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span>{expanded ? 'Hide Details' : 'View Amenities'}</span>
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Price & Book Now */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div className="text-left sm:text-right">
              <span className="text-[11px] text-slate-400 block font-medium">Starting from</span>
              <div className="text-2xl font-extrabold text-slate-950 font-heading leading-tight">
                ₹{item.price.toLocaleString('en-IN')}
              </div>
            </div>

            <button
              onClick={() => onBook(item)}
              className={`px-6 py-2.5 rounded-xl bg-gradient-to-r ${theme.btnGradient} font-bold text-sm shadow-md active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer`}
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Expandable Details Tray */}
      {expanded && (
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-bold text-slate-800 block mb-2">Amenities Included:</span>
              <div className="flex flex-wrap gap-1.5">
                {item.amenities.map((amenity, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-medium text-[11px]"
                  >
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <span className="font-bold text-slate-800 block">Booking Policy:</span>
              <p className="flex items-center gap-1.5 text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Instant confirmation with guaranteed seat allocation</span>
              </p>
              <p className="text-slate-500">
                • Free cancellation up to 6 hours before departure time.
              </p>
              <p className="text-slate-500">
                • Digital m-ticket sent via SMS & available under My Bookings tab.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
