export type GemVariant = "sapphire" | "padparadscha" | "geuda" | "rough" | "faceted";
export type CollectionType = "ceylon-sapphires" | "padparadscha" | "ceylon-geuda";

export interface Gem {
  slug: string;
  name: string;
  specimen: string;
  carat: string;
  origin: string;
  treatment: string;
  cut: string;
  colour: string;
  clarity: string;
  variant: GemVariant;
  story: string;
  collection: CollectionType;
  price?: string;
  images?: string[];
  tags?: string[];
  relatedStones?: string[];
  certifications?: string[];
  refractive?: string;
  density?: string;
}

export const gems: Record<string, Gem> = {
  "cey-24-1187": {
    slug: "cey-24-1187",
    name: "Ceylon Sapphire",
    specimen: "CEY-24-1187",
    carat: "6.72 ct",
    origin: "Ratnapura, Sabaragamuwa Province, Ceylon",
    treatment: "No heat · Untreated",
    cut: "Cushion",
    colour: "Cornflower blue",
    clarity: "VS",
    variant: "faceted",
    story: "An untreated cushion-cut sapphire of classical Ceylon colour. Selected for balance of saturation and brightness, and for the quiet integrity of its untreated state.",
    collection: "ceylon-sapphires",
    price: "$8,064",
    images: ["/images/CGA_Concept01_Images/gem1-1.jpg", "/images/CGA_Concept01_Images/gem1-2.jpg"],
    tags: ["Ceylon Sapphire", "Cushion Cut", "Untreated"],
    certifications: ["GIA Certified"],
    refractive: "1.758 - 1.768",
    density: "3.99 g/cm³",
  },
  "cey-24-1203": {
    slug: "cey-24-1203",
    name: "Ceylon Sapphire",
    specimen: "CEY-24-1203",
    carat: "4.18 ct",
    origin: "Pelmadulla, Ceylon",
    treatment: "No heat · Untreated",
    cut: "Oval",
    colour: "Royal blue",
    clarity: "VVS",
    variant: "sapphire",
    story: "A finely proportioned oval of deep royal blue. The stone returns light with exceptional intensity and carries no indications of heating.",
    collection: "ceylon-sapphires",
    price: "$5,016",
    images: ["/images/CGA_Concept01_Images/gem2-1.jpg"],
    tags: ["Ceylon Sapphire", "Oval Cut", "Untreated"],
    certifications: ["GIA Certified"],
    refractive: "1.758 - 1.768",
    density: "3.99 g/cm³",
  },
  "cey-24-0891": {
    slug: "cey-24-0891",
    name: "Padparadscha Sapphire",
    specimen: "CEY-24-0891",
    carat: "3.45 ct",
    origin: "Rakwana, Ceylon",
    treatment: "No heat · Untreated",
    cut: "Cushion",
    colour: "Lotus pink-orange",
    clarity: "VS",
    variant: "padparadscha",
    story: "A true padparadscha of delicate lotus hue. The colour sits in the rare zone between pink and orange that defines the variety.",
    collection: "padparadscha",
    price: "$8,625",
    images: ["/images/CGA_Concept01_Images/gem3-1.jpg"],
    tags: ["Padparadscha", "Cushion Cut", "Untreated", "Rare"],
    certifications: ["GIA Certified"],
    refractive: "1.758 - 1.768",
    density: "3.99 g/cm³",
  },
  "cey-24-1102": {
    slug: "cey-24-1102",
    name: "Ceylon Geuda",
    specimen: "CEY-24-1102",
    carat: "5.90 ct",
    origin: "Balangoda, Ceylon",
    treatment: "Untreated",
    cut: "Cushion",
    colour: "Milky luminous",
    clarity: "SI",
    variant: "geuda",
    story: "A substantial geuda with the characteristic soft luminosity of the material. Chosen for presence and understated character.",
    collection: "ceylon-geuda",
    price: "$4,720",
    images: ["/images/CGA_Concept01_Images/gem4-1.jpg"],
    tags: ["Geuda", "Cushion Cut", "Untreated"],
    certifications: ["GIA Certified"],
    refractive: "1.758 - 1.768",
    density: "3.99 g/cm³",
  },
  "cey-24-0755": {
    slug: "cey-24-0755",
    name: "Ceylon Sapphire",
    specimen: "CEY-24-0755",
    carat: "2.86 ct",
    origin: "Eheliyagoda, Ceylon",
    treatment: "No heat · Untreated",
    cut: "Round",
    colour: "Cornflower",
    clarity: "VVS",
    variant: "faceted",
    story: "A bright cornflower round of exceptional clarity. Compact, lively, and completely untreated.",
    collection: "ceylon-sapphires",
    price: "$3,432",
    images: ["/images/CGA_Concept01_Images/gem5-1.jpg"],
    tags: ["Ceylon Sapphire", "Round Cut", "Untreated"],
    certifications: ["GIA Certified"],
    refractive: "1.758 - 1.768",
    density: "3.99 g/cm³",
  },
};

export const gemList = Object.values(gems);
