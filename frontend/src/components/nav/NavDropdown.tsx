import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  /** Required for plain links; ignored when `onSelect` is provided. */
  to?: string;
  description?: string;
  onSelect?: () => void;
}

interface NavDropdownProps {
  label: string;
  items: NavItem[];
  /** Highlight the trigger when the current route lives under one of the items. */
  active?: boolean;
  /** Optional custom trigger content (e.g. an avatar icon). */
  trigger?: React.ReactNode;
  /** Accessible name for icon-only triggers. */
  ariaLabel?: string;
  /** Optional non-interactive header rendered above the items (e.g. the user's name). */
  header?: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  align?: "left" | "right";
}

const CLOSE_DELAY = 200;

/**
 * Accessible header dropdown: opens on hover, stays open while the cursor is
 * inside the trigger or panel, closes shortly after leaving. Also closes on
 * outside click / ESC, supports arrow-key navigation, and animates smoothly.
 * A transparent "bridge" above the panel keeps the hover chain intact while
 * moving from the trigger into the dropdown, so it never flickers shut.
 */
export function NavDropdown({
  label,
  items,
  active = false,
  trigger,
  ariaLabel,
  header,
  className,
  triggerClassName,
  align = "left",
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);
  const closeTimer = useRef<number | null>(null);

  function openOnHover() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function closeAfterHover() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
  }
  useEffect(
    () => () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    },
    []
  );

  // Close on outside click and on Escape.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function openAndFocusFirst() {
    setOpen(true);
    // Focus the first item after the panel is rendered.
    requestAnimationFrame(() => itemRefs.current[0]?.focus());
  }

  function onTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) openAndFocusFirst();
      else setOpen(false);
    }
  }

  function onItemKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % items.length;
      itemRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + items.length) % items.length;
      itemRefs.current[prev]?.focus();
    } else if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "Tab" && index === items.length - 1) {
      setOpen(false);
    }
  }

  return (
    <div
      ref={rootRef}
      onMouseEnter={openOnHover}
      onMouseLeave={closeAfterHover}
      className={cn("relative", className)}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          trigger
            ? "inline-flex items-center justify-center rounded-full transition-colors"
            : "group inline-flex items-center gap-1 border-b-2 border-transparent px-3 py-2 text-sm font-medium transition-colors",
          "text-[hsl(var(--on-dark-soft))] hover:border-primary hover:text-[hsl(var(--on-dark))]",
          (open || active) && "border-primary text-primary",
          triggerClassName
        )}
      >
        {trigger ?? (
          <>
            {label}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                open && "rotate-180"
              )}
              aria-hidden
            />
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute top-full z-50 pt-2",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            <div
              role="menu"
              aria-label={label}
              className={cn(
                "w-64 rounded-lg border border-border bg-popover p-1.5 text-popover-foreground shadow-lg",
                align === "right" && "w-52"
              )}
            >
              {header && (
                <div className="border-b border-border px-3 pb-2 pt-1.5">
                  {header}
                </div>
              )}
              {items.map((item, i) => {
                const classes = cn(
                  "flex w-full items-start justify-between gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                  "text-foreground hover:bg-primary/10 hover:text-primary focus-visible:bg-primary/10 focus-visible:text-primary focus-visible:outline-none",
                  item.description && "flex-col items-start"
                );
                const content = (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    )}
                  </>
                );
                return item.onSelect ? (
                  <button
                    key={item.label}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    type="button"
                    role="menuitem"
                    className={classes}
                    onClick={() => {
                      item.onSelect?.();
                      setOpen(false);
                    }}
                    onKeyDown={(e) => onItemKeyDown(e, i)}
                  >
                    {content}
                  </button>
                ) : (
                  <NavLink
                    key={item.label}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    to={item.to ?? "/"}
                    role="menuitem"
                    tabIndex={open ? 0 : -1}
                    className={({ isActive }) =>
                      cn(classes, isActive && "bg-primary/10 text-primary")
                    }
                    onClick={() => setOpen(false)}
                    onKeyDown={(e) => onItemKeyDown(e, i)}
                  >
                    {content}
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
