import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bookmark,
  Car,
  CarFront,
  CheckCircle2,
  ClipboardList,
  Database,
  FileSearch,
  FlaskConical,
  GitCompareArrows,
  HelpCircle,
  Landmark,
  Lock,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Logo } from "@/components/common/Logo";
import { Seo } from "@/components/common/Seo";
import { SearchForm } from "@/components/search/SearchForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FAQ_ITEMS } from "@/lib/faq";
import { SITE } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const LOOKUP_TYPES = [
  {
    icon: CarFront,
    image: "/images/inspection-automobile.jpg",
    alt: "Automobile being inspected in a workshop",
    title: "Registration Lookup",
    text: "Enter an Indian registration number to view available vehicle records.",
    badge: "Where supported",
  },
  {
    icon: FileSearch,
    image: "/images/car-mechanic.jpg",
    alt: "Mechanic inspecting a car engine",
    title: "VIN Decoder",
    text: "Decode a 17-character VIN into manufacturer, model, year and specs.",
    badge: "NHTSA vPIC",
  },
  {
    icon: ClipboardList,
    image: "/images/workshop-garage.jpg",
    alt: "Vehicle workshop garage",
    title: "Vehicle Specs",
    text: "View manufacturer, model, engine, fuel and body information.",
    badge: "Provider dependent",
  },
  {
    icon: Landmark,
    image: "/images/mechanic-inspection.jpg",
    alt: "Mechanic carrying out a meticulous vehicle inspection",
    title: "RTO Directory",
    text: "Find RTO offices, codes and cities across India.",
    badge: "Public data",
  },
];

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Public data only",
    text: "We only show what supported public/API sources actually return.",
  },
  {
    icon: FlaskConical,
    title: "No fabricated details",
    text: "Missing fields show as 'Not available from this source' — never invented values.",
  },
  {
    icon: Database,
    title: "Source transparency",
    text: "Every result names its provider and when the data was retrieved.",
  },
  {
    icon: Lock,
    title: "Privacy-first",
    text: "Vehicle search works without an account; owner details are never exposed.",
  },
];

const INFO_CATEGORIES = [
  "Manufacturer & Model",
  "Model Year & Variant",
  "Fuel & Engine",
  "Vehicle Type & Body",
  "Registration Details",
  "RTO Information",
];

