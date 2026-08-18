import { Link } from "react-router-dom";
import { Bookmark, History, ScrollText, ShieldCheck } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/lib/constants";

const SETTINGS_LINKS = [
  {
    to: "/saved",
    icon: Bookmark,
    title: "Saved Vehicles",
    text: "Manage the vehicles you've saved to your dashboard.",
  },
  {
    to: "/history",
    icon: History,
    title: "Search History",
    text: "Review and clear your recent lookups.",
  },
  {
    to: "/privacy",
    icon: ShieldCheck,
    title: "Privacy",
    text: "How your data and searches are handled.",
  },
  {
    to: "/terms",
    icon: ScrollText,
    title: "Terms of Use",
    text: "The terms that apply when you use the service.",
  },
];

export function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="Settings"
        description={`${SITE.name} account and privacy settings.`}
        path="/settings"
      />
      <PageHeader
        title="Settings"
        description="Manage your account-related preferences and review how the service works."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SETTINGS_LINKS.map((item) => (
          <Link key={item.to} to={item.to}>
            <Card className="h-full transition-colors hover:border-primary/40">
              <CardContent className="p-5">
                <item.icon className="h-5 w-5 text-primary" aria-hidden />
                <h2 className="mt-3 font-display text-base font-semibold">{item.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Account settings are stored securely with your {SITE.name} profile.
      </p>
    </div>
  );
}
