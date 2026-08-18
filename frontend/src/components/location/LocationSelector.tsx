import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { LOCATION_OPTIONS } from "@/lib/locations";
import { LocationCard } from "./LocationCard";
import { LocationSearch } from "./LocationSearch";

interface LocationSelectorProps {
  open: boolean;
  /** Currently selected location label, e.g. "Rajasthan". */
  selected: string;
  onSelect: (label: string) => void;
  onClose: () => void;
}

/**
 * Premium location selector. Opens a large centered modal over a blurred page:
 * a dark navy translucent overlay with backdrop blur, a sharp white modal with
 * searchable landmark cards for every state and union territory. Only the modal
 * content scrolls; the page behind is locked.
 */
export function LocationSelector({ open, selected, onSelect, onClose }: LocationSelectorProps) {
  const [query, setQuery] = useState("");

  // Reset the search each time the modal opens.
  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Lock background scrolling while the modal is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LOCATION_OPTIONS;
    return LOCATION_OPTIONS.filter(
      (loc) =>
        loc.label.toLowerCase().includes(q) ||
        loc.landmark.toLowerCase().includes(q) ||
        loc.code.toLowerCase().includes(q)
    );
  }, [query]);

  const states = filtered.filter((loc) => loc.group === "state");
  const unionTerritories = filtered.filter((loc) => loc.group === "ut");
  const hasResults = filtered.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Choose your location"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Blurred overlay — the whole page stays visible but blurred behind it */}
          <motion.button
            type="button"
            aria-label="Close location selector"
            tabIndex={-1}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-[#14283D]/35"
          />

          {/* Modal panel — always sharp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 flex max-h-[88vh] w-[92vw] max-w-[1400px] flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-2xl"
          >
            <span className="block h-0.5 w-full bg-primary" aria-hidden />

            {/* Sticky header with title + search */}
            <div className="shrink-0 border-b border-[#E5E7EB] px-5 pb-4 pt-5 sm:px-8 sm:pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-[#18212B] sm:text-2xl">
                    <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span className="truncate">Choose Your Location</span>
                  </h2>
                  <p className="mt-1 text-sm text-[#18212B]/60">
                    Select a state or union territory to continue
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close location selector"
                  className="shrink-0 rounded-full p-2 text-[#18212B]/50 transition-colors hover:bg-[#14283D]/5 hover:text-[#18212B]"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <LocationSearch value={query} onChange={setQuery} className="mt-4" />
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto overscroll-contain px-5 py-5 sm:px-8">
              {!hasResults ? (
                <div className="flex flex-col items-center justify-center gap-1.5 py-20 text-center">
                  <p className="text-sm font-semibold text-[#18212B]">No location found</p>
                  <p className="text-xs text-[#18212B]/50">
                    Try a different state or union territory name.
                  </p>
                </div>
              ) : (
                <>
                  {states.length > 0 && (
                    <section>
                      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#18212B]/50">
                        States
                      </h3>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                        {states.map((loc) => (
                          <LocationCard
                            key={loc.code}
                            location={loc}
                            selected={selected === loc.label}
                            onSelect={onSelect}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                  {unionTerritories.length > 0 && (
                    <section className="mt-7">
                      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#18212B]/50">
                        Union Territories
                      </h3>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                        {unionTerritories.map((loc) => (
                          <LocationCard
                            key={loc.code}
                            location={loc}
                            selected={selected === loc.label}
                            onSelect={onSelect}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
