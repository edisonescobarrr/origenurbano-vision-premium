import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  MapPin, 
  Home, 
  Building2, 
  Check,
  Loader2,
  ZoomIn,
  MousePointer2
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// City coordinates for Colombia
const CITY_COORDINATES: Record<string, { lat: number; lng: number; zoom: number }> = {
  bogota: { lat: 4.7110, lng: -74.0721, zoom: 12 },
  medellin: { lat: 6.2442, lng: -75.5812, zoom: 13 },
  cali: { lat: 3.4516, lng: -76.5320, zoom: 13 },
  barranquilla: { lat: 10.9685, lng: -74.7813, zoom: 13 },
  cartagena: { lat: 10.3910, lng: -75.4794, zoom: 13 },
  bucaramanga: { lat: 7.1254, lng: -73.1198, zoom: 13 },
};

// Sample neighborhoods/zones for each city
const CITY_ZONES: Record<string, Array<{ name: string; lat: number; lng: number; properties: number }>> = {
  bogota: [
    { name: "Chapinero", lat: 4.6486, lng: -74.0628, properties: 45 },
    { name: "Usaquén", lat: 4.7044, lng: -74.0311, properties: 62 },
    { name: "Suba", lat: 4.7419, lng: -74.0839, properties: 38 },
    { name: "Chicó", lat: 4.6667, lng: -74.0500, properties: 28 },
    { name: "Cedritos", lat: 4.7167, lng: -74.0500, properties: 33 },
    { name: "La Candelaria", lat: 4.5964, lng: -74.0739, properties: 15 },
  ],
  medellin: [
    { name: "El Poblado", lat: 6.2086, lng: -75.5659, properties: 55 },
    { name: "Laureles", lat: 6.2447, lng: -75.5916, properties: 42 },
    { name: "Envigado", lat: 6.1711, lng: -75.5858, properties: 35 },
    { name: "Belén", lat: 6.2314, lng: -75.6047, properties: 28 },
    { name: "Sabaneta", lat: 6.1514, lng: -75.6167, properties: 22 },
  ],
  cali: [
    { name: "Ciudad Jardín", lat: 3.3731, lng: -76.5225, properties: 30 },
    { name: "Granada", lat: 3.4458, lng: -76.5428, properties: 25 },
    { name: "San Fernando", lat: 3.4306, lng: -76.5411, properties: 22 },
    { name: "El Peñón", lat: 3.4539, lng: -76.5406, properties: 18 },
  ],
  barranquilla: [
    { name: "El Prado", lat: 10.9878, lng: -74.7956, properties: 28 },
    { name: "Alto Prado", lat: 10.9922, lng: -74.8031, properties: 22 },
    { name: "Villa Country", lat: 11.0086, lng: -74.8119, properties: 18 },
  ],
  cartagena: [
    { name: "Bocagrande", lat: 10.3994, lng: -75.5536, properties: 35 },
    { name: "Castillogrande", lat: 10.3872, lng: -75.5503, properties: 20 },
    { name: "Manga", lat: 10.4097, lng: -75.5333, properties: 15 },
  ],
  bucaramanga: [
    { name: "Cabecera", lat: 7.1106, lng: -73.1147, properties: 25 },
    { name: "Sotomayor", lat: 7.1089, lng: -73.1089, properties: 18 },
    { name: "Cañaveral", lat: 7.0833, lng: -73.0833, properties: 22 },
  ],
};

const OPERATION_LABELS: Record<string, string> = {
  comprar: "Comprar",
  arrendar: "Arrendar",
  invertir: "Invertir",
};

const PROPERTY_LABELS: Record<string, string> = {
  apartamento: "Apartamento",
  casa: "Casa",
  lote: "Lote",
  proyecto: "Proyecto nuevo",
};

const CITY_LABELS: Record<string, string> = {
  bogota: "Bogotá",
  medellin: "Medellín",
  cali: "Cali",
  barranquilla: "Barranquilla",
  cartagena: "Cartagena",
  bucaramanga: "Bucaramanga",
};

