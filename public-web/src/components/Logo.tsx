import Link from "next/link";

interface LogoProps {
  variant?: "wordmark" | "monogram" | "full";
  className?: string;
  href?: string;
}

export function Logo({ variant = "full", className = "", href = "/" }: LogoProps) {
  const gemIcon = (
    <div className="relative w-8 h-8 md:w-9 md:h-9 flex items-center justify-center shrink-0">
      {/* Gem facet diamond outline */}
      <div className="absolute inset-0 border border-[var(--color-gold)] rotate-45 transition-transform duration-700 group-hover:rotate-90" />
      <div className="absolute inset-1 border border-[var(--color-gold)]/40 rotate-12 transition-transform duration-500 group-hover:-rotate-45" />
      <span className="relative font-display text-[10px] tracking-widest font-semibold text-[var(--color-gold)] select-none">
        CGA
      </span>
    </div>
  );

  if (variant === "monogram") {
    return (
      <Link href={href} className={`group inline-flex items-center justify-center ${className}`} aria-label="Ceylon Gem Atelier">
        {gemIcon}
      </Link>
    );
  }

  if (variant === "wordmark") {
    return (
      <Link
        href={href}
        className={`group inline-flex flex-col ${className}`}
        aria-label="Ceylon Gem Atelier"
      >
        <span className="font-display text-lg md:text-xl tracking-[0.2em] font-semibold text-[var(--color-graphite)] uppercase leading-none">
          Ceylon Gem
        </span>
        <span className="font-serif text-[11px] md:text-xs tracking-[0.35em] text-[var(--color-gold)] uppercase font-light mt-1">
          Atelier · Private Vault
        </span>
      </Link>
    );
  }

  return (
    <Link href={href} className={`group inline-flex items-center gap-3.5 ${className}`} aria-label="Ceylon Gem Atelier">
      {gemIcon}
      <div className="flex flex-col">
        <span className="font-display text-base md:text-lg tracking-[0.22em] font-medium text-[var(--color-graphite)] uppercase leading-tight">
          Ceylon Gem
        </span>
        <span className="font-serif text-[10px] tracking-[0.35em] text-[var(--color-gold)] uppercase font-light">
          Atelier · Est. Ceylon
        </span>
      </div>
    </Link>
  );
}
