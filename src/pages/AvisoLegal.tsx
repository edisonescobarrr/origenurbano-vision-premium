import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Building2, Mail, Phone, MapPin, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { COMPANY } from "@/data/company";

const AvisoLegal = () => {
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
                    <li><strong>Razón Social:</strong> {COMPANY.legalName}</li>
                    <li><strong>Nombre comercial:</strong> {COMPANY.name}</li>
                    <li><strong>NIT:</strong> {COMPANY.nit}</li>
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
                    <li><strong>Dirección:</strong> {COMPANY.address}</li>
                    <li>Atención a todo el país por canales digitales</li>
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
                    <li className="break-words"><strong>Correo:</strong> {COMPANY.email}</li>
                    <li>Consultas generales, legales y de protección de datos</li>
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
                    <li><strong>Línea principal:</strong> {COMPANY.phoneDisplay}</li>
                    <li><strong>Horario:</strong> {COMPANY.hours.weekdays}</li>
                    <li>{COMPANY.hours.saturday}</li>
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
                <div className="mb-4 p-4 bg-secondary/50 rounded-lg">
                  <p className="font-body text-sm text-foreground/70">
                    <strong>Actividad principal registrada:</strong> {COMPANY.registeredActivity}
                  </p>
                </div>
                <p className="font-body text-foreground/80 mb-4">
                  A través de este sitio, ARQUENO ofrece:
                </p>
                <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                  <li>Publicación y promoción de inmuebles de propietarios que lo autorizan</li>
                  <li>Acompañamiento a compradores y vendedores en el proceso de compra y venta</li>
                  <li>Asesoría técnica e inmobiliaria sobre inmuebles y zonas</li>
                </ul>
                <p className="font-body text-sm text-foreground/70 mt-4">
                  ARQUENO no realiza avalúos certificados ni administra inmuebles en arriendo. Las
                  estimaciones de precio que compartimos son orientativas y se basan en el mercado.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                3. Registro
              </h2>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Sociedad por acciones simplificada inscrita en el registro mercantil</li>
                <li>Inscrita en el Registro Único Tributario (RUT) de la DIAN con NIT {COMPANY.nit}</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                4. Marco Normativo
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                Las actividades de ARQUENO se rigen por las siguientes normas:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Código de Comercio de Colombia</li>
                <li>Ley 1581 de 2012 - Protección de datos personales</li>
                <li>Ley 1480 de 2011 - Estatuto del Consumidor</li>
                <li>Ley 527 de 1999 - Comercio electrónico y mensajes de datos</li>
                <li>Decreto 1074 de 2015 - Decreto Único Reglamentario del Sector Comercio</li>
                <li>Normatividad urbanística municipal aplicable</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                5. Propiedad del Sitio Web
              </h2>
              <p className="font-body text-foreground/80">
                Este sitio web es propiedad exclusiva de {COMPANY.legalName}. El dominio{" "}
                {COMPANY.domain} se encuentra registrado y es de uso exclusivo de la empresa.
                Cualquier reproducción total o parcial del contenido de este sitio requiere
                autorización previa y por escrito.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                6. Responsabilidad
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                ARQUENO se compromete a:
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
                prestados por ARQUENO, los usuarios pueden:
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
                <strong>Última actualización:</strong> Noviembre 2026
                <br />
                <span className="text-sm text-muted-foreground">
                  Los cambios a este aviso se publican en esta misma página con su fecha.
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