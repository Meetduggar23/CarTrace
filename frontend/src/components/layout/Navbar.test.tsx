import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as React from "react";

type MockLinkProps = { children: React.ReactNode; to: string };

vi.mock("react-router-dom", () => {
  const Link = React.forwardRef<HTMLAnchorElement, MockLinkProps>(
    ({ children, to, ...props }, ref) => (
      <a href={to} ref={ref} {...props}>
        {children}
      </a>
    )
  );
  const NavLink = React.forwardRef<HTMLAnchorElement, MockLinkProps>(
    ({ children, to, ...props }, ref) => (
      <a href={to} ref={ref} {...props}>
        {children}
      </a>
    )
  );
  return {
    Link,
    NavLink,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: "/" }),
  };
});

vi.mock("@/services/auth", () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    logout: vi.fn(),
  }),
}));

import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("renders brand, dropdown triggers and feature bar links", () => {
    render(<Navbar />);
    expect(screen.getByText("AutoCheck")).toBeInTheDocument();
    // Top-level dropdown triggers
    expect(screen.getByRole("button", { name: /vehicle info/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buy car/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /insurance/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /more/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact us/i })).toBeInTheDocument();
    // Feature bar links (rendered twice: desktop grid + mobile scroller)
    expect(screen.getAllByRole("link", { name: /rc details/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /challan search/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /car insurance/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /fastag/i }).length).toBeGreaterThan(0);
  });

  it("opens a dropdown and shows its items", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /buy car/i }));
    expect(await screen.findByRole("menuitem", { name: /compare cars/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /car specifications/i })).toBeInTheDocument();
  });

  it("opens the mobile menu via the hamburger button", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    await user.click(toggle);
    // Guest mobile menu shows login/signup actions (desktop login icon
    // also exists in the DOM, so use getAllByRole).
    expect(screen.getAllByRole("button", { name: /log in/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    // Close again
    await user.click(screen.getByRole("button", { name: /close menu/i }));
  });

  it("provides a login entry for guests", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });
});
