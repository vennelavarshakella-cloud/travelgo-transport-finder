import React, { useState } from 'react';
import { 
  Train, 
  Bus, 
  Plane, 
  Car, 
  ShieldCheck, 
  Zap, 
  Tag, 
  Clock, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Headphones, 
  Sparkles,
  MapPin,
  Heart
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does TravelGo compare trains, buses, and flights together?',
      a: 'TravelGo unifies multi-modal travel options into a single real-time comparison engine. We calculate departure schedules, travel duration, seat availability, and net fares side-by-side so you never have to toggle between multiple booking apps.'
    },
    {
      q: 'How do the "Fastest Option" and "Cheapest Option" work?',
      a: 'Whenever you search any destination, our system automatically tags the vehicle with the absolute shortest transit time (Fastest ⚡) and the lowest total fare per person (Cheapest 💰), displayed prominently for rapid decision-making.'
    },
    {
      q: 'What is included in the ticket fare?',
      a: 'The displayed price includes all standard base fares, taxes, passenger insurance, and operator booking charges. For flights, standard cabin and check-in baggage allowances are detailed on the card.'
    },
    {
      q: 'Can I cancel or reschedule my booking on TravelGo?',
      a: 'Yes! All confirmed bookings can be viewed or cancelled anytime from the "My Bookings" tab. Cancellations processed more than 6 hours prior to departure are eligible for prompt refunds.'
    },
    {
      q: 'Are promo codes and coupons available?',
      a: 'Yes, try promo code TRAVELGO100 for an instant ₹100 deduction per ticket, or FIRSTTRIP for a 15% promotional discount during checkout.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-800 text-xs font-bold mb-4 border border-purple-200">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>About TravelGo</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
          Simplifying Intercity Travel for Everyone
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600">
          TravelGo is designed to eliminate the friction of comparing multiple transport modes. Whether you prefer the speed of a flight, the budget of a train, or the comfort of a sleeper bus, we bring everything into one simple screen.
        </p>
      </div>

      {/* 4 Transport Pillars */}
      <div className="mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading text-center mb-8">
          All Your Travel Modes In One Place
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Train */}
          <div className="bg-white rounded-2xl p-5 border border-purple-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              <Train className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              🚆 Express Trains
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Vande Bharat, Rajdhani, and Superfast express trains with live berth status, coach types, and pantry details.
            </p>
          </div>

          {/* Bus */}
          <div className="bg-white rounded-2xl p-5 border border-pink-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center mb-3">
              <Bus className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              🚌 Intercity Buses
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Multi-axle Volvos, AC Sleepers, and government RTC services connecting thousands of towns with live tracking.
            </p>
          </div>

          {/* Flight */}
          <div className="bg-white rounded-2xl p-5 border border-cyan-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center mb-3">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              ✈️ Domestic Flights
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Direct non-stop flight connections from top airlines with terminal info, cabin baggage rules, and airfare trends.
            </p>
          </div>

          {/* Cab / Other */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              🚕 Cabs & Shuttles
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              One-way doorstep sedans, spacious luxury SUVs, and shared regional express vans with zero cancellation fees.
            </p>
          </div>

        </div>
      </div>

      {/* Why Choose TravelGo Bento Features */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 rounded-3xl p-8 sm:p-12 text-white mb-16 shadow-xl">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Why Travelers Love Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mt-1">
            Built for smart travel decisions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
            <Zap className="w-7 h-7 text-amber-300 mb-2" />
            <h4 className="text-base font-bold text-white mb-1">Instant Highlights</h4>
            <p className="text-xs text-slate-300">
              Immediately identify which option is the fastest and which one saves the most money.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
            <ShieldCheck className="w-7 h-7 text-cyan-300 mb-2" />
            <h4 className="text-base font-bold text-white mb-1">Live Seat Transparency</h4>
            <p className="text-xs text-slate-300">
              Real-time seat count alerts so you know exactly when seats are selling out.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
            <Tag className="w-7 h-7 text-pink-300 mb-2" />
            <h4 className="text-base font-bold text-white mb-1">Zero Hidden Costs</h4>
            <p className="text-xs text-slate-300">
              Transparent fare breakdown with verified taxes, promo discounts, and instant PNR generation.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm text-slate-800 hover:text-purple-700 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-purple-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Support / Contact Banner */}
      <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50 rounded-2xl p-6 sm:p-8 border border-purple-200 text-center">
        <Headphones className="w-8 h-8 text-purple-600 mx-auto mb-2" />
        <h3 className="text-lg font-bold text-slate-900 font-heading">
          Need Help With Your Booking?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
          Our friendly customer support team is available 24/7 to assist with rescheduling, cancellation refunds, and ticket assistance.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-700">
          <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
            📞 Helpline: 1800-200-TRAVEL
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
            ✉️ Email: support@travelgo.com
          </span>
        </div>
      </div>

    </div>
  );
};
