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
    title: "Registration Lookup",
    text: "Enter an Indian registration number to view available vehicle records.",
    badge: "Where supported",
  },
  {
    icon: FileSearch,
    title: "VIN Decoder",
    text: "Decode a 17-character VIN into manufacturer, model, year and specs.",
    badge: "NHTSA vPIC",
  },
  {
    icon: ClipboardList,
    title: "Vehicle Specs",
    text: "View manufacturer, model, engine, fuel and body information.",
    badge: "Provider dependent",
  },
  {
    icon: Landmark,
    title: "RTO Directory",
    text: "Find RTO offices, codes and cities across India.",
    badge: "Public data",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Enter Vehicle Number",
    text: "Enter a supported registration number or a 17-character VIN.",
  },
  {
    step: "02",
    title: "We Check Available Data",
    text: "The application queries an available vehicle data provider.",
  },
  {
    step: "03",
    title: "View Vehicle Information",
    text: "See the information returned by the provider in a clean dashboard.",
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(60rem 30rem at 50% -10%, hsl(var(--primary) / 0.14), transparent 60%), radial-gradient(40rem 20rem at 85% 10%, hsl(var(--accent) / 0.08), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-6 flex flex-col items-center gap-5">
              <Logo size="lg" className="opacity-95" />
              <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                Publicly available data only
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl"
            >
              Know Your <span className="text-gradient">Vehicle.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground"
            >
              Check vehicle specifications, registration information and
              available vehicle records in one place.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-card/70 p-5 shadow-glow backdrop-blur-xl sm:p-6"
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {LOOKUP_TYPES.map((item, i) => (
            <motion.div key={item.title} variants={fadeUp} custom={i}>
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/40">
                <CardContent className="p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-[1.375rem] w-[1.375rem] text-primary" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold">{item.title}</h3>
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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Our data principles">
        <div className="grid gap-4 rounded-2xl border border-border bg-card/50 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
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
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-start gap-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" aria-hidden />
              </span>
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-card/30 py-16" aria-labelledby="how-it-works">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 id="how-it-works" className="font-display text-2xl font-bold sm:text-3xl">
              How It Works
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              From a vehicle number to a clean information dashboard in seconds.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="relative rounded-2xl border border-border bg-card p-6"
              >
                <span className="font-display text-4xl font-extrabold text-primary/20">
                  {step.step}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
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
            <Badge variant="secondary" className="mb-4">
              What you can see
            </Badge>
            <h2 id="categories" className="font-display text-2xl font-bold sm:text-3xl">
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {INFO_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5"
              >
                <CheckCircle2 className="h-[1.125rem] w-[1.125rem] shrink-0 text-success" aria-hidden />
                <span className="text-sm font-medium">{cat}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RTO lookup */}
      <section className="border-y border-border bg-card/30 py-16" aria-labelledby="rto-section">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <Badge variant="secondary" className="mb-4">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              RTO Directory
            </Badge>
            <h2 id="rto-section" className="font-display text-2xl font-bold sm:text-3xl">
              Find RTO details by code, city or state
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Browse a curated directory of standardized public RTO codes,
              offices and cities across India — including Pune (MH-12), Mumbai
              (MH-01) and Bengaluru (KA-01).
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
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
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <MapPin className="h-3 w-3 text-muted-foreground" aria-hidden />
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
            className="grid w-full max-w-sm grid-cols-2 gap-4"
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
                className="group rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40"
              >
                <span className="font-mono text-lg font-bold text-primary">{rto.code}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{rto.label}</span>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Compare */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="compare-section">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 md:flex-row md:items-center"
        >
          <div className="max-w-lg">
            <Badge variant="secondary" className="mb-4">
              <GitCompareArrows className="h-3.5 w-3.5" aria-hidden />
              Comparison
            </Badge>
            <h2 id="compare-section" className="font-display text-2xl font-bold">
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
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="saved-section">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-card/50 p-8 md:flex-row md:items-center"
        >
          <div className="max-w-lg">
            <Badge variant="secondary" className="mb-4">
              <Bookmark className="h-3.5 w-3.5" aria-hidden />
              Your library
            </Badge>
            <h2 id="saved-section" className="font-display text-2xl font-bold">
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
      <section className="border-t border-border bg-card/30 py-16" aria-labelledby="home-faq">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <HelpCircle className="h-3.5 w-3.5" aria-hidden />
              FAQ
            </Badge>
            <h2 id="home-faq" className="font-display text-2xl font-bold sm:text-3xl">
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
          className="rounded-2xl border border-border bg-muted/40 p-6"
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
