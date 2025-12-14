import { TFTComp, TFTItem } from "@/lib/types/tft";

export const TFT_ITEMS: TFTItem[] = [
  {
    id: "bf",
    name: "BF Sword",
    icon: "⚔️",
    components: [],
    description: "+10 Attack Damage",
  },
  {
    id: "rod",
    name: "Needlessly Large Rod",
    icon: "🔮",
    components: [],
    description: "+10 Ability Power",
  },
  {
    id: "bow",
    name: "Recurve Bow",
    icon: "🏹",
    components: [],
    description: "+10% Attack Speed",
  },
  {
    id: "tear",
    name: "Tear of the Goddess",
    icon: "💧",
    components: [],
    description: "+15 Mana",
  },
  {
    id: "vest",
    name: "Chain Vest",
    icon: "🛡️",
    components: [],
    description: "+20 Armor",
  },
  {
    id: "cloak",
    name: "Negatron Cloak",
    icon: "🧥",
    components: [],
    description: "+20 Magic Resist",
  },
  {
    id: "belt",
    name: "Giant's Belt",
    icon: "📿",
    components: [],
    description: "+150 Health",
  },
  {
    id: "glove",
    name: "Sparring Gloves",
    icon: "🥊",
    components: [],
    description: "+5% Crit Chance",
  },
  {
    id: "ie",
    name: "Infinity Edge",
    icon: "⚔️⚔️",
    components: ["bf", "glove"],
    description: "Critical strikes deal 40% more damage",
  },
  {
    id: "rabadon",
    name: "Rabadon's Deathcap",
    icon: "🔮🔮",
    components: ["rod", "rod"],
    description: "+75 Ability Power",
  },
  {
    id: "guinsoo",
    name: "Guinsoo's Rageblade",
    icon: "🏹🔮",
    components: ["bow", "rod"],
    description: "+5% Attack Speed per auto",
  },
  {
    id: "blue",
    name: "Blue Buff",
    icon: "💧💧",
    components: ["tear", "tear"],
    description: "Set mana to 20 after cast",
  },
];

export const TFT_COMPOSITIONS: TFTComp[] = [
  {
    id: "kayle-6-slayer",
    name: "6 Slayer Kayle",
    tier: "S",
    carries: ["Kayle"],
    coreItems: {
      Kayle: ["guinsoo", "deathblade", "runnan"],
      Olaf: ["bloodthirster", "titan"],
    },
    strength: { early: 4, mid: 5, late: 5 },
    units: ["Kayle", "Olaf", "Sett", "Yone", "Aatrox", "Mordekaiser"],
    traits: ["6 Slayer", "2 Bruiser"],
    description: "Hyperroll Kayle at level 6, focus on 3-star Kayle",
  },
  // Weitere Comps hier...
];
