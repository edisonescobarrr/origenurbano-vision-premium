import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const MAX_ATTEMPTS = 30;
const RETRY_DELAY_MS = 50;
/** Reintento tardío por si el layout se recalcula justo después del primer scroll (ej. al desmontar el mapa de Leaflet) */
const SETTLE_RESCROLL_MS = 400;

/**
 * React Router no hace scroll automático a #anclas al navegar entre rutas
 * (a diferencia de un <a href="#seccion"> normal). Esto lo agrega globalmente.
 * Reintenta porque el elemento destino puede tardar unos renders en existir.
 */
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();
  const lastPathname = useRef<string | null>(null);

  useEffect(() => {
    const samePage = lastPathname.current === pathname;
    lastPathname.current = pathname;
    if (!hash) return;

    const id = decodeURIComponent(hash.slice(1));
    // Al llegar desde otra página (o al cargarla) se salta directo: justo después del cambio de página
    // la animación suave no arranca y el visitante se quedaba arriba (ej. al volver del mapa).
    const behavior: ScrollBehavior = samePage ? "smooth" : "instant";
    let attempts = 0;
    let timeoutId: number;
    let settleTimeoutId: number;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior, block: "start" });
        settleTimeoutId = window.setTimeout(() => {
          const target = document.getElementById(id);
          if (target && Math.abs(target.getBoundingClientRect().top) > 2) {
            target.scrollIntoView({ behavior, block: "start" });
          }
        }, SETTLE_RESCROLL_MS);
        return;
      }
      attempts += 1;
      if (attempts < MAX_ATTEMPTS) {
        timeoutId = window.setTimeout(tryScroll, RETRY_DELAY_MS);
      }
    };

    timeoutId = window.setTimeout(tryScroll, RETRY_DELAY_MS);
    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(settleTimeoutId);
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
