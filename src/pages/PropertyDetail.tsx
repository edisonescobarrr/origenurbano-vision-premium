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
  Rotate3d,
  MapPinned,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-earth transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a propiedades
          </Link>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {property.tourUrl ? (
              <div className="lg:col-span-7">
                <a
                  href={property.tourUrl}
                  className="group relative flex justify-center overflow-hidden bg-primary border border-border/60"
                  aria-label={`Entrar al recorrido virtual 360° de ${property.title}`}
                >
                  <img
                    src={property.coverImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-50"
                  />
                  <img
                    src={property.coverImage}
                    alt={property.galleryLabels[0] ?? property.title}
                    decoding="async"
                    className="relative w-auto max-w-full h-auto max-h-[78vh] object-contain"
                  />
                  {property.featured && (
                    <span className="absolute top-4 left-4 bg-gold text-gold-foreground text-xs font-body uppercase tracking-wider px-3 py-1">
                      Destacado
                    </span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />
                  <span className="absolute bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 whitespace-nowrap bg-gold text-gold-foreground font-body text-sm uppercase tracking-wider px-6 py-3 shadow-elevated group-hover:brightness-110 transition">
                    <Rotate3d className="w-5 h-5" />
                    Entrar al recorrido 360°
                  </span>
                </a>
              </div>
            ) : (
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-[4/3] bg-secondary/40 border border-border/60 overflow-hidden">
                  <img
                    src={mainSrc}
                    alt={mainLabel}
                    // React 18 solo reconoce el atributo en minúsculas; los tipos solo aceptan fetchPriority
                    {...{ fetchpriority: "high" }}
                    decoding="async"
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
                          loading="lazy"
                          decoding="async"
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

            )}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-earth font-body text-xs uppercase tracking-[0.2em] mb-2">
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
                {property.area ? (
                  <div className="flex items-center gap-2">
                    <Square className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-body text-xs text-muted-foreground">Área</p>
                      <p className="font-display text-lg">{property.area} m²</p>
                    </div>
                  </div>
                ) : null}
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

              {property.tourUrl ? (
                <a
                  href={property.tourUrl}
                  className="group flex items-center gap-4 border border-gold/60 bg-gold/10 hover:bg-gold/20 transition-colors p-4"
                >
                  <Rotate3d className="w-8 h-8 text-gold shrink-0" />
                  <span className="flex-1">
                    <span className="block font-display text-lg text-foreground">Recorrido virtual 360°</span>
                    <span className="block font-body text-sm text-muted-foreground">
                      Camina por cada ambiente como si estuvieras allí
                    </span>
                  </span>
                  <ChevronRight className="w-5 h-5 text-gold group-hover:translate-x-1 transition-transform" />
                </a>
              ) : null}

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
                <Button variant="premium" size="lg" className="w-full sm:w-auto" asChild>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Consultar por WhatsApp
                  </a>
                </Button>
                {property.mapUrl ? (
                  <Button variant="premium-outline" size="lg" className="w-full sm:w-auto" asChild>
                    <a href={property.mapUrl} target="_blank" rel="noopener noreferrer">
                      <MapPinned className="w-4 h-4 mr-2" />
                      Ver ubicación
                    </a>
                  </Button>
                ) : null}
                <Button variant="premium-outline" size="lg" className="w-full sm:w-auto" asChild>
                  <Link to="/#contacto">Agendar visita</Link>
                </Button>
              </div>
            </div>
          </div>

          {property.tourUrl ? (
            <section className="mt-14 sm:mt-20" aria-labelledby="recorrido-360">
              <style>{`
                @keyframes arqueno-pano { from { background-position: 0 50%; } to { background-position: -1520px 50%; } }
                .arqueno-pano { background-size: auto 760px; background-repeat: repeat-x; animation: arqueno-pano 70s linear infinite; }
                @media (prefers-reduced-motion: reduce) { .arqueno-pano { animation: none; } }
              `}</style>
              <a href={property.tourUrl} className="group relative block overflow-hidden h-[360px] sm:h-[440px] bg-primary">
                {property.tourPreview ? (
                  <div
                    className="arqueno-pano absolute inset-0"
                    style={{ backgroundImage: `url(${property.tourPreview})` }}
                    aria-hidden="true"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/40" />
                <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-white">
                  <Rotate3d className="w-12 h-12 text-gold mb-4" />
                  <p className="font-body text-xs uppercase tracking-[0.25em] text-white/80 mb-2">El sello ARQUENO</p>
                  <h2 id="recorrido-360" className="font-display text-3xl sm:text-5xl font-medium mb-3">
                    Recorre el apartamento en 360°
                  </h2>
                  <p className="font-body text-white/85 max-w-xl mb-7">
                    Camina por cada ambiente, mira en todas las direcciones y ubícate en el plano, desde tu celular o tu computador.
                  </p>
                  <span className="inline-flex items-center gap-2 bg-gold text-gold-foreground font-body text-sm uppercase tracking-wider px-8 py-3.5 group-hover:brightness-110 transition">
                    Iniciar recorrido
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>
              <div className="grid sm:grid-cols-3 gap-px bg-border border border-border">
                {[
                  ["Interior y exterior", "Desde la calle hasta la terraza, sin perder la orientación."],
                  ["Plano con tu ubicación", "Un plano te muestra dónde estás y hacia dónde miras."],
                  ["Visítalo cuando quieras", "Sin agendar ni desplazarte: ábrelo y compártelo por WhatsApp."],
                ].map(([titulo, texto]) => (
                  <div key={titulo} className="bg-background p-6">
                    <p className="font-display text-lg text-foreground mb-1">{titulo}</p>
                    <p className="font-body text-sm text-muted-foreground">{texto}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
