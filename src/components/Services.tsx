import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SERVICES } from "@/data/services";
import { useStickyProgress, prefersReducedMotion } from "@/hooks/useStickyProgress";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import heroBg from "@/assets/hero-home-bg.webp";
import aboutBg from "@/assets/about-bg.webp";

/** Foto de cada servicio en la galería */
const SERVICE_IMAGES: Record<string, { src: string; position?: string }> = {
  "compra-de-vivienda": { src: heroBg },
  "venta-de-inmuebles": { src: "/recorrido/apartamento-bella-vista/portada.jpg", position: "center 35%" },
  "asesoria-inmobiliaria": { src: aboutBg, position: "70% center" },
  "inversion-urbana": { src: aboutBg, position: "15% center" },
};

/**
 * Nuestros servicios como galería horizontal: la sección se queda fija y las tarjetas pasan de lado
 * mientras se baja. Cada tarjeta lleva a la página propia del servicio.
 */
const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [pinned, setPinned] = useState(true);

  // Alto de la sección = lo que hay que recorrer de lado (1 px abajo = 1 px de lado)
  useEffect(() => {
    if (prefersReducedMotion()) return setPinned(false);
    const fit = () => {
      const s = sectionRef.current;
      const t = trackRef.current;
      if (!s || !t) return;
      const extra = Math.max(0, t.scrollWidth - window.innerWidth);
      s.style.height = `${window.innerHeight + extra}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    const ro = new ResizeObserver(fit);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", fit);
      ro.disconnect();
    };
  }, []);

  useStickyProgress(sectionRef, (p) => {
    if (!pinned) return;
    const t = trackRef.current;
    if (!t) return;
    const extra = Math.max(0, t.scrollWidth - window.innerWidth);
    t.style.transform = `translate3d(${(-extra * p).toFixed(1)}px, 0, 0)`;
    if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(3)})`;
  });

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative bg-primary text-primary-foreground"
      style={pinned ? undefined : { height: "auto" }}
    >
      <div className={pinned ? "sticky top-0 h-screen overflow-hidden flex flex-col justify-center" : "py-20"}>
        <div
          ref={trackRef}
          className={`flex items-stretch gap-6 sm:gap-8 px-4 sm:px-6 lg:px-[6vw] will-change-transform ${
            pinned ? "w-max" : "overflow-x-auto snap-x snap-mandatory pb-6"
          }`}
        >
          {/* Presentación */}
          <div className="w-[82vw] sm:w-[420px] lg:w-[460px] shrink-0 flex flex-col justify-center snap-start pr-4">
            <p className="text-gold-light font-body text-xs sm:text-sm uppercase tracking-[0.3em] mb-5">Nuestros servicios</p>
            <h2 className="font-display font-light text-[clamp(44px,6vw,88px)] leading-[0.95] tracking-[-0.03em] mb-6">
              Soluciones <em className="text-gold">integrales</em>
            </h2>
            <p className="font-body text-primary-foreground/70 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              Desde la búsqueda inicial hasta la inversión estratégica. Desliza para conocer cada servicio y entra a su
              página para ver el paso a paso completo.
            </p>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-light flex items-center gap-3">
              Desliza <ArrowRight className="w-4 h-4 animate-pulse" />
            </p>
          </div>

          {SERVICES.map((service, i) => {
            const img = SERVICE_IMAGES[service.slug];
            return (
              <Link
                key={service.slug}
                to={`/servicio/${service.slug}`}
                className="group w-[82vw] sm:w-[440px] lg:w-[500px] shrink-0 snap-start bg-primary-foreground/[0.04] border border-primary-foreground/10 hover:border-gold/60 transition-colors duration-500 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="relative h-[24vh] sm:h-[30vh] overflow-hidden">
                  {img && (
                    <img
                      src={img.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.2s] ease-out"
                      style={{ objectPosition: img.position }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                  <span className="absolute bottom-3 right-5 font-display font-light text-6xl sm:text-7xl text-gold leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute top-4 left-4 w-11 h-11 bg-gold text-gold-foreground flex items-center justify-center">
                    <service.icon className="w-5 h-5" />
                  </span>
                </div>

                <div className="p-5 sm:p-7 flex flex-col flex-1">
                  <h3 className="font-display text-2xl sm:text-3xl font-medium mb-1">{service.title}</h3>
                  <p className="font-display italic text-gold-light mb-3">{service.tagline}</p>
                  <p className="font-body text-sm text-primary-foreground/70 leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <ul className="flex flex-wrap gap-2 mb-5">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="font-body text-xs border border-primary-foreground/15 text-primary-foreground/80 px-3 py-1.5"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 border-t border-primary-foreground/10 flex items-center justify-between">
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-primary-foreground/50">
                      {service.process.length} pasos
                    </span>
                    <span className="font-body text-sm font-semibold text-gold flex items-center gap-2">
                      Ver servicio
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Cierre */}
          <div className="w-[82vw] sm:w-[380px] shrink-0 snap-start flex flex-col justify-center bg-gold text-gold-foreground p-8 sm:p-10">
            <p className="font-display font-light text-4xl sm:text-5xl leading-[1] mb-6">
              ¿No sabes por dónde empezar?
            </p>
            <p className="font-body text-sm sm:text-base mb-8 opacity-80">
              Cuéntanos qué necesitas y te decimos cuál servicio te sirve, sin compromiso.
            </p>
            <a
              href={getWhatsAppUrl("Hola, quiero asesoría para saber qué servicio de ARQUENO me sirve.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start bg-primary text-primary-foreground font-body font-semibold text-sm px-6 py-4 hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Escríbenos por WhatsApp
            </a>
          </div>
        </div>

        {pinned && (
          <div className="absolute bottom-8 left-4 right-4 sm:left-6 sm:right-6 lg:left-[6vw] lg:right-[6vw] h-px bg-primary-foreground/15">
            <span ref={barRef} className="block h-full bg-gold origin-left" style={{ transform: "scaleX(0)" }} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
