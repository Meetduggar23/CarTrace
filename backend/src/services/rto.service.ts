import { NotFoundError } from "../types/errors";
import {
  rtoByCode,
  rtoByCity,
  rtoByState,
  rtoDirectory,
  rtoStats,
  searchRto,
} from "../data/rto";

export interface RtoSearchParams {
  q?: string;
  state?: string;
  city?: string;
}

export class RtoService {
  search(params: RtoSearchParams) {
    if (params.state) {
      const results = rtoByState(params.state);
      return { results, total: results.length };
    }
    if (params.city) {
      const results = rtoByCity(params.city);
      return { results, total: results.length };
    }
    if (params.q) {
      const results = searchRto(params.q);
      return { results, total: results.length };
    }
    // No filter — show the full directory as the default listing.
    return { results: rtoDirectory, total: rtoDirectory.length };
  }

  byCode(code: string) {
    const entry = rtoByCode(code);
    if (!entry) {
      throw new NotFoundError(`No RTO found for code "${code}".`);
    }
    return entry;
  }

  stats() {
    return rtoStats;
  }
}

export const rtoService = new RtoService();
