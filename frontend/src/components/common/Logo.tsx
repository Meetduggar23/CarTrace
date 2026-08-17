import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SIZES = {
  /** Navbar brand */
  sm: "h-9",
  /** Footer brand */
  md: "h-10",
  /** Auth pages */
  lg: "h-14",
  /** Loading screens, 404 */
  xl: "h-20",
} as const;

export type LogoSize = keyof typeof SIZES;

interface LogoProps {
  size?: LogoSize;
  className?: string;
}

/**
 * Renders the site logo (a wide lockup image) at a fixed height with
 * automatic width. The logo file lives in `public/logo.png`.
 */
export function Logo({ size = "md", className }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt={`${SITE.name} logo`}
      title={SITE.name}
      draggable={false}
      className={cn("w-auto object-contain select-none", SIZES[size], className)}
    />
  );
}
