import { motion } from "framer-motion";
import { Check, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LocationOption } from "@/lib/locations";

interface LocationCardProps {
  location: LocationOption;
  /** Index within its grid — used for the subtle stagger on modal open. */
  index?: number;
  /** True when this card is the currently selected location. */
  selected: boolean;
  onSelect: (label: string) => void;
}

/**
 * Premium location card: landmark image that zooms on hover, a glass scrim
 * over the bottom of the image, the state/UT name with a gold accent, and a
 * gold border + glow + checkmark when selected. Smooth 300ms transitions,
 * no bounce; the card lifts 3px and gains a restrained gold edge on hover.
 */
export function LocationCard({ location, index = 0, selected, onSelect }: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.015, 0.2), duration: 0.25, ease: "easeOut" }}
    >
      <button
        type="button"
        onClick={() => onSelect(location.label)}
        aria-pressed={selected}
        className={cn(
          "group relative w-full overflow-hidden rounded-2xl border text-left transition-all duration-300 ease-out",
          "hover:-translate-y-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]",
          selected
            ? "animate-select-pop border-[#D4AF37] shadow-[0_0_24px_-6px_rgba(212,175,55,0.55)]"
            : "border-white/40 hover:border-[#D4AF37]/60 hover:shadow-[0_14px_32px_-14px_rgba(212,175,55,0.45)]"
        )}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#14283D]">
          <img
            src={location.image}
            alt={`${location.landmark}, ${location.label}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
          />

          {/* Glass scrim over the bottom of the image — strengthens on hover */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,21,34,0.88),rgba(8,21,34,0.05))]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,21,34,0.94),rgba(8,21,34,0.18))] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />

          {/* Gold checkmark on the selected card */}
          {selected && (
            <span
              className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37] text-[#081522] shadow-[0_2px_10px_rgba(0,0,0,0.35)] ring-2 ring-white/70"
              aria-hidden
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          )}

          {/* Location icon + name + landmark */}
          <div className="absolute inset-x-0 bottom-0 flex items-start gap-2 p-3">
            <span
              className="mt-0.5 shrink-0 text-[#D4AF37] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:scale-110"
              aria-hidden
            >
              <MapPin className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-white transition-colors duration-300 group-hover:text-[#F5E7B2]">
                {location.label}
              </span>
              <span className="block truncate text-[11px] leading-tight text-white/70">
                {location.landmark}
              </span>
            </span>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
