export type TransportType = 'all' | 'train' | 'bus' | 'flight' | 'other';

export interface TransportItem {
  id: string;
  type: 'train' | 'bus' | 'flight' | 'other';
  name: string;
  operator: string;
  code?: string;
  from: string;
  to: string;
  fromStation: string;
  toStation: string;
  departureTime: string; // HH:mm
  arrivalTime: string;   // HH:mm
  durationMinutes: number;
  durationFormatted: string; // e.g., "7h 45m"
  seatsAvailable: number;
  price: number; // in INR
  rating: number;
  reviewsCount: number;
  amenities: string[];
  features?: string[];
  vehicleDetails?: string;
  badge?: string;
}

export interface SearchQuery {
  from: string;
  to: string;
  date: string;
  passengers: number;
  type: TransportType;
}

export interface FilterState {
  type: TransportType;
  maxPrice: number;
  timeSlot: 'all' | 'morning' | 'afternoon' | 'evening' | 'night';
  maxDurationHours: number;
  minSeats: number;
  sortBy: 'cheapest' | 'fastest' | 'earliest' | 'rating';
}

export interface Passenger {
  id: string;
  name: string;
  age: number | string;
  gender: 'Male' | 'Female' | 'Other';
  seatPreference: 'Window' | 'Aisle' | 'Middle' | 'No Preference';
}

export interface BookingRecord {
  id: string;
  bookingRef: string; // PNR
  transport: TransportItem;
  travelDate: string;
  passengers: Passenger[];
  contactEmail: string;
  contactPhone: string;
  baseFare: number;
  taxFee: number;
  discount: number;
  totalPrice: number;
  bookingDate: string;
  status: 'Confirmed' | 'Cancelled';
  paymentMethod: string;
}
