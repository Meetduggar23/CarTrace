import { useMemo } from "react";
import { Link } from "react-router-dom";
import { History, Trash2 } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchForm } from "@/components/search/SearchForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  clearGuestHistory,
  getGuestHistory,
} from "@/services/history";
import { formatRegistration, timeAgo } from "@/lib/utils";
import { useState } from "react";

export function VehicleSearchPage() {
  const [refresh, setRefresh] = useState(0);
  const recents = useMemo(() => getGuestHistory(), [refresh]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="Vehicle Check"
        description="Enter a vehicle registration number or VIN to check publicly available vehicle information."
        path="/vehicle"
      />
      <PageHeader
        title="Vehicle Check"
        description="Enter a registration number or a 17-character VIN to check publicly available vehicle information."
      />

      <div className="mt-8">
        <SearchForm />
      </div>

      {/* Recent searches (guest history) */}
      <section className="mt-12" aria-labelledby="recent-searches">
        <div className="flex items-center justify-between">
          <h2 id="recent-searches" className="flex items-center gap-2 font-display text-lg font-semibold">
            <History className="h-[1.125rem] w-[1.125rem] text-muted-foreground" aria-hidden />
            Recent Searches
          </h2>
          {recents.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                clearGuestHistory();
                setRefresh((r) => r + 1);
              }}
            >
              <Trash2 className="h-4 w-4" aria-hidden /> Clear history
            </Button>
          )}
        </div>

        {recents.length === 0 ? (
          <Card className="mt-4">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <History className="h-8 w-8 text-muted-foreground/50" aria-hidden />
              <p className="mt-3 text-sm font-medium">No recent searches yet</p>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                Searches on this device appear here. Sign in to keep history
                across devices.
              </p>
            </CardContent>
          </Card>
        ) : (
          <ul className="mt-4 space-y-2">
            {recents.map((entry) => (
              <li key={`${entry.query}-${entry.checkedAt}`}>
                <Link
                  to={
                    entry.lookupType === "vin"
                      ? `/vehicle/vin/${entry.query}`
                      : `/vehicle/${entry.query}`
                  }
                  className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3 transition-all hover:border-primary/40"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="font-mono font-semibold tracking-wide">
                      {entry.lookupType === "registration"
                        ? formatRegistration(entry.query)
                        : entry.query}
                    </span>
                    {entry.label && (
                      <span className="hidden truncate text-sm text-muted-foreground sm:inline">
                        {entry.label}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {timeAgo(entry.checkedAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
