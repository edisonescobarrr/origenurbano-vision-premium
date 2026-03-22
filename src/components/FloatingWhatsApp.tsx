import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const FloatingWhatsApp = () => {
  const openChat = () => {
    window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <button
        type="button"
        onClick={openChat}
        className="group relative bg-[#25D366] hover:bg-[#20BD5A] w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:scale-105"
        aria-label="Abrir chat de WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10" />

        <span className="hidden sm:block absolute right-full mr-3 bg-card text-foreground text-sm font-medium py-2 px-4 rounded-xl shadow-soft whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border/50">
          Habla con un asesor
        </span>
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
