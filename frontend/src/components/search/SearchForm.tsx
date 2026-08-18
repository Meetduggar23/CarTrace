import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { History, Loader2, Search, Sparkles, X } from "lucide-react";
import { EXAMPLE_VINS } from "@/lib/constants";
import type { LookupType } from "@/lib/types";
import { cn, formatRegistration, normalizeQuery } from "@/lib/utils";
import {
  detectLookupType,
  isValidRegistration,
  isValidVin,
  lookupErrorMessage,
} from "@/lib/validation";
import {
  addGuestHistory,
  getGuestHistory,
  removeGuestHistory,
} from "@/services/history";
import {
  DEFAULT_LOCATION_EXAMPLES,
  autoSelectLocationFromRegistration,
  getLocationConfig,
  useSelectedLocation,
} from "@/lib/locations";
import { RegistrationLocationHint } from "@/components/location/RegistrationLocationHint";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchFormProps {
  /** Initial query (e.g. from a URL param). */
  initialQuery?: string;
  initialMode?: LookupType;
  /** Compact single-line variant for inner pages. */
  compact?: boolean;
  size?: "default" | "lg";
  autoFocus?: boolean;
  /** Override the input placeholder text. */
  placeholder?: string;
}

export function SearchForm({
  initialQuery = "",
  initialMode,
  compact = false,
  size = "default",
  autoFocus = false,
  placeholder,
}: SearchFormProps) {
  const navigate = useNavigate();
  const location = useSelectedLocation();
  const locationConfig = getLocationConfig(location);
  const [mode, setMode] = useState<LookupType>(initialMode ?? "registration");
  const [value, setValue] = useState(initialQuery);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showRecents, setShowRecents] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimer = useRef<number | null>(null);

  // Clean up the blur timer on unmount.
  useEffect(() => {
    return () => {
      if (blurTimer.current) window.clearTimeout(blurTimer.current);
    };
  }, []);

  const recents = useMemo(() => getGuestHistory(), [showRecents]);

  const detected = useMemo(() => detectLookupType(value), [value]);

  function handleChange(next: string) {
    // Auto-uppercase; strip spaces for VINs, keep display formatting loose.
    const upper = next.toUpperCase();
    setValue(mode === "vin" ? upper.replace(/[\s-]/g, "") : upper);
    setError(null);
  }

  function submit(query: string, targetMode: LookupType) {
    const normalized = normalizeQuery(query);
    if (!normalized) {
      setError("Please enter a value to search.");
      inputRef.current?.focus();
      return;
    }
    if (targetMode === "registration" && !isValidRegistration(normalized)) {
      setError(lookupErrorMessage(normalized, "registration"));
      return;
    }
    if (targetMode === "vin" && !isValidVin(normalized)) {
      setError(lookupErrorMessage(normalized, "vin"));
      return;
    }

    setSubmitting(true);
    addGuestHistory(normalized, targetMode, null);
    // Auto-select the state encoded in the plate (e.g. MH12AB1234 → Maharashtra).
    if (targetMode === "registration") {
      autoSelectLocationFromRegistration(normalized);
    }
    const path =
      targetMode === "vin"
        ? `/vehicle/vin/${normalized}`
        : `/vehicle/${normalized}`;
    navigate(path);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Tolerant: if the user typed a VIN in registration mode (or vice
    // versa), honor the detected type.
    const targetMode = detected ?? mode;
    submit(value, targetMode);
  }

  function handleExample(example: string) {
    const type = detectLookupType(example);
    if (type) setMode(type);
    setValue(example);
    setError(null);
    inputRef.current?.focus();
  }

  // Registration examples follow the selected state/UT (e.g. MH 12 AB 1234
  // when Maharashtra is selected); VINs stay site-wide.
  const examples =
    mode === "registration"
      ? locationConfig?.examples ?? DEFAULT_LOCATION_EXAMPLES
      : EXAMPLE_VINS;

  return (
    <div
      className={cn(
        "w-full",
        compact ? "" : size === "lg" ? "mx-auto max-w-3xl" : "mx-auto max-w-2xl"
      )}
    >
      {/* Mode tabs */}
      <Tabs
        value={mode}
        onValueChange={(v) => {
          setMode(v as LookupType);
          setError(null);
        }}
      >
        <TabsList
          className={cn(
            "w-full",
            !compact && (size === "lg" ? "mx-auto max-w-2xl" : "mx-auto max-w-xl")
          )}
          aria-label="Lookup type"
        >
          <TabsTrigger value="registration" className="flex-1">
            Registration Number
          </TabsTrigger>
          <TabsTrigger value="vin" className="flex-1">
            VIN
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <form onSubmit={handleSubmit} noValidate className="mt-3">
        <div
          className={cn(
            "relative flex flex-col gap-2 sm:flex-row sm:items-stretch",
            size === "lg" && "sm:gap-3"
          )}
        >
          <div className="relative flex-1">
            <Search
              className={cn(
                "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground",
                size === "lg" ? "h-5 w-5" : "h-4 w-4"
              )}
              aria-hidden
            />
            <Input
              ref={inputRef}
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => setShowRecents(true)}
              onBlur={() => {
                blurTimer.current = window.setTimeout(() => setShowRecents(false), 150);
              }}
              placeholder={
                placeholder ??
                (mode === "registration"
                  ? "Enter vehicle registration number (e.g. MH12AB1234)"
                  : "Enter 17-character VIN")
              }
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              autoFocus={autoFocus}
              aria-label={
                mode === "registration"
                  ? "Vehicle registration number"
                  : "Vehicle identification number (VIN)"
              }
              aria-invalid={error ? true : undefined}
              className={cn(
                "uppercase tracking-wide",
                size === "lg" ? "h-14 pl-12 pr-10 text-base" : "h-11 pl-10 pr-10",
                error && "border-destructive focus-visible:ring-destructive"
              )}
            />
            {value && (
              <button
                type="button"
                onClick={() => {
                  setValue("");
                  setError(null);
                  inputRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Clear input"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Recent searches */}
            <AnimatePresence>
              {showRecents && recents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 top-full z-30 mt-1.5 overflow-hidden rounded-xl border border-border bg-popover shadow-lg"
                >
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <History className="h-3.5 w-3.5" /> Recent searches
                    </span>
                  </div>
                  <ul>
                    {recents.map((entry) => (
                      <li key={`${entry.query}-${entry.checkedAt}`}>
                        <button
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setMode(entry.lookupType);
                            setValue(entry.query);
                            submit(entry.query, entry.lookupType);
                          }}
                          className="flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-secondary/60"
                        >
                          <span className="font-medium">{entry.query}</span>
                          <span className="text-xs text-muted-foreground">
                            {entry.lookupType === "vin" ? "VIN" : "Registration"}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      recents.forEach((entry) => removeGuestHistory(entry.query));
                      setShowRecents(false);
                    }}
                    className="w-full border-t border-border px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
                  >
                    Clear history
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button
            type="submit"
            size={size === "lg" ? "lg" : "default"}
            disabled={submitting || !value.trim()}
            className={cn("shrink-0", size === "lg" ? "h-14 px-8" : "px-5")}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Checking…
              </>
            ) : (
              <>
                {mode === "vin" ? "Decode VIN" : "Check Vehicle"}
                <Search className="h-4 w-4" aria-hidden />
              </>
            )}
          </Button>
        </div>

        {/* Auto state detection feedback while typing a registration number */}
        <RegistrationLocationHint value={value} enabled={detected !== "vin"} />

        {/* Validation hint */}
        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          {value && !error && detected && detected !== mode && (
            <span className="inline-flex items-center gap-1 rounded-sm bg-accent/10 px-2.5 py-1 font-medium text-accent">
              <Sparkles className="h-3 w-3" aria-hidden />
              Detected as {detected === "vin" ? "VIN" : "registration number"}
            </span>
          )}
          <span className="text-xs">
            Try:{" "}
            {examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => handleExample(ex)}
                className="mx-0.5 rounded-md px-1.5 py-0.5 font-medium text-primary transition-colors hover:bg-primary/10"
              >
                {mode === "registration" ? formatRegistration(ex) : ex}
              </button>
            ))}
          </span>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
