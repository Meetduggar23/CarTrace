import { Link } from "react-router-dom";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CarTraceLogo } from "@/components/common/CarTraceLogo";
import { TAGLINES } from "@/lib/constants";

const COLUMNS: { heading: string; links: { to: string; label: string }[] }[] = [
  {
    heading: "Product",
    links: [
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
    ],
  },
  {
    heading: "Tools",
    links: [
      { to: "/vehicle", label: "Vehicle Lookup" },
      { to: "/vin-decoder", label: "VIN Decoder" },
      { to: "/saved", label: "Saved Vehicles" },
      { to: "/history", label: "Search History" },
      { to: "/contact", label: "Contact Us" },
      { to: "/help", label: "Help" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { to: "/privacy", label: "Privacy" },
      { to: "/terms", label: "Terms" },
      { to: "/about", label: "About & Disclaimer" },
    ],
  },
];

/* Premium, automotive entrance choreography. All movements are transform /
   opacity only — no layout shifting, and the whole sequence runs once when
   the footer scrolls into view. */
const fadeSoft: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const logoVariant: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const linkVariant: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const legalVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const bgFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
};

/* Orchestrators — stagger children only, no movement of their own. */
const staggerColumn: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const staggerList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export function Footer() {
  const reduced = useReducedMotion();

  return (
    <motion.footer
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.07, delayChildren: 0.15 }}
      className="relative overflow-hidden border-t border-[hsl(var(--on-dark)/0.12)] bg-[hsl(var(--surface-dark))] text-[hsl(var(--on-dark))]"
    >
      {/* Subtle ambient navy/gold gradients — fade in, never move */}
      <motion.div
        variants={bgFade}
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-[#D4AF37]/[0.05] blur-3xl" />
        <div className="absolute -bottom-24 -right-32 h-96 w-96 rounded-full bg-primary/[0.07] blur-3xl" />
      </motion.div>

      {/* Gold hairline accent — grows across the top once */}
      <motion.div
        aria-hidden
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-px w-full origin-left bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column: logo → tagline → description */}
          <motion.div variants={staggerColumn}>
            <div className="flex flex-col items-start gap-3">
              <motion.div
                variants={logoVariant}
                whileHover={reduced ? undefined : { scale: 1.03 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="origin-left"
              >
                <CarTraceLogo size="md" />
              </motion.div>
              <motion.span
                variants={fadeSoft}
                className="text-[11px] font-medium tracking-wide text-[hsl(var(--on-dark-soft))]"
              >
                {TAGLINES.trace}
              </motion.span>
            </div>
            <motion.p
              variants={fadeSoft}
              className="mt-4 max-w-sm text-sm text-[hsl(var(--on-dark-soft))]"
            >
              Check vehicle specifications, registration information and available
              vehicle records in one place.
            </motion.p>
          </motion.div>

          {COLUMNS.map((col) => (
            <motion.nav
              key={col.heading}
              aria-label={col.heading}
              variants={staggerColumn}
            >
              <motion.h3
                variants={headingVariant}
                className="text-sm font-semibold text-[hsl(var(--on-dark))]"
              >
                {col.heading}
              </motion.h3>
              <motion.ul variants={staggerList} className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <motion.li key={link.to} variants={linkVariant}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-1.5 text-sm text-[hsl(var(--on-dark-soft))] transition-colors duration-200 hover:text-[#D4AF37]"
                    >
                      <span
                        aria-hidden
                        className="h-px w-2.5 origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-200 group-hover:scale-x-100"
                      />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          ))}
        </div>

        {/* Copyright / legal — appears last */}
        <motion.div
          variants={legalVariant}
          className="mt-10 border-t border-[hsl(var(--on-dark)/0.12)] pt-6"
        >
          <p className="text-center text-xs leading-relaxed text-[hsl(var(--on-dark-soft))]">
            All rights reserved by CarTrace {new Date().getFullYear()} Made By Duggar Pvt Ltd
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}