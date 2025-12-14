import { TFTComp, TFTItem } from "@/lib/types/tft";

export interface PatchData {
  patch: string;
  version: string;
  releaseDate: string;
  lastUpdated: string;
  items: TFTItem[];
  compositions: TFTComp[];
}

/**
 * Current patch data - can be replaced/updated when new patch releases
 */
export const CURRENT_PATCH: PatchData = {
  patch: "16.1",
  version: "1.0.0",
  releaseDate: "2025-12-03",
  lastUpdated: new Date().toISOString(),
  items: [], // Will be populated from items.ts
  compositions: [], // Will be populated from items.ts
};

/**
 * Patch history - tracks all patches for reference
 */
export const PATCH_HISTORY: PatchData[] = [
  CURRENT_PATCH,
  // Add previous patches here as needed
];

/**
 * Get patch data by version
 */
export function getPatchData(patch: string): PatchData | null {
  return PATCH_HISTORY.find((p) => p.patch === patch) || null;
}

/**
 * Check if patch data needs update
 */
export function needsUpdate(lastUpdated: string, currentDate: Date = new Date()): boolean {
  const lastUpdate = new Date(lastUpdated);
  const daysSinceUpdate = (currentDate.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceUpdate > 1; // Update if older than 1 day
}

