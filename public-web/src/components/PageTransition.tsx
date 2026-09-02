"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setTransitioning(false);
    }, 180);
    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        transitioning
          ? "opacity-0 translate-y-3"
          : "opacity-100 translate-y-0"
      }`}
    >
      {displayChildren}
    </div>
  );
}
