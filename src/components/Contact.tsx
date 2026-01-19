import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Ubicación",
      content: "Bogotá, Colombia",
      subtitle: "Atendemos a nivel nacional",
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+57 300 123 4567",
      subtitle: "Lunes a Sábado",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contacto@origenurbano.co",
      subtitle: "Respuesta en 24 horas",
    },
    {
      icon: Clock,
      title: "Horario",
      content: "Lun - Vie: 8am - 6pm",
      subtitle: "Sáb: 9am - 2pm",
    },
  ];

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-gold font-body text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4">
            Contacto
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-medium mb-4 sm:mb-6">
            Comienza tu inversión hoy
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Estamos listos para ayudarte. Cuéntanos sobre tu proyecto 
            y agendaremos una asesoría sin compromiso.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-background"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-display text-base sm:text-lg text-foreground font-medium">
                    {item.title}
                  </h4>
                  <p className="font-body text-sm sm:text-base text-foreground break-words">{item.content}</p>
                  <p className="font-body text-xs sm:text-sm text-muted-foreground">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}

            {/* WhatsApp Button */}
            <Button
              variant="whatsapp"
              size="xl"
              className="w-full mt-6"
              onClick={() =>
                window.open("https://wa.me/573001234567", "_blank")
              }
            >
              <MessageCircle className="mr-2" />
              Escríbenos por WhatsApp
            </Button>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-background p-8 shadow-soft"
            >
              <h3 className="font-display text-2xl text-foreground font-medium mb-6">
                Envíanos un mensaje
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-body text-sm text-foreground mb-2 block">
                    Nombre completo *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    className="rounded-none border-border focus:border-gold"
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-foreground mb-2 block">
                    Teléfono *
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="300 123 4567"
                    required
                    className="rounded-none border-border focus:border-gold"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="font-body text-sm text-foreground mb-2 block">
                  Email *
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  className="rounded-none border-border focus:border-gold"
                />
              </div>

              <div className="mb-6">
                <label className="font-body text-sm text-foreground mb-2 block">
                  ¿Cómo podemos ayudarte? *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu proyecto o qué tipo de propiedad buscas..."
                  rows={5}
                  required
                  className="rounded-none border-border focus:border-gold resize-none"
                />
              </div>

              <Button type="submit" variant="premium" size="xl" className="w-full">
                <Send className="mr-2 w-4 h-4" />
                Enviar Mensaje
              </Button>

              <p className="font-body text-xs text-muted-foreground mt-4 text-center">
                Al enviar este formulario, aceptas nuestra política de privacidad.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
