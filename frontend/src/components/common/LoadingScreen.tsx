import { Logo } from "@/components/common/Logo";

interface LoadingScreenProps {
  /** Accessible description of what is loading. */
  label?: string;
  /** Set for the full-viewport boot splash (no min-height override). */
  fullscreen?: boolean;
}

/**
 * Branded loading state used while lazy routes / page data load.
 * Replaces a bare spinner with the logo + subtle progress indicator.
 */
export function LoadingScreen({ label = "Loading…", fullscreen = false }: LoadingScreenProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={
        fullscreen
          ? "flex min-h-screen flex-col items-center justify-center gap-6"
          : "flex min-h-[50vh] flex-col items-center justify-center gap-6"
      }
    >
      <Logo size="xl" className="opacity-90" />
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span
          className="h-5 w-5 animate-spin rounded-full border-2 border-primary/25 border-t-primary"
          aria-hidden
        />
        <span>{label}</span>
      </div>
    </div>
  );
}
