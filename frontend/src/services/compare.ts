import { COMPARE_KEY } from "@/lib/constants";
import type { VehicleRecord } from "@/lib/types";

type CompareList = VehicleRecord[];

function read(): CompareList {
  try {
    const raw = localStorage.getItem(COMPARE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as VehicleRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(list: CompareList): void {
  try {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export const MAX_COMPARE = 2;

export function getCompareList(): CompareList {
  return read();
}

export function isInCompare(record: VehicleRecord): boolean {
  return read().some((r) => r.id === record.id);
}

export function addToCompare(record: VehicleRecord): CompareList {
  const list = read().filter((r) => r.id !== record.id);
  list.push(record);
  const trimmed = list.slice(-MAX_COMPARE);
  write(trimmed);
  return trimmed;
}

export function removeFromCompare(recordId: string): CompareList {
  const list = read().filter((r) => r.id !== recordId);
  write(list);
  return list;
}

export function clearCompare(): void {
  write([]);
}
