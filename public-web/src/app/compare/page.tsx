import Link from "next/link";
import Image from "next/image";
import { gemList } from "@/data/gems";

export const metadata = {
  title: "Specimen Comparison Matrix · Ceylon Gem Atelier",
  description: "Technical side-by-side gemological comparison of selected Ceylon gemstones.",
};

export default function ComparePage() {
  const stones = gemList.slice(0, 3);

  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-xl mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
            Gemological Matrix
          </span>
          <h1 className="font-display text-3xl sm:text-5xl text-[var(--color-graphite)] mt-2">
            Specimen Comparison
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] font-serif italic mt-2">
            Side-by-side technical evaluation across carat weight, facet geometry, origin provenance, and laboratory verification.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="glass-panel p-6 md:p-8 rounded-sm border border-[var(--color-gold)]/30 overflow-x-auto shadow-xl">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-[var(--color-stone)]/40">
                <th className="text-left py-4 font-mono text-[10px] uppercase tracking-wider text-[var(--color-gold)] w-36">
                  Specimen Parameters
                </th>
                {stones.map((g) => {
                  const img = g.images?.[0] || "/images/home/hero-sapphire.jpg";
                  return (
                    <th key={g.slug} className="py-4 px-4 text-center font-normal">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 relative overflow-hidden rounded-sm border border-[var(--color-gold)]/40 shimmer-effect bg-black/5">
                          <Image
                            src={img}
                            alt={g.name}
                            fill
                            className="object-cover"
                            sizes="120px"
                          />
                        </div>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-gold)] block">
                            {g.specimen}
                          </span>
                          <Link
                            href={`/gems/${g.slug}`}
                            className="font-display text-sm text-[var(--color-graphite)] hover:text-[var(--color-gold)] transition-colors"
                          >
                            {g.name}
                          </Link>
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="font-mono text-xs divide-y divide-[var(--color-stone)]/30">
              {[
                ["Carat Weight", (g: typeof stones[0]) => g.carat],
                ["Facet Cut", (g: typeof stones[0]) => g.cut],
                ["Colour Saturation", (g: typeof stones[0]) => g.colour],
                ["Clarity Grade", (g: typeof stones[0]) => g.clarity],
                ["Geographic Provenance", (g: typeof stones[0]) => g.origin],
                ["Thermal Treatment", (g: typeof stones[0]) => g.treatment],
                ["Refractive Index", (g: typeof stones[0]) => g.refractive || "1.762 - 1.770"],
                ["Density / SG", (g: typeof stones[0]) => g.density || "3.99 - 4.00 g/cm³"],
                ["Valuation / Price", (g: typeof stones[0]) => g.price || "Inquire with Atelier"],
              ].map(([label, fn]) => (
                <tr key={label as string} className="hover:bg-[var(--color-parchment)]/30 transition-colors">
                  <td className="py-3.5 text-[var(--color-muted)] font-medium text-[11px] uppercase tracking-wider">
                    {label as string}
                  </td>
                  {stones.map((g) => (
                    <td key={g.slug} className="py-3.5 px-4 text-center text-[var(--color-graphite)]">
                      {(fn as (g: typeof stones[0]) => string)(g)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Private Comparison Concierge CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 glass-panel border border-[var(--color-stone)]/40 rounded-sm">
          <div>
            <h4 className="font-display text-base text-[var(--color-graphite)]">
              Desire a Private In-Person Comparative Viewing?
            </h4>
            <p className="text-xs text-[var(--color-muted)] font-serif italic">
              Our gemologists prepare comparative trays under standardized daylight for private viewing.
            </p>
          </div>
          <Link
            href="/enquiry"
            className="px-6 py-3 bg-[var(--color-gold)] text-white text-xs uppercase font-mono tracking-wider hover:bg-[var(--color-gold-dark)] transition-colors shrink-0 shadow-md"
          >
            Request Private Comparison Tray →
          </Link>
        </div>
      </div>
    </section>
  );
}
