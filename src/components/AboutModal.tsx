import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, Award, Shield, Car, Users, Target, Phone, MessageCircle } from "lucide-react";

export function AboutModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Info className="w-4 h-4" />
          About Us
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">
            About Jomar Motors Rwanda
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-6">
          {/* Company Overview */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center">
                <Car className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold">Your Trusted Automotive Partner Since 2019</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jomar Motors Rwanda has established itself as the premier destination for quality vehicles 
              and professional automotive services across Rwanda. We bridge the gap between customers 
              and their perfect vehicle.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <h4 className="text-lg font-semibold">Our Mission</h4>
              </div>
              <p className="text-muted-foreground">
                To provide exceptional automotive solutions by connecting Rwandans with quality, 
                reliable vehicles while delivering outstanding customer service and building 
                lasting relationships.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <h4 className="text-lg font-semibold">Our Vision</h4>
              </div>
              <p className="text-muted-foreground">
                To be Rwanda's leading automotive service provider, recognized for quality, 
                innovation, and unwavering commitment to customer satisfaction in every transaction.
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Our Services
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <h5 className="font-medium text-primary mb-2">Vehicle Sales</h5>
                <p className="text-sm text-muted-foreground">
                  Quality pre-owned vehicles thoroughly inspected and certified for reliability.
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h5 className="font-medium text-primary mb-2">Car Rentals</h5>
                <p className="text-sm text-muted-foreground">
                  Flexible short and long-term rental solutions for personal and business needs.
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h5 className="font-medium text-primary mb-2">Buying Consultancy</h5>
                <p className="text-sm text-muted-foreground">
                  Expert guidance to help you make informed vehicle purchase decisions.
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h5 className="font-medium text-primary mb-2">Trade-In Services</h5>
                <p className="text-sm text-muted-foreground">
                  Fair market value assessments and trade-in opportunities for your current vehicle.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Why Choose Jomar Motors?
            </h4>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                "Quality Guaranteed Vehicles",
                "Transparent Pricing",
                "Expert Team Support",
                "Flexible Payment Options",
                "After-Sales Support",
                "Trusted Partnership Network"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-muted/50 p-6 rounded-lg text-center space-y-3">
            <h4 className="text-lg font-semibold">Get in Touch</h4>
            <p className="text-muted-foreground">
              Ready to find your perfect vehicle? Contact us today!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" asChild>
                <a href="tel:+250788239593" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +250 788 239 593
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://wa.me/250788239593" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}