import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Only create client if projectId is configured
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
      useCdn: false,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: any) {
  return builder ? builder.image(source) : null;
}

export interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  category: string;
  description?: string;
  image?: {
    asset: {
      _ref: string;
      url: string;
    };
    alt?: string;
  };
  basePrice?: number;
  unit?: string;
  minQuantity?: number;
  available?: boolean;
  featured: boolean;
  order: number;
}

export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  icon?: string;
  description: string;
  content?: any[];
  image?: {
    asset: {
      _ref: string;
      url: string;
    };
    alt?: string;
  };
  order: number;
}

export interface SiteSettings {
  _id: string;
  title: string;
  description?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  contactEmail?: string;
  contactPhone?: string[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
  };
  logo?: {
    asset: {
      _ref: string;
      url: string;
    };
  };
}

export async function getProducts(options?: {
  featured?: boolean;
  available?: boolean;
}): Promise<Product[]> {
  if (!client) {
    return getMockProducts(options);
  }
  
  let query = `*[_type == "product"`;
  const conditions: string[] = [];

  if (options?.featured) {
    conditions.push("featured == true");
  }
  if (options?.available) {
    conditions.push("available == true");
  }

  if (conditions.length > 0) {
    query += " && " + conditions.join(" && ");
  }

  query += `] | order(order asc) {
    _id,
    name,
    slug,
    category,
    description,
    image {
      asset-> {
        _ref,
        url
      },
      alt
    },
    basePrice,
    unit,
    minQuantity,
    available,
    featured,
    order
  }`;

  return client.fetch(query);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!client) {
    return getMockProducts().find((p) => p.slug.current === slug) || null;
  }

  return client.fetch(`*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    category,
    description,
    image {
      asset-> {
        _ref,
        url
      },
      alt
    },
    basePrice,
    unit,
    minQuantity,
    available,
    featured,
    order
  }`, { slug });
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (!client) {
    return getMockProducts().filter(p => p.category === category);
  }
  
  return client.fetch(`*[_type == "product" && category == $category && available == true] | order(order asc) {
    _id,
    name,
    slug,
    category,
    description,
    image {
      asset-> {
        _ref,
        url
      },
      alt
    },
    basePrice,
    unit,
    minQuantity,
    available,
    featured,
    order
  }`, { category });
}

export async function getServices(): Promise<Service[]> {
  if (!client) return [];
  
  return client.fetch(`*[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    icon,
    description,
    content,
    image {
      asset-> {
        _ref,
        url
      },
      alt
    },
    order
  }`);
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!client) return null;
  
  return client.fetch(`*[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    heroTitle,
    heroSubtitle,
    contactEmail,
    contactPhone,
    socialMedia,
    logo {
      asset-> {
        _ref,
        url
      }
    }
  }`);
}

