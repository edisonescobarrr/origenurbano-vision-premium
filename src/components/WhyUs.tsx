import { useRef } from "react";
import { Link } from "react-router-dom";
import { Scale, Plane, Rotate3d, Glasses, CheckCircle, ArrowUpRight, type LucideIcon } from "lucide-react";
import { useStickyProgress, clamp01, prefersReducedMotion } from "@/hooks/useStickyProgress";
import heroBg from "@/assets/hero-home-bg.webp";
import aboutBg from "@/assets/about-bg.webp";

type Item = {
  icon: LucideIcon;
  kicker: string;
  title: string;
  text: string;
  points: string[];
  /** Foto normal, o foto 360 que se desplaza sola */
  image?: string;
  pano?: string;
  link?: { to: string; label: string; external?: boolean };
  tone: "light" | "dark" | "sand" | "gold";
};

const ITEMS: Item[] = [
  {
    icon: Scale,
    kicker: "Asesoría legal",
    title: "Firmas con tranquilidad",
    text: "Revisamos contigo los documentos del inmueble antes de comprar o vender, para que sepas exactamente qué estás firmando.",
    points: ["Certificado de tradición y libertad", "Escrituras, impuestos y paz y salvos", "Acompañamiento en promesa y notaría"],
    image: "/recorrido/apartamento-bella-vista/portada.jpg",
    tone: "light",
  },
  {
    icon: Plane,
    kicker: "Vuelos con dron",
    title: "Tu lote, visto desde el aire",
    text: "Fotos y video aéreo para mostrar el terreno completo: forma, linderos, accesos, vías y todo lo que lo rodea.",
    points: ["Fotos y video en alta calidad", "Vista de linderos y accesos", "Ideal para lotes y fincas"],
    image: aboutBg,
    tone: "dark",
  },
  {
    icon: Rotate3d,
    kicker: "Recorridos virtuales 360°",
    title: "Visita casas y apartamentos desde tu celular",
    text: "Camina por cada ambiente como si estuvieras allí, a cualquier hora y desde cualquier lugar.",
    points: ["Todos los espacios en 360°", "Funciona en celular y computador", "Menos visitas perdidas"],
    pano: "/recorrido/apartamento-bella-vista/escenas/04/base.jpg",
    link: { to: "/recorrido/apartamento-bella-vista", label: "Ver un recorrido real", external: true },
    tone: "sand",
  },
  {
    icon: Glasses,
    kicker: "Experiencia inmersiva",
    title: "Siente el espacio antes de decidir",
    text: "Imágenes, videos y recorridos que te dejan vivir el inmueble o el proyecto antes de comprarlo o construirlo.",
    points: ["Renders y videos del proyecto", "Recorridos interactivos", "Presentaciones para inversionistas"],
    image: heroBg,
    tone: "gold",
  },
];

const TONES: Record<Item["tone"], string> = {
  light: "bg-card text-foreground",
  dark: "bg-primary text-primary-foreground",
  sand: "bg-secondary text-foreground",
  gold: "bg-gold text-gold-foreground",
};

const REASONS = [
  "Acompañamiento de principio a fin",
  "Red de contactos y oportunidades exclusivas",
  "Tecnología al servicio de tu búsqueda",
  "Seguimiento post-venta y asesoría continua",
  "Orientación para acceder a crédito de vivienda",
  "Estimaciones de precio basadas en el mercado",
];

/** Lo que hacemos: tarjetas que se quedan fijas y se apilan una sobre otra al bajar. */
const WhyUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useStickyProgress(sectionRef, () => {
    if (prefersReducedMotion()) return;
    const vh = window.innerHeight;
    const cards = cardsRef.current;
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!card) return;
      if (!next) {
        card.style.transform = "";
        card.style.filter = "";
        return;
      }
      const top = next.getBoundingClientRect().top;
      const p = clamp01(1 - (top - vh * 0.14) / (vh * 0.75));
      card.style.transform = `scale(${(1 - p * 0.07).toFixed(4)})`;
      card.style.filter = `brightness(${(1 - p * 0.3).toFixed(3)})`;
    });
  });

  return (
    <section id="diferencial" ref={sectionRef} className="relative bg-background py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <p data-reveal className="text-earth font-body text-xs sm:text-sm uppercase tracking-[0.35em] mb-5">
            Lo que hacemos
          </p>
          <h2 data-reveal className="font-display font-light text-[clamp(40px,6vw,88px)] leading-[0.95] tracking-[-0.03em]">
            Más que mostrar <em className="text-gold">inmuebles</em>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          {ITEMS.map((item, i) => (
            <div
              key={item.kicker}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`sticky mb-[8vh] last:mb-0 overflow-hidden shadow-elevated origin-top will-change-transform grid md:grid-cols-2 md:h-[68vh] ${TONES[item.tone]}`}
              style={{ top: `calc(var(--stack-top) + ${i} * var(--stack-step))` }}
            >
              <div className="p-5 sm:p-10 lg:p-12 flex flex-col justify-between gap-4 sm:gap-6 order-2 md:order-1">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display font-light text-5xl sm:text-8xl leading-none opacity-90 text-gold [.bg-gold_&]:text-gold-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="w-12 h-12 border border-current/20 flex items-center justify-center opacity-80">
                    <item.icon className="w-6 h-6" />
                  </span>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.3em] opacity-70 mb-3">{item.kicker}</p>
                  <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-medium leading-[1.05] mb-3 sm:mb-4">{item.title}</h3>
                  <p className="font-body text-sm sm:text-base opacity-75 leading-relaxed mb-4 sm:mb-5 max-w-md">{item.text}</p>
                  <ul className="space-y-2">
                    {item.points.map((pt) => (
                      <li key={pt} className="font-body text-sm flex items-center gap-2 opacity-90">
                        <span className="w-1.5 h-1.5 rounded-full bg-current" /> {pt}
                      </li>
                    ))}
                  </ul>
                  {item.link && (
                    item.link.external ? (
                      <a
                        href={item.link.to}
                        target="_blank"
                        rel="noopener"
                        className="mt-6 inline-flex items-center gap-2 font-body font-semibold text-sm border-b border-current pb-1 hover:gap-3 transition-all"
                      >
                        {item.link.label} <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link to={item.link.to} className="mt-6 inline-flex items-center gap-2 font-body font-semibold text-sm border-b border-current pb-1">
                        {item.link.label} <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )
                  )}
                </div>
              </div>

              <div className="relative order-1 md:order-2 h-[20vh] md:h-auto overflow-hidden">
                {item.pano ? (
                  <div
                    className="arqueno-pano absolute inset-0"
                    style={{ backgroundImage: `url(${item.pano})` }}
                    role="img"
                    aria-label="Vista 360° de un apartamento"
                  />
                ) : (
                  <img src={item.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lo que nos diferencia */}
        <div className="max-w-6xl mx-auto mt-20 sm:mt-28 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5 border-t border-border pt-10">
          {REASONS.map((reason, i) => (
            <div key={reason} data-reveal style={{ ["--i" as string]: i }} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="font-body text-foreground/80">{reason}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
