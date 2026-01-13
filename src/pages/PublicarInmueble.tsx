import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Building2, MapPin, DollarSign, FileText, Phone, Mail, User } from "lucide-react";
import { useState } from "react";

const PublicarInmueble = () => {
  const [searchParams] = useSearchParams();
  
  // Pre-fill from URL params
  const initialOperationType = searchParams.get("operacion") || "";
  const initialPropertyType = searchParams.get("tipo") || "";
  const initialCity = searchParams.get("ciudad") || "";

  const [formData, setFormData] = useState({
    operationType: initialOperationType,
    propertyType: initialPropertyType,
    city: initialCity,
    address: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log("Form submitted:", formData);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const propertyTypeLabels: Record<string, string> = {
    apartamento: "Apartamento",
    casa: "Casa",
    lote: "Lote",
    proyecto: "Proyecto inmobiliario",
    local: "Local comercial",
    oficina: "Oficina",
    bodega: "Bodega",
    finca: "Finca / Casa campestre",
  };

  const cityLabels: Record<string, string> = {
    bogota: "Bogotá",
    medellin: "Medellín",
    cali: "Cali",
    barranquilla: "Barranquilla",
    cartagena: "Cartagena",
    bucaramanga: "Bucaramanga",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display text-xl font-medium text-foreground">Publicar Inmueble</h1>
            <p className="text-sm text-muted-foreground">Completa los datos de tu propiedad</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Property Details Section */}
          <section className="bg-card rounded-2xl border border-border p-6 space-y-6">
            <div className="flex items-center gap-2 text-foreground">
              <Building2 className="w-5 h-5 text-gold" />
              <h2 className="font-display text-lg font-medium">Detalles del Inmueble</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tipo de operación */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tipo de operación</label>
                <Select value={formData.operationType} onValueChange={(v) => updateField("operationType", v)}>
                  <SelectTrigger className="h-12 bg-secondary/40 border-border/40 rounded-xl">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50 rounded-xl">
                    <SelectItem value="vender">Vender</SelectItem>
                    <SelectItem value="arrendar">Arrendar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tipo de inmueble */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tipo de inmueble</label>
                <Select value={formData.propertyType} onValueChange={(v) => updateField("propertyType", v)}>
                  <SelectTrigger className="h-12 bg-secondary/40 border-border/40 rounded-xl">
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50 rounded-xl">
                    {Object.entries(propertyTypeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ciudad */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Ciudad</label>
                <Select value={formData.city} onValueChange={(v) => updateField("city", v)}>
                  <SelectTrigger className="h-12 bg-secondary/40 border-border/40 rounded-xl">
                    <SelectValue placeholder="Selecciona ciudad" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50 rounded-xl">
                    {Object.entries(cityLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dirección */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Dirección</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Dirección del inmueble"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="h-12 pl-10 bg-secondary/40 border-border/40 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Characteristics Section */}
          <section className="bg-card rounded-2xl border border-border p-6 space-y-6">
            <div className="flex items-center gap-2 text-foreground">
              <FileText className="w-5 h-5 text-gold" />
              <h2 className="font-display text-lg font-medium">Características</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Precio */}
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium text-foreground">Precio (COP)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="Ej: 350000000"
                    value={formData.price}
                    onChange={(e) => updateField("price", e.target.value)}
                    className="h-12 pl-10 bg-secondary/40 border-border/40 rounded-xl"
                  />
                </div>
              </div>

              {/* Área */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Área (m²)</label>
                <Input
                  type="number"
                  placeholder="Ej: 85"
                  value={formData.area}
                  onChange={(e) => updateField("area", e.target.value)}
                  className="h-12 bg-secondary/40 border-border/40 rounded-xl"
                />
              </div>

              {/* Habitaciones */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Habitaciones</label>
                <Select value={formData.bedrooms} onValueChange={(v) => updateField("bedrooms", v)}>
                  <SelectTrigger className="h-12 bg-secondary/40 border-border/40 rounded-xl">
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50 rounded-xl">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Baños */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Baños</label>
                <Select value={formData.bathrooms} onValueChange={(v) => updateField("bathrooms", v)}>
                  <SelectTrigger className="h-12 bg-secondary/40 border-border/40 rounded-xl">
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50 rounded-xl">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Descripción</label>
              <Textarea
                placeholder="Describe las características principales de tu inmueble..."
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="min-h-[120px] bg-secondary/40 border-border/40 rounded-xl resize-none"
              />
            </div>

            {/* Fotos */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Fotos del inmueble</label>
              <div className="border-2 border-dashed border-border/60 rounded-xl p-8 text-center hover:border-gold/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Arrastra tus fotos aquí o haz clic para seleccionar</p>
                <p className="text-xs text-muted-foreground mt-1">Máximo 10 fotos, JPG o PNG</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-card rounded-2xl border border-border p-6 space-y-6">
            <div className="flex items-center gap-2 text-foreground">
              <Phone className="w-5 h-5 text-gold" />
              <h2 className="font-display text-lg font-medium">Datos de Contacto</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Nombre */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nombre completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tu nombre"
                    value={formData.ownerName}
                    onChange={(e) => updateField("ownerName", e.target.value)}
                    className="h-12 pl-10 bg-secondary/40 border-border/40 rounded-xl"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Correo electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.ownerEmail}
                    onChange={(e) => updateField("ownerEmail", e.target.value)}
                    className="h-12 pl-10 bg-secondary/40 border-border/40 rounded-xl"
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Teléfono</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+57 300 000 0000"
                    value={formData.ownerPhone}
                    onChange={(e) => updateField("ownerPhone", e.target.value)}
                    className="h-12 pl-10 bg-secondary/40 border-border/40 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full h-14 bg-gold hover:bg-gold/90 text-gold-foreground font-semibold text-base shadow-gold transition-all hover:shadow-lg rounded-xl"
          >
            Publicar Inmueble
          </Button>
        </form>
      </main>
    </div>
  );
};

export default PublicarInmueble;
