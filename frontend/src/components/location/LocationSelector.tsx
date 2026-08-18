import { useEffect, useMemo, useRef, useState } from "react";
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
 * Premium automotive-glass location selector. Opens a large centered glass
 * panel over a dark navy, heavily blurred page: translucent white glass with
 * a gold edge, an ambient navy/gold glow, a sticky header + search bar, and
 * searchable landmark cards for every state and union territory. Only the
 * modal content scrolls; the page behind is locked.
 */
export function LocationSelector({ open, selected, onSelect, onClose }: LocationSelectorProps) {
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Reset the search each time the modal opens.
  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  // Move focus into the modal on open, restore it on close.
  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => dialogRef.current?.focus());
    return () => {
      cancelAnimationFrame(frame);
      previouslyFocusedRef.current?.focus?.();
      previouslyFocusedRef.current = null;
    };
  }, [open]);

  // Close on Escape and trap focus inside the modal while it is open.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = dialogRef.current.contains(active);
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Choose your location"
          tabIndex={-1}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 outline-none sm:p-6"
        >
          {/* Dark navy overlay — the whole page stays visible but blurred behind it */}
          <motion.button
            type="button"
            aria-label="Close location selector"
            tabIndex={-1}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-[rgba(8,21,34,0.65)]"
          />

          {/* Subtle navy/gold ambient glow pooled behind the glass panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(212,175,55,0.14),rgba(20,40,61,0.28)_48%,transparent_72%)] blur-2xl"
          />

          {/* Glass panel — always sharp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              backdropFilter: "blur(24px) saturate(140%)",
              WebkitBackdropFilter: "blur(24px) saturate(140%)",
            }}
            className="relative z-10 flex max-h-[90vh] w-[92vw] max-w-[1400px] flex-col overflow-hidden rounded-[30px] border border-white/60 bg-[rgba(255,255,255,0.78)] shadow-[0_0_0_1px_rgba(212,175,55,0.35),0_30px_80px_rgba(0,0,0,0.25)]"
          >
            {/* Thin gold hairline along the top edge */}
            <span
              className="block h-px w-full bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.7)] to-transparent"
              aria-hidden
            />

            {/* Sticky header with title + search */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.25, ease: "easeOut" }}
              className="shrink-0 border-b border-[#14283D]/10 px-5 pb-4 pt-5 sm:px-8 sm:pt-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-wide text-[#14283D] sm:text-2xl">
                    <MapPin className="h-5 w-5 shrink-0 text-[#D4AF37]" aria-hidden />
                    <span className="truncate">Choose Your Location</span>
                  </h2>
                  <p className="mt-1 text-sm text-[#667085]">
                    Select a state or union territory to continue
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close location selector"
                  className="shrink-0 rounded-full p-2 text-[#14283D]/50 transition-all duration-300 hover:bg-white/40 hover:text-[#14283D] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.65)]"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <LocationSearch value={query} onChange={setQuery} className="mt-4" />
            </motion.div>

            {/* Scrollable content */}
            <div className="overflow-y-auto overscroll-contain px-5 py-5 sm:px-8">
              {!hasResults ? (
                <div className="flex flex-col items-center justify-center gap-1.5 py-20 text-center">
                  <p className="text-sm font-semibold text-[#14283D]">No location found</p>
                  <p className="text-xs text-[#667085]">
                    Try a different state or union territory name.
                  </p>
                </div>
              ) : (
                <>
                  {states.length > 0 && (
                    <section>
                      <div className="mb-3 flex items-center gap-3">
                        <h3 className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-[#667085]">
                          States
                        </h3>
                        <span
                          className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/40 to-transparent"
                          aria-hidden
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                        {states.map((loc, index) => (
                          <LocationCard
                            key={loc.code}
                            location={loc}
                            index={index}
                            selected={selected === loc.label}
                            onSelect={onSelect}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                  {unionTerritories.length > 0 && (
                    <section className="mt-7">
                      <div className="mb-3 flex items-center gap-3">
                        <h3 className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-[#667085]">
                          Union Territories
                        </h3>
                        <span
                          className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/40 to-transparent"
                          aria-hidden
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                        {unionTerritories.map((loc, index) => (
                          <LocationCard
                            key={loc.code}
                            location={loc}
                            index={index}
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
