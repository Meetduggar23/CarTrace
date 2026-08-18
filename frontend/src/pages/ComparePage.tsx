import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GitCompareArrows, Plus, Trash2 } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  clearCompare,
  getCompareList,
  removeFromCompare,
} from "@/services/compare";
import type { VehicleRecord } from "@/lib/types";
import { formatRegistration } from "@/lib/utils";

interface CompareRow {
  label: string;
  get: (v: VehicleRecord) => string | null;
}

const ROWS: CompareRow[] = [
  { label: "Manufacturer", get: (v) => v.manufacturer },
  { label: "Model", get: (v) => v.model },
  { label: "Variant / Trim", get: (v) => v.variant },
  { label: "Model Year", get: (v) => v.modelYear },
  { label: "Fuel Type", get: (v) => v.fuelType },
  { label: "Engine", get: (v) => v.engineDisplacement },
  { label: "Power", get: (v) => v.enginePower },
  { label: "Transmission", get: (v) => v.transmission },
  { label: "Drive Type", get: (v) => v.driveType },
  { label: "Body Type", get: (v) => v.bodyType },
  { label: "Vehicle Type", get: (v) => v.vehicleType },
  { label: "Registration", get: (v) => formatRegistration(v.registrationNumber) },
  { label: "State", get: (v) => v.state },
  { label: "RTO Code", get: (v) => v.rtoCode },
];

export function ComparePage() {
  const [refresh, setRefresh] = useState(0);
  const vehicles = useMemo(() => getCompareList(), [refresh]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="Compare Vehicles"
        description="Compare two vehicles side-by-side and see differing specifications highlighted."
        path="/compare"
      />
      <PageHeader
        title="Compare Vehicles"
        description="Add vehicles from any result page, then compare their specifications side-by-side. Differing values are highlighted."
      >
        {vehicles.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              clearCompare();
              setRefresh((r) => r + 1);
            }}
          >
            <Trash2 className="h-4 w-4" aria-hidden /> Clear comparison
          </Button>
        )}
      </PageHeader>

      {vehicles.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={GitCompareArrows}
            title="No vehicles to compare"
            description="Search a vehicle and use “Add to compare” to place it here. You can compare up to two vehicles."
            action={
              <Link to="/vehicle">
                <Button>Search a vehicle</Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-8">
          {/* Header row */}
          <div className="grid grid-cols-[minmax(7rem,1fr)_1fr_1fr] gap-3 sm:grid-cols-[minmax(10rem,1fr)_1.2fr_1.2fr]">
            <div />
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="rounded-lg border border-border bg-card p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-display font-semibold">
                      {[vehicle.manufacturer, vehicle.model].filter(Boolean).join(" ") ||
                        vehicle.registrationNumber ||
                        vehicle.vin}
                    </p>
                    <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                      {formatRegistration(vehicle.registrationNumber) ?? vehicle.vin}
                    </p>
                    {vehicle.isMock && (
                      <Badge variant="warning" className="mt-2">
                        Mock
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0"
                    aria-label={`Remove ${vehicle.registrationNumber ?? vehicle.vin} from comparison`}
                    onClick={() => {
                      removeFromCompare(vehicle.id);
                      setRefresh((r) => r + 1);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
            {vehicles.length < 2 && (
              <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-card/40">
                <Link
                  to="/vehicle"
                  className="flex flex-col items-center gap-2 px-4 py-6 text-center text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Plus className="h-5 w-5" aria-hidden />
                  Add vehicle
                </Link>
              </div>
            )}
          </div>

          {/* Rows */}
          <div className="mt-4 overflow-hidden rounded-lg border border-border bg-card">
            {ROWS.map((row, i) => {
              const [a, b] = [vehicles[0], vehicles[1]];
              const aVal = row.get(a);
              const bVal = row.get(b);
              const differs =
                b !== undefined &&
                (aVal ?? null) !== (bVal ?? null) &&
                Boolean(aVal || bVal);
              return (
                <div
                  key={row.label}
                  className={`grid grid-cols-[minmax(7rem,1fr)_1fr_1fr] gap-3 px-4 py-3.5 text-sm sm:grid-cols-[minmax(10rem,1fr)_1.2fr_1.2fr] ${
                    i % 2 === 0 ? "bg-card" : "bg-card/40"
                  } ${differs ? "bg-primary/5" : ""}`}
                >
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {row.label}
                    {differs && (
                      <Badge variant="default" className="hidden sm:inline-flex">
                        differs
                      </Badge>
                    )}
                  </div>
                  <Cell value={aVal} highlight={differs} />
                  <Cell value={bVal} highlight={differs} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Cell({ value, highlight }: { value: string | null; highlight: boolean }) {
  const missing = value == null || value === "";
  return (
    <div
      className={`truncate font-medium ${
        highlight ? "text-primary" : missing ? "italic text-muted-foreground/70" : ""
      }`}
    >
      {missing ? "Not available from this source" : value}
    </div>
  );
}
