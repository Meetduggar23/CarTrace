/**
 * Car data models, mock data, and provider abstraction for the New Cars feature.
 *
 * Real vehicle/car API data can be connected later by replacing the mock
 * provider. All display logic goes through the normalizer so the UI never
 * shows undefined/null/NaN.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type FuelType = "Petrol" | "Diesel" | "Electric" | "CNG" | "Hybrid";
export type TransmissionType = "Manual" | "Automatic" | "CVT" | "DCT" | "AMT" | "iMT";
export type BodyType =
  | "SUV"
  | "Sedan"
  | "Hatchback"
  | "MUV"
  | "Coupe"
  | "Convertible"
  | "Luxury"
  | "Electric";

export interface CarVariant {
  name: string;
  fuel: FuelType;
  transmission: TransmissionType;
  price: number; // in rupees
  engine: string;
  power: string;
  torque: string;
  mileage: string;
  seats: number;
}

export interface NewCar {
  id: string;
  brand: string;
  model: string;
  slug: string; // e.g. "hyundai-creta"
  tagline: string;
  startingPrice: number; // in rupees
  priceDisplay: string; // e.g. "₹11.00 Lakh*"
  fuel: FuelType[];
  bodyType: BodyType;
  transmission: TransmissionType[];
  engine: string;
  power: string;
  torque: string;
  mileage: string;
  seats: number;
  rating: number | null;
  launchDate: string | null;
  image: string;
  gallery: string[];
  isElectric: boolean;
  evRange: string | null;
  batteryCapacity: string | null;
  chargingTime: string | null;
  dimensions: { length: string; width: string; height: string; wheelbase: string };
  safety: string[];
  features: string[];
  pros: string[];
  cons: string[];
  variants: CarVariant[];
  isPopular: boolean;
  isLatest: boolean;
  isUpcoming: boolean;
  source: string;
}

export interface CarBrand {
  name: string;
  slug: string;
  logo: string;
  country: string;
  carCount: number;
}

export type CarSortOption =
  | "recommended"
  | "price-low"
  | "price-high"
  | "newest"
  | "popular";

export interface CarFilters {
  brand: string[];
  fuel: FuelType[];
  bodyType: BodyType[];
  transmission: TransmissionType[];
  priceMin: number;
  priceMax: number;
  seats: number[];
  electric: boolean;
  search: string;
  sort: CarSortOption;
}

/* ------------------------------------------------------------------ */
/* Price helpers                                                       */
/* ------------------------------------------------------------------ */

export function formatPrice(lakhs: number): string {
  if (lakhs >= 1) return `₹${lakhs.toFixed(2)} Lakh*`;
  const thousands = Math.round(lakhs * 100);
  return `₹${thousands.toLocaleString("en-IN")}*`;
}

