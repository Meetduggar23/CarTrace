import { Database, FlaskConical, RefreshCw } from "lucide-react";
import type { LookupResult } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function DataSourceFooter({ result }: { result: LookupResult }) {
  const { record, providerName, cached } = result;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-border bg-card/40 px-4 py-3 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <Database className="h-3.5 w-3.5" aria-hidden />
        <span className="font-medium text-foreground">Source:</span> {providerName}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <RefreshCw className="h-3.5 w-3.5" aria-hidden />
        <span className="font-medium text-foreground">Retrieved:</span>{" "}
        {formatDate(record.sourceTimestamp) ?? "recently"}
      </span>
      {cached && <span>from cache</span>}
      {record.isMock && (
        <span className="inline-flex items-center gap-1.5 font-medium text-warning">
          <FlaskConical className="h-3.5 w-3.5" aria-hidden />
          Development mock data — not real vehicle information
        </span>
      )}
    </div>
  );
}
