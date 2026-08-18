import {
  Bike,
  CarFront,
  CreditCard,
  FileCheck2,
  Gavel,
  ShieldCheck,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/** Second-level feature navigation shown below the main navbar. */
export interface NavFeature {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const FEATURES: NavFeature[] = [
  { label: "RC Details", href: "/vehicle", icon: FileCheck2 },
  { label: "Challan Search", href: "/challan", icon: Gavel },
  { label: "Car Insurance", href: "/car-insurance", icon: ShieldCheck },
  { label: "Bike Insurance", href: "/bike-insurance", icon: Bike },
  { label: "Service History", href: "/service-history", icon: Wrench },
  { label: "New Car", href: "/new-cars", icon: Sparkles },
  { label: "Used Car", href: "/used-cars", icon: CarFront },
  { label: "FASTag", href: "/fastag", icon: CreditCard },
];

/** Items inside a top-level dropdown. */
export interface NavDropdownItem {
  label: string;
  to: string;
  description?: string;
}

export const VEHICLE_INFO: NavDropdownItem[] = [
  { label: "RC Details", to: "/vehicle", description: "Registration details by number plate" },
  { label: "Challan Search", to: "/challan", description: "Check traffic challans" },
  { label: "Vehicle Specifications", to: "/vehicle", description: "Make, model, engine & specs" },
  { label: "VIN Decoder", to: "/vin-decoder", description: "Decode a 17-character VIN" },
  { label: "RTO Information", to: "/rto", description: "RTO codes, offices & cities" },
  { label: "Service History", to: "/service-history", description: "Track vehicle service records" },
];

export const BUY_CAR: NavDropdownItem[] = [
  { label: "New Cars", to: "/new-cars", description: "Explore brand-new vehicles" },
  { label: "Used Cars", to: "/used-cars", description: "Browse pre-owned vehicles" },
  { label: "Compare Cars", to: "/compare", description: "Compare vehicles side-by-side" },
  { label: "Car Specifications", to: "/vehicle", description: "Detailed vehicle specifications" },
];

export const INSURANCE: NavDropdownItem[] = [
  { label: "Car Insurance", to: "/car-insurance", description: "Cover for your car" },
  { label: "Bike Insurance", to: "/bike-insurance", description: "Cover for your two-wheeler" },
  { label: "Insurance Status", to: "/vehicle", description: "Check policy status & validity" },
  { label: "Insurance Expiry", to: "/vehicle", description: "Know when cover runs out" },
];

export const MORE: NavDropdownItem[] = [
  { label: "FASTag", to: "/fastag", description: "Toll payments & FASTag info" },
  { label: "RTO Directory", to: "/rto", description: "Browse all RTO offices" },
  { label: "Saved Vehicles", to: "/saved", description: "Your saved vehicles" },
  { label: "Search History", to: "/history", description: "Recent lookups" },
  { label: "About", to: "/about", description: "About & disclaimer" },
  { label: "Contact", to: "/contact", description: "Get in touch" },
  { label: "Help", to: "/help", description: "Frequently asked questions" },
];

/** Locations offered by the navbar location selector. */
export const LOCATIONS: { label: string; code: string }[] = [
  { label: "India", code: "IN" },
  { label: "Delhi", code: "DL" },
  { label: "Mumbai", code: "MH" },
  { label: "Bengaluru", code: "KA" },
  { label: "Pune", code: "MH-PN" },
  { label: "Chennai", code: "TN" },
  { label: "Hyderabad", code: "TS" },
  { label: "Kolkata", code: "WB" },
  { label: "Ahmedabad", code: "GJ" },
  { label: "Jaipur", code: "RJ" },
];

export const LOCATION_STORAGE_KEY = "cartrace-location";
