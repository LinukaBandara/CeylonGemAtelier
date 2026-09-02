import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center pt-24 pb-16">
      <div className="text-center px-6 max-w-md">
        <Logo variant="monogram" className="mx-auto mb-10" />
        <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-graphite)] mb-4">
          Page not found
        </h1>
        <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-10">
          The page you are looking for does not exist or has been moved.
          We would be pleased to guide you back.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm tracking-wide border border-[var(--color-graphite)] px-7 py-3.5 text-[var(--color-graphite)] hover:bg-[var(--color-graphite)] hover:text-[var(--color-ivory)] transition-all duration-300"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}
