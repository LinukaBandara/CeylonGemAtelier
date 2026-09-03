"use client";

import { useState } from "react";
import { GemPlaceholder } from "./GemPlaceholder";
import type { GemVariant } from "@/data/gems";

interface GemImageProps {
  src?: string | null;
  alt: string;
  variant?: GemVariant;
  size?: "sm" | "md" | "lg" | "xl" | "fill";
  className?: string;
  objectFit?: "cover" | "contain";
  priority?: boolean;
  interactive?: boolean;
  fill?: boolean;
}

const sizeMap = {
  sm: "w-24 h-24",
  md: "w-40 h-40",
  lg: "w-64 h-64",
  xl: "w-80 h-80 md:w-96 md:h-96",
  fill: "w-full h-full",
};

/**
 * Shows real photography when available; falls back to CSS gem placeholder.
 */
export function GemImage({
  src,
  alt,
  variant = "sapphire",
  size = "md",
  className = "",
  objectFit = "cover",
  priority = false,
  interactive = true,
  fill = false,
}: GemImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    src ? "loading" : "error"
  );

  const showPhoto = Boolean(src) && status !== "error";
  const effectiveSize = fill ? "fill" : size;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#F0EBE3] to-[#E5DFD5] ${
        fill ? "absolute inset-0 w-full h-full" : sizeMap[effectiveSize]
      } ${className}`}
    >
      {/* Always keep placeholder underneath so empty boxes never appear */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          status === "loaded" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <GemPlaceholder
          variant={variant}
          size={fill || size === "xl" || size === "lg" ? "lg" : size === "sm" ? "sm" : "md"}
          interactive={false}
        />
      </div>

      {showPhoto && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src!}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            objectFit === "contain" ? "object-contain p-4 md:p-6" : "object-cover"
          } ${status === "loaded" ? "opacity-100" : "opacity-0"} ${
            interactive ? "hover:scale-[1.02] transition-transform duration-700 ease-out" : ""
          }`}
        />
      )}
    </div>
  );
}
