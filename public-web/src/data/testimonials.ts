export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  gem?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-001",
    author: "Margaret Chen",
    role: "Gemstone Collector",
    content:
      "The integrity and care in sourcing these stones is evident from the first conversation. Each gem tells a story of dedication to quality.",
    gem: "cey-24-1187",
  },
  {
    id: "testimonial-002",
    author: "James Whitmore",
    role: "Fine Jewelry Designer",
    content:
      "Working with Ceylon Gem Atelier has elevated my designs. The untreated stones provide a level of authenticity my clients truly value.",
    gem: "cey-24-1203",
  },
  {
    id: "testimonial-003",
    author: "Dr. Priya Menon",
    role: "Gemologist",
    content:
      "Rare to find an atelier with such meticulous documentation and respect for the natural material. A true resource for serious collectors.",
  },
  {
    id: "testimonial-004",
    author: "Robert Sterling",
    role: "Private Collector",
    content:
      "Each stone is selected with such thoughtfulness. The personal service and expertise make the entire experience exceptional.",
    gem: "cey-24-0891",
  },
];

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export const blogTags: BlogTag[] = [
  { id: "tag-001", name: "Ceylon Sapphire", slug: "ceylon-sapphire" },
  { id: "tag-002", name: "Gemstone Care", slug: "gemstone-care" },
  { id: "tag-003", name: "Sourcing", slug: "sourcing" },
  { id: "tag-004", name: "Collecting", slug: "collecting" },
  { id: "tag-005", name: "Treatments", slug: "treatments" },
  { id: "tag-006", name: "Padparadscha", slug: "padparadscha" },
  { id: "tag-007", name: "Geuda", slug: "geuda" },
  { id: "tag-008", name: "Provenance", slug: "provenance" },
];

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  direction: "ltr" | "rtl";
}

export const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", direction: "ltr" },
  { code: "es", name: "Spanish", nativeName: "Español", direction: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", direction: "ltr" },
  { code: "de", name: "German", nativeName: "Deutsch", direction: "ltr" },
  { code: "ja", name: "Japanese", nativeName: "日本語", direction: "ltr" },
  { code: "zh", name: "Chinese", nativeName: "中文", direction: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", direction: "rtl" },
];

export interface EnquiryFormData {
  name: string;
  email: string;
  phone?: string;
  gems?: string[];
  budget?: string;
  preferences?: string;
  message?: string;
  desiredSpecs?: {
    minCarat?: number;
    maxCarat?: number;
    colour?: string;
    clarity?: string;
    treatment?: string;
  };
}
