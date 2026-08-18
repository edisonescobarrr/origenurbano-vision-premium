import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronRight, MessageCircle, ArrowLeft, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getServiceBySlug } from "@/data/services";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!slug || !service) {
    return <Navigate to="/404" replace />;
  }

  const waUrl = getWhatsAppUrl(`Hola, quiero más información sobre ${service.title}.`);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 pt-24 sm:pt-28">
        <div className="container mx-auto px-4 sm:px-6">
          <nav
            className="font-body text-sm text-muted-foreground mb-6 flex flex-wrap items-center gap-1"
            aria-label="Migas de pan"
          >
            <Link to="/" className="hover:text-foreground transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0 opacity-60" />
            <Link to="/#servicios" className="hover:text-foreground transition-colors">
              Servicios
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0 opacity-60" />
            <span className="text-foreground line-clamp-1">{service.title}</span>
          </nav>

          <Link
            to="/#servicios"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a servicios
          </Link>

          {/* Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary flex items-center justify-center mb-6">
              <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
            </div>
            <p className="text-gold font-body text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
              {service.tagline}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl text-foreground font-medium mb-4">{service.title}</h1>
            <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Process */}
            <div className="lg:col-span-7">
              <h2 className="font-display text-xl sm:text-2xl text-foreground font-medium mb-6">
                Cómo funciona
              </h2>
              <div className="space-y-6">
                {service.process.map((step, index) => (
                  <div key={step.title} className="flex gap-4 sm:gap-6">
                    <div className="flex-shrink-0 w-10 h-10 border border-gold/40 text-gold font-display text-lg flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div className="pb-6 border-b border-border last:border-b-0 last:pb-0 flex-1">
                      <h3 className="font-display text-lg text-foreground font-medium mb-1.5">{step.title}</h3>
                      <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-secondary/40 border border-border/60 p-6 sm:p-8">
                <h2 className="font-display text-lg text-foreground font-medium mb-4">Ideal para</h2>
                <ul className="space-y-3">
                  {service.idealFor.map((item) => (
                    <li key={item} className="flex gap-2.5 font-body text-sm text-foreground">
                      <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-lg text-foreground font-medium mb-4">Lo que incluye</h2>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="font-body text-sm text-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Button variant="premium" size="lg" className="w-full" asChild>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Hablar con un asesor
                  </a>
                </Button>
                <Button variant="premium-outline" size="lg" className="w-full" asChild>
                  <Link to="/#contacto">Escribir por el formulario</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
