import { MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const Properties = () => {
  const properties = [
    {
      id: 1,
      image: property1,
      title: "Apartamento Premium El Poblado",
      location: "Medellín, Antioquia",
      price: "$850.000.000",
      beds: 3,
      baths: 2,
      area: 120,
      type: "Apartamento",
      featured: true,
    },
    {
      id: 2,
      image: property2,
      title: "Casa Moderna Cota",
      location: "Cota, Cundinamarca",
      price: "$1.200.000.000",
      beds: 4,
      baths: 3,
      area: 280,
      type: "Casa",
      featured: false,
    },
    {
      id: 3,
      image: property3,
      title: "Penthouse Vista Ciudad",
      location: "Bogotá, Cundinamarca",
      price: "$1.500.000.000",
      beds: 4,
      baths: 4,
      area: 200,
      type: "Penthouse",
      featured: true,
    },
  ];

  return (
    <section id="propiedades" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-16 gap-4">
          <div>
            <p className="text-gold font-body text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4">
              Propiedades Destacadas
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-medium">
              Encuentra tu próximo hogar
            </h2>
          </div>
          <Button variant="premium-outline" size="lg" className="mt-4 md:mt-0 group self-start md:self-auto">
            Ver Todas
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Properties Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {properties.map((property) => (
            <article
              key={property.id}
              className="group bg-card overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Type Badge */}
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-body uppercase tracking-wider px-3 py-1">
                  {property.type}
                </span>
                {property.featured && (
                  <span className="absolute top-4 right-4 bg-gold text-gold-foreground text-xs font-body uppercase tracking-wider px-3 py-1">
                    Destacado
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Price */}
                <p className="font-display text-2xl text-gold font-medium mb-2">
                  {property.price}
                </p>
                
                {/* Title */}
                <h3 className="font-display text-xl text-foreground font-medium mb-2 group-hover:text-gold transition-colors">
                  {property.title}
                </h3>
                
                {/* Location */}
                <div className="flex items-center gap-1 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="font-body text-sm">{property.location}</span>
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
