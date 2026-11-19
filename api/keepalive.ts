// Vercel la ejecuta una vez al día (ver "crons" en vercel.json). Una consulta diaria evita que Supabase
// pause el proyecto gratuito por inactividad, que deja caído el formulario de publicar inmueble.
export async function GET() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return Response.json({ ok: false, error: "Faltan las variables de Supabase" }, { status: 500 });
  }

  const res = await fetch(`${url}/rest/v1/rpc/keepalive`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: "{}",
  });

  return Response.json({ ok: res.ok, status: res.status }, { status: res.ok ? 200 : 502 });
}
