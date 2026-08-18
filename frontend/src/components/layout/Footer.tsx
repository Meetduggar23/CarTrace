import { Link } from "react-router-dom";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Github, Instagram, Linkedin } from "lucide-react";
import { CarTraceLogo } from "@/components/common/CarTraceLogo";
import { TAGLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ─── Data ─────────────────────────────────────────────────────────── */

const PRODUCT_LINKS = [
  { to: "/vehicle", label: "RC Details" },
  { to: "/challan", label: "Challan Search" },
  { to: "/car-insurance", label: "Car Insurance" },
  { to: "/bike-insurance", label: "Bike Insurance" },
  { to: "/service-history", label: "Service History" },
  { to: "/new-cars", label: "New Cars" },
  { to: "/used-cars", label: "Used Cars" },
  { to: "/fastag", label: "FASTag" },
  { to: "/rto", label: "RTO Directory" },
  { to: "/compare", label: "Compare" },
  { to: "/providers", label: "Data Providers" },
];

const TOOL_LINKS = [
  { to: "/vehicle", label: "Vehicle Lookup" },
  { to: "/vin-decoder", label: "VIN Decoder" },
  { to: "/saved", label: "Saved Vehicles" },
  { to: "/history", label: "Search History" },
  { to: "/contact", label: "Contact Us" },
  { to: "/help", label: "Help" },
];

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/about", label: "About & Disclaimer" },
];

const SOCIAL_LINKS = [
  { href: "#", label: "Instagram", icon: Instagram },
  { href: "#", label: "LinkedIn", icon: Linkedin },
  { href: "https://github.com", label: "GitHub", icon: Github },
];

/* ─── Animation Variants ───────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

const staggerColumn: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const linkVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE },
  },
};

const copyrightVariant: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

/* ─── Footer Link Component ────────────────────────────────────────── */

function FooterLink({
  to,
  label,
  external,
}: {
  to: string;
  label: string;
  external?: boolean;
}) {
  return (
    <motion.li variants={linkVariant}>
      <Link
        to={to}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className={cn(
          "group inline-flex items-center gap-1.5 text-[13px] leading-[1.4]",
          "text-[hsl(var(--on-dark-soft))] transition-colors duration-200",
          "hover:text-[#D4AF37]"
        )}
      >
        <span
          aria-hidden
          className="inline-block h-px w-0 bg-[#D4AF37] transition-all duration-200 group-hover:w-2.5"
        />
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          {label}
        </span>
      </Link>
    </motion.li>
  );
}

/* ─── Social Icon Link ─────────────────────────────────────────────── */

function SocialIcon({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={cn(
        "group inline-flex h-8 w-8 items-center justify-center rounded-md",
        "border border-[hsl(var(--on-dark)/0.15)] text-[hsl(var(--on-dark-soft))]",
        "transition-all duration-200",
        "hover:border-[#D4AF37]/50 hover:text-[#D4AF37]",
        "hover:shadow-[0_0_12px_rgba(212,175,55,0.15)]"
      )}
    >
      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </a>
  );
}

/* ─── Main Footer ──────────────────────────────────────────────────── */

