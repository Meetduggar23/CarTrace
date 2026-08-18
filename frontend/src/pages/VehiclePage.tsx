import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, SearchX } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { ApiErrorState } from "@/components/common/ErrorState";
import type { ApiError } from "@/lib/types";
import { EmptyState } from "@/components/common/EmptyState";
import { SearchForm } from "@/components/search/SearchForm";
import { DataSourceFooter } from "@/components/vehicle/DataSourceFooter";
import { VehicleActions } from "@/components/vehicle/VehicleActions";
import { VehicleDashboard } from "@/components/vehicle/VehicleDashboard";
import { VehicleIdentityCard } from "@/components/vehicle/VehicleIdentityCard";
import { VehicleSkeleton } from "@/components/vehicle/VehicleSkeleton";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { addGuestHistory } from "@/services/history";

export function VehiclePage() {
  const { registration, vin } = useParams<{ registration?: string; vin?: string }>();
  const query = registration ?? vin ?? "";

  const lookup = useMemo(
    () => (vin ? { type: "vin" as const, value: vin } : { type: "registration" as const, value: registration ?? "" }),
    [vin, registration]
  );

  const result = useQuery({
    queryKey: ["vehicle", lookup.type, lookup.value],
    queryFn: () =>
      lookup.type === "vin"
        ? api.vehicleByVin(lookup.value)
        : api.vehicleByRegistration(lookup.value),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  // Record the guest/local recent search once a result arrives.
  useEffect(() => {
    if (result.data) {
      const record = result.data.record;
      const label = [record.manufacturer, record.model].filter(Boolean).join(" ") || null;
      addGuestHistory(query, lookup.type, label);
    }
  }, [result.data, query, lookup.type]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Seo
        title={result.data ? `${result.data.record.manufacturer ?? ""} ${result.data.record.model ?? ""}`.trim() || query : "Vehicle details"}
        description={`Vehicle information for ${query} — manufacturer, model, year, fuel and available registration details.`}
        path={vin ? `/vehicle/vin/${vin}` : `/vehicle/${registration}`}
      />

      <Link
        to="/vehicle"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> New search
      </Link>

      <SearchForm
        compact
        initialQuery={query}
        initialMode={vin ? "vin" : "registration"}
      />

      <p className="kicker mt-8 text-center">
        CarTrace — See Beyond the Plate.
      </p>

      <div className="mt-6">
        {result.isLoading ? (
          <VehicleSkeleton />
        ) : result.isError ? (
          <div className="space-y-6">
            <ApiErrorState error={result.error as unknown as ApiError} onRetry={() => result.refetch()} />
            <EmptyState
              icon={SearchX}
              title="Nothing here yet"
              description="Try a different registration number or a 17-character VIN."
              action={
                <Link to="/rto">
                  <Button variant="outline">Browse RTO directory</Button>
                </Link>
              }
            />
          </div>
        ) : result.data ? (
          <div className="space-y-6">
            <VehicleIdentityCard record={result.data.record} />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <VehicleActions record={result.data.record} />
              <DataSourceFooter result={result.data} />
            </div>
            <VehicleDashboard record={result.data.record} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
