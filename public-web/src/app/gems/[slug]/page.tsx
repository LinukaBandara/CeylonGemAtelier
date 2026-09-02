import Link from "next/link";
import { notFound } from "next/navigation";
import { GemPlaceholder } from "@/components/GemPlaceholder";
import { Button } from "@/components/Button";
import { gems, gemList } from "@/data/gems";
import { fetchGemBySlug, fetchGemDetails } from "@/lib/catalog";

export async function generateStaticParams() {
  // First try to fetch from API, fallback to static gems
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5174";
    const gems = await fetch(`${apiUrl}/api/catalog/products`, {
      cache: "force-cache",
    })
      .then((res) => res.json())
      .catch(() => []);
    
    if (Array.isArray(gems) && gems.length > 0) {
      return gems.map((g: any) => ({ slug: g.slug }));
    }
  } catch {
    // Fall through to static
  }
  
  // Fallback to static gem list
  return gemList.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try to fetch from API first
  const apiGem = await fetchGemBySlug(slug);
  if (apiGem) {
    return {
      title: `${apiGem.name} · ${apiGem.specimen}`,
      description: apiGem.story,
    };
  }
  
  // Fallback to static data
  const gem = gems[slug];
  if (!gem) return { title: "Specimen" };
  return {
    title: `${gem.name} · ${gem.specimen}`,
    description: gem.story,
  };
}

export default async function GemDossierPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try to fetch from API first
  let gem = await fetchGemBySlug(slug);
  
  // Fallback to static data if API fails
  if (!gem) {
    gem = gems[slug];
  }
  
  if (!gem) notFound();

  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <Link href={`/collections/${gem.collection}`} className="text-xs tracking-wider text-[var(--color-muted)] hover:text-[var(--color-graphite)] transition-colors mb-10 inline-block">
          ← Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-6">
            <div className="aspect-square bg-gradient-to-br from-[#EDE8DF] to-[#E0D9CE] flex items-center justify-center sticky top-28">
              <GemPlaceholder variant={gem.variant} size="xl" />
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">Specimen</p>
            <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-graphite)] mb-2">{gem.name}</h1>
            <p className="font-mono text-sm text-[var(--color-muted)] mb-10">{gem.specimen}</p>

            <dl className="space-y-4 font-mono text-sm mb-12 max-w-md">
              {[
                ["Carat Weight", gem.carat],
                ["Cut", gem.cut],
                ["Colour", gem.colour],
                ["Clarity", gem.clarity],
                ["Origin", gem.origin],
                ["Treatment", gem.treatment],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-[var(--color-stone)]/50 pb-3">
                  <dt className="text-[var(--color-muted)]">{label}</dt>
                  <dd className="text-right max-w-[55%]">{value}</dd>
                </div>
              ))}
            </dl>

            <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-10 max-w-md">
              {gem.story}
            </p>

            <Button href="/enquiry" variant="primary">
              Enquire About This Stone →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
