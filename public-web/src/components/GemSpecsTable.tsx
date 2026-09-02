"use client";

import { Gem } from "@/data/gems";

interface GemSpecsTableProps {
  gem: Gem;
}

export function GemSpecsTable({ gem }: GemSpecsTableProps) {
  const specs = [
    { label: "Specimen ID", value: gem.specimen },
    { label: "Carat Weight", value: gem.carat },
    { label: "Cut", value: gem.cut },
    { label: "Colour", value: gem.colour },
    { label: "Clarity", value: gem.clarity },
    { label: "Treatment", value: gem.treatment },
    { label: "Origin", value: gem.origin },
    ...(gem.refractive ? [{ label: "Refractive Index", value: gem.refractive }] : []),
    ...(gem.density ? [{ label: "Density", value: gem.density }] : []),
  ];

  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <tbody>
          {specs.map((spec, index) => (
            <tr
              key={index}
              className={`border-b border-[var(--color-stone)]/20 ${
                index % 2 === 0 ? "bg-[var(--color-parchment)]/30" : ""
              }`}
            >
              <td className="py-3 px-4 font-medium text-[var(--color-graphite)] w-1/3">
                {spec.label}
              </td>
              <td className="py-3 px-4 text-[var(--color-muted)]">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
