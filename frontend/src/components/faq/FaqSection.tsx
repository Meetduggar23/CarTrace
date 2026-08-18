import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { FAQ_ITEMS, type FaqItem } from "@/lib/faq";
import { CarTraceLogo } from "@/components/common/CarTraceLogo";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Single FAQ card                                                     */
/* ------------------------------------------------------------------ */

function FaqCard({
  item,
  index,
  isOpen,
  onToggle,
  reducedMotion,
  delayIndex,
  direction,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  reducedMotion: boolean;
  /** Position in the visible list — drives the stagger reveal. */
  delayIndex: number;
  /** Slide direction for the scroll reveal: -1 = left column, 1 = right. */
  direction: -1 | 1;
}) {
  const num = String(index + 1).padStart(2, "0");
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const measure = () => setHeight(contentRef.current?.scrollHeight ?? 0);
    measure();
    // Re-measure on content change (e.g. resize)
    const ro = new ResizeObserver(measure);
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, [isOpen, item.answer]);

  return (
    <motion.div
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, x: direction * 16 }
      }
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.35,
        delay: reducedMotion ? 0 : Math.min(0.04 + delayIndex * 0.03, 0.4),
      }}
    >
      <div
        className={cn(
          "group border bg-white transition-all duration-250",
          isOpen
            ? "border-[#D4AF37] bg-white"
            : "border-border/60 hover:-translate-y-[2px] hover:border-[#14283D]/25 hover:shadow-[0_4px_16px_-4px_rgba(20,40,61,0.06)]"
        )}
      >
        {/* Trigger */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center gap-2.5 px-3 py-2 text-left sm:px-3.5"
        >
          {/* Number */}
          <span
            className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-200",
              isOpen
                ? "bg-[#D4AF37] text-white"
                : "bg-[#14283D]/5 text-[#14283D]/60 group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]"
            )}
          >
            {num}
          </span>

          {/* Question text */}
          <span className="flex-1 text-[13px] font-semibold leading-snug text-[#14283D] sm:text-sm">
            {item.question}
          </span>

          {/* Chevron arrow (like the navbar) */}
          <span
            className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground transition-all duration-250",
              isOpen ? "text-[#D4AF37]" : "group-hover:text-[#D4AF37]"
            )}
          >
            <span
              className="transition-transform duration-250 ease-out"
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <ChevronDown className="h-4 w-4" />
            </span>
          </span>
        </button>

        {/* Answer */}
        <div
          className="overflow-hidden transition-[height] duration-300 ease-out"
          style={{ height: isOpen ? height : 0 }}
          aria-hidden={!isOpen}
        >
          <div ref={contentRef} className="px-3.5 pb-3">
            <div
              className={cn(
                "ml-9 border-l-2 border-[#D4AF37]/30 pl-3 transition-all duration-300 ease-out",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
              )}
            >
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Main FaqSection                                                     */
/* ------------------------------------------------------------------ */

interface FaqSectionProps {
  /** Render on its own page (full-width) vs embedded in HomePage. */
  standalone?: boolean;
}

