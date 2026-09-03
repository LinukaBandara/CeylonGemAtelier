"use client";

import { useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: "cover" | "contain";
  priority?: boolean;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  objectFit = "cover",
  priority = false,
}: LazyImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {status === "loading" && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#EDE8DF] to-[#E0D9CE] animate-pulse" />
      )}
      {status === "error" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#F0EBE3] to-[#E5DFD5]">
          <span className="text-xs tracking-wider text-[var(--color-muted)] uppercase">
            Image unavailable
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`w-full h-full transition-opacity duration-400 ${
            objectFit === "contain" ? "object-contain" : "object-cover"
          } ${status === "loaded" ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
