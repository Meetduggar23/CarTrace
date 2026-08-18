import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavDropdownItem } from "@/lib/nav";

interface NavDropdownProps {
  label: string;
  items: (NavDropdownItem & { onSelect?: () => void })[];
  /** Highlight the trigger when the current route lives under one of the items. */
  active?: boolean;
  className?: string;
  triggerClassName?: string;
  align?: "left" | "right";
}

/**
 * Accessible header dropdown: closes on outside click / ESC, supports arrow-key
 * navigation, and animates open/close smoothly.
 */
export function NavDropdown({
  label,
  items,
  active = false,
  className,
  triggerClassName,
  align = "left",
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);

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
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "group inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "text-[hsl(var(--on-dark-soft))] hover:bg-white/5 hover:text-[hsl(var(--on-dark))]",
          (open || active) && "bg-white/5 text-primary",
          triggerClassName
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            role="menu"
            aria-label={label}
            className={cn(
              "absolute top-full z-50 mt-2 w-64 rounded-lg border border-border bg-popover p-1.5 text-popover-foreground shadow-lg",
              align === "right" ? "right-0" : "left-0"
            )}
          >
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
                  to={item.to}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
