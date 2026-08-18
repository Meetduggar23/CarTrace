import { Link } from "react-router-dom";
import { Logo } from "@/components/common/Logo";
import { SITE, TAGLINES } from "@/lib/constants";

const COLUMNS: { heading: string; links: { to: string; label: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { to: "/vehicle", label: "RC Details" },
      { to: "/challan", label: "Challan Search" },
      { to: "/car-insurance", label: "Car Insurance" },
      { to: "/bike-insurance", label: "Bike Insurance" },
      { to: "/service-history", label: "Service History" },
      { to: "/new-cars", label: "New Cars" },
      { to: "/used-cars", label: "Used Cars" },
      { to: "/fastag", label: "FASTag" },
      { to: "/rto", label: "RTO Directory" },
      { to: "/compare", label: "Compare" },
      { to: "/providers", label: "Data Providers" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { to: "/vehicle", label: "Vehicle Lookup" },
      { to: "/vin-decoder", label: "VIN Decoder" },
      { to: "/saved", label: "Saved Vehicles" },
      { to: "/history", label: "Search History" },
      { to: "/contact", label: "Contact Us" },
      { to: "/help", label: "Help" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { to: "/privacy", label: "Privacy" },
      { to: "/terms", label: "Terms" },
      { to: "/about", label: "About & Disclaimer" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--on-dark)/0.12)] bg-[hsl(var(--surface-dark))] text-[hsl(var(--on-dark))]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex flex-col items-start gap-3">
              <Link to="/" aria-label={`${SITE.name} home`}>
                <Logo size="md" />
              </Link>
              <span className="text-[11px] font-medium tracking-wide text-[hsl(var(--on-dark-soft))]">
                {TAGLINES.trace}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-[hsl(var(--on-dark-soft))]">
              Check vehicle specifications, registration information and available
              vehicle records in one place.
            </p>

          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-sm font-semibold text-[hsl(var(--on-dark))]">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-[hsl(var(--on-dark-soft))] transition-colors hover:text-[hsl(var(--on-dark))]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 border-t border-[hsl(var(--on-dark)/0.12)] pt-6">
          <p className="text-center text-xs leading-relaxed text-[hsl(var(--on-dark-soft))]">
            All rights reserved by CarTrace 2025 Made By Duggar Pvt Ltd
          </p>
        </div>
      </div>
    </footer>
  );
}
