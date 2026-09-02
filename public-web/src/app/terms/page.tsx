export const metadata = {
  title: "Terms of Use",
  description: "Terms of use for Ceylon Gem Atelier.",
};

export default function TermsPage() {
  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-2xl px-6">
        <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-graphite)] mb-8">
          Terms of Use
        </h1>
        <div className="space-y-8 text-sm text-[var(--color-muted)] leading-relaxed">
          <p>
            By accessing this website you agree to the following terms. These
            terms govern use of the site and any enquiry submitted through it.
          </p>

          <div>
            <h2 className="font-serif text-xl text-[var(--color-graphite)] mb-3">
              Nature of the Website
            </h2>
            <p>
              This website presents information about gemstones and the services
              of Ceylon Gem Atelier. It is an enquiry-led platform. No online
              purchase transaction is completed on this site.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[var(--color-graphite)] mb-3">
              Product Information
            </h2>
            <p>
              Descriptions, measurements, and laboratory references are provided
              in good faith. Final confirmation of any stone’s characteristics
              occurs during private consultation. [[REQUIRED: any specific
              accuracy or certification disclaimers]].
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[var(--color-graphite)] mb-3">
              Enquiries
            </h2>
            <p>
              Submitting an enquiry does not create a binding contract. All
              transactions, if any, are concluded privately after direct
              communication.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[var(--color-graphite)] mb-3">
              Intellectual Property
            </h2>
            <p>
              All content, design, and imagery on this website are the property
              of Ceylon Gem Atelier or its licensors and may not be reproduced
              without prior written consent.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[var(--color-graphite)] mb-3">
              Limitation of Liability
            </h2>
            <p>
              [[REQUIRED: jurisdiction and liability wording]]. To the fullest
              extent permitted by law, Ceylon Gem Atelier shall not be liable for
              any indirect or consequential loss arising from use of this
              website.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[var(--color-graphite)] mb-3">
              Governing Law
            </h2>
            <p>
              [[REQUIRED: governing law and jurisdiction]].
            </p>
          </div>

          <p className="text-xs pt-6 border-t border-[var(--color-stone)]/40">
            Last updated: August 2026
          </p>
        </div>
      </div>
    </section>
  );
}
