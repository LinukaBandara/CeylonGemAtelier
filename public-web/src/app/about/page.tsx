export const metadata = {
  title: "About",
  description: "The story and philosophy of Ceylon Gem Atelier.",
};

export default function AboutPage() {
  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-2xl px-6">
        <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-graphite)] mb-8">
          About the Atelier
        </h1>
        <div className="prose prose-sm text-[var(--color-muted)] space-y-6 leading-relaxed">
          <p>
            Ceylon Gem Atelier is a private gemstone house dedicated to the
            exceptional stones of Sri Lanka. We work with rare, carefully
            selected specimens that carry clear provenance and verified
            identity.
          </p>
          <p>
            Our approach is deliberate and restrained. We do not produce volume.
            Every stone is considered individually — its origin, its treatment
            status, its cutting, and its suitability for a discerning collector
            or jewellery house.
          </p>
          <p>
            [[REQUIRED: founding story and year]]
          </p>
          <p>
            [[REQUIRED: atelier location and any public-facing address details]]
          </p>
        </div>
      </div>
    </section>
  );
}
