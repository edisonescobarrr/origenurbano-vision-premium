import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MAX_ATTEMPTS = 30;
const RETRY_DELAY_MS = 50;

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

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      attempts += 1;
      if (attempts < MAX_ATTEMPTS) {
        timeoutId = window.setTimeout(tryScroll, RETRY_DELAY_MS);
      }
    };

    timeoutId = window.setTimeout(tryScroll, RETRY_DELAY_MS);
    return () => window.clearTimeout(timeoutId);
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
