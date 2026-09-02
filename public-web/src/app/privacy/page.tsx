export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy of Ceylon Gem Atelier.",
};

export default function PrivacyPage() {
  return (
    <section className="pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-2xl px-6">
        <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-graphite)] mb-8">
          Privacy Policy
        </h1>
        <div className="space-y-8 text-sm text-[var(--color-muted)] leading-relaxed">
          <p>
            Ceylon Gem Atelier respects your privacy. This policy explains what
            information we collect, why we collect it, and how it is handled.
          </p>

          <div>
            <h2 className="font-serif text-xl text-[var(--color-graphite)] mb-3">
              Information We Collect
            </h2>
            <p>
              When you submit an enquiry we collect the details you choose to
              provide — typically your name, email address, telephone number,
              and any message regarding gemstones of interest. We do not collect
              payment card data through this website.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[var(--color-graphite)] mb-3">
              Purpose
            </h2>
            <p>
              Information is used solely to respond to your enquiry, to provide
              private consultation, and to maintain a discreet record of our
              correspondence with you.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[var(--color-graphite)] mb-3">
              Storage & Retention
            </h2>
            <p>
              [[REQUIRED: storage location and retention period]]. We retain
              enquiry records only as long as necessary for the purposes
              described above or as required by applicable law.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[var(--color-graphite)] mb-3">
              Sharing
            </h2>
            <p>
              We do not sell or rent personal information. Information may be
              shared with trusted service providers who assist us in operating
              the website or responding to enquiries, under strict
              confidentiality obligations.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[var(--color-graphite)] mb-3">
              Your Rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of personal
              information we hold about you. Contact us at the address below to
              exercise these rights.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[var(--color-graphite)] mb-3">
              Contact
            </h2>
            <p>
              For privacy-related questions: [[REQUIRED: privacy contact email]].
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
