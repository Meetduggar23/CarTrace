import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/lib/constants";

export function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo title="Terms" description="Terms of use for AutoCheck." path="/terms" />
      <PageHeader title="Terms of Use" description={`Terms for using ${SITE.name}.`} />

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="space-y-4 p-6 text-sm leading-relaxed text-muted-foreground">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Acceptance of terms
            </h2>
            <p>
              By using {SITE.name} you agree to these terms. If you do not agree,
              please do not use the service.
            </p>

            <h2 className="font-display text-lg font-semibold text-foreground">
              Informational purpose only
            </h2>
            <p>
              All vehicle information is provided for general informational
              purposes only and comes from third-party public/API sources.
              {SITE.name} makes no warranty about the accuracy, completeness, or
              official status of any record. Do not rely on this service for
              legal, financial, or ownership decisions without independent
              verification.
            </p>

            <h2 className="font-display text-lg font-semibold text-foreground">
              Acceptable use
            </h2>
            <p>
              You agree not to use the service to harass, defraud, or collect
              personal information about individuals, to probe or abuse the API,
              or to resell scraped data.
            </p>

            <h2 className="font-display text-lg font-semibold text-foreground">
              No affiliation
            </h2>
            <p>
              {SITE.name} is an independent product. It is not affiliated with,
              endorsed by, or connected to CarInfo, any RTO/government authority,
              or the vehicle data providers.
            </p>

            <h2 className="font-display text-lg font-semibold text-foreground">
              Liability
            </h2>
            <p>
              To the maximum extent permitted by law, {SITE.name} is provided
              “as is” without warranties of any kind, and we are not liable for
              any damages arising from its use.
            </p>

            <h2 className="font-display text-lg font-semibold text-foreground">
              Changes
            </h2>
            <p>
              We may update these terms from time to time. Continued use after
              changes constitutes acceptance.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
