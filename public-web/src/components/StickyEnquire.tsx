"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function StickyEnquire() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isEnquiryPage = pathname.startsWith("/enquiry");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isEnquiryPage || !visible) return null;

  return (
    <div className="md:hidden fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <Link href="/enquiry" className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--color-graphite)] text-[var(--color-ivory)] text-sm tracking-wide shadow-[0_12px_40px_-8px_rgba(28,27,26,0.4)] hover:bg-[var(--color-graphite)]/90 transition-all">
        Private Enquiry
        <span>→</span>
      </Link>
    </div>
  );
}
