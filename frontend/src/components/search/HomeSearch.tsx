import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, Search } from "lucide-react";
import { FEATURES } from "@/lib/nav";
import { EXAMPLE_REGISTRATIONS } from "@/lib/constants";
import { cn, formatRegistration, normalizeQuery } from "@/lib/utils";
import { isValidRegistration } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchForm } from "@/components/search/SearchForm";

type ServiceForm =
  | { kind: "rc" }
  | { kind: "reg"; button: string; target: string; placeholder?: string }
  | { kind: "text"; button: string; target: string; placeholder: string };

const FORM_BY_HREF: Record<string, ServiceForm> = {
  "/vehicle": { kind: "rc" },
  "/challan": { kind: "reg", button: "Search Challan", target: "/challan" },
  "/car-insurance": { kind: "reg", button: "Check Insurance", target: "/car-insurance" },
  "/bike-insurance": { kind: "reg", button: "Check Insurance", target: "/bike-insurance" },
  "/service-history": { kind: "reg", button: "Check Service History", target: "/service-history" },
  "/new-cars": { kind: "text", button: "Search Cars", target: "/new-cars", placeholder: "Search new cars" },
  "/used-cars": { kind: "text", button: "Search Cars", target: "/used-cars", placeholder: "Search used cars" },
  "/fastag": { kind: "reg", button: "Check FASTag", target: "/fastag" },
};

/**
 * Homepage vehicle-search experience: a horizontal service selector that
 * dynamically swaps the search form below. RC Details uses the real vehicle
 * lookup; the other services route into their feature pages (only supported
 * data functionality is exposed).
 */
export function HomeSearch() {
  const [active, setActive] = useState("/vehicle");
  const activeIndex = FEATURES.findIndex((f) => f.href === active);
  const form = FORM_BY_HREF[active];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function moveTab(dir: 1 | -1) {
    const next = (activeIndex + dir + FEATURES.length) % FEATURES.length;
    setActive(FEATURES[next].href);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      {/* Service selector — contained row; distributes equally when it fits,
          scrolls horizontally (scrollbar hidden) inside the card when it doesn't */}
      <div
        role="tablist"
        aria-label="Vehicle services"
        className="w-full max-w-full overflow-x-auto px-2"
      >
        <div className="flex items-stretch border-b border-border">
          {FEATURES.map((feature, i) => {
            const isActive = active === feature.href;
            return (
              <button
                key={feature.href}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`search-tab-${i}`}
                aria-selected={isActive}
                aria-controls="search-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(feature.href)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    moveTab(1);
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    moveTab(-1);
                  } else if (e.key === "Home") {
                    e.preventDefault();
                    setActive(FEATURES[0].href);
                    tabRefs.current[0]?.focus();
                  } else if (e.key === "End") {
                    e.preventDefault();
                    setActive(FEATURES[FEATURES.length - 1].href);
                    tabRefs.current[FEATURES.length - 1]?.focus();
                  }
                }}
                className={cn(
                  "flex shrink-0 items-center gap-1 whitespace-nowrap border-b-2 px-2.5 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-transparent text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                )}
              >
                <feature.icon
                  className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "text-muted-foreground")}
                  aria-hidden
                />
                {feature.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic form panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          id="search-panel"
          role="tabpanel"
          aria-labelledby={`search-tab-${activeIndex}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="pt-4"
        >
          {form.kind === "rc" ? <RcForm /> : form.kind === "reg" ? <RegFeatureForm {...form} /> : <TextFeatureForm {...form} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Default service — the real registration / VIN lookup. */
function RcForm() {
  return (
    <div>
      <SearchForm size="lg" placeholder="Enter vehicle registration number" />
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Only publicly available information supported by the selected data provider is
        displayed.
      </p>
    </div>
  );
}

/** Registration-number form for services that route to a feature page. */
function RegFeatureForm({
  button,
  target,
  placeholder = "Enter Vehicle Registration Number",
}: {
  button: string;
  target: string;
  placeholder?: string;
}) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function submit() {
    const normalized = normalizeQuery(value);
    if (!normalized) {
      setError("Enter a vehicle registration number to continue.");
      return;
    }
    if (!isValidRegistration(normalized)) {
      setError("That doesn't look like a valid registration number. Try a format like MH12AB1234.");
      return;
    }
    setError(null);
    setLoading(true);
    navigate(`${target}?reg=${encodeURIComponent(normalized)}`);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      noValidate
      className="mx-auto max-w-2xl"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value.toUpperCase());
              setError(null);
            }}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-invalid={error ? true : undefined}
            className={cn(
              "h-14 pl-11 pr-4 text-base uppercase tracking-wide",
              error && "border-destructive focus-visible:ring-destructive"
            )}
          />
        </div>
        <Button type="submit" size="lg" disabled={loading} className="shrink-0">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {button} <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>

      {error && (
        <p role="alert" className="mt-2.5 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        Try:{" "}
        {EXAMPLE_REGISTRATIONS.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => {
              setValue(ex);
              setError(null);
            }}
            className="rounded-md px-1.5 py-0.5 font-medium text-primary transition-colors hover:bg-primary/10"
          >
            {formatRegistration(ex)}
          </button>
        ))}
      </div>
    </form>
  );
}

/** Free-text form for New Car / Used Car. */
function TextFeatureForm({
  button,
  target,
  placeholder,
}: {
  button: string;
  target: string;
  placeholder: string;
}) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit() {
    const q = value.trim();
    if (!q) {
      setError("Enter what you're looking for to continue.");
      return;
    }
    setError(null);
    navigate(`${target}?q=${encodeURIComponent(q)}`);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      noValidate
      className="mx-auto max-w-2xl"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(null);
            }}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-invalid={error ? true : undefined}
            className={cn("h-14 pl-11 pr-4 text-base", error && "border-destructive focus-visible:ring-destructive")}
          />
        </div>
        <Button type="submit" size="lg" className="shrink-0">
          {button} <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
      {error && (
        <p role="alert" className="mt-2.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </form>
  );
}
