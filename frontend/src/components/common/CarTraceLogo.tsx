import { Link } from "react-router-dom";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Logo, type LogoSize } from "./Logo";

interface CarTraceLogoProps {
  size?: LogoSize;
  /** Applied to the wrapping home link (spacing, layout). */
  className?: string;
  /** Applied to the logo image itself. */
  logoClassName?: string;
}

/**
 * The single, reusable CarTrace brand link used across the whole site.
 * Clicking it always goes to the homepage via client-side routing (no page
 * reload), scrolls to the top, and shows a subtle hover effect.
 */
export function CarTraceLogo({
  size = "md",
  className,
  logoClassName,
}: CarTraceLogoProps) {
  return (
    <Link
      to="/"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label={`${SITE.name} home`}
      title={SITE.name}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center transition-opacity duration-200 hover:opacity-80",
        className
      )}
    >
      <Logo size={size} className={logoClassName} />
    </Link>
  );
}