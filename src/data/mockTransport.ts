import { TransportItem } from '../types/transport';

export const POPULAR_CITIES = [
  'Hyderabad',
  'Visakhapatnam',
  'Bengaluru',
  'Mumbai',
  'Delhi',
  'Chennai',
  'Kolkata',
  'Pune',
  'Goa',
  'Jaipur',
  'Ahmedabad',
  'Kochi'
];

export const POPULAR_ROUTES = [
  { from: 'Hyderabad', to: 'Visakhapatnam' },
  { from: 'Bengaluru', to: 'Mumbai' },
  { from: 'Delhi', to: 'Jaipur' },
  { from: 'Chennai', to: 'Bengaluru' },
  { from: 'Mumbai', to: 'Goa' },
  { from: 'Pune', to: 'Hyderabad' }
];

// Curated preset for Hyderabad -> Visakhapatnam matching user prompt examples
const HYD_TO_VIZAG_DATA: TransportItem[] = [
  {
    id: 'hyd-viz-fl-1',
    type: 'flight',
    name: 'IndiGo 6E-452',
    operator: 'IndiGo Airlines',
    code: '6E 452',
    from: 'Hyderabad',
    to: 'Visakhapatnam',
    fromStation: 'Rajiv Gandhi Int\'l Airport (HYD)',
    toStation: 'Visakhapatnam Airport (VTZ)',
    departureTime: '08:15',
    arrivalTime: '09:35',
    durationMinutes: 80,
    durationFormatted: '1h 20m',
    seatsAvailable: 12,
    price: 3850,
    rating: 4.8,
    reviewsCount: 340,
    amenities: ['In-flight Meal', 'USB Charging', 'Extra Legroom', 'Baggage 15kg'],
    vehicleDetails: 'Airbus A321neo • Non-stop',
    badge: '⚡ Fastest Overall'
  },
  {
    id: 'hyd-viz-fl-2',
    type: 'flight',
    name: 'Air India AI-542',
    operator: 'Air India',
    code: 'AI 542',
    from: 'Hyderabad',
    to: 'Visakhapatnam',
    fromStation: 'Rajiv Gandhi Int\'l Airport (HYD)',
    toStation: 'Visakhapatnam Airport (VTZ)',
    departureTime: '16:40',
    arrivalTime: '18:05',
    durationMinutes: 85,
    durationFormatted: '1h 25m',
    seatsAvailable: 19,
    price: 4120,
    rating: 4.5,
    reviewsCount: 210,
    amenities: ['Free Hot Meal', 'Beverages', '25kg Baggage', 'Entertainment'],
    vehicleDetails: 'Boeing 737 Max • Non-stop'
  },
  {
    id: 'hyd-viz-tr-1',
    type: 'train',
    name: 'Vande Bharat Express',
    operator: 'Indian Railways (20834)',
    code: '20834',
    from: 'Hyderabad',
    to: 'Visakhapatnam',
    fromStation: 'Secunderabad Jn (SC)',
    toStation: 'Visakhapatnam Jn (VSKP)',
    departureTime: '15:00',
    arrivalTime: '23:30',
    durationMinutes: 510,
    durationFormatted: '8h 30m',
    seatsAvailable: 28,
    price: 1665,
    rating: 4.9,
    reviewsCount: 890,
    amenities: ['Catering Included', 'Executive AC Chairs', 'Bio Toilets', 'High Speed Wi-Fi', 'Power Sockets'],
    vehicleDetails: 'Chair Car (CC) / Executive (EC)',
    badge: 'High Speed Train'
  },
  {
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
  {
    id: 'hyd-viz-tr-3',
    type: 'train',
    name: 'Visakha Superfast Express',
    operator: 'Indian Railways (17016)',
    code: '17016',
    from: 'Hyderabad',
    to: 'Visakhapatnam',
    fromStation: 'Secunderabad Jn (SC)',
    toStation: 'Visakhapatnam Jn (VSKP)',
    departureTime: '16:50',
    arrivalTime: '07:30',
    durationMinutes: 880,
    durationFormatted: '14h 40m',
    seatsAvailable: 58,
    price: 490,
    rating: 4.3,
    reviewsCount: 650,
    amenities: ['Overnight Sleeper', 'Bedrolls Available', 'Security Guard', 'Tea/Coffee Service'],
    vehicleDetails: 'Sleeper Class (SL)',
    badge: 'Cheapest Option'
  },
  {
    id: 'hyd-viz-bs-1',
    type: 'bus',
    name: 'Garuda Plus Multi-Axle Volvo',
    operator: 'TSRTC Deluxe Travels',
    code: 'TS-VOLVO-91',
    from: 'Hyderabad',
    to: 'Visakhapatnam',
    fromStation: 'MGBS Hyderabad (Central Bus Terminal)',
    toStation: 'Dwaraka Bus Station (RTC Complex VSKP)',
    departureTime: '20:00',
    arrivalTime: '07:30',
    durationMinutes: 690,
    durationFormatted: '11h 30m',
    seatsAvailable: 16,
    price: 1190,
    rating: 4.7,
    reviewsCount: 420,
    amenities: ['AC Sleeper', 'Live Bus Tracking', 'Blanket & Pillow', 'Bottle of Water', 'Emergency Exit'],
    vehicleDetails: 'Volvo B11R 2+1 AC Sleeper'
  },
  {
    id: 'hyd-viz-bs-2',
    type: 'bus',
    name: 'Orange Travels AC Sleeper',
    operator: 'Orange Tour & Travels',
    code: 'OR-SLEEP-44',
    from: 'Hyderabad',
    to: 'Visakhapatnam',
    fromStation: 'Ameerpet / Dilsukhnagar, HYD',
    toStation: 'Gurudwara Jn, Visakhapatnam',
    departureTime: '21:15',
    arrivalTime: '08:45',
    durationMinutes: 690,
    durationFormatted: '11h 30m',
    seatsAvailable: 9,
    price: 1350,
    rating: 4.6,
    reviewsCount: 310,
    amenities: ['Individual TV Screen', 'AC Sleeper', 'USB Port', 'Snack Box', 'Sanitized Bedding'],
    vehicleDetails: 'Scania Multi-Axle Premium Sleeper'
  },
  {
    id: 'hyd-viz-bs-3',
    type: 'bus',
    name: 'GreenLine Express Bus',
    operator: 'GreenLine Transports',
    code: 'GL-EXP-12',
    from: 'Hyderabad',
    to: 'Visakhapatnam',
    fromStation: 'Kukatpally Bus Stop',
    toStation: 'Rama Talkies, VSKP',
    departureTime: '18:30',
    arrivalTime: '06:45',
    durationMinutes: 735,
    durationFormatted: '12h 15m',
    seatsAvailable: 24,
    price: 890,
    rating: 4.2,
    reviewsCount: 180,
    amenities: ['Semi-Sleeper AC', 'Luggage Compartment', 'Water Bottle', 'First Aid'],
    vehicleDetails: 'Mercedes Benz 2+2 Semi-Sleeper'
  },
  {
    id: 'hyd-viz-ot-1',
    type: 'other',
    name: 'TravelGo Intercity Sedan Cab',
    operator: 'TravelGo Prime Fleet',
    code: 'CAB-PRIME-01',
    from: 'Hyderabad',
    to: 'Visakhapatnam',
    fromStation: 'Doorstep Pickup (Hyderabad)',
    toStation: 'Doorstep Drop (Visakhapatnam)',
    departureTime: '07:00',
    arrivalTime: '18:30',
    durationMinutes: 690,
    durationFormatted: '11h 30m',
    seatsAvailable: 4,
    price: 8400,
    rating: 4.9,
    reviewsCount: 88,
    amenities: ['Private Dedicated Car', 'Doorstep Pickup', 'Rest Stop Flexibility', 'AC', 'Luggage Space for 3 Bags'],
    vehicleDetails: 'Maruti Suzuki Dzire / Toyota Etios (Sedan)'
  },
  {
    id: 'hyd-viz-ot-2',
    type: 'other',
    name: 'TravelGo SUV Intercity Charter',
    operator: 'TravelGo Prime Fleet',
    code: 'CAB-SUV-09',
    from: 'Hyderabad',
    to: 'Visakhapatnam',
    fromStation: 'Doorstep Pickup (Hyderabad)',
    toStation: 'Doorstep Drop (Visakhapatnam)',
    departureTime: '06:00',
    arrivalTime: '17:00',
    durationMinutes: 660,
    durationFormatted: '11h 00m',
    seatsAvailable: 6,
    price: 11200,
    rating: 4.9,
    reviewsCount: 64,
    amenities: ['Innova Crysta Luxury', 'Reclining Captain Seats', 'Toll Included', 'Professional Chauffeur', 'Complimentary Water & Mints'],
    vehicleDetails: 'Toyota Innova Crysta (6 Seater)'
  }
];

// Helper to calculate duration formatted string
function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m.toString().padStart(2, '0')}m`;
}

// Helper to add minutes to time "HH:mm"
function addMinutesToTime(timeStr: string, minutes: number): string {
  const [h, m] = timeStr.split(':').map(Number);
  const total = (h * 60 + m + minutes) % (24 * 60);
  const finalH = Math.floor(total / 60);
  const finalM = total % 60;
  return `${finalH.toString().padStart(2, '0')}:${finalM.toString().padStart(2, '0')}`;
}

// Generate realistic mock transports for any city pair
export function generateTransportData(from: string, to: string): TransportItem[] {
  const cleanFrom = from.trim().toLowerCase();
  const cleanTo = to.trim().toLowerCase();

  // If searching Hyderabad -> Visakhapatnam, return the rich preset
  if (cleanFrom.includes('hyderabad') && cleanTo.includes('visakhapatnam')) {
    return HYD_TO_VIZAG_DATA;
  }

  // Reverse direction: Visakhapatnam -> Hyderabad
  if (cleanFrom.includes('visakhapatnam') && cleanTo.includes('hyderabad')) {
    return HYD_TO_VIZAG_DATA.map((item, idx) => ({
      ...item,
      id: `rev-${item.id}-${idx}`,
      from: 'Visakhapatnam',
      to: 'Hyderabad',
      fromStation: item.toStation,
      toStation: item.fromStation
    }));
  }

  // Deterministic seed based on city names
  let seed = 0;
  const combined = (from + to).toLowerCase();
  for (let i = 0; i < combined.length; i++) {
    seed = (seed * 31 + combined.charCodeAt(i)) % 10000;
  }

  const results: TransportItem[] = [
    // 1. Flight Fast
    {
      id: `gen-fl-1-${seed}`,
      type: 'flight',
      name: 'IndiGo Express 6E-289',
      operator: 'IndiGo Airlines',
      code: '6E 289',
      from,
      to,
      fromStation: `${from} International Airport (Terminal 1)`,
      toStation: `${to} International Airport (Terminal 2)`,
      departureTime: '07:30',
      arrivalTime: addMinutesToTime('07:30', 95),
      durationMinutes: 95,
      durationFormatted: '1h 35m',
      seatsAvailable: 15,
      price: 3600 + (seed % 1200),
      rating: 4.8,
      reviewsCount: 412,
      amenities: ['15kg Baggage Included', 'USB Power Ports', 'Clean Cabin Certified', 'Beverage Service'],
      vehicleDetails: 'Airbus A320neo • Non-Stop',
      badge: '⚡ Fastest Option'
    },
    // 2. Flight Evening
    {
      id: `gen-fl-2-${seed}`,
      type: 'flight',
      name: 'Air India AI-804',
      operator: 'Air India',
      code: 'AI 804',
      from,
      to,
      fromStation: `${from} Airport (Terminal 3)`,
      toStation: `${to} Airport (Terminal 1)`,
      departureTime: '17:15',
      arrivalTime: addMinutesToTime('17:15', 105),
      durationMinutes: 105,
      durationFormatted: '1h 45m',
      seatsAvailable: 22,
      price: 4150 + (seed % 900),
      rating: 4.5,
      reviewsCount: 290,
      amenities: ['Complimentary Meal', '25kg Check-in Luggage', 'Comfortable Recline', 'Entertainment App'],
      vehicleDetails: 'Boeing 737-800 • Direct'
    },
    // 3. Superfast Train
    {
      id: `gen-tr-1-${seed}`,
      type: 'train',
      name: 'Vande Bharat Express',
      operator: 'Indian Railways (22436)',
      code: '22436',
      from,
      to,
      fromStation: `${from} Central Railway Station`,
      toStation: `${to} Main Junction`,
      departureTime: '06:00',
      arrivalTime: addMinutesToTime('06:00', 390),
      durationMinutes: 390,
      durationFormatted: '6h 30m',
      seatsAvailable: 34,
      price: 1450 + (seed % 300),
      rating: 4.9,
      reviewsCount: 940,
      amenities: ['High-speed Wi-Fi', 'Breakfast & Tea Included', '180° Rotating Seats', 'CCTV Security'],
      vehicleDetails: 'AC Chair Car (CC)',
      badge: 'Popular Choice'
    },
    // 4. Budget Train
    {
      id: `gen-tr-2-${seed}`,
      type: 'train',
      name: 'Superfast Express Train',
      operator: 'Indian Railways (12952)',
      code: '12952',
      from,
      to,
      fromStation: `${from} Junction`,
      toStation: `${to} Central`,
      departureTime: '11:45',
      arrivalTime: addMinutesToTime('11:45', 465),
      durationMinutes: 465,
      durationFormatted: '7h 45m',
      seatsAvailable: 68,
      price: 540 + (seed % 180),
      rating: 4.4,
      reviewsCount: 1680,
      amenities: ['Sleeper Berths', 'Pantry Meal Service', 'Charging Sockets', 'Luggage Rack'],
      vehicleDetails: 'Sleeper Class (SL) & 3AC',
      badge: '💰 Cheapest Option'
    },
    // 5. Overnight Premium Train
    {
      id: `gen-tr-3-${seed}`,
      type: 'train',
      name: 'Rajdhani Deluxe Express',
      operator: 'Indian Railways (12431)',
      code: '12431',
      from,
      to,
      fromStation: `${from} Railway Station`,
      toStation: `${to} Station`,
      departureTime: '19:50',
      arrivalTime: addMinutesToTime('19:50', 520),
      durationMinutes: 520,
      durationFormatted: '8h 40m',
      seatsAvailable: 18,
      price: 1890 + (seed % 400),
      rating: 4.7,
      reviewsCount: 780,
      amenities: ['Fresh Bed Linen & Blanket', 'Dinner & Morning Tea', 'Attendant Service', 'Quiet Coach'],
      vehicleDetails: 'AC 2-Tier (2A)'
    },
    // 6. Luxury Bus
    {
      id: `gen-bs-1-${seed}`,
      type: 'bus',
      name: 'IntrCity SmartBus AC Sleeper',
      operator: 'IntrCity SmartBus',
      code: 'IC-882',
      from,
      to,
      fromStation: `${from} Central Boarding Point`,
      toStation: `${to} City Drop Point`,
      departureTime: '21:00',
      arrivalTime: addMinutesToTime('21:00', 600),
      durationMinutes: 600,
      durationFormatted: '10h 00m',
      seatsAvailable: 14,
      price: 980 + (seed % 250),
      rating: 4.6,
      reviewsCount: 520,
      amenities: ['Clean AC Berth', 'GPS Live Tracking', 'Individual USB Port', 'Water Bottle', 'Emergency Button'],
      vehicleDetails: 'Volvo Multi-Axle B11R 2+1 Sleeper'
    },
    // 7. Express Bus
    {
      id: `gen-bs-2-${seed}`,
      type: 'bus',
      name: 'Zingbus AC Multi-Axle',
      operator: 'Zingbus Premium',
      code: 'ZB-501',
      from,
      to,
      fromStation: `${from} Interstate Bus Terminal`,
      toStation: `${to} Main Bus Stand`,
      departureTime: '22:30',
      arrivalTime: addMinutesToTime('22:30', 570),
      durationMinutes: 570,
      durationFormatted: '9h 30m',
      seatsAvailable: 29,
      price: 850 + (seed % 200),
      rating: 4.5,
      reviewsCount: 390,
      amenities: ['Lounge Access', 'Blanket', 'On-time Guarantee', 'Air Suspension'],
      vehicleDetails: 'BharatBenz 2+2 Semi-Sleeper AC'
    },
    // 8. Other / Shared Cab or Private Cab
    {
      id: `gen-ot-1-${seed}`,
      type: 'other',
      name: 'TravelGo One-Way Intercity Cab',
      operator: 'TravelGo Chauffeur Service',
      code: 'CAB-ONEWAY-05',
      from,
      to,
      fromStation: `Your Pickup Address in ${from}`,
      toStation: `Your Exact Address in ${to}`,
      departureTime: 'Flexible (Select Time)',
      arrivalTime: 'On Demand (~8h)',
      durationMinutes: 480,
      durationFormatted: '8h 00m',
      seatsAvailable: 4,
      price: 5200 + (seed % 1500),
      rating: 4.9,
      reviewsCount: 145,
      amenities: ['Door-to-Door Pickup', 'Zero Cancellation Fee', 'AC Sedan', 'Luggage Space', 'Sanitized Vehicle'],
      vehicleDetails: 'Honda Amaze / Swift Dzire'
    },
    // 9. Other / Express Shared Shuttle
    {
      id: `gen-ot-2-${seed}`,
      type: 'other',
      name: 'CityShuttle Express Van',
      operator: 'TravelGo Regional Shuttles',
      code: 'SHTL-EXPR-99',
      from,
      to,
      fromStation: `${from} Tech Park Hub`,
      toStation: `${to} City Center Hub`,
      departureTime: '09:00',
      arrivalTime: addMinutesToTime('09:00', 450),
      durationMinutes: 450,
      durationFormatted: '7h 30m',
      seatsAvailable: 8,
      price: 1350,
      rating: 4.6,
      reviewsCount: 110,
      amenities: ['Ergonomic Bucket Seats', 'High Speed 5G Wi-Fi', 'Power Outlets', 'Luggage Assistance'],
      vehicleDetails: 'Force Urbania Premium 10-Seater'
    }
  ];

  return results;
}
