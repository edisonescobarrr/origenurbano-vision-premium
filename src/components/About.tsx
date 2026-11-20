import { Target, Eye, Shield, TrendingUp } from "lucide-react";
import RevealWords from "@/components/motion/RevealWords";
import aboutBg from "@/assets/about-bg.webp";

const About = () => {
  const values = [
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

  return (
    <section id="nosotros" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p data-reveal className="text-earth font-body text-sm uppercase tracking-[0.2em] mb-4">
            Quiénes Somos
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground font-medium mb-6">
            <RevealWords text="El origen de la confianza" />
          </h2>
          <div data-reveal="line" style={{ ["--i" as string]: 4 }} className="w-16 h-px bg-gold mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div data-reveal="mask" className="aspect-[4/3] overflow-hidden">
              <img
                src={aboutBg}
                alt="ARQUENO - Desarrollo urbano en Colombia"
                data-parallax="0.08"
                className="w-full h-full object-cover scale-110"
                loading="lazy"
                decoding="async"
              />
            </div>
            {/* Decorative frame - hidden on mobile to prevent overflow */}
            <div className="hidden md:block absolute -bottom-4 -right-4 w-full h-full border border-gold/30 -z-10" />
          </div>

          {/* Content */}
          <div data-reveal="right">
            <h3 className="font-display text-2xl md:text-3xl text-foreground font-medium mb-6">
              Más que una inmobiliaria, somos tu aliado estratégico
            </h3>
            <p className="font-body text-muted-foreground text-lg leading-relaxed mb-6">
              ARQUENO nace de la convicción de que adquirir vivienda es una de las
              decisiones más importantes en la vida. Por eso, creamos una experiencia
              inmobiliaria diferente: cercana, transparente y enfocada en resultados.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Con un profundo conocimiento del mercado colombiano, acompañamos a familias
              e inversionistas en cada etapa del proceso. Desde la búsqueda inicial hasta
              la firma final, estamos contigo.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {values.map((value, index) => (
            <div
              key={value.title}
              data-reveal="up"
              style={{ ["--i" as string]: index }}
              className="group p-6 bg-card hover:bg-secondary transition-colors duration-300"
            >
              <value.icon className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-display text-xl text-foreground font-medium mb-2">
                {value.title}
              </h4>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
