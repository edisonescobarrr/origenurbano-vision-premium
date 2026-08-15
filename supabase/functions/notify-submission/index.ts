const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const NOTIFY_EMAIL = "arquenocontacto@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { record } = await req.json();

    const lines = [
      "Nueva propiedad para publicar en ARQUENO:",
      "",
      record.operation_type ? `Operación: ${record.operation_type}` : null,
      record.property_type ? `Tipo: ${record.property_type}` : null,
      record.city ? `Ciudad: ${record.city}` : null,
      record.address ? `Dirección: ${record.address}` : null,
      record.price ? `Precio: $${record.price} COP` : null,
      record.area ? `Área: ${record.area} m²` : null,
      record.bedrooms ? `Habitaciones: ${record.bedrooms}` : null,
      record.bathrooms ? `Baños: ${record.bathrooms}` : null,
      record.description ? `Descripción: ${record.description}` : null,
      "",
      "Datos de contacto:",
      record.owner_name ? `Nombre: ${record.owner_name}` : null,
      record.owner_id_number ? `Cédula: ${record.owner_id_number}` : null,
      record.owner_email ? `Email: ${record.owner_email}` : null,
      record.owner_phone ? `Teléfono: ${record.owner_phone}` : null,
      "",
      Array.isArray(record.photo_urls) && record.photo_urls.length
        ? `Fotos:\n${record.photo_urls.join("\n")}`
        : null,
      record.signature_url ? `Firma: ${record.signature_url}` : null,
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
        from: "ARQUENO <onboarding@resend.dev>",
        to: NOTIFY_EMAIL,
        subject: "Nueva propiedad para autorizar",
        text: lines.join("\n"),
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      return new Response(JSON.stringify({ error: errText }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
