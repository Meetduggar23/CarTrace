import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Car,
  CarFront,
  Gavel,
  Leaf,
  Search,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { SITE } from "@/lib/constants";
import {
  BRANDS,
  BODY_TYPES,
  PRICE_RANGES,

  carService,
  type NewCar,
  type CarFilters as CarFiltersType,
  type CarSortOption,
} from "@/lib/cars";
import { CarCard } from "@/components/car/CarCard";

import { CarFiltersPanel, CarFiltersSidebar } from "@/components/car/CarFilters";
import { CompareBar } from "@/components/car/CompareBar";
import { LocationBackground } from "@/components/location/LocationBackground";
import { getLocationConfig, useSelectedLocation } from "@/lib/locations";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const CATEGORY_ICONS = [
  { label: "Popular Cars", icon: Star, href: "#popular" },
  { label: "Latest Cars", icon: Sparkles, href: "#latest" },
  { label: "Upcoming Cars", icon: Gavel, href: "#upcoming" },
  { label: "Electric Cars", icon: Zap, href: "#electric" },
  { label: "SUVs", icon: CarFront, href: "#suv" },
  { label: "Sedans", icon: Car, href: "#sedan" },
  { label: "Hatchbacks", icon: Car, href: "#hatchback" },
  { label: "Luxury Cars", icon: Star, href: "#luxury" },
];

const SORT_OPTIONS: { label: string; value: CarSortOption }[] = [
  { label: "Recommended", value: "recommended" },
  { label: "Price — Low to High", value: "price-low" },
  { label: "Price — High to Low", value: "price-high" },
  { label: "Newest", value: "newest" },
  { label: "Popular", value: "popular" },
];