export function HomePage() {
  return (
    <div>
      <Seo />

      {/* Hero — dark band over the photo, cream body below (Anthropic rhythm) */}
      <section className="relative overflow-hidden bg-[hsl(var(--surface-dark))]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          aria-hidden
          style={{ backgroundImage: "url(/images/bg.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--surface-dark)/0.85)] via-[hsl(var(--surface-dark)/0.7)] to-[hsl(var(--surface-dark))]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(60rem 30rem at 50% -10%, hsl(var(--primary) / 0.18), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-6">
              <Logo size="lg" className="opacity-95" />
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-[hsl(var(--on-dark))] sm:text-6xl lg:text-7xl"
            >
              Know Your <span className="text-gradient">Vehicle.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[hsl(var(--on-dark-soft))]"
            >
              Check vehicle specifications, registration information and
              available vehicle records in one place.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mx-auto mt-10 max-w-2xl rounded-md border border-border bg-card/70 p-5 backdrop-blur-xl sm:p-6"
          >
            <SearchForm size="lg" autoFocus />
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Only publicly available information supported by the selected data
              provider is displayed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lookup types */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="lookup-types">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 id="lookup-types" className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
            What vehicle details can you check online?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Pick a lookup below to see what publicly available information is returned for a
            vehicle.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {LOOKUP_TYPES.map((item, i) => (
            <motion.div key={item.title} variants={fadeUp} custom={i}>
              <Card className="h-full overflow-hidden transition-colors hover:border-primary/40">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10">
                    <item.icon className="h-[1.375rem] w-[1.375rem] text-primary" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-medium tracking-tight">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.text}</p>
                  <Badge variant="muted" className="mt-3">
                    {item.badge}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trust band */}
      <section className="border-y border-border" aria-label="Our data principles">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-start gap-3"
              >
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Information categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="categories">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="kicker mb-4">What you can see</p>
            <h2 id="categories" className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Vehicle information categories
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Each section only appears when the selected provider actually
              returns that data — {`AutoCheck`} never invents vehicle
              information.
            </p>
            <Link to="/vehicle">
              <Button className="mt-6">
                Check a vehicle <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </Link>
          </motion.div>
          <ul className="divide-y divide-border">
            {INFO_CATEGORIES.map((cat, i) => (
              <motion.li
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex items-center gap-3 py-3.5"
              >
                <CheckCircle2 className="h-[1.125rem] w-[1.125rem] shrink-0 text-success" aria-hidden />
                <span className="text-sm font-medium">{cat}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* RTO lookup */}
      <section className="border-y border-border py-16" aria-labelledby="rto-section">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <p className="kicker mb-4 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              RTO Directory
            </p>
            <h2 id="rto-section" className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Find RTO details by code, city or state
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Browse a curated directory of standardized public RTO codes,
              offices and cities across India — including Pune (MH-12), Mumbai
              (MH-01) and Bengaluru (KA-01).
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {[
                { label: "Delhi", href: "/rto/state/DL" },
                { label: "Pune", href: "/rto/city/Pune" },
                { label: "Maharashtra", href: "/rto/state/MH" },
                { label: "Uttar Pradesh", href: "/rto/state/UP" },
                { label: "Karnataka", href: "/rto/state/KA" },
                { label: "Rajasthan", href: "/rto/state/RJ" },
              ].map((chip) => (
                <Link
                  key={chip.href}
                  to={chip.href}
                  className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  {chip.label}
                </Link>
              ))}
            </div>
            <Link to="/rto">
              <Button variant="outline" className="mt-6">
                Open RTO directory <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-sm divide-y divide-border"
          >
            {[
              { code: "MH-12", label: "Pune City" },
              { code: "MH-14", label: "Pimpri Chinchwad" },
              { code: "KA-01", label: "Bengaluru" },
              { code: "RJ-14", label: "Jalore" },
            ].map((rto) => (
              <Link
                key={rto.code}
                to={`/rto/${rto.code}`}
                className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors hover:text-primary"
              >
                <span className="font-mono text-lg font-bold text-primary">{rto.code}</span>
                <span className="text-sm text-muted-foreground transition-colors group-hover:text-primary">
                  {rto.label}
                </span>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Compare */}
      <section className="border-t border-border" aria-labelledby="compare-section">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:px-8"
        >
          <div className="max-w-lg">
            <p className="kicker mb-4 flex items-center gap-1.5">
              <GitCompareArrows className="h-3.5 w-3.5" aria-hidden />
              Comparison
            </p>
            <h2 id="compare-section" className="font-display text-3xl font-medium tracking-tight">
              Compare two vehicles side-by-side
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add vehicles from any result page and see differing specifications
              highlighted in one clean table.
            </p>
          </div>
          <Link to="/compare">
            <Button>
              <GitCompareArrows className="h-4 w-4" aria-hidden />
              Open compare
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Saved vehicles */}
      <section className="border-t border-border" aria-labelledby="saved-section">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:px-8"
        >
          <div className="max-w-lg">
            <p className="kicker mb-4 flex items-center gap-1.5">
              <Bookmark className="h-3.5 w-3.5" aria-hidden />
              Your library
            </p>
            <h2 id="saved-section" className="font-display text-3xl font-medium tracking-tight">
              Keep frequently checked vehicles in one dashboard
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Save vehicles, rename them, and re-check them with one click when
              you create an account.
            </p>
          </div>
          <Link to="/saved">
            <Button variant="outline">
              <Car className="h-4 w-4" aria-hidden />
              My vehicles
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-16" aria-labelledby="home-faq">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="kicker mb-4 flex items-center justify-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5" aria-hidden />
              FAQ
            </p>
            <h2 id="home-faq" className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Honest answers about what {SITE.name} can and cannot show.
            </p>
          </div>
          <Accordion items={FAQ_ITEMS} className="mt-8" />
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-border pt-6"
        >
          <h3 className="flex items-center gap-2 font-display text-sm font-semibold">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
            Privacy & data disclaimer
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Vehicle information depends on the selected data provider and
            regional availability. This platform only displays information made
            available through supported public/API sources and does not
            guarantee the completeness, accuracy, or official status of every
            record. {SITE.name} is not an RTO authority, is not affiliated with
            CarInfo, and does not provide ownership or legal verification.
            Information should be independently verified before making financial
            or legal decisions.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
