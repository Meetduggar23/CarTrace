import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, GitCompareArrows, Heart, Loader2 } from "lucide-react";
import type { VehicleRecord } from "@/lib/types";
import { useAuth } from "@/services/auth";
import { api } from "@/services/api";
import { addToCompare, isInCompare, removeFromCompare } from "@/services/compare";
import { Button } from "@/components/ui/button";

export function VehicleActions({ record }: { record: VehicleRecord }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savingError, setSavingError] = useState<string | null>(null);
  const [comparing, setComparing] = useState(() => isInCompare(record));

  async function handleSave() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setSaving(true);
    setSavingError(null);
    try {
      await api.saveVehicle(record);
      setSaved(true);
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    } catch (err) {
      setSavingError(
        err instanceof Error ? err.message : "Could not save this vehicle."
      );
    } finally {
      setSaving(false);
    }
  }

  function handleCompare() {
    if (comparing) {
      removeFromCompare(record.id);
      setComparing(false);
    } else {
      addToCompare(record);
      setComparing(true);
    }
    queryClient.invalidateQueries({ queryKey: ["compare"] });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="outline" size="sm" onClick={handleCompare}>
        <GitCompareArrows className="h-4 w-4" aria-hidden />
        {comparing ? "Remove from compare" : "Add to compare"}
      </Button>
      {isAuthenticated ? (
        <Button
          size="sm"
          onClick={handleSave}
          disabled={saving || saved}
          variant={saved ? "secondary" : "default"}
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : saved ? (
            <Heart className="h-4 w-4 fill-current" aria-hidden />
          ) : (
            <Bookmark className="h-4 w-4" aria-hidden />
          )}
          {saved ? "Saved" : "Save vehicle"}
        </Button>
      ) : (
        <Button size="sm" onClick={() => navigate("/login")}>
          <Heart className="h-4 w-4" aria-hidden />
          Save vehicle
        </Button>
      )}

      <AnimatePresence>
        {savingError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="text-sm text-destructive"
          >
            {savingError}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
