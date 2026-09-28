import React, { useState } from 'react';
import { Compass, Train, Bus, Plane, Car, User, Ticket, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'search' | 'bookings' | 'about';
  setActiveTab: (tab: 'home' | 'search' | 'bookings' | 'about') => void;
  bookingsCount: number;
  onOpenProfile: () => void;
  userName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bookingsCount,
  onOpenProfile,
  userName,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'search' | 'bookings' | 'about') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Wordmark (Single clean zone) */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent font-heading">
                TravelGo
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                All-in-One
              </span>
            </div>
          </button>

          {/* Center Navigation Links (Zone 2) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-purple-50 text-purple-700 font-bold'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('search')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'search'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <span>Search</span>
              <span className="flex items-center gap-0.5 text-xs opacity-75">
                <Train className="w-3.5 h-3.5" />
                <Bus className="w-3.5 h-3.5" />
                <Plane className="w-3.5 h-3.5" />
              </span>
            </button>
            <button
              onClick={() => handleNavClick('bookings')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer relative flex items-center gap-1.5 ${
                activeTab === 'bookings'
                  ? 'bg-pink-50 text-pink-700 font-bold'
                  : 'text-slate-600 hover:text-pink-600 hover:bg-slate-50'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>My Bookings</span>
              {bookingsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-pink-500 text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                  {bookingsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-cyan-50 text-cyan-800 font-bold'
                  : 'text-slate-600 hover:text-cyan-600 hover:bg-slate-50'
              }`}
            >
              About
            </button>
          </nav>

          {/* Right Action: User profile button (Zone 3) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-purple-700 bg-slate-100 hover:bg-purple-50 rounded-xl border border-slate-200 transition-all cursor-pointer shadow-xs active:scale-95"
              title="User Account"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-xs">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline-block max-w-[100px] truncate">{userName}</span>
              <User className="w-3.5 h-3.5 text-slate-400 sm:hidden" />
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
              activeTab === 'home' ? 'bg-purple-50 text-purple-700' : 'text-slate-700'
            }`}
          >
            🏠 Home
          </button>
          <button
            onClick={() => handleNavClick('search')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
              activeTab === 'search' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          >
            🔍 Search Transport
          </button>
          <button
            onClick={() => handleNavClick('bookings')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
              activeTab === 'bookings' ? 'bg-pink-50 text-pink-700' : 'text-slate-700'
            }`}
          >
            <span className="flex items-center gap-2">
              🎟️ My Bookings
            </span>
            {bookingsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-pink-500 text-white font-bold">
                {bookingsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
              activeTab === 'about' ? 'bg-cyan-50 text-cyan-800' : 'text-slate-700'
            }`}
          >
            ℹ️ About TravelGo
          </button>
        </div>
      )}
    </header>
  );
};
