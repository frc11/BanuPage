import { createClient } from 'next-sanity';
import { projectId, dataset, token } from '../env';

/**
 * Cliente Front-End / Peticiones Desacopladas
 * Operamos con useCdn: false para garantizar frescura de inventarios y precios.
 * Delegamos el caching duro a la capa de caché / ISR nativa de Next.js.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false, 
});

/**
 * Cliente Administrativo / Mutaciones (Server-Side Only)
 * Inyecta el token explícito para evitar bloqueos por roles o estados "draft".
 * Nunca debe publicarse ni requerirse en código ruteado a los navegadores.
 */
export const adminClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token, 
});
