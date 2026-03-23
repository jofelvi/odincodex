import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const clashDisplay = localFont({
  src: "../../public/fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const generalSans = localFont({
  src: "../../public/fonts/GeneralSans-Variable.woff2",
  variable: "--font-general-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OdinCodex — Software Studio",
  description:
    "We craft exceptional digital experiences through software development, design, and strategic consulting.",
  keywords: [
    "software development",
    "web design",
    "UI/UX",
    "consulting",
    "branding",
    "OdinCodex",
  ],
  authors: [{ name: "OdinCodex" }],
  openGraph: {
    title: "OdinCodex — Software Studio",
    description:
      "We craft exceptional digital experiences through software development, design, and strategic consulting.",
    url: "https://odincodex.com",
    siteName: "OdinCodex",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OdinCodex — Software Studio",
    description:
      "We craft exceptional digital experiences through software development, design, and strategic consulting.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${generalSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen w-full overflow-x-hidden">{children}</body>
    </html>
  );
}
