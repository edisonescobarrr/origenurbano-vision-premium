import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const FloatingWhatsApp = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/573215893324?text=Hola,%20me%20gustaría%20recibir%20asesoría%20personalizada",
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded tooltip */}
      {isExpanded && (
        <div className="animate-fade-in bg-card shadow-elevated rounded-2xl p-4 max-w-[280px] border border-border/50">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display text-sm font-medium text-foreground">
                  Asesor ORIGENURBANO
                </p>
                <p className="text-xs text-muted-foreground">En línea</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="font-body text-sm text-muted-foreground mb-3">
            ¡Hola! 👋 ¿Necesitas asesoría personalizada? Estamos aquí para ayudarte.
          </p>
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Iniciar conversación
          </button>
        </div>
      )}

      {/* Main floating button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative bg-[#25D366] hover:bg-[#20BD5A] w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:scale-105"
        aria-label="Hablar con un asesor"
      >
        {/* Ping animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10" />
        
        {/* Label on hover - hidden on mobile */}
        <span className="hidden sm:block absolute right-full mr-3 bg-card text-foreground text-sm font-medium py-2 px-4 rounded-xl shadow-soft whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border/50">
          Habla con un asesor
        </span>
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
