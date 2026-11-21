import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Cairo, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { SITE_URL } from "@/lib/config";
import { OG_IMAGE } from "@/lib/images";
import { translations } from "@/lib/translations";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const { meta } = translations.en;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: meta.title,
  description: meta.description,
  applicationName: "Dar el Sajj",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Dar el Sajj",
    title: meta.title,
    description: meta.description,
    locale: "en_US",
    alternateLocale: ["ar_LB"],
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: meta.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#B3261E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // lang/dir are updated on the client when the visitor switches to Arabic (lib/i18n.tsx).
    <html lang="en" dir="ltr" className={`${bricolage.variable} ${manrope.variable} ${cairo.variable}`}>
      <body className="bg-cream font-sans text-charcoal antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
