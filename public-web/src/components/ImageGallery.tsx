"use client";

import { useState } from "react";
import Image from "next/image";
import { GemPlaceholder } from "./GemPlaceholder";
import type { GemVariant } from "@/data/gems";

interface ImageGalleryProps {
  images: string[];
  alt?: string;
  variant?: GemVariant;
}

export function ImageGallery({
  images,
  alt = "Gem Specimen",
  variant = "sapphire",
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const hasImages = images && images.length > 0;

  if (!hasImages) {
    return (
      <div className="w-full aspect-square bg-gradient-to-br from-[#F0EBE3] to-[#E5DFD5] flex items-center justify-center rounded-sm border border-[var(--color-stone)]/40">
        <GemPlaceholder variant={variant} size="xl" interactive={false} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main High-Res View */}
      <div className="relative aspect-[4/5] sm:aspect-square bg-gradient-to-br from-[#F0EBE3] to-[#E5DFD5] overflow-hidden rounded-sm border border-[var(--color-gold)]/30 glass-panel shadow-lg">
        <div
          className={`w-full h-full relative cursor-zoom-in transition-transform duration-500 shimmer-effect ${
            zoom ? "scale-130 cursor-zoom-out" : "scale-100"
          }`}
          onClick={() => setZoom(!zoom)}
        >
          <Image
            src={images[selectedIndex]}
            alt={`${alt} — perspective ${selectedIndex + 1}`}
            fill
            className="object-cover"
            priority={selectedIndex === 0}
            sizes="(max-width: 1024px) 100vw, 600px"
          />
        </div>

        {/* Clean Luxury Zoom Button with SVG */}
        <button
          type="button"
          onClick={() => setZoom(!zoom)}
          className="absolute bottom-3 right-3 z-10 px-3 py-1.5 bg-[var(--background)]/90 backdrop-blur-md border border-[var(--color-gold)]/50 text-[10px] font-mono tracking-wider uppercase text-[var(--color-graphite)] flex items-center gap-1.5 hover:border-[var(--color-gold)] transition-colors shadow-sm"
        >
          <svg className="w-3.5 h-3.5 text-[var(--color-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
          <span>{zoom ? "Reset" : "Zoom"}</span>
        </button>
      </div>

      {/* Thumbnails row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={img + index}
              type="button"
              onClick={() => {
                setSelectedIndex(index);
                setZoom(false);
              }}
              aria-label={`View perspective ${index + 1}`}
              className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 border transition-all duration-300 overflow-hidden ${
                selectedIndex === index
                  ? "border-[var(--color-gold)] shadow-[0_0_10px_rgba(197,168,128,0.4)]"
                  : "border-[var(--color-stone)]/50 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${alt} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
