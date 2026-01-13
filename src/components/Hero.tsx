import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Home, MapPin } from "lucide-react";
import heroBg from "@/assets/hero-home-bg.jpg";
const Hero = () => {
  const navigate = useNavigate();
  const [operationType, setOperationType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [city, setCity] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const handleSearch = () => {
    // Build search params
    const params = new URLSearchParams();
    if (operationType) params.set("operacion", operationType);
    if (propertyType) params.set("tipo", propertyType);
    if (city) params.set("ciudad", city);
    if (priceRange) params.set("precio", priceRange);

    // Navigate to map search page
    navigate(`/buscar-zona?${params.toString()}`);
  };
  return <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroBg})`
    }} />
      
      {/* Warm Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      
      {/* Subtle warm tint overlay */}
      <div className="absolute inset-0 bg-gold/5" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
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
          <p className="font-body text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-12 opacity-0 animate-fade-up delay-200">
            Decisiones inteligentes para construir patrimonio. 
            Te acompañamos en cada paso hacia tu vivienda ideal.
          </p>

          {/* Search Bar */}
          <div className="opacity-0 animate-fade-up delay-300">
            <div className="bg-background/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-elevated p-4 sm:p-6 max-w-4xl mx-auto border border-border/50">
              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-5 gap-3 items-end">
                {/* Tipo de Operación */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1">¿QUE BUSCAS?​<Home className="w-3 h-3" />
                    ​
                  </label>
                  <Select value={operationType} onValueChange={setOperationType}>
                    <SelectTrigger className="h-12 bg-secondary/50 border-border/50 hover:bg-secondary transition-colors">
                      <SelectValue placeholder="¿Qué buscas?" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="comprar">Comprar</SelectItem>
                      <SelectItem value="arrendar">Arrendar</SelectItem>
                      <SelectItem value="invertir">Invertir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tipo de Inmueble */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Inmueble
                  </label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="h-12 bg-secondary/50 border-border/50 hover:bg-secondary transition-colors">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="apartamento">Apartamento</SelectItem>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="lote">Lote</SelectItem>
                      <SelectItem value="proyecto">Proyecto nuevo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Ciudad o Zona */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Ubicación
                  </label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="h-12 bg-secondary/50 border-border/50 hover:bg-secondary transition-colors">
                      <SelectValue placeholder="Ciudad" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="bogota">Bogotá</SelectItem>
                      <SelectItem value="medellin">Medellín</SelectItem>
                      <SelectItem value="cali">Cali</SelectItem>
                      <SelectItem value="barranquilla">Barranquilla</SelectItem>
                      <SelectItem value="cartagena">Cartagena</SelectItem>
                      <SelectItem value="bucaramanga">Bucaramanga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rango de Precio */}
                

                {/* Search Button */}
                <Button onClick={handleSearch} className="h-12 bg-gold hover:bg-gold/90 text-gold-foreground font-medium shadow-gold transition-all hover:shadow-lg">
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {/* Tipo de Operación */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Operación
                    </label>
                    <Select value={operationType} onValueChange={setOperationType}>
                      <SelectTrigger className="h-11 bg-secondary/50 border-border/50">
                        <SelectValue placeholder="¿Qué buscas?" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="comprar">Comprar</SelectItem>
                        <SelectItem value="arrendar">Arrendar</SelectItem>
                        <SelectItem value="invertir">Invertir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tipo de Inmueble */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Inmueble
                    </label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="h-11 bg-secondary/50 border-border/50">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="apartamento">Apartamento</SelectItem>
                        <SelectItem value="casa">Casa</SelectItem>
                        <SelectItem value="lote">Lote</SelectItem>
                        <SelectItem value="proyecto">Proyecto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Ciudad */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Ciudad
                    </label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger className="h-11 bg-secondary/50 border-border/50">
                        <SelectValue placeholder="Ubicación" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="bogota">Bogotá</SelectItem>
                        <SelectItem value="medellin">Medellín</SelectItem>
                        <SelectItem value="cali">Cali</SelectItem>
                        <SelectItem value="barranquilla">Barranquilla</SelectItem>
                        <SelectItem value="cartagena">Cartagena</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Precio */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Precio
                    </label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger className="h-11 bg-secondary/50 border-border/50">
                        <SelectValue placeholder="Rango" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="0-100">Hasta $100M</SelectItem>
                        <SelectItem value="100-200">$100M - $200M</SelectItem>
                        <SelectItem value="200-400">$200M - $400M</SelectItem>
                        <SelectItem value="400-700">$400M - $700M</SelectItem>
                        <SelectItem value="700+">+$700M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Search Button - Full Width */}
                <Button onClick={handleSearch} className="w-full h-12 bg-gold hover:bg-gold/90 text-gold-foreground font-semibold shadow-gold transition-all hover:shadow-lg mt-2">
                  <Search className="w-5 h-5 mr-2" />
                  Buscar mi hogar
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-8 sm:mt-10 text-center">
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
    </section>;
};
export default Hero;