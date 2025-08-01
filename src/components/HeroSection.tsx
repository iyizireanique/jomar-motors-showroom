import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Car, Shield, Award } from "lucide-react";
import heroCarImage from "@/assets/hero-car.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroCarImage}
          alt="Premium luxury vehicle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          <div className="space-y-6">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Quality Cars &
                <span className="block text-transparent bg-gradient-gold bg-clip-text">
                  Automotive Solutions
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-primary font-semibold tracking-wide">
                Partners in Growth, Champions for Clients
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
              Discover premium vehicles and professional automotive services in Rwanda. 
              From quality used cars to flexible rental solutions, we're your trusted partner 
              for all automotive needs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
            </div>

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