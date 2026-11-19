import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MapPin, Bed, Bath, Square, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROPERTY_LISTINGS, type PropertyListing } from "@/data/propertyListings";
import { formatCityChoiceLabel } from "@/data/colombiaPlaces";
import { OPERATION_VERBS, PROPERTY_TYPE_LABELS, PROPERTY_TYPE_WITH_ARTICLE } from "@/data/searchOptions";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type SearchCriteria = {
  ciudad: string;
  operacion: string;
  tipo: string;
  zonas: string;
  zonaDibujada: boolean;
};

function normalize(text: string) {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

function cityName(slug: string) {
  return formatCityChoiceLabel(slug).split(",")[0].trim();
}

function matchesSearch(property: PropertyListing, criteria: SearchCriteria) {
  if (criteria.ciudad && !normalize(property.location).includes(normalize(cityName(criteria.ciudad)))) {
    return false;
  }
  if (criteria.tipo) {
    const typeWord = (PROPERTY_TYPE_LABELS[criteria.tipo] ?? criteria.tipo).split(" ")[0];
    if (!normalize(property.type).includes(normalize(typeWord))) return false;
  }
  return true;
}

function buildWhatsAppMessage(criteria: SearchCriteria) {
  const what = PROPERTY_TYPE_WITH_ARTICLE[criteria.tipo] ?? "un inmueble";
  const verb = OPERATION_VERBS[criteria.operacion];
  const where = criteria.ciudad ? ` en ${formatCityChoiceLabel(criteria.ciudad)}` : "";
  const zone = criteria.zonaDibujada
    ? " (marqué una zona en el mapa)"
    : criteria.zonas
      ? ` (barrios: ${criteria.zonas.split(",").join(", ")})`
      : "";
  return `Hola, estoy buscando ${what}${verb ? ` para ${verb}` : ""}${where}${zone}. ¿Me avisan cuando tengan opciones?`;
}

const Properties = () => {
  const [searchParams] = useSearchParams();
  // Se lee después del primer render para que coincida con el HTML pregenerado del inicio, que no trae filtros
  const [criteria, setCriteria] = useState<SearchCriteria | null>(null);

  useEffect(() => {
    const next: SearchCriteria = {
      ciudad: searchParams.get("ciudad") ?? "",
      operacion: searchParams.get("operacion") ?? "",
      tipo: searchParams.get("tipo") ?? "",
      zonas: searchParams.get("zonas") ?? "",
      zonaDibujada: searchParams.has("zona_custom"),
    };
    const hasSearch = Boolean(next.ciudad || next.operacion || next.tipo || next.zonas || next.zonaDibujada);
    setCriteria(hasSearch ? next : null);
  }, [searchParams]);

  const listings = criteria ? PROPERTY_LISTINGS.filter((p) => matchesSearch(p, criteria)) : PROPERTY_LISTINGS;
  const searchedCity = criteria?.ciudad ? cityName(criteria.ciudad) : "";

  let heading = "Nuevas oportunidades, muy pronto";
  if (criteria && listings.length > 0) {
    heading = searchedCity ? `Inmuebles en ${searchedCity}` : "Resultados de tu búsqueda";
  } else if (criteria) {
    heading = searchedCity ? `Aún no tenemos inmuebles en ${searchedCity}` : "Aún no tenemos inmuebles para tu búsqueda";
  } else if (listings.length > 0) {
    heading = "Planos e isometrías disponibles";
  }

  const changeSearchParams = new URLSearchParams();
  if (criteria?.ciudad) changeSearchParams.set("ciudad", criteria.ciudad);
  if (criteria?.operacion) changeSearchParams.set("operacion", criteria.operacion);
  if (criteria?.tipo) changeSearchParams.set("tipo", criteria.tipo);

  return (
    <section id="propiedades" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-16 gap-4">
          <div>
            <p className="text-earth font-body text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4">
              Propiedades publicadas
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-medium">
              {heading}
            </h2>
          </div>
          {criteria && PROPERTY_LISTINGS.length > 0 && (
            <Button variant="premium-outline" size="lg" className="mt-4 md:mt-0 self-start md:self-auto" asChild>
              <Link to="/#propiedades">Ver todas</Link>
            </Button>
          )}
        </div>

        {listings.length === 0 && criteria && (
          <div className="text-center border border-dashed border-border py-16 px-6">
            <p className="font-body text-muted-foreground mb-6 max-w-md mx-auto">
              Cuéntanos qué buscas y te avisamos por WhatsApp apenas tengamos opciones
              {criteria.zonaDibujada || criteria.zonas ? " en la zona que elegiste" : ""}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="whatsapp" size="lg" asChild>
                <a href={getWhatsAppUrl(buildWhatsAppMessage(criteria))} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Avísame por WhatsApp
                </a>
              </Button>
              <Button variant="premium-outline" size="lg" asChild>
                <Link to={`/buscar-zona?${changeSearchParams.toString()}`}>Cambiar búsqueda</Link>
              </Button>
            </div>
          </div>
        )}

        {listings.length === 0 && !criteria && (
          <div className="text-center border border-dashed border-border py-16 px-6">
            <p className="font-body text-muted-foreground mb-6 max-w-md mx-auto">
              Todavía no hay propiedades publicadas. ¿Tienes un inmueble para vender o arrendar?
            </p>
            <Button variant="premium" size="lg" asChild>
              <Link to="/publicar-inmueble">Publicar mi inmueble</Link>
            </Button>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {listings.map((property) => {
            const imgClass =
              property.imageFit === "contain"
                ? "w-full h-full object-contain object-center p-2 sm:p-3 group-hover:scale-[1.02] transition-transform duration-700"
                : "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700";

            const article = (
              <article className="group bg-card overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary/40">
                  <img
                    src={property.coverImage}
                    alt={property.title}
                    className={imgClass}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-body uppercase tracking-wider px-3 py-1">
                    {property.type}
                  </span>
                  {property.featured && (
                    <span className="absolute top-4 right-4 bg-gold text-gold-foreground text-xs font-body uppercase tracking-wider px-3 py-1">
                      Destacado
                    </span>
                  )}
                  {property.tourUrl && (
                    <span className="absolute bottom-4 left-4 bg-primary/90 text-primary-foreground text-xs font-body uppercase tracking-wider px-3 py-1">
                      Recorrido 360°
                    </span>
                  )}
                  <span className="absolute bottom-4 right-4 bg-background/95 text-foreground text-xs font-body uppercase tracking-wider px-3 py-1 border border-border opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver detalle
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="font-display text-2xl text-gold font-medium mb-2">{property.price}</p>

                  <h3 className="font-display text-xl text-foreground font-medium mb-2 group-hover:text-earth transition-colors">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-1 text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="font-body text-sm">{property.location}</span>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-border mt-auto">
                    <div className="flex items-center gap-1 text-foreground">
                      <Bed className="w-4 h-4 text-muted-foreground" />
                      <span className="font-body text-sm">{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1 text-foreground">
                      <Bath className="w-4 h-4 text-muted-foreground" />
                      <span className="font-body text-sm">{property.baths}</span>
                    </div>
                    {property.area ? (
                      <div className="flex items-center gap-1 text-foreground">
                        <Square className="w-4 h-4 text-muted-foreground" />
                        <span className="font-body text-sm">{property.area} m²</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );

            return (
              <Link
                key={property.id}
                to={`/propiedad/${property.slug}`}
                className="block h-full rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {article}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Properties;
