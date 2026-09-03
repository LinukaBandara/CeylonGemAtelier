"use client";

import { useState } from "react";
import { searchGems, filterGems } from "@/lib/search";
import { Gem } from "@/data/gems";

interface SearchFilterProps {
  gems: Gem[];
  onResults: (gems: Gem[]) => void;
}

export function SearchFilter({ gems, onResults }: SearchFilterProps) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    collection: "",
    colour: "",
    cut: "",
    clarity: "",
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    const searched = searchGems(gems, value);
    const filtered = filterGems(searched, activeFilters);
    onResults(filtered);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);

    const searched = searchGems(gems, query);
    const filtered = filterGems(searched, newFilters);
    onResults(filtered);
  };

  const clearFilters = () => {
    setQuery("");
    const reset = { collection: "", colour: "", cut: "", clarity: "" };
    setActiveFilters(reset);
    onResults(gems);
  };

  const hasActiveFilters = query || Object.values(activeFilters).some(Boolean);

  return (
    <div className="mb-10 space-y-4">
      {/* Luxury Search Input Bar */}
      <div className="relative glass-panel rounded-sm">
        <input
          type="text"
          placeholder="Filter by specimen ID, shade (Royal Blue, Lotus), cut, or origin..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-transparent text-xs sm:text-sm text-[var(--color-graphite)] placeholder-[var(--color-muted)] font-sans focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-gold)]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {query && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-gold)]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Luxury Facet Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <div>
          <label className="block font-mono text-[9px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
            Chamber
          </label>
          <select
            value={activeFilters.collection}
            onChange={(e) => handleFilterChange("collection", e.target.value)}
            className="w-full px-3 py-2 text-xs font-mono bg-[var(--color-parchment)]/60 border border-[var(--color-stone)]/60 text-[var(--color-graphite)] focus:border-[var(--color-gold)] outline-none rounded-none"
          >
            <option value="">All Chambers</option>
            <option value="ceylon-sapphires">Ceylon Sapphires</option>
            <option value="padparadscha">Padparadscha</option>
            <option value="ceylon-geuda">Ceylon Geuda</option>
          </select>
        </div>

        <div>
          <label className="block font-mono text-[9px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
            Saturation
          </label>
          <select
            value={activeFilters.colour}
            onChange={(e) => handleFilterChange("colour", e.target.value)}
            className="w-full px-3 py-2 text-xs font-mono bg-[var(--color-parchment)]/60 border border-[var(--color-stone)]/60 text-[var(--color-graphite)] focus:border-[var(--color-gold)] outline-none rounded-none"
          >
            <option value="">All Tones</option>
            <option value="Cornflower blue">Cornflower Blue</option>
            <option value="Royal blue">Royal Blue</option>
            <option value="Lotus pink-orange">Lotus Pink-Orange</option>
            <option value="Milky luminous">Milky Luminous</option>
          </select>
        </div>

        <div>
          <label className="block font-mono text-[9px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
            Facet Cut
          </label>
          <select
            value={activeFilters.cut}
            onChange={(e) => handleFilterChange("cut", e.target.value)}
            className="w-full px-3 py-2 text-xs font-mono bg-[var(--color-parchment)]/60 border border-[var(--color-stone)]/60 text-[var(--color-graphite)] focus:border-[var(--color-gold)] outline-none rounded-none"
          >
            <option value="">All Cuts</option>
            <option value="Cushion">Cushion Cut</option>
            <option value="Oval">Oval Brilliant</option>
            <option value="Round">Round Brilliant</option>
          </select>
        </div>

        <div>
          <label className="block font-mono text-[9px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
            Clarity Grade
          </label>
          <select
            value={activeFilters.clarity}
            onChange={(e) => handleFilterChange("clarity", e.target.value)}
            className="w-full px-3 py-2 text-xs font-mono bg-[var(--color-parchment)]/60 border border-[var(--color-stone)]/60 text-[var(--color-graphite)] focus:border-[var(--color-gold)] outline-none rounded-none"
          >
            <option value="">All Clarities</option>
            <option value="VVS">VVS (Eye Clean)</option>
            <option value="VS">VS (Near Clean)</option>
            <option value="Translucent">Translucent Silk</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-1">
          <span className="font-mono text-[10px] text-[var(--color-gold)]">
            Filters Active
          </span>
          <button
            onClick={clearFilters}
            className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--color-graphite)] underline"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
