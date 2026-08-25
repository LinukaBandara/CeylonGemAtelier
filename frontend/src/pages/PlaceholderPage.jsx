export default function PlaceholderPage({ eyebrow = "Ceylon Gem Atelier", title, description }) {
  return (
    <section className="placeholder-page">
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description ?? "This atelier module will be implemented next."}</p>
      <div className="placeholder-line" />
    </section>
  );
}
