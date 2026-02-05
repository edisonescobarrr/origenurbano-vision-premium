import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Building2, Mail, Phone, MapPin, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const AvisoLegal = () => {
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
              Aviso Legal
            </h1>
            
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              Información legal del responsable del sitio web
            </p>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                1. Información del Responsable
              </h2>
              <p className="font-body text-foreground/80 mb-6">
                En cumplimiento de las obligaciones legales, se informa a los usuarios sobre los datos 
                identificativos del titular de este sitio web:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-display text-lg font-medium">Datos de la Empresa</h3>
                  </div>
                  <ul className="space-y-3 font-body text-foreground/80 text-sm">
                    <li><strong>Razón Social:</strong> ORIGENURBANO S.A.S.</li>
                    <li><strong>NIT:</strong> 000.000.000-0</li>
                    <li><strong>Matrícula Mercantil:</strong> 00-000000-00</li>
                    <li><strong>Registro Inmobiliario:</strong> RIM-00000</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-display text-lg font-medium">Ubicación</h3>
                  </div>
                  <ul className="space-y-3 font-body text-foreground/80 text-sm">
                    <li><strong>Dirección:</strong> Bogotá D.C., Colombia</li>
                    <li><strong>País:</strong> Colombia</li>
                    <li><strong>Código Postal:</strong> 110111</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-display text-lg font-medium">Contacto</h3>
                  </div>
                  <ul className="space-y-3 font-body text-foreground/80 text-sm">
                    <li><strong>Email general:</strong> contacto@origenurbano.co</li>
                    <li><strong>Email legal:</strong> legal@origenurbano.co</li>
                    <li><strong>Protección de datos:</strong> protecciondatos@origenurbano.co</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-display text-lg font-medium">Teléfono</h3>
                  </div>
                  <ul className="space-y-3 font-body text-foreground/80 text-sm">
                    <li><strong>Línea principal:</strong> +57 300 123 4567</li>
                    <li><strong>Horario:</strong> Lun - Vie: 8am - 6pm</li>
                    <li><strong>Sábados:</strong> 9am - 1pm</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                2. Actividad Económica
              </h2>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-display text-lg font-medium">Objeto Social</h3>
                </div>
                <p className="font-body text-foreground/80 mb-4">
                  ORIGENURBANO desarrolla las siguientes actividades económicas:
                </p>
                <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                  <li>Intermediación inmobiliaria (compra, venta y arrendamiento)</li>
                  <li>Asesoría y consultoría en inversiones inmobiliarias</li>
                  <li>Avalúos y valoración de propiedades</li>
                  <li>Gestión y administración de propiedades</li>
                  <li>Promoción y comercialización de proyectos inmobiliarios</li>
                </ul>
                <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                  <p className="font-body text-sm text-foreground/70">
                    <strong>Código CIIU:</strong> 6810 - Actividades inmobiliarias realizadas con bienes propios o arrendados
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                3. Registro y Autorización
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                ORIGENURBANO opera en cumplimiento de la normatividad colombiana aplicable al sector 
                inmobiliario y se encuentra debidamente registrada ante:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Cámara de Comercio de Bogotá</li>
                <li>Registro Único Tributario (RUT) - DIAN</li>
                <li>Superintendencia de Industria y Comercio (SIC)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                4. Marco Normativo
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                Las actividades de ORIGENURBANO se rigen por las siguientes normas:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Código de Comercio de Colombia</li>
                <li>Ley 820 de 2003 - Régimen de arrendamiento de vivienda urbana</li>
                <li>Ley 1581 de 2012 - Protección de datos personales</li>
                <li>Ley 1480 de 2011 - Estatuto del Consumidor</li>
                <li>Decreto 1074 de 2015 - Decreto Único Reglamentario del Sector Comercio</li>
                <li>Normatividad urbanística municipal aplicable</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                5. Propiedad del Sitio Web
              </h2>
              <p className="font-body text-foreground/80">
                Este sitio web es propiedad exclusiva de ORIGENURBANO S.A.S. El dominio 
                www.origenurbano.co se encuentra registrado y es de uso exclusivo de la empresa. 
                Cualquier reproducción total o parcial del contenido de este sitio requiere 
                autorización previa y por escrito.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                6. Responsabilidad
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                ORIGENURBANO se compromete a:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Proporcionar información veraz sobre los inmuebles publicados</li>
                <li>Actuar con transparencia en todas las operaciones</li>
                <li>Proteger los datos personales de los usuarios</li>
                <li>Cumplir con la normatividad del sector inmobiliario</li>
                <li>Mantener actualizada la información del sitio web</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                7. Información sobre Resolución de Conflictos
              </h2>
              <p className="font-body text-foreground/80">
                En caso de controversias relacionadas con el uso de este sitio web o los servicios 
                prestados por ORIGENURBANO, los usuarios pueden:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2 mt-4">
                <li>Contactar directamente a través de los canales de atención al cliente</li>
                <li>Presentar quejas ante la Superintendencia de Industria y Comercio</li>
                <li>Acudir a los mecanismos de resolución de conflictos previstos en la ley</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                8. Documentos Legales Relacionados
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                Para información completa sobre sus derechos y obligaciones, consulte:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link 
                  to="/politica-de-privacidad" 
                  className="block bg-card border border-border rounded-lg p-4 hover:border-gold/50 transition-colors"
                >
                  <h4 className="font-display font-medium text-foreground mb-1">
                    Política de Privacidad
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    Tratamiento de datos personales
                  </p>
                </Link>
                <Link 
                  to="/politica-de-cookies" 
                  className="block bg-card border border-border rounded-lg p-4 hover:border-gold/50 transition-colors"
                >
                  <h4 className="font-display font-medium text-foreground mb-1">
                    Política de Cookies
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    Uso de cookies en el sitio
                  </p>
                </Link>
                <Link 
                  to="/terminos-y-condiciones" 
                  className="block bg-card border border-border rounded-lg p-4 hover:border-gold/50 transition-colors"
                >
                  <h4 className="font-display font-medium text-foreground mb-1">
                    Términos y Condiciones
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    Condiciones de uso del sitio
                  </p>
                </Link>
              </div>
            </section>

            <div className="bg-gold/10 border border-gold/30 rounded-lg p-6 mt-12">
              <p className="font-body text-foreground/80 text-center">
                <strong>Última actualización:</strong> Febrero 2025
                <br />
                <span className="text-sm text-muted-foreground">
                  Este aviso legal puede ser actualizado sin previo aviso. 
                  Se recomienda consultarlo periódicamente.
                </span>
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AvisoLegal;
