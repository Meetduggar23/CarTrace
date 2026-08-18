import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Seo } from "@/components/common/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FeaturePlaceholderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Explains what the feature is / how it is served today. */
  note: string;
  /** Quick actions into existing tools. */
  actions: { label: string; to: string }[];
  path: string;
}

/**
 * Standalone page for a navigation feature. Each feature surfaces what it will
 * offer and routes users into the existing tools that already provide that
 * information — nothing is fabricated.
 */
export function FeaturePlaceholder({
  icon: Icon,
  title,
  description,
  note,
  actions,
  path,
}: FeaturePlaceholderProps) {
  const [searchParams] = useSearchParams();
  const reg = searchParams.get("reg");
  const q = searchParams.get("q");
  const searched = reg ?? q;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo title={title} description={description} path={path} />
      <PageHeader title={title} description={description} />

      <Card className="mt-8">
        <CardContent className="flex flex-col items-center p-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-8 w-8 text-primary" aria-hidden />
          </div>
          <h2 className="mt-5 font-display text-xl font-semibold">{title}</h2>
          {searched && (
            <p className="mt-2 rounded-md border border-border bg-muted/40 px-3 py-1.5 font-mono text-sm text-foreground">
              You searched for: {searched}
            </p>
          )}
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{note}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {actions.map((action) => (
              <Link key={action.to} to={action.to}>
                <Button variant={action === actions[0] ? "default" : "outline"}>
                  {action.label} <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
