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
  /** Opcional: si no se conoce, no se muestra */
  area?: number;
  /** Enlace al recorrido virtual 360° (página estática en /recorrido/...) */
  tourUrl?: string;
  /** Enlace a Google Maps */
  mapUrl?: string;
  type: string;
  featured: boolean;
  imageFit: "contain" | "cover";
  description: string;
  highlights: string[];
};

const BELLA_VISTA = "/recorrido/apartamento-bella-vista";

export const PROPERTY_LISTINGS: PropertyListing[] = [
  {
    id: "apartamento-bella-vista",
    slug: "apartamento-bella-vista",
    coverImage: `${BELLA_VISTA}/portada.jpg`,
    gallery: [
      `${BELLA_VISTA}/portada.jpg`,
      `${BELLA_VISTA}/fotos/sala-cocina.jpg`,
      `${BELLA_VISTA}/fotos/cocina.jpg`,
      `${BELLA_VISTA}/fotos/comedor.jpg`,
      `${BELLA_VISTA}/fotos/habitacion.jpg`,
      `${BELLA_VISTA}/fotos/terraza.jpg`,
      `${BELLA_VISTA}/fotos/vista.jpg`,
    ],
    galleryLabels: [
      "Fachada del Edificio Bella Vista",
      "Cocina abierta y ventanal",
      "Cocina",
      "Comedor con vista",
      "Habitación con clósets",
      "Zona social en la terraza",
      "Vista desde el edificio",
    ],
    title: "Apartamento Bella Vista",
    location: "Cumbal, Nariño",
    price: "$210.000.000",
    beds: 3,
    baths: 1,
    type: "Apartamento en venta",
    featured: true,
    imageFit: "cover",
    description:
      "Ubicado en el cuarto piso, cuenta con excelente iluminación y muy buena ubicación. Recórrelo completo en 360° desde tu celular.",
    highlights: [
      "3 habitaciones",
      "1 baño",
      "Sala-comedor",
      "Zona social compartida en la terraza",
      "Zona de lavandería privada",
    ],
    tourUrl: BELLA_VISTA,
    mapUrl: "https://maps.app.goo.gl/AWuzWQJRGMckTDNu6",
  },
];

export function getPropertyBySlug(slug: string): PropertyListing | undefined {
  return PROPERTY_LISTINGS.find((p) => p.slug === slug);
}
