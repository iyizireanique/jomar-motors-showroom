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
      <ContactStrip id="contact" />clear

      <Footer />
    </div>
  );
};

// export default Index;
// const Index = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white flex-col">
//       <h1 className="text-4xl font-bold mb-4">🚧 Site Under Maintenance 🚧</h1>
//       <p className="text-lg text-gray-300">
//         We're currently working on some updates. Please check back soon!
//       </p>
//     </div>
//   );
// };

// export default Index;