export function FaqSection({ standalone = false }: FaqSectionProps) {
  const [query, setQuery] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);

  const openSearch = (value?: string) => {
    if (value !== undefined) setQuery(value);
    setShowInput(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const filtered = useMemo(() => {
    if (!query.trim()) return FAQ_ITEMS;
    const q = query.toLowerCase();
    return FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [query]);

  /**
   * Split the visible questions into two balanced columns. With no filter
   * that is exactly 6 + 6; filtered results split naturally in half so the
   * layout stays even.
   */
  const columns = useMemo(() => {
    if (filtered.length === 0) return [];
    const half = Math.ceil(filtered.length / 2);
    return [filtered.slice(0, half), filtered.slice(half)];
  }, [filtered]);

  const toggle = useCallback(
    (index: number) => setOpenIndex((prev) => (prev === index ? null : index)),
    []
  );

  // Close open card when filter changes
  useEffect(() => {
    setOpenIndex(null);
  }, [query]);

  const section = (
    <div
      className={cn(
        "mx-auto w-full px-4 py-10 sm:px-6 sm:py-12",
        standalone && "max-w-7xl"
      )}
    >
      {/* Header */}
      <motion.div
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
          CarTrace • FAQ
        </p>
        <h2
          id="home-faq"
          className="font-display text-2xl font-bold tracking-tight text-[#14283D] sm:text-3xl"
        >
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          Everything you need to know about checking vehicles with CarTrace.
        </p>
        {/* Decorative gold line */}
        <div className="mx-auto mt-3 flex items-center justify-center gap-1.5">
          <span className="h-px w-8 bg-[#D4AF37]/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
          <span className="h-px w-8 bg-[#D4AF37]/40" />
        </div>
      </motion.div>

      {/* Centered premium FAQ container — one box, two columns of six */}
      <motion.div
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.08 }}
        className="mx-auto mt-6 w-[calc(100%-24px)] max-w-[1180px] border border-border/50 bg-white px-4 py-4 shadow-[0_12px_48px_-16px_rgba(20,40,61,0.14)] sm:px-5 sm:py-5 lg:px-8"
      >
        {/* Top row — logo left, search icon + suggestion tags centered */}
        <div className="mb-4 flex items-center gap-2.5">
          {/* Logo slides in from the left on every FAQ entry — replays on
              mount (refresh, SPA navigation, direct open) and every time the
              section scrolls into view. */}
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="shrink-0"
          >
            <CarTraceLogo size="sm" />
          </motion.div>

          <div className="flex flex-1 flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => (showInput ? setShowInput(false) : openSearch())}
              aria-expanded={showInput}
              aria-label={showInput ? "Close question search" : "Search questions"}
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors",
                showInput || query
                  ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                  : "hover:bg-[#14283D]/5 hover:text-[#14283D]"
              )}
            >
              <Search className="h-4 w-4" aria-hidden />
            </button>

            {["VIN", "registration", "save", "free"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => openSearch(tag)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  query === tag
                    ? "border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "border-border/60 bg-white text-muted-foreground hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Expandable search input */}
        {showInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.2 }}
            className="mx-auto mb-4 w-full max-w-md overflow-hidden"
          >
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your question..."
                aria-label="Search frequently asked questions"
                className="h-10 w-full rounded-xl border border-border bg-[#FBFBFC] pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#D4AF37] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
              />
            </div>
          </motion.div>
        )}

        {/* Question columns */}
        {columns.length > 0 ? (
          <div className="grid gap-2.5 md:grid-cols-2 md:gap-3">
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-2.5">
                {column.map((item) => {
                  // Find the real index in the full list for numbering
                  const realIndex = FAQ_ITEMS.findIndex(
                    (f) => f.value === item.value
                  );
                  return (
                    <FaqCard
                      key={item.value}
                      item={item}
                      index={realIndex}
                      isOpen={openIndex === realIndex}
                      onToggle={() => toggle(realIndex)}
                      reducedMotion={reducedMotion ?? false}
                      delayIndex={filtered.indexOf(item)}
                      direction={columns.length > 1 && columnIndex === 1 ? 1 : -1}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-border/60 bg-white py-16 text-center"
          >
            <Search className="mx-auto h-8 w-8 text-muted-foreground/30" aria-hidden />
            <p className="mt-3 font-display text-base font-semibold text-[#14283D]">
              No matching questions found.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search term.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-4 text-sm font-medium text-[#D4AF37] hover:underline"
            >
              Clear search
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.15 }}
        className="mt-8 text-center sm:mt-9"
      >
        <p className="text-sm font-medium text-muted-foreground">
          Still have questions?
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Start by checking your vehicle information.
        </p>
        <Link
          to="/vehicle"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B99224]"
        >
          Check My Vehicle <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );

  return standalone ? (
    <div>
      {/* Light background for standalone page */}
      <div className="bg-gradient-to-b from-[#F7F8FA] to-white pt-10">
        {section}
      </div>
    </div>
  ) : (
    section
  );
}