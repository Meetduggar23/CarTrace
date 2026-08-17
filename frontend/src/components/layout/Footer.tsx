import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { SITE } from "@/lib/constants";

const COLUMNS: { heading: string; links: { to: string; label: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { to: "/vehicle", label: "Vehicle Lookup" },
      { to: "/vin-decoder", label: "VIN Decoder" },
      { to: "/rto", label: "RTO Directory" },
      { to: "/compare", label: "Compare" },
      { to: "/providers", label: "Data Providers" },
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
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex flex-col items-start gap-3">
              <Link to="/" aria-label={`${SITE.name} home`}>
                <Logo size="md" />
              </Link>
              <span className="text-[11px] font-medium tracking-wide text-muted-foreground">
                {SITE.tagline}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Check vehicle specifications, registration information and available
              vehicle records in one place.
            </p>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              Data powered by supported third-party/public APIs.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-sm font-semibold">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {SITE.name} is an independent vehicle-information platform. It is not an
            RTO authority and is not affiliated with CarInfo or any government body.
            Vehicle information depends on the selected data provider and regional
            availability; always verify records independently before making financial
            or legal decisions.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. All vehicle data belongs to its
            respective sources.
          </p>
        </div>
      </div>
    </footer>
  );
}
