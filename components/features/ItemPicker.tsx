"use client";

import { TFTItem } from "@/lib/types/tft";
import { TFT_ITEMS } from "@/lib/data/items";
import { useState } from "react";
import { Check, X } from "lucide-react";

export function ItemPicker({
  onSelectionChange,
}: {
  onSelectionChange: (items: string[]) => void;
}) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    const newSelection = selectedItems.includes(itemId)
      ? selectedItems.filter((id) => id !== itemId)
      : [...selectedItems, itemId];

    setSelectedItems(newSelection);
    onSelectionChange(newSelection);
  };

  const clearSelection = () => {
    setSelectedItems([]);
    onSelectionChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-tft-gold">Select Your Items</h2>
        <button
          onClick={clearSelection}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-sm font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-items gap-3 p-4 bg-tft-card rounded-lg">
        {TFT_ITEMS.map((item) => {
          const isSelected = selectedItems.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`
                relative p-3 rounded-lg flex flex-col items-center justify-center
                transition-all duration-200 hover:scale-105
                ${
                  isSelected
                    ? "bg-tft-blue border-2 border-tft-gold"
                    : "bg-gray-800 border border-gray-700 hover:border-tft-blue"
                }
              `}
              title={`${item.name}: ${item.description}`}
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs text-center text-gray-300">
                {item.name}
              </div>

              {isSelected && (
                <div className="absolute -top-1 -right-1 bg-tft-gold text-black rounded-full p-0.5">
                  <Check size={12} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="text-sm text-gray-400">
        Selected: {selectedItems.length} items
      </div>
    </div>
  );
}
