import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MiniSelectionDrawer } from "@/src/components/selection/mini-selection-drawer";
import { CustomCursor } from "@/src/components/ui/custom-cursor";
import { ScrollProgress } from "@/src/components/ui/scroll-progress";
import { WhatsAppButton } from "@/src/components/ui/whatsapp-button";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      {/* MiniSelectionDrawer: disponible en todas las rutas frontend,
          controlado por isOpen del Zustand store.
          z-index:50, posicionado top:60px (debajo del navbar). */}
      <MiniSelectionDrawer />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
