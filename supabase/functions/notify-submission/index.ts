// Aviso por correo de una publicación nueva.
// Recibe solo el número (id) de la publicación ya guardada, la lee desde la base de datos con la
// clave de servicio y envía un único correo por publicación. Así nadie puede usarla para mandar
// correos falsos: el texto sale siempre de la base de datos y cada publicación avisa una sola vez.
import { createClient } from "npm:@supabase/supabase-js@2";

const ALLOWED_ORIGINS = ["https://www.arqueno.com", "https://arqueno.com", "http://localhost:8082"];
const NOTIFY_EMAIL = "arquenocontacto@gmail.com";
const FROM = "ARQUENO <noreply@arqueno.com>";
const LINK_DAYS = 7;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function cors(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    Vary: "Origin",
  };
}

function reply(req: Request, status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors(req), "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors(req) });
  if (req.method !== "POST") return reply(req, 405, { error: "Método no permitido" });

  try {
    const { id } = await req.json().catch(() => ({}));
    if (typeof id !== "string" || !UUID_RE.test(id)) return reply(req, 400, { error: "id no válido" });

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // Marca la publicación como avisada; si ya lo estaba (o no existe), no se envía nada.
    const { data: row, error } = await admin
      .from("property_submissions")
      .update({ notified_at: new Date().toISOString() })
      .eq("id", id)
      .is("notified_at", null)
      .select("*")
      .maybeSingle();
    if (error) return reply(req, 500, { error: error.message });
    if (!row) return reply(req, 200, { skipped: true });

    // Enlaces temporales (7 días) para ver las fotos y la firma, que ahora son privadas.
    const paths: string[] = [...(row.photo_urls ?? []), row.signature_url].filter(Boolean);
    const links: Record<string, string> = {};
    if (paths.length) {
      const { data: signed } = await admin.storage
        .from("property-submissions")
        .createSignedUrls(paths, LINK_DAYS * 24 * 60 * 60);
      for (const s of signed ?? []) if (s.path && s.signedUrl) links[s.path] = s.signedUrl;
    }
    const photoLinks = (row.photo_urls ?? []).map((p: string) => links[p]).filter(Boolean);

    const lines = [
      "Nueva propiedad para publicar en ARQUENO:",
      "",
      row.operation_type ? `Operación: ${row.operation_type}` : null,
      row.property_type ? `Tipo: ${row.property_type}` : null,
      row.city ? `Ciudad: ${row.city}` : null,
      row.address ? `Dirección: ${row.address}` : null,
      row.price ? `Precio: $${row.price} COP` : null,
      row.area ? `Área: ${row.area} m²` : null,
      row.bedrooms ? `Habitaciones: ${row.bedrooms}` : null,
      row.bathrooms ? `Baños: ${row.bathrooms}` : null,
      row.description ? `Descripción: ${row.description}` : null,
      "",
      "Datos de contacto:",
      row.owner_name ? `Nombre: ${row.owner_name}` : null,
      row.owner_id_number ? `Cédula: ${row.owner_id_number}` : null,
      row.owner_email ? `Email (verificado): ${row.owner_email}` : null,
      row.owner_phone ? `Teléfono: ${row.owner_phone}` : null,
      "",
      photoLinks.length ? `Fotos (enlaces válidos ${LINK_DAYS} días):\n${photoLinks.join("\n")}` : null,
      row.signature_url && links[row.signature_url] ? `Firma: ${links[row.signature_url]}` : null,
      "",
      `Autorización de datos: ${row.consent_at ?? "-"} (política ${row.policy_version ?? "-"}, IP ${row.signer_ip ?? "-"})`,
      "",
      "Revisa y autoriza la publicación desde tu panel de Supabase (tabla property_submissions).",
    ].filter((line) => line !== null);

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: NOTIFY_EMAIL,
        subject: "Nueva propiedad para autorizar",
        text: lines.join("\n"),
      }),
    });

    if (!resendResponse.ok) {
      // Se quita la marca para poder reintentar el aviso.
      await admin.from("property_submissions").update({ notified_at: null }).eq("id", id);
      return reply(req, 502, { error: await resendResponse.text() });
    }

    return reply(req, 200, { success: true });
  } catch (err) {
    return reply(req, 500, { error: String(err) });
  }
});
