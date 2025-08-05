import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategorizedCars from "@/components/CategorizedCars";
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
      
      <CategorizedCars />
      
      
      <ServicesSection />
      <ContactStrip id="contact" />
      <Footer />
    </div>
  );
};

export default Index;
