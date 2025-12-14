"use client";

import { useState } from "react";
import { ItemPicker } from "@/components/features/ItemPicker";
import { CompDisplay } from "@/components/features/CompDisplay";
import { CompScorer } from "@/lib/utils/scoring";
import { TFT_COMPOSITIONS } from "@/lib/data/items";
import { CompRecommendation } from "@/lib/types/tft";
import { Swords, Zap, RefreshCw } from "lucide-react";

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<CompRecommendation[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectionChange = (items: string[]) => {
    setSelectedItems(items);

    if (items.length > 0) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const scorer = new CompScorer(TFT_COMPOSITIONS);
        const recs = scorer.getRecommendations(items, 3);
        setRecommendations(recs);
        setIsLoading(false);
      }, 300);
    } else {
      setRecommendations([]);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Swords className="text-tft-gold" size={40} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-tft-gold to-tft-blue bg-clip-text text-transparent">
              TFT Helper
            </h1>
            <Zap className="text-tft-blue" size={40} />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get optimal Teamfight Tactics compositions based on your items.
            PC-optimized for quick in-game decisions.
          </p>
        </header>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-tft-card p-4 rounded-lg">
            <div className="text-2xl font-bold text-tft-gold">
              {selectedItems.length}
            </div>
            <div className="text-gray-400">Selected Items</div>
          </div>
          <div className="bg-tft-card p-4 rounded-lg">
            <div className="text-2xl font-bold text-tft-blue">
              {recommendations.length}
            </div>
            <div className="text-gray-400">Comps Found</div>
          </div>
          <div className="bg-tft-card p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">
              {recommendations[0]?.score || "--"}
            </div>
            <div className="text-gray-400">Top Score</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Item Selection */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ItemPicker onSelectionChange={handleSelectionChange} />

              {/* Patch Info */}
              <div className="mt-8 p-4 bg-tft-card rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-tft-blue">Patch Info</h3>
                  <span className="text-xs bg-green-900 px-2 py-1 rounded">
                    Live
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Current Patch: <span className="text-white">14.11</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Data updated: Today, 10:42 AM
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl p-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <RefreshCw
                    className="animate-spin text-tft-gold mb-4"
                    size={40}
                  />
                  <p className="text-gray-400">
                    Analyzing items and finding best comps...
                  </p>
                </div>
              ) : (
                <CompDisplay recommendations={recommendations} />
              )}
            </div>

            {/* Quick Tips */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl">
              <h3 className="font-bold text-xl mb-4 text-tft-gold">
                💡 Quick Tips
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-tft-blue rounded-full mt-2" />
                  Select items you have or are close to building
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-tft-blue rounded-full mt-2" />
                  Higher tier comps (S/A) are more meta but heavily contested
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-tft-blue rounded-full mt-2" />
                  Use Alt+Tab to quickly switch between game and helper
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>TFT Helper is a fan-made tool. Not affiliated with Riot Games.</p>
          <p className="mt-1">
            Patch data manually curated. Updates within 24h of patch release.
          </p>
        </footer>
      </div>
    </main>
  );
}
