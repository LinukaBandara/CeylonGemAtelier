"use client";

import { useWishlist } from "@/lib/hooks";

interface WishlistButtonProps {
  slug: string;
  variant?: "icon" | "button";
  size?: "sm" | "md" | "lg";
}

export function WishlistButton({
  slug,
  variant = "button",
  size = "md",
}: WishlistButtonProps) {
  const { isWishlisted, toggleWishlist, isLoaded } = useWishlist();

  if (!isLoaded) return null;

  const isLiked = isWishlisted(slug);

  if (variant === "icon") {
    return (
      <button
        onClick={() => toggleWishlist(slug)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
          isLiked
            ? "bg-[var(--color-gold)] text-white border border-[var(--color-gold)] shadow-[0_0_12px_rgba(197,168,128,0.5)]"
            : "bg-black/40 hover:bg-black/70 text-white/90 border border-white/20"
        }`}
        title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        aria-label="Wishlist toggle"
      >
        <svg
          className="w-4 h-4 transition-transform duration-300 active:scale-125"
          fill={isLiked ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    );
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-[10px]",
    md: "px-4 py-2 text-xs",
    lg: "px-6 py-3 text-xs",
  };

  return (
    <button
      onClick={() => toggleWishlist(slug)}
      className={`${sizeClasses[size]} font-mono uppercase tracking-wider flex items-center gap-2 border transition-all duration-300 ${
        isLiked
          ? "bg-[var(--color-gold)] text-white border-[var(--color-gold)] shadow-sm"
          : "bg-transparent border-[var(--color-stone)]/60 text-[var(--color-graphite)] hover:border-[var(--color-gold)]"
      }`}
    >
      <svg
        className="w-3.5 h-3.5"
        fill={isLiked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{isLiked ? "In Wishlist" : "Add to Wishlist"}</span>
    </button>
  );
}
