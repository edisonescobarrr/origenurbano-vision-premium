import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PoliticaCookies = () => {
  const openCookieSettings = () => {
    // Dispatch event to open cookie settings
    window.dispatchEvent(new CustomEvent('openCookieSettings'));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Breadcrumb */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8 font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <article className="prose prose-lg max-w-none">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-8">
              Política de Cookies
            </h1>
            
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              Última actualización: Febrero 2025
            </p>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                1. ¿Qué son las Cookies?
              </h2>
              <p className="font-body text-foreground/80">
                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, 
                tablet o móvil) cuando visita un sitio web. Estas cookies permiten que el sitio recuerde 
                sus acciones y preferencias durante un período de tiempo, para que no tenga que volver 
                a configurarlas cada vez que regrese al sitio o navegue de una página a otra.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                2. Tipos de Cookies que Utilizamos
              </h2>
              
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-display text-xl font-medium text-foreground mb-3">
                    Cookies Esenciales (Necesarias)
                  </h3>
                  <p className="font-body text-foreground/80 mb-2">
                    Son imprescindibles para el funcionamiento del sitio web. Sin ellas, el sitio no 
                    podría operar correctamente.
                  </p>
                  <ul className="list-disc pl-6 font-body text-foreground/80 space-y-1 text-sm">
                    <li>Gestión de sesión de usuario</li>
                    <li>Preferencias de cookies</li>
                    <li>Seguridad y autenticación</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-display text-xl font-medium text-foreground mb-3">
                    Cookies de Rendimiento (Analíticas)
                  </h3>
                  <p className="font-body text-foreground/80 mb-2">
                    Nos permiten analizar cómo los usuarios utilizan el sitio para mejorar su funcionamiento.
                  </p>
                  <ul className="list-disc pl-6 font-body text-foreground/80 space-y-1 text-sm">
                    <li>Google Analytics</li>
                    <li>Estadísticas de visitas</li>
                    <li>Tiempo de permanencia en páginas</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-display text-xl font-medium text-foreground mb-3">
                    Cookies de Funcionalidad
                  </h3>
                  <p className="font-body text-foreground/80 mb-2">
                    Permiten recordar sus preferencias para ofrecerle una experiencia personalizada.
                  </p>
                  <ul className="list-disc pl-6 font-body text-foreground/80 space-y-1 text-sm">
                    <li>Idioma preferido</li>
                    <li>Región geográfica</li>
                    <li>Historial de búsquedas</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-display text-xl font-medium text-foreground mb-3">
                    Cookies de Marketing
                  </h3>
                  <p className="font-body text-foreground/80 mb-2">
                    Se utilizan para mostrar anuncios relevantes basados en sus intereses.
                  </p>
                  <ul className="list-disc pl-6 font-body text-foreground/80 space-y-1 text-sm">
                    <li>Publicidad personalizada</li>
                    <li>Seguimiento de conversiones</li>
                    <li>Redes sociales</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                3. Cookies Propias y de Terceros
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full font-body text-sm border border-border rounded-lg overflow-hidden">
                  <thead className="bg-card">
                    <tr>
                      <th className="text-left p-4 border-b border-border font-medium">Tipo</th>
                      <th className="text-left p-4 border-b border-border font-medium">Proveedor</th>
                      <th className="text-left p-4 border-b border-border font-medium">Propósito</th>
                      <th className="text-left p-4 border-b border-border font-medium">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/80">
                    <tr>
                      <td className="p-4 border-b border-border">Propia</td>
                      <td className="p-4 border-b border-border">DOMOURBANO</td>
                      <td className="p-4 border-b border-border">Sesión y preferencias</td>
                      <td className="p-4 border-b border-border">1 año</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border">Tercero</td>
                      <td className="p-4 border-b border-border">Google Analytics</td>
                      <td className="p-4 border-b border-border">Análisis de uso</td>
                      <td className="p-4 border-b border-border">2 años</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border">Tercero</td>
                      <td className="p-4 border-b border-border">Facebook Pixel</td>
                      <td className="p-4 border-b border-border">Marketing</td>
                      <td className="p-4 border-b border-border">90 días</td>
                    </tr>
                    <tr>
                      <td className="p-4">Tercero</td>
                      <td className="p-4">WhatsApp</td>
                      <td className="p-4">Comunicación</td>
                      <td className="p-4">Sesión</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                4. Gestión de Preferencias de Cookies
              </h2>
              <p className="font-body text-foreground/80 mb-6">
                Usted puede gestionar sus preferencias de cookies en cualquier momento. Puede aceptar 
                todas las cookies, rechazar las no esenciales, o configurar sus preferencias individualmente.
              </p>
              
              <Button
                onClick={openCookieSettings}
                variant="premium-outline"
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Configurar Preferencias de Cookies
              </Button>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                5. Cómo Desactivar Cookies en su Navegador
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                También puede configurar su navegador para bloquear o eliminar cookies:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>
                  <strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies
                </li>
                <li>
                  <strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies
                </li>
                <li>
                  <strong>Safari:</strong> Preferencias → Privacidad → Cookies
                </li>
                <li>
                  <strong>Edge:</strong> Configuración → Privacidad → Cookies
                </li>
              </ul>
              <p className="font-body text-foreground/80 mt-4 text-sm bg-secondary/50 p-4 rounded-lg">
                <strong>Nota:</strong> Desactivar las cookies puede afectar la funcionalidad del sitio web.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                6. Cumplimiento Normativo
              </h2>
              <p className="font-body text-foreground/80">
                Esta política de cookies cumple con la normatividad colombiana vigente, incluyendo:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2 mt-4">
                <li>Ley 1581 de 2012 - Protección de Datos Personales</li>
                <li>Ley 1480 de 2011 - Estatuto del Consumidor</li>
                <li>Circular Externa 005 de 2017 de la SIC</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                7. Actualizaciones de esta Política
              </h2>
              <p className="font-body text-foreground/80">
                DOMOURBANO puede actualizar esta política de cookies periódicamente. Le recomendamos 
                revisar esta página regularmente para mantenerse informado sobre el uso de cookies.
              </p>
            </section>

            <div className="bg-secondary/50 border border-border rounded-lg p-6 mt-12">
              <p className="font-body text-foreground/80 text-center">
                Si tiene preguntas sobre el uso de cookies, contáctenos en{" "}
                <a href="mailto:contacto@origenurbano.co" className="text-gold hover:underline">
                  contacto@origenurbano.co
                </a>
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaCookies;
