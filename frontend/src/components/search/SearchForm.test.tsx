import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const navigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigate,
}));

vi.mock("@/services/history", () => ({
  getGuestHistory: () => [],
  addGuestHistory: () => [],
  removeGuestHistory: () => [],
  clearGuestHistory: () => {},
}));

import { SearchForm } from "./SearchForm";

describe("SearchForm", () => {
  beforeEach(() => {
    navigate.mockReset();
  });

  it("uppercases input automatically", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    const input = screen.getByLabelText(/vehicle registration number/i);
    await user.type(input, "mh12ab1234");
    expect(input).toHaveValue("MH12AB1234");
  });

  it("navigates to the vehicle page on a valid registration", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    const input = screen.getByLabelText(/vehicle registration number/i);
    await user.type(input, "MH12AB1234");
    await user.click(screen.getByRole("button", { name: /check vehicle/i }));
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/vehicle/MH12AB1234");
    });
  });

  it("shows a validation error for clearly invalid input", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    const input = screen.getByLabelText(/vehicle registration number/i);
    await user.type(input, "NOPE123");
    await user.click(screen.getByRole("button", { name: /check vehicle/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/MH12AB1234/);
    expect(navigate).not.toHaveBeenCalled();
  });

  it("clears input with the clear button", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    const input = screen.getByLabelText(/vehicle registration number/i);
    await user.type(input, "MH12AB1234");
    expect(input).toHaveValue("MH12AB1234");
    await user.click(screen.getByRole("button", { name: /clear input/i }));
    expect(input).toHaveValue("");
  });

  it("switches to VIN mode and decodes a valid VIN", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    await user.click(screen.getByRole("tab", { name: /VIN/i }));
    const input = screen.getByLabelText(/vehicle identification number/i);
    await user.type(input, "1HGCM82633A123456");
    await user.click(screen.getByRole("button", { name: /decode vin/i }));
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/vehicle/vin/1HGCM82633A123456");
    });
  });

  it("tolerates typed VINs while in registration mode by detecting the format", async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    const input = screen.getByLabelText(/vehicle registration number/i);
    await user.type(input, "1HGCM82633A123456");
    await user.click(screen.getByRole("button", { name: /check vehicle/i }));
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/vehicle/vin/1HGCM82633A123456");
    });
  });
});
