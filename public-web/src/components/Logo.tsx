import Link from "next/link";

interface LogoProps {
  variant?: "wordmark" | "monogram" | "full";
  className?: string;
  href?: string;
}

export function Logo({ variant = "wordmark", className = "", href = "/" }: LogoProps) {
  if (variant === "monogram") {
    return (
      <Link href={href} className={`inline-flex items-center justify-center ${className}`} aria-label="Ceylon Gem Atelier">
        <span className="font-serif text-lg tracking-[0.15em] text-[var(--color-graphite)] border border-[var(--color-graphite)]/30 w-10 h-10 flex items-center justify-center">
          CGA
        </span>
      </Link>
    );
  }

  if (variant === "full") {
    return (
      <Link href={href} className={`inline-flex items-center gap-3 ${className}`} aria-label="Ceylon Gem Atelier">
        <span className="font-serif text-sm tracking-[0.15em] text-[var(--color-graphite)] border border-[var(--color-graphite)]/30 w-9 h-9 flex items-center justify-center shrink-0">
          CGA
        </span>
        <span className="font-serif text-xl tracking-tight text-[var(--color-graphite)]">
          Ceylon Gem Atelier
        </span>
      </Link>
    );
  }

  // wordmark
  return (
    <Link
      href={href}
      className={`font-serif text-xl md:text-2xl tracking-tight text-[var(--color-graphite)] hover:opacity-80 transition-opacity ${className}`}
    >
      Ceylon Gem Atelier
    </Link>
  );
}
