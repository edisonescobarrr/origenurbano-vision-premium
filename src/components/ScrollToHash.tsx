import { useEffect } from "react";
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

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");
    let attempts = 0;
    let timeoutId: number;
    let settleTimeoutId: number;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Reafirma el scroll poco después por si algo (ej. el mapa al desmontarse) mueve el layout justo después.
        settleTimeoutId = window.setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
