import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyEnquire } from "@/components/StickyEnquire";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { PageTransition } from "@/components/PageTransition";
import { LiveChat } from "@/components/LiveChat";

export const metadata: Metadata = {
  title: {
    default: "Ceylon Gem Atelier | Private Gemstone House",
    template: "%s | Ceylon Gem Atelier",
  },
  description:
    "A private Ceylon gemstone atelier. Rare stones, considered carefully. Exceptional sapphires and coloured gems sourced with provenance and integrity.",
  keywords: [
    "Ceylon sapphire",
    "Sri Lankan gemstones",
    "private gemstone atelier",
    "untreated sapphire",
    "Padparadscha",
    "gemstone collector",
  ],
  authors: [{ name: "Ceylon Gem Atelier" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ceylon Gem Atelier",
    title: "Ceylon Gem Atelier | Private Gemstone House",
    description:
      "Rare stones. Considered carefully. A private gemstone atelier rooted in Ceylon.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ceylon Gem Atelier | Private Gemstone House",
    description: "Rare stones. Considered carefully.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-[var(--color-ivory)] text-[var(--color-graphite)] font-sans">
        <OrganizationJsonLd />
        <Header />
        <main className="flex-1"><PageTransition>{children}</PageTransition></main>
        <Footer />
        <StickyEnquire />
        <LiveChat />
      </body>
    </html>
  );
}
