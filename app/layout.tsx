import type { Metadata } from "next";
import React from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import LoadingScreen from "@/src/components/ui/loading-screen";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

import ToastContainer from "@/src/components/ui/toast";
import { CustomCursor } from "@/src/components/ui/custom-cursor";
import { ScrollProgress } from "@/src/components/ui/scroll-progress";
import { WhatsAppButton } from "@/src/components/ui/whatsapp-button";
import { MiniSelectionDrawer } from "@/src/components/selection/mini-selection-drawer";

export const metadata: Metadata = {
  metadataBase: new URL('https://banuscents.com'),
  title: {
    default: 'Banū Scents | Perfumes Árabes de Alta Gama',
    template: '%s | Banū Scents'
  },
  description: 'Explorá la mejor selección de perfumes árabes auténticos en Argentina. Lattafa, Creed, Al Haramain, Xerjoff y más con envío a todo el país.',
  keywords: ['perfumes árabes', 'fragancias orientales', 'oud', 'lattafa', 'creed', 'argentina'],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://banuscents.com',
    siteName: 'Banū Scents',
    title: 'Banū Scents | Perfumes Árabes de Alta Gama',
    description: 'La mejor selección de perfumes árabes auténticos en Argentina.',
    images: [{
      url: '/og-default.jpg', // TODO: crear imagen OG por defecto
      width: 1200,
      height: 630,
      alt: 'Banū Scents'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Banū Scents | Perfumes Árabes',
    description: 'La mejor selección de perfumes árabes auténticos en Argentina.'
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: '/logoSVG.svg',
    apple: '/logoC.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="antialiased flex flex-col min-h-screen text-[var(--color-text)] bg-[var(--color-cream)] selection:bg-[var(--color-gold)] selection:text-[var(--color-text-light)]">
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        
        {children}
        
        <WhatsAppButton />
        <MiniSelectionDrawer />
        <ToastContainer />
      </body>
    </html>
  );
}
