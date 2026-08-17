import { field, isAvailable } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface FieldItem {
  label: string;
  value: string | null | undefined;
  /** Highlight when the value differs between compared vehicles. */
  highlighted?: boolean;
}

interface FieldGridProps {
  fields: FieldItem[];
  columns?: 2 | 3;
}

export function FieldGrid({ fields, columns = 2 }: FieldGridProps) {
  return (
    <dl
      className={cn(
        "grid gap-x-6 gap-y-5",
        columns === 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2"
      )}
    >
      {fields.map((f) => {
        const available = isAvailable(f.value);
        return (
          <div
            key={f.label}
            className={cn(
              "rounded-xl border border-border/60 bg-card/40 px-4 py-3 transition-colors",
              f.highlighted && "border-primary/50 bg-primary/5"
            )}
          >
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {f.label}
            </dt>
            <dd
              className={cn(
                "mt-1 text-sm font-medium",
                f.highlighted ? "text-primary" : !available ? "text-muted-foreground/70 italic" : "text-foreground"
              )}
            >
              {field(f.value)}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
