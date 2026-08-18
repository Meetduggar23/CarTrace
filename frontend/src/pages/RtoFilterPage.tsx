import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Landmark, Loader2, MapPin } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { EmptyState } from "@/components/common/EmptyState";
import { api } from "@/services/api";

export function RtoFilterPage({ filter }: { filter: "state" | "city" }) {
  const { value } = useParams<{ value: string }>();
  const query = useQuery({
    queryKey: ["rto", filter, value],
    queryFn: () =>
      filter === "state"
        ? api.listRto({ state: value ?? "" })
        : api.listRto({ city: value ?? "" }),
    retry: 1,
  });

  const title = filter === "state" ? `RTOs in ${value?.toUpperCase()}` : `RTOs in ${value}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title={title}
        description={`RTO offices in ${value} — browse standardized public RTO codes.`}
        path={`/rto/${filter}/${value ?? ""}`}
      />

      <Link
        to="/rto"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> RTO directory
      </Link>

      <p className="kicker mt-6">CarTrace — See Beyond the Plate.</p>

      <h1 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{title}</h1>

      <div className="mt-8">
        {query.isLoading ? (
          <div className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading…
          </div>
        ) : query.data && query.data.results.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {query.data.results.map((rto) => (
              <li key={rto.code}>
                <Link
                  to={`/rto/${rto.code}`}
                  className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40"
                >
                  <span className="flex h-11 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-bold text-primary">
                    {rto.code}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{rto.officeName}</span>
                    <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" aria-hidden />
                      {rto.city}, {rto.state}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={Landmark}
            title={`No RTOs found for ${value}`}
            description="Try browsing the full directory instead."
            action={
              <Link to="/rto" className="text-sm font-medium text-primary hover:underline">
                Open RTO directory
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
}
