import { useEffect, useRef, type RefObject } from "react";

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Llama a onProgress(p) con el avance 0→1 dentro de una sección alta que tiene contenido fijo (sticky):
 * 0 cuando la sección toca el borde superior, 1 cuando su final llega al borde inferior.
 * Escribe estilos directamente (sin volver a pintar React) y solo una vez por cuadro.
 * Con "reducir movimiento" activado entrega siempre 1 (estado final, todo visible).
 */
export function useStickyProgress<T extends HTMLElement>(
  ref: RefObject<T>,
  onProgress: (p: number, el: T) => void,
) {
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    let raf = 0;
    const run = () => {
      raf = 0;
      if (reduce) return cb.current(1, el);
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      cb.current(total > 0 ? clamp01(-r.top / total) : 0, el);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}
