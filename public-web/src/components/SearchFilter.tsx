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
  const [showFilters, setShowFilters] = useState(false);
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
    setActiveFilters({ collection: "", colour: "", cut: "", clarity: "" });
    onResults(gems);
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name, color, origin..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-3 border border-[var(--color-stone)]/40 bg-[var(--color-ivory)] text-[var(--color-graphite)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-graphite)] transition-colors"
        />
        <span className="absolute right-4 top-3.5 text-[var(--color-muted)]">
          🔍
        </span>
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="text-sm text-[var(--color-graphite)] hover:text-[var(--color-sapphire)] transition-colors underline"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-[var(--color-stone)]/20">
          <select
            value={activeFilters.collection}
            onChange={(e) => handleFilterChange("collection", e.target.value)}
            className="px-3 py-2 border border-[var(--color-stone)]/40 bg-[var(--color-ivory)] text-[var(--color-graphite)] text-sm focus:outline-none"
          >
            <option value="">All Collections</option>
            <option value="ceylon-sapphires">Ceylon Sapphires</option>
            <option value="padparadscha">Padparadscha</option>
            <option value="ceylon-geuda">Ceylon Geuda</option>
          </select>

          <select
            value={activeFilters.colour}
            onChange={(e) => handleFilterChange("colour", e.target.value)}
            className="px-3 py-2 border border-[var(--color-stone)]/40 bg-[var(--color-ivory)] text-[var(--color-graphite)] text-sm focus:outline-none"
          >
            <option value="">All Colors</option>
            <option value="Cornflower blue">Cornflower Blue</option>
            <option value="Royal blue">Royal Blue</option>
            <option value="Lotus pink-orange">Lotus Pink-Orange</option>
            <option value="Milky luminous">Milky Luminous</option>
          </select>

          <select
            value={activeFilters.cut}
            onChange={(e) => handleFilterChange("cut", e.target.value)}
            className="px-3 py-2 border border-[var(--color-stone)]/40 bg-[var(--color-ivory)] text-[var(--color-graphite)] text-sm focus:outline-none"
          >
            <option value="">All Cuts</option>
            <option value="Cushion">Cushion</option>
            <option value="Oval">Oval</option>
            <option value="Round">Round</option>
          </select>

          <button
            onClick={clearFilters}
            className="px-3 py-2 text-sm border border-[var(--color-graphite)]/40 text-[var(--color-graphite)] hover:bg-[var(--color-graphite)] hover:text-[var(--color-ivory)] transition-all"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
