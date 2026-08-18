import { Home, Building2, Briefcase, TrendingUp, type LucideIcon } from "lucide-react";

export type ServiceProcessStep = {
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  process: ServiceProcessStep[];
  idealFor: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "compra-de-vivienda",
    icon: Home,
    title: "Compra de Vivienda",
    tagline: "Encuentra el hogar que se ajusta a tu vida",
    description:
      "Buscar casa no debería sentirse abrumador. Te acompañamos desde la primera conversación hasta la entrega de llaves, filtrando opciones reales para tu presupuesto y tus prioridades — no listados genéricos.",
    features: ["Análisis de necesidades", "Visitas personalizadas", "Negociación experta"],
    process: [
      {
        title: "Diagnóstico inicial",
        description:
          "Conversamos sobre tu presupuesto, zona ideal y lo que realmente necesitas — no lo que el mercado quiere venderte.",
      },
      {
        title: "Selección curada",
        description:
          "Te presentamos solo propiedades que cumplen tus criterios, con toda la información verificada de antemano.",
      },
      {
        title: "Visitas acompañadas",
        description:
          "Recorremos cada opción contigo, señalando lo que no se ve en las fotos: estado real, entorno, potencial.",
      },
      {
        title: "Negociación y cierre",
        description: "Negociamos en tu nombre y te acompañamos en toda la documentación hasta la firma.",
      },
    ],
    idealFor: [
      "Familias buscando su primera vivienda",
      "Personas relocalizándose a una nueva ciudad",
      "Quienes buscan actualizar a una vivienda más grande",
    ],
  },
  {
    slug: "venta-de-inmuebles",
    icon: Building2,
    title: "Venta de Inmuebles",
    tagline: "Vende al mejor precio, con estrategia real",
    description:
      "Vender no es solo publicar un anuncio. Diseñamos una estrategia de precio y exposición para que tu propiedad llegue a los compradores correctos, en el menor tiempo posible.",
    features: ["Valoración profesional", "Marketing digital", "Red de compradores"],
    process: [
      {
        title: "Valoración profesional",
        description: "Analizamos el mercado y tu propiedad para definir un precio competitivo y realista.",
      },
      {
        title: "Preparación y presentación",
        description:
          "Te asesoramos en cómo presentar tu inmueble para maximizar su atractivo: fotos, descripción, primera impresión.",
      },
      {
        title: "Marketing y exposición",
        description: "Publicamos en los canales correctos y activamos nuestra red de compradores e inversionistas.",
      },
      {
        title: "Gestión de ofertas y cierre",
        description: "Filtramos y negociamos ofertas por ti, y te acompañamos hasta la firma final.",
      },
    ],
    idealFor: [
      "Propietarios que quieren vender rápido y bien",
      "Herederos gestionando una propiedad",
      "Inversionistas rotando su portafolio",
    ],
  },
  {
    slug: "asesoria-inmobiliaria",
    icon: Briefcase,
    title: "Asesoría Inmobiliaria",
    tagline: "Decisiones respaldadas por datos, no por intuición",
    description:
      "Antes de comprar, vender o invertir, entender el mercado marca la diferencia. Te damos el análisis y la claridad que necesitas para decidir con confianza.",
    features: ["Análisis de mercado", "Estudios de zona", "Proyección de valorización"],
    process: [
      {
        title: "Análisis de mercado",
        description: "Revisamos tendencias, precios y comportamiento de la zona que te interesa.",
      },
      {
        title: "Estudio de zona",
        description: "Evaluamos conectividad, desarrollo urbano y proyección de crecimiento del sector.",
      },
      {
        title: "Proyección de valorización",
        description: "Te mostramos el potencial de plusvalía a corto y mediano plazo.",
      },
      {
        title: "Recomendación personalizada",
        description: "Te entregamos un informe claro con nuestra recomendación, sin tecnicismos innecesarios.",
      },
    ],
    idealFor: [
      "Quienes están evaluando varias opciones antes de decidir",
      "Inversionistas nuevos en el mercado inmobiliario",
      "Empresas buscando ubicación estratégica",
    ],
  },
  {
    slug: "inversion-urbana",
    icon: TrendingUp,
    title: "Inversión Urbana",
    tagline: "Identifica oportunidades antes que el mercado",
    description:
      "La mejor inversión inmobiliaria rara vez está en el listado público. Te conectamos con oportunidades off-market y te acompañamos en la gestión completa de tu inversión.",
    features: ["ROI proyectado", "Oportunidades off-market", "Gestión integral"],
    process: [
      {
        title: "Mapeo de oportunidades",
        description: "Identificamos propiedades con potencial antes de que lleguen al mercado abierto.",
      },
      {
        title: "Análisis de ROI",
        description: "Proyectamos el retorno esperado considerando plusvalía, arriendo y costos reales.",
      },
      {
        title: "Due diligence",
        description: "Verificamos la situación legal y financiera de cada oportunidad antes de que inviertas.",
      },
      {
        title: "Gestión integral",
        description: "Te acompañamos en la administración de la inversión, no solo en la compra.",
      },
    ],
    idealFor: [
      "Inversionistas buscando rentabilidad a largo plazo",
      "Quienes quieren diversificar su portafolio",
      "Inversionistas internacionales en el mercado colombiano",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
