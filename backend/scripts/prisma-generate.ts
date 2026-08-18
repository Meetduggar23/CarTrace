/**
 * Runs `prisma generate` with a DATABASE_URL fallback so the client can be
 * generated even when no database is configured (the schema references
 * DATABASE_URL, which Prisma needs present — a live DB is not required).
 */
import { execSync } from "node:child_process";
import path from "node:path";

process.env.DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@localhost:5432/cartrace";

// Run from the backend dir so "../prisma/schema.prisma" resolves to the
// repo-root prisma folder.
execSync("prisma generate --schema ../prisma/schema.prisma", {
  stdio: "inherit",
  cwd: path.join(__dirname, ".."),
});
