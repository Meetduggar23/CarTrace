import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

/**
 * Locations offered by the CarTrace location selector.
 *
 * Covers all 28 Indian states and 8 union territories, each paired with a
 * recognizable landmark and a direct Pixabay CDN image (royalty-free,
 * hotlinkable). Images are sourced from Pixabay's India monuments collection.
 */
export interface LocationOption {
  /** State / UT display name, e.g. "Rajasthan". */
  label: string;
  /** Two-letter code, e.g. "RJ". */
  code: string;
  /** Grouping shown in the selector: states vs union territories. */
  group: "state" | "ut";
  /** Short landmark / landscape caption shown under the name. */
  landmark: string;
  /** Direct image URL (Pixabay CDN, 1280px). */
  image: string;
}

export const LOCATION_OPTIONS: LocationOption[] = [
  {
    label: "India",
    code: "IN",
    group: "state",
    landmark: "Rashtrapati Bhavan",
    image: "https://cdn.pixabay.com/photo/2020/01/25/17/33/rashtrapati-bhawan-4792982_1280.jpg",
  },
  {
    label: "Andhra Pradesh",
    code: "AP",
    group: "state",
    landmark: "Lepakshi Temple",
    image: "https://cdn.pixabay.com/photo/2015/05/20/07/57/lepakshi-774935_1280.jpg",
  },
  {
    label: "Arunachal Pradesh",
    code: "AR",
    group: "state",
    landmark: "Tawang Monastery",
    image: "https://cdn.pixabay.com/photo/2022/01/01/15/08/tawang-monastery-6907759_1280.jpg",
  },
  {
    label: "Assam",
    code: "AS",
    group: "state",
    landmark: "Brahmaputra River",
    image: "https://cdn.pixabay.com/photo/2021/03/02/11/00/brahmaputra-boatman-6062086_1280.jpg",
  },
  {
    label: "Bihar",
    code: "BR",
    group: "state",
    landmark: "Bodh Gaya",
    image: "https://cdn.pixabay.com/photo/2017/08/03/15/53/buddhist-2576958_1280.jpg",
  },
  {
    label: "Chhattisgarh",
    code: "CG",
    group: "state",
    landmark: "Tandula Lake",
    image: "https://cdn.pixabay.com/photo/2018/07/02/09/12/tandula-3511190_1280.jpg",
  },
  {
    label: "Goa",
    code: "GA",
    group: "state",
    landmark: "Basilica of Bom Jesus",
    image: "https://cdn.pixabay.com/photo/2013/08/15/15/23/goa-172819_1280.jpg",
  },
  {
    label: "Gujarat",
    code: "GJ",
    group: "state",
    landmark: "Statue of Unity",
    image: "https://cdn.pixabay.com/photo/2019/02/02/18/07/statue-of-unity-3971077_1280.jpg",
  },
  {
    label: "Haryana",
    code: "HR",
    group: "state",
    landmark: "Kurukshetra",
    image: "https://cdn.pixabay.com/photo/2020/05/17/13/14/kurukshetra-5181585_1280.jpg",
  },
  {
    label: "Himachal Pradesh",
    code: "HP",
    group: "state",
    landmark: "Manali",
    image: "https://cdn.pixabay.com/photo/2016/12/30/23/16/manali-1941810_1280.jpg",
  },
  {
    label: "Jharkhand",
    code: "JH",
    group: "state",
    landmark: "Dassam Falls",
    image: "https://cdn.pixabay.com/photo/2022/09/30/11/02/waterfall-7489267_1280.jpg",
  },
  {
    label: "Karnataka",
    code: "KA",
    group: "state",
    landmark: "Mysore Palace",
    image: "https://cdn.pixabay.com/photo/2020/09/17/18/10/palace-5579991_1280.jpg",
  },
  {
    label: "Kerala",
    code: "KL",
    group: "state",
    landmark: "Kerala Backwaters",
    image: "https://cdn.pixabay.com/photo/2013/07/19/17/38/kerala-165347_1280.jpg",
  },
  {
    label: "Madhya Pradesh",
    code: "MP",
    group: "state",
    landmark: "Khajuraho Temples",
    image: "https://cdn.pixabay.com/photo/2018/04/02/11/56/khajuraho-3283685_1280.jpg",
  },
  {
    label: "Maharashtra",
    code: "MH",
    group: "state",
    landmark: "Gateway of India",
    image: "https://cdn.pixabay.com/photo/2015/01/23/12/43/gateway-of-india-609076_1280.jpg",
  },
  {
    label: "Manipur",
    code: "MN",
    group: "state",
    landmark: "Manipur",
    image: "https://cdn.pixabay.com/photo/2021/06/14/18/57/manipur-6336729_1280.jpg",
  },
  {
    label: "Meghalaya",
    code: "ML",
    group: "state",
    landmark: "Umiam Lake",
    image: "https://cdn.pixabay.com/photo/2021/12/29/09/15/barapani-6901147_1280.jpg",
  },
  {
    label: "Mizoram",
    code: "MZ",
    group: "state",
    landmark: "Aizawl",
    image: "https://cdn.pixabay.com/photo/2019/12/10/17/00/aizawl-4686218_1280.jpg",
  },
  {
    label: "Nagaland",
    code: "NL",
    group: "state",
    landmark: "Naga Hills",
    image: "https://cdn.pixabay.com/photo/2025/11/13/17/13/nagaland-9955206_1280.jpg",
  },
  {
    label: "Odisha",
    code: "OD",
    group: "state",
    landmark: "Konark Sun Temple",
    image: "https://cdn.pixabay.com/photo/2014/03/28/03/44/sun-temple-299944_1280.jpg",
  },
  {
    label: "Punjab",
    code: "PB",
    group: "state",
    landmark: "Golden Temple",
    image: "https://cdn.pixabay.com/photo/2018/01/15/10/41/amritsar-3083693_1280.jpg",
  },
  {
    label: "Rajasthan",
    code: "RJ",
    group: "state",
    landmark: "Hawa Mahal",
    image: "https://cdn.pixabay.com/photo/2021/04/06/11/22/hawa-mahal-6156123_1280.jpg",
  },
  {
    label: "Sikkim",
    code: "SK",
    group: "state",
    landmark: "Kanchenjunga",
    image: "https://cdn.pixabay.com/photo/2017/08/03/05/17/goechala-2574736_1280.jpg",
  },
  {
    label: "Tamil Nadu",
    code: "TN",
    group: "state",
    landmark: "Brihadeeswarar Temple",
    image: "https://cdn.pixabay.com/photo/2017/04/11/20/28/brihadeeswarar-temple-2222737_1280.jpg",
  },
  {
    label: "Telangana",
    code: "TS",
    group: "state",
    landmark: "Charminar",
    image: "https://cdn.pixabay.com/photo/2022/01/09/09/33/charminar-6925617_1280.jpg",
  },
  {
    label: "Tripura",
    code: "TR",
    group: "state",
    landmark: "Neermahal Palace",
    image: "https://cdn.pixabay.com/photo/2021/08/25/18/06/neermahal-6574193_1280.jpg",
  },
  {
    label: "Uttar Pradesh",
    code: "UP",
    group: "state",
    landmark: "Taj Mahal",
    image: "https://cdn.pixabay.com/photo/2019/12/14/14/05/taj-mahal-4694915_1280.jpg",
  },
  {
    label: "Uttarakhand",
    code: "UK",
    group: "state",
    landmark: "Himalayan Peaks",
    image: "https://cdn.pixabay.com/photo/2020/12/03/15/17/mayali-pass-5800786_1280.jpg",
  },
  {
    label: "West Bengal",
    code: "WB",
    group: "state",
    landmark: "Victoria Memorial",
    image: "https://cdn.pixabay.com/photo/2019/09/25/06/12/victoria-memorial-4502670_1280.jpg",
  },
  {
    label: "Andaman and Nicobar Islands",
    code: "AN",
    group: "ut",
    landmark: "Cellular Jail",
    image: "https://cdn.pixabay.com/photo/2019/02/11/04/25/jail-3988719_1280.jpg",
  },
  {
    label: "Chandigarh",
    code: "CH",
    group: "ut",
    landmark: "Rock Garden",
    image: "https://cdn.pixabay.com/photo/2013/08/14/22/37/chandigarh-172617_1280.jpg",
  },
  {
    label: "Dadra and Nagar Haveli and Daman and Diu",
    code: "DN",
    group: "ut",
    landmark: "Daman Beach",
    image: "https://cdn.pixabay.com/photo/2020/04/15/12/26/daman-5046451_1280.jpg",
  },
  {
    label: "Delhi",
    code: "DL",
    group: "ut",
    landmark: "India Gate",
    image: "https://cdn.pixabay.com/photo/2018/07/09/14/48/india-gate-3526277_1280.jpg",
  },
  {
    label: "Jammu and Kashmir",
    code: "JK",
    group: "ut",
    landmark: "Dal Lake",
    image: "https://cdn.pixabay.com/photo/2022/05/08/15/58/dal-lake-7182417_1280.jpg",
  },
  {
    label: "Ladakh",
    code: "LA",
    group: "ut",
    landmark: "Pangong Lake",
    image: "https://cdn.pixabay.com/photo/2020/07/10/08/13/pangong-lake-5389937_1280.jpg",
  },
  {
    label: "Lakshadweep",
    code: "LD",
    group: "ut",
    landmark: "Lagoon Beach",
    image: "https://cdn.pixabay.com/photo/2017/03/19/04/47/beach-2155523_1280.jpg",
  },
  {
    label: "Puducherry",
    code: "PY",
    group: "ut",
    landmark: "Pondicherry Promenade",
    image: "https://cdn.pixabay.com/photo/2021/03/02/14/03/pondicherry-6062588_1280.jpg",
  },
];