const MapSearch = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const circlesRef = useRef<Map<string, L.Circle>>(new Map());
  
  const operationType = searchParams.get("operacion") || "";
  const propertyType = searchParams.get("tipo") || "";
  const city = searchParams.get("ciudad") || "bogota";
  const priceRange = searchParams.get("precio") || "";
  
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const cityData = CITY_COORDINATES[city] || CITY_COORDINATES.bogota;
  const zones = CITY_ZONES[city] || CITY_ZONES.bogota;
  
  const toggleZone = useCallback((zoneName: string) => {
    setSelectedZones(prev => 
      prev.includes(zoneName) 
        ? prev.filter(z => z !== zoneName)
        : [...prev, zoneName]
    );
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [cityData.lat, cityData.lng],
      zoom: cityData.zoom,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapRef.current = map;

    // Add zoom control to bottom right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    setTimeout(() => setIsLoading(false), 800);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers when zones or selection changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers and circles
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current.clear();
    circlesRef.current.forEach(circle => circle.remove());
    circlesRef.current.clear();

    // Add markers for each zone
    zones.forEach(zone => {
      const isSelected = selectedZones.includes(zone.name);
      
      const icon = L.divIcon({
        className: "custom-zone-marker",
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center;">
            <div style="
              position: absolute;
              width: 48px;
              height: 48px;
              border-radius: 50%;
              background: ${isSelected ? 'rgba(180, 130, 60, 0.3)' : 'rgba(30, 30, 30, 0.15)'};
              ${isSelected ? 'animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;' : ''}
            "></div>
            <div style="
              position: relative;
              width: 36px;
              height: 36px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-weight: 700;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              background: ${isSelected ? 'hsl(38, 70%, 45%)' : 'white'};
              color: ${isSelected ? 'white' : 'hsl(30, 5%, 12%)'};
              border: 2px solid ${isSelected ? 'hsl(38, 70%, 45%)' : 'rgba(30, 30, 30, 0.2)'};
              cursor: pointer;
              transition: all 0.2s;
            ">${zone.properties}</div>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      });

      const marker = L.marker([zone.lat, zone.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="text-align: center; padding: 4px;">
            <p style="font-weight: 600; margin: 0;">${zone.name}</p>
            <p style="font-size: 12px; color: #666; margin: 4px 0 0 0;">${zone.properties} propiedades</p>
          </div>
        `);

      marker.on("click", () => {
        toggleZone(zone.name);
      });

      markersRef.current.set(zone.name, marker);

      // Add circle for selected zones
      if (isSelected) {
        const circle = L.circle([zone.lat, zone.lng], {
          radius: 800,
          color: "hsl(38, 70%, 45%)",
          fillColor: "hsl(38, 70%, 45%)",
          fillOpacity: 0.15,
          weight: 2,
        }).addTo(map);

        circlesRef.current.set(zone.name, circle);
      }
    });
  }, [zones, selectedZones, toggleZone]);

  // Fly to city when it changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo([cityData.lat, cityData.lng], cityData.zoom, {
        duration: 1.5,
      });
    }
  }, [city, cityData]);
  
  const handleContinue = () => {
    const params = new URLSearchParams(searchParams);
    if (selectedZones.length > 0) {
      params.set("zonas", selectedZones.join(","));
    }
    navigate(`/?${params.toString()}#propiedades`);
  };
  
  const totalProperties = selectedZones.length > 0
    ? zones.filter(z => selectedZones.includes(z.name)).reduce((sum, z) => sum + z.properties, 0)
    : zones.reduce((sum, z) => sum + z.properties, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            
            {/* Search Context Badges */}
            <div className="hidden sm:flex items-center gap-2 flex-wrap justify-center">
              {operationType && (
                <Badge variant="secondary" className="bg-gold/10 text-gold border-gold/20">
                  {OPERATION_LABELS[operationType]}
                </Badge>
              )}
              {propertyType && (
                <Badge variant="secondary">
                  <Building2 className="w-3 h-3 mr-1" />
                  {PROPERTY_LABELS[propertyType]}
                </Badge>
              )}
              <Badge variant="outline" className="border-primary/30">
                <MapPin className="w-3 h-3 mr-1" />
                {CITY_LABELS[city]}
              </Badge>
            </div>
            
            <Button 
              onClick={handleContinue}
              className="bg-gold hover:bg-gold/90 text-gold-foreground shadow-gold"
              disabled={selectedZones.length === 0}
            >
              <Check className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Ver {totalProperties} propiedades</span>
              <span className="sm:hidden">Ver ({totalProperties})</span>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar - Zone Selection */}
        <aside className="w-full lg:w-80 bg-card border-b lg:border-b-0 lg:border-r border-border p-4 lg:p-6 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                Selecciona tu zona ideal
              </h2>
              <p className="text-sm text-muted-foreground">
                Haz clic en el mapa o en las zonas para elegir dónde quieres vivir
              </p>
            </div>
            
            {/* Instructions */}
            <Card className="p-3 bg-secondary/50 border-border/50">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MousePointer2 className="w-4 h-4 text-gold" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">Interactúa con el mapa</p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Usa zoom y arrastra para explorar. Toca los marcadores para seleccionar.
                  </p>
                </div>
              </div>
            </Card>
            
            {/* Zone List */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Zonas en {CITY_LABELS[city]}
              </h3>
              <div className="grid gap-2">
                {zones.map((zone) => {
                  const isSelected = selectedZones.includes(zone.name);
                  return (
                    <button
                      key={zone.name}
                      onClick={() => toggleZone(zone.name)}
                      className={`
                        w-full p-3 rounded-lg border text-left transition-all
                        ${isSelected 
                          ? "bg-gold/10 border-gold text-foreground shadow-sm" 
                          : "bg-background border-border hover:border-primary/30 hover:bg-secondary/50"
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`
                            w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                            ${isSelected ? "bg-gold text-white" : "bg-secondary text-muted-foreground"}
                          `}>
                            {isSelected ? <Check className="w-3 h-3" /> : zone.properties}
                          </div>
                          <span className="font-medium">{zone.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {zone.properties} prop.
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Selected Summary */}
            {selectedZones.length > 0 && (
              <Card className="p-4 bg-gold/5 border-gold/20">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-4 h-4 text-gold" />
                  <span className="font-medium text-foreground">
                    {selectedZones.length} zona{selectedZones.length > 1 ? "s" : ""} seleccionada{selectedZones.length > 1 ? "s" : ""}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {totalProperties} propiedades disponibles en tu selección
                </p>
              </Card>
            )}
          </div>
        </aside>
        
        {/* Map Container */}
        <div className="flex-1 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-20 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-gold animate-spin mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Cargando mapa...</p>
              </div>
            </div>
          )}
          
          {/* Zoom Hint - Mobile */}
          <div className="absolute top-4 left-4 right-4 z-10 lg:hidden pointer-events-none">
            <Card className="p-2 bg-background/90 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ZoomIn className="w-4 h-4" />
                <span>Pellizca para hacer zoom • Toca marcadores para seleccionar</span>
              </div>
            </Card>
          </div>
          
          <div 
            ref={mapContainerRef} 
            className="h-[50vh] lg:h-full w-full"
          />
        </div>
      </div>

      {/* CSS for ping animation */}
      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MapSearch;
