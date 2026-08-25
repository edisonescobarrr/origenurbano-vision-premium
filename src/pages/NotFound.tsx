import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: intento de acceso a una ruta inexistente:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <Logo className="text-primary mb-10" iconClassName="h-9 w-9 md:h-10 md:w-10" />
      <p className="font-display text-6xl sm:text-7xl text-gold font-medium mb-4">404</p>
      <h1 className="font-display text-2xl sm:text-3xl text-foreground font-medium mb-3">
        Esta página no existe
      </h1>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Puede que el enlace esté roto o que la página se haya movido. Volvamos a algo que sí existe.
      </p>
      <Button variant="premium" size="lg" asChild>
        <Link to="/">Volver al inicio</Link>
      </Button>
    </div>
  );
};

export default NotFound;