/** Quick lookup by display label, used to resolve the current navbar location. */
export function findLocation(label: string): LocationOption | undefined {
  return LOCATION_OPTIONS.find((loc) => loc.label === label);
}

/**
 * Default example registration numbers, shown for India and as the fallback
 * when a location has no config.
 */
export const DEFAULT_LOCATION_EXAMPLES: readonly string[] = [
  "MH 12 AB 1234",
  "DL 01 AB 1234",
  "RJ 14 AB 1234",
  "KA 01 AB 1234",
];

/**
 * Per-location example registration numbers for the search box, one set per
 * state/UT using its RTO prefix, so the "Try:" examples always match the
 * selected location.
 */
const LOCATION_EXAMPLES: Record<string, readonly string[]> = {
  India: DEFAULT_LOCATION_EXAMPLES,
  "Andhra Pradesh": ["AP 16 AB 1234", "AP 07 CD 5678", "AP 39 EF 9012"],
  "Arunachal Pradesh": ["AR 01 AB 1234", "AR 02 CD 5678", "AR 03 EF 9012"],
  Assam: ["AS 01 AB 1234", "AS 02 CD 5678", "AS 25 EF 9012"],
  Bihar: ["BR 01 AB 1234", "BR 02 CD 5678", "BR 06 EF 9012"],
  Chhattisgarh: ["CG 04 AB 1234", "CG 07 CD 5678", "CG 10 EF 9012"],
  Goa: ["GA 01 AB 1234", "GA 02 CD 5678", "GA 03 EF 9012"],
  Gujarat: ["GJ 01 AB 1234", "GJ 05 CD 5678", "GJ 06 EF 9012"],
  Haryana: ["HR 26 AB 1234", "HR 55 CD 5678", "HR 01 EF 9012"],
  "Himachal Pradesh": ["HP 01 AB 1234", "HP 02 CD 5678", "HP 33 EF 9012"],
  Jharkhand: ["JH 01 AB 1234", "JH 05 CD 5678", "JH 09 EF 9012"],
  Karnataka: ["KA 01 AB 1234", "KA 05 CD 5678", "KA 03 EF 9012"],
  Kerala: ["KL 01 AB 1234", "KL 07 CD 5678", "KL 11 EF 9012"],
  "Madhya Pradesh": ["MP 04 AB 1234", "MP 09 CD 5678", "MP 15 EF 9012"],
  Maharashtra: ["MH 12 AB 1234", "MH 01 CD 5678", "MH 14 EF 9012"],
  Manipur: ["MN 01 AB 1234", "MN 02 CD 5678", "MN 03 EF 9012"],
  Meghalaya: ["ML 01 AB 1234", "ML 05 CD 5678", "ML 07 EF 9012"],
  Mizoram: ["MZ 01 AB 1234", "MZ 02 CD 5678", "MZ 03 EF 9012"],
  Nagaland: ["NL 01 AB 1234", "NL 02 CD 5678", "NL 03 EF 9012"],
  Odisha: ["OD 02 AB 1234", "OD 05 CD 5678", "OD 33 EF 9012"],
  Punjab: ["PB 10 AB 1234", "PB 01 CD 5678", "PB 08 EF 9012"],
  Rajasthan: ["RJ 14 AB 1234", "RJ 01 CD 5678", "RJ 19 EF 9012"],
  Sikkim: ["SK 01 AB 1234", "SK 02 CD 5678", "SK 03 EF 9012"],
  "Tamil Nadu": ["TN 01 AB 1234", "TN 09 CD 5678", "TN 10 EF 9012"],
  Telangana: ["TS 07 AB 1234", "TS 08 CD 5678", "TS 09 EF 9012"],
  Tripura: ["TR 01 AB 1234", "TR 02 CD 5678", "TR 03 EF 9012"],
  "Uttar Pradesh": ["UP 32 AB 1234", "UP 65 CD 5678", "UP 80 EF 9012"],
  Uttarakhand: ["UK 07 AB 1234", "UK 08 CD 5678", "UK 09 EF 9012"],
  "West Bengal": ["WB 06 AB 1234", "WB 02 CD 5678", "WB 05 EF 9012"],
  "Andaman and Nicobar Islands": ["AN 01 AB 1234", "AN 02 CD 5678", "AN 03 EF 9012"],
  Chandigarh: ["CH 01 AB 1234", "CH 02 CD 5678", "CH 03 EF 9012"],
  "Dadra and Nagar Haveli and Daman and Diu": ["DN 01 AB 1234", "DN 02 CD 5678", "DN 03 EF 9012"],
  Delhi: ["DL 01 AB 1234", "DL 02 CD 5678", "DL 03 EF 9012"],
  "Jammu and Kashmir": ["JK 01 AB 1234", "JK 02 CD 5678", "JK 03 EF 9012"],
  Ladakh: ["LA 01 AB 1234", "LA 02 CD 5678", "LA 03 EF 9012"],
  Lakshadweep: ["LD 01 AB 1234", "LD 02 CD 5678", "LD 03 EF 9012"],
  Puducherry: ["PY 01 AB 1234", "PY 02 CD 5678", "PY 03 EF 9012"],
};

