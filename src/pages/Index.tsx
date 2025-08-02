import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ContactStrip from "@/components/ContactStrip";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* About Us Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <Collapsible open={aboutOpen} onOpenChange={setAboutOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-6 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <h2 className="text-2xl font-bold text-white">About Jomar Motors Rwanda</h2>
              <ChevronDown className={`w-6 h-6 text-primary transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="mt-4 bg-card border-border">
                <CardContent className="p-6">
                  <div className="space-y-4 text-gray-300">
                    <h3 className="text-xl font-semibold text-white">Our Journey</h3>
                    <p>
                      Established in 2019, Jomar Motors has grown to become Rwanda's trusted automotive partner. 
                      We specialize in providing quality pre-owned vehicles and comprehensive automotive solutions 
                      to individuals and businesses across the country.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white">Our Vision & Mission</h3>
                    <p>
                      <strong className="text-primary">Vision:</strong> To be the leading automotive service provider in Rwanda, 
                      known for quality, reliability, and exceptional customer service.
                    </p>
                    <p>
                      <strong className="text-primary">Mission:</strong> We are committed to connecting Rwandans with 
                      quality vehicles while providing comprehensive automotive solutions including sales, rentals, 
                      and consultancy services.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white">Why Choose Us?</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Quality guaranteed vehicles with thorough inspections</li>
                      <li>Flexible rental options for short and long-term needs</li>
                      <li>Expert buying consultancy to help you make informed decisions</li>
                      <li>Fair trade-in values for your current vehicle</li>
                      <li>Trusted partnership with Jomar Business Group (JBG)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>
      
      <ServicesSection />
      <ContactStrip id="contact" />
      <Footer />
    </div>
  );
};

export default Index;
