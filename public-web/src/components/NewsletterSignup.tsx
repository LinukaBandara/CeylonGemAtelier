"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 500));

      // For now, just store in localStorage to demonstrate
      const emails = JSON.parse(
        localStorage.getItem("cga-newsletter-emails") || "[]"
      );
      if (!emails.includes(email)) {
        emails.push(email);
        localStorage.setItem("cga-newsletter-emails", JSON.stringify(emails));
      }

      setStatus("success");
      setMessage("Thank you for subscribing to our newsletter.");
      setEmail("");

      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    } catch {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <section className="py-12 bg-[var(--color-parchment)]/20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <div className="max-w-md mx-auto text-center">
          <h3 className="font-serif text-2xl text-[var(--color-graphite)] mb-3">
            New Arrivals
          </h3>
          <p className="text-[var(--color-muted)] mb-6">
            Receive updates on new stones and atelier news
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-[var(--color-stone)]/40 bg-[var(--color-ivory)] text-[var(--color-graphite)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-graphite)] transition-colors"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-4 py-3 border border-[var(--color-graphite)] bg-[var(--color-graphite)] text-[var(--color-ivory)] hover:bg-[var(--color-graphite)]/90 transition-all disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {message && (
            <p
              className={`text-sm mt-3 ${
                status === "success"
                  ? "text-[var(--color-sapphire)]"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
