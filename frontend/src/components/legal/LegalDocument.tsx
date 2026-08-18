import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { CarTraceLogo } from "@/components/common/CarTraceLogo";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/common/Seo";

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

interface LegalDocumentProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
  seoTitle: string;
  seoDescription: string;
  path: string;
}

/**
 * Shared legal-document layout for Terms & Conditions and Privacy Policy.
 *
 * Renders as a clean, full-width professional document — NOT a card-based
 * page. Only a centered logo, a "Back to Home" link and the document itself,
 * with left-aligned content and no visible container around it.
 */
export function LegalDocument({
  title,
  subtitle,
  lastUpdated,
  sections,
  seoTitle,
  seoDescription,
  path,
}: LegalDocumentProps) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Seo title={seoTitle} description={seoDescription} path={path} />

      {/* Legal header — deep navy like the site navbar, just logo + back link */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[hsl(var(--surface-dark))] text-[hsl(var(--on-dark))]">
        <div className="relative mx-auto flex h-20 max-w-[1200px] items-center justify-center px-4 sm:px-6">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 sm:left-6"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--on-dark-soft))] transition-colors hover:text-[hsl(var(--on-dark))]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <CarTraceLogo size="sm" className="justify-center" />
          </motion.div>
        </div>
      </header>

      {/* Document — full-width, no card, no container background */}
      <motion.main
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-10 sm:px-6 sm:py-14 lg:px-8"
      >
        {/* Document title block — centered */}
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#14283D] sm:text-4xl">
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            {subtitle}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Legal content — left aligned, natural document flow */}
        <div className="mt-12 sm:mt-14">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className="border-t border-border/50 pt-12 first:border-t-0 first:pt-0"
            >
              <h2 className="flex items-baseline gap-3 font-display text-xl font-bold tracking-tight text-[#14283D] sm:text-2xl">
                <span className="shrink-0 text-[#D4AF37]">{index + 1}.</span>
                <span>{section.title}</span>
              </h2>
              <div className="mt-5 space-y-5">
                {section.paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base leading-[1.8] text-[#14283D]/80 sm:text-[17px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </motion.main>

      {/* Site footer — matches the home page */}
      <Footer />
    </div>
  );
}