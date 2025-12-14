import { UserSelection } from "@/lib/types/tft";

/**
 * Encodes a team selection into a shareable code
 * Format: base64(JSON({items, augment, patch, eloTier}))
 */
export function encodeTeamCode(selection: {
  items: string[];
  augment?: string | null;
  patch: string;
  eloTier?: "casual" | "diamond+";
}): string {
  try {
    const data = JSON.stringify({
      items: selection.items,
      augment: selection.augment || null,
      patch: selection.patch || "16.1",
      eloTier: selection.eloTier || "casual",
    });
    // Use base64 encoding for URL-safe sharing
    return btoa(data)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  } catch (error) {
    console.error("Error encoding team code:", error);
    return "";
  }
}

/**
 * Decodes a team code back into a selection object
 */
export function decodeTeamCode(code: string): {
  items: string[];
  augment: string | null;
  patch: string;
  eloTier: "casual" | "diamond+";
} | null {
  try {
    // Restore base64 padding if needed
    let base64 = code.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }

    const decoded = atob(base64);
    const data = JSON.parse(decoded);

    return {
      items: Array.isArray(data.items) ? data.items : [],
      augment: data.augment || null,
      patch: data.patch || "16.1",
      eloTier: data.eloTier || "casual",
    };
  } catch (error) {
    console.error("Error decoding team code:", error);
    return null;
  }
}

/**
 * Validates if a team code is valid
 */
export function isValidTeamCode(code: string): boolean {
  return decodeTeamCode(code) !== null;
}

