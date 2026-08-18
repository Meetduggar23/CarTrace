import { cn } from "@/lib/utils";
import type { NewCar } from "@/lib/cars";

interface CarImageProps {
  car: NewCar;
  className?: string;
  /** Show a "Development Mock" badge when the image is a placeholder. */
  showBadge?: boolean;
}

/**
 * Renders a car image with a neutral placeholder when no legitimate
 * vehicle image is available. Never fabricates a photograph of a
 * specific vehicle — falls back to a branded SVG placeholder.
 */
export function CarImage({ car, className, showBadge = false }: CarImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <img
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        onError={(e) => {
          // Swap to a neutral placeholder — never a misleading image
          const target = e.currentTarget;
          target.onerror = null;
          target.src = `data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260"><rect fill="%23F7F8FA" width="400" height="260"/><text x="200" y="130" font-family="system-ui" font-size="14" fill="%239CA3AF" text-anchor="middle" dominant-baseline="middle">No image available</text></svg>`
          )}`;
        }}
      />
      {showBadge && car.source === "mock" && (
        <span className="absolute left-2.5 top-2.5 rounded-md bg-warning/90 px-2 py-0.5 text-[10px] font-semibold text-warning-foreground">
          Development mock
        </span>
      )}
    </div>
  );
}
