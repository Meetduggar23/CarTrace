import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  Search,
  type LucideIcon,
} from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/common/PageHeader";
import { ApiErrorState } from "@/components/common/ErrorState";
import { DataSourceFooter } from "@/components/vehicle/DataSourceFooter";
import { VehicleIdentityCard } from "@/components/vehicle/VehicleIdentityCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import { addGuestHistory } from "@/services/history";
import { normalizeQuery } from "@/lib/utils";
import {
  isValidRegistration,
  lookupErrorMessage,
} from "@/lib/validation";
import type { ApiError, VehicleRecord } from "@/lib/types";

interface ServiceLookupProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  /** Explains what this service shows and what is/isn't in public registers. */
  note: string;
  /** Renders the service-specific information for a found vehicle. */
  renderService: (record: VehicleRecord) => ReactNode;
  buttonLabel?: string;
  placeholder?: string;
}

const EXAMPLE_REGISTRATIONS = ["MH12AB1234", "DL8CAF1234", "KA01MG8888"];

/**
 * Standalone service page: search a registration number and see the
 * service-specific information CarTrace can verify from public registers.
 * Nothing is fabricated — fields the provider doesn't supply stay hidden and
 * the honest note explains what this service can and cannot show.
 */
export function ServiceLookup({
  icon: Icon,
  title,
  description,
  path,
  note,
  renderService,
  buttonLabel = "Check Vehicle",
  placeholder = "Enter vehicle registration number (e.g. MH12AB1234)",
}: ServiceLookupProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState<string | null>(null);

  const result = useQuery({
    queryKey: ["service-lookup", searched ?? ""],
    queryFn: () => api.searchRegistration(searched as string),
    enabled: !!searched,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  // Record the guest/local recent search once a result arrives.
  useEffect(() => {
    if (result.data) {
      const record = result.data.record;
      const label =
        [record.manufacturer, record.model].filter(Boolean).join(" ") || null;
      addGuestHistory(searched as string, "registration", label);
    }
  }, [result.data, searched]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = normalizeQuery(value);
    if (!normalized) {
      setError("Please enter a registration number to check.");
      return;
    }
    if (!isValidRegistration(normalized)) {
      setError(lookupErrorMessage(normalized, "registration"));
      return;
    }
    setError(null);
    setSearched(normalized);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo title={title} description={description} path={path} />
      <PageHeader title={title} description={description} />

      <form onSubmit={handleSubmit} noValidate className="mx-auto mt-8 max-w-2xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={value}
              onChange={(e) => {
                setValue(e.target.value.toUpperCase());
                setError(null);
              }}
              placeholder={placeholder}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-label="Vehicle registration number"
              aria-invalid={error ? true : undefined}
              className="h-11 pl-10 uppercase tracking-wide"
            />
          </div>
          <Button
            type="submit"
            disabled={!value.trim()}
            className="h-11 shrink-0 px-5"
          >
            {buttonLabel}
            <Search className="h-4 w-4" aria-hidden />
          </Button>
        </div>

        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </motion.p>
        ) : null}
      </form>

      <div className="mt-8">
        {result.isLoading ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-14 text-center">
              <Loader2 className="h-7 w-7 animate-spin text-primary" aria-hidden />
              <p className="mt-3 text-sm text-muted-foreground">
                Checking {searched}…
              </p>
            </CardContent>
          </Card>
        ) : result.isError ? (
          <div className="space-y-4">
            <ApiErrorState
              error={result.error as unknown as ApiError}
              onRetry={() => result.refetch()}
            />
          </div>
        ) : result.data ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <VehicleIdentityCard record={result.data.record} />
            {renderService(result.data.record)}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <DataSourceFooter result={result.data} />
              <Link to={`/vehicle/${encodeURIComponent(searched as string)}`}>
                <Button variant="outline">
                  View full vehicle details <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center p-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-7 w-7 text-primary" aria-hidden />
              </div>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                {note}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {EXAMPLE_REGISTRATIONS.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => {
                      setValue(ex);
                      setError(null);
                    }}
                    className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-sm text-primary transition-colors hover:border-primary/50"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  note?: string;
  children: ReactNode;
}

/** A titled card used to present a service-specific slice of a vehicle record. */
export function ServiceCard({
  icon: Icon,
  title,
  note,
  children,
}: ServiceCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2.5 space-y-0 pb-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" aria-hidden />
        </span>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
        {note ? (
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {note}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}