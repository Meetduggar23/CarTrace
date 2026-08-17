import type { Request, Response } from "express";
import { rtoService } from "../services/rto.service";
import { asyncHandler } from "../utils/async-handler";

export const listRto = asyncHandler(async (req: Request, res: Response) => {
  const { q, state, city } = req.query;
  const result = rtoService.search({
    q: typeof q === "string" ? q : undefined,
    state: typeof state === "string" ? state : undefined,
    city: typeof city === "string" ? city : undefined,
  });
  res.json({
    data: {
      results: result.results,
      total: result.total,
      stats: rtoService.stats(),
    },
  });
});

export const getRtoByCode = asyncHandler(
  async (req: Request, res: Response) => {
    const code = String(req.params.code ?? "").toUpperCase();
    const entry = rtoService.byCode(code);
    res.json({ data: entry });
  }
);
