import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { History, Loader2, Trash2 } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/services/auth";
import { api } from "@/services/api";
import { formatRegistration, timeAgo } from "@/lib/utils";

export function HistoryPage() {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const history = useQuery({
    queryKey: ["history"],
    queryFn: api.listHistory,
    enabled: isAuthenticated,
  });

  const clear = useMutation({
    mutationFn: api.clearHistory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["history"] }),
  });

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <Seo title="Search History" path="/history" />
        <EmptyState
          icon={History}
          title="Sign in to see your history"
          description="Create a free account to keep your search history across devices."
          action={
            <Link to="/login">
              <Button>Log in</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="Search History"
        description="Your recent vehicle lookups."
        path="/history"
      />
      <PageHeader title="Search History" description="Your recent vehicle lookups.">
        {history.data && history.data.history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => clear.mutate()}
            disabled={clear.isPending}
          >
            {clear.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Trash2 className="h-4 w-4" aria-hidden />
            )}
            Clear history
          </Button>
        )}
      </PageHeader>

      <div className="mt-8">
        {history.isLoading ? (
          <div className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading history…
          </div>
        ) : history.data && history.data.history.length > 0 ? (
          <ul className="space-y-2">
            {history.data.history.map((entry) => (
              <li key={entry.id}>
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
                    {entry.result && (
                      <span className="hidden truncate text-sm text-muted-foreground sm:inline">
                        {[entry.result.manufacturer, entry.result.model].filter(Boolean).join(" ")}
                      </span>
                    )}
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {entry.lookupType}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {timeAgo(entry.createdAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={History}
            title="No searches yet"
            description="Vehicles you look up while signed in will appear here."
            action={
              <Link to="/vehicle">
                <Button>Search a vehicle</Button>
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
}
