import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Database,
  FlaskConical,
  KeyRound,
  Loader2,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/services/api";
import { formatDate } from "@/lib/utils";

const CAPABILITY_LABELS: Record<string, string> = {
  vin: "VIN Lookup",
  registration: "Registration",
  specs: "Specifications",
};

export function ProvidersPage() {
  const providers = useQuery({
    queryKey: ["providers"],
    queryFn: api.providers,
    refetchInterval: 60_000,
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="Data Providers"
        description="Status and capabilities of the vehicle data providers powering AutoCheck."
        path="/providers"
      />
      <PageHeader
        title="Data Providers"
        description="Which vehicle data providers power AutoCheck, their status and what each one supports."
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => providers.refetch()}
          disabled={providers.isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${providers.isFetching ? "animate-spin" : ""}`} aria-hidden />
          Refresh
        </Button>
      </PageHeader>

      <div className="mt-8 space-y-4">
        {providers.isLoading ? (
          <div className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Checking providers…
          </div>
        ) : providers.data ? (
          providers.data.map((provider, i) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {provider.isMock ? (
                        <FlaskConical className="h-5 w-5 text-warning" aria-hidden />
                      ) : (
                        <Database className="h-5 w-5 text-primary" aria-hidden />
                      )}
                      <div>
                        <h2 className="font-display text-base font-semibold">{provider.name}</h2>
                        <p className="text-sm text-muted-foreground">{provider.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {provider.status === "connected" ? (
                        <Badge variant="success" className="gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Connected
                        </Badge>
                      ) : provider.status === "disabled" ? (
                        <Badge variant="muted" className="gap-1">
                          <XCircle className="h-3 w-3" /> Disabled
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1">
                          <XCircle className="h-3 w-3" /> Unavailable
                        </Badge>
                      )}
                      {provider.isMock && <Badge variant="warning">Development mock</Badge>}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-border bg-card/50 p-4">
                      <h3 className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        <KeyRound className="h-3.5 w-3.5" aria-hidden /> Authentication
                      </h3>
                      <p className="mt-1.5 text-sm font-medium">
                        {provider.requiresAuth
                          ? provider.authConfigured
                            ? "API key configured"
                            : "API key required — not configured"
                          : "None required"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-card/50 p-4">
                      <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Coverage
                      </h3>
                      <p className="mt-1.5 text-sm font-medium">
                        {provider.countries.join(", ") || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Capabilities
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(["vin", "registration", "specs"] as const).map((cap) => (
                        <Badge
                          key={cap}
                          variant={provider.capabilities.includes(cap) ? "success" : "muted"}
                          className="gap-1"
                        >
                          {provider.capabilities.includes(cap) ? (
                            <CheckCircle2 className="h-3 w-3" aria-hidden />
                          ) : (
                            <XCircle className="h-3 w-3" aria-hidden />
                          )}
                          {CAPABILITY_LABELS[cap]}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    Last checked: {formatDate(provider.lastChecked) ?? "never"}
                    {provider.message ? ` — ${provider.message}` : ""}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Provider status is temporarily unavailable.
          </p>
        )}
      </div>
    </div>
  );
}
