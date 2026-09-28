import React from 'react';
import { Zap, Tag, Clock, ArrowRight, Train, Bus, Plane, Car, Users, CheckCircle2 } from 'lucide-react';
import { TransportItem } from '../types/transport';

interface HighlightCardsProps {
  fastest?: TransportItem;
  cheapest?: TransportItem;
  onBook: (item: TransportItem) => void;
}

const getTransportIcon = (type: string) => {
  switch (type) {
    case 'train':
      return <Train className="w-5 h-5" />;
    case 'bus':
      return <Bus className="w-5 h-5" />;
    case 'flight':
      return <Plane className="w-5 h-5" />;
    default:
      return <Car className="w-5 h-5" />;
  }
};

const getTransportTypeLabel = (type: string) => {
  switch (type) {
    case 'train': return 'Train';
    case 'bus': return 'Bus';
    case 'flight': return 'Flight';
    default: return 'Cab / Shuttle';
  }
};

export const HighlightCards: React.FC<HighlightCardsProps> = ({
  fastest,
  cheapest,
  onBook,
}) => {
  if (!fastest && !cheapest) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      
      {/* ⚡ Fastest Option Card */}
      {fastest && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 p-5 text-white shadow-xl shadow-cyan-900/10 border border-cyan-400/30 flex flex-col justify-between group hover:shadow-2xl transition-all duration-300">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Fastest Option</span>
              </div>
              <span className="text-xs font-semibold text-cyan-100 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-200" />
                Reaches destination first
              </span>
            </div>

            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-cyan-100 text-xs font-medium mb-1">
                  <span className="p-1 rounded-md bg-white/20 text-white">
                    {getTransportIcon(fastest.type)}
                  </span>
                  <span>{getTransportTypeLabel(fastest.type)} • {fastest.operator}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                  {fastest.name}
                </h3>
                <p className="text-xs text-cyan-100/90 mt-0.5">
                  {fastest.from} → {fastest.to}
                </p>
              </div>

              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  ₹{fastest.price.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-cyan-200 font-medium">per passenger</span>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
                <span className="block text-[10px] text-cyan-200 font-semibold uppercase">Duration</span>
                <span className="font-bold text-sm text-white flex items-center justify-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  {fastest.durationFormatted}
                </span>
              </div>
              <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
                <span className="block text-[10px] text-cyan-200 font-semibold uppercase">Departure</span>
                <span className="font-bold text-sm text-white mt-0.5 block">
                  {fastest.departureTime}
                </span>
              </div>
              <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
                <span className="block text-[10px] text-cyan-200 font-semibold uppercase">Seats Left</span>
                <span className="font-bold text-sm text-white flex items-center justify-center gap-1 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-cyan-200" />
                  {fastest.seatsAvailable}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-xs text-cyan-100 hidden sm:inline">
              Arrives at {fastest.arrivalTime}
            </span>
            <button
              onClick={() => onBook(fastest)}
              className="w-full sm:w-auto ml-auto px-5 py-2.5 rounded-xl bg-white hover:bg-cyan-50 text-blue-900 font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Book Fastest</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 💰 Cheapest Option Card */}
      {cheapest && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600 p-5 text-white shadow-xl shadow-purple-900/10 border border-purple-400/30 flex flex-col justify-between group hover:shadow-2xl transition-all duration-300">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-sm">
                <Tag className="w-3.5 h-3.5 fill-current" />
                <span>Cheapest Option</span>
              </div>
              <span className="text-xs font-semibold text-pink-100 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-200" />
                Lowest travel fare
              </span>
            </div>

            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-pink-100 text-xs font-medium mb-1">
                  <span className="p-1 rounded-md bg-white/20 text-white">
                    {getTransportIcon(cheapest.type)}
                  </span>
                  <span>{getTransportTypeLabel(cheapest.type)} • {cheapest.operator}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                  {cheapest.name}
                </h3>
                <p className="text-xs text-pink-100/90 mt-0.5">
                  {cheapest.from} → {cheapest.to}
                </p>
              </div>

              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  ₹{cheapest.price.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-pink-200 font-medium">per passenger</span>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
                <span className="block text-[10px] text-pink-200 font-semibold uppercase">Duration</span>
                <span className="font-bold text-sm text-white flex items-center justify-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  {cheapest.durationFormatted}
                </span>
              </div>
              <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
                <span className="block text-[10px] text-pink-200 font-semibold uppercase">Departure</span>
                <span className="font-bold text-sm text-white mt-0.5 block">
                  {cheapest.departureTime}
                </span>
              </div>
              <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
                <span className="block text-[10px] text-pink-200 font-semibold uppercase">Seats Left</span>
                <span className="font-bold text-sm text-white flex items-center justify-center gap-1 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-pink-200" />
                  {cheapest.seatsAvailable}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-xs text-pink-100 hidden sm:inline">
              Arrives at {cheapest.arrivalTime}
            </span>
            <button
              onClick={() => onBook(cheapest)}
              className="w-full sm:w-auto ml-auto px-5 py-2.5 rounded-xl bg-white hover:bg-pink-50 text-purple-900 font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Book Cheapest</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
