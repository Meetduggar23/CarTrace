import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  Building2,
  CarFront,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Hash,
  Landmark,
  Loader2,
  MapPin,
  MapPinned,
  ScrollText,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { EmptyState } from "@/components/common/EmptyState";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchForm } from "@/components/search/SearchForm";
import { FAQ_ITEMS } from "@/lib/faq";
import { SITE } from "@/lib/constants";
import { api } from "@/services/api";

const REGION_CHIPS = [
  { label: "Delhi", href: "/rto/state/DL" },
  { label: "Pune", href: "/rto/city/Pune" },
  { label: "Ludhiana", href: "/rto/city/Ludhiana" },
  { label: "Maharashtra", href: "/rto/state/MH" },
  { label: "Uttar Pradesh", href: "/rto/state/UP" },
  { label: "Karnataka", href: "/rto/state/KA" },
  { label: "Punjab", href: "/rto/state/PB" },
  { label: "Rajasthan", href: "/rto/state/RJ" },
  { label: "Gujarat", href: "/rto/state/GJ" },
  { label: "Tamil Nadu", href: "/rto/state/TN" },
];

const HOW_TO = [
  {
    icon: Search,
    title: "Enter a number plate",
    text: "Type a supported registration number or a 17-character VIN in the checker above.",
  },
  {
    icon: Landmark,
    title: "We query public data",
    text: "The app asks the configured data provider — no keys, no signup for the default providers.",
  },
  {
    icon: FileCheck2,
    title: "Review the results",
    text: "See manufacturer, model, year, fuel and any registration details the provider supplies.",
  },
];

const PROCESS_STEPS = [
  {
    icon: FileText,
    title: "Document submission",
    text: "The dealer or owner submits Form 20 (registration application), sale invoice, insurance policy, PUC certificate and identity/address proof.",
  },
  {
    icon: ClipboardCheck,
    title: "Vehicle inspection",
    text: "The vehicle is physically inspected to confirm it matches its records and meets minimum safety and emissions standards.",
  },
  {
    icon: Banknote,
    title: "Fee & tax payment",
    text: "Applicable road tax, registration fees and other charges are paid online or at the RTO counter.",
  },
  {
    icon: Hash,
    title: "Registration number allocation",
    text: "Once documents and payments are verified, the RTO issues a unique registration number — special numbers may go through auction.",
  },
  {
    icon: ScrollText,
    title: "RC issuance",
    text: "A Registration Certificate (paper or smart card) is issued recording owner and vehicle details, class, fuel type, engine and chassis numbers.",
  },
];

const DETAIL_CATEGORIES = [
  {
    title: "Basic vehicle details",
    text: "Make, model, fuel type, vehicle class, manufacturer and variant.",
  },
  {
    title: "Registration information",
    text: "Registration date, validity, registered state and RTO office.",
  },
  {
    title: "Owner information",
    text: "Masked owner details and city — only when legally/publicly supplied, with privacy respected.",
  },
  {
    title: "RC status",
    text: "Active, transferred or cancelled status when the provider supplies it.",
  },
  {
    title: "Insurance details",
    text: "Policy status and expiry — shown only when the provider returns them.",
  },
  {
    title: "Fitness & PUC validity",
    text: "Fitness and PUC validity for commercial vehicles, provider-dependent.",
  },
];

