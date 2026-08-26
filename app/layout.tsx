import type { Metadata, Viewport } from "next";
import { Roboto, Bodoni_Moda, Beau_Rivage } from "next/font/google";
import dynamic from "next/dynamic";
import { GlassFilter } from "@/components/GlassFilter";
import "./globals.css";

// Dynamic imports for UI overlays
const CustomCursor = dynamic(
  () => import("@/components/CustomCursor").then((m) => m.CustomCursor)
);
const IntroMascot = dynamic(
  () => import("@/components/IntroMascot").then((m) => m.IntroMascot)
);

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
  display: "swap",
});

/** Tall, high-contrast serif for the hero wordmark's caps line. */
const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-bodoni",
  display: "swap",
});

/** Flowing script for the hero wordmark's accent line. */
const beauRivage = Beau_Rivage({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-beau-rivage",
  display: "swap",
});

const siteUrl = "https://shantibancity.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shantiban City | Luxury Gated Community in Tapna, Baruipur",
  description:
    "Mrityika Shantiban City is a ready-to-move, 220-plot luxury gated community in Tapna, Baruipur, 20 km from Kolkata. Residential plots from 2.5 katha and 72,000 sq ft of commercial space, set around a landscaped lake, clubhouse and 24x7 secured green campus.",
  keywords: [
    "Shantiban City",
    "Mrityika Realters",
    "Baruipur plots",
    "gated community Kolkata",
    "residential plots Baruipur",
    "Tapna Baruipur real estate",
  ],
  openGraph: {
    title: "Shantiban City | Luxury Gated Community in Tapna, Baruipur",
    description:
      "220 plots. One landscaped lake. Ready to move. 20 km from Kolkata. Discover Mrityika Shantiban City in Tapna, Baruipur.",
    url: siteUrl,
    siteName: "Shantiban City",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f4e33",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${bodoniModa.variable} ${beauRivage.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <GlassFilter />
        <CustomCursor />
        <IntroMascot />

        {children}
      </body>
    </html>
  );
}
