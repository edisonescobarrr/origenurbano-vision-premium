import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PoliticaPrivacidad = () => {
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
              Política de Privacidad y Tratamiento de Datos Personales
            </h1>
            
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              Última actualización: Febrero 2025
            </p>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                1. Responsable del Tratamiento
              </h2>
              <div className="bg-card border border-border rounded-lg p-6 font-body">
                <p className="mb-2"><strong>Razón Social:</strong> DOMOURBANO S.A.S.</p>
                <p className="mb-2"><strong>NIT:</strong> 000.000.000-0</p>
                <p className="mb-2"><strong>Dirección:</strong> Bogotá, Colombia</p>
                <p className="mb-2"><strong>Teléfono:</strong> +57 321 589 3324</p>
                <p><strong>Correo electrónico:</strong> contacto@domourbano.co</p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                2. Datos Personales Recolectados
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                DOMOURBANO recopila los siguientes datos personales con el consentimiento del titular:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Nombre completo</li>
                <li>Número de identificación (cédula, NIT)</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono móvil y/o fijo</li>
                <li>Dirección de residencia o trabajo</li>
                <li>Información financiera (cuando sea necesaria para transacciones inmobiliarias)</li>
                <li>Datos de navegación y cookies (ver Política de Cookies)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                3. Finalidades del Tratamiento
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                Los datos personales serán utilizados para las siguientes finalidades:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Gestionar solicitudes de información sobre propiedades inmobiliarias</li>
                <li>Facilitar procesos de compra, venta o arrendamiento de inmuebles</li>
                <li>Enviar comunicaciones comerciales y promocionales (con consentimiento previo)</li>
                <li>Proporcionar asesoría inmobiliaria personalizada</li>
                <li>Cumplir con obligaciones legales y contractuales</li>
                <li>Mejorar nuestros servicios y experiencia del usuario</li>
                <li>Realizar análisis estadísticos y de mercado</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                4. Derechos del Titular
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                De acuerdo con la Ley 1581 de 2012, usted tiene derecho a:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li><strong>Conocer:</strong> Acceder a sus datos personales en cualquier momento</li>
                <li><strong>Actualizar:</strong> Rectificar datos inexactos o incompletos</li>
                <li><strong>Suprimir:</strong> Solicitar la eliminación de sus datos cuando no sean necesarios</li>
                <li><strong>Revocar:</strong> Retirar su consentimiento para el tratamiento</li>
                <li><strong>Oponerse:</strong> Rechazar el tratamiento para fines específicos</li>
                <li><strong>Portabilidad:</strong> Solicitar sus datos en formato estructurado</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                5. Canales de Contacto para Ejercer sus Derechos
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                Para ejercer sus derechos como titular de datos personales, puede contactarnos a través de:
              </p>
              <div className="bg-card border border-border rounded-lg p-6 font-body">
                <p className="mb-2"><strong>Correo electrónico:</strong> protecciondatos@domourbano.co</p>
                <p className="mb-2"><strong>Teléfono:</strong> +57 321 589 3324</p>
                <p className="mb-2"><strong>Dirección física:</strong> Bogotá, Colombia</p>
                <p><strong>Horario de atención:</strong> Lunes a Viernes de 8:00 a.m. a 6:00 p.m.</p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                6. Conservación de la Información
              </h2>
              <p className="font-body text-foreground/80">
                Los datos personales serán conservados durante el tiempo necesario para cumplir con las 
                finalidades descritas en esta política, o mientras exista una relación contractual o legal 
                vigente. Una vez cumplida la finalidad, los datos serán eliminados de forma segura, salvo 
                que exista obligación legal de conservarlos por un período adicional.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                7. Transferencia de Datos a Terceros
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                DOMOURBANO podrá compartir sus datos personales con:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Entidades financieras para procesos de crédito inmobiliario</li>
                <li>Notarías y oficinas de registro para formalización de transacciones</li>
                <li>Autoridades competentes cuando sea requerido por ley</li>
                <li>Proveedores de servicios tecnológicos (bajo contratos de confidencialidad)</li>
              </ul>
              <p className="font-body text-foreground/80 mt-4">
                En todos los casos, garantizamos que los terceros receptores cumplan con estándares 
                adecuados de protección de datos.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                8. Legislación Aplicable
              </h2>
              <p className="font-body text-foreground/80">
                Esta política se rige por la normatividad colombiana vigente en materia de protección 
                de datos personales, principalmente:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2 mt-4">
                <li>Ley 1581 de 2012 - Ley de Protección de Datos Personales</li>
                <li>Decreto 1377 de 2013 - Reglamentario de la Ley 1581</li>
                <li>Decreto 1074 de 2015 - Decreto Único Reglamentario del Sector Comercio</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                9. Modificaciones a esta Política
              </h2>
              <p className="font-body text-foreground/80">
                DOMOURBANO se reserva el derecho de modificar esta política en cualquier momento. 
                Las modificaciones serán comunicadas a través de nuestro sitio web y/o por correo 
                electrónico cuando sean sustanciales.
              </p>
            </section>

            <div className="bg-secondary/50 border border-border rounded-lg p-6 mt-12">
              <p className="font-body text-foreground/80 text-center">
                Si tiene preguntas sobre esta política, contáctenos en{" "}
                <a href="mailto:protecciondatos@domourbano.co" className="text-gold hover:underline">
                  protecciondatos@domourbano.co
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

export default PoliticaPrivacidad;