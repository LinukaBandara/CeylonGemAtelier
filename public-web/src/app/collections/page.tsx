import Link from "next/link";
import { GemPlaceholder } from "@/components/GemPlaceholder";

export const metadata = {
  title: "Collections",
  description: "Explore the curated collections of Ceylon Gem Atelier.",
};

const collections = [
  {
    title: "Ceylon Sapphires",
    desc: "Timeless. Exceptional. Enduring.",
    href: "/collections/ceylon-sapphires",
    variant: "sapphire" as const,
  },
  {
    title: "Padparadscha",
    desc: "Exquisite. Poetic. Rare.",
    href: "/collections/padparadscha",
    variant: "padparadscha" as const,
  },
  {
    title: "Ceylon Geuda",
    desc: "Subtle. Luminous. Understated.",
    href: "/collections/ceylon-geuda",
    variant: "geuda" as const,
  },
];

export default function CollectionsPage() {
  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-graphite)] mb-4">
          Collections
        </h1>
        <p className="text-[var(--color-muted)] max-w-lg mb-16">
          Three expressions of rarity. Each stone chosen for beauty, integrity
          and provenance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {collections.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group block bg-[var(--color-ivory)] border border-[var(--color-stone)]/40 p-6 md:p-8 hover:border-[var(--color-graphite)]/50 transition-all duration-400 hover:shadow-[0_12px_40px_-12px_rgba(28,27,26,0.1)] hover:-translate-y-1"
            >
              <div className="aspect-[4/5] mb-6 flex items-center justify-center bg-gradient-to-br from-[#F0EBE3] to-[#E5DFD5]">
                <GemPlaceholder variant={c.variant} size="md" />
              </div>
              <h2 className="font-serif text-xl md:text-2xl mb-1">{c.title}</h2>
              <p className="text-sm text-[var(--color-muted)] mb-4">{c.desc}</p>
              <span className="text-sm tracking-wide inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
