import { SERVICES, getServiceBySlug } from "@/data/services";
import { PROPERTY_LISTINGS, getPropertyBySlug } from "@/data/propertyListings";
import { COMPANY } from "@/data/company";

export type PageMeta = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

const HOME_DESCRIPTION =
  "ARQUENO - Inmobiliaria especializada en compra y venta de casas y viviendas urbanas en Colombia. Decisiones inteligentes para construir patrimonio.";

const STATIC_PAGES: Record<string, { title: string; description: string }> = {
  "/": {
    title: "ARQUENO | Inmobiliaria de Confianza en Colombia",
    description: HOME_DESCRIPTION,
  },
  "/buscar-zona": {
    title: "Buscar inmuebles por zona | ARQUENO",
    description:
      "Elige barrios o dibuja en el mapa la zona donde quieres comprar, arrendar o invertir en Colombia y te mostramos las opciones disponibles.",
  },
  "/publicar-inmueble": {
    title: "Publica tu inmueble para vender o arrendar | ARQUENO",
    description:
      "Publica tu apartamento, casa, lote o local con ARQUENO: sube las fotos, firma la autorización y te contactamos por WhatsApp.",
  },
  "/politica-de-privacidad": {
    title: "Política de Privacidad | ARQUENO",
    description: "Cómo ARQUENO trata tus datos personales según la Ley 1581 de 2012 y cómo ejercer tus derechos.",
  },
  "/politica-de-cookies": {
    title: "Política de Cookies | ARQUENO",
    description: "Qué información guarda el sitio de ARQUENO en tu navegador y cómo eliminarla.",
  },
  "/terminos-y-condiciones": {
    title: "Términos y Condiciones | ARQUENO",
    description: "Condiciones de uso del sitio web de ARQUENO.",
  },
  "/aviso-legal": {
    title: "Aviso Legal | ARQUENO",
    description: "Información legal del responsable del sitio web de ARQUENO.",
  },
};

function trimDescription(text: string, max = 160) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

export function getPageMeta(pathname: string): PageMeta {
  const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

  const known = STATIC_PAGES[path];
  if (known) return { ...known, path };

  const serviceMatch = path.match(/^\/servicio\/([^/]+)$/);
  const service = serviceMatch ? getServiceBySlug(serviceMatch[1]) : undefined;
  if (service) {
    return {
      title: `${service.title} | ARQUENO`,
      description: trimDescription(`${service.tagline}. ${service.description}`),
      path,
    };
  }

  const propertyMatch = path.match(/^\/propiedad\/([^/]+)$/);
  const property = propertyMatch ? getPropertyBySlug(propertyMatch[1]) : undefined;
  if (property) {
    return {
      title: `${property.title} | ARQUENO`,
      description: trimDescription(`${property.type} en ${property.location}. ${property.description}`),
      path,
    };
  }

  return { title: "Página no encontrada | ARQUENO", description: HOME_DESCRIPTION, path, noindex: true };
}

export function absoluteUrl(path: string) {
  return `${COMPANY.siteUrl}${path}`;
}

/** Páginas que deben aparecer en buscadores (mapa del sitio y HTML pregenerado) */
export function getIndexablePaths(): string[] {
  return [
    ...Object.keys(STATIC_PAGES),
    ...SERVICES.map((s) => `/servicio/${s.slug}`),
    ...PROPERTY_LISTINGS.map((p) => `/propiedad/${p.slug}`),
  ];
}
