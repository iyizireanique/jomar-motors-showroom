import { Car, RefreshCw, Key, Headphones, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  const services = [
    {
      icon: Car,
      title: "Used Car Sales",
      description: "High-quality pre-owned vehicles, inspected & certified for your peace of mind",
      features: ["Certified Pre-owned", "Quality Inspection", "Fair Pricing", "Warranty Options"],
      link: "/cars?filter=sale",
      color: "text-yellow-400"
    },
    {
      icon: RefreshCw,
      title: "Used Car Buying",
      description: "We buy your used car at competitive prices for seamless transactions",
      features: ["Quick Valuation", "Competitive Prices", "Fast Process", "Instant Payment"],
      link: "/trade-in",
      color: "text-blue-400"
    },
    {
      icon: Key,
      title: "Car Rentals",
      description: "Flexible rental options for all your transportation needs",
      features: ["Daily/Weekly Rates", "Well-maintained Fleet", "Flexible Terms", "24/7 Support"],
      link: "/cars?filter=rent",
      color: "text-green-400"
    },
    {
      icon: Headphones,
      title: "Buying Consultancy",
      description: "Upgrade your vehicle with our seamless trade-in process",
      features: ["Expert Advice", "Market Analysis", "Best Deals", "Personalized Service"],
      link: "/consultancy",
      color: "text-purple-400"
    }
  ];

  return (
    <section className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            OUR <span className="text-transparent bg-gradient-gold bg-clip-text">SERVICES</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive automotive solutions tailored to meet all your vehicle needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 group hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-gold/10 rounded-full flex items-center justify-center group-hover:bg-gradient-gold/20 transition-colors">
                    <IconComponent className={`w-8 h-8 ${service.color} group-hover:text-primary transition-colors`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{service.title}</CardTitle>
                  <CardDescription className="text-gray-400">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="luxury" size="sm" className="w-full group" asChild>
                    <Link to={service.link} className="flex items-center justify-center gap-2">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button variant="premium" size="xl" asChild>
            <Link to="/contact" className="flex items-center gap-2">
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;