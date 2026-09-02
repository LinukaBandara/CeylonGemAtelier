export function CertificationMarks({ className = "" }: { className?: string }) {
  const labs = [
    { name: "Gübelin", sub: "Gem Lab" },
    { name: "GRS", sub: "GemResearch" },
    { name: "SSEF", sub: "Swiss Lab" },
  ];

  return (
    <div className={`flex flex-wrap items-center justify-center gap-8 md:gap-14 ${className}`}>
      {labs.map((lab) => (
        <div key={lab.name} className="text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 border border-[var(--color-stone)]/60 rounded-full flex items-center justify-center mb-2 mx-auto">
            <span className="font-serif text-xs md:text-sm tracking-wider text-[var(--color-graphite)]">
              {lab.name.slice(0, 3).toUpperCase()}
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
            {lab.name}
          </p>
        </div>
      ))}
    </div>
  );
}
