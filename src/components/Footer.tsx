import { Facebook, Instagram, Linkedin, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#nosotros", label: "Quiénes Somos" },
    { href: "#servicios", label: "Servicios" },
    { href: "#propiedades", label: "Propiedades" },
    { href: "#contacto", label: "Contacto" },
  ];

  const services = [
    "Compra de Vivienda",
    "Venta de Inmuebles",
    "Asesoría Inmobiliaria",
    "Inversión Urbana",
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-2xl font-semibold tracking-tight mb-4">
              Visión<span className="text-gold">Urbana</span>
            </h3>
            <p className="font-body text-primary-foreground/70 text-sm leading-relaxed mb-6">
              El origen de decisiones inteligentes. Tu aliado estratégico 
              en el mercado inmobiliario colombiano.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 border border-primary-foreground/20 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-primary-foreground/20 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-primary-foreground/20 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-medium mb-4">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-medium mb-4">
              Servicios
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="font-body text-sm text-primary-foreground/70">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-medium mb-4">
              Contacto
            </h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/70">
              <li>Bogotá, Colombia</li>
              <li>+57 300 123 4567</li>
              <li>contacto@origenurbano.co</li>
              <li>Lun - Vie: 8am - 6pm</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 py-6 flex flex-col items-center gap-4">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <Link
              to="/politica-de-privacidad"
              className="font-body text-xs sm:text-sm text-primary-foreground/50 hover:text-gold transition-colors"
            >
              Política de Privacidad
            </Link>
            <Link
              to="/politica-de-cookies"
              className="font-body text-xs sm:text-sm text-primary-foreground/50 hover:text-gold transition-colors"
            >
              Política de Cookies
            </Link>
            <Link
              to="/terminos-y-condiciones"
              className="font-body text-xs sm:text-sm text-primary-foreground/50 hover:text-gold transition-colors"
            >
              Términos y Condiciones
            </Link>
            <Link
              to="/aviso-legal"
              className="font-body text-xs sm:text-sm text-primary-foreground/50 hover:text-gold transition-colors"
            >
              Aviso Legal
            </Link>
          </div>
          
          {/* Copyright and scroll button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-between">
            <p className="font-body text-xs sm:text-sm text-primary-foreground/50 text-center">
              © 2025 ORIGENURBANO. Todos los derechos reservados.
            </p>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-gold text-gold-foreground flex items-center justify-center hover:bg-gold/90 transition-colors flex-shrink-0"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
