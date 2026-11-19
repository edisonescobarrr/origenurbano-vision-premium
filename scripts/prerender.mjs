// Después de "vite build": escribe el HTML ya dibujado de cada página, más sitemap.xml, llms.txt y 404.html.
// Así buscadores, asistentes de IA y vistas previas de enlaces leen el contenido sin ejecutar JavaScript.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, getIndexablePaths, getPageMeta, absoluteUrl, COMPANY, SERVICES } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href
);

// El mapa (Leaflet) y el formulario con firma solo funcionan en el navegador: se entregan vacíos y se dibujan allá
const CLIENT_ONLY = new Set(["/buscar-zona", "/publicar-inmueble"]);

const escapeHtml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

function withMeta(html, meta) {
  const url = absoluteUrl(meta.path);
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const attributes = [
    [/(<meta name="description" content=")[^"]*(")/, description],
    [/(<meta name="robots" content=")[^"]*(")/, meta.noindex ? "noindex" : "index, follow"],
    [/(<meta property="og:title" content=")[^"]*(")/, title],
    [/(<meta property="og:description" content=")[^"]*(")/, description],
    [/(<meta property="og:url" content=")[^"]*(")/, url],
    [/(<meta name="twitter:title" content=")[^"]*(")/, title],
    [/(<meta name="twitter:description" content=")[^"]*(")/, description],
    [/(<link rel="canonical" href=")[^"]*(")/, url],
  ];

  let out = html.replace(/<title>[^<]*<\/title>/, () => `<title>${title}</title>`);
  for (const [pattern, value] of attributes) {
    if (!pattern.test(out)) throw new Error(`index.html no tiene la etiqueta esperada: ${pattern}`);
    out = out.replace(pattern, (_, start, end) => `${start}${value}${end}`);
  }
  return out;
}

const pages = getIndexablePaths();

for (const pagePath of pages) {
  let html = withMeta(template, getPageMeta(pagePath));
  if (!CLIENT_ONLY.has(pagePath)) {
    const appHtml = await render(pagePath);
    html = html.replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`);
  }
  const file = pagePath === "/" ? path.join(dist, "index.html") : path.join(dist, pagePath.slice(1), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// Vercel sirve este archivo con código 404 para cualquier dirección que no exista; React muestra la página de error
fs.writeFileSync(path.join(dist, "404.html"), withMeta(template, getPageMeta("/404")));

const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map((p) => `  <url><loc>${absoluteUrl(p)}</loc><lastmod>${today}</lastmod></url>`),
  "</urlset>",
  "",
].join("\n");
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);

const llms = [
  `# ${COMPANY.name}`,
  "",
  `> Inmobiliaria en Colombia con sede en ${COMPANY.city.split(",")[0]}. Acompaña la compra, venta, arriendo e inversión en vivienda y propiedades urbanas, con atención a nivel nacional.`,
  "",
  `Contacto: WhatsApp y teléfono ${COMPANY.phoneDisplay}, correo ${COMPANY.email}. Horario: ${COMPANY.hours.weekdays}; ${COMPANY.hours.saturday}.`,
  "",
  "## Servicios",
  "",
  ...SERVICES.map((s) => `- [${s.title}](${absoluteUrl(`/servicio/${s.slug}`)}): ${s.tagline}.`),
  "",
  "## Herramientas",
  "",
  `- [Buscar por zona](${absoluteUrl("/buscar-zona")}): elegir barrios o dibujar en el mapa la zona donde se quiere comprar, arrendar o invertir.`,
  `- [Publicar un inmueble](${absoluteUrl("/publicar-inmueble")}): formulario para propietarios que quieren vender o arrendar.`,
  "",
  "## Información legal",
  "",
  `- [Política de privacidad](${absoluteUrl("/politica-de-privacidad")})`,
  `- [Términos y condiciones](${absoluteUrl("/terminos-y-condiciones")})`,
  `- [Aviso legal](${absoluteUrl("/aviso-legal")})`,
  "",
].join("\n");
fs.writeFileSync(path.join(dist, "llms.txt"), llms);

console.log(`Pregeneradas ${pages.length} páginas, 404.html, sitemap.xml y llms.txt`);
