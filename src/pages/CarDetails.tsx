import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: string;
  transmission: string;
  fuelType: string;
  engine: string;
  status: "sale" | "rent";
  images: string[];
  description: string;
  price?: string;
  features: string[];
}

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Demo car data - in real app this would come from API
    const demoCar: Car = {
      id: id!,
      make: "Toyota",
      model: "Camry",
      year: 2020,
      mileage: "45,000 km",
      transmission: "Automatic",
      fuelType: "Petrol",
      engine: "2.5L",
      status: "sale",
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description: "This well-maintained Toyota Camry is in excellent condition and perfect for both city driving and long trips. The vehicle has been regularly serviced and comes with a complete maintenance history.",
      price: "$25,000",
      features: [
        "Air Conditioning",
        "Power Steering",
        "Electric Windows",
        "Central Locking",
        "ABS Brakes",
        "Airbags",
        "Bluetooth Connectivity",
        "Backup Camera",
        "Cruise Control",
        "Alloy Wheels"
      ]
    };
    setCar(demoCar);
  }, [id]);

  const nextImage = () => {
    if (car) {
      setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
    }
  };

  const prevImage = () => {
    if (car) {
      setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
    }
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl text-white">Car not found</h1>
            <Link to="/cars" className="text-primary hover:underline">
              Back to Cars
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/cars" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Cars
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <img
                src={car.images[currentImageIndex]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
              {car.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            
            {/* Image Thumbnails */}
            {car.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? "border-primary" : "border-border"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-bold text-white">{car.make} {car.model}</h1>
                <Badge variant={car.status === "sale" ? "default" : "secondary"}>
                  {car.status === "sale" ? "For Sale" : "For Rent"}
                </Badge>
              </div>
              {car.price && (
                <p className="text-3xl font-bold text-primary mb-4">{car.price}</p>
              )}
              <p className="text-muted-foreground">{car.description}</p>
            </div>

            {/* Specifications */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-muted-foreground">Year:</span>
                    <span className="ml-2 text-white">{car.year}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Mileage:</span>
                    <span className="ml-2 text-white">{car.mileage}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Transmission:</span>
                    <span className="ml-2 text-white">{car.transmission}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fuel Type:</span>
                    <span className="ml-2 text-white">{car.fuelType}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Engine:</span>
                    <span className="ml-2 text-white">{car.engine}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Actions */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Interested? Get in Touch</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button size="lg" asChild>
                  <a href="tel:+250788239593" className="flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <a href="https://wa.me/250788239593" className="flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetails;