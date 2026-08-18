import type { CarVariant } from "@/lib/cars";
import { cn } from "@/lib/utils";

interface VariantTableProps {
  variants: CarVariant[];
}

/**
 * Responsive table showing all car variants with fuel, transmission and price.
 * On mobile, each variant becomes a stacked card instead of a table row.
 */
export function VariantTable({ variants }: VariantTableProps) {
  if (variants.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {/* Desktop table */}
      <div className="hidden sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Variant
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Fuel
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Transmission
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Engine
              </th>
              <th className="px-4 py-3 text-right font-semibold text-foreground">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {variants.map((v, i) => (
              <tr
                key={`${v.name}-${v.fuel}-${i}`}
                className={cn(
                  "border-b border-border/50 transition-colors hover:bg-primary/5",
                  i % 2 === 0 ? "bg-card" : "bg-card/40"
                )}
              >
                <td className="px-4 py-3 font-medium text-foreground">
                  {v.name}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{v.fuel}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {v.transmission}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{v.engine}</td>
                <td className="px-4 py-3 text-right font-semibold text-[#14283D]">
                  ₹{(v.price / 100000).toFixed(2)} Lakh*
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="sm:hidden">
        {variants.map((v, i) => (
          <div
            key={`${v.name}-${v.fuel}-${i}`}
            className={cn(
              "border-b border-border/50 px-4 py-3",
              i % 2 === 0 ? "bg-card" : "bg-card/40"
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-foreground">{v.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {v.fuel} · {v.transmission}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {v.engine}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-[#14283D]">
                ₹{(v.price / 100000).toFixed(2)} Lakh*
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
