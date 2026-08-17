import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("react-router-dom", () => ({
  Link: ({ children, to, ...props }: { children: React.ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  NavLink: ({ children, to, ...props }: { children: React.ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: "/" }),
}));

vi.mock("@/services/auth", () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    logout: vi.fn(),
  }),
}));

vi.mock("@/services/theme", () => ({
  useTheme: () => ({
    theme: "dark",
    resolvedTheme: "dark",
    setTheme: vi.fn(),
  }),
}));

import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("renders brand and primary navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("AutoCheck")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /vehicle check/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^rto$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /compare/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /saved vehicles/i })).toBeInTheDocument();
  });

  it("opens the mobile menu via the hamburger button", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    await user.click(toggle);
    // Guest mobile menu shows login/signup actions (desktop login also
    // exists in the DOM, so use getAllByRole).
    expect((await screen.findAllByRole("button", { name: /^login$/i })).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /sign up/i }).length).toBeGreaterThan(0);
    // Close again
    await user.click(screen.getByRole("button", { name: /close menu/i }));
  });

  it("shows login/signup for guests", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /^login$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });
});
