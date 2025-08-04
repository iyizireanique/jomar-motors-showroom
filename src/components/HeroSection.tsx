import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Car, Shield, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import carBg1 from "@/assets/car-bg-1.jpg";
import carBg2 from "@/assets/car-bg-2.jpg";
import carBg3 from "@/assets/car-bg-3.jpg";
import carBgClear from "@/assets/car-bg-clear.jpg";

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImages = [carBgClear, carBg1, carBg2, carBg3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Auto-changing Background Images with Overlay */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Premium luxury vehicle ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            initial={{ x: '-100%' }}
            animate={{ 
              x: index === currentImageIndex ? '0%' : '-100%',
              opacity: index === currentImageIndex ? 1 : 0
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50"></div>
      </div>

      {/* Engine Sound Video */}
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
        poster={carBg3}
      >
        <source src="/engine-sound.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          <div className="space-y-6">
            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white leading-tight"
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <motion.span 
                  className="block text-transparent bg-gradient-gold bg-clip-text"
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '0%', opacity: 1 }}
                  transition={{ duration: 1.4, delay: 0.1, ease: "easeOut" }}
                >
                  JOMAR MOTORS RWANDA
                </motion.span>
                <motion.span
                  className="block text-white mt-2"
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '0%', opacity: 1 }}
                  transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
                >
                  Gura, Gurisha, Kodesha Imodoka
                </motion.span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p 
              className="text-lg text-gray-300 max-w-2xl leading-relaxed"
              initial={{ x: '-50%', opacity: 0 }}
              animate={{ x: '0%', opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
              Your premier automotive destination in Rwanda. From premium used cars to 
              professional buying consultancy, we provide comprehensive automotive solutions 
              with trusted expertise and quality guarantee.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
              <Button variant="premium" size="xl" asChild className="group">
                <Link to="/cars" className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  View Cars
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="luxury" size="xl" asChild className="group">
                <Link to="/cars?filter=rent" className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Rent a Car
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/buying-guide" className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Learn More About Used Car Buying
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-8">
              <div className="flex items-center gap-2 text-primary">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">Since 2019</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Trusted Partner</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Car className="w-5 h-5" />
                <span className="text-sm font-medium">Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;