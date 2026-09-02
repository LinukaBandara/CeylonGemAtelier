import Link from "next/link";
import { GemPlaceholder } from "@/components/GemPlaceholder";
import { gemList } from "@/data/gems";

export const metadata = {
  title: "Compare Specimens",
  description: "Side-by-side comparison of selected Ceylon Gem Atelier specimens.",
};

export default function ComparePage() {
  const stones = gemList.slice(0, 3);

  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-graphite)] mb-4">
          Compare Specimens
        </h1>
        <p className="text-[var(--color-muted)] text-sm max-w-lg mb-14">
          A quiet side-by-side view of selected stones. For a formal private comparison, please enquire.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-[var(--color-stone)]/50">
                <th className="text-left py-4 font-normal text-[var(--color-muted)] text-xs uppercase tracking-wider w-32">
                  —
                </th>
                {stones.map((g) => (
                  <th key={g.slug} className="py-4 px-4 text-center font-normal">
                    <div className="flex flex-col items-center gap-3">
                      <GemPlaceholder variant={g.variant} size="sm" interactive={false} />
                      <Link href={`/gems/${g.slug}`} className="font-serif text-base text-[var(--color-graphite)] hover:opacity-70">
                        {g.specimen}
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              {[
                ["Name", (g: typeof stones[0]) => g.name],
                ["Carat", (g: typeof stones[0]) => g.carat],
                ["Cut", (g: typeof stones[0]) => g.cut],
                ["Colour", (g: typeof stones[0]) => g.colour],
                ["Clarity", (g: typeof stones[0]) => g.clarity],
                ["Origin", (g: typeof stones[0]) => g.origin],
                ["Treatment", (g: typeof stones[0]) => g.treatment],
              ].map(([label, fn]) => (
                <tr key={label as string} className="border-b border-[var(--color-stone)]/30">
                  <td className="py-3 text-[var(--color-muted)]">{label as string}</td>
                  {stones.map((g) => (
                    <td key={g.slug} className="py-3 px-4 text-center">
                      {(fn as (g: typeof stones[0]) => string)(g)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-14">
          <Link
            href="/enquiry"
            className="inline-flex items-center gap-2 text-sm tracking-wide border border-[var(--color-graphite)] px-7 py-3.5 hover:bg-[var(--color-graphite)] hover:text-[var(--color-ivory)] transition-all duration-300"
          >
            Request a Private Comparison →
          </Link>
        </div>
      </div>
    </section>
  );
}
