import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { COMPANY } from "@/data/company";

const TerminosCondiciones = () => {
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
              Términos y Condiciones de Uso
            </h1>

            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              Última actualización: Septiembre 2026
            </p>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                1. Aceptación de los Términos
              </h2>
              <p className="font-body text-foreground/80">
                Al acceder y utilizar el sitio web de ARQUENO (en adelante "el Sitio"), usted acepta
                estar sujeto a estos términos y condiciones de uso. Si no está de acuerdo con alguna
                parte de estos términos, le solicitamos que no utilice nuestro sitio web.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                2. Uso Permitido del Sitio
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                El usuario se compromete a utilizar el Sitio de manera lícita y conforme a estos términos.
                Está prohibido:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Utilizar el Sitio para fines ilegales o no autorizados</li>
                <li>Intentar acceder a áreas restringidas del sistema</li>
                <li>Reproducir, duplicar o copiar contenido sin autorización</li>
                <li>Transmitir virus, malware o código malicioso</li>
                <li>Recopilar información de otros usuarios sin consentimiento</li>
                <li>Interferir con el funcionamiento normal del Sitio</li>
                <li>Suplantar la identidad de otra persona o entidad</li>
                <li>Publicar información falsa o engañosa sobre propiedades</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                3. Servicios Inmobiliarios
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                ARQUENO ofrece los siguientes servicios a través de este Sitio:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Promoción y exhibición de propiedades inmobiliarias</li>
                <li>Acompañamiento en procesos de compra y venta de inmuebles</li>
                <li>Asesoría técnica e inmobiliaria personalizada</li>
                <li>Información sobre el mercado inmobiliario colombiano</li>
                <li>Gestión de contacto entre propietarios e interesados</li>
              </ul>
              <div className="bg-card border border-border rounded-lg p-6 mt-6">
                <p className="font-body text-foreground/80 text-sm">
                  <strong>Importante:</strong> Los precios publicados están en pesos colombianos y son los
                  que fija el propietario. Si un precio o la disponibilidad cambian, actualizamos la
                  publicación en el Sitio. Antes de cerrar un negocio, confirme las condiciones finales
                  con nosotros por escrito.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                4. Responsabilidades del Usuario
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                El usuario es responsable de:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Proporcionar información veraz y actualizada</li>
                <li>Verificar la información de propiedades antes de tomar decisiones</li>
                <li>Cumplir con la legislación colombiana aplicable</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                5. Responsabilidades de ARQUENO
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                ARQUENO se compromete a:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Proporcionar información actualizada sobre propiedades disponibles</li>
                <li>Actuar con profesionalismo y ética en la intermediación inmobiliaria</li>
                <li>Proteger los datos personales de los usuarios</li>
                <li>Facilitar la comunicación entre las partes interesadas</li>
                <li>Ofrecer asesoría transparente y honesta</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                6. Propiedad Intelectual
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                Todo el contenido del Sitio, incluyendo pero no limitado a:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Textos, gráficos, logotipos e imágenes</li>
                <li>Diseño y estructura del sitio web</li>
                <li>Marcas comerciales y nombres de dominio</li>
                <li>Software y código fuente</li>
                <li>Fotografías de propiedades</li>
              </ul>
              <p className="font-body text-foreground/80 mt-4">
                Son propiedad exclusiva de ARQUENO o de sus respectivos propietarios, y están
                protegidos por las leyes de propiedad intelectual de Colombia y tratados internacionales.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                7. Exclusión de Garantías
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                ARQUENO no garantiza:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Que el Sitio esté disponible de forma ininterrumpida</li>
                <li>Que las transacciones inmobiliarias se concreten</li>
                <li>La exactitud de la información proporcionada por terceros</li>
                <li>El resultado de cualquier negociación inmobiliaria</li>
              </ul>
              <p className="font-body text-foreground/80 mt-4">
                ARQUENO acompaña a las partes, pero el negocio lo celebran directamente el comprador y
                el vendedor. Nada de lo anterior limita los derechos que la ley le reconoce como
                consumidor.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                8. Limitación de Responsabilidad
              </h2>
              <p className="font-body text-foreground/80">
                En ningún caso ARQUENO será responsable por daños indirectos, incidentales,
                especiales o consecuentes que surjan del uso o la imposibilidad de uso del Sitio,
                incluyendo pérdida de beneficios, pérdida de datos o interrupción del negocio,
                incluso si se ha advertido de la posibilidad de tales daños, salvo en los casos en que la
                ley no permita limitar la responsabilidad (por ejemplo, dolo o culpa grave, o los
                derechos del consumidor de la Ley 1480 de 2011).
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                9. Enlaces a Terceros
              </h2>
              <p className="font-body text-foreground/80">
                El Sitio puede contener enlaces a sitios web de terceros. ARQUENO no tiene control
                sobre el contenido de estos sitios y no se hace responsable de su contenido, políticas
                de privacidad o prácticas. La inclusión de enlaces no implica respaldo o asociación
                con dichos sitios.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                10. Modificaciones
              </h2>
              <p className="font-body text-foreground/80">
                ARQUENO se reserva el derecho de modificar estos términos y condiciones en
                cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el
                Sitio, con su fecha, y no afectan los acuerdos que ya estén en curso.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                11. Jurisdicción y Ley Aplicable
              </h2>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="font-body text-foreground/80">
                  Estos términos se rigen por las leyes de la República de Colombia. Si tiene una
                  queja, escríbanos primero a {COMPANY.email}: le responderemos en máximo 15 días
                  hábiles. Como consumidor, usted conserva siempre su derecho a acudir a la
                  Superintendencia de Industria y Comercio (SIC) o al juez de su domicilio.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                12. Disposiciones Finales
              </h2>
              <p className="font-body text-foreground/80">
                Si alguna disposición de estos términos se considera inválida o inaplicable, dicha
                disposición será eliminada sin afectar la validez de las demás disposiciones. La
                falta de ejercicio de cualquier derecho bajo estos términos no constituirá una
                renuncia al mismo.
              </p>
            </section>

            <div className="bg-secondary/50 border border-border rounded-lg p-6 mt-12">
              <p className="font-body text-foreground/80 text-center">
                Si tiene preguntas sobre estos términos, contáctenos en{" "}
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

export default TerminosCondiciones;