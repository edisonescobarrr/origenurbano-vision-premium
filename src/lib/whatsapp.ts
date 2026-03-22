/** WhatsApp Business / chat: código país + número sin + ni espacios */
export const WHATSAPP_PHONE_E164 = "573215893324";

const DEFAULT_PREFILL = "Hola, me gustaría recibir asesoría personalizada";

export function getWhatsAppUrl(prefill: string = DEFAULT_PREFILL): string {
  const text = encodeURIComponent(prefill);
  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${text}`;
}