/** Visual/lookup configuration for a state/UT, keyed by display label. */
export interface LocationConfig {
  /** RTO prefix, e.g. "MH". */
  code: string;
  /** Landmark/landscape image used as the hero background. */
  background: string;
  /** Clickable example registration numbers for the search box. */
  examples: string[];
}

/**
 * Centralized location configuration: each state/UT maps to its RTO code,
 * landmark background image and example registrations, so the whole site can
 * adapt to the selected location from one source of truth.
 */
export const LOCATION_CONFIG: Record<string, LocationConfig> = Object.fromEntries(
  LOCATION_OPTIONS.map((loc) => [
    loc.label,
    {
      code: loc.code,
      background: loc.image,
      examples: [...(LOCATION_EXAMPLES[loc.label] ?? DEFAULT_LOCATION_EXAMPLES)],
    },
  ])
);

/** Look up the config for a location label; undefined when unknown/unselected. */
export function getLocationConfig(label: string): LocationConfig | undefined {
  return LOCATION_CONFIG[label];
}

/* ------------------------------------------------------------------ */
/* RegistrationStateDetector — centralized prefix → state/UT mapping   */
/* ------------------------------------------------------------------ */

/**
 * Centralized registration-prefix → state/UT mapping for Indian plates
 * (e.g. "MH" → Maharashtra). Derived from LOCATION_CONFIG so the RTO codes
 * always stay in sync with the rest of the location system. Covers all 28
 * states and 8 union territories with their current registration prefixes.
 */
