import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { COMPANY } from "@/data/company";

const PoliticaPrivacidad = () => {
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
              Política de Privacidad y Tratamiento de Datos Personales
            </h1>

            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              Última actualización: Noviembre 2026 (versión privacidad-2026-11)
            </p>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                1. Responsable del Tratamiento
              </h2>
              <div className="bg-card border border-border rounded-lg p-6 font-body">
                <p className="mb-2"><strong>Razón Social:</strong> {COMPANY.legalName}</p>
                <p className="mb-2"><strong>NIT:</strong> {COMPANY.nit}</p>
                <p className="mb-2"><strong>Dirección:</strong> {COMPANY.address}</p>
                <p className="mb-2"><strong>Teléfono:</strong> {COMPANY.phoneDisplay}</p>
                <p className="break-words"><strong>Correo electrónico:</strong> {COMPANY.email}</p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-medium text-foreground mb-4">
                2. Datos Personales Recolectados
              </h2>
              <p className="font-body text-foreground/80 mb-4">
                ARQUENO recopila los siguientes datos personales con el consentimiento del titular:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li>Nombre completo, correo electrónico y teléfono (formulario de contacto y de publicación)</li>
                <li>Número de cédula del propietario, solo cuando publica un inmueble</li>
                <li>
                  Dirección y fotografías del inmueble, y su firma en la autorización de publicación,
                  cuando publica un inmueble en el sitio
                </li>
                <li>
                  Prueba de su autorización: fecha y hora, versión de esta política, dirección IP y
                  navegador desde el que firmó
                </li>
                <li>Lo mínimo para que el sitio funcione en su navegador (ver Política de Cookies)</li>
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
                <li>Responder sus consultas sobre inmuebles y servicios</li>
                <li>Verificar su correo electrónico antes de recibir una publicación</li>
                <li>Revisar, publicar y promocionar el inmueble que usted autoriza</li>
                <li>Contactarlo para coordinar visitas, ofertas y el proceso de compra o venta</li>
                <li>Conservar la prueba de su autorización y cumplir obligaciones legales</li>
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
                <li><strong>Conocer, actualizar y rectificar</strong> sus datos personales</li>
                <li><strong>Solicitar prueba</strong> de la autorización que nos dio</li>
                <li><strong>Ser informado</strong> sobre el uso que les hemos dado</li>
                <li>
                  <strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC),
                  después de haber hecho su consulta o reclamo ante nosotros
                </li>
                <li>
                  <strong>Revocar</strong> la autorización y/o <strong>pedir que se borren</strong> sus datos,
                  salvo que exista un deber legal o contractual de conservarlos
                </li>
                <li><strong>Acceder gratis</strong> a sus datos personales</li>
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
                <p className="mb-2 break-words"><strong>Correo electrónico:</strong> {COMPANY.email}</p>
                <p className="mb-2"><strong>Teléfono:</strong> {COMPANY.phoneDisplay}</p>
                <p className="mb-2"><strong>Dirección física:</strong> {COMPANY.address}</p>
                <p><strong>Horario de atención:</strong> Lunes a Viernes de 8:00 a.m. a 6:00 p.m.</p>
              </div>
              <p className="font-body text-foreground/80 mt-4">
                Indique su nombre, cédula, lo que solicita y cómo prefiere que le respondamos.
                Respondemos las <strong>consultas</strong> en máximo 10 días hábiles (prorrogables 5 días
                más, avisándole el motivo) y los <strong>reclamos</strong> en máximo 15 días hábiles
                (prorrogables 8 días más), según los artículos 14 y 15 de la Ley 1581 de 2012.
              </p>
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
                ARQUENO no vende sus datos. Para que el sitio funcione, usamos estos proveedores, que
                tratan los datos solo por encargo nuestro:
              </p>
              <ul className="list-disc pl-6 font-body text-foreground/80 space-y-2">
                <li><strong>Supabase</strong>: base de datos, verificación de correo y archivos (fotos y firma)</li>
                <li><strong>Vercel</strong>: alojamiento del sitio web</li>
                <li><strong>Resend</strong>: envío de correos de verificación y avisos</li>
                <li>
                  <strong>WhatsApp (Meta)</strong>: solo cuando usted decide escribirnos por WhatsApp; el
                  mensaje lo envía usted desde su aplicación
                </li>
              </ul>
              <p className="font-body text-foreground/80 mt-4">
                Estos proveedores pueden tener servidores fuera de Colombia (por ejemplo, en Estados
                Unidos). Al aceptar esta política, usted autoriza esa transmisión internacional de sus
                datos, conforme al artículo 26 de la Ley 1581 de 2012. También podremos entregar datos
                a notarías u oficinas de registro cuando usted avance en una compra o venta, y a las
                autoridades cuando la ley lo exija.
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
                Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha.
                Si el cambio afecta las finalidades o los responsables, se lo avisaremos y, cuando la
                ley lo exija, le pediremos una nueva autorización.
              </p>
            </section>

            <div className="bg-secondary/50 border border-border rounded-lg p-6 mt-12">
              <p className="font-body text-foreground/80 text-center">
                Si tiene preguntas sobre esta política, contáctenos en{" "}
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

export default PoliticaPrivacidad;