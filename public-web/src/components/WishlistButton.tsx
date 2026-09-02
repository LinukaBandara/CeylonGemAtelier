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

  const sizeClasses = {
    sm: "p-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  if (variant === "icon") {
    return (
      <button
        onClick={() => toggleWishlist(slug)}
        className="p-2 hover:bg-[var(--color-parchment)] transition-colors"
        title={isLiked ? "Remove from favorites" : "Add to favorites"}
      >
        {isLiked ? "❤️" : "🤍"}
      </button>
    );
  }

  return (
    <button
      onClick={() => toggleWishlist(slug)}
      className={`${sizeClasses[size]} border border-[var(--color-stone)]/40 transition-all duration-300 ${
        isLiked
          ? "bg-[var(--color-sapphire)] text-[var(--color-ivory)] border-[var(--color-sapphire)]"
          : "bg-[var(--color-ivory)] text-[var(--color-graphite)] hover:border-[var(--color-graphite)]"
      }`}
    >
      {isLiked ? "❤️ Saved" : "🤍 Save"}
    </button>
  );
}
