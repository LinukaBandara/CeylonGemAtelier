import Link from "next/link";
import Image from "next/image";
import { GemListings } from "@/components/GemListings";

export const metadata = {
  title: "Gemstone Collections · Ceylon Gem Atelier",
  description: "Browse certified natural untreated blue sapphires, padparadscha, and fine corundum from Sri Lanka.",
};

const collections = [
  {
    title: "Blue Sapphires",
    specimenCount: "In Stock",
    desc: "Vivid Ceylon Royal Blue and Cornflower sapphires with exceptional color and natural clarity.",
    href: "/collections/ceylon-sapphires",
    image: "/images/collections/sapphire-custom.jpg",
    shade: "Cornflower to Royal Blue",
  },
  {
    title: "Padparadscha Sapphires",
    specimenCount: "Rare Stock",
    desc: "Natural Sri Lankan sunset corundum featuring a delicate balance of lotus pink and golden orange tones.",
    href: "/collections/padparadscha",
    image: "/images/collections/padparadscha-custom.jpg",
    shade: "Sunset Pink & Orange",
  },
  {
    title: "Ceylon Geuda",
    specimenCount: "In Stock",
    desc: "Natural crystalline sapphires prized for internal silk, soft luminosity, and unique character.",
    href: "/collections/ceylon-geuda",
    image: "/images/collections/geuda-custom.jpg",
    shade: "Luminous Soft Blue",
  },
];

export default function CollectionsPage() {
  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
            Certified Inventory
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-graphite)] mt-2">
            Gemstone Collections
          </h1>
          <p className="text-sm md:text-base text-[var(--color-muted)] mt-3 font-sans leading-relaxed">
            All gemstones are sourced directly from Ratnapura and Pelmadulla mines in Sri Lanka, certified by independent gemological laboratories, and sold untreated.
          </p>
        </div>

        {/* Collection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-20">
          {collections.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group block glass-panel border border-[var(--color-stone)]/50 hover:border-[var(--color-gold)] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden"
            >
              <div className="aspect-[4/5] relative bg-[#F5F0E8] overflow-hidden shimmer-effect">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 bg-black/60 backdrop-blur-md text-[var(--color-gold-light)] border border-[var(--color-gold)]/30">
                    {c.specimenCount}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-gold)]">
                  {c.shade}
                </span>
                <h2 className="font-display text-xl md:text-2xl mt-1 mb-2 text-[var(--color-graphite)]">
                  {c.title}
                </h2>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-4 font-sans">
                  {c.desc}
                </p>
                <span className="font-mono text-xs tracking-wider uppercase text-[var(--color-gold)] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Browse Stones →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Global Catalog Search & Gem Listings */}
        <div className="border-t border-[var(--color-stone)]/40 pt-16">
          <GemListings title="Available Gemstone Inventory" />
        </div>
      </div>
    </section>
  );
}
