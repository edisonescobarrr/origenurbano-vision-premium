import imgPiso1 from "@/Imagenes/vivienda-piso-1.png";
import imgPiso2 from "@/Imagenes/vivienda-piso-2.png";
import imgTerraza from "@/Imagenes/vivienda-terraza.png";
import photoCota from "@/assets/property-2.jpg";
import photoBogota from "@/assets/property-3.jpg";

export type PropertyListing = {
  id: string;
  slug: string;
  coverImage: string;
  gallery: string[];
  galleryLabels: string[];
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: number;
  type: string;
  featured: boolean;
  imageFit: "contain" | "cover";
  description: string;
  highlights: string[];
};

export const APARTAMENTO_PREMIUM_POBLADO_SLUG = "apartamento-premium-el-poblado";

export const PROPERTY_LISTINGS: PropertyListing[] = [
  {
    id: "1",
    slug: APARTAMENTO_PREMIUM_POBLADO_SLUG,
    coverImage: imgPiso1,
    gallery: [imgPiso1, imgPiso2, imgTerraza],
    galleryLabels: ["Isometría piso 1", "Isometría piso 2", "Isometría terraza"],
    title: "Apartamento Premium El Poblado",
    location: "Medellín, Antioquia",
    price: "$850.000.000",
    beds: 3,
    baths: 2,
    area: 120,
    type: "Apartamento",
    featured: true,
    imageFit: "contain",
    description:
      "Apartamento premium en El Poblado con distribución en dos niveles más terraza. Incluye planos e isometrías detalladas por piso para que visualices la vivienda tipo 1 antes de visitar. Zona de alto valor, ideal para inversión o vivienda.",
    highlights: [
      "Ubicación estratégica en El Poblado",
      "Documentación visual: piso 1, piso 2 y terraza",
      "3 habitaciones y amplias zonas sociales",
      "Proyecto con enfoque premium y acabados de categoría",
    ],
  },
  {
    id: "2",
    slug: "casa-moderna-cota",
    coverImage: photoCota,
    gallery: [photoCota],
    galleryLabels: ["Fachada principal"],
    title: "Casa Moderna Cota",
    location: "Cota, Cundinamarca",
    price: "$1.200.000.000",
    beds: 4,
    baths: 3,
    area: 280,
    type: "Casa",
    featured: false,
    imageFit: "cover",
    description:
      "Casa campestre de diseño contemporáneo en Cota, con amplios espacios, zona social independiente y buena conexión hacia Bogotá. Ideal para familia que busca tranquilidad sin alejarse de la ciudad.",
    highlights: [
      "280 m² construidos en lote privilegiado",
      "4 habitaciones y 3 baños",
      "Zonas verdes y parqueadero",
      "Excelente acceso vial a Bogotá",
    ],
  },
  {
    id: "3",
    slug: "penthouse-vista-ciudad-bogota",
    coverImage: photoBogota,
    gallery: [photoBogota],
    galleryLabels: ["Vista principal"],
    title: "Penthouse Vista Ciudad",
    location: "Bogotá, Cundinamarca",
    price: "$1.500.000.000",
    beds: 4,
    baths: 4,
    area: 200,
    type: "Penthouse",
    featured: true,
    imageFit: "cover",
    description:
      "Penthouse con vista panorámica de la ciudad, acabados de lujo y distribución en un solo nivel con terraza privada. Ubicación premium para quien valora exclusividad y luz natural.",
    highlights: [
      "Vista 360° y terraza privada",
      "4 habitaciones, la principal con vestier",
      "Cocina integrada tipo isla",
      "Edificio con amenidades de alto nivel",
    ],
  },
];

export function getPropertyBySlug(slug: string): PropertyListing | undefined {
  return PROPERTY_LISTINGS.find((p) => p.slug === slug);
}
