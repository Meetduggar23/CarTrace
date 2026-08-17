import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { UnauthorizedError } from "../types/errors";

export interface TokenPayload {
  sub: string;
  email: string;
  name: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn as jwt.SignOptions["expiresIn"],
    issuer: "autocheck",
  });
}

export function verifyToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, config.jwtSecret, {
      issuer: "autocheck",
    }) as jwt.JwtPayload;
    if (!decoded.sub || typeof decoded.sub !== "string") {
      throw new UnauthorizedError("Invalid token");
    }
    return {
      sub: decoded.sub,
      email: String(decoded.email ?? ""),
      name: String(decoded.name ?? ""),
    };
  } catch {
    throw new UnauthorizedError("Invalid or expired token");
  }
}
