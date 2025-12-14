import { NextRequest, NextResponse } from "next/server";
import { CURRENT_PATCH, getPatchData, needsUpdate } from "@/lib/data/patchData";

/**
 * GET /api/patch - Get current patch information
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const patch = searchParams.get("patch");

    if (patch) {
      const patchData = getPatchData(patch);
      if (!patchData) {
        return NextResponse.json(
          { error: "Patch not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(patchData);
    }

    return NextResponse.json({
      currentPatch: CURRENT_PATCH.patch,
      version: CURRENT_PATCH.version,
      releaseDate: CURRENT_PATCH.releaseDate,
      lastUpdated: CURRENT_PATCH.lastUpdated,
      needsUpdate: needsUpdate(CURRENT_PATCH.lastUpdated),
    });
  } catch (error) {
    console.error("Patch API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/patch/update - Update patch data (admin only - to be secured)
 * This endpoint can be called by a cron job or admin panel to update patch data
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication/authorization here
    // For now, this is a placeholder for future automated updates

    const body = await request.json();
    const { patch, data } = body;

    // In a real implementation, this would:
    // 1. Validate the patch data
    // 2. Store it in a database or file system
    // 3. Update the CURRENT_PATCH constant
    // 4. Add to PATCH_HISTORY

    return NextResponse.json({
      success: true,
      message: "Patch update endpoint - to be implemented",
      patch,
    });
  } catch (error) {
    console.error("Patch Update Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

