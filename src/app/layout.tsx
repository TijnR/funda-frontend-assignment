import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const proximaNova = localFont({
  src: "../../public/fonts/ProximaNovaBold.woff",
  variable: "--font-proxima-nova",
  weight: "700",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Funda Assessment - Tijn Roozen",
    template: "%s | Funda Assessment - Tijn Roozen",
  },
  description: "Zoek naar koopwoningen in Nederland",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${proximaNova.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-2000 focus:rounded-card focus:bg-background focus:p-3 focus:text-foreground focus:ring-2 focus:ring-ring"
        >
          Naar de inhoud
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