export function NewCarsPage() {
  const location = useSelectedLocation();
  const heroBackground = getLocationConfig(location)?.background ?? "/images/bg.jpg";
  const [searchParams] = useSearchParams();

  // Filter state
  const [filters, setFilters] = useState<CarFiltersType>({
    brand: [],
    fuel: [],
    bodyType: [],
    transmission: [],
    priceMin: 0,
    priceMax: Infinity,
    seats: [],
    electric: false,
    search: searchParams.get("q") ?? "",
    sort: "recommended",
  });

  // Compare state
  const [compareList, setCompareList] = useState<NewCar[]>([]);

  // All cars
  const allCars = useMemo(() => carService.getAll(), []);

  // Filtered results
  const filteredCars = useMemo(() => carService.filter(allCars, filters), [allCars, filters]);

  // Section data
  const popular = useMemo(() => carService.getPopular(), []);
  const latest = useMemo(() => carService.getLatest(), []);
  const electric = useMemo(() => carService.getElectric(), []);

  // Search suggestions
  const [searchFocused, setSearchFocused] = useState(false);
  const searchBlurTimer = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      if (searchBlurTimer.current) window.clearTimeout(searchBlurTimer.current);
    };
  }, []);
  const suggestions = useMemo(() => {
    if (!filters.search || filters.search.length < 2) return [];
    return carService.search(filters.search).slice(0, 5);
  }, [filters.search]);

  const toggleCompare = useCallback((car: NewCar) => {
    setCompareList((prev) => {
      const exists = prev.find((c) => c.id === car.id);
      if (exists) return prev.filter((c) => c.id !== car.id);
      if (prev.length >= 2) return prev;
      return [...prev, car];
    });
  }, []);

  return (
    <div>
      <Seo
        title="New Cars in India"
        description={`Explore new cars in India — compare specifications, prices, features and variants of the latest models. ${SITE.name} new car discovery.`}
        path="/new-cars"
      />

      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden bg-[hsl(var(--surface-dark))]">
        <LocationBackground image={heroBackground} />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--surface-dark)/0.85)] via-[hsl(var(--surface-dark)/0.7)] to-[hsl(var(--surface-dark))]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14 sm:pb-24 lg:px-8 lg:pt-16 lg:pb-28">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p variants={fadeUp} custom={0} className="kicker text-[hsl(var(--on-dark-soft))]">
              Discover New Cars
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-[hsl(var(--on-dark))] sm:text-5xl lg:text-6xl"
            >
              Find Your Next <span className="text-gradient">Car</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[hsl(var(--on-dark-soft))] sm:text-lg"
            >
              Explore new cars, compare specifications, prices and features — all in one place.
            </motion.p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative mx-auto mt-10 w-full max-w-2xl"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" aria-hidden />
              <input
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                onFocus={() => {
                  if (searchBlurTimer.current) window.clearTimeout(searchBlurTimer.current);
                  setSearchFocused(true);
                }}
                onBlur={() => {
                  if (searchBlurTimer.current) window.clearTimeout(searchBlurTimer.current);
                  searchBlurTimer.current = window.setTimeout(() => setSearchFocused(false), 200);
                }}
                placeholder="Search new cars, brands or models..."
                aria-label="Search new cars"
                className="h-14 w-full rounded-2xl border border-white/15 bg-white/10 pl-12 pr-4 text-base text-white placeholder:text-white/40 backdrop-blur-xl focus:border-[#D4AF37]/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30"
              />
            </div>

            {/* Search suggestions */}
            {searchFocused && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-border bg-white shadow-xl"
              >
                <span className="block h-0.5 w-full bg-[#D4AF37]" aria-hidden />
                {suggestions.map((car) => (
                  <Link
                    key={car.id}
                    to={`/new-cars/${car.slug}`}
                    className="flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-primary/5"
                  >
                    <span className="font-medium text-foreground">
                      {car.brand} {car.model}
                    </span>
                    <span className="text-xs text-muted-foreground">{car.priceDisplay}</span>
                  </Link>
                ))}
              </motion.div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-white/50">
              Try:
              {["Hyundai Creta", "Tata Nexon", "Mahindra XUV700"].map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setFilters({ ...filters, search: ex })}
                  className="rounded-full px-3 py-1 font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {ex}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ Quick Category Nav ============ */}
      <section className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORY_ICONS.map((cat, i) => (
              <motion.a
                key={cat.label}
                href={cat.href}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
              >
                <cat.icon className="h-4 w-4" aria-hidden />
                {cat.label}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Popular New Cars ============ */}
      <section id="popular" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Badge variant="secondary" className="mb-3 gap-1.5">
            <Star className="h-3.5 w-3.5" /> Most searched
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Popular New Cars
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            The most searched new cars in India right now.
          </p>
        </motion.div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {popular.map((car, i) => (
            <CarCard
              key={car.id}
              car={car}
              index={i}
              inCompare={compareList.some((c) => c.id === car.id)}
              onToggleCompare={toggleCompare}
            />
          ))}
        </div>
      </section>

      {/* ============ Explore by Brand ============ */}
      <section className="border-y border-border bg-card/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-3">
              Browse manufacturers
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Explore Cars by Brand
            </h2>
          </motion.div>
          <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
            {BRANDS.map((brand, i) => (
              <motion.div
                key={brand.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.25 }}
              >
                <Link
                  to={`/new-cars/brand/${brand.slug}`}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-white p-4 transition-all hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-md"
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="h-12 w-12 rounded-xl object-contain"
                  />
                  <span className="text-center text-xs font-semibold text-foreground group-hover:text-[#D4AF37]">
                    {brand.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {brand.carCount} cars
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/new-cars" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              View All Brands <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ Body Type ============ */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Badge variant="secondary" className="mb-3">
            By category
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Browse by Body Type
          </h2>
        </motion.div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {BODY_TYPES.map((bt, i) => (
            <motion.div
              key={bt.type}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <button
                type="button"
                onClick={() => setFilters({ ...filters, bodyType: [bt.type], search: "" })}
                className="group relative h-36 w-full overflow-hidden rounded-2xl border border-border transition-all hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-lg"
              >
                <img
                  src={bt.image}
                  alt={bt.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14283D]/80 to-transparent" />
                <span className="absolute bottom-3 left-4 font-display text-lg font-bold text-white">
                  {bt.label}
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ Price-Based Discovery ============ */}
      <section className="border-y border-border bg-card/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-3">
              Budget
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Find Cars by Budget
            </h2>
          </motion.div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PRICE_RANGES.map((range, i) => (
              <motion.div
                key={range.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setFilters({
                      ...filters,
                      priceMin: range.min,
                      priceMax: range.max,
                      brand: [],
                      fuel: [],
                      bodyType: [],
                      transmission: [],
                      seats: [],
                      electric: false,
                      search: "",
                    })
                  }
                  className="flex h-24 w-full items-center justify-center rounded-2xl border border-border bg-white text-center transition-all hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-md"
                >
                  <div>
                    <p className="font-display text-lg font-bold text-[#14283D]">{range.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {carService.getByPriceRange(range.min, range.max).length} cars
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Latest Cars ============ */}
      <section id="latest" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Badge variant="secondary" className="mb-3 gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> Just launched
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Latest Cars
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Recently launched new models.
          </p>
        </motion.div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {latest.map((car, i) => (
            <CarCard
              key={car.id}
              car={car}
              index={i}
              inCompare={compareList.some((c) => c.id === car.id)}
              onToggleCompare={toggleCompare}
            />
          ))}
        </div>
      </section>

      {/* ============ Electric Cars ============ */}
      <section id="electric" className="border-y border-border bg-card/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Badge variant="success" className="mb-3 gap-1.5">
              <Leaf className="h-3.5 w-3.5" /> Electric
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Explore Electric Cars
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Go green with the latest electric vehicles.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {electric.map((car, i) => (
              <CarCard
                key={car.id}
                car={car}
                index={i}
                inCompare={compareList.some((c) => c.id === car.id)}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ Advanced Search / Filters ============ */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <Badge variant="secondary" className="mb-3">
            Discover
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Find Your Perfect Car
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Filter by brand, budget, fuel, body type and more.
          </p>
        </motion.div>

        {/* Sort bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value as CarSortOption })}
              className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-muted-foreground">
            {filteredCars.length} car{filteredCars.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Desktop: sidebar + grid */}
        <div className="flex gap-8">
          {/* Filters sidebar (desktop only) */}
          <div className="hidden w-72 shrink-0 lg:block">
            <CarFiltersSidebar
              filters={filters}
              onChange={setFilters}
              totalResults={filteredCars.length}
            />
          </div>

          {/* Results grid */}
          <div className="flex-1">
            {/* Mobile filter toggle + sheet */}
            <CarFiltersPanel
              filters={filters}
              onChange={setFilters}
              totalResults={filteredCars.length}
            />

            {filteredCars.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCars.map((car, i) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    index={i}
                    inCompare={compareList.some((c) => c.id === car.id)}
                    onToggleCompare={toggleCompare}
                  />
                ))}
              </div>
            ) : (
              <Card className="py-20 text-center">
                <CardContent>
                  <Search className="mx-auto h-10 w-10 text-muted-foreground/30" aria-hidden />
                  <h3 className="mt-4 font-display text-lg font-semibold">No cars found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your filters or search terms.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() =>
                      setFilters({
                        brand: [],
                        fuel: [],
                        bodyType: [],
                        transmission: [],
                        priceMin: 0,
                        priceMax: Infinity,
                        seats: [],
                        electric: false,
                        search: "",
                        sort: "recommended",
                      })
                    }
                  >
                    Clear all filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 md:flex-row md:items-center"
          >
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold">
                Can't find what you're looking for?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Check any vehicle's registration details with a registration number or VIN.
              </p>
            </div>
            <Link to="/vehicle">
              <Button size="lg">
                Check a vehicle <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============ Disclaimer ============ */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="border-t border-border pt-6">
          <h3 className="flex items-center gap-2 font-display text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden />
            Data disclaimer
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Car specifications, prices and features shown here are sourced from publicly available data.
            Prices shown are ex-showroom starting prices and may vary by city, variant and dealer.
            {SITE.name} never fabricates vehicle data — when a field is unavailable it is clearly labeled.
            Verify pricing and specifications with your local dealer before making a purchase decision.
          </p>
        </div>
      </section>

      {/* Compare bar */}
      <CompareBar
        cars={compareList}
        onRemove={(id) => setCompareList((prev) => prev.filter((c) => c.id !== id))}
        onClear={() => setCompareList([])}
      />
    </div>
  );
}
