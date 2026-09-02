"use client";

import Link from "next/link";
import { blogTags } from "@/data/testimonials";

interface BlogTagsProps {
  currentTag?: string;
}

export function BlogTags({ currentTag }: BlogTagsProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-[var(--color-muted)] font-medium">
        Topics:
      </span>
      <Link
        href="/journal"
        className={`px-3 py-1 text-xs border transition-all ${
          !currentTag
            ? "bg-[var(--color-graphite)] text-[var(--color-ivory)] border-[var(--color-graphite)]"
            : "border-[var(--color-stone)]/40 text-[var(--color-graphite)] hover:border-[var(--color-graphite)]"
        }`}
      >
        All
      </Link>
      {blogTags.map((tag) => (
        <Link
          key={tag.id}
          href={`/journal?tag=${tag.slug}`}
          className={`px-3 py-1 text-xs border transition-all ${
            currentTag === tag.slug
              ? "bg-[var(--color-graphite)] text-[var(--color-ivory)] border-[var(--color-graphite)]"
              : "border-[var(--color-stone)]/40 text-[var(--color-graphite)] hover:border-[var(--color-graphite)]"
          }`}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
}
