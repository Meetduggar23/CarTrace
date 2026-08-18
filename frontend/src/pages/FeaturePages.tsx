import { Bike, Car, CreditCard, Gavel, Headset, HelpCircle, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { FeaturePlaceholder } from "@/components/common/FeaturePlaceholder";

export function ChallanPage() {
  return (
    <FeaturePlaceholder
      icon={Gavel}
      title="Challan Search"
      description="Check traffic challans against a vehicle or registration number."
      path="/challan"
      note="Challan lookup shows outstanding traffic violations where the data provider publicly supplies them. Today you can already check a vehicle's registration and compliance details below."
      actions={[
        { label: "Check vehicle", to: "/vehicle" },
        { label: "RC details", to: "/vehicle" },
      ]}
    />
  );
}

export function CarInsurancePage() {
  return (
    <FeaturePlaceholder
      icon={ShieldCheck}
      title="Car Insurance"
      description="Car insurance information and policy validity for your vehicle."
      path="/car-insurance"
      note="Insurance status and expiry are part of a vehicle's compliance record. Check them right now with a registration number or VIN."
      actions={[
        { label: "Check insurance status", to: "/vehicle" },
        { label: "Check a vehicle", to: "/vehicle" },
      ]}
    />
  );
}

export function BikeInsurancePage() {
  return (
    <FeaturePlaceholder
      icon={Bike}
      title="Bike Insurance"
      description="Two-wheeler insurance information and validity checks."
      path="/bike-insurance"
      note="Bike insurance status and expiry are shown as part of a vehicle's compliance record where the provider supplies them. Enter a two-wheeler registration number to check."
      actions={[
        { label: "Check insurance status", to: "/vehicle" },
        { label: "Check a vehicle", to: "/vehicle" },
      ]}
    />
  );
}

export function ServiceHistoryPage() {
  return (
    <FeaturePlaceholder
      icon={Wrench}
      title="Service History"
      description="Track and review a vehicle's service records."
      path="/service-history"
      note="Service history requires service-centre records that are not part of the public vehicle registers we currently access. We show available registration and compliance history today, and your own search history is saved for you."
      actions={[
        { label: "Check vehicle details", to: "/vehicle" },
        { label: "Search history", to: "/history" },
      ]}
    />
  );
}

export function NewCarsPage() {
  return (
    <FeaturePlaceholder
      icon={Sparkles}
      title="New Cars"
      description="Explore new cars and their specifications."
      path="/new-cars"
      note="New-car listings and pricing are coming soon. Until then you can decode and compare the specifications of any new model using the tools below."
      actions={[
        { label: "VIN decoder", to: "/vin-decoder" },
        { label: "Compare cars", to: "/compare" },
        { label: "Check a vehicle", to: "/vehicle" },
      ]}
    />
  );
}

export function UsedCarsPage() {
  return (
    <FeaturePlaceholder
      icon={Car}
      title="Used Cars"
      description="Browse used cars and check their details before buying."
      path="/used-cars"
      note="Used-car listings are coming soon. For any used car you're considering, you can already check its registration details and specifications below."
      actions={[
        { label: "Check a vehicle", to: "/vehicle" },
        { label: "VIN decoder", to: "/vin-decoder" },
      ]}
    />
  );
}

export function FastagPage() {
  return (
    <FeaturePlaceholder
      icon={CreditCard}
      title="FASTag"
      description="FASTag information, toll payments and vehicle linkage."
      path="/fastag"
      note="FASTag linkage and toll statements are issued by the NHAI and banks; they aren't part of the public registers we access. You can verify your vehicle's registration and compliance details below."
      actions={[
        { label: "Check a vehicle", to: "/vehicle" },
        { label: "RC details", to: "/vehicle" },
      ]}
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
