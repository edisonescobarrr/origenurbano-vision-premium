import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { COMPANY } from "@/data/company";

const PoliticaCookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Breadcrumb */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-earth transition-colors mb-8 font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <article className="prose prose-lg max-w-none">
            <h1 className="font-display text-3xl sm:text-4xl font-medium text-foreground mb-8">
              Política de Cookies
            </h1>

            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              Última actualización: Septiembre 2026
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
                2. Qué Usa Este Sitio
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                Este sitio no utiliza cookies de publicidad, de redes sociales ni de análisis de terceros.
                Solo guarda en su navegador, mediante almacenamiento local, la información necesaria para
                funcionar:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Que usted ya vio el aviso de cookies, para no mostrarlo en cada visita.</li>
                <li>
                  La sesión de verificación de su correo cuando publica un inmueble, para que pueda
                  completar el envío.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                3. Detalle de la Información Guardada
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full font-body text-sm border border-border">
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
                      <td className="p-4 border-b border-border">Esencial</td>
                      <td className="p-4 border-b border-border">ARQUENO</td>
                      <td className="p-4 border-b border-border">Recordar que vio el aviso de cookies</td>
                      <td className="p-4 border-b border-border">Hasta que borre los datos del navegador</td>
                    </tr>
                    <tr>
                      <td className="p-4">Esencial</td>
                      <td className="p-4">ARQUENO (servicio Supabase)</td>
                      <td className="p-4">Sesión de verificación de correo al publicar un inmueble</td>
                      <td className="p-4">Mientras dure la sesión</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="font-body text-foreground/80 mt-4">
                Al tocar un botón de WhatsApp, usted sale de este sitio. WhatsApp aplica su propia
                política de privacidad y de cookies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                4. Cómo Eliminar Estos Datos
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                Puede eliminarlos en cualquier momento desde la configuración de su navegador:
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
              <p className="font-body text-foreground/80 mt-4 text-sm bg-secondary/50 p-4">
                <strong>Nota:</strong> si los elimina, el aviso de cookies volverá a aparecer en su próxima visita.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                5. Cumplimiento Normativo
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
                6. Actualizaciones de esta Política
              </h2>
              <p className="font-body text-foreground/80">
                Si en el futuro incorporamos herramientas de medición o de publicidad, actualizaremos esta
                política antes de activarlas.
              </p>
            </section>

            <div className="bg-secondary/50 border border-border p-6 mt-12">
              <p className="font-body text-foreground/80 text-center">
                Si tiene preguntas sobre el uso de cookies, contáctenos en{" "}
                <a href={`mailto:${COMPANY.email}`} className="text-earth hover:underline break-words">
                  {COMPANY.email}
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
