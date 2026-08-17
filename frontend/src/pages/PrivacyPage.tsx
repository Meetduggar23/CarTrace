import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/lib/constants";

export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo title="Privacy" description="How AutoCheck handles your data." path="/privacy" />
      <PageHeader title="Privacy Policy" description={`How ${SITE.name} handles your data.`} />

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="space-y-4 p-6 text-sm leading-relaxed text-muted-foreground">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Vehicle searches
            </h2>
            <p>
              Basic vehicle search does not require an account. Searches you
              perform as a guest are kept in your browser&apos;s local storage
              only (recent searches) and are cleared when you clear browser
              data or press “Clear history”.
            </p>

            <h2 className="font-display text-lg font-semibold text-foreground">
              Accounts
            </h2>
            <p>
              When you create an account, we store your name, email address and
              a securely hashed password. Passwords are hashed with bcrypt and
              are never stored in plain text. Authentication uses signed JWTs.
            </p>

            <h2 className="font-display text-lg font-semibold text-foreground">
              Saved vehicles and history
            </h2>
            <p>
              Saved vehicles and search history are tied to your account and are
              visible only to you. You can delete them at any time from the
              Saved Vehicles and Search History pages.
            </p>

            <h2 className="font-display text-lg font-semibold text-foreground">
              Vehicle data
            </h2>
            <p>
              The vehicle information displayed comes from third-party public
              APIs and public directories. {SITE.name} does not collect or sell
              vehicle records, and does not display personal owner information
              unless a provider publicly supplies it.
            </p>

            <h2 className="font-display text-lg font-semibold text-foreground">
              Analytics & cookies
            </h2>
            <p>
              This project does not include third-party analytics or tracking
              cookies. Theme and compare preferences are stored locally in your
              browser.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
