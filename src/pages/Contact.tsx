import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            CONTACT <span className="text-transparent bg-gradient-gold bg-clip-text">US</span>
          </h1>
          <p className="text-gray-300 text-lg">Get in touch with Jomar Motors Rwanda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-white">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-muted-foreground">+250 788 239 593</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-muted-foreground">info@jomarbusinessgroup.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-muted-foreground">Kigali, Rwanda</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-white font-medium">WhatsApp</p>
                    <p className="text-muted-foreground">+250 796 684 401</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Quick Actions</h3>
              <div className="flex flex-col gap-3">
                <Button variant="premium" size="lg" asChild className="justify-start">
                  <a href="tel:+250788239593" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                </Button>
                <Button variant="luxury" size="lg" asChild className="justify-start">
                  <a href="https://wa.me/250788239593" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Chat
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input id="name" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone</Label>
                    <Input id="phone" required className="mt-1" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input id="email" type="email" required className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-white">Subject</Label>
                  <Input id="subject" required className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea id="message" required className="mt-1 min-h-[120px]" />
                </div>
                
                <Button type="submit" variant="premium" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;