export const registrationStateMap: Record<string, string> = Object.fromEntries(
  Object.entries(LOCATION_CONFIG).map(([label, config]) => [config.code, label])
);

/** Legacy RTO prefixes mapped to their current state codes. */
const REGISTRATION_PREFIX_ALIASES: Record<string, string> = {
  OR: "OD", // Odisha (pre-2012 plates)
  UA: "UK", // Uttarakhand (pre-2007 plates)
  DD: "DN", // Daman & Diu (pre-2020 plates)
};

/** A state/UT detected from a registration number. */
export interface RegistrationDetection {
  /** Matched location label, e.g. "Maharashtra". */
  label: string;
  /** Normalized two-letter prefix, e.g. "MH". */
  prefix: string;
}

/**
 * Reusable state detector: extract the two-letter RTO prefix from any
 * registration input (spaces and lowercase tolerated) and resolve it to a
 * state/UT. Returns null for empty, single-letter, non-letter or unknown
 * prefixes, so incomplete/ambiguous input never triggers a change.
 */
export function detectRegistrationState(input: string): RegistrationDetection | null {
  const normalized = input.replace(/[\s-]/g, "").toUpperCase();
  const prefix = normalized.slice(0, 2);
  if (!/^[A-Z]{2}$/.test(prefix)) return null;
  const code = REGISTRATION_PREFIX_ALIASES[prefix] ?? prefix;
  const label = registrationStateMap[code];
  return label ? { label, prefix: code } : null;
}

