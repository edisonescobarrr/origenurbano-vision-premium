import { useRef, useState } from "react";
import { useStickyProgress, clamp01, easeOut } from "@/hooks/useStickyProgress";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CitySearchCombobox } from "@/components/CitySearchCombobox";
import { Search, Building2, MapPin, Sparkles, ExternalLink } from "lucide-react";
import heroBg from "@/assets/hero-home-bg.webp";

const Hero = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Cambio de ambiente: la foto crece dentro de un círculo hasta llenar la pantalla,
  // el mensaje grande se aleja y aparece el buscador.
  useStickyProgress(sectionRef, (p) => {
    const grow = easeOut(clamp01(p / 0.6));
    if (photoRef.current) photoRef.current.style.clipPath = `circle(${(9 + 81 * grow).toFixed(2)}vmax at 50% 62%)`;
    if (headRef.current) {
      const h = clamp01(p / 0.42);
      headRef.current.style.opacity = String(1 - h);
      headRef.current.style.transform = `translate3d(0, ${(-h * 90).toFixed(1)}px, 0) scale(${(1 + h * 0.25).toFixed(3)})`;
      headRef.current.style.visibility = h >= 1 ? "hidden" : "visible";
    }
    if (searchRef.current) {
      const v = easeOut(clamp01((p - 0.45) / 0.35));
      searchRef.current.style.opacity = String(v);
      searchRef.current.style.transform = `translate3d(0, ${((1 - v) * 50).toFixed(1)}px, 0)`;
      searchRef.current.style.pointerEvents = v > 0.4 ? "auto" : "none";
      searchRef.current.style.visibility = v <= 0 ? "hidden" : "visible";
    }
  });
  const [operationType, setOperationType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [city, setCity] = useState("");

  // Define which operations are for property seekers vs property owners
  const isOwnerAction = operationType === "vender";
  const isSeekerAction = ["comprar", "alquilar", "arrendar"].includes(operationType);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (operationType) params.set("operacion", operationType);
    if (propertyType) params.set("tipo", propertyType);
    if (city) params.set("ciudad", city);

    // Conditional redirection based on user intent
    if (isOwnerAction) {
      // Owner wants to sell or rent out their property → property submission page
      window.open(`/publicar-inmueble?${params.toString()}`, "_blank");
    } else {
      // Seeker wants to buy or rent → map-based search
      navigate(`/buscar-zona?${params.toString()}`);
    }
  };

  // Dynamic button text based on selection
  const getButtonText = () => {
    if (isOwnerAction) return "Publicar mi inmueble";
    return "Buscar propiedades";
  };

  const getButtonIcon = () => {
    if (isOwnerAction) return <ExternalLink className="w-5 h-5 mr-2" />;
    return <Search className="w-5 h-5 mr-2" />;
  };

  return (
    <section id="inicio" ref={sectionRef} className="relative h-[210vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Foto dentro del círculo que crece */}
        <div ref={photoRef} className="absolute inset-0" style={{ clipPath: "circle(9vmax at 50% 62%)" }}>
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroBg})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/85" />
          <div className="absolute inset-0 bg-gold/5" />
        </div>

        {/* Mensaje grande de entrada */}
        <div ref={headRef} className="absolute inset-x-0 top-[13vh] sm:top-[14vh] z-10 px-4 text-center pointer-events-none">
          <p className="text-earth font-body text-xs sm:text-sm uppercase tracking-[0.35em] mb-5 opacity-0 animate-fade-up">
            ARQUENO · Inmobiliaria en Colombia
          </p>
          <h1 className="font-display font-light text-foreground leading-[0.88] tracking-[-0.04em] text-[clamp(64px,15vw,220px)]">
            <span className="block overflow-hidden"><span className="block opacity-0 animate-fade-up delay-100">Encuentra</span></span>
            <span className="block overflow-hidden"><span className="block italic text-gold opacity-0 animate-fade-up delay-200">tu hogar</span></span>
          </h1>
        </div>

        {/* Buscador que aparece al bajar */}
        <div
          ref={searchRef}
          className="hero-search absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
        >
          <div className="max-w-4xl mx-auto text-center w-full">
            <p className="text-earth font-body text-sm uppercase tracking-[0.3em] mb-4">Tu hogar comienza aquí</p>
            <h2 className="font-display text-3xl/[1.1] sm:text-5xl/[1.1] text-foreground font-medium mb-4">
              ¿Qué estás <span className="text-gradient-gold">buscando</span>?
            </h2>
            <p className="font-body text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10">
              Decisiones inteligentes para construir patrimonio. Te acompañamos en cada paso hacia tu vivienda ideal.
            </p>

          {/* Premium Search Card */}
          <div>
            <div className="bg-card/98 backdrop-blur-xl shadow-elevated p-6 sm:p-8 max-w-3xl mx-auto border border-border/30">

              {/* Desktop Layout */}
              <div className="hidden md:block">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {/* ¿Qué quieres hacer? */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      ¿Qué quieres hacer?
                    </label>
                    <Select value={operationType} onValueChange={setOperationType}>
                      <SelectTrigger aria-label="¿Qué quieres hacer?" className="h-14 bg-secondary/40 border-border/40 hover:bg-secondary/60 hover:border-gold/30 transition-all text-base">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50 border-border/50">
                        <SelectItem value="comprar" className="py-3 text-base">Comprar</SelectItem>
                        <SelectItem value="alquilar" className="py-3 text-base">Alquilar</SelectItem>
                        <SelectItem value="arrendar" className="py-3 text-base">Arrendar</SelectItem>
                        <SelectItem value="vender" className="py-3 text-base">Vender</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tipo de Inmueble */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-gold" />
                      Tipo de inmueble
                    </label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger aria-label="Tipo de inmueble" className="h-14 bg-secondary/40 border-border/40 hover:bg-secondary/60 hover:border-gold/30 transition-all text-base">
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50 border-border/50">
                        <SelectItem value="apartamento" className="py-3 text-base">Apartamento</SelectItem>
                        <SelectItem value="casa" className="py-3 text-base">Casa</SelectItem>
                        <SelectItem value="lote" className="py-3 text-base">Lote</SelectItem>
                        <SelectItem value="proyecto" className="py-3 text-base">Proyecto inmobiliario</SelectItem>
                        <SelectItem value="local" className="py-3 text-base">Local comercial</SelectItem>
                        <SelectItem value="oficina" className="py-3 text-base">Oficina</SelectItem>
                        <SelectItem value="bodega" className="py-3 text-base">Bodega</SelectItem>
                        <SelectItem value="finca" className="py-3 text-base">Finca / Casa campestre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Ciudad / municipio */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      Ciudad o municipio
                    </label>
                    <CitySearchCombobox
                      value={city}
                      onValueChange={setCity}
                      placeholder="Escribe para buscar en Colombia…"
                      ariaLabel="Ciudad o municipio"
                    />
                  </div>
                </div>

                {/* Action Button - Full width */}
                <Button
                  onClick={handleSearch}
                  className={`w-full h-14 font-semibold text-base shadow-gold transition-all hover:shadow-lg hover:scale-[1.01] ${
                    isOwnerAction
                      ? "bg-earth hover:bg-earth/90 text-earth-foreground"
                      : "bg-gold hover:bg-gold/90 text-gold-foreground"
                  }`}
                >
                  {getButtonIcon()}
                  {getButtonText()}
                </Button>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden space-y-4">
                {/* ¿Qué quieres hacer? */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    ¿Qué quieres hacer?
                  </label>
                  <Select value={operationType} onValueChange={setOperationType}>
                    <SelectTrigger aria-label="¿Qué quieres hacer?" className="h-12 bg-secondary/40 border-border/40">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="comprar">Comprar</SelectItem>
                      <SelectItem value="alquilar">Alquilar</SelectItem>
                      <SelectItem value="arrendar">Arrendar</SelectItem>
                      <SelectItem value="vender">Vender</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tipo de Inmueble */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-gold" />
                    Tipo de inmueble
                  </label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger aria-label="Tipo de inmueble" className="h-12 bg-secondary/40 border-border/40">
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="apartamento">Apartamento</SelectItem>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="lote">Lote</SelectItem>
                      <SelectItem value="proyecto">Proyecto inmobiliario</SelectItem>
                      <SelectItem value="local">Local comercial</SelectItem>
                      <SelectItem value="oficina">Oficina</SelectItem>
                      <SelectItem value="bodega">Bodega</SelectItem>
                      <SelectItem value="finca">Finca / Casa campestre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Ciudad / municipio */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    Ciudad o municipio
                  </label>
                  <CitySearchCombobox
                    value={city}
                    onValueChange={setCity}
                    placeholder="Buscar en Colombia…"
                    triggerClassName="h-12 text-sm"
                    ariaLabel="Ciudad o municipio"
                  />
                </div>

                {/* Action Button */}
                <Button
                  onClick={handleSearch}
                  className={`w-full h-12 font-semibold shadow-gold transition-all hover:shadow-lg mt-2 ${
                    isOwnerAction
                      ? "bg-earth hover:bg-earth/90 text-earth-foreground"
                      : "bg-gold hover:bg-gold/90 text-gold-foreground"
                  }`}
                >
                  {getButtonIcon()}
                  {getButtonText()}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Indicador para bajar */}
        <div className="absolute bottom-6 sm:bottom-8 inset-x-0 z-10 text-center pointer-events-none" data-hero-fade>
          <p className="font-body text-[11px] uppercase tracking-[0.3em] text-foreground/60 mb-3">Desliza</p>
          <div className="w-6 h-10 border-2 border-foreground/25 rounded-full flex justify-center mx-auto">
            <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;