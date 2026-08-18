import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Building2,
  ClipboardList,
  FileCheck2,
  Gauge,
  Landmark,
  ShieldCheck,
} from "lucide-react";

import type { VehicleRecord } from "@/lib/types";
import { isAvailable } from "@/lib/format";
import { formatRegistration } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FieldGrid, type FieldItem } from "./FieldGrid";

interface VehicleDashboardProps {
  record: VehicleRecord;
}

function overviewFields(record: VehicleRecord): FieldItem[] {
  return [
    { label: "Manufacturer", value: record.manufacturer },
    { label: "Make", value: record.make },
    { label: "Model", value: record.model },
    { label: "Variant / Trim", value: record.variant },
    { label: "Model Year", value: record.modelYear },
    { label: "Vehicle Type", value: record.vehicleType },
    { label: "Body Type", value: record.bodyType },
    { label: "Fuel Type", value: record.fuelType },
    { label: "Transmission", value: record.transmission },
    { label: "Drive Type", value: record.driveType },
    { label: "Colour", value: record.color },
    { label: "Plant City", value: record.plantCity },
  ];
}

function engineFields(record: VehicleRecord): FieldItem[] {
  return [
    { label: "Engine", value: record.engine },
    { label: "Displacement", value: record.engineDisplacement },
    { label: "Cylinders", value: record.engineCylinders },
    { label: "Power", value: record.enginePower },
    { label: "Torque", value: record.torque },
    { label: "Cooling", value: record.coolingType },
    { label: "Engine Code", value: record.engineCode },
    { label: "Mileage (claimed)", value: record.mileage },
  ];
}

function registrationFields(record: VehicleRecord): FieldItem[] {
  return [
    { label: "Registration Number", value: formatRegistration(record.registrationNumber) },
    { label: "Registration Date", value: record.registrationDate },
    { label: "Registration Expiry", value: record.registrationExpiry },
    { label: "Registration Authority", value: record.registrationAuthority },
    { label: "RTO Code", value: record.rtoCode },
    { label: "RTO Office", value: record.rtoName },
    { label: "State", value: record.state },
    { label: "City", value: record.city },
  ];
}

function complianceFields(record: VehicleRecord): FieldItem[] {
  return [
    { label: "Insurance Status", value: record.insuranceStatus },
    { label: "Insurance Expiry", value: record.insuranceExpiry },
    { label: "PUC Status", value: record.pucStatus },
    { label: "PUC Expiry", value: record.pucExpiry },
    { label: "Fitness Status", value: record.fitnessStatus },
  ];
}

function ownershipFields(record: VehicleRecord): FieldItem[] {
  return [
    { label: "Owner Information", value: record.ownerInfo },
    { label: "Hypothecation", value: record.hypothecation },
  ];
}

export function VehicleDashboard({ record }: VehicleDashboardProps) {
  const hasSpecs = [
    record.engineDisplacement,
    record.enginePower,
    record.engineCylinders,
    record.mileage,
    record.driveType,
  ].some(isAvailable);

  const hasRegistration = [
    record.registrationNumber,
    record.registrationDate,
    record.rtoCode,
    record.rtoName,
    record.state,
  ].some(isAvailable);

  const hasCompliance = [
    record.insuranceStatus,
    record.pucStatus,
    record.fitnessStatus,
  ].some(isAvailable);

  const hasRto = isAvailable(record.rtoCode) || isAvailable(record.rtoName);

  const hasOwnership =
    isAvailable(record.ownerInfo) || isAvailable(record.hypothecation);

  const tabs: { value: string; label: string; icon: typeof Gauge; show: boolean }[] = [
    { value: "overview", label: "Overview", icon: Gauge, show: true },
    { value: "specs", label: "Specifications", icon: ClipboardList, show: hasSpecs },
    { value: "registration", label: "Registration", icon: FileCheck2, show: hasRegistration },
    { value: "compliance", label: "Compliance", icon: ShieldCheck, show: hasCompliance },
    { value: "rto", label: "RTO", icon: Landmark, show: hasRto },
    { value: "ownership", label: "Ownership", icon: Building2, show: hasOwnership },
  ].filter((t) => t.show);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <p className="kicker mb-3 text-center">
        CarTrace — Trace It. Know It. Trust It.
      </p>
      <Tabs defaultValue={tabs[0].value}>
        <TabsList className="flex h-auto flex-wrap gap-1 p-1.5" aria-label="Vehicle details">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              <tab.icon className="h-3.5 w-3.5" aria-hidden />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <Section title="Vehicle Overview">
            <FieldGrid fields={overviewFields(record)} />
          </Section>
        </TabsContent>

        <TabsContent value="specs">
          <Section title="Engine Information">
            <FieldGrid fields={engineFields(record)} />
          </Section>
        </TabsContent>

        <TabsContent value="registration">
          <Section title="Registration Information">
            <FieldGrid fields={registrationFields(record)} />
            {(isAvailable(record.rtoCode) || isAvailable(record.rtoName)) && (
              <div className="mt-4 flex flex-col gap-4 rounded-xl border border-border bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                    {record.rtoCode ?? "RTO"}
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Registered under
                    </p>
                    <p className="mt-0.5 font-medium">
                      {record.rtoName ?? "Regional Transport Office"}
                    </p>
                    {(isAvailable(record.city) || isAvailable(record.state)) && (
                      <p className="text-sm text-muted-foreground">
                        {[record.city, record.state].filter(Boolean).join(", ")}
                      </p>
                    )}
                  </div>
                </div>
                {record.rtoCode && (
                  <Link
                    to={`/rto/${encodeURIComponent(record.rtoCode)}`}
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/50"
                  >
                    View RTO Information <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            )}
          </Section>
        </TabsContent>

        <TabsContent value="compliance">
          <Section title="Compliance">
            <FieldGrid fields={complianceFields(record)} />
            <p className="mt-3 text-xs text-muted-foreground">
              Insurance, PUC and fitness details are shown only when the selected
              data provider publicly supplies them. Availability and privacy rules
              vary by provider and jurisdiction.
            </p>
          </Section>
        </TabsContent>

        <TabsContent value="rto">
          <Section
            title="RTO Information"
            extra={
              record.rtoCode ? (
                <Link
                  to={`/rto/${encodeURIComponent(record.rtoCode)}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-primary/50"
                >
                  View RTO Information <span aria-hidden>→</span>
                </Link>
              ) : undefined
            }
          >
            <FieldGrid
              columns={3}
              fields={[
                { label: "RTO Code", value: record.rtoCode },
                { label: "Office", value: record.rtoName },
                { label: "State", value: record.state },
                { label: "City", value: record.city },
                { label: "Registration Authority", value: record.registrationAuthority },
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="ownership">
          <Section title="Ownership / Hypothecation">
            <FieldGrid fields={ownershipFields(record)} />
            <p className="mt-3 text-xs text-muted-foreground">
              Owner and hypothecation details are displayed only if legally and
              publicly supplied by the provider. When available, owner names are
              masked for privacy (for example <span className="font-mono">R*** H***</span>)
              and only non-sensitive details are shown. Data availability and
              privacy rules vary by provider and jurisdiction — {`don't`} rely on
              this for legal ownership verification.
            </p>
          </Section>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

function Section({
  title,
  extra,
  children,
}: {
  title: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex-row flex-wrap items-center justify-between gap-2 space-y-0 pb-4">
        <CardTitle>{title}</CardTitle>
        {extra}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