/**
 * Detect the state/UT from a registration number and return its option,
 * e.g. "MH12AB1234" → Maharashtra.
 */
export function detectLocationFromRegistration(reg: string): LocationOption | undefined {
  const detected = detectRegistrationState(reg);
  return detected ? findLocation(detected.label) : undefined;
}

/* ------------------------------------------------------------------ */
/* LocationManager — shared selected-location store                    */
/* ------------------------------------------------------------------ */

/**
 * Where the current location came from. "default" (India) is the root state
 * on every reload; "auto" comes from vehicle-number detection; "manual"
 * comes from the location modal. A manual selection is never overridden by
 * typing — it only switches after explicit confirmation.
 */
export type LocationSource = "default" | "auto" | "manual";

/** Root/default location — shown on every fresh reload. */
export const DEFAULT_LOCATION = "India";

let currentLocation: string = DEFAULT_LOCATION;
let currentSource: LocationSource = "default";
const locationListeners = new Set<() => void>();

/** Current selected location label (defaults to India). */
export function getSelectedLocation(): string {
  return currentLocation;
}

/** How the current location was chosen (default / auto / manual). */
export function getLocationSource(): LocationSource {
  return currentSource;
}

/** Select a location explicitly (e.g. from the modal) and notify subscribers. */
export function setSelectedLocation(label: string, source: LocationSource = "manual"): void {
  if (label === currentLocation && source === currentSource) return;
  currentLocation = label;
  currentSource = source;
  locationListeners.forEach((listener) => listener());
}

/**
 * Apply a state detected from a registration number. Auto-detection always
 * wins over the default (India) and over a previously auto-detected state,
 * but never overrides a manually selected one — in that case it returns
 * false so the UI can offer to switch.
 */
export function applyDetectedLocation(label: string): boolean {
  if (currentSource === "manual" && currentLocation !== label) return false;
  setSelectedLocation(label, "auto");
  return true;
}

/** Subscribe to location changes; returns an unsubscribe function. */
export function subscribeSelectedLocation(listener: () => void): () => void {
  locationListeners.add(listener);
  return () => {
    locationListeners.delete(listener);
  };
}

/** Reactive hook for the selected site location, e.g. "Rajasthan". */
export function useSelectedLocation(): string {
  return useSyncExternalStore(subscribeSelectedLocation, getSelectedLocation);
}

/** Reactive hook for how the current location was chosen. */
export function useLocationSource(): LocationSource {
  return useSyncExternalStore(subscribeSelectedLocation, getLocationSource);
}

/**
 * LocationManager hook for a registration input. Detects the state from the
 * value while the user types and auto-selects it immediately (never
 * overriding a manual selection), exposing the confirmation flow for
 * conflicts. Pass `enabled={false}` to suppress detection (e.g. in VIN mode).
 */
export function useRegistrationLocationSync(value: string, enabled = true) {
  const location = useSelectedLocation();
  const source = useLocationSource();
  const detected = useMemo(
    () => (enabled ? detectRegistrationState(value) : null),
    [value, enabled]
  );
  const [dismissedLabel, setDismissedLabel] = useState<string | null>(null);

  const blockedByManual =
    detected !== null && source === "manual" && detected.label !== location;
  const showConflict = blockedByManual && dismissedLabel !== detected.label;

  // Auto-select immediately while typing — only the background crossfade is
  // animated; the state change itself is instant and never touches the input.
  useEffect(() => {
    if (!detected || blockedByManual) return;
    applyDetectedLocation(detected.label);
  }, [detected, blockedByManual]);

  return {
    /** Current selected location label. */
    location,
    /** Detected state/UT from the input, if any. */
    detected,
    /** True when the conflict prompt should be shown. */
    showConflict,
    /** Accept the detected state (used by "Switch to …"). */
    confirmSwitch: () => {
      if (detected) {
        setSelectedLocation(detected.label, "auto");
        setDismissedLabel(null);
      }
    },
    /** Keep the manually selected state for this detected plate. */
    dismissConflict: () => {
      if (detected) setDismissedLabel(detected.label);
    },
  };
}

/**
 * Auto-select the state/UT encoded in a registration number (submit path,
 * e.g. recent-search clicks), e.g. "MH12AB1234" → Maharashtra. Respects the
 * manual-selection priority via applyDetectedLocation.
 */
export function autoSelectLocationFromRegistration(reg: string): void {
  const detected = detectRegistrationState(reg);
  if (detected) applyDetectedLocation(detected.label);
}
