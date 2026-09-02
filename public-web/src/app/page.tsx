import Link from "next/link";
import { GemPlaceholder } from "@/components/GemPlaceholder";
import { CertificationMarks } from "@/components/CertificationMarks";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center pt-24 md:pt-28 pb-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div className="lg:col-span-5">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.12] text-[var(--color-graphite)] text-balance">
                Rare stones.
                <br />
                Considered carefully.
              </h1>
              <p className="mt-6 text-[var(--color-muted)] text-base md:text-lg tracking-wide">
                Private gemstone atelier · Ceylon
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center px-7 py-3.5 border border-[var(--color-graphite)] text-sm tracking-wide text-[var(--color-graphite)] hover:bg-[var(--color-graphite)] hover:text-[var(--color-ivory)] transition-all duration-300"
                >
                  Explore the Collection
                </Link>
                <Link
                  href="/enquiry"
                  className="inline-flex items-center gap-2 text-sm tracking-wide text-[var(--color-graphite)] group"
                >
                  Request a Private Enquiry
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Hero Stone */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <div className="bg-gradient-to-br from-[#EDE8DF] to-[#E0D9CE] p-12 md:p-16 rounded-sm">
                <GemPlaceholder
                  variant="sapphire"
                  size="xl"
                  label="Ceylon Sapphire"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SPECIMEN */}
      <section className="py-20 md:py-28 border-t border-[var(--color-stone)]/40">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#EDE8DF] to-[#E0D9CE] flex items-center justify-center">
                <GemPlaceholder variant="rough" size="lg" />
              </div>
            </div>

            <div className="lg:col-span-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
                Featured specimen
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-graphite)] mb-8">
                CEY-24-1187
              </h2>

              <dl className="space-y-4 font-mono text-sm max-w-sm">
                <div className="flex justify-between border-b border-[var(--color-stone)]/50 pb-3">
                  <dt className="text-[var(--color-muted)]">Carat Weight</dt>
                  <dd>6.72 ct</dd>
                </div>
                <div className="flex justify-between border-b border-[var(--color-stone)]/50 pb-3">
                  <dt className="text-[var(--color-muted)]">Origin</dt>
                  <dd className="text-right">Ratnapura, Ceylon</dd>
                </div>
                <div className="flex justify-between border-b border-[var(--color-stone)]/50 pb-3">
                  <dt className="text-[var(--color-muted)]">Treatment</dt>
                  <dd>No heat · Untreated</dd>
                </div>
              </dl>

              <Link
                href="/gems/cey-24-1187"
                className="inline-flex items-center gap-2 mt-10 text-sm tracking-wide border border-[var(--color-graphite)] px-6 py-3 hover:bg-[var(--color-graphite)] hover:text-[var(--color-ivory)] transition-all duration-300 hover:-translate-y-0.5"
              >
                View Specimen Details
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="py-20 md:py-28 bg-[var(--color-parchment)]/50">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="text-center mb-14 md:mb-18">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--color-graphite)]">
              Our Collections
            </h2>
            <p className="mt-4 text-[var(--color-muted)] max-w-md mx-auto text-sm md:text-base">
              Exceptional Ceylon gemstones, chosen for beauty, integrity and provenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Ceylon Sapphires",
                desc: "Timeless. Exceptional. Enduring.",
                href: "/collections/ceylon-sapphires",
                variant: "sapphire" as const,
              },
              {
                title: "Padparadscha",
                desc: "Exquisite. Poetic. Rare.",
                href: "/collections/ceylon-sapphires",
                variant: "padparadscha" as const,
              },
              {
                title: "Ceylon Geuda",
                desc: "Subtle. Luminous. Understated.",
                href: "/collections/ceylon-sapphires",
                variant: "geuda" as const,
              },
            ].map((col) => (
              <Link
                key={col.title}
                href={col.href}
                className="group block bg-[var(--color-ivory)] p-6 md:p-8 transition-shadow duration-300 hover:shadow-[0_12px_40px_-12px_rgba(28,27,26,0.1)]"
              >
                <div className="aspect-[4/5] mb-6 flex items-center justify-center bg-gradient-to-br from-[#F0EBE3] to-[#E5DFD5]">
                  <GemPlaceholder variant={col.variant} size="md" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-[var(--color-graphite)]">
                  {col.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{col.desc}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm tracking-wide text-[var(--color-graphite)] group-hover:gap-2 transition-all">
                  Explore <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROVENANCE / CRAFT / CERT */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div>
              <h3 className="font-serif text-2xl mb-4 text-[var(--color-graphite)]">
                Provenance
              </h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                From the ancient gem fields of Ceylon, where earth, water and
                time create singular beauty. Every stone we offer is chosen
                with care and carries a story worth preserving.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 mt-5 text-sm tracking-wide text-[var(--color-graphite)] hover:gap-2 transition-all"
              >
                Learn more about our sourcing →
              </Link>
            </div>

            <div>
              <h3 className="font-serif text-2xl mb-4 text-[var(--color-graphite)]">
                Craftsmanship
              </h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                Precision at every stage. Respect for the stone, always.
                Selection, cutting, finishing and documentation — each step
                considered with the same care as the gem itself.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 mt-5 text-sm tracking-wide text-[var(--color-graphite)] hover:gap-2 transition-all"
              >
                The atelier process →
              </Link>
            </div>

            <div>
              <h3 className="font-serif text-2xl mb-4 text-[var(--color-graphite)]">
                Certification
              </h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                Certified. Ethical. Transparent. We work with leading
                laboratories so every stone arrives with verified identity
                and origin.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 mt-5 text-sm tracking-wide text-[var(--color-graphite)] hover:gap-2 transition-all"
              >
                View approach →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATION */}
      <section className="py-16 md:py-20 border-t border-[var(--color-stone)]/30">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-10">
            Certified. Ethical. Transparent.
          </p>
          <CertificationMarks />
        </div>
      </section>

      {/* PRIVATE CLIENT CTA */}
      <section className="py-20 md:py-28 bg-[var(--color-parchment)]/40">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-graphite)] mb-6">
                Private Client Atelier
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed max-w-md">
                We offer a discreet and personal service for those who value
                rarity, privacy and provenance. Enquire in confidence.
              </p>
              <p className="mt-6 text-sm text-[var(--color-graphite)]">
                We look forward to welcoming you.
              </p>
            </div>

            <div className="bg-[var(--color-ivory)] p-8 md:p-10 border border-[var(--color-stone)]/40">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-6">
                Private Enquiry
              </h3>
              <form className="space-y-5" action="/enquiry" method="get">
                <div>
                  <label htmlFor="home-name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="home-name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="w-full bg-transparent border-b border-[var(--color-stone)] py-3 text-sm placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-graphite)] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="home-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="home-email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent border-b border-[var(--color-stone)] py-3 text-sm placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-graphite)] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="home-message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="home-message"
                    name="message"
                    rows={3}
                    placeholder="Message (optional)"
                    className="w-full bg-transparent border-b border-[var(--color-stone)] py-3 text-sm placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-graphite)] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 mt-2 text-sm tracking-wide text-[var(--color-graphite)] border-b border-[var(--color-graphite)]/40 pb-1 hover:border-[var(--color-graphite)] transition-colors"
                >
                  Send Enquiry →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
