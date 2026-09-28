/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { HighlightCards } from './components/HighlightCards';
import { FilterSidebar } from './components/FilterSidebar';
import { TransportCard } from './components/TransportCard';
import { BookingModal } from './components/BookingModal';
import { TicketPassModal } from './components/TicketPassModal';
import { MyBookingsView } from './components/MyBookingsView';
import { AboutView } from './components/AboutView';
import { ProfileModal } from './components/ProfileModal';
import { generateTransportData } from './data/mockTransport';
import { 
  TransportItem, 
  SearchQuery, 
  FilterState, 
  BookingRecord, 
  TransportType 
} from './types/transport';
import { 
  Train, 
  Bus, 
  Plane, 
  Car, 
  Sparkles, 
  SlidersHorizontal, 
  ArrowUpDown,
  Search,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

const STORAGE_KEY_BOOKINGS = 'travelgo_user_bookings';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'bookings' | 'about'>('home');
  const [userName, setUserName] = useState('Alex Mercer');
  const [userEmail, setUserEmail] = useState('alex.mercer@travelgo.in');

  // Active search query
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    from: 'Hyderabad',
    to: 'Visakhapatnam',
    date: new Date().toISOString().split('T')[0],
    passengers: 1,
    type: 'all',
  });

  // Transport dataset based on origin and destination
  const allTransportItems = useMemo(() => {
    return generateTransportData(searchQuery.from, searchQuery.to);
  }, [searchQuery.from, searchQuery.to]);

  // Max price in current dataset for slider bounds
  const maxDatasetPrice = useMemo(() => {
    if (!allTransportItems.length) return 12000;
    return Math.max(...allTransportItems.map(t => t.price)) + 500;
  }, [allTransportItems]);

  // Filter & sort state
  const [filter, setFilter] = useState<FilterState>({
    type: 'all',
    maxPrice: 15000,
    timeSlot: 'all',
    maxDurationHours: 24,
    minSeats: 0,
    sortBy: 'cheapest',
  });

  // Keep filter max price synced if dataset changes
  useEffect(() => {
    setFilter(prev => ({
      ...prev,
      type: searchQuery.type,
      maxPrice: Math.max(prev.maxPrice, maxDatasetPrice)
    }));
  }, [maxDatasetPrice, searchQuery.type]);

  // Modals state
  const [selectedTransportForBooking, setSelectedTransportForBooking] = useState<TransportItem | null>(null);
  const [viewingTicketBooking, setViewingTicketBooking] = useState<BookingRecord | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Stored Bookings list with sample initial item
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }

    // Default sample booking matching Hyderabad -> Visakhapatnam
    const initialItem: BookingRecord = {
      id: 'bk-initial-sample',
      bookingRef: 'TGTR-482910',
      transport: {
        id: 'hyd-viz-tr-2',
        type: 'train',
        name: 'Express Train (Godavari Superfast)',
        operator: 'Indian Railways (12728)',
        code: '12728',
        from: 'Hyderabad',
        to: 'Visakhapatnam',
        fromStation: 'Hyderabad Deccan (HYB)',
        toStation: 'Visakhapatnam Jn (VSKP)',
        departureTime: '06:30',
        arrivalTime: '14:15',
        durationMinutes: 465,
        durationFormatted: '7h 45m',
        seatsAvailable: 42,
        price: 650,
        rating: 4.6,
        reviewsCount: 1420,
        amenities: ['Pantry Car', 'Reserved Berth', 'Reading Lights', 'Charging Ports'],
        vehicleDetails: 'Sleeper (SL) & 3-Tier AC (3A)',
        badge: '💰 Best Value'
      },
      travelDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      passengers: [
        { id: 'p-1', name: 'Alex Mercer', age: 28, gender: 'Male', seatPreference: 'Window' }
      ],
      contactEmail: 'alex.mercer@travelgo.in',
      contactPhone: '+91 98765 43210',
      baseFare: 650,
      taxFee: 32,
      discount: 0,
      totalPrice: 682,
      bookingDate: '28 Sep 2026, 09:30 AM',
      status: 'Confirmed',
      paymentMethod: 'UPI'
    };
    return [initialItem];
  });

  // Save bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    } catch (err) {
      // Ignore
    }
  }, [bookings]);

  // Identify Fastest Option and Cheapest Option from current route items
  const fastestOption = useMemo(() => {
    if (!allTransportItems.length) return undefined;
    return [...allTransportItems].sort((a, b) => a.durationMinutes - b.durationMinutes)[0];
  }, [allTransportItems]);

  const cheapestOption = useMemo(() => {
    if (!allTransportItems.length) return undefined;
    return [...allTransportItems].sort((a, b) => a.price - b.price)[0];
  }, [allTransportItems]);

  // Filter & sort logic
  const filteredAndSortedItems = useMemo(() => {
    let list = allTransportItems.filter(item => {
      // Type filter
      if (filter.type !== 'all' && item.type !== filter.type) {
        return false;
      }
      // Price filter
      if (item.price > filter.maxPrice) {
        return false;
      }
      // Seats filter
      if (filter.minSeats > 0 && item.seatsAvailable < filter.minSeats) {
        return false;
      }
      // Max duration filter
      if (item.durationMinutes > filter.maxDurationHours * 60) {
        return false;
      }
      // Time Slot filter
      if (filter.timeSlot !== 'all') {
        const [h] = item.departureTime.split(':').map(Number);
        if (filter.timeSlot === 'morning' && (h < 6 || h >= 12)) return false;
        if (filter.timeSlot === 'afternoon' && (h < 12 || h >= 18)) return false;
        if (filter.timeSlot === 'evening' && (h < 18 || h >= 24)) return false;
        if (filter.timeSlot === 'night' && (h >= 6)) return false;
      }
      return true;
    });

    // Sorting
    list.sort((a, b) => {
      if (filter.sortBy === 'cheapest') {
        return a.price - b.price;
      }
      if (filter.sortBy === 'fastest') {
        return a.durationMinutes - b.durationMinutes;
      }
      if (filter.sortBy === 'earliest') {
        return a.departureTime.localeCompare(b.departureTime);
      }
      if (filter.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });

    return list;
  }, [allTransportItems, filter]);

  // Handle Search Submission
  const handleSearch = (newQuery: SearchQuery) => {
    setSearchQuery(newQuery);
    setFilter(prev => ({
      ...prev,
      type: newQuery.type
    }));
    // If on another tab, move to search or home
    if (activeTab === 'bookings' || activeTab === 'about') {
      setActiveTab('search');
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setFilter({
      type: 'all',
      maxPrice: maxDatasetPrice,
      timeSlot: 'all',
      maxDurationHours: 24,
      minSeats: 0,
      sortBy: 'cheapest',
    });
  };

  // Open booking modal
  const handleOpenBooking = (item: TransportItem) => {
    setSelectedTransportForBooking(item);
  };

  // Confirm booking
  const handleConfirmBooking = (newBooking: BookingRecord) => {
    setBookings(prev => [newBooking, ...prev]);
    setSelectedTransportForBooking(null);
    setViewingTicketBooking(newBooking);
  };

  // Cancel booking
  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'Cancelled' };
      }
      return b;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-purple-200">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingsCount={bookings.filter(b => b.status === 'Confirmed').length}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        userName={userName}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeTab === 'bookings' ? (
          <MyBookingsView
            bookings={bookings}
            onViewTicket={(b) => setViewingTicketBooking(b)}
            onCancelBooking={handleCancelBooking}
            onStartSearch={() => setActiveTab('search')}
          />
        ) : activeTab === 'about' ? (
          <AboutView />
        ) : (
          <div>
            {/* Colorful Hero Search Header */}
            <HeroSearch
              onSearch={handleSearch}
              initialQuery={searchQuery}
            />

            {/* Results Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
              
              {/* Highlighted Fastest and Cheapest Option Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 tracking-tight flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <span>Best Travel Highlights for {searchQuery.from} → {searchQuery.to}</span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      Top recommended options curated by speed and value
                    </p>
                  </div>
                </div>

                <HighlightCards
                  fastest={fastestOption}
                  cheapest={cheapestOption}
                  onBook={handleOpenBooking}
                />
              </div>

              {/* Main Content Layout: Filters on Left + Transport Cards on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Desktop Left Filter Sidebar (3 cols) */}
                <aside className="hidden lg:block lg:col-span-3 sticky top-20">
                  <FilterSidebar
                    filter={filter}
                    setFilter={setFilter}
                    maxPossiblePrice={maxDatasetPrice}
                    totalResultsCount={allTransportItems.length}
                    filteredCount={filteredAndSortedItems.length}
                    onReset={handleResetFilters}
                  />
                </aside>

                {/* Main Results Column (9 cols) */}
                <div className="lg:col-span-9 space-y-4">
                  
                  {/* Results Subheader Bar with Mobile Filter Trigger & Quick Mode Pills */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                    
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900 font-heading">
                            Available Transports
                          </span>
                          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                            {filteredAndSortedItems.length} options found
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">
                          {searchQuery.from} to {searchQuery.to} • {searchQuery.date}
                        </span>
                      </div>
                    </div>

                    {/* Mode quick pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                      {[
                        { id: 'all', label: 'All' },
                        { id: 'train', label: 'Train', icon: Train },
                        { id: 'bus', label: 'Bus', icon: Bus },
                        { id: 'flight', label: 'Flight', icon: Plane },
                        { id: 'other', label: 'Cab/Other', icon: Car },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setFilter(prev => ({ ...prev, type: t.id as TransportType }))}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                            filter.type === t.id
                              ? 'bg-purple-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {t.icon && <t.icon className="w-3.5 h-3.5" />}
                          <span>{t.label}</span>
                        </button>
                      ))}

                      {/* Mobile filter toggle */}
                      <button
                        onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                        className="lg:hidden px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>Filter</span>
                      </button>
                    </div>

                  </div>

                  {/* Mobile Collapsible Filter Drawer */}
                  {mobileFilterOpen && (
                    <div className="lg:hidden">
                      <FilterSidebar
                        filter={filter}
                        setFilter={setFilter}
                        maxPossiblePrice={maxDatasetPrice}
                        totalResultsCount={allTransportItems.length}
                        filteredCount={filteredAndSortedItems.length}
                        onReset={handleResetFilters}
                      />
                    </div>
                  )}

                  {/* Transport Cards List */}
                  {filteredAndSortedItems.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm">
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
                        <Search className="w-7 h-7" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 font-heading">
                        No Transports Matching Your Filters
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Try relaxing your price range, expanding duration limits, or clearing mode filters to see available transport.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="mt-4 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer transition-colors shadow-sm"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredAndSortedItems.map((item, index) => (
                        <TransportCard
                          key={item.id}
                          item={item}
                          index={index}
                          onBook={handleOpenBooking}
                        />
                      ))}
                    </div>
                  )}

                </div>

              </div>

            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                TravelGo
              </span>
              <p className="text-slate-400 text-xs leading-relaxed">
                Smart multi-modal travel comparison & instant ticket bookings across India. Compare trains, buses, flights, and cabs in one place.
              </p>
              <div className="flex items-center gap-2 pt-1 text-slate-300">
                <span className="p-1.5 rounded-lg bg-slate-800 text-purple-400"><Train className="w-4 h-4" /></span>
                <span className="p-1.5 rounded-lg bg-slate-800 text-pink-400"><Bus className="w-4 h-4" /></span>
                <span className="p-1.5 rounded-lg bg-slate-800 text-cyan-400"><Plane className="w-4 h-4" /></span>
                <span className="p-1.5 rounded-lg bg-slate-800 text-amber-400"><Car className="w-4 h-4" /></span>
              </div>
            </div>

            <div>
              <span className="font-bold text-white uppercase tracking-wider block mb-3">
                Transport Modes
              </span>
              <ul className="space-y-2">
                <li><button onClick={() => { setActiveTab('home'); setFilter(f => ({ ...f, type: 'train' })); }} className="hover:text-white transition-colors cursor-pointer">Indian Railways & Vande Bharat</button></li>
                <li><button onClick={() => { setActiveTab('home'); setFilter(f => ({ ...f, type: 'bus' })); }} className="hover:text-white transition-colors cursor-pointer">Volvo & AC Sleeper Buses</button></li>
                <li><button onClick={() => { setActiveTab('home'); setFilter(f => ({ ...f, type: 'flight' })); }} className="hover:text-white transition-colors cursor-pointer">Domestic Low Fare Flights</button></li>
                <li><button onClick={() => { setActiveTab('home'); setFilter(f => ({ ...f, type: 'other' })); }} className="hover:text-white transition-colors cursor-pointer">Intercity One-Way Cabs</button></li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-white uppercase tracking-wider block mb-3">
                Popular Routes
              </span>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleSearch({ from: 'Hyderabad', to: 'Visakhapatnam', date: searchQuery.date, passengers: 1, type: 'all' })}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Hyderabad → Visakhapatnam
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSearch({ from: 'Bengaluru', to: 'Mumbai', date: searchQuery.date, passengers: 1, type: 'all' })}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Bengaluru → Mumbai
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSearch({ from: 'Delhi', to: 'Jaipur', date: searchQuery.date, passengers: 1, type: 'all' })}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Delhi → Jaipur
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSearch({ from: 'Chennai', to: 'Bengaluru', date: searchQuery.date, passengers: 1, type: 'all' })}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Chennai → Bengaluru
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-white uppercase tracking-wider block mb-3">
                Trust & Support
              </span>
              <ul className="space-y-2">
                <li className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Instant PNR Generation</span>
                </li>
                <li className="flex items-center gap-1.5 text-cyan-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Zero Booking Fees on UPI</span>
                </li>
                <li>
                  <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors cursor-pointer">
                    Help Desk & 24/7 Support
                  </button>
                </li>
                <li>
                  <span className="text-slate-500">Helpline: 1800-200-TRAVEL</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
            <span>© 2026 TravelGo Technologies Inc. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span className="text-slate-400">Vibrant Multi-Modal Travel Platform</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {selectedTransportForBooking && (
        <BookingModal
          transport={selectedTransportForBooking}
          travelDate={searchQuery.date}
          initialPassengersCount={searchQuery.passengers}
          defaultEmail={userEmail}
          onClose={() => setSelectedTransportForBooking(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* Ticket Pass Modal */}
      {viewingTicketBooking && (
        <TicketPassModal
          booking={viewingTicketBooking}
          onClose={() => setViewingTicketBooking(null)}
          onGoToBookings={() => setActiveTab('bookings')}
        />
      )}

      {/* User Profile Modal */}
      {isProfileModalOpen && (
        <ProfileModal
          userName={userName}
          userEmail={userEmail}
          bookingsCount={bookings.length}
          onUpdateUser={(name, email) => {
            setUserName(name);
            setUserEmail(email);
          }}
          onClose={() => setIsProfileModalOpen(false)}
          onGoToBookings={() => setActiveTab('bookings')}
        />
      )}

    </div>
  );
}
