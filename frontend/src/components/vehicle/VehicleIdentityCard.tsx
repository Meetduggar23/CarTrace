import { motion } from "framer-motion";
import { BadgeCheck, FlaskConical } from "lucide-react";
import type { VehicleRecord } from "@/lib/types";
import { formatRegistration } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { VehicleIllustration } from "./VehicleIllustration";

interface VehicleIdentityCardProps {
  record: VehicleRecord;
}

function title(record: VehicleRecord): string {
  const parts = [record.manufacturer, record.model].filter(Boolean);
  return parts.join(" ") || record.registrationNumber || record.vin || "Vehicle";
}

export function VehicleIdentityCard({ record }: VehicleIdentityCardProps) {
  const name = title(record);
  const subtitle = [record.variant, record.fuelType].filter(Boolean).join(" · ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card-surface overflow-hidden"
    >
      <div className="relative bg-gradient-to-br from-primary/10 via-transparent to-accent/10 p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {/* Illustration */}
          <div className="flex-1">
            <VehicleIllustration className="h-auto w-full max-w-md" />
          </div>

          {/* Details */}
          <div className="md:w-80">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="success" className="gap-1.5">
                <BadgeCheck className="h-3 w-3" /> Vehicle found
              </Badge>
              {record.isMock && (
                <Badge variant="warning" className="gap-1.5">
                  <FlaskConical className="h-3 w-3" /> Mock data
                </Badge>
              )}
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
              {name}
            </h2>
            {subtitle ? (
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            ) : null}

            <dl className="mt-4 space-y-2 text-sm">
              {record.registrationNumber ? (
                <div className="flex items-center justify-between gap-4 rounded-lg bg-card px-3 py-2">
                  <dt className="text-muted-foreground">Registration</dt>
                  <dd className="min-w-0 break-words font-mono font-semibold tracking-wide">
                    {formatRegistration(record.registrationNumber)}
                  </dd>
                </div>
              ) : null}
              {record.vin ? (
                <div className="flex items-center justify-between gap-4 rounded-lg bg-card px-3 py-2">
                  <dt className="text-muted-foreground">VIN</dt>
                  <dd className="min-w-0 break-words font-mono font-semibold tracking-wide">
                    {record.vin}
                  </dd>
                </div>
              ) : null}
              {record.modelYear ? (
                <div className="flex items-center justify-between gap-4 rounded-lg bg-card px-3 py-2">
                  <dt className="text-muted-foreground">Model Year</dt>
                  <dd className="font-semibold">{record.modelYear}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
