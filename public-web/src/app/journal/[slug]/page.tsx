import Link from "next/link";
import { notFound } from "next/navigation";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ArticleJsonLd } from "@/components/JsonLd";

const articles: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
}> = {
  "the-language-of-untreated-sapphires": {
    title: "The Language of Untreated Sapphires",
    category: "Gemology",
    date: "2026-08-01",
    readTime: "6 min",
    content: [
      "In the quiet hierarchy of fine sapphires, few distinctions carry more weight than the simple statement: untreated. It is a word that appears on laboratory reports with almost clinical brevity, yet behind it lies a philosophy of respect for the stone as it emerged from the earth.",
      "Heat treatment has been practised for centuries. When applied with skill it can improve colour and clarity, and many beautiful stones have been enhanced in this way. Yet an untreated sapphire occupies a different category of rarity. Its colour is the colour the crystal grew with. Its inclusions are the geological record of its formation. Nothing has been deliberately altered.",
      "For the serious collector this matters. An untreated stone of fine colour from a classical locality such as Ceylon carries a kind of authenticity that treated material, however attractive, cannot fully share. The market recognises this. Prices reflect it. More importantly, the experience of living with the stone reflects it.",
      "At the atelier we give preference to untreated material whenever quality and character allow. Not because treatment is inherently undesirable, but because the absence of treatment is a form of honesty that aligns with the way we prefer to work. The stone is allowed to speak in its own voice.",
      "When a laboratory report states “No indications of heating,” it is recording more than a technical fact. It is confirming that the beauty you see is the beauty the earth produced. In a world of intervention, that remains a quiet and powerful distinction.",
    ],
  },
  "ratnapura-after-the-rain": {
    title: "Ratnapura After the Rain",
    category: "Provenance",
    date: "2026-07-12",
    readTime: "8 min",
    content: [
      "The roads into Ratnapura are the colour of wet laterite after rain. Water stands in the low places. The air carries the smell of earth and something mineral that is difficult to name.",
      "This is still one of the great gem districts of the world. The alluvial deposits that have yielded sapphires, cat’s-eyes and many other stones for centuries continue to be worked, though the methods and the economics have changed. What has not changed is the particular quality of the material that comes from these gravels.",
      "Ceylon sapphires are known for a certain luminosity — a brightness that seems to sit inside the colour rather than on its surface. Geologists speak of the metamorphic history of the island and the long, slow conditions under which the crystals formed. Collectors simply recognise the look.",
      "Walking the edges of the workings after rain, one is reminded that every finished stone begins as a rough crystal that someone had to recognise, extract, and trust. The distance between that moment and a polished gem in a quiet room is measured in skill, time, and a long chain of careful decisions.",
      "Provenance, for us, is not a marketing word. It is the knowledge of where a stone has been and what has been done to it. After rain in Ratnapura the ground is soft and the history feels close.",
    ],
  },
  "cutting-for-light-not-weight": {
    title: "Cutting for Light, Not Weight",
    category: "Craft",
    date: "2026-06-20",
    readTime: "5 min",
    content: [
      "A rough crystal offers many possible futures. One of them maximises carat weight. Another maximises light.",
      "The first impulse is understandable. Weight is measurable, comparable, and linked to value in a straightforward way. Yet a stone that has been cut primarily for weight often returns less light to the eye. Windows appear. Extinction zones grow. The colour that looked promising in the rough becomes dull or uneven.",
      "Cutting for light requires a different set of priorities. Proportions are adjusted so that rays entering the crown are returned through the table with intensity. Symmetry is pursued not for its own sake but because it serves the optical performance of the gem. Sometimes this means accepting a lower final weight.",
      "The best cutters we work with understand this instinctively. They read the rough, locate the colour zoning, and then make the quiet decision that the stone will look more alive if a little material is sacrificed. The result is a gem that does not merely exist but performs.",
      "In the atelier we prefer stones that have been cut with this philosophy. Weight remains important. Light remains more important.",
    ],
  },
  "padparadscha-and-the-problem-of-definition": {
    title: "Padparadscha and the Problem of Definition",
    category: "Gemology",
    date: "2026-05-15",
    readTime: "7 min",
    content: [
      "Few gem varieties generate as much discussion as padparadscha. The name itself is evocative — derived from the Sanskrit for lotus blossom — yet the precise boundaries of the colour remain a matter of informed judgment rather than a simple numerical formula.",
      "Laboratories apply careful criteria. Collectors develop their own sense of what feels true. Between the two lies a narrow and beautiful zone of pink-orange that, when achieved without treatment, is among the rarest expressions of corundum.",
      "At the atelier we approach padparadscha with restraint. We prefer stones whose colour reads clearly as the variety without requiring explanation. The best examples need no defence; they simply occupy the space that the name describes.",
      "Definition will always involve some degree of interpretation. Character does not. A fine padparadscha announces itself.",
    ],
  },
  "a-private-viewing-in-geneva": {
    title: "A Private Viewing in Geneva",
    category: "Atelier",
    date: "2026-04-08",
    readTime: "4 min",
    content: [
      "The room was quiet. Three stones on a neutral cloth. Afternoon light from a high window.",
      "Private viewings are the natural setting for serious gemstones. Away from noise and haste, a collector can take the time that the material deserves. Colour is observed under changing light. Proportions are considered. Questions are asked and answered without urgency.",
      "That afternoon in Geneva one of the stones — an untreated Ceylon sapphire of classical proportions — held the attention longest. Not because it was the largest, but because it returned light with a particular calm intensity that is difficult to describe and impossible to ignore.",
      "These encounters remain the heart of the way we prefer to work.",
    ],
  },
  "what-certification-actually-tells-you": {
    title: "What Certification Actually Tells You",
    category: "Education",
    date: "2026-03-22",
    readTime: "9 min",
    content: [
      "A laboratory report is a document of observation, not a guarantee of beauty. Understanding what it does and does not say is essential for any serious buyer.",
      "Origin conclusions are based on a combination of inclusions, chemical signature and, where relevant, geographical reference collections. They are expert opinions, not absolute certainties, though the best laboratories reach them with rigorous consistency.",
      "Treatment detection has become highly sophisticated. Heat, clarity enhancement, and more unusual processes leave traces that experienced gemologists recognise. The statement “No indications of heating” is therefore meaningful — it records the absence of evidence for a common and significant intervention.",
      "What a report cannot tell you is whether you will love the stone. Colour preference, the way a gem performs in motion, and the quieter qualities of presence remain matters of personal response. Certification supports judgment; it does not replace it.",
      "We encourage clients to read reports carefully and to ask questions. The more clearly the language is understood, the more useful the document becomes.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: "Article" };
  return {
    title: article.title,
    description: article.content[0]?.slice(0, 160),
  };
}

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  return (
    <article className="pt-28 md:pt-36 pb-24">
      <ScrollProgress />
      <ArticleJsonLd
        title={article.title}
        description={article.content[0] || ""}
        date={article.date}
      />
      <div className="mx-auto max-w-2xl px-6">
        <Link
          href="/journal"
          className="text-xs tracking-wider text-[var(--color-muted)] hover:text-[var(--color-graphite)] transition-colors mb-10 inline-block"
        >
          ← Journal
        </Link>

        <div className="flex items-center gap-3 text-xs tracking-wider text-[var(--color-muted)] mb-6">
          <span className="uppercase">{article.category}</span>
          <span>·</span>
          <span>{article.date.slice(0, 7)}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--color-graphite)] leading-tight mb-12">
          {article.title}
        </h1>

        <div className="space-y-6 text-[var(--color-graphite)]/90 leading-[1.8] text-[15px] md:text-base">
          {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-[var(--color-stone)]/40">
          <Link
            href="/enquiry"
            className="inline-flex items-center gap-2 text-sm tracking-wide border border-[var(--color-graphite)] px-7 py-3.5 text-[var(--color-graphite)] hover:bg-[var(--color-graphite)] hover:text-[var(--color-ivory)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Discuss this with the Atelier
            <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
