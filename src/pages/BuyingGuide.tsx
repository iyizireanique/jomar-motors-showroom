import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Car, Shield, Award, Phone, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BuyingGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Used Car Buying Guide
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Professional buying consultancy and expert guidance for your next vehicle purchase
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="tel:+250788239593" className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Get Consultation
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://wa.me/250788239593" className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Our Buying Consultancy Services
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card>
                <CardHeader>
                  <Car className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Vehicle Inspection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Professional pre-purchase inspection to ensure you're getting quality and value for your investment.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Documentation Assistance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Complete guidance through paperwork, registration, and legal requirements for vehicle ownership.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Expert Advice</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Professional recommendations based on your needs, budget, and intended use of the vehicle.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Buying Tips */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    What to Look For
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Complete service history and maintenance records</li>
                    <li>• Clean title and proper documentation</li>
                    <li>• Reasonable mileage for the vehicle's age</li>
                    <li>• No signs of major accidents or damage</li>
                    <li>• Properly functioning safety features</li>
                    <li>• Fair market pricing</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    Red Flags to Avoid
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Missing or incomplete documentation</li>
                    <li>• Unusual wear patterns or damage</li>
                    <li>• Reluctance to allow inspection</li>
                    <li>• Prices significantly below market value</li>
                    <li>• Pressure tactics from sellers</li>
                    <li>• Unknown or suspicious vehicle history</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready to Buy Your Next Car?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let our experts guide you through the process and ensure you make the best decision for your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="tel:+250788239593" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Schedule Consultation
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://wa.me/250788239593" className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default BuyingGuide;