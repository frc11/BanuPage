import { createClient } from 'next-sanity';

// Resolución directa de variables de entorno (asegura fallbacks de capa cero)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummyProjectId';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_API_READ_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // Deshabilitado para forzar coherencia transaccional e integridad en el inventario
});

/**
 * Capa intermedia (Helper) estricta en TS para todas las peticiones de los Server Components.
 * Incluye la arquitectura ISR de Next.js.
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, unknown>;
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    // Configuración profunda de Turbopack/Next cache
    next: {
      revalidate: 60, // ISR: Garantía absoluta de revalidar cada 60 segundos en Edge
    },
  });
}
