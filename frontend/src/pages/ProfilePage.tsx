import { Link, useNavigate } from "react-router-dom";
import { Heart, History, LogOut, UserRound } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/services/auth";
import { SITE } from "@/lib/constants";

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Seo title="My Profile" description={`Sign in to ${SITE.name} to view your profile.`} path="/profile" />
        <PageHeader title="My Profile" description="Sign in to see your account details." />
        <div className="mt-8 flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-8 text-center">
          <UserRound className="h-8 w-8 text-muted-foreground" aria-hidden />
          <p className="text-sm text-muted-foreground">
            You're not signed in. Log in to view your profile, saved vehicles and history.
          </p>
          <div className="mt-2 flex gap-3">
            <Button onClick={() => navigate("/login")}>Log in</Button>
            <Button variant="outline" onClick={() => navigate("/signup")}>
              Sign up
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="My Profile"
        description={`${SITE.name} account profile for ${user.name}.`}
        path="/profile"
      />
      <PageHeader
        title="My Profile"
        description="Your account details and personal shortcuts."
      />

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-xl font-semibold text-primary">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <h2 className="font-display text-lg font-semibold">{user.name}</h2>
              <p className="truncate text-sm text-muted-foreground">{user.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2 p-4">
            <h2 className="px-2 pb-1 font-display text-base font-semibold">Quick links</h2>
            <Link
              to="/saved"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <Heart className="h-4 w-4 text-muted-foreground" aria-hidden /> Saved Vehicles
            </Link>
            <Link
              to="/history"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <History className="h-4 w-4 text-muted-foreground" aria-hidden /> Search History
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" aria-hidden /> Log out
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
