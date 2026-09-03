import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { PageTransition } from "@/components/PageTransition";
import { LiveChat } from "@/components/LiveChat";
import { MobileConciergeDock } from "@/components/MobileConciergeDock";

export const metadata: Metadata = {
  title: {
    default: "Ceylon Gem Atelier | Private Gemstone Vault & Haute Joaillerie",
    template: "%s | Ceylon Gem Atelier",
  },
  description:
    "An exclusive Ceylon gemstone atelier. Certified untreated Royal Blue Sapphires, Padparadscha, and fine corundum curated for discerning collectors worldwide.",
  keywords: [
    "Ceylon sapphire",
    "Sri Lankan gemstones",
    "private gemstone atelier",
    "untreated sapphire",
    "Padparadscha",
    "gemstone collector",
    "GIA certified sapphire",
  ],
  authors: [{ name: "Ceylon Gem Atelier" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ceylon Gem Atelier",
    title: "Ceylon Gem Atelier | Private Gemstone Vault",
    description:
      "Rare stones. Considered carefully. Direct provenance from Sri Lanka's historic gravels.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ceylon Gem Atelier | Private Gemstone Vault",
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans selection:bg-[var(--color-gold)] selection:text-black">
        <OrganizationJsonLd />
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <MobileConciergeDock />
        <LiveChat />
      </body>
    </html>
  );
}
