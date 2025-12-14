export interface TFTItem {
  id: string;
  name: string;
  icon: string;
  components: string[];
  description: string;
}

export interface TFTComp {
  id: string;
  name: string;
  tier: "S" | "A" | "B";
  carries: string[];
  coreItems: Record<string, string[]>; // carryName -> itemIds[]
  strength: {
    early: number; // 1-5
    mid: number; // 1-5
    late: number; // 1-5
  };
  units: string[];
  traits: string[];
  description: string;
  preferredAugments?: string[]; // augment IDs
  eloTier?: EloTier; // "diamond+" for high elo meta, "casual" for easier comps
}

export interface CompRecommendation {
  comp: TFTComp;
  score: number;
  matchItems: string[]; // matched item IDs
  pivotAdvice: string;
  augmentSynergy?: number; // 0-100 score for augment compatibility
}

export interface UserSelection {
  items: string[]; // item IDs
  augment?: string;
  patch: string;
}

export interface TFTAugment {
  id: string;
  name: string;
  icon: string;
  tier: 1 | 2 | 3; // Silver, Gold, Prismatic
  description: string;
  synergies?: string[]; // comp IDs that work well with this augment
}

export type EloTier = "casual" | "diamond+";