export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min)} – ${formatPrice(max)}`;
}

/* ------------------------------------------------------------------ */
/* Brand logos (SVG data URIs for zero-network brand icons)            */
/* ------------------------------------------------------------------ */

const BRAND_INITIAL = (name: string, color: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="${color}"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui,sans-serif" font-weight="700" font-size="28">${name.charAt(0)}</text></svg>`)}`;

export const BRANDS: CarBrand[] = [
  { name: "Maruti Suzuki", slug: "maruti-suzuki", logo: BRAND_INITIAL("Maruti", "#E31837"), country: "India", carCount: 18 },
  { name: "Hyundai", slug: "hyundai", logo: BRAND_INITIAL("Hyundai", "#002C5F"), country: "South Korea", carCount: 12 },
  { name: "Tata", slug: "tata", logo: BRAND_INITIAL("Tata", "#1B365D"), country: "India", carCount: 10 },
  { name: "Mahindra", slug: "mahindra", logo: BRAND_INITIAL("Mahindra", "#D4272E"), country: "India", carCount: 9 },
  { name: "Toyota", slug: "toyota", logo: BRAND_INITIAL("Toyota", "#EB0A1E"), country: "Japan", carCount: 8 },
  { name: "Honda", slug: "honda", logo: BRAND_INITIAL("Honda", "#CC0000"), country: "Japan", carCount: 5 },
  { name: "Kia", slug: "kia", logo: BRAND_INITIAL("Kia", "#05141F"), country: "South Korea", carCount: 6 },
  { name: "MG", slug: "mg", logo: BRAND_INITIAL("MG", "#C8102E"), country: "UK/China", carCount: 5 },
  { name: "Volkswagen", slug: "volkswagen", logo: BRAND_INITIAL("VW", "#001E50"), country: "Germany", carCount: 4 },
  { name: "Skoda", slug: "skoda", logo: BRAND_INITIAL("Skoda", "#4BA82E"), country: "Czech Republic", carCount: 4 },
  { name: "Renault", slug: "renault", logo: BRAND_INITIAL("Renault", "#FFCC00"), country: "France", carCount: 3 },
  { name: "Nissan", slug: "nissan", logo: BRAND_INITIAL("Nissan", "#C3002F"), country: "Japan", carCount: 4 },
  { name: "BMW", slug: "bmw", logo: BRAND_INITIAL("BMW", "#0066B1"), country: "Germany", carCount: 10 },
  { name: "Mercedes-Benz", slug: "mercedes-benz", logo: BRAND_INITIAL("MB", "#333333"), country: "Germany", carCount: 12 },
  { name: "Audi", slug: "audi", logo: BRAND_INITIAL("Audi", "#BB0A30"), country: "Germany", carCount: 8 },
  { name: "Volvo", slug: "volvo", logo: BRAND_INITIAL("Volvo", "#003057"), country: "Sweden", carCount: 5 },
  { name: "Lexus", slug: "lexus", logo: BRAND_INITIAL("Lexus", "#1A1A1A"), country: "Japan", carCount: 6 },
  { name: "BYD", slug: "byd", logo: BRAND_INITIAL("BYD", "#1C1C6B"), country: "China", carCount: 3 },
];

/* ------------------------------------------------------------------ */
/* Category definitions                                                */
/* ------------------------------------------------------------------ */

export const BODY_TYPES: { label: string; type: BodyType; image: string }[] = [
  { label: "SUV", type: "SUV", image: "https://cdn.pixabay.com/photo/2023/01/19/12/45/car-7729238_1280.jpg" },
  { label: "Sedan", type: "Sedan", image: "https://cdn.pixabay.com/photo/2021/12/03/19/40/car-6842029_1280.jpg" },
  { label: "Hatchback", type: "Hatchback", image: "https://cdn.pixabay.com/photo/2022/02/14/02/47/car-7012924_1280.jpg" },
  { label: "MUV", type: "MUV", image: "https://cdn.pixabay.com/photo/2016/09/01/15/06/automobile-1636874_1280.jpg" },
  { label: "Coupe", type: "Coupe", image: "https://cdn.pixabay.com/photo/2021/11/08/00/30/car-6776041_1280.jpg" },
  { label: "Convertible", type: "Convertible", image: "https://cdn.pixabay.com/photo/2016/04/01/12/19/car-1300629_1280.jpg" },
  { label: "Luxury", type: "Luxury", image: "https://cdn.pixabay.com/photo/2022/03/15/03/48/car-7070107_1280.jpg" },
  { label: "Electric", type: "Electric", image: "https://cdn.pixabay.com/photo/2023/10/26/12/49/electric-car-8341537_1280.jpg" },
];

export const PRICE_RANGES = [
  { label: "Under ₹5 Lakh", min: 0, max: 5 },
  { label: "₹5–10 Lakh", min: 5, max: 10 },
  { label: "₹10–20 Lakh", min: 10, max: 20 },
  { label: "₹20–40 Lakh", min: 20, max: 40 },
  { label: "₹40 Lakh+", min: 40, max: Infinity },
];

export const POPULAR_CATEGORIES = [
  "Popular Cars",
  "Latest Cars",
  "Upcoming Cars",
  "Electric Cars",
  "SUVs",
  "Sedans",
  "Hatchbacks",
  "Luxury Cars",
];

/* ------------------------------------------------------------------ */
/* Mock data — clearly labeled as development mock data                */
/* ------------------------------------------------------------------ */

const MOCK_CARS: NewCar[] = [
  {
    id: "hyundai-creta",
    brand: "Hyundai",
    model: "Creta",
    slug: "hyundai-creta",
    tagline: "The Next Gen SUV",
    startingPrice: 1100000,
    priceDisplay: "₹11.00 Lakh*",
    fuel: ["Petrol", "Diesel"],
    bodyType: "SUV",
    transmission: ["Manual", "Automatic", "DCT"],
    engine: "1.5L Turbo GDi Petrol / 1.5L CRDi Diesel",
    power: "160 PS",
    torque: "253 Nm",
    mileage: "17.7 km/l",
    seats: 5,
    rating: 4.5,
    launchDate: "2024-01-16",
    image: "https://cdn.pixabay.com/photo/2023/10/12/12/49/car-8309768_1280.jpg",
    gallery: [],
    isElectric: false,
    evRange: null,
    batteryCapacity: null,
    chargingTime: null,
    dimensions: { length: "4,330 mm", width: "1,790 mm", height: "1,620 mm", wheelbase: "2,610 mm" },
    safety: ["6 Airbags", "ABS with EBD", "ESC", "Hill Assist", "TPMS", "360° Camera"],
    features: ["Panoramic Sunroof", "10.25\" Touchscreen", "Bose Premium Audio", "Wireless Charging", "Ventilated Seats", "ADAS"],
    pros: ["Feature-loaded cabin", "Strong road presence", "Multiple powertrain options"],
    cons: ["Ride quality on broken roads", "Rear seat could be more spacious"],
    variants: [
      { name: "Base", fuel: "Petrol", transmission: "Manual", price: 1100000, engine: "1.5L NA", power: "115 PS", torque: "144 Nm", mileage: "17.7 km/l", seats: 5 },
      { name: "S", fuel: "Petrol", transmission: "Manual", price: 1250000, engine: "1.5L NA", power: "115 PS", torque: "144 Nm", mileage: "17.7 km/l", seats: 5 },
      { name: "SX", fuel: "Petrol", transmission: "Automatic", price: 1450000, engine: "1.5L Turbo", power: "160 PS", torque: "253 Nm", mileage: "18.2 km/l", seats: 5 },
      { name: "SX(O)", fuel: "Petrol", transmission: "DCT", price: 1650000, engine: "1.5L Turbo", power: "160 PS", torque: "253 Nm", mileage: "18.2 km/l", seats: 5 },
      { name: "Base", fuel: "Diesel", transmission: "Manual", price: 1250000, engine: "1.5L CRDi", power: "116 PS", torque: "253 Nm", mileage: "20.8 km/l", seats: 5 },
      { name: "SX(O)", fuel: "Diesel", transmission: "Automatic", price: 1750000, engine: "1.5L CRDi", power: "116 PS", torque: "253 Nm", mileage: "20.8 km/l", seats: 5 },
    ],
    isPopular: true,
    isLatest: true,
    isUpcoming: false,
    source: "mock",
  },
  {
    id: "tata-nexon",
    brand: "Tata",
    model: "Nexon",
    slug: "tata-nexon",
    tagline: "Live the Nex Level",
    startingPrice: 800000,
    priceDisplay: "₹8.00 Lakh*",
    fuel: ["Petrol", "Diesel", "Electric"],
    bodyType: "SUV",
    transmission: ["Manual", "Automatic", "AMT"],
    engine: "1.2L Turbo Revotron Petrol / 1.5L Turbo Revotorq Diesel",
    power: "120 PS",
    torque: "170 Nm",
    mileage: "17.4 km/l",
    seats: 5,
    rating: 4.3,
    launchDate: "2023-09-14",
    image: "https://cdn.pixabay.com/photo/2023/10/12/12/49/car-8309768_1280.jpg",
    gallery: [],
    isElectric: false,
    evRange: "325 km (EV)",
    batteryCapacity: "30.2 kWh (EV)",
    chargingTime: "60 min DC fast (EV)",
    dimensions: { length: "3,993 mm", width: "1,811 mm", height: "1,606 mm", wheelbase: "2,498 mm" },
    safety: ["5-star GNCAP", "6 Airbags", "ABS with EBD", "ESC", "Hill Hold", "TPMS"],
    features: ["10.25\" Touchscreen", "Harman Audio", "Sunroof", "Wireless Charging", "Cruise Control", "Ventilated Seats"],
    pros: ["5-star safety rating", "Good value for money", "Multiple powertrain options"],
    cons: ["Interior quality could be better", "Infotainment can be slow"],
    variants: [
      { name: "Smart", fuel: "Petrol", transmission: "Manual", price: 800000, engine: "1.2L Turbo", power: "120 PS", torque: "170 Nm", mileage: "17.4 km/l", seats: 5 },
      { name: "Pure", fuel: "Petrol", transmission: "AMT", price: 1000000, engine: "1.2L Turbo", power: "120 PS", torque: "170 Nm", mileage: "17.4 km/l", seats: 5 },
      { name: "Creative", fuel: "Petrol", transmission: "Automatic", price: 1200000, engine: "1.2L Turbo", power: "120 PS", torque: "170 Nm", mileage: "17.4 km/l", seats: 5 },
      { name: "Fearless", fuel: "Petrol", transmission: "Automatic", price: 1400000, engine: "1.2L Turbo", power: "120 PS", torque: "170 Nm", mileage: "17.4 km/l", seats: 5 },
    ],
    isPopular: true,
    isLatest: false,
    isUpcoming: false,
    source: "mock",
  },
  {
    id: "mahindra-xuv700",
    brand: "Mahindra",
    model: "XUV700",
    slug: "mahindra-xuv700",
    tagline: "Born Electric",
    startingPrice: 1400000,
    priceDisplay: "₹14.00 Lakh*",
    fuel: ["Petrol", "Diesel"],
    bodyType: "SUV",
    transmission: ["Manual", "Automatic"],
    engine: "2.0L mStallion Turbo Petrol / 2.2L mHawk Diesel",
    power: "200 PS",
    torque: "380 Nm",
    mileage: "16.1 km/l",
    seats: 7,
    rating: 4.4,
    launchDate: "2021-08-30",
    image: "https://cdn.pixabay.com/photo/2023/10/12/12/49/car-8309768_1280.jpg",
    gallery: [],
    isElectric: false,
    evRange: null,
    batteryCapacity: null,
    chargingTime: null,
    dimensions: { length: "4,695 mm", width: "1,890 mm", height: "1,755 mm", wheelbase: "2,750 mm" },
    safety: ["5-star GNCAP", "7 Airbags", "ABS with EBD", "ESC", "ADAS", "360° Camera", "Hill Hold"],
    features: ["Dual 10.25\" Screens", "Sony 3D Audio", "Panoramic Sunroof", "Wireless Charging", "ADAS Level 2", "Captain Seats (6-seater)"],
    pros: ["Feature-loaded", "Spacious 7-seater", "Strong engines"],
    cons: ["Long waiting periods", "Service network in smaller cities"],
    variants: [
      { name: "MX", fuel: "Petrol", transmission: "Manual", price: 1400000, engine: "2.0L Turbo", power: "200 PS", torque: "380 Nm", mileage: "16.1 km/l", seats: 7 },
      { name: "AX3", fuel: "Petrol", transmission: "Manual", price: 1600000, engine: "2.0L Turbo", power: "200 PS", torque: "380 Nm", mileage: "16.1 km/l", seats: 7 },
      { name: "AX5", fuel: "Petrol", transmission: "Automatic", price: 1800000, engine: "2.0L Turbo", power: "200 PS", torque: "380 Nm", mileage: "16.1 km/l", seats: 7 },
      { name: "AX7", fuel: "Diesel", transmission: "Automatic", price: 2200000, engine: "2.2L Diesel", power: "185 PS", torque: "450 Nm", mileage: "16.1 km/l", seats: 7 },
    ],
    isPopular: true,
    isLatest: false,
    isUpcoming: false,
    source: "mock",
  },
  {
    id: "hyundai-creta-n-line",
    brand: "Hyundai",
    model: "Creta N Line",
    slug: "hyundai-creta-n-line",
    tagline: "Sporty by Nature",
    startingPrice: 1650000,
    priceDisplay: "₹16.50 Lakh*",
    fuel: ["Petrol"],
    bodyType: "SUV",
    transmission: ["Manual", "DCT"],
    engine: "1.5L Turbo GDi Petrol",
    power: "160 PS",
    torque: "253 Nm",
    mileage: "17.7 km/l",
    seats: 5,
    rating: null,
    launchDate: "2024-03-11",
    image: "https://cdn.pixabay.com/photo/2023/10/12/12/49/car-8309768_1280.jpg",
    gallery: [],
    isElectric: false,
    evRange: null,
    batteryCapacity: null,
    chargingTime: null,
    dimensions: { length: "4,330 mm", width: "1,790 mm", height: "1,620 mm", wheelbase: "2,610 mm" },
    safety: ["6 Airbags", "ABS with EBD", "ESC", "ADAS"],
    features: ["N Line Sport Seats", "N Line Steering", "Sport Exhaust", "10.25\" Touchscreen", "Bose Audio"],
    pros: ["Sporty design", "Strong turbo engine", "Well-equipped"],
    cons: ["Premium pricing", "Firm ride"],
    variants: [
      { name: "N8", fuel: "Petrol", transmission: "Manual", price: 1650000, engine: "1.5L Turbo", power: "160 PS", torque: "253 Nm", mileage: "17.7 km/l", seats: 5 },
      { name: "N8", fuel: "Petrol", transmission: "DCT", price: 1850000, engine: "1.5L Turbo", power: "160 PS", torque: "253 Nm", mileage: "18.2 km/l", seats: 5 },
      { name: "N10", fuel: "Petrol", transmission: "DCT", price: 2000000, engine: "1.5L Turbo", power: "160 PS", torque: "253 Nm", mileage: "18.2 km/l", seats: 5 },
    ],
    isPopular: false,
    isLatest: true,
    isUpcoming: false,
    source: "mock",
  },
  {
    id: "tata-punch-ev",
    brand: "Tata",
    model: "Punch EV",
    slug: "tata-punch-ev",
    tagline: "Live the EV Life",
    startingPrice: 1100000,
    priceDisplay: "₹11.00 Lakh*",
    fuel: ["Electric"],
    bodyType: "SUV",
    transmission: ["Automatic"],
    engine: "Permanent Magnet Synchronous Motor",
    power: "122 PS",
    torque: "190 Nm",
    mileage: "421 km range",
    seats: 5,
    rating: 4.2,
    launchDate: "2024-01-23",
    image: "https://cdn.pixabay.com/photo/2023/10/26/12/49/electric-car-8341537_1280.jpg",
    gallery: [],
    isElectric: true,
    evRange: "421 km",
    batteryCapacity: "40.5 kWh",
    chargingTime: "50 min DC fast",
    dimensions: { length: "3,857 mm", width: "1,742 mm", height: "1,633 mm", wheelbase: "2,445 mm" },
    safety: ["5-star GNCAP", "6 Airbags", "ABS with EBD", "ESC", "Hill Hold"],
    features: ["10.25\" Touchscreen", "Wireless Android Auto", "Sunroof", "Automatic Climate Control", "Cruise Control"],
    pros: ["Good range", "Compact size for city", "5-star safety"],
    cons: ["Limited boot space", "Charging infra dependent"],
    variants: [
      { name: "Smart", fuel: "Electric", transmission: "Automatic", price: 1100000, engine: "PMSM", power: "82 PS", torque: "114 Nm", mileage: "315 km", seats: 5 },
      { name: "Long Range", fuel: "Electric", transmission: "Automatic", price: 1400000, engine: "PMSM", power: "122 PS", torque: "190 Nm", mileage: "421 km", seats: 5 },
    ],
    isPopular: true,
    isLatest: true,
    isUpcoming: false,
    source: "mock",
  },
  {
    id: "toyota-fortuner",
    brand: "Toyota",
    model: "Fortuner",
    slug: "toyota-fortuner",
    tagline: "Lead the Way",
    startingPrice: 3350000,
    priceDisplay: "₹33.50 Lakh*",
    fuel: ["Diesel"],
    bodyType: "SUV",
    transmission: ["Manual", "Automatic"],
    engine: "2.8L GD Turbo Diesel",
    power: "204 PS",
    torque: "500 Nm",
    mileage: "14.2 km/l",
    seats: 7,
    rating: 4.3,
    launchDate: "2021-01-06",
    image: "https://cdn.pixabay.com/photo/2023/10/12/12/49/car-8309768_1280.jpg",
    gallery: [],
    isElectric: false,
    evRange: null,
    batteryCapacity: null,
    chargingTime: null,
    dimensions: { length: "4,795 mm", width: "1,855 mm", height: "1,835 mm", wheelbase: "2,745 mm" },
    safety: ["7 Airbags", "ABS with EBD", "VSC", "Hill Assist", "TPMS"],
    features: ["8\" Touchscreen", "Bi-LED Projector Headlamps", "Power Tailgate", "Cruise Control", "Dual Zone AC"],
    pros: ["Bulletproof reliability", "Strong resale value", "Powerful engine"],
    cons: ["Expensive", "Heavy steering in city"],
    variants: [
      { name: "Base", fuel: "Diesel", transmission: "Manual", price: 3350000, engine: "2.8L Turbo", power: "204 PS", torque: "500 Nm", mileage: "14.2 km/l", seats: 7 },
      { name: "Legender", fuel: "Diesel", transmission: "Automatic", price: 4300000, engine: "2.8L Turbo", power: "204 PS", torque: "500 Nm", mileage: "14.2 km/l", seats: 7 },
    ],
    isPopular: true,
    isLatest: false,
    isUpcoming: false,
    source: "mock",
  },
  {
    id: "maruti-swift",
    brand: "Maruti Suzuki",
    model: "Swift",
    slug: "maruti-swift",
    tagline: "Live the Swift Life",
    startingPrice: 600000,
    priceDisplay: "₹6.00 Lakh*",
    fuel: ["Petrol", "CNG"],
    bodyType: "Hatchback",
    transmission: ["Manual", "Automatic"],
    engine: "1.2L DualJet VVT Petrol",
    power: "82 PS",
    torque: "112 Nm",
    mileage: "25.5 km/l",
    seats: 5,
    rating: 4.2,
    launchDate: "2024-05-09",
    image: "https://cdn.pixabay.com/photo/2022/02/14/02/47/car-7012924_1280.jpg",
    gallery: [],
    isElectric: false,
    evRange: null,
    batteryCapacity: null,
    chargingTime: null,
    dimensions: { length: "3,840 mm", width: "1,735 mm", height: "1,530 mm", wheelbase: "2,450 mm" },
    safety: ["6 Airbags", "ABS with EBD", "ESP", "Hill Hold", "TPMS"],
    features: ["9\" Touchscreen", "SmartPlay Pro+", "Cruise Control", "Automatic Climate Control", "Keyless Entry"],
    pros: ["Excellent fuel economy", "Fun to drive", "Low maintenance"],
    cons: ["Basic interior", "Small boot"],
    variants: [
      { name: "LXi", fuel: "Petrol", transmission: "Manual", price: 600000, engine: "1.2L", power: "82 PS", torque: "112 Nm", mileage: "25.5 km/l", seats: 5 },
      { name: "VXi", fuel: "Petrol", transmission: "Manual", price: 750000, engine: "1.2L", power: "82 PS", torque: "112 Nm", mileage: "25.5 km/l", seats: 5 },
      { name: "ZXi", fuel: "Petrol", transmission: "Automatic", price: 900000, engine: "1.2L", power: "82 PS", torque: "112 Nm", mileage: "25.5 km/l", seats: 5 },
      { name: "ZXi+", fuel: "Petrol", transmission: "Automatic", price: 1000000, engine: "1.2L", power: "82 PS", torque: "112 Nm", mileage: "25.5 km/l", seats: 5 },
    ],
    isPopular: true,
    isLatest: true,
    isUpcoming: false,
    source: "mock",
  },
  {
    id: "kia-seltos",
    brand: "Kia",
    model: "Seltos",
    slug: "kia-seltos",
    tagline: "Mean Metal Machine",
    startingPrice: 1090000,
    priceDisplay: "₹10.90 Lakh*",
    fuel: ["Petrol", "Diesel"],
    bodyType: "SUV",
    transmission: ["Manual", "Automatic", "DCT", "iMT"],
    engine: "1.5L Turbo GDi Petrol / 1.5L CRDi Diesel",
    power: "160 PS",
    torque: "253 Nm",
    mileage: "17.7 km/l",
    seats: 5,
    rating: 4.4,
    launchDate: "2023-07-04",
    image: "https://cdn.pixabay.com/photo/2023/10/12/12/49/car-8309768_1280.jpg",
    gallery: [],
    isElectric: false,
    evRange: null,
    batteryCapacity: null,
    chargingTime: null,
    dimensions: { length: "4,365 mm", width: "1,800 mm", height: "1,620 mm", wheelbase: "2,610 mm" },
    safety: ["6 Airbags", "ABS with EBD", "ESC", "Hill Assist", "ADAS Level 2", "360° Camera"],
    features: ["10.25\" Dual Screen", "Bose Premium Audio", "Sunroof", "Ventilated Seats", "Wireless Charging", "ADAS"],
    pros: ["Feature-rich", "Multiple powertrain options", "Comfortable ride"],
    cons: ["Prices have increased", "Turbo engine refinement"],
    variants: [
      { name: "HTK", fuel: "Petrol", transmission: "Manual", price: 1090000, engine: "1.5L NA", power: "115 PS", torque: "144 Nm", mileage: "17.7 km/l", seats: 5 },
      { name: "HTK+", fuel: "Petrol", transmission: "iMT", price: 1300000, engine: "1.5L Turbo", power: "160 PS", torque: "253 Nm", mileage: "17.7 km/l", seats: 5 },
      { name: "GTX+", fuel: "Petrol", transmission: "DCT", price: 1600000, engine: "1.5L Turbo", power: "160 PS", torque: "253 Nm", mileage: "18.2 km/l", seats: 5 },
      { name: "X-Line", fuel: "Petrol", transmission: "DCT", price: 1800000, engine: "1.5L Turbo", power: "160 PS", torque: "253 Nm", mileage: "18.2 km/l", seats: 5 },
    ],
    isPopular: true,
    isLatest: false,
    isUpcoming: false,
    source: "mock",
  },
  {
    id: "mg-zs-ev",
    brand: "MG",
    model: "ZS EV",
    slug: "mg-zs-ev",
    tagline: "Switch to Electric",
    startingPrice: 1890000,
    priceDisplay: "₹18.90 Lakh*",
    fuel: ["Electric"],
    bodyType: "SUV",
    transmission: ["Automatic"],
    engine: "Permanent Magnet Synchronous Motor",
    power: "177 PS",
    torque: "280 Nm",
    mileage: "461 km range",
    seats: 5,
    rating: 4.1,
    launchDate: "2024-02-05",
    image: "https://cdn.pixabay.com/photo/2023/10/26/12/49/electric-car-8341537_1280.jpg",
    gallery: [],
    isElectric: true,
    evRange: "461 km",
    batteryCapacity: "50.3 kWh",
    chargingTime: "60 min DC fast",
    dimensions: { length: "4,323 mm", width: "1,809 mm", height: "1,620 mm", wheelbase: "2,581 mm" },
    safety: ["5-star Euro NCAP", "6 Airbags", "ABS with EBD", "ESC", "360° Camera", "ADAS"],
    features: ["10.1\" Touchscreen", "Panoramic Sunroof", "Wireless Charging", "ADAS", "i-Smart Connected"],
    pros: ["Good range", "Loaded with features", "Spacious"],
    cons: ["Premium pricing", "Charging network growing"],
    variants: [
      { name: "Executive", fuel: "Electric", transmission: "Automatic", price: 1890000, engine: "PMSM", power: "177 PS", torque: "280 Nm", mileage: "461 km", seats: 5 },
      { name: "Exclusive", fuel: "Electric", transmission: "Automatic", price: 2150000, engine: "PMSM", power: "177 PS", torque: "280 Nm", mileage: "461 km", seats: 5 },
    ],
    isPopular: false,
    isLatest: true,
    isUpcoming: false,
    source: "mock",
  },
  {
    id: "maruti-breza",
    brand: "Maruti Suzuki",
    model: "Brezza",
    slug: "maruti-breza",
    tagline: "Live the Bold",
    startingPrice: 830000,
    priceDisplay: "₹8.30 Lakh*",
    fuel: ["Petrol", "CNG"],
    bodyType: "SUV",
    transmission: ["Manual", "Automatic"],
    engine: "1.5L K15C Dual Jet Petrol",
    power: "103 PS",
    torque: "137 Nm",
    mileage: "19.8 km/l",
    seats: 5,
    rating: 4.0,
    launchDate: "2022-06-30",
    image: "https://cdn.pixabay.com/photo/2023/10/12/12/49/car-8309768_1280.jpg",
    gallery: [],
    isElectric: false,
    evRange: null,
    batteryCapacity: null,
    chargingTime: null,
    dimensions: { length: "3,995 mm", width: "1,790 mm", height: "1,685 mm", wheelbase: "2,500 mm" },
    safety: ["6 Airbags", "ABS with EBD", "ESP", "Hill Hold", "360° Camera"],
    features: ["9\" Touchscreen", "Head-Up Display", "Sunroof", "Cruise Control", "Automatic AC"],
    pros: ["Sunroof at this price", "Good mileage", "Reliable Maruti service"],
    cons: ["Only petrol engine", "Basic rear seat"],
    variants: [
      { name: "LXi", fuel: "Petrol", transmission: "Manual", price: 830000, engine: "1.5L", power: "103 PS", torque: "137 Nm", mileage: "19.8 km/l", seats: 5 },
      { name: "ZXi", fuel: "Petrol", transmission: "Automatic", price: 1050000, engine: "1.5L", power: "103 PS", torque: "137 Nm", mileage: "19.8 km/l", seats: 5 },
      { name: "ZXi+", fuel: "Petrol", transmission: "Automatic", price: 1250000, engine: "1.5L", power: "103 PS", torque: "137 Nm", mileage: "19.8 km/l", seats: 5 },
    ],
    isPopular: true,
    isLatest: false,
    isUpcoming: false,
    source: "mock",
  },
  {
    id: "honda-amaze",
    brand: "Honda",
    model: "Amaze",
    slug: "honda-amaze",
    tagline: "The Big Move",
    startingPrice: 700000,
    priceDisplay: "₹7.00 Lakh*",
    fuel: ["Petrol", "Diesel"],
    bodyType: "Sedan",
    transmission: ["Manual", "Automatic"],
    engine: "1.2L i-VTEC Petrol / 1.5L i-DTEC Diesel",
    power: "90 PS",
    torque: "110 Nm",
    mileage: "18.3 km/l",
    seats: 5,
    rating: 3.9,
    launchDate: "2024-11-04",
    image: "https://cdn.pixabay.com/photo/2021/12/03/19/40/car-6842029_1280.jpg",
    gallery: [],
    isElectric: false,
    evRange: null,
    batteryCapacity: null,
    chargingTime: null,
    dimensions: { length: "3,995 mm", width: "1,695 mm", height: "1,501 mm", wheelbase: "2,470 mm" },
    safety: ["6 Airbags", "ABS with EBD", "ESC", "TPMS", "Rear Camera"],
    features: ["8\" Touchscreen", "Honda Connect", "Cruise Control", "Automatic AC", "Keyless Entry"],
    pros: ["Reliable Honda engine", "Spacious cabin", "Good ride quality"],
    cons: ["Basic features list", "Slow sales"],
    variants: [
      { name: "E", fuel: "Petrol", transmission: "Manual", price: 700000, engine: "1.2L", power: "90 PS", torque: "110 Nm", mileage: "18.3 km/l", seats: 5 },
      { name: "V", fuel: "Petrol", transmission: "CVT", price: 900000, engine: "1.2L", power: "90 PS", torque: "110 Nm", mileage: "18.3 km/l", seats: 5 },
      { name: "VX", fuel: "Petrol", transmission: "CVT", price: 1050000, engine: "1.2L", power: "90 PS", torque: "110 Nm", mileage: "18.3 km/l", seats: 5 },
    ],
    isPopular: false,
    isLatest: true,
    isUpcoming: false,
    source: "mock",
  },
  {
    id: "volkswagen-tiguan",
    brand: "Volkswagen",
    model: "Tiguan",
    slug: "volkswagen-tiguan",
    tagline: "German Engineering",
    startingPrice: 3400000,
    priceDisplay: "₹34.00 Lakh*",
    fuel: ["Petrol"],
    bodyType: "SUV",
    transmission: ["Automatic"],
    engine: "2.0L TSI Turbo Petrol",
    power: "190 PS",
    torque: "320 Nm",
    mileage: "13.5 km/l",
    seats: 5,
    rating: 4.3,
    launchDate: "2024-11-05",
    image: "https://cdn.pixabay.com/photo/2023/10/12/12/49/car-8309768_1280.jpg",
    gallery: [],
    isElectric: false,
    evRange: null,
    batteryCapacity: null,
    chargingTime: null,
    dimensions: { length: "4,381 mm", width: "1,839 mm", height: "1,646 mm", wheelbase: "2,631 mm" },
    safety: ["6 Airbags", "ABS with EBD", "ESC", "Hill Descent", "TPMS", "Park Assist"],
    features: ["Digital Cockpit", "8\" Touchscreen", "Panoramic Sunroof", "30-color Ambient Lighting", "4MOTION AWD"],
    pros: ["Solid build quality", "Powerful TSI engine", "Premium interior"],
    cons: ["Expensive", "Parts cost"],
    variants: [
      { name: "Comfortline", fuel: "Petrol", transmission: "Automatic", price: 3400000, engine: "2.0L TSI", power: "190 PS", torque: "320 Nm", mileage: "13.5 km/l", seats: 5 },
      { name: "Highline", fuel: "Petrol", transmission: "Automatic", price: 3800000, engine: "2.0L TSI", power: "190 PS", torque: "320 Nm", mileage: "13.5 km/l", seats: 5 },
    ],
    isPopular: false,
    isLatest: true,
    isUpcoming: false,
    source: "mock",
  },
];

/* ------------------------------------------------------------------ */
/* Car service — replaceable mock provider                             */
/* ------------------------------------------------------------------ */

function getCars(): NewCar[] {
  return MOCK_CARS;
}

function getCarBySlug(slug: string): NewCar | undefined {
  return MOCK_CARS.find((c) => c.slug === slug);
}

function getBrandCars(brandSlug: string): NewCar[] {
  const brand = BRANDS.find((b) => b.slug === brandSlug);
  if (!brand) return [];
  return MOCK_CARS.filter((c) => c.brand === brand.name);
}

function filterCars(cars: NewCar[], filters: CarFilters): NewCar[] {
  let result = [...cars];

  // Search
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (c) =>
        c.brand.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        c.slug.includes(q)
    );
  }

  // Brand
  if (filters.brand.length > 0) {
    result = result.filter((c) => filters.brand.includes(c.brand));
  }

  // Fuel
  if (filters.fuel.length > 0) {
    result = result.filter((c) => c.fuel.some((f) => filters.fuel.includes(f)));
  }

  // Body type
  if (filters.bodyType.length > 0) {
    result = result.filter((c) => filters.bodyType.includes(c.bodyType));
  }

  // Transmission
  if (filters.transmission.length > 0) {
    result = result.filter((c) => c.transmission.some((t) => filters.transmission.includes(t)));
  }

  // Price
  if (filters.priceMin > 0) {
    result = result.filter((c) => c.startingPrice >= filters.priceMin);
  }
  if (filters.priceMax < Infinity) {
    result = result.filter((c) => c.startingPrice <= filters.priceMax);
  }

  // Seats
  if (filters.seats.length > 0) {
    result = result.filter((c) => filters.seats.includes(c.seats));
  }

  // Electric
  if (filters.electric) {
    result = result.filter((c) => c.isElectric);
  }

  // Sort
  switch (filters.sort) {
    case "price-low":
      result.sort((a, b) => a.startingPrice - b.startingPrice);
      break;
    case "price-high":
      result.sort((a, b) => b.startingPrice - a.startingPrice);
      break;
    case "newest":
      result.sort((a, b) => {
        const da = a.launchDate ? new Date(a.launchDate).getTime() : 0;
        const db = b.launchDate ? new Date(b.launchDate).getTime() : 0;
        return db - da;
      });
      break;
    case "popular":
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    default:
      // recommended — popular first
      result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
  }

  return result;
}

export const carService = {
  getAll: getCars,
  getBySlug: getCarBySlug,
  getByBrand: getBrandCars,
  filter: filterCars,
  getPopular: () => MOCK_CARS.filter((c) => c.isPopular),
  getLatest: () => MOCK_CARS.filter((c) => c.isLatest),
  getUpcoming: () => MOCK_CARS.filter((c) => c.isUpcoming),
  getElectric: () => MOCK_CARS.filter((c) => c.isElectric),
  getByBodyType: (type: BodyType) => MOCK_CARS.filter((c) => c.bodyType === type),
  getByPriceRange: (min: number, max: number) =>
    MOCK_CARS.filter((c) => c.startingPrice >= min && c.startingPrice <= max),
  search: (q: string) => {
    const lower = q.toLowerCase();
    return MOCK_CARS.filter(
      (c) =>
        c.brand.toLowerCase().includes(lower) ||
        c.model.toLowerCase().includes(lower)
    );
  },
};

export { MOCK_CARS };
