import { createClient } from 'next-sanity';

// Resolucion directa de variables de entorno (asegura fallbacks de capa cero)
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const projectId = rawProjectId || 'dummyprojectid';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_API_READ_TOKEN;

const sanityConfigured = Boolean(rawProjectId && rawProjectId.toLowerCase() !== 'dummyprojectid');
let didWarnInvalidConfig = false;

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
  if (!sanityConfigured) {
    if (!didWarnInvalidConfig) {
      didWarnInvalidConfig = true;
      console.warn(
        `[sanityFetch] Sanity deshabilitado: NEXT_PUBLIC_SANITY_PROJECT_ID no configurado o invalido. Query omitida: ${query.slice(0, 60)}...`
      );
    }
    return null as QueryResponse;
  }

  try {
    return await client.fetch<QueryResponse>(query, params, {
      // Configuracion profunda de Turbopack/Next cache
      next: {
        revalidate: 60, // ISR: revalida cada 60 segundos
      },
    });
  } catch (error) {
    const statusCode =
      typeof error === 'object' && error !== null && 'statusCode' in error
        ? (error as { statusCode?: number }).statusCode
        : undefined;

    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[sanityFetch] Error al consultar Sanity (${statusCode ?? 'unknown'}): ${message}`);
    return null as QueryResponse;
  }
}
