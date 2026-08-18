import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  History,
  LogOut,
  MapPin,
  Menu,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BUY_CAR, INSURANCE, MORE, NEW_CAR_MENU, RC_DETAILS } from "@/lib/nav";
import { setSelectedLocation, useSelectedLocation } from "@/lib/locations";
import { CarTraceLogo } from "@/components/common/CarTraceLogo";
import { NavDropdown } from "@/components/nav/NavDropdown";
import { NavSearch } from "@/components/nav/NavSearch";
import { LocationSelector } from "@/components/location/LocationSelector";
import { useAuth } from "@/services/auth";
import { Button } from "@/components/ui/button";

/**
 * Top navigation groups. The label is the centered trigger; the items are the
 * dropdown contents. Contact Us stays a direct link (below).
 */
const DROPDOWN_GROUPS = [
  { label: "RC Details", items: RC_DETAILS },
  { label: "Buy Car", items: BUY_CAR },
  { label: "New Car", items: NEW_CAR_MENU },
  { label: "Insurance", items: INSURANCE },
  { label: "More", items: MORE },
];

/** True when the current route lives under one of the given paths. */
function pathActive(pathname: string, paths: string[]): boolean {
  return paths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/** Shared underline style for plain navbar links (Contact Us). */
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "inline-flex items-center border-b-2 border-transparent px-3 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-[hsl(var(--on-dark))]",
    isActive && "border-primary text-primary"
  );

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // The location is a shared selection: it starts as India on every reload
  // (nothing is restored from storage) and updates instantly when the user
  // picks a state or a registration number is auto-detected while typing.
  const location = useSelectedLocation();
  const [locationOpen, setLocationOpen] = useState(false);
  const locationCloseTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu and location modal on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setLocationOpen(false);
  }, [pathname]);

  // Clean up location close timer on unmount.
  useEffect(() => {
    return () => {
      if (locationCloseTimer.current) window.clearTimeout(locationCloseTimer.current);
    };
  }, []);

  // Close the mobile menu on outside click / Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (headerRef.current && !headerRef.current.contains(target)) {
        setMobileOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  function chooseLocation(label: string) {
    setSelectedLocation(label);
    // Close fast: the gold selection state shows briefly, then the modal
    // exits (~180ms) while the hero background crossfades in behind it.
    if (locationCloseTimer.current) window.clearTimeout(locationCloseTimer.current);
    locationCloseTimer.current = window.setTimeout(() => setLocationOpen(false), 120);
  }

  return (
    <>
      <motion.header
        ref={headerRef}
      initial={{ opacity: 0, y: -28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full border-b border-white/10 bg-[hsl(var(--surface-dark))] text-[hsl(var(--on-dark))] transition-shadow duration-300",
        scrolled && "shadow-lg"
      )}
    >
      {/* Three-column grid: [1fr] logo+location · [auto] nav · [1fr] search+profile.
          Equal 1fr sides keep the center column perfectly centered in the navbar. */}
      <nav
        className="mx-auto grid h-20 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-8"
        aria-label="Main navigation"
      >
        {/* LEFT: logo + location */}
        <div className="flex min-w-0 items-center justify-self-start">
          <CarTraceLogo size="sm" className="mr-2" />

          {/* Location selector — opens the premium location modal */}
          <div className="relative hidden lg:block">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={locationOpen}
              onClick={() => setLocationOpen(true)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                "text-[hsl(var(--on-dark-soft))] hover:bg-white/5 hover:text-[hsl(var(--on-dark))]",
                locationOpen && "bg-white/5 text-primary"
              )}
            >
              <MapPin className="h-4 w-4 text-primary" aria-hidden />
              <span className="max-w-[6.5rem] truncate">{location}</span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  locationOpen && "rotate-180"
                )}
                aria-hidden
              />
            </button>
          </div>
        </div>

        {/* CENTER: navigation — kept truly centered by the equal 1fr grid columns */}
        <div className="hidden items-center justify-self-center lg:flex">
          {DROPDOWN_GROUPS.map((group) => (
            <NavDropdown
              key={group.label}
              label={group.label}
              items={group.items}
              active={pathActive(pathname, group.items.map((i) => i.to))}
            />
          ))}
          <NavLink to="/contact" className={navLinkClass}>
            Contact Us
          </NavLink>
        </div>

        {/* RIGHT: search + profile + mobile toggle */}
        <div className="flex items-center justify-self-end">
          <NavSearch mode="icon" className="hidden lg:block" />

          {isAuthenticated && user ? (
            <NavDropdown
              label="Account"
              ariaLabel="Account menu"
              trigger={
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              }
              triggerClassName="ml-1 hidden h-9 w-9 p-0 text-[hsl(var(--on-dark-soft))] hover:bg-white/5 hover:text-[hsl(var(--on-dark))] lg:inline-flex"
              align="right"
              header={
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
              }
              items={[
                { label: "My Profile", to: "/profile" },
                { label: "Saved Vehicles", to: "/saved" },
                { label: "Search History", to: "/history" },
                { label: "Settings", to: "/settings" },
                { label: "Log out", onSelect: logout },
              ]}
            />
          ) : (
            <NavDropdown
              label="Account"
              ariaLabel="Account menu"
              trigger={<User className="h-5 w-5" />}
              triggerClassName="ml-1 hidden h-9 w-9 p-0 text-[hsl(var(--on-dark-soft))] hover:bg-white/5 hover:text-[hsl(var(--on-dark))] lg:inline-flex"
              align="right"
              items={[
                { label: "Log in", to: "/login" },
                { label: "Sign up", to: "/signup" },
              ]}
            />
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-1 text-[hsl(var(--on-dark-soft))] hover:bg-white/5 hover:text-[hsl(var(--on-dark))] lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* ============ Mobile drawer ============ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border-t border-white/10 bg-[hsl(var(--surface-dark))] lg:hidden"
          >
            <div className="flex flex-col gap-5 px-4 py-5">
              {/* Search */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[hsl(var(--on-dark-soft))]">
                  Search vehicle
                </p>
                <NavSearch onSubmitted={() => setMobileOpen(false)} />
              </div>

              {/* Location — opens the premium location modal */}
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[hsl(var(--on-dark-soft))]">
                  <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden /> Location
                </p>
                <button
                  type="button"
                  onClick={() => setLocationOpen(true)}
                  className="flex w-full items-center gap-2 rounded-md border border-white/15 px-3 py-2.5 text-sm font-medium text-[hsl(var(--on-dark))] transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="min-w-0 flex-1 truncate text-left">{location}</span>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--on-dark-soft))]" aria-hidden />
                </button>
                <p className="mt-1.5 text-xs text-[hsl(var(--on-dark-soft))]">
                  Tap to choose a state or union territory
                </p>
              </div>

              {/* Link groups */}
              {DROPDOWN_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="text-xs font-medium uppercase tracking-wide text-[hsl(var(--on-dark-soft))]">
                    {group.label}
                  </p>
                  <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            cn(
                              "block rounded-md px-2 py-1.5 text-sm transition-colors",
                              isActive
                                ? "bg-white/10 text-primary"
                                : "text-[hsl(var(--on-dark))] hover:bg-white/5 hover:text-primary"
                            )
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Contact + auth */}
              <div className="border-t border-white/10 pt-4">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    cn(
                      "block rounded-md px-2 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-white/10 text-primary"
                        : "text-[hsl(var(--on-dark))] hover:bg-white/5 hover:text-primary"
                    )
                  }
                >
                  Contact Us
                </NavLink>
                <div className="mt-3 flex flex-col gap-2">
                  {isAuthenticated ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => navigate("/history")}
                        className="w-full border-white/15 bg-transparent text-[hsl(var(--on-dark))] hover:bg-white/5"
                      >
                        <History className="h-4 w-4" /> Search History
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={logout}
                        className="w-full text-[hsl(var(--on-dark-soft))] hover:bg-white/5 hover:text-[hsl(var(--on-dark))]"
                      >
                        <LogOut className="h-4 w-4" /> Log out ({user?.name})
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => navigate("/login")}
                        className="w-full border-white/15 bg-transparent text-[hsl(var(--on-dark))] hover:bg-white/5"
                      >
                        Log in
                      </Button>
                      <Button
                        onClick={() => navigate("/signup")}
                        className="w-full"
                      >
                        Sign up
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>

    {/* Premium location selection modal (desktop + mobile).
        Rendered outside the header so no transformed ancestor breaks
        position: fixed on the full-screen overlay. */}
    <LocationSelector
      open={locationOpen}
      selected={location}
      onSelect={chooseLocation}
      onClose={() => setLocationOpen(false)}
    />
  </>
);
}
