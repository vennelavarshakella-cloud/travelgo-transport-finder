import React from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Train, 
  Bus, 
  Plane, 
  Car, 
  Sun, 
  Sunset, 
  Moon, 
  Sunrise, 
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { FilterState, TransportType } from '../types/transport';

interface FilterSidebarProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  maxPossiblePrice: number;
  totalResultsCount: number;
  filteredCount: number;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filter,
  setFilter,
  maxPossiblePrice,
  totalResultsCount,
  filteredCount,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-6">
      
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-800 text-sm font-heading">
            Filter Results
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold tabular-nums">
            {filteredCount}/{totalResultsCount}
          </span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1 hover:underline cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort By Dropdown (Prominent) */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-blue-500" />
          <span>Sort By</span>
        </label>
        <div className="grid grid-cols-1 gap-1.5">
          {[
            { id: 'cheapest', label: '💰 Cheapest First', sub: 'Price: Low to High' },
            { id: 'fastest', label: '⚡ Fastest First', sub: 'Shortest journey time' },
            { id: 'earliest', label: '🌅 Earliest Departure', sub: 'Time: Early to Late' },
          ].map((sortOption) => {
            const isSelected = filter.sortBy === sortOption.id;
            return (
              <button
                key={sortOption.id}
                type="button"
                onClick={() => setFilter(prev => ({ ...prev, sortBy: sortOption.id as any }))}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <span>{sortOption.label}</span>
                <span className="text-[10px] text-slate-400 font-normal">{sortOption.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Transport Type Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Transport Type
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'All Modes', icon: Sparkles, color: 'text-amber-500' },
            { id: 'train', label: 'Train', icon: Train, color: 'text-purple-600' },
            { id: 'bus', label: 'Bus', icon: Bus, color: 'text-pink-600' },
            { id: 'flight', label: 'Flight', icon: Plane, color: 'text-cyan-600' },
            { id: 'other', label: 'Cab/Other', icon: Car, color: 'text-yellow-600' },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = filter.type === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(prev => ({ ...prev, type: item.id as TransportType }))}
                className={`px-2.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 text-white font-bold shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : item.color}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Max Price
          </label>
          <span className="text-xs font-bold text-purple-700 tabular-nums bg-purple-50 px-2 py-0.5 rounded-md">
            ₹{filter.maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="400"
          max={maxPossiblePrice || 12000}
          step="100"
          value={filter.maxPrice}
          onChange={(e) => setFilter(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
          <span>₹400</span>
          <span>₹{(maxPossiblePrice || 12000).toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Departure Time Slots */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Departure Time
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'Anytime', icon: Sparkles },
            { id: 'morning', label: 'Morning (6-12)', icon: Sunrise },
            { id: 'afternoon', label: 'Afternoon (12-18)', icon: Sun },
            { id: 'evening', label: 'Evening (18-24)', icon: Sunset },
            { id: 'night', label: 'Night (0-6)', icon: Moon },
          ].map((slot) => {
            const Icon = slot.icon;
            const isSelected = filter.timeSlot === slot.id;
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setFilter(prev => ({ ...prev, timeSlot: slot.id as any }))}
                className={`px-2 py-1.5 rounded-xl text-[11px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                <Icon className="w-3 h-3 shrink-0" />
                <span className="truncate">{slot.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Maximum Travel Duration */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Max Duration
          </label>
          <span className="text-xs font-bold text-cyan-800 tabular-nums bg-cyan-50 px-2 py-0.5 rounded-md">
            Up to {filter.maxDurationHours}h
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="24"
          step="1"
          value={filter.maxDurationHours}
          onChange={(e) => setFilter(prev => ({ ...prev, maxDurationHours: Number(e.target.value) }))}
          className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
          <span>1 hour</span>
          <span>24 hours</span>
        </div>
      </div>

      {/* Available Seats Minimum */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Available Seats
        </label>
        <div className="flex items-center gap-1.5">
          {[
            { val: 0, label: 'Any' },
            { val: 5, label: '5+ seats' },
            { val: 15, label: '15+ seats' },
            { val: 30, label: '30+ seats' },
          ].map((item) => {
            const isSelected = filter.minSeats === item.val;
            return (
              <button
                key={item.val}
                type="button"
                onClick={() => setFilter(prev => ({ ...prev, minSeats: item.val }))}
                className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
