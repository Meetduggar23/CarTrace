import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Building2, Landmark, MapPin, Search } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { ApiErrorState } from "@/components/common/ErrorState";
import type { ApiError } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { api } from "@/services/api";

export function RtoCodePage() {
  const { code } = useParams<{ code: string }>();
  const query = useQuery({
    queryKey: ["rto", code],
    queryFn: () => api.rtoByCode(code ?? ""),
    retry: 1,
  });

  if (query.isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Seo title="RTO not found" path={`/rto/${code ?? ""}`} />
        <ApiErrorState error={query.error as unknown as ApiError} />
        <Link
          to="/rto"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to RTO directory
        </Link>
      </div>
    );
  }

  const rto = query.data;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title={`RTO ${rto.code} — ${rto.officeName}`}
        description={`RTO information for ${rto.code}: ${rto.officeName}, ${rto.city}, ${rto.state}.`}
        path={`/rto/${rto.code}`}
      />

      <Link
        to="/rto"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> RTO directory
      </Link>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex h-16 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 font-mono text-lg font-bold text-primary">
            {rto.code}
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold">{rto.officeName}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden />
              {rto.city}, {rto.state}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card/50 px-4 py-3">
            <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Landmark className="h-3.5 w-3.5" aria-hidden /> RTO Code
            </dt>
            <dd className="mt-1 font-mono text-lg font-semibold">{rto.code}</dd>
          </div>
          <div className="rounded-xl border border-border bg-card/50 px-4 py-3">
            <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Building2 className="h-3.5 w-3.5" aria-hidden /> Office
            </dt>
            <dd className="mt-1 font-medium">{rto.officeName}</dd>
          </div>
          <div className="rounded-xl border border-border bg-card/50 px-4 py-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">State</dt>
            <dd className="mt-1 font-medium">{rto.state}</dd>
          </div>
          <div className="rounded-xl border border-border bg-card/50 px-4 py-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">City</dt>
            <dd className="mt-1 font-medium">{rto.city}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-semibold">Services</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {rto.services.map((service) => (
            <Badge key={service} variant="secondary">
              {service}
            </Badge>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          This directory lists standardized public RTO codes and office names.
          Contact details are not shown because we only publish verified public
          information — confirm official contact and service details with the
          state transport department.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-border bg-card/40 p-5 text-center">
        <Search className="mx-auto h-5 w-5 text-muted-foreground" aria-hidden />
        <p className="mt-2 text-sm text-muted-foreground">
          Looking for vehicle information?{" "}
          <Link to="/vehicle" className="font-medium text-primary hover:underline">
            Check a vehicle
          </Link>
        </p>
      </div>
    </div>
  );
}
