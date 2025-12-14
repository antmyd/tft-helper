import { NextRequest, NextResponse } from "next/server";
import { TFT_COMPOSITIONS } from "@/lib/data/items";
import { CompScorer } from "@/lib/utils/scoring";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, augment, patch = "14.11" } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Items array is required" },
        { status: 400 }
      );
    }

    const scorer = new CompScorer(TFT_COMPOSITIONS);
    const recommendations = scorer.getRecommendations(items, 3);

    return NextResponse.json({
      patch,
      timestamp: new Date().toISOString(),
      recommendations,
      count: recommendations.length,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
