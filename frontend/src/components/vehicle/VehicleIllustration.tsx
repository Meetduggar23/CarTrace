interface VehicleIllustrationProps {
  className?: string;
}

/**
 * Generic vehicle illustration. AutoCheck never fabricates a photograph of
 * a specific vehicle — when a provider returns no image we show this neutral
 * illustration instead.
 */
export function VehicleIllustration({ className }: VehicleIllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Generic vehicle illustration"
    >
      <defs>
        <linearGradient id="carBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.85)" />
          <stop offset="100%" stopColor="hsl(var(--accent) / 0.55)" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--foreground) / 0.12)" />
          <stop offset="100%" stopColor="hsl(var(--foreground) / 0.02)" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="200" cy="172" rx="150" ry="12" fill="url(#ground)" />

      {/* Car body */}
      <path
        d="M60 150c0-11 6-20 16-24l14-38c4-11 14-18 25-18h110c10 0 19 5 24 14l24 42c9 4 15 13 15 24v8a8 8 0 0 1-8 8h-22a26 26 0 0 1-52 0H122a26 26 0 0 1-52 0H68a8 8 0 0 1-8-8v-8Z"
        fill="url(#carBody)"
      />

      {/* Windows */}
      <path
        d="M110 74h-6c-8 0-15 5-18 13l-12 33h40V88c0-8 7-14 15-14h60c8 0 15 6 15 14v32h40l-12-33c-3-8-10-13-18-13h-6l-6-10a10 10 0 0 0-9-5h-64a10 10 0 0 0-9 5l-10 10Z"
        fill="hsl(var(--card))"
        opacity="0.9"
      />

      {/* Headlight */}
      <rect x="58" y="120" width="14" height="8" rx="3" fill="hsl(var(--accent))" opacity="0.9" />
      {/* Taillight */}
      <rect x="330" y="120" width="12" height="8" rx="3" fill="hsl(var(--destructive) / 0.8)" />

      {/* Wheels */}
      <circle cx="122" cy="152" r="24" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="4" />
      <circle cx="122" cy="152" r="10" fill="hsl(var(--muted-foreground) / 0.6)" />
      <circle cx="280" cy="152" r="24" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="4" />
      <circle cx="280" cy="152" r="10" fill="hsl(var(--muted-foreground) / 0.6)" />
    </svg>
  );
}
