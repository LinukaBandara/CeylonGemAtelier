import Link from "next/link";
import { notFound } from "next/navigation";
import { GemPlaceholder } from "@/components/GemPlaceholder";
import { Button } from "@/components/Button";
import { gemList } from "@/data/gems";

const collections: Record<string, {
  title: string;
  desc: string;
  long: string;
  variant: "sapphire" | "padparadscha" | "geuda";
}> = {
  "ceylon-sapphires": {
    title: "Ceylon Sapphires",
    desc: "Timeless. Exceptional. Enduring.",
    long: "The classical blue sapphires of Ceylon are known for their luminosity and balanced colour. This collection gathers stones selected for character, provenance and untreated integrity where possible.",
    variant: "sapphire",
  },
  padparadscha: {
    title: "Padparadscha",
    desc: "Exquisite. Poetic. Rare.",
    long: "Padparadscha occupies a narrow and beautiful colour space between pink and orange. Stones in this collection are chosen for the poetic quality of their hue and the rarity of true examples.",
    variant: "padparadscha",
  },
  "ceylon-geuda": {
    title: "Ceylon Geuda",
    desc: "Subtle. Luminous. Understated.",
    long: "Geuda material from Ceylon offers a different register of beauty — softer, more mineral, often with a distinctive luminous quality. Selected for subtlety and presence.",
    variant: "geuda",
  },
};

export function generateStaticParams() {
  return Object.keys(collections).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const col = collections[slug];
  if (!col) return { title: "Collection" };
  return { title: col.title, description: col.desc };
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const col = collections[slug];
  if (!col) notFound();

  const stones = gemList.filter((g) => g.collection === slug);

  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <Link href="/collections" className="text-xs tracking-wider text-[var(--color-muted)] hover:text-[var(--color-graphite)] transition-colors mb-10 inline-block">
          ← All Collections
        </Link>

        <div className="max-w-2xl mb-16">
          <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-graphite)] mb-4">{col.title}</h1>
          <p className="text-[var(--color-muted)] text-lg mb-6">{col.desc}</p>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">{col.long}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stones.map((gem) => (
            <Link
              key={gem.slug}
              href={`/gems/${gem.slug}`}
              className="group block bg-[var(--color-ivory)] p-6 border border-[var(--color-stone)]/30 hover:border-[var(--color-graphite)]/40 transition-all duration-400 hover:shadow-[0_12px_40px_-12px_rgba(28,27,26,0.1)] hover:-translate-y-1"
            >
              <div className="aspect-square mb-5 flex items-center justify-center bg-gradient-to-br from-[#F0EBE3] to-[#E5DFD5]">
                <GemPlaceholder variant={gem.variant} size="md" />
              </div>
              <p className="font-mono text-xs text-[var(--color-muted)] mb-1">{gem.specimen}</p>
              <h3 className="font-serif text-lg text-[var(--color-graphite)] group-hover:opacity-80 transition-opacity">
                {gem.name}
              </h3>
              <p className="text-sm text-[var(--color-muted)] mt-1">{gem.carat} · {gem.treatment.split("·")[0].trim()}</p>
            </Link>
          ))}
        </div>

        {stones.length === 0 && (
          <p className="text-[var(--color-muted)] text-sm">Specimens for this collection will appear here.</p>
        )}

        <div className="mt-16 text-center">
          <Button href="/enquiry" variant="secondary">
            Request a Private Viewing
          </Button>
        </div>
      </div>
    </section>
  );
}
