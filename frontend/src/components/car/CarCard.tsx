import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, GitCompareArrows, Star } from "lucide-react";
import type { NewCar } from "@/lib/cars";
import { formatPrice } from "@/lib/cars";
import { cn } from "@/lib/utils";
import { CarImage } from "./CarImage";

interface CarCardProps {
  car: NewCar;
  index?: number;
  /** Whether to show a compare toggle button. */
  showCompare?: boolean;
  /** Whether this car is currently selected for comparison. */
  inCompare?: boolean;
  onToggleCompare?: (car: NewCar) => void;
}

/**
 * Premium car card with the CarTrace visual identity:
 * white card → navy text → gold accent on hover.
 * 20px radius, subtle shadow, image zoom on hover, card lifts 3px.
 */
export function CarCard({
  car,
  index = 0,
  showCompare = true,
  inCompare = false,
  onToggleCompare,
}: CarCardProps) {
  const fuelTags = car.fuel.join(" • ");
  const transTags = car.transmission.join(" / ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.3, ease: "easeOut" }}
      className="group"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[20px] border bg-white transition-all duration-300 ease-out",
          "hover:-translate-y-[3px] hover:shadow-[0_16px_40px_-12px_rgba(20,40,61,0.18)]",
          inCompare
            ? "border-[#D4AF37] shadow-[0_0_0_1px_rgba(212,175,55,0.35)]"
            : "border-border hover:border-[#D4AF37]/50"
        )}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <CarImage car={car} className="h-full w-full" />
          {car.isElectric && (
            <span className="absolute right-3 top-3 rounded-full bg-success/90 px-2.5 py-1 text-[10px] font-semibold text-success-foreground">
              EV
            </span>
          )}
          {showCompare && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleCompare?.(car);
              }}
              className={cn(
                "absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
                inCompare
                  ? "bg-[#D4AF37] text-white"
                  : "bg-white/80 text-muted-foreground backdrop-blur-sm hover:bg-white hover:text-foreground"
              )}
              aria-label={inCompare ? `Remove ${car.model} from comparison` : `Add ${car.model} to comparison`}
            >
              <GitCompareArrows className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="px-5 pb-5 pt-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#D4AF37]">
                {car.brand}
              </p>
              <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-[#14283D]">
                {car.model}
              </h3>
            </div>
            {car.rating !== null && (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#FFF8E7] px-2 py-0.5 text-xs font-semibold text-[#D4AF37]">
                <Star className="h-3 w-3 fill-[#D4AF37]" /> {car.rating}
              </span>
            )}
          </div>

          <p className="mt-1 font-display text-base font-bold text-[#14283D]">
            {formatPrice(car.startingPrice / 100000)}
          </p>

          <div className="mt-2.5 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
            <span className="rounded-full bg-muted px-2 py-0.5">{fuelTags}</span>
            <span className="rounded-full bg-muted px-2 py-0.5">{car.bodyType}</span>
            <span className="rounded-full bg-muted px-2 py-0.5">{transTags}</span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Link
              to={`/new-cars/${car.slug}`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#D4AF37] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B99224]"
            >
              View Details <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
