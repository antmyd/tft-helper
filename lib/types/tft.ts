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
}

export interface CompRecommendation {
  comp: TFTComp;
  score: number;
  matchItems: string[]; // matched item IDs
  pivotAdvice: string;
}

export interface UserSelection {
  items: string[]; // item IDs
  augment?: string;
  patch: string;
}
