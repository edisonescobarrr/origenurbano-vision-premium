import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MapSearch from "./pages/MapSearch";
import PublicarInmueble from "./pages/PublicarInmueble";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import PoliticaCookies from "./pages/PoliticaCookies";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import AvisoLegal from "./pages/AvisoLegal";
import NotFound from "./pages/NotFound";
import PropertyDetail from "./pages/PropertyDetail";
import ServiceDetail from "./pages/ServiceDetail";
import CookieBanner from "./components/CookieBanner";
import ScrollToHash from "./components/ScrollToHash";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <BrowserRouter>
      <ScrollToHash />
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
      <CookieBanner />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
