import { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  ChevronRight,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Button } from "@/components/ui/button";
import { getPropertyBySlug } from "@/data/propertyListings";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const PropertyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const property = slug ? getPropertyBySlug(slug) : undefined;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [slug]);

  const mainSrc = property?.gallery[activeIndex] ?? "";
  const mainLabel = property?.galleryLabels[activeIndex] ?? "";

  const waUrl = useMemo(() => {
    if (!property) return getWhatsAppUrl();
    return getWhatsAppUrl(
      `Hola, me interesa conocer más: ${property.title} (${property.location}).`,
    );
  }, [property]);

  if (!slug || !property) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 pt-24 sm:pt-28">
        <div className="container mx-auto px-4 sm:px-6">
          <nav
            className="font-body text-sm text-muted-foreground mb-6 flex flex-wrap items-center gap-1"
            aria-label="Migas de pan"
          >
            <Link to="/" className="hover:text-foreground transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0 opacity-60" />
            <Link to="/#propiedades" className="hover:text-foreground transition-colors">
              Propiedades
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0 opacity-60" />
            <span className="text-foreground line-clamp-1">{property.title}</span>
          </nav>

          <Link
            to="/#propiedades"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a propiedades
          </Link>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/3] bg-secondary/40 border border-border/60 overflow-hidden">
                <img
                  src={mainSrc}
                  alt={mainLabel}
                  className={
                    property.imageFit === "cover"
                      ? "w-full h-full object-cover object-center"
                      : "w-full h-full object-contain object-center p-2 sm:p-4"
                  }
                />
                {property.featured && (
                  <span className="absolute top-4 left-4 bg-gold text-gold-foreground text-xs font-body uppercase tracking-wider px-3 py-1">
                    Destacado
                  </span>
                )}
                <span className="absolute bottom-4 left-4 bg-primary/90 text-primary-foreground text-xs font-body px-3 py-1">
                  {mainLabel}
                </span>
              </div>

              {property.gallery.length > 1 && (
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {property.gallery.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      className={`relative shrink-0 w-24 h-20 sm:w-28 sm:h-24 border-2 overflow-hidden bg-secondary/30 transition-all ${
                        i === activeIndex
                          ? "border-gold ring-2 ring-gold/30"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={src}
                        alt=""
                        className={
                          property.imageFit === "cover"
                            ? "w-full h-full object-cover object-center"
                            : "w-full h-full object-contain object-center p-1"
                        }
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-gold font-body text-xs uppercase tracking-[0.2em] mb-2">
                  {property.type}
                </p>
                <h1 className="font-display text-3xl sm:text-4xl text-foreground font-medium mb-3">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-4">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {property.location}
                </div>
                <p className="font-display text-3xl text-gold font-medium">{property.price}</p>
              </div>

              <div className="flex flex-wrap gap-6 py-4 border-y border-border">
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-body text-xs text-muted-foreground">Habitaciones</p>
                    <p className="font-display text-lg">{property.beds}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-body text-xs text-muted-foreground">Baños</p>
                    <p className="font-display text-lg">{property.baths}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-body text-xs text-muted-foreground">Área</p>
                    <p className="font-display text-lg">{property.area} m²</p>
                  </div>
                </div>
              </div>

              {property.description ? (
                <div>
                  <h2 className="font-display text-xl text-foreground mb-3">Descripción</h2>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </div>
              ) : null}

              {property.highlights.length > 0 ? (
                <div>
                  <h2 className="font-display text-xl text-foreground mb-3">Destacados</h2>
                  <ul className="space-y-2 font-body text-sm text-muted-foreground">
                    {property.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-gold mt-1">●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button variant="premium" size="lg" className="w-full sm:w-auto" asChild>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Consultar por WhatsApp
                  </a>
                </Button>
                <Button variant="premium-outline" size="lg" className="w-full sm:w-auto" asChild>
                  <Link to="/#contacto">Agendar visita</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default PropertyDetail;
