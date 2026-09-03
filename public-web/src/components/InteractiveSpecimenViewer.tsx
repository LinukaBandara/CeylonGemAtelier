"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Gem } from "@/data/gems";

interface InteractiveSpecimenViewerProps {
  specimen?: Gem;
  angles?: string[];
}

export function InteractiveSpecimenViewer({ specimen, angles }: InteractiveSpecimenViewerProps) {
  const [activeLighting, setActiveLighting] = useState<"daylight" | "candlelight" | "gemological">("daylight");
  const [zoomScale, setZoomScale] = useState(1);
  const [activeAngle, setActiveAngle] = useState(0);

  // The 3 user uploaded angles of the sapphire
  const defaultAngles = [
    "/images/gems/sapphire-angle-top.jpg",
    "/images/gems/sapphire-angle-side.jpg",
    "/images/gems/sapphire-angle-diag.jpg",
  ];

  const images = angles && angles.length > 0 ? angles : defaultAngles;

  // Lighting overlay styles
  const lightingFilter = {
    daylight: "brightness-105 contrast-105",
    candlelight: "sepia-[0.25] saturate-125 brightness-95",
    gemological: "contrast-125 brightness-110 saturate-110",
  }[activeLighting];

  return (
    <div className="glass-panel p-5 md:p-8 rounded-sm relative overflow-hidden">
      {/* Background ambient jewel aura */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          activeLighting === "candlelight"
            ? "bg-[radial-gradient(ellipse_at_top_right,rgba(244,162,97,0.15),transparent_60%)]"
            : activeLighting === "gemological"
            ? "bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.18),transparent_60%)]"
            : "bg-[radial-gradient(ellipse_at_top_right,rgba(197,168,128,0.15),transparent_60%)]"
        }`}
      />

      <div className="flex flex-col lg:flex-row gap-8 items-center relative z-10">
        {/* Visualizer & Light simulation */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-[420px] overflow-hidden rounded-sm border border-[var(--color-stone)]/40 bg-gradient-to-b from-black/5 to-transparent">
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 pointer-events-none z-10 shimmer-effect" />

            <div
              className={`w-full h-full relative transition-all duration-500 transform ${lightingFilter}`}
              style={{ transform: `scale(${zoomScale})` }}
            >
              <Image
                src={images[activeAngle % images.length]}
                alt="Ceylon Natural Blue Sapphire"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
                priority
              />
            </div>

            {/* Specimen Badge without green dot */}
            <div className="absolute top-3 left-3 z-20">
              <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 bg-[var(--background)]/90 backdrop-blur-md border border-[var(--color-gold)]/50 text-[var(--color-gold)]">
                Angle {activeAngle + 1} of {images.length}
              </span>
            </div>

            {/* Sleek Zoom Trigger */}
            <div className="absolute bottom-3 right-3 z-20">
              <button
                onClick={() => setZoomScale((prev) => (prev === 1 ? 1.35 : 1))}
                className="px-3 py-1.5 bg-[var(--background)]/90 backdrop-blur-md border border-[var(--color-stone)] text-[10px] font-mono tracking-wider uppercase text-[var(--color-graphite)] flex items-center gap-1.5 hover:border-[var(--color-gold)] transition-colors"
                title="Toggle inspection zoom"
              >
                <svg className="w-3.5 h-3.5 text-[var(--color-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
                <span>{zoomScale === 1 ? "Zoom" : "Reset"}</span>
              </button>
            </div>
          </div>

          {/* Angle Switcher Controls */}
          <div className="flex items-center gap-2 mt-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveAngle(i)}
                className={`relative w-12 h-12 rounded-sm border overflow-hidden transition-all duration-300 ${
                  activeAngle === i
                    ? "border-[var(--color-gold)] shadow-[0_0_8px_rgba(197,168,128,0.4)]"
                    : "border-[var(--color-stone)]/50 opacity-60 hover:opacity-100"
                }`}
                aria-label={`View angle ${i + 1}`}
              >
                <Image src={img} alt={`Angle ${i + 1}`} fill className="object-cover" sizes="48px" />
              </button>
            ))}
          </div>
        </div>

        {/* Technical Dossier & Interactive Lighting Controls */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <div className="mb-2">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)]">
                Available In Stock
              </span>
            </div>

            <h3 className="font-display text-2xl md:text-3xl text-[var(--color-graphite)] font-normal tracking-wide">
              Ceylon Royal Blue Sapphire
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1 mb-6 font-sans">
              Certified natural unheated blue sapphire with vivid saturation and clean facet brilliance. Mined in Ratnapura.
            </p>

            {/* Lighting Environment Controls with Clean Minimalist SVG Icons */}
            <div className="mb-6 p-3.5 bg-[var(--color-parchment)]/50 rounded-sm border border-[var(--color-stone)]/40">
              <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-muted)] mb-2.5">
                Lighting Environment
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveLighting("daylight")}
                  className={`py-2 px-2 text-[10px] uppercase font-mono tracking-wider flex items-center justify-center gap-1.5 transition-all border ${
                    activeLighting === "daylight"
                      ? "border-[var(--color-gold)] bg-[var(--background)] text-[var(--color-gold)] shadow-sm font-medium"
                      : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-graphite)]"
                  }`}
                >
                  <svg className="w-3.5 h-3.5 text-[var(--color-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Daylight</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLighting("candlelight")}
                  className={`py-2 px-2 text-[10px] uppercase font-mono tracking-wider flex items-center justify-center gap-1.5 transition-all border ${
                    activeLighting === "candlelight"
                      ? "border-[var(--color-gold)] bg-[var(--background)] text-[var(--color-gold)] shadow-sm font-medium"
                      : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-graphite)]"
                  }`}
                >
                  <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343a7.975 7.975 0 010 11.314z" />
                  </svg>
                  <span>Warm</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLighting("gemological")}
                  className={`py-2 px-2 text-[10px] uppercase font-mono tracking-wider flex items-center justify-center gap-1.5 transition-all border ${
                    activeLighting === "gemological"
                      ? "border-[var(--color-gold)] bg-[var(--background)] text-[var(--color-gold)] shadow-sm font-medium"
                      : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-graphite)]"
                  }`}
                >
                  <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span>Lab Light</span>
                </button>
              </div>
            </div>

            {/* Specimen Key Matrix */}
            <dl className="grid grid-cols-2 gap-y-3 gap-x-4 font-mono text-xs border-y border-[var(--color-stone)]/40 py-4 mb-6">
              <div>
                <dt className="text-[10px] uppercase text-[var(--color-muted)]">Carat Weight</dt>
                <dd className="font-semibold text-sm text-[var(--color-graphite)]">{specimen?.carat || "6.72 ct"}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase text-[var(--color-muted)]">Color</dt>
                <dd className="font-semibold text-sm text-[var(--color-graphite)]">{specimen?.colour || "Royal Blue"}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase text-[var(--color-muted)]">Origin</dt>
                <dd className="text-[var(--color-graphite)]">{specimen?.origin || "Ratnapura, Sri Lanka"}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase text-[var(--color-muted)]">Treatment</dt>
                <dd className="text-[var(--color-graphite)]">{specimen?.treatment || "No heat · Untreated"}</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/gems/cey-24-1187"
              className="flex-1 py-3 px-5 text-center text-xs uppercase tracking-[0.2em] font-medium bg-[var(--color-graphite)] text-[var(--color-ivory)] hover:bg-[var(--color-gold)] hover:text-white transition-all duration-300"
            >
              View Stone Details →
            </Link>
            <Link
              href="/enquiry?specimen=CEY-24-1187"
              className="py-3 px-5 text-center text-xs uppercase tracking-[0.2em] font-medium border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-white transition-all duration-300"
            >
              Make an Enquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
