import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  Car,
  Heart,
  Loader2,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/services/auth";
import { api } from "@/services/api";
import { formatRegistration } from "@/lib/utils";

export function SavedVehiclesPage() {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [renaming, setRenaming] = useState<{ id: string; name: string } | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const vehicles = useQuery({
    queryKey: ["vehicles"],
    queryFn: api.listVehicles,
    enabled: isAuthenticated,
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.deleteVehicle(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vehicles"] }),
  });

  const rename = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      api.renameVehicle(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      setRenaming(null);
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <Seo title="Saved Vehicles" path="/saved" />
        <EmptyState
          icon={Heart}
          title="Sign in to save vehicles"
          description="Create a free account to keep frequently checked vehicles in one dashboard."
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
        title="Saved Vehicles"
        description="Your saved vehicles — keep frequently checked vehicles in one dashboard."
        path="/saved"
      />
      <PageHeader
        title="My Vehicles"
        description="Your saved vehicles, ready to re-check with one click."
      />

      <div className="mt-8">
        {vehicles.isLoading ? (
          <div className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading your vehicles…
          </div>
        ) : vehicles.data && vehicles.data.vehicles.length > 0 ? (
          <ul className="space-y-3">
            {vehicles.data.vehicles.map((vehicle) => {
              const name =
                vehicle.customName ||
                [vehicle.manufacturer, vehicle.model].filter(Boolean).join(" ") ||
                formatRegistration(vehicle.registrationNumber) ||
                vehicle.vin ||
                "Saved vehicle";
              const query = vehicle.registrationNumber ?? vehicle.vin ?? "";
              return (
                <li
                  key={vehicle.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <p className="truncate font-display font-semibold">{name}</p>
                      {vehicle.customName && (
                        <Badge variant="muted">{vehicle.model ?? vehicle.manufacturer ?? "vehicle"}</Badge>
                      )}
                    </div>
                    <p className="mt-1 font-mono text-sm text-muted-foreground">
                      {formatRegistration(vehicle.registrationNumber) ?? vehicle.vin}
                      {vehicle.modelYear ? ` · ${vehicle.modelYear}` : ""}
                      {vehicle.fuelType ? ` · ${vehicle.fuelType}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/vehicle/${query}`}>
                        <Search className="h-3.5 w-3.5" aria-hidden /> Check
                      </Link>
                    </Button>
                    <Dialog
                      open={renaming?.id === vehicle.id}
                      onOpenChange={(open) => {
                        if (!open) setRenaming(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Rename ${name}`}
                          onClick={() => {
                            setRenaming({ id: vehicle.id, name: name });
                            setRenameValue(vehicle.customName ?? "");
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Rename vehicle</DialogTitle>
                          <DialogDescription>
                            Give this vehicle a memorable name.
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (renaming) rename.mutate({ id: renaming.id, name: renameValue });
                          }}
                          className="space-y-4"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="rename-input">Custom name</Label>
                            <Input
                              id="rename-input"
                              value={renameValue}
                              onChange={(e) => setRenameValue(e.target.value)}
                              placeholder={name}
                              maxLength={100}
                            />
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setRenaming(null)}>
                              Cancel
                            </Button>
                            <Button type="submit" disabled={rename.isPending}>
                              {rename.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                              ) : null}
                              Save name
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${name}`}
                      onClick={() => remove.mutate(vehicle.id)}
                      disabled={remove.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState
            icon={Heart}
            title="No saved vehicles yet"
            description="Search a vehicle and press “Save vehicle” to keep it here."
            action={
              <Link to="/vehicle">
                <Button>
                  Search a vehicle <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
}
