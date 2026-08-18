import { Check, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LocationOption } from "@/lib/locations";

interface LocationCardProps {
  location: LocationOption;
  /** True when this card is the currently selected location. */
  selected: boolean;
  onSelect: (label: string) => void;
}

/**
 * Premium location card: landmark image that zooms on hover, a dark gradient
 * scrim, the state/UT name with a gold accent, and a gold checkmark + glow
 * when selected. Smooth 300ms transitions, no bounce.
 */
export function LocationCard({ location, selected, onSelect }: LocationCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(location.label)}
      aria-pressed={selected}
      className={cn(
        "group relative w-full overflow-hidden rounded-xl border text-left transition-all duration-300 ease-out",
        "hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        selected
          ? "border-primary shadow-glow"
          : "border-[#E5E7EB] hover:border-primary/70 hover:shadow-[0_12px_32px_-14px_hsl(var(--primary)/0.5)]"
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#14283D]">
        <img
          src={location.image}
          alt={`${location.landmark}, ${location.label}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
        />

        {/* Gradient scrim — strengthens slightly on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-[#14283D]/95 via-[#14283D]/25 to-transparent",
            "transition-opacity duration-300",
            selected && "from-[#14283D]/95 via-[#14283D]/30"
          )}
          aria-hidden
        />

        {/* Gold checkmark on the selected card */}
        {selected && (
          <span
            className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow"
            aria-hidden
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
        )}

        {/* Location icon + name + landmark */}
        <div className="absolute inset-x-0 bottom-0 flex items-start gap-2 p-3">
          <span
            className="mt-0.5 shrink-0 text-primary transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:scale-110"
            aria-hidden
          >
            <MapPin className="h-3.5 w-3.5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white transition-colors duration-300 group-hover:text-[#F7E7B0]">
              {location.label}
            </span>
            <span className="block truncate text-[11px] leading-tight text-white/70">
              {location.landmark}
            </span>
          </span>
        </div>
      </div>
    </button>
  );
}
