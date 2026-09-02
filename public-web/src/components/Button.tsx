import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "text";
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

export function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 text-sm tracking-wide transition-all duration-400 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-sapphire)]";

  const variants = {
    primary:
      "px-7 py-3.5 border border-[var(--color-graphite)] text-[var(--color-graphite)] hover:bg-[var(--color-graphite)] hover:text-[var(--color-ivory)] hover:shadow-[0_8px_24px_-8px_rgba(28,27,26,0.25)] hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "px-7 py-3.5 border border-[var(--color-stone)] text-[var(--color-graphite)] hover:border-[var(--color-graphite)] hover:shadow-[0_6px_20px_-8px_rgba(28,27,26,0.15)] hover:-translate-y-0.5",
    text:
      "text-[var(--color-graphite)] border-b border-[var(--color-graphite)]/30 pb-0.5 hover:border-[var(--color-graphite)] hover:gap-3",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
