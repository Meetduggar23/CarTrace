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
  it("renders brand, dropdown triggers and primary links", () => {
    render(<Navbar />);
    expect(screen.getByText("CarTrace")).toBeInTheDocument();
    // Top-level dropdown triggers + primary links
    expect(screen.getByRole("button", { name: /vehicle info/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buy car/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /insurance/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /more/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /search vehicle/i })).toBeInTheDocument();
    // Account menu trigger for guests
    expect(screen.getByRole("button", { name: /account menu/i })).toBeInTheDocument();
  });

  it("opens a dropdown on hover and shows its items", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.hover(screen.getByRole("button", { name: /buy car/i }));
    expect(await screen.findByRole("menuitem", { name: /compare cars/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /used cars/i })).toBeInTheDocument();
  });

  it("opens the mobile menu via the hamburger button", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    await user.click(toggle);
    // Guest mobile menu shows login/signup actions (the desktop account
    // menu also renders them once opened, so use getAllByRole).
    expect(screen.getAllByRole("button", { name: /log in/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    // Close again
    await user.click(screen.getByRole("button", { name: /close menu/i }));
  });

  it("opens the account menu on hover and shows guest actions", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.hover(screen.getByRole("button", { name: /account menu/i }));
    expect(await screen.findByRole("menuitem", { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /sign up/i })).toBeInTheDocument();
  });
});
