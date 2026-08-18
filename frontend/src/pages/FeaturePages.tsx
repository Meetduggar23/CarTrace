import {
  Bike,
  Car,
  CreditCard,
  Gavel,
  Headset,
  HelpCircle,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { FeaturePlaceholder } from "@/components/common/FeaturePlaceholder";
import { ServiceCard, ServiceLookup } from "@/components/common/ServiceLookup";
import { FieldGrid } from "@/components/vehicle/FieldGrid";
import { formatRegistration } from "@/lib/utils";
import type { VehicleRecord } from "@/lib/types";

function insuranceResult(record: VehicleRecord) {
  return (
    <ServiceCard
      icon={ShieldCheck}
      title="Insurance Information"
      note="Insurance, PUC and fitness status are shown only when the selected data provider publicly supplies them. Availability varies by provider and jurisdiction."
    >
      <FieldGrid
        fields={[
          { label: "Insurance Status", value: record.insuranceStatus },
          { label: "Insurance Expiry", value: record.insuranceExpiry },
          { label: "PUC Status", value: record.pucStatus },
          { label: "PUC Expiry", value: record.pucExpiry },
          { label: "Fitness Status", value: record.fitnessStatus },
          { label: "Vehicle Type", value: record.vehicleType },
        ]}
      />
    </ServiceCard>
  );
}

function fastagResult(record: VehicleRecord) {
  return (
    <ServiceCard
      icon={CreditCard}
      title="FASTag & Toll Information"
      note="FASTag linkage, tag status and toll statements are issued by the NHAI and issuing banks. They aren't part of the public vehicle registers we access, so live FASTag data isn't available here. Below is the compliance information we can verify for this vehicle."
    >
      <FieldGrid
        fields={[
          {
            label: "Registration Number",
            value: formatRegistration(record.registrationNumber),
          },
          { label: "Vehicle Type", value: record.vehicleType },
          { label: "Fitness Status", value: record.fitnessStatus },
          { label: "PUC Status", value: record.pucStatus },
          { label: "Insurance Status", value: record.insuranceStatus },
          { label: "Insurance Expiry", value: record.insuranceExpiry },
        ]}
      />
    </ServiceCard>
  );
}

function challanResult(record: VehicleRecord) {
  return (
    <ServiceCard
      icon={Gavel}
      title="Challan & Compliance Information"
      note="Challan specifics are supplied by traffic authorities and aren't part of the public vehicle registers we access. What we can verify from the register is the vehicle's compliance status below."
    >
      <FieldGrid
        fields={[
          { label: "Fitness Status", value: record.fitnessStatus },
          { label: "PUC Status", value: record.pucStatus },
          { label: "PUC Expiry", value: record.pucExpiry },
          { label: "Insurance Status", value: record.insuranceStatus },
          { label: "Insurance Expiry", value: record.insuranceExpiry },
          { label: "Registration Expiry", value: record.registrationExpiry },
        ]}
      />
    </ServiceCard>
  );
}

function serviceHistoryResult(record: VehicleRecord) {
  return (
    <ServiceCard
      icon={Wrench}
      title="Available Service & Registration History"
      note="Service-centre records (oil changes, repairs, odometer logs) aren't part of the public vehicle registers we access. We show the registration and compliance history that is publicly available for this vehicle."
    >
      <FieldGrid
        fields={[
          {
            label: "Registration Number",
            value: formatRegistration(record.registrationNumber),
          },
          { label: "Registration Date", value: record.registrationDate },
          { label: "Registration Expiry", value: record.registrationExpiry },
          { label: "Model Year", value: record.modelYear },
          { label: "Registration Authority", value: record.registrationAuthority },
          { label: "RTO Office", value: record.rtoName },
        ]}
      />
    </ServiceCard>
  );
}

function usedCarsResult(record: VehicleRecord) {
  return (
    <ServiceCard
      icon={Car}
      title="Used-Car Check"
      note="Used-car listings are coming soon. Before you buy any used car, check its identity and condition signals below — verified from the public register."
    >
      <FieldGrid
        fields={[
          {
            label: "Registration Number",
            value: formatRegistration(record.registrationNumber),
          },
          { label: "Manufacturer", value: record.manufacturer },
          { label: "Model", value: record.model },
          { label: "Variant / Trim", value: record.variant },
          { label: "Model Year", value: record.modelYear },
          { label: "Fuel Type", value: record.fuelType },
          { label: "Transmission", value: record.transmission },
          { label: "Colour", value: record.color },
          { label: "Fitness Status", value: record.fitnessStatus },
          { label: "Registration Expiry", value: record.registrationExpiry },
        ]}
      />
    </ServiceCard>
  );
}

export function ChallanPage() {
  return (
    <ServiceLookup
      icon={Gavel}
      title="Challan Search"
      description="Check traffic challans against a vehicle or registration number."
      path="/challan"
      buttonLabel="Check Challan"
      note="Enter a registration number to check the vehicle's compliance status. Challan specifics come from traffic authorities and aren't in the public registers we access — we show the verified compliance information available."
      renderService={challanResult}
    />
  );
}

export function CarInsurancePage() {
  return (
    <ServiceLookup
      icon={ShieldCheck}
      title="Car Insurance"
      description="Car insurance information and policy validity for your vehicle."
      path="/car-insurance"
      buttonLabel="Check Insurance"
      note="Enter your car's registration number to see its insurance status and expiry, plus PUC and fitness compliance, where the provider publicly supplies them."
      renderService={insuranceResult}
    />
  );
}

export function BikeInsurancePage() {
  return (
    <ServiceLookup
      icon={Bike}
      title="Bike Insurance"
      description="Two-wheeler insurance information and validity checks."
      path="/bike-insurance"
      buttonLabel="Check Insurance"
      note="Enter your two-wheeler's registration number to see its insurance status and expiry, plus PUC and fitness compliance, where the provider publicly supplies them."
      renderService={insuranceResult}
    />
  );
}

export function ServiceHistoryPage() {
  return (
    <ServiceLookup
      icon={Wrench}
      title="Service History"
      description="Track and review a vehicle's service records."
      path="/service-history"
      buttonLabel="Check History"
      note="Enter a registration number to see the registration and compliance history available in public registers. Service-centre records aren't part of those registers — your own recent searches are saved under Search History."
      renderService={serviceHistoryResult}
    />
  );
}

export function UsedCarsPage() {
  return (
    <ServiceLookup
      icon={Car}
      title="Used Cars"
      description="Browse used cars and check their details before buying."
      path="/used-cars"
      buttonLabel="Check Used Car"
      note="Used-car listings are coming soon. For any used car you're considering, enter its registration number to check its identity and condition signals before you buy."
      renderService={usedCarsResult}
    />
  );
}

export function FastagPage() {
  return (
    <ServiceLookup
      icon={CreditCard}
      title="FASTag"
      description="FASTag information, toll payments and vehicle linkage."
      path="/fastag"
      buttonLabel="Check FASTag"
      note="Enter a registration number to check the vehicle's registration and compliance information. FASTag linkage and toll statements are issued by the NHAI and banks, so they aren't available from public vehicle registers."
      renderService={fastagResult}
    />
  );
}

export function ContactPage() {
  return (
    <FeaturePlaceholder
      icon={Headset}
      title="Contact Us"
      description="Get in touch with the CarTrace team."
      path="/contact"
      note="We'd love to hear from you — feature ideas, data suggestions or questions about the information we show. While this page is being set up, explore the site or check the help section."
      actions={[
        { label: "Help & FAQ", to: "/help" },
        { label: "About us", to: "/about" },
        { label: "Check a vehicle", to: "/vehicle" },
      ]}
    />
  );
}

export function HelpPage() {
  return (
    <FeaturePlaceholder
      icon={HelpCircle}
      title="Help"
      description="Help and frequently asked questions."
      path="/help"
      note="Honest answers about what CarTrace can and cannot show. Start with a vehicle check or browse the RTO directory — most questions are answered on those pages."
      actions={[
        { label: "Vehicle check", to: "/vehicle" },
        { label: "RTO directory", to: "/rto" },
        { label: "About us", to: "/about" },
      ]}
    />
  );
}