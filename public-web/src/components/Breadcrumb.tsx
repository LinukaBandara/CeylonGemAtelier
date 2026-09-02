"use client";

import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 pt-6 border-t border-[var(--color-stone)]/20"
    >
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-[var(--color-muted)] mx-1">/</span>
            )}
            {index === items.length - 1 ? (
              <span className="text-[var(--color-graphite)] font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-[var(--color-muted)] hover:text-[var(--color-graphite)] transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
