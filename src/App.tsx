import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Index from "./pages/Index";
import CookieBanner from "./components/CookieBanner";
import ScrollToHash from "./components/ScrollToHash";

// Rutas fuera del inicio se cargan solo cuando se visitan (ej. el mapa con Leaflet no debe pesar en el inicio)
const MapSearch = lazy(() => import("./pages/MapSearch"));
const PublicarInmueble = lazy(() => import("./pages/PublicarInmueble"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const PoliticaCookies = lazy(() => import("./pages/PoliticaCookies"));
const TerminosCondiciones = lazy(() => import("./pages/TerminosCondiciones"));
const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="w-8 h-8 text-gold animate-spin" />
  </div>
);

const App = () => (
  <TooltipProvider>
    <Toaster />
    <BrowserRouter>
      <ScrollToHash />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buscar-zona" element={<MapSearch />} />
          <Route path="/publicar-inmueble" element={<PublicarInmueble />} />
          <Route path="/propiedad/:slug" element={<PropertyDetail />} />
          <Route path="/servicio/:slug" element={<ServiceDetail />} />
          <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/politica-de-cookies" element={<PoliticaCookies />} />
          <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <CookieBanner />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
