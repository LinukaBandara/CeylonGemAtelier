import Link from "next/link";
import Image from "next/image";
import { CertificationMarks } from "@/components/CertificationMarks";
import { InteractiveSpecimenViewer } from "@/components/InteractiveSpecimenViewer";
import { CertificateLookup } from "@/components/CertificateLookup";
import { gems } from "@/data/gems";

export default function HomePage() {
  const featuredSpecimen = gems["cey-24-1187"] || Object.values(gems)[0];

  return (
    <>
      {/* IMMERSIVE FULL-WIDTH HERO SECTION */}
      <section className="relative min-h-[95vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Full-bleed background with atmospheric lighting & sapphire preview */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/collections/sapphire-custom.jpg"
            alt="Ceylon Blue Sapphire Background"
            fill
            priority
            className="object-cover object-center brightness-[0.22] dark:brightness-[0.14] scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/75 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18)_0%,transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 md:px-12 lg:px-20 w-full py-12 md:py-16 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6 bg-[var(--background)]/85 md:bg-[var(--background)]/75 backdrop-blur-xl p-6 sm:p-10 md:p-12 rounded-sm border border-[var(--color-gold)]/30 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--color-parchment)]/90 border border-[var(--color-gold)]/50 rounded-full">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)] font-semibold">
                Ceylon Gem Atelier · Ratnapura & Colombo
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.12] text-[var(--color-graphite)] tracking-tight">
              Natural Ceylon Gemstones.
              <br />
              <span className="font-serif italic font-light text-gold-gradient">
                Direct From The Source.
              </span>
            </h1>

            <p className="text-[var(--color-graphite)]/85 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-sans leading-relaxed font-normal">
              Buy certified untreated blue sapphires, padparadscha, and rare stones directly from Sri Lanka&apos;s historic gem mines in Ratnapura.
            </p>

            {/* Clean Counter Bar: Only Ratnapura & Colombo */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 py-4 sm:py-5 border-y border-[var(--color-stone)]/50 max-w-lg mx-auto">
              <div>
                <span className="block font-display text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-graphite)]">
                  100%
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-muted)] font-medium">
                  Natural & Certified
                </span>
              </div>
              <div>
                <span className="block font-display text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-gold)]">
                  Untreated
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-muted)] font-medium">
                  Natural Stones
                </span>
              </div>
              <div>
                <span className="block font-display text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-graphite)]">
                  Sri Lanka
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-muted)] font-medium">
                  Ratnapura & Colombo
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/collections"
                className="px-8 py-4 bg-[var(--color-graphite)] text-[var(--color-ivory)] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 hover:bg-[var(--color-gold)] hover:text-white shadow-xl active:scale-95"
              >
                Browse Gemstones
              </Link>
              <Link
                href="/enquiry"
                className="px-8 py-4 border border-[var(--color-gold)] text-[var(--color-gold)] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 hover:bg-[var(--color-gold)] hover:text-white backdrop-blur-md"
              >
                Make an Enquiry →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SPECIMEN VIEWER (USING THE 3 REAL SAPPHIRE ANGLES) */}
      <section className="py-20 md:py-28 border-t border-[var(--color-stone)]/40 relative">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
              Multi-Angle Inspection
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--color-graphite)] mt-2">
              Inspect Under Different Lighting
            </h2>
            <p className="text-xs md:text-sm text-[var(--color-muted)] mt-2 font-sans">
              View this untreated Royal Blue Ceylon Sapphire from multiple angles under daylight, warm evening light, and laboratory illumination.
            </p>
          </div>

          <InteractiveSpecimenViewer
            specimen={featuredSpecimen}
            angles={[
              "/images/gems/sapphire-angle-top.jpg",
              "/images/gems/sapphire-angle-side.jpg",
              "/images/gems/sapphire-angle-diag.jpg",
            ]}
          />
        </div>
      </section>

      {/* GEMSTONE COLLECTIONS (USING THE 2 USER UPLOADED IMAGES + CSS STYLED PADPARADSCHA) */}
      <section className="py-20 md:py-28 bg-[var(--color-parchment)]/40 border-t border-[var(--color-stone)]/40">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                Our Inventory
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--color-graphite)] mt-1">
                Gemstone Categories
              </h2>
            </div>
            <Link
              href="/collections"
              className="mt-4 md:mt-0 text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-mono border-b border-[var(--color-gold)] pb-1 hover:text-[var(--color-graphite)] transition-colors"
            >
              View All Stones →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* 1. Ceylon Blue Sapphires (User Uploaded Photo) */}
            <Link
              href="/collections/ceylon-sapphires"
              className="group block glass-panel overflow-hidden border border-[var(--color-stone)]/50 hover:border-[var(--color-gold)] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5"
            >
              <div className="aspect-[4/5] relative bg-[#F5F0E8] overflow-hidden shimmer-effect">
                <Image
                  src="/images/collections/sapphire-custom.jpg"
                  alt="Ceylon Blue Sapphire Oval"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 bg-black/60 backdrop-blur-md text-[var(--color-gold-light)] border border-[var(--color-gold)]/30">
                    Royal & Cornflower Blue
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="font-display text-xl md:text-2xl mb-1 text-[var(--color-ivory)]">
                    Blue Sapphires
                  </h3>
                  <p className="text-xs text-white/80 font-sans line-clamp-2 mb-3">
                    Vivid blue sapphires in cushion, oval, and emerald cuts with full certification.
                  </p>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-gold-light)] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Shop Sapphires →
                  </span>
                </div>
              </div>
            </Link>

            {/* 2. Padparadscha (User Uploaded Photo) */}
            <Link
              href="/collections/padparadscha"
              className="group block glass-panel overflow-hidden border border-[var(--color-stone)]/50 hover:border-[var(--color-gold)] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5"
            >
              <div className="aspect-[4/5] relative bg-[#F5F0E8] overflow-hidden shimmer-effect">
                <Image
                  src="/images/collections/padparadscha-custom.jpg"
                  alt="Ceylon Natural Padparadscha Sapphire"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 bg-black/60 backdrop-blur-md text-[#FDA4AF] border border-[#FDA4AF]/30">
                    Rare Lotus Blossom
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="font-display text-xl md:text-2xl mb-1 text-[var(--color-ivory)]">
                    Padparadscha Sapphires
                  </h3>
                  <p className="text-xs text-white/80 font-sans line-clamp-2 mb-3">
                    Rare pink-orange corundum native to Sri Lanka.
                  </p>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FDA4AF] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Shop Padparadscha →
                  </span>
                </div>
              </div>
            </Link>

            {/* 3. Ceylon Geuda (User Uploaded Photo) */}
            <Link
              href="/collections/ceylon-geuda"
              className="group block glass-panel overflow-hidden border border-[var(--color-stone)]/50 hover:border-[var(--color-gold)] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5"
            >
              <div className="aspect-[4/5] relative bg-[#F5F0E8] overflow-hidden shimmer-effect">
                <Image
                  src="/images/collections/geuda-custom.jpg"
                  alt="Ceylon Natural Geuda Sapphire"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 bg-black/60 backdrop-blur-md text-[var(--color-gold-light)] border border-[var(--color-gold)]/30">
                    Natural Geuda Corundum
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="font-display text-xl md:text-2xl mb-1 text-[var(--color-ivory)]">
                    Ceylon Geuda
                  </h3>
                  <p className="text-xs text-white/80 font-sans line-clamp-2 mb-3">
                    Natural crystalline corundum with internal silk and soft luminous tone.
                  </p>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-gold-light)] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Shop Geuda →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* DIRECT ORIGIN GUARANTEE: RATNAPURA */}
      <section className="py-20 md:py-28 border-t border-[var(--color-stone)]/40 relative">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                Direct Mining Sourcing
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--color-graphite)]">
                Direct From Ratnapura Mines
              </h2>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed font-sans">
                Every gemstone is sourced directly from ethical local miners in the gem-rich valleys of Ratnapura and Pelmadulla. By working directly at the source, we ensure authentic provenance and fair pricing without middlemen.
              </p>

              <div className="space-y-4 pt-2 font-sans">
                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full border border-[var(--color-gold)] flex items-center justify-center font-mono text-xs text-[var(--color-gold)] shrink-0">
                    01
                  </div>
                  <div>
                    <h4 className="font-display text-sm text-[var(--color-graphite)]">Ethical Pit Extraction</h4>
                    <p className="text-xs text-[var(--color-muted)]">Traditional eco-conscious mining practiced for generations in Sri Lanka.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full border border-[var(--color-gold)] flex items-center justify-center font-mono text-xs text-[var(--color-gold)] shrink-0">
                    02
                  </div>
                  <div>
                    <h4 className="font-display text-sm text-[var(--color-graphite)]">Precision Master Cutting</h4>
                    <p className="text-xs text-[var(--color-muted)]">Cut by expert lapidaries to achieve maximum brilliance and color depth.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full border border-[var(--color-gold)] flex items-center justify-center font-mono text-xs text-[var(--color-gold)] shrink-0">
                    03
                  </div>
                  <div>
                    <h4 className="font-display text-sm text-[var(--color-graphite)]">Independent Lab Certification</h4>
                    <p className="text-xs text-[var(--color-muted)]">Full testing and verification reports from recognized gem laboratories.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] font-mono border-b border-[var(--color-gold)] pb-1 hover:text-[var(--color-graphite)] transition-colors"
                >
                  Read About Our Sourcing →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="aspect-[16/11] relative overflow-hidden rounded-sm border border-[var(--color-gold)]/30 glass-panel shadow-xl">
                <Image
                  src="/images/editorial/rough-in-matrix.jpg"
                  alt="Natural sapphire in alluvial rock"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 700px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATE LOOKUP */}
      <section className="py-20 md:py-24 bg-[var(--color-parchment)]/30 border-t border-[var(--color-stone)]/40">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-20">
          <CertificateLookup />
        </div>
      </section>

      {/* ACCREDITED LAB SEALS */}
      <section className="py-16 md:py-20 border-t border-[var(--color-stone)]/40">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-20 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-8">
            Independent Gemological Laboratory Certification
          </p>
          <CertificationMarks />
        </div>
      </section>

      {/* ENQUIRY SECTION */}
      <section className="py-20 md:py-28 bg-[var(--color-parchment)]/50 border-t border-[var(--color-stone)]/40">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                Direct Inquiry
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--color-graphite)]">
                Looking for a Specific Stone?
              </h2>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed font-sans">
                Tell us the carat weight, shape, and color you need. We source directly from our mines in Ratnapura and will send you available options with video and lab reports.
              </p>
              
              <div className="p-4 bg-[var(--background)] border border-[var(--color-stone)]/50 rounded-sm">
                <p className="text-xs text-[var(--color-graphite)] font-sans">
                  Available for viewing and pickup in Colombo and Ratnapura, with insured worldwide courier delivery.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="glass-panel p-6 sm:p-8 border border-[var(--color-gold)]/40 shadow-xl rounded-sm">
                <h3 className="font-display text-xl text-[var(--color-graphite)] mb-1">
                  Send an Inquiry
                </h3>
                <p className="text-xs text-[var(--color-muted)] mb-6 font-sans">
                  We typically reply within a few hours.
                </p>

                <form className="space-y-4" action="/enquiry" method="get">
                  <div>
                    <label htmlFor="concierge-name" className="block font-mono text-[9px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
                      Your Name
                    </label>
                    <input
                      id="concierge-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Full Name"
                      className="w-full bg-[var(--background)] border border-[var(--color-stone)]/60 px-3.5 py-2.5 text-xs text-[var(--color-graphite)] focus:border-[var(--color-gold)] outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="concierge-email" className="block font-mono text-[9px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
                      Email Address
                    </label>
                    <input
                      id="concierge-email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full bg-[var(--background)] border border-[var(--color-stone)]/60 px-3.5 py-2.5 text-xs text-[var(--color-graphite)] focus:border-[var(--color-gold)] outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="concierge-stone" className="block font-mono text-[9px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
                      Gemstone Details / Weight
                    </label>
                    <input
                      id="concierge-stone"
                      name="stone"
                      type="text"
                      placeholder="e.g. 4-6ct Blue Sapphire Cushion or Padparadscha"
                      className="w-full bg-[var(--background)] border border-[var(--color-stone)]/60 px-3.5 py-2.5 text-xs text-[var(--color-graphite)] focus:border-[var(--color-gold)] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 bg-[var(--color-gold)] text-white text-xs uppercase font-mono tracking-[0.2em] font-semibold hover:bg-[var(--color-gold-dark)] transition-colors shadow-md"
                  >
                    Send Inquiry →
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
