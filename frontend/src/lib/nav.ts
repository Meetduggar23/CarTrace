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

export const RC_DETAILS: NavDropdownItem[] = [
  { label: "Vehicle Registration", to: "/vehicle", description: "Check details by registration number" },
  { label: "VIN Decoder", to: "/vin-decoder", description: "Decode a 17-character VIN" },
  { label: "RTO Information", to: "/rto", description: "RTO codes, offices & cities" },
  { label: "Challan Search", to: "/challan", description: "Check traffic challans" },
];

export const BUY_CAR: NavDropdownItem[] = [
  { label: "New Cars", to: "/new-cars", description: "Explore brand-new vehicles" },
  { label: "Used Cars", to: "/used-cars", description: "Browse pre-owned vehicles" },
  { label: "Compare Cars", to: "/compare", description: "Compare vehicles side-by-side" },
];

export const NEW_CAR_MENU: NavDropdownItem[] = [
  { label: "Latest Cars", to: "/new-cars", description: "Newest arrivals" },
  { label: "Car Specifications", to: "/vehicle", description: "Detailed vehicle specifications" },
];

export const INSURANCE: NavDropdownItem[] = [
  { label: "Car Insurance", to: "/car-insurance", description: "Cover for your car" },
  { label: "Bike Insurance", to: "/bike-insurance", description: "Cover for your two-wheeler" },
  { label: "Insurance Status", to: "/vehicle", description: "Check policy status & validity" },
];

export const MORE: NavDropdownItem[] = [
  { label: "FASTag", to: "/fastag", description: "Toll payments & FASTag info" },
  { label: "Service History", to: "/service-history", description: "Track vehicle service records" },
  { label: "Saved Vehicles", to: "/saved", description: "Your saved vehicles" },
  { label: "Search History", to: "/history", description: "Recent lookups" },
  { label: "About", to: "/about", description: "About & disclaimer" },
];

export const LOCATION_STORAGE_KEY = "cartrace-location";
