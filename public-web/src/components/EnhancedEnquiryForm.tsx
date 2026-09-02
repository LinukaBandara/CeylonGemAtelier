"use client";

import { useState } from "react";
import { Gem } from "@/data/gems";

interface EnhancedEnquiryFormProps {
  gems?: Gem[];
  preSelectedGem?: string;
}

export function EnhancedEnquiryForm({
  gems = [],
  preSelectedGem,
}: EnhancedEnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedGems: preSelectedGem ? [preSelectedGem] : [] as string[],
    budget: "",
    desiredCarat: "",
    desiredColour: "",
    desiredClarity: "",
    desiredTreatment: "Untreated",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGemToggle = (slug: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedGems: prev.selectedGems.includes(slug)
        ? prev.selectedGems.filter((s) => s !== slug)
        : [...prev.selectedGems, slug],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store enquiry data
      const enquiries = JSON.parse(
        localStorage.getItem("cga-enquiries") || "[]"
      );
      enquiries.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem("cga-enquiries", JSON.stringify(enquiries));

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          selectedGems: [],
          budget: "",
          desiredCarat: "",
          desiredColour: "",
          desiredClarity: "",
          desiredTreatment: "Untreated",
          message: "",
        });
      }, 3000);
    } catch {
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {submitted && (
        <div className="bg-[var(--color-parchment)]/30 border border-[var(--color-sapphire)] p-4 text-[var(--color-sapphire)]">
          Thank you for your enquiry. We'll be in touch shortly.
        </div>
      )}

      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="font-serif text-lg text-[var(--color-graphite)]">
          Your Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-[var(--color-stone)]/40 bg-[var(--color-ivory)] text-[var(--color-graphite)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-graphite)]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-[var(--color-stone)]/40 bg-[var(--color-ivory)] text-[var(--color-graphite)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-graphite)]"
          />
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number (Optional)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[var(--color-stone)]/40 bg-[var(--color-ivory)] text-[var(--color-graphite)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-graphite)]"
        />
      </div>

      {/* Gem Selection */}
      {gems.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-serif text-lg text-[var(--color-graphite)]">
            Interested Gems
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
            {gems.map((gem) => (
              <label
                key={gem.slug}
                className="flex items-center gap-3 cursor-pointer p-2 hover:bg-[var(--color-parchment)]/20 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={formData.selectedGems.includes(gem.slug)}
                  onChange={() => handleGemToggle(gem.slug)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-[var(--color-graphite)]">
                  {gem.name} ({gem.carat})
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Desired Specifications */}
      <div className="space-y-4">
        <h3 className="font-serif text-lg text-[var(--color-graphite)]">
          Desired Specifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="desiredCarat"
            placeholder="Carat Range (e.g., 5-10 ct)"
            value={formData.desiredCarat}
            onChange={handleChange}
            className="px-4 py-3 border border-[var(--color-stone)]/40 bg-[var(--color-ivory)] text-[var(--color-graphite)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-graphite)]"
          />
          <input
            type="text"
            name="desiredColour"
            placeholder="Preferred Colour"
            value={formData.desiredColour}
            onChange={handleChange}
            className="px-4 py-3 border border-[var(--color-stone)]/40 bg-[var(--color-ivory)] text-[var(--color-graphite)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-graphite)]"
          />
          <input
            type="text"
            name="desiredClarity"
            placeholder="Clarity (VS, VVS, etc.)"
            value={formData.desiredClarity}
            onChange={handleChange}
            className="px-4 py-3 border border-[var(--color-stone)]/40 bg-[var(--color-ivory)] text-[var(--color-graphite)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-graphite)]"
          />
          <select
            name="desiredTreatment"
            value={formData.desiredTreatment}
            onChange={handleChange}
            className="px-4 py-3 border border-[var(--color-stone)]/40 bg-[var(--color-ivory)] text-[var(--color-graphite)] focus:outline-none focus:border-[var(--color-graphite)]"
          >
            <option value="Untreated">Untreated</option>
            <option value="Heat Treated">Heat Treated</option>
            <option value="No Preference">No Preference</option>
          </select>
        </div>

        <input
          type="text"
          name="budget"
          placeholder="Budget Range (Optional)"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[var(--color-stone)]/40 bg-[var(--color-ivory)] text-[var(--color-graphite)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-graphite)]"
        />
      </div>

      {/* Message */}
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-[var(--color-graphite)] mb-2">
            Additional Message
          </span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about what you're looking for..."
            rows={4}
            className="w-full px-4 py-3 border border-[var(--color-stone)]/40 bg-[var(--color-ivory)] text-[var(--color-graphite)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-graphite)] resize-none"
          />
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || submitted}
        className="w-full px-6 py-4 bg-[var(--color-graphite)] text-[var(--color-ivory)] hover:bg-[var(--color-sapphire)] transition-all duration-300 font-medium disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
}
