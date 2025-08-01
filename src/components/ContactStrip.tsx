import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactStrip = ({ id }: { id?: string }) => {
  const contactMethods = [
    {
      icon: Phone,
      label: "Call Us",
      value: "+250 788 239 593",
      href: "tel:+250788239593",
      color: "text-green-400"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat Now",
      href: "https://wa.me/250788239593",
      color: "text-green-500"
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@jomarbusinessgroup.com",
      href: "mailto:info@jomarbusinessgroup.com",
      color: "text-blue-400"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kigali, Rwanda",
      href: "https://maps.google.com/?q=Kigali,Rwanda",
      color: "text-red-400"
    }
  ];

  return (
    <section id={id} className="py-16 bg-secondary/20 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">Get In Touch</h3>
          <p className="text-gray-300 text-lg">Ready to find your perfect vehicle? Contact us today!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((contact, index) => {
            const IconComponent = contact.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                size="lg"
                className="h-auto p-6 flex-col space-y-3 hover:bg-muted/20 border border-border/50 rounded-lg transition-all duration-300 group hover:scale-105"
                asChild
              >
                <a href={contact.href} target="_blank" rel="noopener noreferrer">
                  <IconComponent className={`w-8 h-8 ${contact.color} group-hover:text-primary transition-colors`} />
                  <div className="text-center">
                    <p className="font-semibold text-white group-hover:text-primary transition-colors">
                      {contact.label}
                    </p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactStrip;