import colombiaRaw from "./colombia-raw.json";

type RawDept = { id: number; departamento: string; ciudades: string[] };

/** Centro aproximado del departamento (mapa cuando no hay override por municipio) */
const DEPT_CENTERS: Record<string, { lat: number; lng: number }> = {
  Amazonas: { lat: -4.2153, lng: -69.9408 },
  Antioquia: { lat: 6.2442, lng: -75.5812 },
  Arauca: { lat: 7.0903, lng: -70.7616 },
  Atlántico: { lat: 10.9685, lng: -74.7813 },
  Bolívar: { lat: 10.391, lng: -75.4794 },
  Boyacá: { lat: 5.5353, lng: -73.3678 },
  Caldas: { lat: 5.07, lng: -75.5138 },
  Caquetá: { lat: 1.6144, lng: -75.6062 },
  Casanare: { lat: 5.3357, lng: -72.3906 },
  Cauca: { lat: 2.4448, lng: -76.6147 },
  Cesar: { lat: 10.4631, lng: -73.2532 },
  Chocó: { lat: 5.6919, lng: -76.6583 },
  Cundinamarca: { lat: 4.711, lng: -74.0721 },
  Córdoba: { lat: 8.748, lng: -75.8814 },
  Guainía: { lat: 3.8653, lng: -67.9239 },
  Guaviare: { lat: 2.5667, lng: -72.6386 },
  Huila: { lat: 2.9345, lng: -75.2809 },
  "La Guajira": { lat: 11.5444, lng: -72.9073 },
  Magdalena: { lat: 11.2408, lng: -74.199 },
  Meta: { lat: 4.142, lng: -73.6266 },
  Nariño: { lat: 1.2088, lng: -77.2797 },
  "Norte de Santander": { lat: 7.8942, lng: -72.5039 },
  Putumayo: { lat: 1.1528, lng: -76.6478 },
  Quindío: { lat: 4.5361, lng: -75.6711 },
  Risaralda: { lat: 4.8087, lng: -75.6906 },
  "San Andrés y Providencia": { lat: 12.5847, lng: -81.7006 },
  Santander: { lat: 7.1254, lng: -73.1198 },
  Sucre: { lat: 9.3047, lng: -75.3978 },
  Tolima: { lat: 4.4389, lng: -75.2322 },
  "Valle del Cauca": { lat: 3.4516, lng: -76.532 },
  Vaupés: { lat: 1.2578, lng: -70.235 },
  Vichada: { lat: 6.189, lng: -67.4859 },
};

/** Coordenadas exactas para ciudades principales (slug municipio-departamento) */
const SLUG_COORD_OVERRIDES: Record<string, { lat: number; lng: number; zoom: number }> = {
  "bogota-cundinamarca": { lat: 4.711, lng: -74.0721, zoom: 12 },
  "medellin-antioquia": { lat: 6.2442, lng: -75.5812, zoom: 13 },
  "cali-valle-del-cauca": { lat: 3.4516, lng: -76.532, zoom: 13 },
  "barranquilla-atlantico": { lat: 10.9685, lng: -74.7813, zoom: 13 },
  "cartagena-de-indias-bolivar": { lat: 10.391, lng: -75.4794, zoom: 13 },
  "bucaramanga-santander": { lat: 7.1254, lng: -73.1198, zoom: 13 },
};

/** Slug de municipio → clave de zonas demo en MapSearch (solo 6 ciudades) */
export const ZONES_SLUG_TO_LEGACY_KEY: Record<string, string> = {
  "bogota-cundinamarca": "bogota",
  "medellin-antioquia": "medellin",
  "cali-valle-del-cauca": "cali",
  "barranquilla-atlantico": "barranquilla",
  "cartagena-de-indias-bolivar": "cartagena",
  "bucaramanga-santander": "bucaramanga",
};

const LEGACY_CITY_KEYS = ["bogota", "medellin", "cali", "barranquilla", "cartagena", "bucaramanga"] as const;

export const LEGACY_CITY_LABELS: Record<(typeof LEGACY_CITY_KEYS)[number], string> = {
  bogota: "Bogotá",
  medellin: "Medellín",
  cali: "Cali",
  barranquilla: "Barranquilla",
  cartagena: "Cartagena",
  bucaramanga: "Bucaramanga",
};

export const LEGACY_CITY_COORDINATES: Record<
  (typeof LEGACY_CITY_KEYS)[number],
  { lat: number; lng: number; zoom: number }
> = {
  bogota: { lat: 4.711, lng: -74.0721, zoom: 12 },
  medellin: { lat: 6.2442, lng: -75.5812, zoom: 13 },
  cali: { lat: 3.4516, lng: -76.532, zoom: 13 },
  barranquilla: { lat: 10.9685, lng: -74.7813, zoom: 13 },
  cartagena: { lat: 10.391, lng: -75.4794, zoom: 13 },
  bucaramanga: { lat: 7.1254, lng: -73.1198, zoom: 13 },
};

export type ColombiaPlace = {
  slug: string;
  name: string;
  department: string;
  label: string;
  lat: number;
  lng: number;
  zoom: number;
};

export function normalizeForSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeForSearch(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

function buildPlaces(): ColombiaPlace[] {
  const raw = colombiaRaw as RawDept[];
  const list: ColombiaPlace[] = [];
  const seenSlugs = new Set<string>();

  for (const row of raw) {
    const dept = row.departamento;
    const center = DEPT_CENTERS[dept];
    if (!center) continue;

    for (const city of row.ciudades) {
      const slug = `${normalizeForSlug(city)}-${normalizeForSlug(dept)}`;
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);

      const override = SLUG_COORD_OVERRIDES[slug];
      list.push({
        slug,
        name: city,
        department: dept,
        label: `${city}, ${dept}`,
        lat: override?.lat ?? center.lat,
        lng: override?.lng ?? center.lng,
        zoom: override?.zoom ?? 12,
      });
    }
  }

  return list.sort((a, b) => a.label.localeCompare(b.label, "es"));
}

export const COLOMBIA_PLACES: ColombiaPlace[] = buildPlaces();

const BY_SLUG = new Map(COLOMBIA_PLACES.map((p) => [p.slug, p]));

export function getColombiaPlaceBySlug(slug: string): ColombiaPlace | undefined {
  return BY_SLUG.get(slug);
}

export function searchColombiaPlaces(query: string, limit = 100): ColombiaPlace[] {
  const q = normalizeForSearch(query.trim());
  if (!q) return COLOMBIA_PLACES.slice(0, limit);

  const scored: { place: ColombiaPlace; idx: number }[] = [];
  for (const place of COLOMBIA_PLACES) {
    const nameN = normalizeForSearch(place.name);
    const deptN = normalizeForSearch(place.department);
    const labelN = normalizeForSearch(place.label);
    if (labelN.includes(q) || nameN.startsWith(q) || deptN.includes(q)) {
      let idx = labelN.indexOf(q);
      if (idx === -1) idx = nameN.indexOf(q) >= 0 ? nameN.indexOf(q) : 999;
      scored.push({ place, idx: idx === -1 ? 500 : idx });
    }
  }

  scored.sort((a, b) => a.idx - b.idx || a.place.label.localeCompare(b.place.label, "es"));
  return scored.slice(0, limit).map((s) => s.place);
}

export type ResolvedMapCity = {
  slug: string;
  label: string;
  lat: number;
  lng: number;
  zoom: number;
  /** Clave en CITY_ZONES del mapa, o null si solo hay centro en municipio */
  zonesLegacyKey: string | null;
};

export function formatCityChoiceLabel(slug: string): string {
  if (!slug) return "";
  if (slug in LEGACY_CITY_LABELS) {
    return LEGACY_CITY_LABELS[slug as keyof typeof LEGACY_CITY_LABELS];
  }
  return getColombiaPlaceBySlug(slug)?.label ?? slug;
}

export function resolveMapSearchCity(ciudadParam: string | null | undefined): ResolvedMapCity {
  const param = (ciudadParam || "bogota").toLowerCase().trim();

  if (LEGACY_CITY_KEYS.includes(param as (typeof LEGACY_CITY_KEYS)[number])) {
    const key = param as (typeof LEGACY_CITY_KEYS)[number];
    const c = LEGACY_CITY_COORDINATES[key];
    return {
      slug: key,
      label: LEGACY_CITY_LABELS[key],
      lat: c.lat,
      lng: c.lng,
      zoom: c.zoom,
      zonesLegacyKey: key,
    };
  }

  const place = getColombiaPlaceBySlug(param);
  if (place) {
    const zonesLegacyKey = ZONES_SLUG_TO_LEGACY_KEY[place.slug] ?? null;
    return {
      slug: place.slug,
      label: place.label,
      lat: place.lat,
      lng: place.lng,
      zoom: place.zoom,
      zonesLegacyKey,
    };
  }

  const c = LEGACY_CITY_COORDINATES.bogota;
  return {
    slug: "bogota",
    label: LEGACY_CITY_LABELS.bogota,
    lat: c.lat,
    lng: c.lng,
    zoom: c.zoom,
    zonesLegacyKey: "bogota",
  };
}
