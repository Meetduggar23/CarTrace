import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/** Search field for the location selector — filters states/UTs instantly. */
export function LocationSearch({ value, onChange, className }: LocationSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#18212B]/40"
        aria-hidden
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search state or union territory..."
        aria-label="Search state or union territory"
        autoFocus
        className="h-11 rounded-xl border-[#E5E7EB] bg-white pl-10 pr-10 text-[#18212B] shadow-sm placeholder:text-[#18212B]/40 focus-visible:border-primary focus-visible:ring-primary/30"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#18212B]/50 transition-colors hover:bg-[#14283D]/5 hover:text-[#18212B]"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      )}
    </div>
  );
}
