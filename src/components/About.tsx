import { Target, Eye, Shield, TrendingUp } from "lucide-react";
import aboutBg from "@/assets/about-bg.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Origen",
      description: "El punto de partida de decisiones que transforman vidas y construyen futuro.",
    },
    {
      icon: Eye,
      title: "Visión Urbana",
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
    <section id="nosotros" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-body text-sm uppercase tracking-[0.2em] mb-4">
            Quiénes Somos
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground font-medium mb-6">
            El origen de la confianza
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={aboutBg}
                alt="ORIGENURBANO - Desarrollo urbano en Colombia"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/30 -z-10" />
          </div>

          {/* Content */}
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground font-medium mb-6">
              Más que una inmobiliaria, somos tu aliado estratégico
            </h3>
            <p className="font-body text-muted-foreground text-lg leading-relaxed mb-6">
              ORIGENURBANO nace de la convicción de que adquirir vivienda es una de las 
              decisiones más importantes en la vida. Por eso, creamos una experiencia 
              inmobiliaria diferente: cercana, transparente y enfocada en resultados.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Con un profundo conocimiento del mercado colombiano, acompañamos a familias 
              e inversionistas en cada etapa del proceso. Desde la búsqueda inicial hasta 
              la firma final, estamos contigo.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
              <div className="text-center">
                <p className="font-display text-3xl text-gold font-medium">15+</p>
                <p className="font-body text-sm text-muted-foreground mt-1">Años de experiencia</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl text-gold font-medium">500+</p>
                <p className="font-body text-sm text-muted-foreground mt-1">Familias felices</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl text-gold font-medium">98%</p>
                <p className="font-body text-sm text-muted-foreground mt-1">Satisfacción</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {values.map((value, index) => (
            <div
              key={value.title}
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
