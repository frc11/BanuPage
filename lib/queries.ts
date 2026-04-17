// lib/queries.ts

export const HERO_QUERY = `*[_type == "hero"][0] { 
  _id, 
  title, 
  subtitle, 
  "videoUrls": backgroundVideos[].asset->url 
}`;

export const BRANDS_QUERY = `*[_type == "brand"] { 
  _id, 
  name, 
  "logoUrl": logo.asset->url 
}`;

export const FEATURED_PRODUCTS_QUERY = `*[_type == "perfume"] | order(_createdAt desc) { 
  _id, 
  name, 
  "slug": slug.current, 
  badge, 
  inspiredBy, 
  price, 
  notes, 
  performance, 
  tags, 
  isFeatured, 
  "imageUrl": mainImage.asset->url, 
  "gallery": gallery[].asset->url, 
  "brand": brand->{ "title": name, "logoUrl": logo.asset->url }
}`;

export const TRUST_ITEMS_QUERY = `*[_type == "trustItem"] | order(_createdAt asc) { 
  _id, 
  title, 
  description, 
  iconName 
}`;

export const FAQ_ITEMS_QUERY = `*[_type == "faqItem"] | order(_createdAt asc) { 
  _id, 
  question, 
  answer 
}`;

export const REVIEWS_QUERY = `*[_type == "review"] | order(_createdAt desc) { 
  _id, 
  author, 
  rating, 
  text 
}`;

// ─── PDP — Product Detail Page ────────────────────────────────────────────────

/** Fetch de un perfume único por slug — para la página de detalle */
export const PRODUCT_BY_SLUG_QUERY = `*[_type == "perfume" && slug.current == $slug][0] {
  _id, 
  name, 
  "slug": slug.current, 
  badge, 
  inspiredBy, 
  price, 
  notes, 
  performance, 
  tags, 
  isFeatured, 
  "imageUrl": mainImage.asset->url, 
  "gallery": gallery[].asset->url, 
  "brand": brand->{ "title": name, "logoUrl": logo.asset->url }
}`;

/** Fetch de slugs para generateStaticParams (ISR + SSG) */
export const ALL_PRODUCT_SLUGS_QUERY = `*[_type == "perfume" && defined(slug.current)][].slug.current`;

/** Perfumes sugeridos para /seleccion — isFeatured, máx 8 */
export const SUGGESTED_PRODUCTS_QUERY = `*[_type == "perfume" && isFeatured == true] | order(_createdAt desc) [0...8] {
  _id, 
  name, 
  "slug": slug.current, 
  badge, 
  inspiredBy, 
  price, 
  notes, 
  performance, 
  tags, 
  isFeatured, 
  "imageUrl": mainImage.asset->url, 
  "gallery": gallery[].asset->url, 
  "brand": brand->{ "title": name, "logoUrl": logo.asset->url }
}`;
