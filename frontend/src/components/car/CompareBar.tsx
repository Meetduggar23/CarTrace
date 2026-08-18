import { motion, AnimatePresence } from "framer-motion";
import { X, GitCompareArrows } from "lucide-react";
import type { NewCar } from "@/lib/cars";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const MAX_COMPARE = 3;

interface CompareBarProps {
  cars: NewCar[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

/**
 * Floating compare bar that appears when cars are selected for comparison.
 * Supports up to 3 cars with a CTA to open the compare page.
 */
export function CompareBar({ cars, onRemove, onClear }: CompareBarProps) {
  if (cars.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-6 left-1/2 z-50 flex w-[90vw] max-w-3xl -translate-x-1/2 items-center gap-4 rounded-2xl border border-[#D4AF37]/40 bg-white px-5 py-3 shadow-[0_8px_32px_-8px_rgba(212,175,55,0.3)]"
      >
        <GitCompareArrows className="h-5 w-5 shrink-0 text-[#D4AF37]" />
        <div className="flex flex-1 items-center gap-2 overflow-x-auto">
          {cars.map((car) => (
            <span
              key={car.id}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
            >
              {car.brand} {car.model}
              <button
                type="button"
                onClick={() => onRemove(car.id)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20"
                aria-label={`Remove ${car.model}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {cars.length < MAX_COMPARE && (
            <span className="text-xs text-muted-foreground">
              Add {MAX_COMPARE - cars.length} more
            </span>
          )}
        </div>
        <Button
          size="sm"
          disabled={cars.length < 2}
          className={cn(
            "shrink-0",
            cars.length >= 2
              ? "bg-[#D4AF37] text-white hover:bg-[#B99224]"
              : ""
          )}
          onClick={() => {
            const params = cars.map((c) => `id=${c.id}`).join("&");
            window.location.href = `/compare?${params}`;
          }}
        >
          Compare ({cars.length})
        </Button>
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-secondary"
          aria-label="Clear comparison"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
