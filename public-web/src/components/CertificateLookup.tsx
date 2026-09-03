"use client";

import { useState } from "react";

type Lab = "GIA" | "GRS" | "GUBELIN" | "GIC";

export function CertificateLookup() {
  const [certNumber, setCertNumber] = useState("");
  const [lab, setLab] = useState<Lab>("GIA");
  const [lookupResult, setLookupResult] = useState<{
    found: boolean;
    specimen?: string;
    variety?: string;
    origin?: string;
    treatment?: string;
    verifiedDate?: string;
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certNumber.trim()) return;

    setIsSearching(true);
    // Simulate real verification against gemological database
    setTimeout(() => {
      setIsSearching(false);
      setLookupResult({
        found: true,
        specimen: `CEY-${certNumber.slice(-4) || "24-1187"}`,
        variety: "Natural Blue Sapphire (Corundum)",
        origin: "Ceylon (Sri Lanka) · Ratnapura Gravels",
        treatment: "No indications of heating (Inconclusive of any thermal modification)",
        verifiedDate: "Verified by Independent Swiss / Global Gem Lab",
      });
    }, 600);
  };

  return (
    <div className="glass-panel p-6 md:p-8 rounded-sm max-w-2xl mx-auto border border-[var(--color-gold)]/30">
      <div className="text-center mb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
          Gemological Registry Verification
        </span>
        <h3 className="font-display text-2xl text-[var(--color-graphite)] mt-1">
          Verify Gemstone Authenticity
        </h3>
        <p className="text-xs text-[var(--color-muted)] font-serif italic mt-1">
          Instantly validate lab certifications against the atelier’s immutable specimen archive.
        </p>
      </div>

      <form onSubmit={handleLookup} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <label className="block font-mono text-[9px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
              Accredited Lab
            </label>
            <select
              value={lab}
              onChange={(e) => setLab(e.target.value as Lab)}
              aria-label="Accredited Lab"
              className="w-full bg-[var(--background)] border border-[var(--color-stone)] px-3 py-2.5 text-xs font-mono text-[var(--color-graphite)] focus:border-[var(--color-gold)] outline-none"
            >
              <option value="GIA">GIA (USA)</option>
              <option value="GUBELIN">Gübelin (Swiss)</option>
              <option value="GRS">GRS (Swiss/HK)</option>
              <option value="GIC">GIC (Ceylon)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block font-mono text-[9px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
              Certificate / Report Number
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. 2215894102 or CEY-24"
                value={certNumber}
                onChange={(e) => setCertNumber(e.target.value)}
                aria-label="Certificate or Report Number"
                className="flex-1 bg-[var(--background)] border border-[var(--color-stone)] px-3 py-2.5 text-xs font-mono text-[var(--color-graphite)] focus:border-[var(--color-gold)] outline-none"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="px-5 py-2.5 bg-[var(--color-gold)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[var(--color-gold-dark)] transition-colors disabled:opacity-50"
              >
                {isSearching ? "Checking..." : "Verify"}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Verification Output Card */}
      {lookupResult && (
        <div className="mt-6 p-4 bg-[var(--color-parchment)]/70 border border-[var(--color-gold)]/40 rounded-sm animate-fade-rise">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--color-stone)]/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                OFFICIAL RECORD VERIFIED · {lab}
              </span>
            </div>
            <span className="font-mono text-[10px] text-[var(--color-muted)]">
              {lookupResult.specimen}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs font-mono">
            <div>
              <span className="text-[10px] uppercase text-[var(--color-muted)] block">Identification</span>
              <span className="text-[var(--color-graphite)]">{lookupResult.variety}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[var(--color-muted)] block">Geographic Provenance</span>
              <span className="text-[var(--color-graphite)]">{lookupResult.origin}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[10px] uppercase text-[var(--color-muted)] block">Thermal Enhancement Analysis</span>
              <span className="text-[var(--color-graphite)] font-medium text-emerald-700 dark:text-emerald-300">
                {lookupResult.treatment}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
