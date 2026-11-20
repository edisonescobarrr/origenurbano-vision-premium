import { useRef } from "react";
import { Target, Eye, Shield, TrendingUp } from "lucide-react";
import aboutBg from "@/assets/about-bg.webp";
import { useStickyProgress, clamp01, easeOut, prefersReducedMotion } from "@/hooks/useStickyProgress";

const VALUES = [
  {
    icon: Target,
    title: "Origen",
    description: "El punto de partida de decisiones que transforman vidas y construyen futuro.",
  },
  {
    icon: Eye,
    title: "Visión Estratégica",
    description: "Entendemos la ciudad como un ecosistema de oportunidades estratégicas.",
  },
  {
    icon: Shield,
    title: "Confianza",
    description: "Transparencia total en cada operación. Tu tranquilidad es nuestra prioridad.",
  },
  {
    icon: TrendingUp,
    title: "Inversión Inteligente",
    description: "Asesoramos para que cada decisión construya patrimonio real.",
  },
];

/**
 * Quiénes somos en pantalla dividida: la foto queda fija a la izquierda (se abre y se acerca al bajar,
 * con el número del valor activo encima) y a la derecha pasan la historia y los valores; se ilumina
 * el que está en el centro de la pantalla.
 */
const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(-1);

  useStickyProgress(sectionRef, (p) => {
    const reduce = prefersReducedMotion();
    const open = reduce ? 1 : easeOut(clamp01(p / 0.3));
    if (frameRef.current) {
      const inset = (1 - open) * 14;
      frameRef.current.style.clipPath = `inset(${inset}% ${inset}% ${inset}% ${inset}% round ${(1 - open) * 24}px)`;
    }
    if (imgRef.current && !reduce) imgRef.current.style.transform = `scale(${(1.3 - 0.3 * p).toFixed(3)})`;

    // Valor activo: el bloque más cercano al centro de la pantalla
    const mid = window.innerHeight / 2;
    let active = -1;
    let best = Infinity;
    blocksRef.current.forEach((b, i) => {
      if (!b) return;
      const r = b.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < best && r.top < window.innerHeight && r.bottom > 0) {
        best = d;
        active = i;
      }
    });
    if (active !== activeRef.current) {
      activeRef.current = active;
      blocksRef.current.forEach((b, i) => b?.classList.toggle("is-active", i === active));
      const v = Math.max(0, active - 1); // el bloque 0 es la historia; los valores empiezan en 1
      if (counterRef.current) counterRef.current.style.transform = `translateY(${-v}em)`;
      if (labelRef.current) labelRef.current.textContent = active <= 0 ? "Nuestra historia" : VALUES[v].title;
    }
  });

  return (
    <section id="nosotros" ref={sectionRef} className="relative bg-background">
      <div className="grid lg:grid-cols-2">
        {/* Izquierda fija: foto */}
        <div className="lg:sticky lg:top-0 lg:h-screen h-[60vh] relative overflow-hidden">
          <div ref={frameRef} className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(14% 14% 14% 14% round 24px)" }}>
            <img
              ref={imgRef}
              src={aboutBg}
              alt="ARQUENO - Desarrollo urbano en Colombia"
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              style={{ transform: "scale(1.3)" }}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
            <div className="absolute left-6 sm:left-10 bottom-6 sm:bottom-10 text-primary-foreground">
              <div className="font-display font-light leading-none text-[clamp(96px,14vw,200px)] h-[1em] overflow-hidden text-gold">
                <div ref={counterRef} className="transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)]">
                  {["01", "02", "03", "04"].map((n) => (
                    <span key={n} className="block h-[1em]">{n}</span>
                  ))}
                </div>
              </div>
              <p ref={labelRef} className="font-body text-xs sm:text-sm uppercase tracking-[0.35em] mt-3 text-primary-foreground/80">
                Nuestra historia
              </p>
            </div>
          </div>
        </div>

        {/* Derecha: historia y valores */}
        <div className="px-6 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-[22vh] flex flex-col gap-16 lg:gap-[26vh]">
          <div ref={(el) => (blocksRef.current[0] = el)} className="about-block">
            <p className="text-earth font-body text-xs sm:text-sm uppercase tracking-[0.35em] mb-5">Quiénes somos</p>
            <h2 className="font-display font-light text-[clamp(44px,5.5vw,84px)] leading-[0.95] tracking-[-0.03em] mb-8">
              El origen de la <em className="text-gold">confianza</em>
            </h2>
            <h3 className="font-display text-2xl md:text-3xl text-foreground font-medium mb-5">
              Más que una inmobiliaria, somos tu aliado estratégico
            </h3>
            <p className="font-body text-muted-foreground text-lg leading-relaxed mb-5">
              ARQUENO nace de la convicción de que adquirir vivienda es una de las decisiones más importantes en la
              vida. Por eso, creamos una experiencia inmobiliaria diferente: cercana, transparente y enfocada en
              resultados.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Con un profundo conocimiento del mercado colombiano, acompañamos a familias e inversionistas en cada
              etapa del proceso. Desde la búsqueda inicial hasta la firma final, estamos contigo.
            </p>
          </div>

          {VALUES.map((value, i) => (
            <div key={value.title} ref={(el) => (blocksRef.current[i + 1] = el)} className="about-block">
              <div className="flex items-center gap-4 mb-5">
                <span className="w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center about-icon">
                  <value.icon className="w-6 h-6" />
                </span>
                <span className="font-body text-xs uppercase tracking-[0.35em] text-earth">Valor {String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="font-display font-light text-[clamp(36px,4.2vw,64px)] leading-[1] tracking-[-0.02em] mb-4">
                {value.title}
              </h3>
              <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-md">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
