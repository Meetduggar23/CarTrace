import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getSelectedLocation, setSelectedLocation } from "@/lib/locations";
import { RegistrationLocationHint } from "./RegistrationLocationHint";

describe("RegistrationLocationHint", () => {
  it("shows the detected state while typing a registration", () => {
    setSelectedLocation("India", "default");
    render(<RegistrationLocationHint value="MH12AB1234" />);
    expect(screen.getByText("Maharashtra detected")).toBeInTheDocument();
  });

  it("shows nothing for empty or incomplete input", () => {
    setSelectedLocation("India", "default");
    const { rerender } = render(<RegistrationLocationHint value="" />);
    expect(screen.queryByText(/detected/)).not.toBeInTheDocument();
    rerender(<RegistrationLocationHint value="M" />);
    expect(screen.queryByText(/detected/)).not.toBeInTheDocument();
  });

  it("does not run while disabled (VIN mode)", () => {
    setSelectedLocation("India", "default");
    render(<RegistrationLocationHint value="MH12AB1234" enabled={false} />);
    expect(screen.queryByText(/detected/)).not.toBeInTheDocument();
  });

  it("offers to switch when the plate conflicts with a manual selection", () => {
    setSelectedLocation("Rajasthan", "manual");
    render(<RegistrationLocationHint value="MH12AB1234" />);
    expect(screen.getByText(/appears to be from/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Switch to Maharashtra/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Keep Rajasthan/i })).toBeInTheDocument();
  });

  it("switches location on confirmation", async () => {
    const user = userEvent.setup();
    setSelectedLocation("Rajasthan", "manual");
    render(<RegistrationLocationHint value="MH12AB1234" />);
    await user.click(screen.getByRole("button", { name: /Switch to Maharashtra/i }));
    expect(getSelectedLocation()).toBe("Maharashtra");
    // Conflict resolved → the prompt is replaced by the detection message.
    expect(screen.getByText("Maharashtra detected")).toBeInTheDocument();
  });

  it("keeps the manual selection when dismissed", async () => {
    const user = userEvent.setup();
    setSelectedLocation("Rajasthan", "manual");
    render(<RegistrationLocationHint value="MH12AB1234" />);
    await user.click(screen.getByRole("button", { name: /Keep Rajasthan/i }));
    expect(getSelectedLocation()).toBe("Rajasthan");
    expect(screen.queryByText(/appears to be from/)).not.toBeInTheDocument();
  });
});
