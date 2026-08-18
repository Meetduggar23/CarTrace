import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Fuel,
  Gauge,
  Heart,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { carService } from "@/lib/cars";
import { CarImage } from "@/components/car/CarImage";
import { VariantTable } from "@/components/car/VariantTable";
import { CarCard } from "@/components/car/CarCard";

export function CarDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const car = useMemo(() => carService.getBySlug(slug ?? ""), [slug]);

  const similar = useMemo(() => {
    if (!car) return [];
    return carService
      .getAll()
      .filter((c) => c.bodyType === car.bodyType && c.id !== car.id)
      .slice(0, 4);
  }, [car]);

  if (!car) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <Seo title="Car not found" path={`/new-cars/${slug ?? ""}`} />
        <EmptyState
          icon={Fuel}
          title="Car not found"
          description="This car model doesn't exist or has been removed."
          action={
            <Link to="/new-cars">
              <Button>Browse new cars</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <Seo
        title={`${car.brand} ${car.model} — Price, Specs & Variants`}
        description={`${car.brand} ${car.model} starting at ${car.priceDisplay}. View specifications, variants, features and compare.`}
        path={`/new-cars/${car.slug}`}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          to="/new-cars"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> All new cars
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-3xl border border-border bg-white"
        >
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted md:aspect-[21/8]">
            <CarImage car={car} className="h-full w-full" showBadge />
            {car.isElectric && (
              <span className="absolute right-4 top-4 rounded-full bg-success/90 px-3 py-1.5 text-xs font-semibold text-success-foreground">
                Electric Vehicle
              </span>
            )}
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#D4AF37]">
                  {car.brand}
                </p>
                <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-[#14283D] sm:text-4xl">
                  {car.model}
                </h1>
                <p className="mt-1 text-base text-muted-foreground">{car.tagline}</p>

                {car.rating !== null && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-[#FFF8E7] px-2.5 py-1 text-sm font-semibold text-[#D4AF37]">
                      <Star className="h-4 w-4 fill-[#D4AF37]" /> {car.rating}
                    </span>
                    <span className="text-sm text-muted-foreground">/ 5</span>
                  </div>
                )}
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">Starting at</p>
                <p className="font-display text-2xl font-bold text-[#14283D]">
                  {car.priceDisplay}
                </p>
                <Button className="mt-3 bg-[#D4AF37] text-white hover:bg-[#B99224]">
                  <Heart className="h-4 w-4" /> Save
                </Button>
              </div>
            </div>

            {/* Quick specs */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Engine", value: car.engine, icon: Gauge },
                { label: "Power", value: car.power, icon: Zap },
                { label: "Mileage", value: car.mileage, icon: Fuel },
                { label: "Seats", value: `${car.seats} seats`, icon: ShieldCheck },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 px-4 py-3"
                >
                  <spec.icon className="h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden />
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {spec.label}
                    </p>
                    <p className="text-sm font-medium text-foreground">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {car.fuel.map((f) => (
                <Badge key={f} variant="secondary">{f}</Badge>
              ))}
              <Badge variant="secondary">{car.bodyType}</Badge>
              {car.transmission.map((t) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
              {car.isElectric && car.evRange && (
                <Badge variant="success">EV Range: {car.evRange}</Badge>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tabs: Specifications, Variants, Features, Safety */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  {[
                    { label: "Engine", value: car.engine },
                    { label: "Power", value: car.power },
                    { label: "Torque", value: car.torque },
                    { label: "Mileage", value: car.mileage },
                    { label: "Seats", value: `${car.seats}` },
                    { label: "Transmission", value: car.transmission.join(", ") },
                    {label: "Length", value: car.dimensions.length },
                    { label: "Width", value: car.dimensions.width },
                    { label: "Height", value: car.dimensions.height },
                    { label: "Wheelbase", value: car.dimensions.wheelbase },
                  ].map((spec) => (
                    <div key={spec.label} className="rounded-lg border border-border/50 bg-card/40 px-4 py-3">
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {spec.label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-foreground">{spec.value}</dd>
                    </div>
                  ))}
                  {car.isElectric && (
                    <>
                      <div className="rounded-lg border border-border/50 bg-card/40 px-4 py-3">
                        <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">EV Range</dt>
                        <dd className="mt-1 text-sm font-medium text-foreground">{car.evRange ?? "—"}</dd>
                      </div>
                      <div className="rounded-lg border border-border/50 bg-card/40 px-4 py-3">
                        <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Battery</dt>
                        <dd className="mt-1 text-sm font-medium text-foreground">{car.batteryCapacity ?? "—"}</dd>
                      </div>
                      <div className="rounded-lg border border-border/50 bg-card/40 px-4 py-3">
                        <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Charging</dt>
                        <dd className="mt-1 text-sm font-medium text-foreground">{car.chargingTime ?? "—"}</dd>
                      </div>
                    </>
                  )}
                </dl>
              </CardContent>
            </Card>

            {/* Variants */}
            <Card>
              <CardHeader>
                <CardTitle>Variants & Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <VariantTable variants={car.variants} />
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {car.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar: Safety, Pros/Cons */}
          <div className="space-y-6">
            {/* Safety */}
            <Card>
              <CardHeader>
                <CardTitle>Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {car.safety.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-success" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Pros */}
            <Card>
              <CardHeader>
                <CardTitle className="text-success">Pros</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {car.pros.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Cons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Cons</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {car.cons.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                      {c}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Launch date */}
            {car.launchDate && (
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <Calendar className="h-5 w-5 text-[#D4AF37]" />
                  <div>
                    <p className="text-xs text-muted-foreground">Launched</p>
                    <p className="text-sm font-medium">{new Date(car.launchDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Similar Cars */}
        {similar.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold tracking-tight">Similar Cars</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((c, i) => (
                <CarCard key={c.id} car={c} index={i} showCompare={false} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
