import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";
  /** Fuera del home el fondo del header va sólido para no tapar el contenido ni usar colores del hero */
  const solidStyle = !isHome || isScrolled;

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
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span
            className={`font-display text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-300 ${
              solidStyle ? "text-primary" : "text-primary-foreground"
            }`}
          >
            Domo<span className="text-gold">Urbano</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={isHome ? link.href : `/${link.href}`}
              className={`text-sm font-body font-medium tracking-wide transition-colors duration-300 hover:text-gold ${
                solidStyle ? "text-foreground" : "text-primary-foreground/90"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button variant={solidStyle ? "premium" : "hero"} size="lg">
            Contáctenos
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 transition-colors ${
            solidStyle ? "text-primary" : "text-primary-foreground"
          }`}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={isHome ? link.href : `/${link.href}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground font-body font-medium py-2 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button variant="premium" size="lg" className="mt-4">
              Contáctenos
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
