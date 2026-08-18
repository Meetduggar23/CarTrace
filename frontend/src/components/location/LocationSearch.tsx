import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Glass search field for the location selector — filters states/UTs
 * instantly. Frosted white glass that picks up a restrained gold ring
 * and glow on focus.
 */
export function LocationSearch({ value, onChange, className }: LocationSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#14283D]/40"
        aria-hidden
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search state or union territory..."
        aria-label="Search state or union territory"
        autoFocus
        className="h-11 rounded-xl border-[rgba(20,40,61,0.15)] bg-[rgba(255,255,255,0.55)] pl-10 pr-10 text-[#14283D] shadow-[inset_0_1px_2px_rgba(20,40,61,0.04)] backdrop-blur-[10px] transition-all duration-300 placeholder:text-[#14283D]/40 focus-visible:border-[#D4AF37] focus-visible:ring-[#D4AF37]/25 focus-visible:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#14283D]/50 transition-colors hover:bg-white/50 hover:text-[#14283D]"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      )}
    </div>
  );
}
