import { TFTComp, TFTItem } from "@/lib/types/tft";
import { TFT_COMPOSITIONS } from "@/lib/data/items";

export class CompScorer {
  private comps: TFTComp[];

  constructor(comps = TFT_COMPOSITIONS) {
    this.comps = comps;
  }

  scoreComp(
    comp: TFTComp,
    userItems: string[],
    selectedAugment?: string | null,
    eloTier?: "casual" | "diamond+"
  ): { score: number; augmentSynergy?: number } {
    let score = 0;

    // 1. Core Item Match Score (50%)
    const itemMatchScore = this.calculateItemMatch(comp, userItems);
    score += itemMatchScore * 0.5;

    // 2. Tier Score (20%)
    const tierScores = { S: 100, A: 80, B: 60, C: 40 };
    score += tierScores[comp.tier] * 0.2;

    // 3. Stage Strength (15%)
    const avgStageStrength =
      (comp.strength.early + comp.strength.mid + comp.strength.late) / 3;
    score += avgStageStrength * 20 * 0.15;

    // 4. Augment Synergy (10% if augment selected)
    let augmentSynergy = 0;
    if (selectedAugment && comp.preferredAugments?.includes(selectedAugment)) {
      augmentSynergy = 100;
      score += 10; // Bonus for perfect augment match
    } else if (selectedAugment) {
      // Small penalty if augment doesn't match
      score -= 2;
    }

    // 5. Elo Filtering (5% adjustment)
    if (eloTier === "diamond+" && comp.eloTier !== "diamond+") {
      score -= 5; // Penalty for casual comps in high elo mode
    } else if (eloTier === "casual" && comp.eloTier === "diamond+") {
      score -= 3; // Small penalty for high elo comps in casual mode
    }

    return {
      score: Math.min(100, Math.max(0, Math.round(score))),
      augmentSynergy: selectedAugment ? augmentSynergy : undefined,
    };
  }

  private calculateItemMatch(comp: TFTComp, userItems: string[]): number {
    let totalItems = 0;
    let matchedItems = 0;

    Object.values(comp.coreItems).forEach((itemList) => {
      itemList.forEach((itemId) => {
        totalItems++;
        if (userItems.includes(itemId)) {
          matchedItems++;
        }
      });
    });

    return totalItems > 0 ? (matchedItems / totalItems) * 100 : 0;
  }

  getRecommendations(
    userItems: string[],
    count = 3,
    selectedAugment?: string | null,
    eloTier?: "casual" | "diamond+"
  ) {
    const scoredComps = this.comps.map((comp) => {
      const scoring = this.scoreComp(comp, userItems, selectedAugment, eloTier);
      return {
        comp,
        score: scoring.score,
        matchItems: this.getMatchingItems(comp, userItems),
        augmentSynergy: scoring.augmentSynergy,
      };
    });

    return scoredComps
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map((result) => ({
        ...result,
        pivotAdvice: this.generatePivotAdvice(result.comp, result.score),
      }));
  }

  private getMatchingItems(comp: TFTComp, userItems: string[]): string[] {
    const matches: string[] = [];
    Object.values(comp.coreItems).forEach((itemList) => {
      itemList.forEach((itemId) => {
        if (userItems.includes(itemId)) {
          matches.push(itemId);
        }
      });
    });
    return matches;
  }

  private generatePivotAdvice(comp: TFTComp, score: number): string {
    if (score >= 80) return "Perfekte Item-Synergie! Direkt spielen.";
    if (score >= 60)
      return "Gute Übereinstimmung. Pivot wenn du die richtigen Units findest.";
    return "Nur spielen wenn du früh die Core-Units rollst.";
  }
}