// Mock products for when Sanity is not configured
function getMockProducts(options?: { featured?: boolean; available?: boolean }): Product[] {
  const products: Product[] = [
    // Plates
    { _id: "p1", name: "Prato Marcador Dourado", slug: { current: "prato-marcador-dourado" }, category: "plates", description: "Elegante prato marcador com acabamento dourado", basePrice: 2.5, unit: "unit", available: true, featured: true, order: 1 },
    { _id: "p2", name: "Prato Porcelana Branca", slug: { current: "prato-porcelana-branca" }, category: "plates", description: "Prato de porcelana branca clássica", basePrice: 1.8, unit: "unit", available: true, featured: false, order: 2 },
    { _id: "p3", name: "Prato Rústico Terracota", slug: { current: "prato-rustico-terracota" }, category: "plates", description: "Prato artesanal em terracota", basePrice: 2.2, unit: "unit", available: true, featured: false, order: 3 },
    { _id: "p4", name: "Prato Vidro Transparente", slug: { current: "prato-vidro-transparente" }, category: "plates", description: "Prato de vidro transparente moderno", basePrice: 2.0, unit: "unit", available: true, featured: false, order: 4 },
    
    // Cutlery
    { _id: "c1", name: "Talher Prata Clássico", slug: { current: "talher-prata-classico" }, category: "cutlery", description: "Conjunto de talheres em prata clássico", basePrice: 3, unit: "set", available: true, featured: true, order: 10 },
    { _id: "c2", name: "Talher Dourado", slug: { current: "talher-dourado" }, category: "cutlery", description: "Conjunto de talheres dourados elegantes", basePrice: 3.5, unit: "set", available: true, featured: false, order: 11 },
    { _id: "c3", name: "Talher Preto Mate", slug: { current: "talher-preto-mate" }, category: "cutlery", description: "Talheres modernos em preto mate", basePrice: 3.2, unit: "set", available: true, featured: false, order: 12 },
    { _id: "c4", name: "Talher Rose Gold", slug: { current: "talher-rose-gold" }, category: "cutlery", description: "Talheres em rose gold sofisticados", basePrice: 4, unit: "set", available: true, featured: false, order: 13 },
    
    // Glassware
    { _id: "g1", name: "Copo Cristal Vinho", slug: { current: "copo-cristal-vinho" }, category: "glassware", description: "Copo de cristal fino para vinho", basePrice: 1.5, unit: "unit", available: true, featured: true, order: 20 },
    { _id: "g2", name: "Flute Champanhe", slug: { current: "flute-champanhe" }, category: "glassware", description: "Flute elegante para champanhe", basePrice: 1.8, unit: "unit", available: true, featured: false, order: 21 },
    { _id: "g3", name: "Copo Água Alto", slug: { current: "copo-agua-alto" }, category: "glassware", description: "Copo alto para água mineral", basePrice: 1.2, unit: "unit", available: true, featured: false, order: 22 },
    { _id: "g4", name: "Copo Whisky", slug: { current: "copo-whisky" }, category: "glassware", description: "Copo baixo estilo old fashioned", basePrice: 1.6, unit: "unit", available: true, featured: false, order: 23 },
    { _id: "g5", name: "Copo Vidro Fumado", slug: { current: "copo-vidro-fumado" }, category: "glassware", description: "Copo de vidro fumado elegante", basePrice: 1.4, unit: "unit", available: true, featured: false, order: 24 },
    
    // Linens (napkins for visualizer)
    { _id: "l1", name: "Guardanapo Linho Branco", slug: { current: "guardanapo-linho-branco" }, category: "linens", description: "Guardanapo de linho branco clássico", basePrice: 0.8, unit: "unit", available: true, featured: true, order: 30 },
    { _id: "l2", name: "Guardanapo Linho Natural", slug: { current: "guardanapo-linho-natural" }, category: "linens", description: "Guardanapo em linho cor natural", basePrice: 0.8, unit: "unit", available: true, featured: false, order: 31 },
    { _id: "l3", name: "Guardanapo Bordeaux", slug: { current: "guardanapo-bordeaux" }, category: "linens", description: "Guardanapo em tom bordeaux elegante", basePrice: 0.9, unit: "unit", available: true, featured: false, order: 32 },
    { _id: "l4", name: "Guardanapo Verde Salvia", slug: { current: "guardanapo-verde-salvia" }, category: "linens", description: "Guardanapo em verde sálvia suave", basePrice: 0.9, unit: "unit", available: true, featured: false, order: 33 },
    { _id: "l5", name: "Toalha de Mesa Branca", slug: { current: "toalha-mesa-branca" }, category: "linens", description: "Toalha de mesa em linho branco", basePrice: 15, unit: "unit", available: true, featured: false, order: 34 },
    
    // Furniture
    { _id: "f1", name: "Cadeira Tiffany", slug: { current: "cadeira-tiffany" }, category: "furniture", description: "Cadeira clássica Tiffany transparente", basePrice: 8, unit: "unit", available: true, featured: true, order: 40 },
    { _id: "f2", name: "Mesa Rústica", slug: { current: "mesa-rustica" }, category: "furniture", description: "Mesa de madeira rústica para eventos", basePrice: 80, unit: "day", available: true, featured: true, order: 41 },
    
    // Lounge
    { _id: "lo1", name: "Sofá Lounge Branco", slug: { current: "sofa-lounge-branco" }, category: "lounge", description: "Sofá de lounge elegante em branco", basePrice: 150, unit: "day", available: true, featured: true, order: 50 },
    
    // Decoration
    { _id: "d1", name: "Vaso Decorativo", slug: { current: "vaso-decorativo" }, category: "decoration", description: "Vaso de vidro para decoração floral", basePrice: 5, unit: "unit", available: true, featured: false, order: 60 },
    { _id: "d2", name: "Castiçal Dourado", slug: { current: "castical-dourado" }, category: "decoration", description: "Castiçal elegante em dourado", basePrice: 4, unit: "unit", available: true, featured: false, order: 61 },
    { _id: "d3", name: "Centro de Mesa Floral", slug: { current: "centro-mesa-floral" }, category: "decoration", description: "Arranjo floral para centro de mesa", basePrice: 25, unit: "unit", available: true, featured: true, order: 62 },
  ];
  
  let filtered = products;
  if (options?.featured) {
    filtered = filtered.filter(p => p.featured);
  }
  if (options?.available !== undefined) {
    filtered = filtered.filter(p => p.available === options.available);
  }
  return filtered;
}
