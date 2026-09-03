import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageGallery } from "@/components/ImageGallery";
import { gems, gemList } from "@/data/gems";
import { fetchGemBySlug } from "@/lib/catalog";
import { RelatedGems } from "@/components/RelatedGems";
import { CertificationMarks } from "@/components/CertificationMarks";
import { WishlistButton } from "@/components/WishlistButton";

interface CatalogProduct {
  slug: string;
}

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5174";
    const catalog = await fetch(`${apiUrl}/api/catalog/products`, {
      cache: "force-cache",
    })
      .then((res) => res.json())
      .catch(() => []);

    if (Array.isArray(catalog) && catalog.length > 0) {
      return (catalog as CatalogProduct[]).map((g) => ({ slug: g.slug }));
    }
  } catch {
    // Fall through to static
  }

  return gemList.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const apiGem = await fetchGemBySlug(slug);
  if (apiGem) {
    return {
      title: `${apiGem.name} · ${apiGem.specimen} | Ceylon Gem Atelier`,
      description: apiGem.story,
    };
  }

  const gem = gems[slug];
  if (!gem) return { title: "Gem Details | Ceylon Gem Atelier" };
  return {
    title: `${gem.name} · ${gem.specimen} | Ceylon Gem Atelier`,
    description: gem.story,
  };
}

export default async function GemDossierPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let gem = await fetchGemBySlug(slug);

  if (!gem) {
    gem = gems[slug];
  }

  if (!gem) notFound();

  // If viewing cey-24-1187, supply the 3 real angle pictures
  const images = slug === "cey-24-1187"
    ? [
        "/images/gems/sapphire-angle-top.jpg",
        "/images/gems/sapphire-angle-side.jpg",
        "/images/gems/sapphire-angle-diag.jpg",
      ]
    : gem.images ?? [];

  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-20">
        {/* Breadcrumb Navigation - Clean without ugly badges */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-stone)]/40 font-mono text-xs">
          <Link
            href={`/collections/${gem.collection}`}
            className="text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors flex items-center gap-1.5 uppercase"
          >
            ← Back to {gem.collection.replace(/-/g, " ")}
          </Link>
          <div className="flex items-center gap-3">
            <WishlistButton slug={gem.slug} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-6">
            <div className="sticky top-28">
              <ImageGallery images={images} alt={gem.name} variant={gem.variant} />
            </div>
          </div>

          {/* Right Column: Gemstone Details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)] block mb-1">
                Ref: {gem.specimen}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--color-graphite)] font-normal">
                {gem.name}
              </h1>
              {gem.price && (
                <p className="font-mono text-2xl font-semibold text-[var(--color-graphite)] mt-3">
                  {gem.price} <span className="text-xs font-normal text-[var(--color-muted)] font-sans">USD</span>
                </p>
              )}
            </div>

            {/* Technical Specifications Grid */}
            <div className="glass-panel p-6 border border-[var(--color-gold)]/30 rounded-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)] block mb-4">
                Gemstone Specifications
              </span>
              <dl className="grid grid-cols-2 gap-y-3.5 gap-x-4 font-mono text-xs">
                <div className="border-b border-[var(--color-stone)]/30 pb-2">
                  <dt className="text-[9px] uppercase text-[var(--color-muted)]">Carat Weight</dt>
                  <dd className="font-semibold text-sm text-[var(--color-graphite)]">{gem.carat}</dd>
                </div>
                <div className="border-b border-[var(--color-stone)]/30 pb-2">
                  <dt className="text-[9px] uppercase text-[var(--color-muted)]">Cut & Shape</dt>
                  <dd className="font-semibold text-sm text-[var(--color-graphite)]">{gem.cut}</dd>
                </div>
                <div className="border-b border-[var(--color-stone)]/30 pb-2">
                  <dt className="text-[9px] uppercase text-[var(--color-muted)]">Color</dt>
                  <dd className="text-[var(--color-graphite)]">{gem.colour}</dd>
                </div>
                <div className="border-b border-[var(--color-stone)]/30 pb-2">
                  <dt className="text-[9px] uppercase text-[var(--color-muted)]">Clarity</dt>
                  <dd className="text-[var(--color-graphite)]">{gem.clarity}</dd>
                </div>
                <div className="border-b border-[var(--color-stone)]/30 pb-2 col-span-2 sm:col-span-1">
                  <dt className="text-[9px] uppercase text-[var(--color-muted)]">Treatment</dt>
                  <dd className="text-[var(--color-graphite)] font-semibold">{gem.treatment}</dd>
                </div>
                <div className="border-b border-[var(--color-stone)]/30 pb-2 col-span-2 sm:col-span-1">
                  <dt className="text-[9px] uppercase text-[var(--color-muted)]">Origin</dt>
                  <dd className="text-[var(--color-graphite)]">{gem.origin}</dd>
                </div>
                {gem.refractive && (
                  <div className="border-b border-[var(--color-stone)]/30 pb-2">
                    <dt className="text-[9px] uppercase text-[var(--color-muted)]">Refractive Index</dt>
                    <dd className="text-[var(--color-graphite)]">{gem.refractive}</dd>
                  </div>
                )}
                {gem.density && (
                  <div className="border-b border-[var(--color-stone)]/30 pb-2">
                    <dt className="text-[9px] uppercase text-[var(--color-muted)]">Specific Gravity</dt>
                    <dd className="text-[var(--color-graphite)]">{gem.density}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                About This Stone
              </span>
              <p className="text-sm sm:text-base text-[var(--color-graphite)] leading-relaxed font-sans">
                {gem.story}
              </p>
            </div>

            {/* Actions: Inquire & Compare */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href={`/enquiry?specimen=${gem.specimen}`}
                className="flex-1 py-4 text-center text-xs uppercase tracking-[0.2em] font-medium bg-[var(--color-graphite)] text-[var(--color-ivory)] hover:bg-[var(--color-gold)] hover:text-white transition-all duration-300 shadow-xl"
              >
                Inquire to Buy / Reserve →
              </Link>
              <Link
                href="/compare"
                className="py-4 px-6 text-center text-xs uppercase tracking-[0.2em] font-medium border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-white transition-all duration-300"
              >
                Compare
              </Link>
            </div>

            {/* Laboratory Certification Seals */}
            {gem.certifications && gem.certifications.length > 0 && (
              <div className="pt-6 border-t border-[var(--color-stone)]/40">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)] block mb-4">
                  Lab Certification
                </span>
                <CertificationMarks certifications={gem.certifications} />
              </div>
            )}
          </div>
        </div>

        {/* Related Stones */}
        {gem.relatedStones && gem.relatedStones.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[var(--color-stone)]/40">
            <RelatedGems currentSlug={gem.slug} />
          </div>
        )}
      </div>
    </section>
  );
}
