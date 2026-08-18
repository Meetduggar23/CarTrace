import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
import { carService, type NewCar } from "@/lib/cars";
import type { VehicleRecord } from "@/lib/types";
import { formatRegistration } from "@/lib/utils";

interface RowSpec {
  label: string;
  fromRecord: (v: VehicleRecord) => string | null;
  fromCar: (c: NewCar) => string | null;
}

const ROWS: RowSpec[] = [
  { label: "Price", fromRecord: () => null, fromCar: (c) => c.priceDisplay },
  { label: "Fuel Type", fromRecord: (v) => v.fuelType, fromCar: (c) => c.fuel.join(", ") },
  { label: "Transmission", fromRecord: (v) => v.transmission, fromCar: (c) => c.transmission.join(", ") },
  { label: "Body Type", fromRecord: (v) => v.bodyType, fromCar: (c) => c.bodyType },
  { label: "Engine", fromRecord: (v) => v.engineDisplacement, fromCar: (c) => c.engine },
  { label: "Power", fromRecord: (v) => v.enginePower, fromCar: (c) => c.power },
  { label: "Torque", fromRecord: () => null, fromCar: (c) => c.torque },
  { label: "Mileage", fromRecord: () => null, fromCar: (c) => c.mileage },
  { label: "Seats", fromRecord: () => null, fromCar: (c) => String(c.seats) },
  { label: "EV Range", fromRecord: () => null, fromCar: (c) => c.evRange },
  { label: "Battery Capacity", fromRecord: () => null, fromCar: (c) => c.batteryCapacity },
  {
    label: "Launched",
    fromRecord: () => null,
    fromCar: (c) =>
      c.launchDate
        ? new Date(c.launchDate).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
          })
        : null,
  },
  { label: "Manufacturer", fromRecord: (v) => v.manufacturer, fromCar: () => null },
  { label: "Model", fromRecord: (v) => v.model, fromCar: () => null },
  { label: "Variant / Trim", fromRecord: (v) => v.variant, fromCar: () => null },
  { label: "Model Year", fromRecord: (v) => v.modelYear, fromCar: () => null },
  { label: "Drive Type", fromRecord: (v) => v.driveType, fromCar: () => null },
  { label: "Vehicle Type", fromRecord: (v) => v.vehicleType, fromCar: () => null },
  { label: "Registration", fromRecord: (v) => formatRegistration(v.registrationNumber), fromCar: () => null },
  { label: "State", fromRecord: (v) => v.state, fromCar: () => null },
  { label: "RTO Code", fromRecord: (v) => v.rtoCode, fromCar: () => null },
];

type CompareItem = NewCar | VehicleRecord;

function isCar(item: CompareItem): item is NewCar {
  return "slug" in item;
}

function rowValue(row: RowSpec, item: CompareItem): string | null {
  return isCar(item) ? row.fromCar(item) : row.fromRecord(item);
}

function itemTitle(item: CompareItem): string | null {
  if (isCar(item)) return `${item.brand} ${item.model}`;
  return (
    [item.manufacturer, item.model].filter(Boolean).join(" ") ||
    item.registrationNumber ||
    item.vin ||
    null
  );
}

function itemSubtitle(item: CompareItem): string | null {
  if (isCar(item)) return item.priceDisplay;
  return formatRegistration(item.registrationNumber) ?? item.vin;
}

export function ComparePage() {
  const [refresh, setRefresh] = useState(0);
  const [searchParams] = useSearchParams();

  const newCars = useMemo(
    () =>
      searchParams
        .getAll("id")
        .map((id) => carService.getBySlug(id))
        .filter((c): c is NewCar => Boolean(c))
        .slice(0, 2),
    [searchParams]
  );
  const vehicles = useMemo(() => getCompareList(), [refresh]);

  const mode: "new-cars" | "records" = newCars.length > 0 ? "new-cars" : "records";
  const items: CompareItem[] = mode === "new-cars" ? newCars : vehicles;

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
        {mode === "records" && items.length > 0 && (
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

      {items.length === 0 ? (
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
            {items.map((item) => (
              <div
                key={isCar(item) ? item.id : item.id}
                className="rounded-lg border border-border bg-card p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-display font-semibold">
                      {itemTitle(item)}
                    </p>
                    <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                      {itemSubtitle(item)}
                    </p>
                    {!isCar(item) && item.isMock && (
                      <Badge variant="warning" className="mt-2">
                        Mock
                      </Badge>
                    )}
                  </div>
                  {mode === "records" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0"
                      aria-label={`Remove ${itemTitle(item) ?? item.id} from comparison`}
                      onClick={() => {
                        removeFromCompare(item.id);
                        setRefresh((r) => r + 1);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {items.length < 2 && (
              <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-card/40">
                <Link
                  to={mode === "new-cars" ? "/new-cars" : "/vehicle"}
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
              const a = items[0];
              const b = items[1];
              const aVal = a ? rowValue(row, a) : null;
              const bVal = b ? rowValue(row, b) : null;
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
                  {b ? (
                    <Cell value={bVal} highlight={differs} />
                  ) : (
                    <div className="flex items-center justify-center rounded-lg border border-dashed border-border/40 bg-card/20 py-3 text-center text-xs text-muted-foreground/50">
                      Add a second vehicle
                    </div>
                  )}
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