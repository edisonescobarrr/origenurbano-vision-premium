import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const Header = () => {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";
  /** Fuera del home el fondo del header va sólido para no tapar el contenido. El texto siempre es oscuro porque la foto del inicio es clara. */
  const solidStyle = !isHome || isScrolled;
  const contactHref = isHome ? "#contacto" : "/#contacto";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#nosotros", label: "Quiénes Somos" },
    { href: "#servicios", label: "Servicios" },
    { href: "#propiedades", label: "Propiedades" },
    { href: "#diferencial", label: "Por Qué Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solidStyle
          ? "bg-background/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Logo className="text-2xl md:text-3xl text-primary" />
        </Link>

        {/* Desktop Navigation: desde 1280 px; por debajo no caben el logo, seis enlaces y el botón */}
        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={isHome ? link.href : `/${link.href}`}
              className="text-sm font-body font-medium tracking-wide text-foreground hover:text-earth transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <Button variant={solidStyle ? "premium" : "hero"} size="lg" asChild>
            <a href={contactHref}>Contáctenos</a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="menu-movil"
          className="xl:hidden p-2 text-primary transition-colors"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="menu-movil" className="xl:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={isHome ? link.href : `/${link.href}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground font-body font-medium py-2 hover:text-earth transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button variant="premium" size="lg" className="mt-4" asChild>
              <a href={contactHref} onClick={() => setIsMobileMenuOpen(false)}>
                Contáctenos
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
