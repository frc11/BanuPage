/**
 * /seleccion — Mi Selección page shell (Server Component).
 *
 * Fetches suggested products server-side (isFeatured) and passes them as props
 * to the Client Component. The client filters out already-selected items.
 */
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { SUGGESTED_PRODUCTS_QUERY } from "@/lib/queries";
import { mapSanityPerfume } from "@/lib/mappers";
import type { PerfumeData } from "@/types/sanity";
import { SelectionPageContent } from "@/src/components/selection/selection-page-content";

export const metadata: Metadata = {
  title: "Mi Selección | Banū Scents",
  description:
    "Tus perfumes seleccionados. Armá tu wishlist y consultá por WhatsApp para recibir asesoramiento personalizado.",
  robots: { index: false }, // Página de estado de usuario — no indexar
};

export default async function SeleccionPage() {
  // Fetch server-side — productos destacados para sugerir.
  // El filtrado de los ya seleccionados ocurre en el client component (acceso al store).
  let allFeatured: PerfumeData[] = [];

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw = await sanityFetch<any[]>({ query: SUGGESTED_PRODUCTS_QUERY });
    allFeatured = (raw ?? []).map(mapSanityPerfume);
  } catch (err) {
    // Falla silenciosa — la sección de sugerencias simplemente no aparece
    console.error("[SeleccionPage] Error fetching suggested products:", err);
  }

  return <SelectionPageContent allFeatured={allFeatured} />;
}