export function Footer() {
  const reduced = useReducedMotion();

  return (
    <motion.footer
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
      className="relative overflow-hidden bg-[hsl(var(--surface-dark))] text-[hsl(var(--on-dark))]"
    >
      {/* ── Ambient gradients ── */}
      <motion.div variants={fadeIn} aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#D4AF37]/[0.04] blur-3xl" />
        <div className="absolute -bottom-20 -right-24 h-80 w-80 rounded-full bg-primary/[0.05] blur-3xl" />
      </motion.div>

      {/* ── Gold hairline at top ── */}
      <motion.div
        aria-hidden
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative h-px w-full origin-left bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"
      />

      {/* ── Main content ── */}
      <div className="relative mx-auto max-w-7xl px-4 pt-[60px] pb-[28px] sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr]">
          {/* ── Brand Column ── */}
          <motion.div variants={staggerColumn} className="flex flex-col gap-4">
            <motion.div variants={fadeUp}>
              <CarTraceLogo size="md" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="max-w-xs text-[11px] font-medium tracking-wide text-[hsl(var(--on-dark-soft))]"
            >
              {TAGLINES.trace}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="max-w-xs text-[13px] leading-relaxed text-[hsl(var(--on-dark-soft))]"
            >
              Check vehicle specifications, registration information and available
              vehicle records in one place.
            </motion.p>

            {/* Premium CTA */}
            <motion.div variants={fadeUp} className="mt-1">
              <div
                className={cn(
                  "inline-flex max-w-xs flex-col gap-1.5 rounded-lg border border-[#D4AF37]/20 p-3",
                  "bg-gradient-to-br from-[#D4AF37]/[0.06] to-transparent"
                )}
              >
                <span className="text-[13px] font-semibold text-[#D4AF37]">
                  Know Your Vehicle?
                </span>
                <span className="text-[12px] leading-snug text-[hsl(var(--on-dark-soft))]">
                  Check available vehicle information in seconds.
                </span>
                <Link
                  to="/vehicle"
                  className={cn(
                    "mt-1 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#D4AF37]",
                    "transition-all duration-200 hover:gap-2.5"
                  )}
                >
                  Check Vehicle
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Social / Connect */}
            <motion.div variants={fadeUp} className="mt-1">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[hsl(var(--on-dark-soft))]">
                Connect
              </p>
              <div className="flex gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <SocialIcon key={s.label} {...s} />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Product Column ── */}
          <motion.nav
            aria-label="Product"
            variants={staggerColumn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3
              variants={fadeUp}
              className="text-[13px] font-semibold text-[hsl(var(--on-dark))]"
            >
              Product
            </motion.h3>
            <motion.ul variants={staggerColumn} className="mt-3 space-y-[11px]">
              {PRODUCT_LINKS.map((link) => (
                <FooterLink key={link.to} {...link} />
              ))}
            </motion.ul>
          </motion.nav>

          {/* ── Tools Column ── */}
          <motion.nav
            aria-label="Tools"
            variants={staggerColumn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3
              variants={fadeUp}
              className="text-[13px] font-semibold text-[hsl(var(--on-dark))]"
            >
              Tools
            </motion.h3>
            <motion.ul variants={staggerColumn} className="mt-3 space-y-[11px]">
              {TOOL_LINKS.map((link) => (
                <FooterLink key={link.to} {...link} />
              ))}
            </motion.ul>
          </motion.nav>

          {/* ── Legal Column ── */}
          <motion.nav
            aria-label="Legal"
            variants={staggerColumn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3
              variants={fadeUp}
              className="text-[13px] font-semibold text-[hsl(var(--on-dark))]"
            >
              Legal
            </motion.h3>
            <motion.ul variants={staggerColumn} className="mt-3 space-y-[11px]">
              {LEGAL_LINKS.map((link) => (
                <FooterLink key={link.to} {...link} />
              ))}
            </motion.ul>
          </motion.nav>
        </div>

        {/* ── Divider with gold center accent ── */}
        <motion.div variants={fadeIn} className="relative my-6">
          <div className="h-px w-full bg-[hsl(var(--on-dark)/0.1)]" />
          <div className="absolute left-1/2 top-1/2 h-px w-16 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
        </motion.div>

        {/* ── Copyright ── */}
        <motion.div
          variants={copyrightVariant}
          className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <p className="text-[12px] leading-relaxed text-[hsl(var(--on-dark-soft))]">
            &copy; {new Date().getFullYear()} CarTrace. All rights reserved. Made
            by Duggar Pvt Ltd.
          </p>
          <div className="flex gap-4">
            <Link
              to="/privacy"
              className="text-[12px] text-[hsl(var(--on-dark-soft))] transition-colors duration-200 hover:text-[#D4AF37]"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-[12px] text-[hsl(var(--on-dark-soft))] transition-colors duration-200 hover:text-[#D4AF37]"
            >
              Terms
            </Link>
            <Link
              to="/contact"
              className="text-[12px] text-[hsl(var(--on-dark-soft))] transition-colors duration-200 hover:text-[#D4AF37]"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}