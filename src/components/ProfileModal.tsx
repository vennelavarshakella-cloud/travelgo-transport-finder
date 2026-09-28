import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Wallet, 
  Award, 
  ShieldCheck, 
  LogOut, 
  Check, 
  Ticket
} from 'lucide-react';

interface ProfileModalProps {
  userName: string;
  userEmail: string;
  onUpdateUser: (name: string, email: string) => void;
  onClose: () => void;
  bookingsCount: number;
  onGoToBookings: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  userName,
  userEmail,
  onUpdateUser,
  onClose,
  bookingsCount,
  onGoToBookings,
}) => {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onUpdateUser(name.trim(), email.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-400 to-amber-300 text-slate-950 font-extrabold text-2xl mx-auto flex items-center justify-center shadow-lg border-2 border-white mb-2">
            {name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold font-heading">{name}</h2>
          <p className="text-xs text-purple-200">{email}</p>
        </div>

        {/* Wallet & Stats */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/70 grid grid-cols-2 gap-3 text-center">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
              <Wallet className="w-3 h-3 text-emerald-500" />
              TravelGo Wallet
            </span>
            <div className="text-base font-extrabold text-slate-900 mt-1">₹750</div>
            <span className="text-[10px] text-emerald-600 font-semibold">Active Credits</span>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onGoToBookings();
            }}
            className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs hover:border-purple-300 transition-colors cursor-pointer text-center"
          >
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
              <Ticket className="w-3 h-3 text-purple-500" />
              Your Trips
            </span>
            <div className="text-base font-extrabold text-purple-700 mt-1">{bookingsCount} Booked</div>
            <span className="text-[10px] text-purple-600 font-semibold hover:underline">View All →</span>
          </button>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-purple-600" />
              Traveler Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Profile</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
