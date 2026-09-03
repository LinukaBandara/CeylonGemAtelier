import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Journal — Ceylon Gem Atelier",
  description: "Gemstone guides, sourcing insights and education from Ceylon Gem Atelier.",
};

const articles = [
  {
    slug: "the-language-of-untreated-sapphires",
    title: "Why Untreated Sapphires Are More Valuable",
    excerpt: "The absence of heat treatment is one of the most meaningful distinctions when buying a sapphire — here's why it matters.",
    category: "Gemology",
    date: "August 2026",
    readTime: "6 min",
    gemFrom: "#1E3A8A", gemVia: "#2563EB", gemTo: "#93C5FD",
    glow: "rgba(37,99,235,0.4)", accent: "#93C5FD", label: "Blue Sapphire",
  },
  {
    slug: "ratnapura-after-the-rain",
    title: "Inside the Gem Fields of Ratnapura",
    excerpt: "A look inside Sri Lanka's most productive gem mining region and how stones are sourced directly from the earth.",
    category: "Sourcing",
    date: "July 2026",
    readTime: "8 min",
    gemFrom: "#065F46", gemVia: "#059669", gemTo: "#6EE7B7",
    glow: "rgba(5,150,105,0.35)", accent: "#6EE7B7", label: "Green Tourmaline",
  },
  {
    slug: "cutting-for-light-not-weight",
    title: "How Gem Cutting Affects Light & Price",
    excerpt: "Ceylon cutters optimise for brilliance and colour, not weight retention — understanding cutting quality helps buyers decide better.",
    category: "Education",
    date: "June 2026",
    readTime: "5 min",
    gemFrom: "#7E22CE", gemVia: "#9333EA", gemTo: "#D8B4FE",
    glow: "rgba(147,51,234,0.35)", accent: "#D8B4FE", label: "Amethyst",
  },
  {
    slug: "padparadscha-and-the-problem-of-definition",
    title: "What Makes a True Padparadscha Sapphire?",
    excerpt: "Padparadscha is the rarest sapphire colour — but its definition is contested. Here's what to look for when buying.",
    category: "Buying Guide",
    date: "May 2026",
    readTime: "7 min",
    gemFrom: "#C2410C", gemVia: "#F97316", gemTo: "#FED7AA",
    glow: "rgba(249,115,22,0.4)", accent: "#FED7AA", label: "Padparadscha",
  },
  {
    slug: "what-certification-actually-tells-you",
    title: "Understanding Gem Certificates: GIA, GRS & More",
    excerpt: "What origin certificates, treatment reports, and lab grading actually mean — a guide for serious buyers.",
    category: "Buying Guide",
    date: "March 2026",
    readTime: "9 min",
    gemFrom: "#374151", gemVia: "#6B7280", gemTo: "#D1D5DB",
    glow: "rgba(209,213,219,0.35)", accent: "#F3F4F6", label: "White Sapphire",
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
            Gemstone Journal
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-graphite)] mb-4">
            Guides, News & Gemology
          </h1>
          <p className="text-[var(--color-muted)] leading-relaxed">
            Gemstone buying guides, sourcing updates, and gemological education from our team in Sri Lanka.
          </p>
        </div>

        {/* Featured article */}
        <Link href={`/journal/${featured.slug}`} className="group block mb-20 md:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="aspect-[16/10] relative overflow-hidden rounded-sm border border-[var(--color-stone)]/40">
                <Image
                  src="/images/editorial/gem-selecting.jpg"
                  alt="Hand sorting raw sapphires in Ratnapura gem market"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 820px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 text-xs tracking-wider text-[var(--color-muted)] mb-4">
                <span className="uppercase">{featured.category}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime} read</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[var(--color-graphite)] group-hover:opacity-80 transition-opacity leading-snug">
                {featured.title}
              </h2>
              <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 mt-6 text-sm tracking-wide text-[var(--color-graphite)] font-medium">
                Read article
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </Link>

        {/* Article grid — each card has a unique CSS gemstone thumbnail */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {rest.map((article) => (
            <Link key={article.slug} href={`/journal/${article.slug}`} className="group block">
              {/* CSS Gemstone Thumbnail */}
              <div
                className="aspect-[4/3] relative overflow-hidden mb-5 rounded-sm border border-[var(--color-stone)]/30 flex items-center justify-center"
                style={{ background: `linear-gradient(145deg, ${article.gemFrom} 0%, ${article.gemVia} 55%, ${article.gemTo} 100%)` }}
              >
                {/* Faceted oval CSS gemstone */}
                <div
                  className="relative transition-transform duration-700 group-hover:scale-110 flex-shrink-0"
                  style={{
                    width: 80, height: 96, borderRadius: "50%",
                    background: `radial-gradient(ellipse at 33% 28%, rgba(255,255,255,0.6) 0%, ${article.gemVia} 42%, ${article.gemFrom} 100%)`,
                    boxShadow: `inset 0 0 28px rgba(0,0,0,0.35), 0 14px 35px ${article.glow}`,
                  }}
                >
                  <div style={{ position:"absolute", inset:7, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.4)", transform:"rotate(18deg)" }} />
                  <div style={{ position:"absolute", inset:17, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.2)", transform:"rotate(-10deg)" }} />
                  <div style={{ position:"absolute", top:"10%", left:"16%", width:"38%", height:"26%", borderRadius:"50%", background:"rgba(255,255,255,0.42)", filter:"blur(4px)" }} />
                </div>
                {/* Gemstone label */}
                <span
                  className="absolute bottom-3 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background:"rgba(0,0,0,0.55)", color: article.accent, backdropFilter:"blur(6px)" }}
                >
                  {article.label}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs tracking-wider text-[var(--color-muted)] mb-3">
                <span className="uppercase">{article.category}</span>
                <span>·</span>
                <span>{article.readTime} read</span>
              </div>
              <h3 className="font-serif text-lg text-[var(--color-graphite)] group-hover:opacity-80 transition-opacity leading-snug">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-mono uppercase tracking-widest transition-all group-hover:gap-2.5 text-[var(--color-gold)]">
                Read →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
