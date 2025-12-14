import { TFTComp, TFTItem } from "@/lib/types/tft";
import { TFT_COMPOSITIONS } from "@/lib/data/items";

export class CompScorer {
  private comps: TFTComp[];

  constructor(comps = TFT_COMPOSITIONS) {
    this.comps = comps;
  }

  scoreComp(comp: TFTComp, userItems: string[]): number {
    let score = 0;

    // 1. Core Item Match Score (60%)
    const itemMatchScore = this.calculateItemMatch(comp, userItems);
    score += itemMatchScore * 0.6;

    // 2. Tier Score (20%)
    const tierScores = { S: 100, A: 80, B: 60, C: 40 };
    score += tierScores[comp.tier] * 0.2;

    // 3. Stage Strength (20%)
    const avgStageStrength =
      (comp.strength.early + comp.strength.mid + comp.strength.late) / 3;
    score += avgStageStrength * 20 * 0.2;

    return Math.min(100, Math.round(score));
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

  getRecommendations(userItems: string[], count = 3) {
    const scoredComps = this.comps.map((comp) => ({
      comp,
      score: this.scoreComp(comp, userItems),
      matchItems: this.getMatchingItems(comp, userItems),
    }));

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
