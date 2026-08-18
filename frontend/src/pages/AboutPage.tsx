import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { SITE, TAGLINES } from "@/lib/constants";

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="About & Disclaimer"
        description="About CarTrace, its data sources and the legal disclaimer."
        path="/about"
      />
      <PageHeader
        title="About & Disclaimer"
        description={`${TAGLINES.primary} ${SITE.name} is the vehicle-information platform that traces the available story behind every plate.`}
      />

      <p className="kicker mt-6 text-center">
        {SITE.name} — {TAGLINES.primary}
      </p>

      <div className="mt-6 space-y-6">
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="font-display text-lg font-semibold">What this is</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {SITE.name} is a vehicle-information platform that lets you check
              publicly available vehicle information by registration number or
              VIN. It is an independent product inspired by the general
              convenience of vehicle-information checkers — it is not a copy of
              any existing product, is not affiliated with CarInfo, and is not
              an RTO authority.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              VIN decoding is powered by the free{" "}
              <a
                href="https://vpic.nhtsa.dot.gov/api/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary hover:underline"
              >
                NHTSA vPIC API
              </a>
              , an official US Department of Transportation service covering
              US/Canada market vehicles. The RTO directory is curated from
              standardized public RTO codes published by state transport
              departments.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="font-display text-lg font-semibold">What this is not</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>Not an RTO authority or government service.</li>
              <li>
                Not a source of ownership or legal verification — owner details
                are only shown when a provider legally/publicly supplies them.
              </li>
              <li>
                Not a guarantee of insurance, PUC or fitness status — these are
                shown only when the active provider returns them.
              </li>
              <li>
                Not affiliated with CarInfo or any vehicle-information product.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <blockquote className="border-l-2 border-primary/40 pl-4 font-display text-lg font-medium">
              {SITE.name} — {TAGLINES.trace}
            </blockquote>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Every vehicle you trace leaves a record behind it — our job is to
              surface the publicly available part of that record, clearly and
              honestly, so you can make confident decisions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="font-display text-lg font-semibold">Disclaimer</h2>
            <blockquote className="border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-muted-foreground">
              Vehicle information depends on the selected data provider and
              regional availability. This platform only displays information made
              available through supported public/API sources and does not
              guarantee the completeness, accuracy, or official status of every
              record. Information should be independently verified before making
              financial or legal decisions.
            </blockquote>
            <p className="text-sm text-muted-foreground">
              If a lookup type is not supported by the configured provider,
              {SITE.name} reports it honestly instead of fabricating data. In
              development, mock mode provides clearly-labeled sample data so the
              product can be explored without credentials.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
