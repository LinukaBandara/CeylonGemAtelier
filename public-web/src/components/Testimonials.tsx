"use client";

import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="py-16 bg-[var(--color-parchment)]/20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-graphite)] mb-4">
            Words from Collectors
          </h2>
          <p className="text-[var(--color-muted)] max-w-lg mx-auto">
            Trusted by collectors and connoisseurs who understand the value of integrity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[var(--color-ivory)] border border-[var(--color-stone)]/40 p-8"
            >
              <div className="mb-6">
                <p className="text-[var(--color-muted)] text-lg italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="border-t border-[var(--color-stone)]/20 pt-4">
                <p className="font-medium text-[var(--color-graphite)]">
                  {testimonial.author}
                </p>
                <p className="text-sm text-[var(--color-muted)]">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
