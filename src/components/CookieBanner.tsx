import { useState, useEffect } from "react";
import { Cookie, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = "origenurbano_cookie_consent";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    } else {
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
      } catch {
        setIsVisible(true);
      }
    }

    // Listen for settings open event (from cookie policy page)
    const handleOpenSettings = () => {
      setIsVisible(true);
      setShowSettings(true);
    };

    window.addEventListener('openCookieSettings', handleOpenSettings);
    return () => {
      window.removeEventListener('openCookieSettings', handleOpenSettings);
    };
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    });
  };

  const rejectNonEssential = () => {
    savePreferences({
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    });
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowSettings(false)}
      />
      
      {/* Banner */}
      <div className="relative w-full max-w-2xl bg-card border border-border shadow-elevated m-4 rounded-xl overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
              <Cookie className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-display text-lg font-medium text-primary-foreground">
                {showSettings ? "Configuración de Cookies" : "Usamos Cookies"}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              if (showSettings) {
                setShowSettings(false);
              } else {
                rejectNonEssential();
              }
            }}
            className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showSettings ? (
            <>
              <p className="font-body text-foreground/80 mb-6">
                Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico 
                del sitio y personalizar el contenido. Puedes aceptar todas las cookies, rechazar las no 
                esenciales o configurar tus preferencias.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={acceptAll} 
                  variant="gold"
                  className="flex-1"
                >
                  Aceptar todas
                </Button>
                <Button 
                  onClick={rejectNonEssential}
                  variant="outline"
                  className="flex-1"
                >
                  Solo esenciales
                </Button>
                <Button 
                  onClick={() => setShowSettings(true)}
                  variant="ghost"
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Configurar
                </Button>
              </div>

              <p className="font-body text-xs text-muted-foreground mt-4 text-center">
                Más información en nuestra{" "}
                <Link to="/politica-de-cookies" className="text-gold hover:underline">
                  Política de Cookies
                </Link>
              </p>
            </>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {/* Essential cookies */}
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-display font-medium text-foreground">
                      Cookies Esenciales
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      Necesarias para el funcionamiento del sitio. No se pueden desactivar.
                    </p>
                  </div>
                  <Switch checked={true} disabled />
                </div>

                {/* Analytics cookies */}
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-display font-medium text-foreground">
                      Cookies de Análisis
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      Nos ayudan a entender cómo usas el sitio para mejorarlo.
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.analytics}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, analytics: checked })
                    }
                  />
                </div>

                {/* Functional cookies */}
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-display font-medium text-foreground">
                      Cookies de Funcionalidad
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      Permiten recordar tus preferencias y personalizar tu experiencia.
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.functional}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, functional: checked })
                    }
                  />
                </div>

                {/* Marketing cookies */}
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-display font-medium text-foreground">
                      Cookies de Marketing
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      Se usan para mostrarte publicidad relevante según tus intereses.
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.marketing}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, marketing: checked })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={saveCustomPreferences}
                  variant="gold"
                  className="flex-1"
                >
                  Guardar preferencias
                </Button>
                <Button 
                  onClick={acceptAll}
                  variant="outline"
                  className="flex-1"
                >
                  Aceptar todas
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
