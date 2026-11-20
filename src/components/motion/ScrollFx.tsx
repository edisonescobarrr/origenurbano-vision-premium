import { useEffect } from "react";

/**
 * Motor de efectos al desplazarse (sin librerías externas). Se monta una sola vez.
 *
 * - [data-reveal]     → aparece al entrar en pantalla (fade / left / right / zoom / mask / line / words).
 *                       Usa --i en el style para escalonar varios elementos.
 * - [data-parallax]   → se mueve más lento o más rápido que la página (valor = velocidad, ej. "0.2").
 * - [data-hero-fade]  → se desvanece y sube al bajar desde la portada.
 * - [data-marquee]    → franja de texto que se desliza en horizontal según el desplazamiento
 *                       (valor = dirección "1" o "-1").
 * - --scroll-progress en <html> → barra de progreso de lectura.
 *
 * Quien tiene activado "reducir movimiento" en su equipo ve todo quieto y visible.
 */
const ScrollFx = () => {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Aparición al entrar en pantalla ---
    const revealAll = () => document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => el.classList.add("is-in"));
    let io: IntersectionObserver | null = null;
    if (reduce || !("IntersectionObserver" in window)) {
      revealAll();
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io?.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
    }
    const watch = () => {
      if (!io) return revealAll();
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => io!.observe(el));
    };
    watch();
    // La página cambia al navegar o al cargar partes diferidas: vigilar los elementos nuevos.
    const mo = new MutationObserver(() => {
      watch();
      collect();
      schedule();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // --- Efectos ligados al desplazamiento ---
    let parallax: HTMLElement[] = [];
    let heroFade: HTMLElement[] = [];
    let marquees: HTMLElement[] = [];
    function collect() {
      parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
      heroFade = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-fade]"));
      marquees = Array.from(document.querySelectorAll<HTMLElement>("[data-marquee]"));
    }
    collect();

    let ticking = false;
    function update() {
      ticking = false;
      const vh = window.innerHeight;
      const max = root.scrollHeight - vh;
      root.style.setProperty("--scroll-progress", String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
      if (reduce) return;

      for (const el of parallax) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallax || "0.2");
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }

      const p = Math.min(1, window.scrollY / (vh * 0.8));
      for (const el of heroFade) {
        el.style.opacity = String(1 - p);
        el.style.transform = `translate3d(0, ${(p * -60).toFixed(1)}px, 0)`;
      }

      for (const el of marquees) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const dir = parseFloat(el.dataset.marquee || "1");
        const t = (vh - r.top) / (vh + r.height); // 0 → 1 mientras cruza la pantalla
        el.style.transform = `translate3d(${(dir * (t - 0.5) * 30).toFixed(2)}%, 0, 0)`;
      }
    }
    function schedule() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      io?.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div aria-hidden="true" className="scroll-progress" />
  );
};

export default ScrollFx;
