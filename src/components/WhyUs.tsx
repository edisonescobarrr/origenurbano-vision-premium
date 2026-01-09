import { Shield, Scale, Users, Lightbulb, CheckCircle } from "lucide-react";

const WhyUs = () => {
  const differentiators = [
    {
      icon: Shield,
      title: "Transparencia Total",
      description:
        "Sin sorpresas ni costos ocultos. Cada detalle del proceso está claro desde el primer momento.",
    },
    {
      icon: Scale,
      title: "Acompañamiento Legal",
      description:
        "Revisamos toda la documentación legal para garantizar transacciones seguras y sin contratiempos.",
    },
    {
      icon: Users,
      title: "Atención Personalizada",
      description:
        "Cada cliente es único. Diseñamos estrategias adaptadas a tus necesidades específicas.",
    },
    {
      icon: Lightbulb,
      title: "Enfoque Estratégico",
      description:
        "Analizamos el mercado con visión de largo plazo para maximizar el valor de tu inversión.",
    },
  ];

  const reasons = [
    "Experiencia comprobada en el mercado colombiano",
    "Red de contactos y oportunidades exclusivas",
    "Tecnología al servicio de tu búsqueda",
    "Seguimiento post-venta y asesoría continua",
    "Alianzas con entidades financieras",
    "Valoraciones certificadas y confiables",
  ];

  return (
    <section id="diferencial" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-body text-sm uppercase tracking-[0.2em] mb-4">
            Por Qué Elegirnos
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium mb-6">
            Tu decisión inteligente
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Differentiators */}
          <div className="grid sm:grid-cols-2 gap-6">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="group p-6 border border-primary-foreground/10 hover:border-gold/50 transition-colors duration-300"
              >
                <item.icon className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-xl font-medium mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-primary-foreground/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Reasons List */}
          <div className="bg-primary-foreground/5 p-8">
            <h3 className="font-display text-2xl font-medium mb-6">
              Lo que nos diferencia
            </h3>
            <ul className="space-y-4">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="font-body text-primary-foreground/80">
                    {reason}
                  </span>
                </li>
              ))}
            </ul>

            {/* Quote */}
            <blockquote className="mt-8 pt-8 border-t border-primary-foreground/10">
              <p className="font-display text-xl italic text-primary-foreground/90 mb-4">
                "Una buena inversión inmobiliaria no es cuestión de suerte. 
                Es el resultado de decisiones informadas."
              </p>
              <cite className="font-body text-sm text-gold not-italic">
                — Filosofía ORIGENURBANO
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
