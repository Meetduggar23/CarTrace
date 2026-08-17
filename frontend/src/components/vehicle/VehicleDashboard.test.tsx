import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VehicleDashboard } from "./VehicleDashboard";
import type { VehicleRecord } from "@/lib/types";

function baseRecord(overrides: Partial<VehicleRecord> = {}): VehicleRecord {
  return {
    id: "test-1",
    lookupType: "vin",
    registrationNumber: null,
    vin: "1HGCM82633A123456",
    manufacturer: "Honda",
    make: "Honda",
    model: "City",
    variant: null,
    modelYear: "2023",
    vehicleType: "Sedan",
    bodyType: null,
    fuelType: "Petrol",
    transmission: null,
    driveType: null,
    color: null,
    engine: "1498 cc",
    engineDisplacement: "1498 cc",
    engineCylinders: null,
    enginePower: null,
    torque: null,
    coolingType: null,
    engineCode: null,
    mileage: null,
    registrationDate: null,
    registrationExpiry: null,
    registrationAuthority: null,
    rtoCode: null,
    rtoName: null,
    state: null,
    city: null,
    insuranceStatus: null,
    insuranceExpiry: null,
    pucStatus: null,
    pucExpiry: null,
    fitnessStatus: null,
    ownerInfo: null,
    hypothecation: null,
    plantCity: null,
    plantCountry: null,
    source: "Test",
    sourceTimestamp: new Date().toISOString(),
    isMock: false,
    ...overrides,
  };
}

describe("VehicleDashboard", () => {
  it("shows Overview and Specifications for a VIN-only record", () => {
    render(<VehicleDashboard record={baseRecord()} />);
    expect(screen.getByRole("tab", { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /specifications/i })).toBeInTheDocument();
    // Registration/compliance/RTO tabs must be hidden when no data exists.
    expect(screen.queryByRole("tab", { name: /registration/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("tab", { name: /compliance/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("tab", { name: /^rto$/i })).not.toBeInTheDocument();
  });

  it("shows Registration, Compliance and RTO tabs when data exists", () => {
    const record = baseRecord({
      lookupType: "registration",
      registrationNumber: "MH12AB1234",
      rtoCode: "MH-12",
      rtoName: "Pune City RTO",
      state: "Maharashtra",
      city: "Pune",
      insuranceStatus: "Active",
      pucStatus: "Valid",
    });
    render(<VehicleDashboard record={record} />);
    expect(screen.getByRole("tab", { name: /registration/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /compliance/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /^rto$/i })).toBeInTheDocument();
  });

  it("renders 'Not available from this source' for missing fields", () => {
    render(<VehicleDashboard record={baseRecord()} />);
    expect(screen.getAllByText("Not available from this source").length).toBeGreaterThan(0);
    expect(screen.queryByText(/undefined/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^null$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^N\/A$/)).not.toBeInTheDocument();
  });

  it("shows the RTO quick-view card in the Registration tab when RTO data exists", async () => {
    const user = userEvent.setup();
    const record = baseRecord({
      lookupType: "registration",
      registrationNumber: "MH12AB1234",
      rtoCode: "MH-12",
      rtoName: "Pune City RTO",
      state: "Maharashtra",
      city: "Pune",
    });
    render(<VehicleDashboard record={record} />);
    await user.click(screen.getByRole("tab", { name: /registration/i }));
    expect(screen.getByText("Registered under")).toBeInTheDocument();
    expect(screen.getAllByText("Pune City RTO").length).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: /view rto information/i })
    ).toHaveAttribute("href", "/rto/MH-12");
  });
});
