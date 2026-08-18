import { Link } from "react-router-dom";
import { CarTraceLogo } from "@/components/common/CarTraceLogo";
import { Seo } from "@/components/common/Seo";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <Seo title="Page not found" path="/404" />
      <CarTraceLogo size="md" logoClassName="opacity-90" />
      <h1 className="mt-8 font-display text-4xl font-extrabold">404</h1>
      <p className="mt-2 text-muted-foreground">
        This page drove off. Let&apos;s get you back on the road.
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/">
          <Button>Go home</Button>
        </Link>
        <Link to="/vehicle">
          <Button variant="outline">Check a vehicle</Button>
        </Link>
      </div>
    </div>
  );
}
