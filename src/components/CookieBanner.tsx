import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NOTICE_KEY = "arqueno_cookie_consent";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(NOTICE_KEY)) setIsVisible(true);
    } catch {
      setIsVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(NOTICE_KEY, JSON.stringify({ essential: true, seenAt: new Date().toISOString() }));
    } catch {
      // Sin almacenamiento disponible (modo privado estricto): el aviso solo se oculta en esta visita
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl bg-card border border-border shadow-elevated p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 animate-fade-up">
        <p className="font-body text-sm text-foreground/80 flex-1">
          Este sitio no usa cookies de publicidad ni de seguimiento. Solo guarda en tu navegador lo
          necesario para funcionar.{" "}
          <Link to="/politica-de-cookies" className="underline text-earth hover:text-earth/80">
            Política de cookies
          </Link>
        </p>
        <Button onClick={dismiss} variant="premium" size="sm" className="self-start sm:self-auto">
          Entendido
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;
