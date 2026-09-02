"use client";

import { useEffect, useRef } from "react";

interface ARGemViewerProps {
  gemName: string;
  modelUrl?: string;
}

export function ARGemViewer({ gemName, modelUrl }: ARGemViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!("XRSession" in window)) {
      console.log("WebXR not supported in this browser");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.0/model-viewer.min.js";
    document.head.appendChild(script);

    return () => {
      if (script.parentElement) script.parentElement.removeChild(script);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full aspect-square bg-gradient-to-br from-[#F0EBE3] to-[#E5DFD5] flex flex-col items-center justify-center relative">
      {modelUrl ? (
        <div className="text-center">
          <p className="text-[var(--color-muted)] mb-4">🕶️ Augmented Reality Viewer</p>
          <p className="text-sm text-[var(--color-muted)] mb-4">{gemName} - Interactive 3D Model</p>
          <p className="text-xs text-[var(--color-muted)] px-4">Use your device&apos;s camera to view this gem in your space</p>
          <button className="mt-4 px-4 py-2 border border-[var(--color-graphite)] text-[var(--color-graphite)] hover:bg-[var(--color-graphite)] hover:text-[var(--color-ivory)] transition-all">
            Launch AR View
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-[var(--color-muted)] mb-2">AR Viewer Coming Soon</p>
          <p className="text-xs text-[var(--color-muted)]">3D interactive viewing for {gemName}</p>
        </div>
      )}
    </div>
  );
}