const SERVICES = [
  {
    icon: CarFront,
    title: "Vehicle registration",
    text: "New and renewal registrations handled at every RTO office.",
  },
  {
    icon: ScrollText,
    title: "Driving licenses",
    text: "License issuance, renewal and related services.",
  },
  {
    icon: Building2,
    title: "Vehicle permits",
    text: "Commercial vehicle permits and route authorizations.",
  },
  {
    icon: Banknote,
    title: "Tax collection",
    text: "Road tax and registration fee collection points.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export function RtoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const state = searchParams.get("state") ?? "";
  const city = searchParams.get("city") ?? "";
  const [input, setInput] = useState(q);

  // Debounced input -> query param
  useEffect(() => {
    const t = setTimeout(() => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (input) next.set("q", input);
          else next.delete("q");
          return next;
        },
        { replace: true }
      );
    }, 300);
    return () => clearTimeout(t);
  }, [input, setSearchParams]);

  const query = useQuery({
    queryKey: ["rto", { q, state, city }],
    queryFn: () => api.listRto({ q, state, city }),
    placeholderData: (prev) => prev,
  });

  return (
    <div>
      <Seo
        title="RTO Vehicle Information — Check by Number Plate"
        description="Check RTO vehicle information by number plate. Browse standardized public RTO codes, offices and cities across India — only publicly available data is shown."
        path="/rto"
      />

      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(55rem 28rem at 50% -12%, hsl(var(--primary) / 0.14), transparent 60%), radial-gradient(36rem 20rem at 88% 12%, hsl(var(--accent) / 0.08), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 sm:pt-12 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Link to="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <span aria-hidden>›</span>
            <span className="font-medium text-foreground">RTO Details</span>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            className="mx-auto mt-10 max-w-3xl text-center"
          >
            <motion.div variants={fadeUp} custom={0}>
              <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden />
                RTO vehicle information — public data only
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl"
            >
              Check RTO vehicle information <span className="text-gradient">by number plate</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg"
            >
              Check vehicle information and registration details instantly, and
              browse standardized public RTO codes, offices and cities across
              India.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-10 max-w-2xl rounded-lg border border-border bg-card/70 p-5 backdrop-blur-xl sm:p-6"
          >
            <SearchForm size="lg" />
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Only publicly available information supported by the selected data
              provider is displayed. AutoCheck never fabricates vehicle records.
            </p>
          </motion.div>

          {/* Region quick-select */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mx-auto mt-8 max-w-3xl"
          >
            <p className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Popular regions
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {REGION_CHIPS.map((chip) => (
                <Link
                  key={chip.href}
                  to={chip.href}
                  className="flex items-center gap-1.5 rounded-sm border border-border bg-card px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                  {chip.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ How to check ============ */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="how-to">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="how-to" className="font-display text-2xl font-bold sm:text-3xl">
            How to check vehicle details by number plate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            From a number plate to available vehicle information in seconds.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {HOW_TO.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <step.icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ Directory ============ */}
      <section
        id="directory"
        className="border-y border-border bg-card/30 py-14"
        aria-labelledby="directory-title"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
          >
            <div>
              <Badge variant="secondary" className="mb-3 gap-1.5">
                <Landmark className="h-3.5 w-3.5" aria-hidden /> RTO Directory
              </Badge>
              <h2 id="directory-title" className="font-display text-2xl font-bold sm:text-3xl">
                Browse RTO offices by code, city or state
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                A curated directory of standardized public RTO codes, offices and
                cities across India. Verify official details with your state
                transport department.
              </p>
            </div>
            <Badge variant="muted">
              {query.data ? `${query.data.stats.states} states · ${query.data.stats.total} offices` : "Public data"}
            </Badge>
          </motion.div>

          <div className="relative mt-8 max-w-xl">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search by RTO code, state, city or office (e.g. MH-12, Pune)"
              aria-label="Search RTO directory"
              className="pl-11"
            />
          </div>

          {/* State quick links */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["MH", "DL", "KA", "RJ", "TN", "GJ", "UP", "HR", "PB", "TS", "KL", "WB"].map((code) => (
              <Link
                key={code}
                to={`/rto/state/${code}`}
                className="rounded-sm border border-border bg-card px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
              >
                {code}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            {query.isLoading ? (
              <div className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading RTO directory…
              </div>
            ) : query.isError ? (
              <EmptyState
                icon={Landmark}
                title="Couldn't load the RTO directory"
                description="The directory service is temporarily unavailable. Please try again."
              />
            ) : query.data && query.data.results.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground">
                  {query.data.total} result{query.data.total === 1 ? "" : "s"}
                  {state ? ` in ${state}` : city ? ` in ${city}` : ""}
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {query.data.results.map((rto) => (
                    <li key={rto.code}>
                      <Link
                        to={`/rto/${rto.code}`}
                        className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40"
                      >
                        <span className="flex h-11 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-bold text-primary">
                          {rto.code}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-medium">{rto.officeName}</span>
                          <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" aria-hidden />
                            {rto.city}, {rto.state}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <EmptyState
                icon={Search}
                title="No RTO results"
                description="Try a different search — for example a state code like MH or a city like Pune."
              />
            )}
          </div>
        </div>
      </section>

      {/* ============ Registration process ============ */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="process">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            RTO vehicle registration process in India
          </Badge>
          <h2 id="process" className="font-display text-2xl font-bold sm:text-3xl">
            How a vehicle gets registered with the RTO
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            In India, any newly purchased vehicle must be registered with the RTO
            before it can be driven on the road.
          </p>
        </div>
        <ol className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative rounded-lg border border-border bg-card p-6"
            >
              <span className="absolute right-5 top-5 font-display text-3xl font-extrabold text-primary/15">
                Step {i + 1}
              </span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <step.icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="flex flex-col items-start justify-center rounded-lg border border-dashed border-primary/30 bg-primary/5 p-6"
          >
            <h3 className="font-display text-base font-semibold">
              What details can you check online?
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              See the next section for the categories AutoCheck can surface —
              when the provider supplies them.
            </p>
            <a href="#details" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              View details <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </motion.li>
        </ol>
      </section>

      {/* ============ Details checklist ============ */}
      <section
        id="details"
        className="border-y border-border bg-card/30 py-14"
        aria-labelledby="details-title"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <Badge variant="secondary" className="mb-4">
              <MapPinned className="h-3.5 w-3.5" aria-hidden /> What you can check
            </Badge>
            <h2 id="details-title" className="font-display text-2xl font-bold sm:text-3xl">
              Vehicle details by number plate
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              By entering a registration number or VIN you can review available
              information — each category only renders when the provider returns it.
            </p>
          </motion.div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DETAIL_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3.5"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                <div>
                  <h3 className="text-sm font-semibold">{cat.title}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{cat.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RTO services ============ */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="services">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            Key functions & services of the RTO
          </Badge>
          <h2 id="services" className="font-display text-2xl font-bold sm:text-3xl">
            Services RTOs provide
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            RTOs (Regional Transport Offices) in India offer a wide range of
            services important to vehicle owners.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-lg border border-border bg-card p-5 text-center"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <service.icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <h3 className="mt-3.5 text-sm font-semibold">{service.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{service.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-y border-border bg-card/30 py-14" aria-labelledby="faq">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 id="faq" className="font-display text-2xl font-bold sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Honest answers about what {SITE.name} can and cannot show.
            </p>
          </div>
          <Accordion items={FAQ_ITEMS} className="mt-8" />
        </div>
      </section>

      {/* ============ CTA + disclaimer ============ */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start justify-between gap-6 rounded-lg border border-border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 md:flex-row md:items-center"
        >
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold">
              Check a vehicle now
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Search a registration number or decode a VIN — or browse the RTO
              directory above.
            </p>
          </div>
          <Link to="/vehicle">
            <Button size="lg">
              Check a vehicle <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </Link>
        </motion.div>

        <div className="mt-8 rounded-lg border border-border bg-muted/40 p-6">
          <h3 className="flex items-center gap-2 font-display text-sm font-semibold">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
            Privacy & data disclaimer
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Vehicle information depends on the selected data provider and regional
            availability. This platform only displays information made available
            through supported public/API sources and does not guarantee the
            completeness, accuracy, or official status of every record.{" "}
            {SITE.name} is not an RTO authority, is not affiliated with CarInfo,
            and does not provide ownership or legal verification. Information
            should be independently verified before making financial or legal
            decisions.
          </p>
        </div>
      </section>
    </div>
  );
}
