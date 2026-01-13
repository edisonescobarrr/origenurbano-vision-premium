import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Building2, MapPin, Sparkles, ExternalLink } from "lucide-react";
import heroBg from "@/assets/hero-home-bg.jpg";

const Hero = () => {
  const navigate = useNavigate();
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
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url(${heroBg})` }} 
      />
      
      {/* Warm Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/90" />
      
      {/* Subtle warm tint overlay */}
      <div className="absolute inset-0 bg-gold/5" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <p className="text-gold font-body text-sm uppercase tracking-[0.3em] mb-4 opacity-0 animate-fade-up">
            Tu hogar comienza aquí
          </p>

          {/* Main Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground font-medium leading-tight mb-4 opacity-0 animate-fade-up delay-100">
            Encuentra el{" "}
            <span className="text-gradient-gold">hogar de tus sueños</span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10 sm:mb-14 opacity-0 animate-fade-up delay-200">
            Decisiones inteligentes para construir patrimonio. 
            Te acompañamos en cada paso hacia tu vivienda ideal.
          </p>

          {/* Premium Search Card */}
          <div className="opacity-0 animate-fade-up delay-300">
            <div className="bg-card/98 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-elevated p-6 sm:p-8 max-w-3xl mx-auto border border-border/30">
              
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
                      <SelectTrigger className="h-14 bg-secondary/40 border-border/40 hover:bg-secondary/60 hover:border-gold/30 transition-all text-base rounded-xl">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50 rounded-xl border-border/50">
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
                      <SelectTrigger className="h-14 bg-secondary/40 border-border/40 hover:bg-secondary/60 hover:border-gold/30 transition-all text-base rounded-xl">
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50 rounded-xl border-border/50">
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

                  {/* Ciudad */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      Ciudad
                    </label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger className="h-14 bg-secondary/40 border-border/40 hover:bg-secondary/60 hover:border-gold/30 transition-all text-base rounded-xl">
                        <SelectValue placeholder="¿Dónde buscas?" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50 rounded-xl border-border/50">
                        <SelectItem value="bogota" className="py-3 text-base">Bogotá</SelectItem>
                        <SelectItem value="medellin" className="py-3 text-base">Medellín</SelectItem>
                        <SelectItem value="cali" className="py-3 text-base">Cali</SelectItem>
                        <SelectItem value="barranquilla" className="py-3 text-base">Barranquilla</SelectItem>
                        <SelectItem value="cartagena" className="py-3 text-base">Cartagena</SelectItem>
                        <SelectItem value="bucaramanga" className="py-3 text-base">Bucaramanga</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Action Button - Full width */}
                <Button 
                  onClick={handleSearch} 
                  className={`w-full h-14 font-semibold text-base shadow-gold transition-all hover:shadow-lg hover:scale-[1.01] rounded-xl ${
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
                    <SelectTrigger className="h-12 bg-secondary/40 border-border/40 rounded-xl">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50 rounded-xl">
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
                    <SelectTrigger className="h-12 bg-secondary/40 border-border/40 rounded-xl">
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50 rounded-xl">
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

                {/* Ciudad */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    Ciudad
                  </label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="h-12 bg-secondary/40 border-border/40 rounded-xl">
                      <SelectValue placeholder="¿Dónde buscas?" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50 rounded-xl">
                      <SelectItem value="bogota">Bogotá</SelectItem>
                      <SelectItem value="medellin">Medellín</SelectItem>
                      <SelectItem value="cali">Cali</SelectItem>
                      <SelectItem value="barranquilla">Barranquilla</SelectItem>
                      <SelectItem value="cartagena">Cartagena</SelectItem>
                      <SelectItem value="bucaramanga">Bucaramanga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Button */}
                <Button 
                  onClick={handleSearch} 
                  className={`w-full h-12 font-semibold shadow-gold transition-all hover:shadow-lg rounded-xl mt-2 ${
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

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-10 sm:mt-12 text-center">
              <div className="opacity-0 animate-fade-up delay-400">
                <p className="text-2xl sm:text-3xl font-display font-semibold text-foreground">500+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Propiedades</p>
              </div>
              <div className="opacity-0 animate-fade-up delay-400">
                <p className="text-2xl sm:text-3xl font-display font-semibold text-foreground">15+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Años de experiencia</p>
              </div>
              <div className="opacity-0 animate-fade-up delay-500">
                <p className="text-2xl sm:text-3xl font-display font-semibold text-foreground">2,000+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Familias felices</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-500">
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;