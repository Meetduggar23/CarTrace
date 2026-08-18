import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCATION,
  LOCATION_CONFIG,
  applyDetectedLocation,
  detectLocationFromRegistration,
  detectRegistrationState,
  getLocationConfig,
  getLocationSource,
  getSelectedLocation,
  registrationStateMap,
  setSelectedLocation,
} from "./locations";

describe("default location", () => {
  it("starts as India on a fresh load", () => {
    expect(DEFAULT_LOCATION).toBe("India");
    expect(getSelectedLocation()).toBe("India");
    expect(getLocationSource()).toBe("default");
  });

  it("uses the generic examples and India background", () => {
    const india = getLocationConfig("India");
    expect(india?.examples).toEqual([
      "MH 12 AB 1234",
      "DL 01 AB 1234",
      "RJ 14 AB 1234",
      "KA 01 AB 1234",
    ]);
    expect(india?.background).toContain("http");
  });
});

describe("registrationStateMap", () => {
  it("covers every state/UT with its current prefix", () => {
    for (const [label, config] of Object.entries(LOCATION_CONFIG)) {
      expect(registrationStateMap[config.code]).toBe(label);
    }
  });

  it("maps the documented prefixes", () => {
    expect(registrationStateMap.MH).toBe("Maharashtra");
    expect(registrationStateMap.DL).toBe("Delhi");
    expect(registrationStateMap.RJ).toBe("Rajasthan");
    expect(registrationStateMap.KA).toBe("Karnataka");
    expect(registrationStateMap.GJ).toBe("Gujarat");
    expect(registrationStateMap.PB).toBe("Punjab");
    expect(registrationStateMap.DN).toBe("Dadra and Nagar Haveli and Daman and Diu");
  });
});

describe("detectRegistrationState", () => {
  it("normalizes lowercase and spaces", () => {
    for (const input of ["MH12AB1234", "MH 12 AB 1234", "mh12ab1234", "mh 12 ab 1234"]) {
      expect(detectRegistrationState(input)?.label).toBe("Maharashtra");
    }
  });

  it("detects as soon as a recognizable prefix is typed", () => {
    expect(detectRegistrationState("MH")?.label).toBe("Maharashtra");
    expect(detectRegistrationState("MH1")?.label).toBe("Maharashtra");
    expect(detectRegistrationState("MH12A")?.label).toBe("Maharashtra");
    expect(detectRegistrationState("DL 01 AB 1234")?.label).toBe("Delhi");
    expect(detectRegistrationState("RJ14AB1234")?.label).toBe("Rajasthan");
  });

  it("ignores empty, single-letter and non-letter prefixes", () => {
    expect(detectRegistrationState("")).toBeNull();
    expect(detectRegistrationState("M")).toBeNull();
    expect(detectRegistrationState("1H12AB1234")).toBeNull();
  });

  it("ignores unknown prefixes", () => {
    expect(detectRegistrationState("ZZ12AB1234")).toBeNull();
    expect(detectRegistrationState("MA3EYD31S00557242")).toBeNull(); // VIN
  });

  it("resolves legacy prefixes", () => {
    expect(detectRegistrationState("OR 02 AB 1234")?.label).toBe("Odisha");
    expect(detectRegistrationState("UA 07 AB 1234")?.label).toBe("Uttarakhand");
    expect(detectRegistrationState("DD 01 AB 1234")?.label).toBe("Dadra and Nagar Haveli and Daman and Diu");
  });

  it("detects union territories", () => {
    expect(detectRegistrationState("DL 01 AB 1234")?.label).toBe("Delhi");
    expect(detectRegistrationState("PY 01 AB 1234")?.label).toBe("Puducherry");
    expect(detectRegistrationState("LA 01 AB 1234")?.label).toBe("Ladakh");
  });
});

describe("detectLocationFromRegistration", () => {
  it("returns the option for a valid plate and undefined otherwise", () => {
    expect(detectLocationFromRegistration("KA01AB1234")?.label).toBe("Karnataka");
    expect(detectLocationFromRegistration("not a plate")?.label).toBeUndefined();
  });
});

describe("LocationManager priority", () => {
  it("auto-detection applies over the default", () => {
    setSelectedLocation("India", "default");
    expect(applyDetectedLocation("Maharashtra")).toBe(true);
    expect(getSelectedLocation()).toBe("Maharashtra");
    expect(getLocationSource()).toBe("auto");
  });

  it("auto-detection overrides a previously auto-detected state", () => {
    setSelectedLocation("India", "default");
    applyDetectedLocation("Maharashtra");
    expect(applyDetectedLocation("Delhi")).toBe(true);
    expect(getSelectedLocation()).toBe("Delhi");
  });

  it("never overrides a manual selection", () => {
    setSelectedLocation("Rajasthan", "manual");
    expect(applyDetectedLocation("Maharashtra")).toBe(false);
    expect(getSelectedLocation()).toBe("Rajasthan");
    expect(getLocationSource()).toBe("manual");
  });

  it("matching the manual selection is not a conflict", () => {
    setSelectedLocation("Maharashtra", "manual");
    expect(applyDetectedLocation("Maharashtra")).toBe(true);
    expect(getSelectedLocation()).toBe("Maharashtra");
  });

  it("switches only after explicit confirmation", () => {
    setSelectedLocation("Rajasthan", "manual");
    setSelectedLocation("Maharashtra", "auto");
    expect(getSelectedLocation()).toBe("Maharashtra");
    expect(getLocationSource()).toBe("auto");
  });

  it("a manual re-selection of the same state upgrades the source", () => {
    setSelectedLocation("Maharashtra", "auto");
    setSelectedLocation("Maharashtra", "manual");
    expect(getLocationSource()).toBe("manual");
  });
});
