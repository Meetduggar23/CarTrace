import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Heart,
  History,
  LogOut,
  MapPin,
  Menu,
  User,
  X,
} from "lucide-react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  BUY_CAR,
  INSURANCE,
  LOCATIONS,
  LOCATION_STORAGE_KEY,
  MORE,
  VEHICLE_INFO,
} from "@/lib/nav";
import { Logo } from "@/components/common/Logo";
import { NavDropdown } from "@/components/nav/NavDropdown";
import { NavSearch } from "@/components/nav/NavSearch";
import { useAuth } from "@/services/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DROPDOWN_GROUPS = [
  { label: "Vehicle Info", items: VEHICLE_INFO },
  { label: "Buy Car", items: BUY_CAR },
  { label: "Insurance", items: INSURANCE },
  { label: "More", items: MORE },
];

/** True when the current route lives under one of the given paths. */
function pathActive(pathname: string, paths: string[]): boolean {
  return paths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function readLocation(): string {
  try {
    return localStorage.getItem(LOCATION_STORAGE_KEY) ?? "India";
  } catch {
    return "India";
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useState<string>(readLocation);
  const [locationOpen, setLocationOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const locationHook = useLocation();
  const pathname = locationHook.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu and location dropdown on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setLocationOpen(false);
  }, [pathname]);

  // Close the location dropdown on outside click / Escape.
  useEffect(() => {
    if (!locationOpen) return;
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (!document.getElementById("location-selector")?.contains(target)) {
        setLocationOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLocationOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [locationOpen]);

  function chooseLocation(label: string) {
    setLocation(label);
    setLocationOpen(false);
    try {
      localStorage.setItem(LOCATION_STORAGE_KEY, label);
    } catch {
      // ignore
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-[hsl(var(--surface-dark))] text-[hsl(var(--on-dark))] transition-shadow duration-300",
        scrolled && "shadow-lg"
      )}
    >
      {/* ============ Row 1: main bar ============ */}
      <div className="border-b border-white/10">
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center gap-1 px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Brand */}
          <Link to="/" className="mr-3 flex items-center" aria-label={`${SITE.name} home`}>
            <Logo size="sm" />
            <span className="sr-only">{SITE.name}</span>
          </Link>

          {/* Location selector */}
          <div id="location-selector" className="relative hidden lg:block">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={locationOpen}
              onClick={() => setLocationOpen((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                "text-[hsl(var(--on-dark-soft))] hover:bg-white/5 hover:text-[hsl(var(--on-dark))]",
                locationOpen && "bg-white/5 text-primary"
              )}
            >
              <MapPin className="h-4 w-4 text-primary" aria-hidden />
              <span className="max-w-[7rem] truncate">{location}</span>
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform duration-200", locationOpen && "rotate-180")}
                aria-hidden
              />
            </button>
            <AnimatePresence>
              {locationOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  role="listbox"
                  aria-label="Select location"
                  className="absolute left-0 top-full z-50 mt-2 max-h-72 w-52 overflow-y-auto rounded-lg border border-border bg-popover p-1.5 text-popover-foreground shadow-lg"
                >
                  {LOCATIONS.map((loc) => (
                    <li key={loc.label}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={location === loc.label}
                        onClick={() => chooseLocation(loc.label)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-primary/10 hover:text-primary",
                          location === loc.label && "bg-primary/10 font-medium text-primary"
                        )}
                      >
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {loc.label}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop dropdowns */}
          <div className="hidden items-center lg:flex">
            {DROPDOWN_GROUPS.slice(0, 2).map((group) => (
              <NavDropdown
                key={group.label}
                label={group.label}
                items={group.items}
                active={pathActive(
                  pathname,
                  group.items.map((i) => i.to)
                )}
              />
            ))}
            <NavLink
              to="/new-cars"
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/5 text-primary"
                    : "text-[hsl(var(--on-dark-soft))] hover:bg-white/5 hover:text-[hsl(var(--on-dark))]"
                )
              }
            >
              New Car
            </NavLink>
            {DROPDOWN_GROUPS.slice(2).map((group) => (
              <NavDropdown
                key={group.label}
                label={group.label}
                items={group.items}
                active={pathActive(
                  pathname,
                  group.items.map((i) => i.to)
                )}
              />
            ))}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/5 text-primary"
                    : "text-[hsl(var(--on-dark-soft))] hover:bg-white/5 hover:text-[hsl(var(--on-dark))]"
                )
              }
            >
              Contact Us
            </NavLink>
          </div>

          {/* Desktop search */}
          <NavSearch className="ml-auto hidden w-64 lg:block" />

          {/* User / login */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="ml-1 hidden h-9 w-9 rounded-full p-0 text-[hsl(var(--on-dark-soft))] hover:bg-white/5 hover:text-[hsl(var(--on-dark))] md:inline-flex"
                  aria-label="Account menu"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuLabel className="pt-0 font-normal text-muted-foreground">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/saved")}>
                  <Heart className="h-4 w-4" /> Saved Vehicles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/history")}>
                  <History className="h-4 w-4" /> Search History
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 h-9 w-9 text-[hsl(var(--on-dark-soft))] hover:bg-white/5 hover:text-[hsl(var(--on-dark))]"
              aria-label="Log in"
              title="Log in"
              onClick={() => navigate("/login")}
            >
              <User className="h-5 w-5" />
            </Button>
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
        </nav>
      </div>

      {/* ============ Mobile menu panel ============ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border-b border-white/10 bg-[hsl(var(--surface-dark))] lg:hidden"
          >
            <div className="flex flex-col gap-5 px-4 py-5">
              {/* Search (mobile only) */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[hsl(var(--on-dark-soft))]">
                  Search vehicle
                </p>
                <NavSearch onSubmitted={() => setMobileOpen(false)} />
              </div>

              {/* Location */}
              <div>
                <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[hsl(var(--on-dark-soft))]">
                  <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden /> Location
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc.label}
                      type="button"
                      onClick={() => chooseLocation(loc.label)}
                      className={cn(
                        "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                        location === loc.label
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-white/15 text-[hsl(var(--on-dark-soft))] hover:border-primary/50 hover:text-[hsl(var(--on-dark))]"
                      )}
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
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

              {/* New Car + Contact + auth */}
              <div className="border-t border-white/10 pt-4">
                <NavLink
                  to="/new-cars"
                  className={({ isActive }) =>
                    cn(
                      "block rounded-md px-2 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-white/10 text-primary"
                        : "text-[hsl(var(--on-dark))] hover:bg-white/5 hover:text-primary"
                    )
                  }
                >
                  New Car
                </NavLink>
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
                        className="border-white/15 bg-transparent text-[hsl(var(--on-dark))] hover:bg-white/5"
                      >
                        <History className="h-4 w-4" /> Search History
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={logout}
                        className="text-[hsl(var(--on-dark-soft))] hover:bg-white/5 hover:text-[hsl(var(--on-dark))]"
                      >
                        <LogOut className="h-4 w-4" /> Log out ({user?.name})
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => navigate("/login")}
                        className="border-white/15 bg-transparent text-[hsl(var(--on-dark))] hover:bg-white/5"
                      >
                        Log in
                      </Button>
                      <Button onClick={() => navigate("/signup")}>Sign up</Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
