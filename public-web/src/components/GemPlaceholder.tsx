"use client";

interface GemPlaceholderProps {
  variant?: "sapphire" | "padparadscha" | "geuda" | "rough" | "faceted";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  label?: string;
  interactive?: boolean;
}

const sizeMap = {
  sm: "w-24 h-24",
  md: "w-40 h-40",
  lg: "w-64 h-64",
  xl: "w-80 h-80 md:w-96 md:h-96",
};

const variantStyles = {
  sapphire: {
    bg: "bg-gradient-to-br from-[#3A5A7C] via-[#2E4A6B] to-[#1E3348]",
    shape: "rounded-[28%]",
  },
  padparadscha: {
    bg: "bg-gradient-to-br from-[#D4A08A] via-[#C48A6A] to-[#A66B4A]",
    shape: "rounded-[30%]",
  },
  geuda: {
    bg: "bg-gradient-to-br from-[#8AAA8A] via-[#7A9A7A] to-[#5A7A5A]",
    shape: "rounded-full",
  },
  rough: {
    bg: "bg-gradient-to-br from-[#4A6A8A] via-[#3A5A7A] to-[#2A4A6A]",
    shape: "rounded-[40%_35%_45%_30%]",
  },
  faceted: {
    bg: "bg-gradient-to-br from-[#3A5A7C] via-[#2E4A6B] to-[#1E3348]",
    shape: "rounded-[18%]",
  },
};

export function GemPlaceholder({
  variant = "sapphire",
  size = "md",
  className = "",
  label,
  interactive = true,
}: GemPlaceholderProps) {
  const v = variantStyles[variant];
  const isFaceted = variant === "faceted";

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className={`
          relative overflow-hidden group
          ${sizeMap[size]}
          ${v.shape}
          ${v.bg}
          shadow-[inset_0_0_40px_rgba(0,0,0,0.22),0_20px_50px_-12px_rgba(28,27,26,0.15)]
          ${interactive ? "transition-transform duration-700 ease-out hover:scale-[1.03]" : ""}
        `}
      >
        {/* Primary light */}
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_at_28%_22%,rgba(255,255,255,0.48)_0%,transparent_55%)]" />

        {/* Facet sweep – static */}
        <div className="absolute inset-0 opacity-35 bg-[linear-gradient(135deg,transparent_38%,rgba(255,255,255,0.14)_50%,transparent_62%)]" />

        {/* Soft edge darkening */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.2)_100%)]" />

        {/* Hover light-sweep animation */}
        {interactive && (
          <div
            className="
              absolute inset-0 opacity-0 group-hover:opacity-100
              transition-opacity duration-700
              bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.22)_45%,transparent_70%)]
              group-hover:animate-[gem-sweep_1.8s_ease-in-out]
            "
          />
        )}

        {/* Faceted geometry overlays */}
        {isFaceted && (
          <>
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(60deg,transparent_40%,rgba(255,255,255,0.15)_50%,transparent_60%)]" />
            <div className="absolute inset-0 opacity-15 bg-[linear-gradient(120deg,transparent_35%,rgba(255,255,255,0.12)_50%,transparent_65%)]" />
            <div className="absolute inset-0 opacity-10 border border-white/10 rounded-[18%]" />
            {/* Inner cut lines */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2" />
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10 -translate-x-1/2" />
          </>
        )}
      </div>

      {label && (
        <p className="mt-4 text-xs tracking-[0.15em] uppercase text-[var(--color-muted)]">
          {label}
        </p>
      )}
    </div>
  );
}
