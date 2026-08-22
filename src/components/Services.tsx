import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/services";

const Services = () => {
  const services = SERVICES;

  return (
    <section id="servicios" className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-earth font-body text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4">
            Nuestros Servicios
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-medium mb-4 sm:mb-6">
            Soluciones inmobiliarias integrales
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Desde la búsqueda inicial hasta la inversión estratégica, 
            ofrecemos un acompañamiento completo en cada paso.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-background p-5 sm:p-8 shadow-soft hover:shadow-elevated transition-all duration-500 border border-transparent hover:border-gold/20"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-primary flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                  <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl sm:text-2xl text-foreground font-medium mb-2 sm:mb-3">
                    {service.title}
                  </h3>
                  <p className="font-body text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="font-body text-sm text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="link" className="p-0 text-earth hover:text-earth/80 group/btn" asChild>
                    <Link to={`/servicio/${service.slug}`}>
                      Más información
                      <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
