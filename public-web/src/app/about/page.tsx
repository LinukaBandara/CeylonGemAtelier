import Image from "next/image";
import Link from "next/link";
import { CertificationMarks } from "@/components/CertificationMarks";

export const metadata = {
  title: "The Maison & Heritage · Ceylon Gem Atelier",
  description: "The history, ethical sourcing, and gemological philosophy of Ceylon Gem Atelier.",
};

export default function AboutPage() {
  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Visual Anchor */}
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] relative bg-gradient-to-br from-[#EDE8DF] to-[#E0D9CE] overflow-hidden rounded-sm border border-[var(--color-gold)]/30 glass-panel shadow-2xl sticky top-28 shimmer-effect">
              <Image
                src="/images/editorial/gem-mine.jpg"
                alt="Gem mining in Ratnapura, Sri Lanka"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 550px"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[var(--background)]/90 backdrop-blur-md border border-[var(--color-stone)]/50">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-gold)] block">
                  Ratnapura Gem Mines
                </span>
                <p className="font-display text-xs text-[var(--color-graphite)] mt-0.5">
                  Sabaragamuwa Province · Sri Lanka
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 max-w-2xl space-y-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                Our Story & Values
              </span>
              <h1 className="font-display text-3xl sm:text-5xl text-[var(--color-graphite)] mt-2">
                Natural Gems, Direct From Sri Lanka
              </h1>
            </div>

            <div className="text-[var(--color-muted)] space-y-6 leading-relaxed text-sm sm:text-base font-sans">
              <p>
                Ceylon Gem Atelier is a private gemstone house founded on a singular conviction: that the rarest natural treasures of Sri Lanka deserve uncompromised gemological integrity, absolute transparency, and meticulous preservation.
              </p>
              <p>
                We do not produce commercial volume. We curate unique individual corundum specimens—untreated royal blue sapphires, lotus-hued padparadscha, and ethereal geuda crystals—mined through artisanal methods that honour the earth and the communities who have worked these deposits for centuries.
              </p>
              <p>
                Every gem that enters our vault undergoes multi-laboratory verification. We reject surface diffusion, lattice alteration, beryllium additions, and standard commercial thermal enhancements, ensuring our collectors acquire stones in their pure, geological state.
              </p>
            </div>

            {/* Key Maison Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 glass-panel border border-[var(--color-stone)]/50 rounded-sm">
                <span className="font-mono text-[10px] uppercase text-[var(--color-gold)] tracking-wider">
                  01 · Provenance
                </span>
                <h3 className="font-display text-base text-[var(--color-graphite)] mt-1 mb-2">
                  Mine-to-Vault Traceability
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Documented origin chain guaranteeing direct extraction from Sri Lanka&apos;s historic gravel veins.
                </p>
              </div>

              <div className="p-5 glass-panel border border-[var(--color-stone)]/50 rounded-sm">
                <span className="font-mono text-[10px] uppercase text-[var(--color-gold)] tracking-wider">
                  02 · Integrity
                </span>
                <h3 className="font-display text-base text-[var(--color-graphite)] mt-1 mb-2">
                  Zero Thermal Modification
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed>
                  Stones celebrated for their natural unheated brilliance and crystalline internal structures.
                </p>
              </div>
            </div>

            {/* Swiss Certification Marks */}
            <div className="pt-8 border-t border-[var(--color-stone)]/40">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)] block mb-6">
                Independent Gemological Labs
              </span>
              <CertificationMarks />
            </div>

            {/* Call to Concierge */}
            <div className="pt-6">
              <Link
                href="/enquiry"
                className="inline-block px-8 py-4 bg-[var(--color-graphite)] text-[var(--color-ivory)] text-xs uppercase font-mono tracking-[0.2em] hover:bg-[var(--color-gold)] hover:text-white transition-all shadow-xl"
              >
                Arrange Private Atelier Viewing →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
