import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { CarTraceLogo } from "@/components/common/CarTraceLogo";

interface AuthShellProps {
  /** Short brand tagline shown under the logo on the navy band. */
  tagline: string;
  title: string;
  description: string;
  /** When true, replaces the form with a success view. */
  success?: boolean;
  successTitle: string;
  successMessage: string;
  children: React.ReactNode;
}

/**
 * Shared premium shell for the standalone auth pages: a navy brand band
 * (logo + tagline) on top of a white card, with a success view for the
 * post-submit state before redirecting home.
 */
export function AuthShell({
  tagline,
  title,
  description,
  success = false,
  successTitle,
  successMessage,
  children,
}: AuthShellProps) {
  return (
    <div className="bg-[#F7F8FA]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-center px-4 py-10 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="overflow-hidden rounded-3xl border border-border bg-white shadow-[0_24px_60px_-24px_rgba(20,40,61,0.25)]"
        >
          {/* Navy brand band */}
          <div className="bg-[hsl(var(--surface-dark))] px-8 pb-6 pt-8 text-center">
            <CarTraceLogo size="md" className="justify-center" />
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--on-dark-soft))]">
              {tagline}
            </p>
          </div>

          <div className="px-6 py-7 sm:px-8">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center py-6 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle2 className="h-7 w-7 text-success" aria-hidden />
                </span>
                <h1 className="mt-4 font-display text-xl font-semibold tracking-tight">
                  {successTitle}
                </h1>
                <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">{successMessage}</p>
              </motion.div>
            ) : (
              <>
                <h1 className="font-display text-2xl font-medium tracking-tight">{title}</h1>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                <div className="mt-6">{children}</div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
