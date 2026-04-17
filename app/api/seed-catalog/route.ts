import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

export async function GET() {
  try {
    const writeClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: "2024-01-01",
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    });

    // ─── 1. Creación de Marcas ────────────────────────────────────────────────────────
    const brandNames = ["Lattafa", "Armaf", "Afnan", "Al Wataniah", "Rasasi"];
    const brandRefs: Record<string, string> = {};

    for (const name of brandNames) {
      const newBrand = await writeClient.create({
        _type: 'brand',
        name,
      });
      brandRefs[name] = newBrand._id;
    }

    // Función auxiliar para generar slugs
    const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

    // ─── 2. Definición de Perfumes ────────────────────────────────────────────────────
    const perfumes: any[] = [
      {
        _type: 'perfume',
        name: "Khamrah Black",
        slug: { _type: 'slug', current: slugify("Khamrah Black") },
        brand: { _type: 'reference', _ref: brandRefs["Lattafa"] },
        price: { basePrice: 67000, isOnSale: false },
        notes: { top: "Canela, Nuez Moscada", heart: "Dátiles, Praliné", base: "Vainilla, Haba Tonka" },
        performance: { longevity: 5, projection: 4 },
        tags: ["Noche", "Cita", "Elegante"],
        isFeatured: true,
      },
      {
        _type: 'perfume',
        name: "Odyssey Mega",
        slug: { _type: 'slug', current: slugify("Odyssey Mega") },
        brand: { _type: 'reference', _ref: brandRefs["Armaf"] },
        price: { basePrice: 70000, isOnSale: false },
        notes: { top: "Cítricos, Menta", heart: "Jengibre, Notas Acuáticas", base: "Ámbar, Maderas" },
        performance: { longevity: 4, projection: 4 },
        tags: ["Diario", "Calor", "Sport"],
        isFeatured: false,
      },
      {
        _type: 'perfume',
        name: "9PM Elixir",
        slug: { _type: 'slug', current: slugify("9PM Elixir") },
        brand: { _type: 'reference', _ref: brandRefs["Afnan"] },
        price: { basePrice: 83000, isOnSale: false },
        notes: { top: "Manzana, Canela", heart: "Lavanda, Flor de Azahar", base: "Vainilla, Pachulí" },
        performance: { longevity: 5, projection: 5 },
        tags: ["Noche", "Modo Bestia", "Cita"],
        isFeatured: true,
      },
      {
        _type: 'perfume',
        name: "Fakhar Preto",
        slug: { _type: 'slug', current: slugify("Fakhar Preto") },
        brand: { _type: 'reference', _ref: brandRefs["Lattafa"] },
        price: { basePrice: 64500, isOnSale: false },
        notes: { top: "Manzana, Bergamota", heart: "Salvia, Lavanda", base: "Haba Tonka, Vetiver" },
        performance: { longevity: 4, projection: 4 },
        tags: ["Diario", "Elegante"],
        isFeatured: false,
      },
      {
        _type: 'perfume',
        name: "Club de Nuit Intense Man",
        slug: { _type: 'slug', current: slugify("Club de Nuit Intense Man") },
        brand: { _type: 'reference', _ref: brandRefs["Armaf"] },
        inspiredBy: "Creed Aventus",
        price: { basePrice: 71500, isOnSale: false },
        notes: { top: "Limón, Piña", heart: "Abedul, Jazmín", base: "Almizcle, Ámbar Gris" },
        performance: { longevity: 5, projection: 5 },
        tags: ["Diario", "Elegante", "Modo Bestia"],
        isFeatured: true,
      },
      {
        _type: 'perfume',
        name: "Attar Al Wesal",
        slug: { _type: 'slug', current: slugify("Attar Al Wesal") },
        brand: { _type: 'reference', _ref: brandRefs["Al Wataniah"] },
        price: { basePrice: 55000, isOnSale: false },
        notes: { top: "Notas Florales", heart: "Especias Árabes", base: "Oud, Almizcle" },
        performance: { longevity: 4, projection: 4 },
        tags: ["Noche", "Elegante"],
        isFeatured: false,
      },
      {
        _type: 'perfume',
        name: "Hawas For Him",
        slug: { _type: 'slug', current: slugify("Hawas For Him") },
        brand: { _type: 'reference', _ref: brandRefs["Rasasi"] },
        price: { basePrice: 84000, isOnSale: false },
        notes: { top: "Manzana, Bergamota", heart: "Notas Acuáticas, Melón", base: "Ámbar Gris, Almizcle" },
        performance: { longevity: 5, projection: 4 },
        tags: ["Calor", "Diario", "Sport"],
        isFeatured: true,
      },
      {
        _type: 'perfume',
        name: "Club de Nuit Iconic Blue",
        slug: { _type: 'slug', current: slugify("Club de Nuit Iconic Blue") },
        brand: { _type: 'reference', _ref: brandRefs["Armaf"] },
        price: { basePrice: 83000, isOnSale: false },
        notes: { top: "Pomelo, Menta", heart: "Nuez Moscada, Jengibre", base: "Incienso, Sándalo" },
        performance: { longevity: 4, projection: 4 },
        tags: ["Calor", "Diario", "Elegante"],
        isFeatured: false,
      }
    ];

    // ─── 3. Creación de Perfumes en Sanity ────────────────────────────────────────────
    for (const perfume of perfumes) {
      await writeClient.create(perfume);
    }

    return NextResponse.json({ message: "Catálogo cargado exitosamente", success: true });
  } catch (error: any) {
    console.error("Error seeding catalog:", error);
    return NextResponse.json(
      { message: "Error al cargar el catálogo", success: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
