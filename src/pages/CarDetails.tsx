import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// 1. Import the localCars data
import { localCars } from "@/pages/localCars";

// 2. Adjust the interface to match your localCars data structure
interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  type: "sale" | "rent";
  fuel_type: string;
  transmission: string;
  seats: number;
  mileage: number;
  location: string;
  description: string;
  features: string[];
  image_url: string;
  contact_phone: string;
  contact_whatsapp: string;
  featured: boolean;
  available: boolean;
}

const CarDetails = () => {
  const { id } = useParams();
  // Use the imported localCars array element type for state to avoid duplicate 'Car' type conflicts
  const [car, setCar] = useState<typeof localCars[number] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // 3. Find the car with the matching ID from the localCars array
    const foundCar = localCars.find(c => c.id === id);

    if (foundCar) {
      setCar(foundCar);
    } else {
      // Handle case where car is not found
      setCar(null);
    }
  }, [id]);

  // Gallery functionality is now dependent on a `gallery_urls` property, which your localCars data
  // does not have. For now, we will use the single `image_url`. You can expand this later.
  // The gallery logic is disabled or simplified since there is only one image URL.
  const nextImage = () => {
    // No gallery functionality for now
  };

  const prevImage = () => {
    // No gallery functionality for now
  };
  
  // Create an array of images to handle the gallery.
  // For now, it will just contain the main image URL.
  const images = car ? [car.image_url] : [];

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
              {/* Use the car's image_url directly */}
              <img
                src={car.image_url}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
              />
              {/* Gallery navigation is now hidden as there's only one image */}
              {images.length > 1 && (
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
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
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
                <h1 className="text-3xl font-bold text-white">{car.brand} {car.model}</h1>
                <Badge variant={car.type === "sale" ? "default" : "secondary"}>
                  {car.type === "sale" ? "For Sale" : "For Rent"}
                </Badge>
              </div>
              {car.price && (
                <p className="text-3xl font-bold text-primary mb-4">
                  {car.price.toLocaleString()} {car.currency}
                </p>
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
                    <span className="ml-2 text-white">{car.mileage.toLocaleString()} km</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Transmission:</span>
                    <span className="ml-2 text-white">{car.transmission}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fuel Type:</span>
                    <span className="ml-2 text-white">{car.fuel_type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <span className="ml-2 text-white">{car.location}</span>
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
                  <a href={`tel:${car.contact_phone}`} className="flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <a href={`https://wa.me/${car.contact_whatsapp}`} className="flex items-center justify-center gap-2" target="_blank" rel="noopener noreferrer">
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