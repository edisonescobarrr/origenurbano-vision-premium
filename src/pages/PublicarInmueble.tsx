import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft,
  Upload,
  Building2,
  MapPin,
  DollarSign,
  FileText,
  Phone,
  Mail,
  User,
  X,
  Loader2,
  PenLine,
  CheckCircle2,
} from "lucide-react";
import { CitySearchCombobox } from "@/components/CitySearchCombobox";
import { useEffect, useRef, useState } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import SignaturePad, { SignaturePadHandle } from "@/components/SignaturePad";

const MAX_PHOTOS = 10;
const MAX_PHOTO_SIZE_MB = 10;

const PublicarInmueble = () => {
  const [searchParams] = useSearchParams();

  // Pre-fill from URL params
  const initialOperationType = searchParams.get("operacion") || "";
  const initialPropertyType = searchParams.get("tipo") || "";
  const initialCity = searchParams.get("ciudad") || "";

  const [formData, setFormData] = useState({
    operationType: initialOperationType,
    propertyType: initialPropertyType,
    city: initialCity,
    address: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    ownerName: "",
    ownerIdNumber: "",
    ownerEmail: "",
    ownerPhone: "",
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  const signaturePadRef = useRef<SignaturePadHandle>(null);

  useEffect(() => {
    return () => {
      photoPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [photoPreviews]);

  const operationTypeLabels: Record<string, string> = {
    vender: "Vender",
    arrendar: "Arrendar",
  };

  const propertyTypeLabels: Record<string, string> = {
    apartamento: "Apartamento",
    casa: "Casa",
    lote: "Lote",
    proyecto: "Proyecto inmobiliario",
    local: "Local comercial",
    oficina: "Oficina",
    bodega: "Bodega",
    finca: "Finca / Casa campestre",
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "ownerEmail") {
      setOtpSent(false);
      setEmailVerified(false);
      setOtpCode("");
      setOtpError(null);
    }
  };

  const sendOtp = async () => {
    if (!formData.ownerEmail || !supabase) return;
    setOtpError(null);
    setIsSendingOtp(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.ownerEmail,
        options: { shouldCreateUser: true },
      });
      if (error) throw error;
      setOtpSent(true);
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : "No se pudo enviar el código.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtpCode = async () => {
    if (!otpCode || !supabase) return;
    setOtpError(null);
    setIsVerifyingOtp(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: formData.ownerEmail,
        token: otpCode,
        type: "email",
      });
      if (error) throw error;
      setEmailVerified(true);
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : "Código incorrecto o vencido.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (files.length === 0) return;

    setPhotoError(null);

    const oversized = files.find((f) => f.size > MAX_PHOTO_SIZE_MB * 1024 * 1024);
    if (oversized) {
      setPhotoError(`"${oversized.name}" pesa más de ${MAX_PHOTO_SIZE_MB} MB. Elige una foto más liviana.`);
      return;
    }

    setPhotos((prev) => {
      const combined = [...prev, ...files];
      if (combined.length > MAX_PHOTOS) {
        setPhotoError(`Máximo ${MAX_PHOTOS} fotos. Se agregaron las primeras que cupieron.`);
      }
      const next = combined.slice(0, MAX_PHOTOS);
      setPhotoPreviews(next.map((f) => URL.createObjectURL(f)));
      return next;
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const buildWhatsAppMessage = () => {
    const lines: (string | null)[] = [
      "Hola, quiero publicar un inmueble:",
      "",
      formData.operationType ? `Operación: ${operationTypeLabels[formData.operationType]}` : null,
      formData.propertyType ? `Tipo: ${propertyTypeLabels[formData.propertyType]}` : null,
      formData.city ? `Ciudad: ${formData.city}` : null,
      formData.address ? `Dirección: ${formData.address}` : null,
      formData.price ? `Precio: $${formData.price} COP` : null,
      formData.area ? `Área: ${formData.area} m²` : null,
      formData.bedrooms ? `Habitaciones: ${formData.bedrooms}` : null,
      formData.bathrooms ? `Baños: ${formData.bathrooms}` : null,
      formData.description ? `Descripción: ${formData.description}` : null,
      "",
      "Datos de contacto:",
      formData.ownerName ? `Nombre: ${formData.ownerName}` : null,
      formData.ownerEmail ? `Email: ${formData.ownerEmail}` : null,
      formData.ownerPhone ? `Teléfono: ${formData.ownerPhone}` : null,
      "",
      "Fotos y contrato firmado quedaron guardados en el sistema.",
    ].filter((line) => line !== null);

    return lines.join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!emailVerified) {
      setSubmitError("Verifica tu correo antes de enviar la publicación.");
      return;
    }

    if (signaturePadRef.current?.isEmpty()) {
      setSubmitError("Falta tu firma en el contrato de autorización antes de enviar.");
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setSubmitError("El almacenamiento todavía no está configurado. Por ahora no se pueden guardar fotos ni firma.");
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionId = crypto.randomUUID();

      const photoUrls: string[] = [];
      for (let i = 0; i < photos.length; i++) {
        const file = photos[i];
        const ext = file.name.split(".").pop() || "jpg";
        const path = `${submissionId}/photo-${i}.${ext}`;
        const { error } = await supabase.storage.from("property-submissions").upload(path, file);
        if (error) throw error;
        const { data } = supabase.storage.from("property-submissions").getPublicUrl(path);
        photoUrls.push(data.publicUrl);
      }

      const signatureBlob = await signaturePadRef.current?.getBlob();
      let signatureUrl: string | null = null;
      if (signatureBlob) {
        const path = `${submissionId}/signature.png`;
        const { error } = await supabase.storage.from("property-submissions").upload(path, signatureBlob);
        if (error) throw error;
        const { data } = supabase.storage.from("property-submissions").getPublicUrl(path);
        signatureUrl = data.publicUrl;
      }

      const record = {
        operation_type: formData.operationType || null,
        property_type: formData.propertyType || null,
        city: formData.city || null,
        address: formData.address || null,
        price: formData.price ? Number(formData.price) : null,
        area: formData.area ? Number(formData.area) : null,
        bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
        description: formData.description || null,
        owner_name: formData.ownerName || null,
        owner_id_number: formData.ownerIdNumber || null,
        owner_email: formData.ownerEmail || null,
        owner_phone: formData.ownerPhone || null,
        photo_urls: photoUrls,
        signature_url: signatureUrl,
      };

      const { error: insertError } = await supabase.from("property_submissions").insert(record);
      if (insertError) throw insertError;

      // Best-effort email notification — the submission is already saved even if this fails.
      supabase.functions.invoke("notify-submission", { body: { record } }).catch(() => {});

      window.open(getWhatsAppUrl(buildWhatsAppMessage()), "_blank", "noopener,noreferrer");
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        "No se pudo guardar la publicación. Revisa tu conexión e intenta de nuevo. " +
          (err instanceof Error ? err.message : ""),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-foreground mb-3">¡Publicación enviada!</h1>
          <p className="text-muted-foreground mb-6">
            Guardamos tus fotos y el contrato firmado. Te abrimos WhatsApp para confirmar el envío del mensaje.
          </p>
          <Link to="/">
            <Button variant="outline">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display text-[32px] font-medium text-foreground">Publicar Inmueble</h1>
            <p className="text-sm text-muted-foreground">Completa los datos de tu propiedad</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Property Details Section */}
          <section className="bg-card border border-border p-6 space-y-6">
            <div className="flex items-center gap-2 text-foreground">
              <Building2 className="w-5 h-5 text-gold" />
              <h2 className="font-display text-[22px] font-medium">Detalles del Inmueble</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tipo de operación */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tipo de operación</label>
                <Select value={formData.operationType} onValueChange={(v) => updateField("operationType", v)}>
                  <SelectTrigger className="h-12 bg-secondary/40 border-border/40">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="vender">Vender</SelectItem>
                    <SelectItem value="arrendar">Arrendar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tipo de inmueble */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tipo de inmueble</label>
                <Select value={formData.propertyType} onValueChange={(v) => updateField("propertyType", v)}>
                  <SelectTrigger className="h-12 bg-secondary/40 border-border/40">
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {Object.entries(propertyTypeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ciudad / municipio */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground">Ciudad o municipio</label>
                <CitySearchCombobox
                  value={formData.city}
                  onValueChange={(v) => updateField("city", v)}
                  placeholder="Buscar municipio en Colombia…"
                  triggerClassName="h-12"
                />
              </div>

              {/* Dirección */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Dirección</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Dirección del inmueble"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="h-12 pl-10 bg-secondary/40 border-border/40"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Characteristics Section */}
          <section className="bg-card border border-border p-6 space-y-6">
            <div className="flex items-center gap-2 text-foreground">
              <FileText className="w-5 h-5 text-gold" />
              <h2 className="font-display text-[22px] font-medium">Características</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Precio */}
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium text-foreground">Precio (COP)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="Ej: 350000000"
                    value={formData.price}
                    onChange={(e) => updateField("price", e.target.value)}
                    className="h-12 pl-10 bg-secondary/40 border-border/40"
                  />
                </div>
              </div>

              {/* Área */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Área (m²)</label>
                <Input
                  type="number"
                  placeholder="Ej: 85"
                  value={formData.area}
                  onChange={(e) => updateField("area", e.target.value)}
                  className="h-12 bg-secondary/40 border-border/40"
                />
              </div>

              {/* Habitaciones */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Habitaciones</label>
                <Select value={formData.bedrooms} onValueChange={(v) => updateField("bedrooms", v)}>
                  <SelectTrigger className="h-12 bg-secondary/40 border-border/40">
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Baños */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Baños</label>
                <Select value={formData.bathrooms} onValueChange={(v) => updateField("bathrooms", v)}>
                  <SelectTrigger className="h-12 bg-secondary/40 border-border/40">
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Descripción</label>
              <Textarea
                placeholder="Describe las características principales de tu inmueble..."
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="min-h-[120px] bg-secondary/40 border-border/40 resize-none"
              />
            </div>

            {/* Fotos */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Fotos del inmueble</label>

              {photoPreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                  {photoPreviews.map((url, i) => (
                    <div key={url} className="relative aspect-square overflow-hidden border border-border/60">
                      <img src={url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 bg-background/80 rounded-full p-1 hover:bg-background"
                        aria-label="Quitar foto"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {photos.length < MAX_PHOTOS && (
                <label className="block border-2 border-dashed border-border/60 p-8 text-center hover:border-gold/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Haz clic para seleccionar tus fotos</p>
                  <p className="text-xs text-muted-foreground mt-1">Máximo {MAX_PHOTOS} fotos, JPG o PNG</p>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoChange} />
                </label>
              )}
              {photoError && <p className="text-sm text-destructive">{photoError}</p>}
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-card border border-border p-6 space-y-6">
            <div className="flex items-center gap-2 text-foreground">
              <Phone className="w-5 h-5 text-gold" />
              <h2 className="font-display text-[22px] font-medium">Datos de Contacto</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Nombre */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nombre completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tu nombre"
                    value={formData.ownerName}
                    onChange={(e) => updateField("ownerName", e.target.value)}
                    className="h-12 pl-10 bg-secondary/40 border-border/40"
                  />
                </div>
              </div>

              {/* Cédula */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Cédula de ciudadanía</label>
                <Input
                  placeholder="Número de documento"
                  value={formData.ownerIdNumber}
                  onChange={(e) => updateField("ownerIdNumber", e.target.value)}
                  className="h-12 bg-secondary/40 border-border/40"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Correo electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.ownerEmail}
                    onChange={(e) => updateField("ownerEmail", e.target.value)}
                    disabled={otpSent}
                    className="h-12 pl-10 pr-4 bg-secondary/40 border-border/40 disabled:opacity-100"
                  />
                </div>

                {emailVerified ? (
                  <p className="flex items-center gap-1.5 text-sm text-green-700">
                    <CheckCircle2 className="w-4 h-4" />
                    Correo verificado
                  </p>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={!formData.ownerEmail || isSendingOtp || otpSent}
                    onClick={sendOtp}
                  >
                    {isSendingOtp ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : otpSent ? (
                      "Código enviado"
                    ) : (
                      "Verificar correo"
                    )}
                  </Button>
                )}

                {otpSent && !emailVerified && (
                  <div className="space-y-2">
                    <Input
                      placeholder="Código de 6 dígitos"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="h-12 bg-secondary/40 border-border/40"
                      maxLength={6}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full"
                      disabled={!otpCode || isVerifyingOtp}
                      onClick={verifyOtpCode}
                    >
                      {isVerifyingOtp ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmar código"}
                    </Button>
                    <button
                      type="button"
                      onClick={sendOtp}
                      className="text-xs text-muted-foreground underline block mx-auto"
                    >
                      Reenviar código
                    </button>
                  </div>
                )}
                {otpError && <p className="text-sm text-destructive">{otpError}</p>}
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Teléfono</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+57 300 000 0000"
                    value={formData.ownerPhone}
                    onChange={(e) => updateField("ownerPhone", e.target.value)}
                    className="h-12 pl-10 bg-secondary/40 border-border/40"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Contract & Signature Section */}
          <section className="bg-card border border-border p-6 space-y-4">
            <div className="flex items-center gap-2 text-foreground">
              <PenLine className="w-5 h-5 text-gold" />
              <h2 className="font-display text-[22px] font-medium">Contrato de Autorización</h2>
            </div>

            <div className="bg-secondary/40 p-4 text-sm text-foreground/90 leading-relaxed max-h-48 overflow-y-auto">
              <p className="font-medium mb-2">CONTRATO DE AUTORIZACIÓN DE PUBLICACIÓN</p>
              <p className="mb-2">
                Yo, {formData.ownerName || "[nombre del propietario]"}
                {formData.ownerIdNumber ? `, identificado con cédula de ciudadanía No. ${formData.ownerIdNumber}` : ", identificado con cédula de ciudadanía"}, en calidad de
                propietario o representante autorizado del inmueble ubicado en{" "}
                {formData.address || "[dirección del inmueble]"}
                {formData.city ? `, ${formData.city}` : ""}, autorizo a ARQUENO a publicar dicho inmueble en sus
                canales de venta o arriendo, incluyendo las fotografías, descripción y datos de contacto
                suministrados en este formulario, con el fin de gestionar su comercialización.
              </p>
              <p className="mb-2">
                Esta autorización no constituye un contrato de exclusividad ni de intermediación inmobiliaria
                formal, y podrá ser revocada en cualquier momento mediante solicitud escrita.
              </p>
              <p>
                Al firmar digitalmente a continuación, confirmo que la información suministrada es veraz y que
                cuento con la facultad legal para autorizar esta publicación.
              </p>
            </div>

            <p className="text-xs text-muted-foreground bg-gold/10 border border-gold/30 p-3">
              ⚠️ Este es un texto genérico de ejemplo, sin revisión legal — no debe usarse como contrato definitivo
              sin que un abogado lo valide primero. Además, esta firma digital simple no tiene el mismo respaldo
              legal que una firma electrónica certificada.
            </p>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Firma</label>
              <SignaturePad ref={signaturePadRef} />
            </div>
          </section>

          {submitError && (
            <p className="text-sm text-destructive bg-destructive/10 border border-destructive/30 p-3">
              {submitError}
            </p>
          )}

          {/* Submit Button */}
          <div className="space-y-2">
            <Button
              type="submit"
              disabled={isSubmitting || !emailVerified}
              className="w-full h-14 bg-gold hover:bg-gold/90 text-gold-foreground font-semibold text-base shadow-gold transition-all hover:shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Publicar Inmueble"
              )}
            </Button>
            {!emailVerified && (
              <p className="text-xs text-muted-foreground text-center">
                Verifica tu correo electrónico (arriba, en Datos de Contacto) para poder enviar.
              </p>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default PublicarInmueble;
