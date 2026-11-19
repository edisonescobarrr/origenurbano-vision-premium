-- Blindaje del formulario "Publicar inmueble" (18-nov-2026)
-- Se pega una sola vez en Supabase > SQL Editor > Run.
-- Qué hace:
--   1. Cierra la tabla: ya nadie puede escribir ni leer directamente desde el navegador.
--   2. Crea una única "puerta" (submit_property) que solo acepta envíos de correos verificados,
--      máximo 3 por día por persona, y guarda la prueba de la autorización (fecha, versión de la
--      política, IP y navegador).
--   3. Vuelve privada la carpeta de fotos y firmas, y cada persona solo puede subir a su propia carpeta.

-- 1. Columnas nuevas
alter table public.property_submissions
  add column if not exists user_id uuid,
  add column if not exists consent_at timestamptz,
  add column if not exists policy_version text,
  add column if not exists signer_ip text,
  add column if not exists signer_user_agent text,
  add column if not exists notified_at timestamptz;

-- 2. Cerrar la tabla
alter table public.property_submissions enable row level security;
drop policy if exists "Allow public inserts" on public.property_submissions;
revoke all on public.property_submissions from anon, authenticated;

-- 3. Única puerta de entrada
create or replace function public.submit_property(payload jsonb)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  mail text := auth.jwt() ->> 'email';
  hdrs jsonb := coalesce(nullif(current_setting('request.headers', true), '')::jsonb, '{}'::jsonb);
  photos text[] := coalesce(array(select jsonb_array_elements_text(payload -> 'photo_paths')), '{}');
  sig text := nullif(payload ->> 'signature_path', '');
  new_id uuid;
begin
  if uid is null or mail is null then
    raise exception 'Debes verificar tu correo antes de enviar.' using errcode = '42501';
  end if;

  if (select count(*) from property_submissions
      where user_id = uid and created_at > now() - interval '1 day') >= 3 then
    raise exception 'Llegaste al máximo de 3 publicaciones por día. Intenta mañana.';
  end if;

  if cardinality(photos) > 10 then
    raise exception 'Máximo 10 fotos.';
  end if;

  if sig is null then
    raise exception 'Falta la firma.';
  end if;

  if exists (select 1 from unnest(photos || sig) p where split_part(p, '/', 1) <> uid::text) then
    raise exception 'Archivos no válidos.';
  end if;

  if coalesce((payload ->> 'data_consent')::boolean, false) is not true then
    raise exception 'Falta la autorización de tratamiento de datos.';
  end if;

  insert into property_submissions (
    user_id, operation_type, property_type, city, address, price, area, bedrooms, bathrooms,
    description, owner_name, owner_id_number, owner_email, owner_phone, photo_urls, signature_url,
    consent_at, policy_version, signer_ip, signer_user_agent
  ) values (
    uid,
    left(payload ->> 'operation_type', 40),
    left(payload ->> 'property_type', 40),
    left(payload ->> 'city', 120),
    left(payload ->> 'address', 200),
    nullif(payload ->> 'price', '')::numeric,
    nullif(payload ->> 'area', '')::numeric,
    nullif(payload ->> 'bedrooms', '')::integer,
    nullif(payload ->> 'bathrooms', '')::integer,
    left(payload ->> 'description', 3000),
    left(payload ->> 'owner_name', 120),
    left(payload ->> 'owner_id_number', 30),
    mail,
    left(payload ->> 'owner_phone', 30),
    photos,
    sig,
    now(),
    left(payload ->> 'policy_version', 40),
    split_part(coalesce(hdrs ->> 'x-forwarded-for', hdrs ->> 'x-real-ip', ''), ',', 1),
    left(hdrs ->> 'user-agent', 300)
  )
  returning id into new_id;

  return new_id;
end;
$$;

revoke all on function public.submit_property(jsonb) from public, anon;
grant execute on function public.submit_property(jsonb) to authenticated;

-- 4. Carpeta privada para fotos y firmas
update storage.buckets
set public = false,
    file_size_limit = 10485760,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'property-submissions';

do $$
declare p record;
begin
  for p in
    select policyname from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and (coalesce(qual, '') || coalesce(with_check, '')) like '%property-submissions%'
  loop
    execute format('drop policy %I on storage.objects', p.policyname);
  end loop;
end $$;

create policy "Subir solo a tu propia carpeta"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'property-submissions'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
