import type { NextFunction, Request, RequestHandler, Response } from "express";
import { verifyToken } from "../auth/jwt";
import { UnauthorizedError } from "../types/errors";

export interface AuthedRequest extends Request {
  userId?: string;
  userEmail?: string;
  userName?: string;
}

function extractToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (header && /^bearer\s+/i.test(header)) {
    return header.replace(/^bearer\s+/i, "").trim();
  }
  return null;
}

function attachUser(req: AuthedRequest, token: string): void {
  const payload = verifyToken(token);
  req.userId = payload.sub;
  req.userEmail = payload.email;
  req.userName = payload.name;
}

/** 401 when no valid token is present. */
export const authRequired: RequestHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = extractToken(req);
  if (!token) throw new UnauthorizedError();
  attachUser(req as AuthedRequest, token);
  next();
};

/** Attaches the user when a valid token exists, otherwise continues. */
export const authOptional: RequestHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = extractToken(req);
  if (token) {
    try {
      attachUser(req as AuthedRequest, token);
    } catch {
      // ignore invalid tokens for optional auth
    }
  }
  next();
};
