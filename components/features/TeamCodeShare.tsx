"use client";

import { useState } from "react";
import { Copy, Check, Download, Upload, X } from "lucide-react";
import { encodeTeamCode, decodeTeamCode, isValidTeamCode } from "@/lib/utils/teamCode";

interface TeamCodeShareProps {
  items: string[];
  augment: string | null;
  patch: string;
  eloTier: "casual" | "diamond+";
  onImport: (data: {
    items: string[];
    augment: string | null;
    patch: string;
    eloTier: "casual" | "diamond+";
  }) => void;
}

export function TeamCodeShare({
  items,
  augment,
  patch,
  eloTier,
  onImport,
}: TeamCodeShareProps) {
  const [copied, setCopied] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importCode, setImportCode] = useState("");
  const [importError, setImportError] = useState("");

  const teamCode = encodeTeamCode({ items, augment, patch, eloTier });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(teamCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleImport = () => {
    setImportError("");
    if (!importCode.trim()) {
      setImportError("Please enter a team code");
      return;
    }

    const decoded = decodeTeamCode(importCode.trim());
    if (!decoded) {
      setImportError("Invalid team code. Please check and try again.");
      return;
    }

    onImport(decoded);
    setShowImport(false);
    setImportCode("");
  };

  const handleDownload = () => {
    const data = {
      items,
      augment,
      patch,
      eloTier,
      code: teamCode,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tft-team-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      {/* Export Section */}
      <div className="p-4 bg-tft-card rounded-lg">
        <h3 className="font-bold text-tft-blue mb-3 flex items-center gap-2">
          <Download size={18} />
          Share Team Code
        </h3>
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={teamCode}
              readOnly
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm font-mono text-gray-300"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-tft-blue hover:bg-tft-blue/80 rounded text-sm font-medium flex items-center gap-2"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <button
            onClick={handleDownload}
            className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Download as JSON
          </button>
        </div>
      </div>

      {/* Import Section */}
      <div className="p-4 bg-tft-card rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-tft-blue flex items-center gap-2">
            <Upload size={18} />
            Import Team Code
          </h3>
          <button
            onClick={() => {
              setShowImport(!showImport);
              setImportCode("");
              setImportError("");
            }}
            className="text-sm text-tft-blue hover:text-tft-gold"
          >
            {showImport ? "Cancel" : "Import"}
          </button>
        </div>

        {showImport && (
          <div className="space-y-2">
            <textarea
              value={importCode}
              onChange={(e) => {
                setImportCode(e.target.value);
                setImportError("");
              }}
              placeholder="Paste team code here..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm font-mono text-gray-300 min-h-[80px]"
            />
            {importError && (
              <div className="text-sm text-red-400 flex items-center gap-2">
                <X size={14} />
                {importError}
              </div>
            )}
            <button
              onClick={handleImport}
              disabled={!importCode.trim() || !isValidTeamCode(importCode.trim())}
              className="w-full px-3 py-2 bg-tft-gold hover:bg-tft-gold/80 disabled:bg-gray-700 disabled:text-gray-500 rounded text-sm font-medium"
            >
              Import Team
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

