export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ceylon Gem Atelier",
    description: "Private Ceylon gemstone atelier. Rare stones, considered carefully.",
    url: "https://ceylongematelier.com",
    sameAs: ["https://ark-ii.netlify.app"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    author: { "@type": "Organization", name: "Ceylon Gem Atelier" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
