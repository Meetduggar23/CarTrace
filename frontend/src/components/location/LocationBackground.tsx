import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface LocationBackgroundProps {
  /** Image URL to show; falls back to the section's base color on error. */
  image: string;
}

/** Fast cinematic crossfade between two background layers. */
const CROSSFADE_S = 0.4;

/**
 * Location-aware hero background. Preloads the incoming image, then fades it
 * in over the current one via two absolutely-positioned layers, so the old
 * background stays visible while the new one loads — the hero never flashes
 * blank and the settled layer never re-animates. Only `opacity` animates, so
 * there is no layout shift. If an image fails to load, the layer stays
 * transparent and the section's navy base color shows as a fallback.
 */
export function LocationBackground({ image }: LocationBackgroundProps) {
  const [current, setCurrent] = useState({ src: image, key: 0 });
  const [pending, setPending] = useState<{ src: string; key: number } | null>(null);
  const commitTimer = useRef<number | null>(null);

  // Preload the incoming image; only fade it in once it is ready.
  useEffect(() => {
    if (image === current.src) return;
    const img = new Image();
    let cancelled = false;
    const swap = () => {
      if (!cancelled) setPending({ src: image, key: current.key + 1 });
    };
    img.onload = swap;
    img.onerror = swap; // failed load → transparent layer → navy fallback
    img.src = image;
    return () => {
      cancelled = true;
    };
  }, [image, current.src, current.key]);

  // After the fade finishes, promote the pending layer to current. The
  // settled layer always renders at full opacity, so promotion is seamless.
  useEffect(() => {
    if (!pending) return;
    commitTimer.current = window.setTimeout(() => {
      setCurrent(pending);
      setPending(null);
    }, CROSSFADE_S * 1000);
    return () => {
      if (commitTimer.current) window.clearTimeout(commitTimer.current);
    };
  }, [pending]);

  return (
    <div className="absolute inset-0" aria-hidden>
      <div
        key={current.key}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${current.src})` }}
      />
      {pending && (
        <motion.div
          key={pending.key}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pending.src})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: CROSSFADE_S, ease: "easeOut" }}
        />
      )}
    </div>
  );
}
