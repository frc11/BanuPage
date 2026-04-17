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

export const metadata: Metadata = {
  title: "Banū Scents | Alta Perfumería",
  description: "Lujo Silencioso. Fragancias nicho y árabes de las casas más prestigiosas del mundo.",
};

import { CustomCursor } from "@/src/components/ui/custom-cursor";
import { ScrollProgress } from "@/src/components/ui/scroll-progress";
import { WhatsAppButton } from "@/src/components/ui/whatsapp-button";
import { MiniSelectionDrawer } from "@/src/components/selection/mini-selection-drawer";

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
      </body>
    </html>
  );
}
