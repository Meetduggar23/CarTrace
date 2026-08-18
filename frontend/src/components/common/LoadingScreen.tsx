import { CarTraceLogo } from "@/components/common/CarTraceLogo";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  /** Accessible description of what is loading. */
  label?: string;
  /** Set for the full-viewport boot splash (no min-height override). */
  fullscreen?: boolean;
}

/**
 * Branded loading state used while lazy routes / page data load.
 * Renders on the dark product surface so the gold logo stays readable.
 */
export function LoadingScreen({ label = "Loading…", fullscreen = false }: LoadingScreenProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-6 bg-[hsl(var(--surface-dark))]",
        fullscreen ? "min-h-screen" : "min-h-[50vh]"
      )}
    >
      <CarTraceLogo size="xl" logoClassName="opacity-90" />
      <div className="flex items-center gap-3 text-sm text-[hsl(var(--on-dark-soft))]">
        <span
          className="h-5 w-5 animate-spin rounded-full border-2 border-primary/25 border-t-primary"
          aria-hidden
        />
        <span>{label}</span>
      </div>
    </div>
  );
}
