import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, RotateCcw } from "lucide-react";
import type { CarFilters as CarFiltersType, FuelType, BodyType, TransmissionType } from "@/lib/cars";
import { BRANDS, PRICE_RANGES } from "@/lib/cars";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CarFiltersPanelProps {
  filters: CarFiltersType;
  onChange: (filters: CarFiltersType) => void;
  totalResults: number;
}

const FUEL_OPTIONS: FuelType[] = ["Petrol", "Diesel", "Electric", "CNG", "Hybrid"];
const BODY_OPTIONS: BodyType[] = ["SUV", "Sedan", "Hatchback", "MUV", "Coupe", "Convertible", "Luxury"];
const TRANSMISSION_OPTIONS: TransmissionType[] = ["Manual", "Automatic", "CVT", "DCT", "AMT"];
const SEATING_OPTIONS = [5, 6, 7, 8];

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border/50 pb-4">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h4>
      {children}
    </div>
  );
}

function CheckboxPill({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200",
        checked
          ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
          : "border-border bg-card text-muted-foreground hover:border-border hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

function FilterContent({ filters, onChange }: { filters: CarFiltersType; onChange: (f: CarFiltersType) => void }) {
  function toggleArray<K extends keyof Pick<CarFiltersType, "brand" | "fuel" | "bodyType" | "transmission" | "seats">>(
    key: K,
    value: CarFiltersType[K][number]
  ) {
    const current = filters[key] as (typeof value)[];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  }

  return (
    <div className="space-y-5">
      {/* Brand */}
      <FilterSection title="Brand">
        <div className="flex flex-wrap gap-1.5">
          {BRANDS.map((b) => (
            <CheckboxPill
              key={b.slug}
              label={b.name}
              checked={filters.brand.includes(b.name)}
              onChange={() => toggleArray("brand", b.name)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Budget">
        <div className="flex flex-wrap gap-1.5">
          {PRICE_RANGES.map((r) => {
            const active = filters.priceMin === r.min && filters.priceMax === r.max;
            return (
              <button
                key={r.label}
                type="button"
                onClick={() =>
                  active
                    ? onChange({ ...filters, priceMin: 0, priceMax: Infinity })
                    : onChange({ ...filters, priceMin: r.min, priceMax: r.max })
                }
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200",
                  active
                    ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Fuel */}
      <FilterSection title="Fuel Type">
        <div className="flex flex-wrap gap-1.5">
          {FUEL_OPTIONS.map((f) => (
            <CheckboxPill
              key={f}
              label={f}
              checked={filters.fuel.includes(f)}
              onChange={() => toggleArray("fuel", f)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Body Type */}
      <FilterSection title="Body Type">
        <div className="flex flex-wrap gap-1.5">
          {BODY_OPTIONS.map((b) => (
            <CheckboxPill
              key={b}
              label={b}
              checked={filters.bodyType.includes(b)}
              onChange={() => toggleArray("bodyType", b)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Transmission */}
      <FilterSection title="Transmission">
        <div className="flex flex-wrap gap-1.5">
          {TRANSMISSION_OPTIONS.map((t) => (
            <CheckboxPill
              key={t}
              label={t}
              checked={filters.transmission.includes(t)}
              onChange={() => toggleArray("transmission", t)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Seating */}
      <FilterSection title="Seating Capacity">
        <div className="flex gap-1.5">
          {SEATING_OPTIONS.map((s) => (
            <CheckboxPill
              key={s}
              label={`${s}+`}
              checked={filters.seats.includes(s)}
              onChange={() => toggleArray("seats", s)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Electric toggle */}
      <FilterSection title="Electric Only">
        <button
          type="button"
          onClick={() => onChange({ ...filters, electric: !filters.electric })}
          className={cn(
            "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all",
            filters.electric
              ? "border-success bg-success/10 text-success"
              : "border-border bg-card text-muted-foreground hover:text-foreground"
          )}
        >
          <span
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-full border",
              filters.electric ? "border-success bg-success text-white" : "border-border"
            )}
          >
            {filters.electric && <span className="h-2 w-2 rounded-full bg-white" />}
          </span>
          Show only electric cars
        </button>
      </FilterSection>
    </div>
  );
}

function computeActiveCount(filters: CarFiltersType): number {
  return (
    filters.brand.length +
    filters.fuel.length +
    filters.bodyType.length +
    filters.transmission.length +
    filters.seats.length +
    (filters.electric ? 1 : 0) +
    (filters.priceMin > 0 || filters.priceMax < Infinity ? 1 : 0)
  );
}

function clearFilters(filters: CarFiltersType, onChange: (f: CarFiltersType) => void) {
  onChange({
    brand: [],
    fuel: [],
    bodyType: [],
    transmission: [],
    priceMin: 0,
    priceMax: Infinity,
    seats: [],
    electric: false,
    search: filters.search,
    sort: filters.sort,
  });
}

export function CarFiltersPanel({ filters, onChange, totalResults }: CarFiltersPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCount = computeActiveCount(filters);

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <p className="text-sm font-medium text-muted-foreground">
          {totalResults} car{totalResults !== 1 ? "s" : ""} found
        </p>
        <Button variant="outline" size="sm" onClick={() => setMobileOpen(true)}>
          <SlidersHorizontal className="h-4 w-4" /> Filters
          {activeCount > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </Button>
      </div>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-black/40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[95] max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">Filters</h3>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterContent filters={filters} onChange={onChange} />
              <div className="mt-6 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => clearFilters(filters, onChange)}>
                  Clear all
                </Button>
                <Button className="flex-1" onClick={() => setMobileOpen(false)}>
                  Show {totalResults} cars
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function CarFiltersSidebar({ filters, onChange, totalResults }: CarFiltersPanelProps) {
  const activeCount = computeActiveCount(filters);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">Filters</h3>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => clearFilters(filters, onChange)}
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <RotateCcw className="h-3 w-3" /> Clear all
            </button>
          )}
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          {totalResults} car{totalResults !== 1 ? "s" : ""} found
        </p>
        <FilterContent filters={filters} onChange={onChange} />
      </div>
    </aside>
  );
}
