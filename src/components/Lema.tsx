import { useRef } from "react";
import { useStickyProgress } from "@/hooks/useStickyProgress";

/** Palabras marcadas con * se encienden en dorado y en cursiva. */
const LEMA =
  "Una buena inversión inmobiliaria no es cuestión de suerte. Es el resultado de *decisiones *informadas.";

/** El lema de ARQUENO: queda fijo en pantalla y se ilumina palabra por palabra al bajar. */
const Lema = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const words = LEMA.split(" ").map((w) => ({ text: w.replace(/^\*/, ""), gold: w.startsWith("*") }));

  useStickyProgress(sectionRef, (p) => {
    const spans = textRef.current?.children;
    if (!spans) return;
    const lit = Math.floor(Math.min(1, p * 1.2) * spans.length);
    for (let i = 0; i < spans.length; i++) spans[i].classList.toggle("is-lit", i < lit);
  });

  return (
    <section ref={sectionRef} aria-label="Nuestro lema" className="relative h-[240vh] bg-background">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 sm:px-[8vw]">
        <p className="text-earth font-body text-xs sm:text-sm uppercase tracking-[0.35em] mb-8">Filosofía ARQUENO</p>
        <p ref={textRef} className="lema-text font-display font-light text-foreground text-center max-w-6xl text-[clamp(32px,5.2vw,84px)] leading-[1.08] tracking-[-0.02em]">
          {words.map((w, i) => (
            <span key={i} className={w.gold ? "lema-gold" : undefined}>
              {w.text}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default Lema;
