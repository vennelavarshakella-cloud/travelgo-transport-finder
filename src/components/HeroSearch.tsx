import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  ArrowLeftRight, 
  Search, 
  Train, 
  Bus, 
  Plane, 
  Car, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { SearchQuery, TransportType } from '../types/transport';
import { POPULAR_CITIES, POPULAR_ROUTES } from '../data/mockTransport';

interface HeroSearchProps {
  onSearch: (query: SearchQuery) => void;
  initialQuery?: SearchQuery;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch, initialQuery }) => {
  const [from, setFrom] = useState(initialQuery?.from || 'Hyderabad');
  const [to, setTo] = useState(initialQuery?.to || 'Visakhapatnam');
  const [date, setDate] = useState(initialQuery?.date || new Date().toISOString().split('T')[0]);
  const [passengers, setPassengers] = useState(initialQuery?.passengers || 1);
  const [type, setType] = useState<TransportType>(initialQuery?.type || 'all');

  const [fromSuggestions, setFromSuggestions] = useState(false);
  const [toSuggestions, setToSuggestions] = useState(false);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleQuickRoute = (routeFrom: string, routeTo: string) => {
    setFrom(routeFrom);
    setTo(routeTo);
    onSearch({
      from: routeFrom,
      to: routeTo,
      date,
      passengers,
      type
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from.trim() || !to.trim()) return;
    onSearch({
      from: from.trim(),
      to: to.trim(),
      date,
      passengers,
      type
    });
  };

  const setDateOffset = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    setDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Decorative colorful glow shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-60 h-60 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center mb-8 sm:mb-10">
        {/* Subtle top indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-cyan-200 mb-4 shadow-sm animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>India’s Unified Smart Travel Search Engine</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading leading-tight text-balance">
          Find Your Best Way to Travel
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-3.5 text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-normal text-balance">
          Compare trains, buses, flights and more in one place.
        </p>

        {/* Mode Selector Tabs */}
        <div className="mt-6 sm:mt-8 inline-flex p-1.5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/15 gap-1 max-w-full overflow-x-auto">
          {[
            { id: 'all', label: 'All Modes', icon: Sparkles, color: 'text-amber-300' },
            { id: 'train', label: 'Trains', icon: Train, color: 'text-purple-300' },
            { id: 'bus', label: 'Buses', icon: Bus, color: 'text-pink-300' },
            { id: 'flight', label: 'Flights', icon: Plane, color: 'text-cyan-300' },
            { id: 'other', label: 'Cabs & More', icon: Car, color: 'text-yellow-300' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = type === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setType(tab.id as TransportType)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-md font-bold scale-[1.02]'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : tab.color}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Search Box Card */}
      <div className="relative max-w-5xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl shadow-purple-950/30 border border-slate-100 text-slate-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* From Location */}
            <div className="relative md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                From
              </label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-3 w-5 h-5 text-purple-600 pointer-events-none" />
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  onFocus={() => setFromSuggestions(true)}
                  onBlur={() => setTimeout(() => setFromSuggestions(false), 200)}
                  placeholder="Departure City"
                  required
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              {/* City suggestions dropdown */}
              {fromSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-30 max-h-48 overflow-y-auto py-1">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase">Popular Cities</div>
                  {POPULAR_CITIES.filter(c => c.toLowerCase().includes(from.toLowerCase()) && c !== to).map((city) => (
                    <button
                      key={city}
                      type="button"
                      onMouseDown={() => setFrom(city)}
                      className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Swap Button */}
            <div className="flex justify-center md:col-span-1 -my-2 md:my-0">
              <button
                type="button"
                onClick={handleSwap}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-700 border border-slate-200 flex items-center justify-center transition-all cursor-pointer hover:rotate-180 duration-300 shadow-xs"
                title="Swap From and To locations"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* To Location */}
            <div className="relative md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                To
              </label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-3 w-5 h-5 text-pink-600 pointer-events-none" />
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  onFocus={() => setToSuggestions(true)}
                  onBlur={() => setTimeout(() => setToSuggestions(false), 200)}
                  placeholder="Destination City"
                  required
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>

              {/* City suggestions dropdown */}
              {toSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-30 max-h-48 overflow-y-auto py-1">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase">Popular Cities</div>
                  {POPULAR_CITIES.filter(c => c.toLowerCase().includes(to.toLowerCase()) && c !== from).map((city) => (
                    <button
                      key={city}
                      type="button"
                      onMouseDown={() => setTo(city)}
                      className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-pink-50 hover:text-pink-700 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Travel Date */}
            <div className="relative md:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Travel Date
                </label>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setDateOffset(0)}
                    className="text-[10px] text-blue-600 hover:underline font-semibold"
                  >
                    Today
                  </button>
                  <span className="text-[10px] text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={() => setDateOffset(1)}
                    className="text-[10px] text-blue-600 hover:underline font-semibold"
                  >
                    Tmrw
                  </button>
                </div>
              </div>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 w-5 h-5 text-blue-600 pointer-events-none" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full pl-10 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Passengers & Type */}
            <div className="relative md:col-span-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Pass.
                  </label>
                  <div className="relative flex items-center">
                    <Users className="absolute left-2.5 w-4 h-4 text-cyan-600 pointer-events-none" />
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="w-full pl-8 pr-6 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Type
                  </label>
                  <div className="relative flex items-center">
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as TransportType)}
                      className="w-full pl-2.5 pr-6 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="all">All Modes</option>
                      <option value="train">🚆 Trains</option>
                      <option value="bus">🚌 Buses</option>
                      <option value="flight">✈️ Flights</option>
                      <option value="other">🚕 Other</option>
                    </select>
                    <ChevronDown className="absolute right-2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Search Button & Popular Route Chips */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Quick routes */}
            <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="font-bold text-slate-700 whitespace-nowrap">Popular:</span>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                {POPULAR_ROUTES.slice(0, 4).map((rt) => (
                  <button
                    key={`${rt.from}-${rt.to}`}
                    type="button"
                    onClick={() => handleQuickRoute(rt.from, rt.to)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-700 font-medium transition-colors cursor-pointer text-xs"
                  >
                    {rt.from} → {rt.to}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Search Transport</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
