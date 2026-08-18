import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { BRANDS, carService } from "@/lib/cars";
import { CarCard } from "@/components/car/CarCard";

export function CarBrandPage() {
  const { brand } = useParams<{ brand: string }>();
  const brandData = useMemo(
    () => BRANDS.find((b) => b.slug === brand),
    [brand]
  );
  const cars = useMemo(
    () => (brand ? carService.getByBrand(brand) : []),
    [brand]
  );

  if (!brandData) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <Seo title="Brand not found" path={`/new-cars/brand/${brand}`} />
        <EmptyState
          icon={ArrowLeft}
          title="Brand not found"
          description="This brand doesn't exist or has been removed."
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
        title={`${brandData.name} Cars in India — Price & Specs`}
        description={`Explore all ${brandData.name} new cars in India. View prices, specifications, variants and compare models.`}
        path={`/new-cars/brand/${brand}`}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to="/new-cars"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> All new cars
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <img
            src={brandData.logo}
            alt={`${brandData.name} logo`}
            className="h-16 w-16 rounded-2xl object-contain"
          />
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {brandData.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {brandData.country} · {cars.length} car{cars.length !== 1 ? "s" : ""}
            </p>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>

        {cars.length === 0 && (
          <EmptyState
            icon={ArrowLeft}
            title={`No ${brandData.name} cars found`}
            description="This brand doesn't have any cars listed yet."
            action={
              <Link to="/new-cars">
                <Button>Browse all cars</Button>
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
}
