import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans", //hallo
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TFT Item Comp Builder | Teamfight Tactics Composition Optimizer",
  description:
    "Build optimal TFT compositions based on your items. Real-time recommendations with augment synergies and elo-based filtering. PC-optimized for competitive play.",
  icons: {
    icon: "/myIcon.svg",
    shortcut: "/myIcon.svg",
    apple: "/myIcon.svg",
  },
  metadataBase: new URL("https://tftitemguide.vercel.app"),
  openGraph: {
    title: "TFT Item Comp Builder | Teamfight Tactics Composition Optimizer",
    description:
      "Build optimal TFT compositions based on your items. Real-time recommendations with augment synergies and elo-based filtering.",
    url: "https://tftitemguide.vercel.app",
    siteName: "TFT Item Comp Builder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TFT Item Comp Builder | Teamfight Tactics Composition Optimizer",
    description:
      "Build optimal TFT compositions based on your items. Real-time recommendations with augment synergies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
