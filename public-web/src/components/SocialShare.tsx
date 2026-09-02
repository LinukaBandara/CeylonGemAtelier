"use client";

import { useEffect, useState } from "react";

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

export function SocialShare({ title, url, description }: SocialShareProps) {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const socialLinks = [
    {
      name: "Twitter",
      icon: "𝕏",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Facebook",
      icon: "f",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: "in",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Email",
      icon: "✉",
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description || title)}%0A${encodeURIComponent(shareUrl)}`,
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-3 py-4">
      <span className="text-sm text-[var(--color-muted)]">Share:</span>
      <div className="flex gap-2">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center border border-[var(--color-stone)]/40 text-[var(--color-graphite)] hover:bg-[var(--color-graphite)] hover:text-[var(--color-ivory)] transition-all duration-300 text-xs font-medium"
            title={`Share on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="w-9 h-9 flex items-center justify-center border border-[var(--color-stone)]/40 text-[var(--color-graphite)] hover:bg-[var(--color-graphite)] hover:text-[var(--color-ivory)] transition-all duration-300"
          title="Copy link"
        >
          🔗
        </button>
      </div>
    </div>
  );
}
