import { motion } from "framer-motion";
import {
  Car,
  Clock,
  CloudOff,
  PlugZap,
  SearchX,
  TriangleAlert,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import type { ApiError, ErrorCode } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  code?: ErrorCode;
  message?: string;
  onRetry?: () => void;
  compact?: boolean;
}

const ERROR_TEMPLATES: Partial<
  Record<ErrorCode, { icon: LucideIcon; title: string; fallback: string }>
> = {
  VEHICLE_NOT_FOUND: {
    icon: SearchX,
    title: "Vehicle not found",
    fallback: "We couldn't find a record for this registration number or VIN.",
  },
  PROVIDER_UNAVAILABLE: {
    icon: CloudOff,
    title: "Vehicle service temporarily unavailable",
    fallback:
      "The selected vehicle data provider is currently unavailable. Please try again later.",
  },
  UNSUPPORTED_LOOKUP: {
    icon: PlugZap,
    title: "Lookup not supported",
    fallback:
      "This lookup type is currently unavailable with the configured provider.",
  },
  RATE_LIMITED: {
    icon: Clock,
    title: "Too many requests",
    fallback: "Please wait a moment before trying again.",
  },
  NETWORK_ERROR: {
    icon: WifiOff,
    title: "Connection problem",
    fallback:
      "We couldn't reach the CarTrace service. Check your connection and try again.",
  },
  DATABASE_REQUIRED: {
    icon: TriangleAlert,
    title: "Feature requires a database",
    fallback: "This feature needs the database to be configured. Please try again later.",
  },
  VALIDATION_ERROR: {
    icon: Car,
    title: "Invalid input",
    fallback: "Please check the value you entered and try again.",
  },
};

export function ErrorState({ code, message, onRetry, compact }: ErrorStateProps) {
  const template = code ? ERROR_TEMPLATES[code] : undefined;
  const Icon = template?.icon ?? TriangleAlert;
  const title = template?.title ?? "Something went wrong";
  const text = message || template?.fallback || "Please try again.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="alert"
      className={
        compact
          ? "flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4"
          : "flex flex-col items-center justify-center rounded-lg border border-border bg-card/50 px-6 py-14 text-center"
      }
    >
      <div
        className={
          compact
            ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10"
            : "mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-destructive/10"
        }
      >
        <Icon className={compact ? "h-5 w-5 text-destructive" : "h-7 w-7 text-destructive"} />
      </div>
      <div className={compact ? "" : "max-w-md"}>
        <h3 className="font-display font-semibold">{title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
      </div>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry} className={compact ? "ml-auto" : "mt-5"}>
          Try again
        </Button>
      ) : null}
    </motion.div>
  );
}

/** Convenience: build an ErrorState from a caught ApiError. */
export function ApiErrorState({ error, onRetry }: { error: ApiError; onRetry?: () => void }) {
  return <ErrorState code={error.code} message={error.message} onRetry={onRetry} />;
}
