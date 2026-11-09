import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk } from "next/font/google";
import { Analytics } from "@/components/layout/Analytics";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-familjen",
  display: "swap",
});

const defaultTitle = "OdinCodex — Sistemas POS, facturación y gestión en Venezuela";

// <=160 chars so search engines show it whole.
const description =
  "Sistemas de gestión con tu marca para restaurantes, clubes privados y empresas: punto de venta, pago móvil, autopago con BioPago, RRHH y facturación.";

// Search-console ownership tokens come from the environment, never the repo.
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: defaultTitle,
    template: "%s | OdinCodex",
  },
  description,
  applicationName: SITE_CONFIG.name,
  category: "technology",
  keywords: [
    "sistema de gestión",
    "punto de venta para restaurantes",
    "software para clubes privados",
    "verificación de pago móvil",
    "BioPago",
    "software de recursos humanos",
    "facturación",
    "marca blanca",
    "software a medida",
    "Venezuela",
    "OdinCodex",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  alternates: {
    // Only Spanish is indexable: English is a client-side toggle on the same
    // URL, so no hreflang alternates are declared.
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    // og:image comes from src/app/opengraph-image.tsx (file convention).
    title: defaultTitle,
    description,
    url: "/",
    siteName: SITE_CONFIG.name,
    type: "website",
    locale: "es_419",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification
            ? { other: { "msvalidate.01": bingVerification } }
            : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#0e1a1c",
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={familjen.variable} data-scroll-behavior="smooth">
      <body className="min-h-screen w-full">
        {children}
        {gaId ? <Analytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
