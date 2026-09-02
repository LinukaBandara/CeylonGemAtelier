"use client";

import { useState } from "react";
import { LazyImage } from "./LazyImage";

interface ImageGalleryProps {
  images: string[];
  alt?: string;
}

export function ImageGallery({ images, alt = "Gem" }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="w-full aspect-square bg-gradient-to-br from-[#F0EBE3] to-[#E5DFD5] flex items-center justify-center"><p className="text-[var(--color-muted)]">Gallery Coming Soon</p></div>;
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-gradient-to-br from-[#F0EBE3] to-[#E5DFD5] overflow-hidden">
        <LazyImage src={images[selectedIndex]} alt={`${alt} - ${selectedIndex + 1}`} className="w-full h-full" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button key={index} onClick={() => setSelectedIndex(index)} className={`flex-shrink-0 w-16 h-16 border-2 transition-all ${selectedIndex === index ? "border-[var(--color-graphite)]" : "border-[var(--color-stone)]/40 hover:border-[var(--color-graphite)]/50"}`}>
              <LazyImage src={img} alt={`${alt} thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
      {images.length > 1 && <p className="text-xs text-[var(--color-muted)] text-right">{selectedIndex + 1} / {images.length}</p>}
    </div>
  );
}
