"use client";

import { CompRecommendation } from "@/lib/types/tft";
import { Trophy, Clock, Swords, AlertCircle } from "lucide-react";

export function CompDisplay({
  recommendations,
}: {
  recommendations: CompRecommendation[];
}) {
  if (recommendations.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        Select items to see comp recommendations
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-tft-gold">Top Compositions</h2>

      {recommendations.map((rec, index) => (
        <div
          key={rec.comp.id}
          className="bg-tft-card rounded-xl p-6 border-2 border-gray-800 hover:border-tft-blue transition-colors"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full font-bold
                  ${
                    rec.comp.tier === "S"
                      ? "bg-red-500"
                      : rec.comp.tier === "A"
                        ? "bg-orange-500"
                        : "bg-blue-500"
                  }`}
                >
                  {rec.comp.tier}
                </span>
                <h3 className="text-xl font-bold">{rec.comp.name}</h3>
              </div>
              <p className="text-gray-400 mt-2">{rec.comp.description}</p>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-tft-gold">
                {rec.score}
              </div>
              <div className="text-sm text-gray-400">Match Score</div>
              {rec.augmentSynergy !== undefined && (
                <div className="mt-2">
                  <div className="text-lg font-bold text-purple-400">
                    {rec.augmentSynergy}%
                  </div>
                  <div className="text-xs text-gray-400">Augment Synergy</div>
                </div>
              )}
            </div>
          </div>

          {/* Score Bar */}
          <div className="w-full bg-gray-800 rounded-full h-3 mb-6">
            <div
              className="bg-gradient-to-r from-blue-500 to-tft-gold h-3 rounded-full"
              style={{ width: `${rec.score}%` }}
            />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Core Info */}
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-tft-blue mb-2 flex items-center gap-2">
                  <Swords size={16} /> Core Carries
                </h4>
                <div className="flex flex-wrap gap-2">
                  {rec.comp.carries.map((carry) => (
                    <span
                      key={carry}
                      className="px-3 py-1 bg-purple-900 rounded"
                    >
                      {carry}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-tft-blue mb-2">
                  Your Matching Items
                </h4>
                <div className="flex flex-wrap gap-2">
                  {rec.matchItems.map((itemId) => (
                    <span
                      key={itemId}
                      className="px-2 py-1 bg-green-900 rounded text-sm"
                    >
                      {itemId}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Column - Units & Traits */}
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-tft-blue mb-2">Units</h4>
                <div className="flex flex-wrap gap-2">
                  {rec.comp.units.map((unit) => (
                    <span
                      key={unit}
                      className="px-2 py-1 bg-gray-700 rounded text-sm"
                    >
                      {unit}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-tft-blue mb-2">Traits</h4>
                <div className="flex flex-wrap gap-2">
                  {rec.comp.traits.map((trait) => (
                    <span
                      key={trait}
                      className="px-2 py-1 bg-blue-900 rounded text-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Strength & Advice */}
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-tft-blue mb-2 flex items-center gap-2">
                  <Clock size={16} /> Game Stage Strength
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Early:</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 mx-0.5 rounded ${i < rec.comp.strength.early ? "bg-green-500" : "bg-gray-700"}`}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Repeat for Mid and Late */}
                </div>
              </div>

              <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3">
                <h4 className="font-bold text-yellow-400 mb-1 flex items-center gap-2">
                  <AlertCircle size={16} /> Pivot Advice
                </h4>
                <p className="text-sm">{rec.pivotAdvice}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
