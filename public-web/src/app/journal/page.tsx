import Link from "next/link";

export const metadata = {
  title: "Journal",
  description: "Insights, stories and gemological notes from Ceylon Gem Atelier.",
};

const articles = [
  {
    slug: "the-language-of-untreated-sapphires",
    title: "The Language of Untreated Sapphires",
    excerpt:
      "Why the absence of heat treatment remains one of the most meaningful distinctions a collector can make.",
    category: "Gemology",
    date: "August 2026",
    readTime: "6 min",
  },
  {
    slug: "ratnapura-after-the-rain",
    title: "Ratnapura After the Rain",
    excerpt:
      "A quiet morning in the gem fields and what the soil still reveals about Ceylon’s mineral inheritance.",
    category: "Provenance",
    date: "July 2026",
    readTime: "8 min",
  },
  {
    slug: "cutting-for-light-not-weight",
    title: "Cutting for Light, Not Weight",
    excerpt:
      "The quiet decisions that determine whether a stone merely exists or truly lives.",
    category: "Craft",
    date: "June 2026",
    readTime: "5 min",
  },
  {
    slug: "padparadscha-and-the-problem-of-definition",
    title: "Padparadscha and the Problem of Definition",
    excerpt:
      "Colour boundaries, laboratory opinions, and why some stones resist easy classification.",
    category: "Gemology",
    date: "May 2026",
    readTime: "7 min",
  },
  {
    slug: "a-private-viewing-in-geneva",
    title: "A Private Viewing in Geneva",
    excerpt:
      "Notes from a quiet afternoon spent with three exceptional stones and one discerning collector.",
    category: "Atelier",
    date: "April 2026",
    readTime: "4 min",
  },
  {
    slug: "what-certification-actually-tells-you",
    title: "What Certification Actually Tells You",
    excerpt:
      "Origin, treatment, and the limits of laboratory language — a practical guide for serious buyers.",
    category: "Education",
    date: "March 2026",
    readTime: "9 min",
  },
];

export default function JournalPage() {
  const [featured, ...rest] = articles;

  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
            The Journal
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-graphite)] mb-4">
            Notes from the Atelier
          </h1>
          <p className="text-[var(--color-muted)] leading-relaxed">
            Observations on gemstones, craft, provenance and the quiet decisions
            that shape a serious collection.
          </p>
        </div>

        {/* Featured article */}
        <Link
          href={`/journal/${featured.slug}`}
          className="group block mb-20 md:mb-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="aspect-[16/10] bg-gradient-to-br from-[#EDE8DF] to-[#E0D9CE] flex items-center justify-center">
                <div className="w-24 h-24 rounded-[28%] bg-gradient-to-br from-[#3A5A7C] to-[#1E3348] opacity-80" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 text-xs tracking-wider text-[var(--color-muted)] mb-4">
                <span className="uppercase">{featured.category}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[var(--color-graphite)] group-hover:opacity-80 transition-opacity leading-snug">
                {featured.title}
              </h2>
              <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 mt-6 text-sm tracking-wide text-[var(--color-graphite)]">
                Read article
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </Link>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={`/journal/${article.slug}`}
              className="group block"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-[#F0EBE3] to-[#E5DFD5] mb-6 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3A5A7C]/70 to-[#1E3348]/70" />
              </div>
              <div className="flex items-center gap-2 text-xs tracking-wider text-[var(--color-muted)] mb-3">
                <span className="uppercase">{article.category}</span>
                <span>·</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="font-serif text-xl text-[var(--color-graphite)] group-hover:opacity-80 transition-opacity leading-snug">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
