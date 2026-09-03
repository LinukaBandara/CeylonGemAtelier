interface CertificationMarksProps {
  className?: string;
  certifications?: string[];
}

export function CertificationMarks({
  className = "",
  certifications,
}: CertificationMarksProps) {
  const labs =
    certifications && certifications.length > 0
      ? certifications.map((c) => ({
          name: c.replace(/ Certified$/i, ""),
          full: "Official Independent Gemological Dossier",
        }))
      : [
          { name: "Gübelin", full: "Swiss Gem Lab · Lucerne" },
          { name: "SSEF", full: "Swiss Gemmological Institute" },
          { name: "GRS", full: "GemResearch Swisslab" },
          { name: "GIA", full: "Gemological Institute of America" },
        ];

  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 md:gap-10 ${className}`}>
      {labs.map((lab) => (
        <div key={lab.name} className="group text-center transition-transform hover:-translate-y-0.5 duration-300">
          <div className="w-16 h-16 md:w-20 md:h-20 border border-[var(--color-gold)]/40 rounded-full flex flex-col items-center justify-center mb-2 mx-auto bg-[var(--color-parchment)]/30 group-hover:border-[var(--color-gold)] group-hover:shadow-[0_0_15px_rgba(197,168,128,0.25)] transition-all">
            <span className="font-display text-xs md:text-sm font-semibold tracking-widest text-[var(--color-gold)]">
              {lab.name}
            </span>
            <span className="text-[8px] tracking-wider uppercase font-mono text-[var(--color-muted)] mt-0.5">
              Verified
            </span>
          </div>
          <p className="text-[9px] uppercase tracking-[0.2em] font-mono text-[var(--color-muted)]">
            {lab.name} Certified
          </p>
        </div>
      ))}
    </div>
  );
}
