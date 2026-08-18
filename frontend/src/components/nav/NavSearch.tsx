import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { History, Loader2, Search } from "lucide-react";
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
import type { GuestHistoryEntry } from "@/lib/types";

interface NavSearchProps {
  className?: string;
  /** Called after a successful submit (e.g. close the mobile menu). */
  onSubmitted?: () => void;
  /**
   * "icon": collapsed to a search icon on desktop — expands on hover/focus and
   * collapses when the pointer leaves the search area (unless focused).
   * "inline": always-visible field (mobile menu).
   */
  mode?: "icon" | "inline";
}

const CLOSE_DELAY = 200;

/**
 * Compact "Search Vehicle No." field for the navbar. Auto-detects registration
 * numbers vs VINs, validates, remembers recent searches and shows a loading
 * state while navigating to the result page.
 */
export function NavSearch({
  className,
  onSubmitted,
  mode = "inline",
}: NavSearchProps) {
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLDivElement>(null);
  const focusedRef = useRef(false);
  const closeTimer = useRef<number | null>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showRecents, setShowRecents] = useState(false);
  const [recents, setRecents] = useState<GuestHistoryEntry[]>([]);
  const [open, setOpen] = useState(mode === "inline");

  function openField() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function closeFieldSoon() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      // Keep the field open while the user is typing / has keyboard focus.
      if (focusedRef.current) return;
      setOpen(false);
    }, CLOSE_DELAY);
  }
  useEffect(
    () => () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    },
    []
  );

  // Close the recents/error popovers on outside click or Escape.
  useEffect(() => {
    if (!showRecents && !error) return;
    function onPointerDown(e: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setShowRecents(false);
        setError(null);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowRecents(false);
        setError(null);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showRecents, error]);

  function submit(query: string) {
    const normalized = normalizeQuery(query);
    if (!normalized) {
      setError("Enter a registration number or VIN to search.");
      setShowRecents(false);
      return;
    }
    const type = detectLookupType(normalized);
    if (type !== "registration" && type !== "vin") {
      setError(lookupErrorMessage(normalized, null));
      setShowRecents(false);
      return;
    }
    if (type === "registration" && !isValidRegistration(normalized)) {
      setError(lookupErrorMessage(normalized, "registration"));
      setShowRecents(false);
      return;
    }
    if (type === "vin" && !isValidVin(normalized)) {
      setError(lookupErrorMessage(normalized, "vin"));
      setShowRecents(false);
      return;
    }

    setError(null);
    setShowRecents(false);
    setLoading(true);
    addGuestHistory(normalized, type, null);
    onSubmitted?.();
    navigate(type === "vin" ? `/vehicle/vin/${normalized}` : `/vehicle/${normalized}`);
    // The target page takes over; clear the local spinner shortly after.
    window.setTimeout(() => setLoading(false), 700);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit(value);
  }

  function handleFocus() {
    focusedRef.current = true;
    openField();
    setRecents(getGuestHistory());
    setShowRecents(true);
  }

  function handleBlur() {
    focusedRef.current = false;
    // Let a recent-search click (onMouseDown) finish before closing.
    window.setTimeout(() => setShowRecents(false), 150);
    closeFieldSoon();
  }

  const expanded = mode === "inline" || open;

  return (
    <div
      ref={wrapRef}
      onMouseEnter={mode === "icon" ? openField : undefined}
      onMouseLeave={mode === "icon" ? closeFieldSoon : undefined}
      className={cn("relative", className)}
    >
      {/* In icon mode the form is anchored to the right and the field expands
          leftward, so it never pushes the profile icon or leaves the viewport. */}
      <form
        onSubmit={handleSubmit}
        noValidate
        role="search"
        className={cn(
          mode === "icon" &&
            "absolute right-0 top-1/2 z-30 -translate-y-1/2"
        )}
      >
        <div className="relative">
          <Search
            className={cn(
              "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2",
              expanded ? "text-white/40" : "text-[hsl(var(--on-dark-soft))]"
            )}
            aria-hidden
          />
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value.toUpperCase());
              setError(null);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={expanded ? "Search by vehicle number…" : ""}
            aria-label="Search vehicle by registration number or VIN"
            autoComplete="off"
            spellCheck={false}
            className={cn(
              "h-9 rounded-md border text-sm text-white transition-all duration-200",
              mode === "inline"
                ? "w-full border-white/15 bg-white/5 pl-9 pr-8 placeholder:text-white/35 focus:border-primary/70 focus:outline-none focus:ring-1 focus:ring-primary/60"
                : expanded
                  ? "w-64 border-white/15 bg-white/5 pl-9 pr-8 placeholder:text-white/35 focus:border-primary/70 focus:outline-none focus:ring-1 focus:ring-primary/60"
                  : "w-9 cursor-pointer border-transparent bg-transparent pl-9 pr-0 hover:bg-white/5 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/60",
              error &&
                "border-destructive/70 focus:border-destructive focus:ring-destructive/60"
            )}
          />
          {loading && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-primary" aria-hidden />
          )}

          <AnimatePresence>
            {(showRecents || error) && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-none border border-border bg-popover text-popover-foreground shadow-xl"
              >
                <span className="block h-0.5 w-full bg-primary" aria-hidden />
                {error ? (
                  <p role="alert" className="px-3 py-2.5 text-sm text-destructive">
                    {error}
                  </p>
                ) : recents.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <History className="h-3.5 w-3.5" aria-hidden /> Recent searches
                      </span>
                    </div>
                    <ul>
                      {recents.map((entry) => (
                        <li key={`${entry.query}-${entry.checkedAt}`}>
                          <button
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              submit(entry.query);
                            }}
                            className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-primary/10 hover:text-primary"
                          >
                            <span className="min-w-0 truncate font-mono font-medium">
                              {entry.lookupType === "registration"
                                ? formatRegistration(entry.query)
                                : entry.query}
                            </span>
                            <span className="shrink-0 text-xs text-muted-foreground">
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
                        recents.forEach((r) => removeGuestHistory(r.query));
                        setShowRecents(false);
                      }}
                      className="w-full border-t border-border px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      Clear history
                    </button>
                  </>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
