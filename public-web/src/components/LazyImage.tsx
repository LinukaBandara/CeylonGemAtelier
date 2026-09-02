"use client";

import { useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function LazyImage({ src, alt, width, height, className }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#EDE8DF] to-[#E0D9CE] animate-pulse" />
      )}
    </div>
  );
}
