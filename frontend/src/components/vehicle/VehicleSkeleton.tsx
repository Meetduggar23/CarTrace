import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export function VehicleSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      aria-label="Loading vehicle information"
      role="status"
    >
      <Skeleton className="h-64 w-full rounded-lg" />
      <Skeleton className="h-12 w-full max-w-md rounded-xl" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-border bg-card p-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading vehicle information…</span>
    </motion.div>
  );
}
