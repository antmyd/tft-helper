"use client";

import { TFTAugment } from "@/lib/types/tft";
import { TFT_AUGMENTS } from "@/lib/data/augments";
import { useState } from "react";
import { X, Sparkles } from "lucide-react";

export function AugmentPicker({
  onSelectionChange,
}: {
  onSelectionChange: (augmentId: string | null) => void;
}) {
  const [selectedAugment, setSelectedAugment] = useState<string | null>(null);

  const toggleAugment = (augmentId: string) => {
    if (selectedAugment === augmentId) {
      setSelectedAugment(null);
      onSelectionChange(null);
    } else {
      setSelectedAugment(augmentId);
      onSelectionChange(augmentId);
    }
  };

  const clearSelection = () => {
    setSelectedAugment(null);
    onSelectionChange(null);
  };

  const getTierColor = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1:
        return "border-gray-400 bg-gray-800/50";
      case 2:
        return "border-yellow-500 bg-yellow-900/20";
      case 3:
        return "border-purple-400 bg-purple-900/30";
    }
  };

  const getTierLabel = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1:
        return "Silver";
      case 2:
        return "Gold";
      case 3:
        return "Prismatic";
    }
  };

  const groupedAugments = TFT_AUGMENTS.reduce(
    (acc, augment) => {
      if (!acc[augment.tier]) {
        acc[augment.tier] = [];
      }
      acc[augment.tier].push(augment);
      return acc;
    },
    {} as Record<1 | 2 | 3, TFTAugment[]>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-tft-gold flex items-center gap-2">
          <Sparkles size={20} />
          Select Augment
        </h2>
        {selectedAugment && (
          <button
            onClick={clearSelection}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-sm font-medium flex items-center gap-1"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {selectedAugment && (
        <div className="p-3 bg-tft-blue/20 border border-tft-blue rounded-lg">
          <div className="text-sm font-semibold text-tft-blue">
            Selected:{" "}
            {TFT_AUGMENTS.find((a) => a.id === selectedAugment)?.name}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {([3, 2, 1] as const).map((tier) => (
          <div key={tier} className="space-y-2">
            <div className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-xs ${getTierColor(tier)}`}>
                {getTierLabel(tier)}
              </span>
              <span className="text-gray-500">
                ({groupedAugments[tier]?.length || 0} augments)
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {groupedAugments[tier]?.map((augment) => {
                const isSelected = selectedAugment === augment.id;
                return (
                  <button
                    key={augment.id}
                    onClick={() => toggleAugment(augment.id)}
                    className={`
                      relative p-3 rounded-lg text-left
                      transition-all duration-200 hover:scale-[1.02]
                      border-2
                      ${
                        isSelected
                          ? `${getTierColor(tier)} border-tft-gold bg-tft-blue/30`
                          : `${getTierColor(tier)} hover:border-tft-blue`
                      }
                    `}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 flex-1">
                        <div className="text-2xl">{augment.icon}</div>
                        <div className="flex-1">
                          <div className="font-bold text-white text-sm">
                            {augment.name}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {augment.description}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="bg-tft-gold text-black rounded-full p-1">
                          <X size={12} />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

