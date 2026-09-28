import React, { useState } from 'react';
import { 
  X, 
  Train, 
  Bus, 
  Plane, 
  Car, 
  Clock, 
  Calendar, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Tag, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Check, 
  Plus, 
  Trash2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TransportItem, Passenger, BookingRecord } from '../types/transport';

interface BookingModalProps {
  transport: TransportItem;
  travelDate: string;
  initialPassengersCount?: number;
  onClose: () => void;
  onConfirmBooking: (record: BookingRecord) => void;
  defaultEmail?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  transport,
  travelDate,
  initialPassengersCount = 1,
  onClose,
  onConfirmBooking,
  defaultEmail = 'traveler@example.com',
}) => {
  const [passengers, setPassengers] = useState<Passenger[]>(() => {
    const list: Passenger[] = [];
    const count = Math.min(Math.max(initialPassengersCount, 1), transport.seatsAvailable || 1);
    for (let i = 0; i < count; i++) {
      list.push({
        id: `p-${i + 1}`,
        name: i === 0 ? 'Alex Mercer' : '',
        age: i === 0 ? 28 : '',
        gender: 'Male',
        seatPreference: 'Window'
      });
    }
    return list;
  });

  const [contactEmail, setContactEmail] = useState(defaultEmail);
  const [contactPhone, setContactPhone] = useState('+91 98765 43210');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Fare calculation
  const ticketCount = passengers.length;
  const baseFare = transport.price * ticketCount;
  const taxFee = Math.round(baseFare * 0.05); // 5% GST & fees
  const totalPrice = Math.max(0, baseFare + taxFee - appliedDiscount);

  const handleAddPassenger = () => {
    if (passengers.length >= (transport.seatsAvailable || 6)) return;
    setPassengers(prev => [
      ...prev,
      {
        id: `p-${Date.now()}`,
        name: '',
        age: '',
        gender: 'Male',
        seatPreference: 'Window'
      }
    ]);
  };

  const handleRemovePassenger = (index: number) => {
    if (passengers.length <= 1) return;
    setPassengers(prev => prev.filter((_, i) => i !== index));
  };

  const handlePassengerChange = (index: number, field: keyof Passenger, value: any) => {
    setPassengers(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'TRAVELGO100') {
      const discountVal = 100 * ticketCount;
      setAppliedDiscount(discountVal);
      setCouponMessage(`🎉 Coupon TRAVELGO100 applied! Saved ₹${discountVal}`);
    } else if (code === 'FIRSTTRIP') {
      const discountVal = Math.round(baseFare * 0.15);
      setAppliedDiscount(discountVal);
      setCouponMessage(`🎉 Coupon FIRSTTRIP applied! 15% discount (₹${discountVal})`);
    } else {
      setAppliedDiscount(0);
      setCouponMessage('❌ Invalid coupon code. Try TRAVELGO100 or FIRSTTRIP');
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic passenger validation
    for (let i = 0; i < passengers.length; i++) {
      if (!passengers[i].name.trim()) {
        alert(`Please enter Passenger ${i + 1}'s full name.`);
        return;
      }
    }

    setIsProcessing(true);

    setTimeout(() => {
      // Confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback if blocked
      }

      // Generate random PNR
      const pnrPrefix = transport.type === 'flight' ? 'TGFL' : transport.type === 'train' ? 'TGTR' : 'TGBUS';
      const randomDigits = Math.floor(100000 + Math.random() * 900000);
      const bookingRef = `${pnrPrefix}-${randomDigits}`;

      const newBooking: BookingRecord = {
        id: `bk-${Date.now()}`,
        bookingRef,
        transport,
        travelDate,
        passengers,
        contactEmail,
        contactPhone,
        baseFare,
        taxFee,
        discount: appliedDiscount,
        totalPrice,
        bookingDate: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'Confirmed',
        paymentMethod: paymentMethod.toUpperCase()
      };

      setIsProcessing(false);
      onConfirmBooking(newBooking);
    }, 800);
  };

  const getTransportIcon = () => {
    switch (transport.type) {
      case 'flight': return <Plane className="w-5 h-5 text-cyan-600" />;
      case 'train': return <Train className="w-5 h-5 text-purple-600" />;
      case 'bus': return <Bus className="w-5 h-5 text-pink-600" />;
      default: return <Car className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-3xl w-full max-h-[92vh] overflow-y-auto flex flex-col relative animate-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 border border-purple-200">
              {getTransportIcon()}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Confirm Your Booking
              </h2>
              <p className="text-xs text-slate-500">
                Review journey details and add passenger information
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmitBooking} className="p-6 space-y-6">
          
          {/* Selected Transport Summary Card */}
          <div className="rounded-2xl bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50 p-4 border border-purple-200/60 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-md">
                {transport.operator} • {transport.name}
              </span>
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                {travelDate}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center text-slate-900 pt-2">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">From</span>
                <div className="text-lg font-extrabold font-heading">{transport.departureTime}</div>
                <div className="text-xs font-bold text-slate-800">{transport.from}</div>
                <div className="text-[10px] text-slate-500 truncate">{transport.fromStation}</div>
              </div>

              <div className="text-center">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {transport.durationFormatted}
                </span>
                <div className="text-[10px] text-slate-400 mt-1">Direct Journey</div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">To</span>
                <div className="text-lg font-extrabold font-heading">{transport.arrivalTime}</div>
                <div className="text-xs font-bold text-slate-800">{transport.to}</div>
                <div className="text-[10px] text-slate-500 truncate">{transport.toStation}</div>
              </div>
            </div>
          </div>

          {/* Passenger Details Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 font-heading">
                  <User className="w-4 h-4 text-purple-600" />
                  <span>Passenger Details ({passengers.length} {passengers.length === 1 ? 'Ticket' : 'Tickets'})</span>
                </h3>
                <p className="text-xs text-slate-500">Names must match government ID proof</p>
              </div>

              <button
                type="button"
                onClick={handleAddPassenger}
                disabled={passengers.length >= (transport.seatsAvailable || 6)}
                className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 disabled:opacity-50 px-3 py-1.5 rounded-xl border border-purple-200 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Passenger</span>
              </button>
            </div>

            {/* List of Passengers */}
            <div className="space-y-3">
              {passengers.map((passenger, index) => (
                <div
                  key={passenger.id}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200 relative transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Passenger {index + 1}
                    </span>
                    {passengers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePassenger(index)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-md hover:bg-white transition-colors cursor-pointer"
                        title="Remove passenger"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-5">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={passenger.name}
                        onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                        placeholder="e.g. Varsha Kella"
                        required
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Age *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={passenger.age}
                        onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                        placeholder="Age"
                        required
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Gender
                      </label>
                      <select
                        value={passenger.gender}
                        onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                        className="w-full px-2 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Seat Berth
                      </label>
                      <select
                        value={passenger.seatPreference}
                        onChange={(e) => handlePassengerChange(index, 'seatPreference', e.target.value)}
                        className="w-full px-2 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="Window">Window Seat</option>
                        <option value="Aisle">Aisle Seat</option>
                        <option value="Middle">Middle Seat</option>
                        <option value="No Preference">No Preference</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Contact & Ticket Delivery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Coupon Code Section */}
          <div className="rounded-2xl bg-amber-50/60 border border-amber-200 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-700" />
                  Have a Promo / Coupon Code?
                </span>
                <span className="text-[11px] text-amber-700 block">
                  Use code <strong className="underline">TRAVELGO100</strong> for ₹100 off or <strong className="underline">FIRSTTRIP</strong> for 15% off
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. TRAVELGO100"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs font-bold uppercase text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
            {couponMessage && (
              <p className="text-xs font-semibold text-slate-800 mt-2 bg-white/70 px-2.5 py-1 rounded-lg">
                {couponMessage}
              </p>
            )}
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'upi', label: 'UPI / QR', icon: Smartphone, desc: 'Google Pay, PhonePe' },
                { id: 'card', label: 'Card', icon: CreditCard, desc: 'Visa, Mastercard' },
                { id: 'netbanking', label: 'NetBanking', icon: Sparkles, desc: 'All Major Banks' },
              ].map((pm) => {
                const Icon = pm.icon;
                const isSelected = paymentMethod === pm.id;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-purple-600' : 'text-slate-500'}`} />
                      {isSelected && <Check className="w-3.5 h-3.5 text-purple-600" />}
                    </div>
                    <span className="block text-xs font-bold text-slate-900">{pm.label}</span>
                    <span className="block text-[10px] text-slate-400">{pm.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Breakdown & Total Price */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Base Fare ({ticketCount} × ₹{transport.price})</span>
              <span className="font-semibold text-slate-900">₹{baseFare.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Taxes & Service Fees (5%)</span>
              <span className="font-semibold text-slate-900">₹{taxFee.toLocaleString('en-IN')}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                <span>Discount Applied</span>
                <span>- ₹{appliedDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Total Price
                </span>
                <span className="text-[11px] text-slate-400 block">All inclusive</span>
              </div>
              <div className="text-2xl font-extrabold text-purple-700 font-heading">
                ₹{totalPrice.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isProcessing}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-600 text-white font-bold text-sm shadow-lg shadow-purple-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Booking (₹{totalPrice.toLocaleString('en-IN')})</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
