import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROPERTY_LISTINGS } from "@/data/propertyListings";

const Properties = () => {
  return (
    <section id="propiedades" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-16 gap-4">
          <div>
            <p className="text-gold font-body text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4">
              Propiedades publicadas
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-medium">
              Planos e isometrías disponibles
            </h2>
          </div>
          <Button variant="premium-outline" size="lg" className="mt-4 md:mt-0 group self-start md:self-auto">
            Ver Todas
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROPERTY_LISTINGS.map((property) => {
            const imgClass =
              property.imageFit === "contain"
                ? "w-full h-full object-contain object-center p-2 sm:p-3 group-hover:scale-[1.02] transition-transform duration-700"
                : "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700";

            const article = (
              <article className="group bg-card overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary/40">
                  <img src={property.coverImage} alt={property.title} className={imgClass} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-body uppercase tracking-wider px-3 py-1">
                    {property.type}
                  </span>
                  {property.featured && (
                    <span className="absolute top-4 right-4 bg-gold text-gold-foreground text-xs font-body uppercase tracking-wider px-3 py-1">
                      Destacado
                    </span>
                  )}
                  <span className="absolute bottom-4 right-4 bg-background/95 text-foreground text-xs font-body uppercase tracking-wider px-3 py-1 border border-border opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver detalle
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="font-display text-2xl text-gold font-medium mb-2">{property.price}</p>

                  <h3 className="font-display text-xl text-foreground font-medium mb-2 group-hover:text-gold transition-colors">
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
                    <div className="flex items-center gap-1 text-foreground">
                      <Square className="w-4 h-4 text-muted-foreground" />
                      <span className="font-body text-sm">{property.area} m²</span>
                    </div>
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
