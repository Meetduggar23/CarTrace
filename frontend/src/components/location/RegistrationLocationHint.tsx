import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRegistrationLocationSync } from "@/lib/locations";

interface RegistrationLocationHintProps {
  /** Current value of the registration input. */
  value: string;
  /** Set to false to suppress detection (e.g. while in VIN mode). */
  enabled?: boolean;
  className?: string;
}

/**
 * Subtle inline feedback for automatic state detection while typing: shows
 * "✓ Maharashtra detected" when a registration prefix is recognized, or a
 * compact "Switch location?" prompt when the plate conflicts with a manually
 * selected state. Renders in place — never a popup, never blocks typing.
 */
export function RegistrationLocationHint({
  value,
  enabled = true,
  className,
}: RegistrationLocationHintProps) {
  const { location, detected, showConflict, confirmSwitch, dismissConflict } =
    useRegistrationLocationSync(value, enabled);

  if (!detected) return null;

  if (showConflict) {
    return (
      <div
        role="status"
        className={cn(
          "mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs text-foreground",
          className
        )}
      >
        <span className="min-w-0">
          This registration appears to be from{" "}
          <span className="font-semibold text-primary">{detected.label}</span>. Switch location?
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={confirmSwitch}
            className="rounded-md bg-primary px-2.5 py-1 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Switch to {detected.label}
          </button>
          <button
            type="button"
            onClick={dismissConflict}
            className="rounded-md border border-border bg-background px-2.5 py-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Keep {location}
          </button>
        </span>
      </div>
    );
  }

  return (
    <p role="status" className={cn("mt-2.5 flex items-center gap-1.5 text-xs text-success", className)}>
      <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span>{detected.label} detected</span>
    </p>
  );
}
