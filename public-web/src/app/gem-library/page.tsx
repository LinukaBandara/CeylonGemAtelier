import { GemPlaceholder } from "@/components/GemPlaceholder";
import Link from "next/link";

export const metadata = {
  title: "Gem Library",
  description: "Visual reference for Ceylon Gem Atelier CSS gem placeholders.",
};

const variants = [
  { key: "sapphire" as const, name: "Ceylon Sapphire", note: "Deep, calm blue — hero & primary stones" },
  { key: "padparadscha" as const, name: "Padparadscha", note: "Warm lotus blush — rare & poetic" },
  { key: "geuda" as const, name: "Ceylon Geuda", note: "Soft mineral green — understated luminosity" },
  { key: "rough" as const, name: "Rough Crystal", note: "Organic form — provenance & origin stories" },
  { key: "faceted" as const, name: "Faceted Cut", note: "Geometric precision — finished stones" },
];

const sizes = ["sm", "md", "lg"] as const;

export default function GemLibraryPage() {
  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
            Design System
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-graphite)] mb-4">
            Gem Library
          </h1>
          <p className="text-[var(--color-muted)] leading-relaxed">
            Pure CSS gemstone placeholders used across the Private Atelier
            experience. Hover any stone to see the light-sweep interaction.
          </p>
        </div>

        {/* Variants */}
        <div className="mb-24">
          <h2 className="font-serif text-2xl mb-10">Variants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
            {variants.map((v) => (
              <div
                key={v.key}
                className="bg-[var(--color-parchment)]/60 p-8 flex flex-col items-center text-center"
              >
                <GemPlaceholder variant={v.key} size="md" />
                <h3 className="mt-6 font-serif text-lg">{v.name}</h3>
                <p className="mt-2 text-xs text-[var(--color-muted)] leading-relaxed">
                  {v.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Size scale */}
        <div className="mb-24">
          <h2 className="font-serif text-2xl mb-10">Size Scale</h2>
          <div className="flex flex-wrap items-end gap-12 bg-[var(--color-parchment)]/40 p-10">
            {sizes.map((s) => (
              <div key={s} className="flex flex-col items-center gap-4">
                <GemPlaceholder variant="sapphire" size={s} interactive={false} />
                <span className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Faceted detail */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl mb-6">Faceted Detail</h2>
          <p className="text-sm text-[var(--color-muted)] max-w-lg mb-10">
            The faceted variant adds geometric cut lines and additional light
            planes for a more precise, finished-stone appearance.
          </p>
          <div className="flex justify-center bg-[var(--color-parchment)]/50 p-16">
            <GemPlaceholder variant="faceted" size="xl" label="Faceted Ceylon Sapphire" />
          </div>
        </div>

        <Link
          href="/"
          className="text-sm tracking-wide text-[var(--color-graphite)] hover:underline"
        >
          ← Return to homepage
        </Link>
      </div>
    </section>
  );
}
