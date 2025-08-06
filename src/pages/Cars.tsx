import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, Eye } from "lucide-react";
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
}

const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filter, setFilter] = useState<"all" | "sale" | "rent">("all");

  // Demo cars data - in real app this would come from API/database
  useEffect(() => {
    const demoCars: Car[] = [
      {
        id: "1",
        make: "Toyota",
        model: "Camry",
        year: 2020,
        mileage: "45,000 km",
        transmission: "Automatic",
        fuelType: "Petrol",
        engine: "2.5L",
        status: "sale",
        images: ["/src/assets/toyotacarimiry.jpg"],
        description: "Well-maintained Toyota Camry in excellent condition",
      },
      {
        id: "2",
        make: "Honda",
        model: "CR-V",
        year: 2019,
        mileage: "32,000 km",
        transmission: "CVT",
        fuelType: "Petrol",
        engine: "1.5L Turbo",
        status: "rent",
        images: ["/src/assets/prii1.jpeg"],
        description: "Spacious and reliable SUV perfect for family trips"
      },
      {
        id: "3",
        make: "BMW",
        model: "X3",
        year: 2021,
        mileage: "18,000 km",
        transmission: "Automatic",
        fuelType: "Petrol",
        engine: "2.0L",
        status: "sale",
        images: ["/placeholder.svg"],
        description: "Luxury SUV with premium features",
      }
    ];
    setCars(demoCars);
  }, []);

  const filteredCars = cars.filter(car => 
    filter === "all" || car.status === filter
  );

  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            OUR <span className="text-transparent bg-gradient-gold bg-clip-text">VEHICLES</span>
          </h1>
          <p className="text-gray-300 text-lg">Browse our collection of quality vehicles</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-card rounded-lg p-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-md transition-all ${
                filter === "all" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Cars
            </button>
            <button
              onClick={() => setFilter("sale")}
              className={`px-6 py-2 rounded-md transition-all ${
                filter === "sale" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => setFilter("rent")}
              className={`px-6 py-2 rounded-md transition-all ${
                filter === "rent" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              For Rent
            </button>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card key={car.id} className="bg-card border-border hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div onClick={() => handleCarClick(car)}>
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={car.images[0]}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{car.make} {car.model}</h3>
                    <Badge variant={car.status === "sale" ? "default" : "secondary"}>
                      {car.status === "sale" ? "For Sale" : "For Rent"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-1">{car.year} • {car.mileage}</p>
                  <p className="text-muted-foreground text-sm">{car.transmission} • {car.fuelType}</p>
                  
                  <div className="flex items-center gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Car Details Modal */}
        <Dialog open={!!selectedCar} onOpenChange={() => setSelectedCar(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedCar?.make} {selectedCar?.model}
              </DialogTitle>
            </DialogHeader>
            
            {selectedCar && (
              <div className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={selectedCar.images[0]}
                    alt={`${selectedCar.make} ${selectedCar.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Year:</span>
                    <span className="ml-2 text-white">{selectedCar.year}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Mileage:</span>
                    <span className="ml-2 text-white">{selectedCar.mileage}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Transmission:</span>
                    <span className="ml-2 text-white">{selectedCar.transmission}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fuel Type:</span>
                    <span className="ml-2 text-white">{selectedCar.fuelType}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Engine:</span>
                    <span className="ml-2 text-white">{selectedCar.engine}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className="ml-2" variant={selectedCar.status === "sale" ? "default" : "secondary"}>
                      {selectedCar.status === "sale" ? "For Sale" : "For Rent"}
                    </Badge>
                  </div>
                </div>

                {selectedCar.price && (
                  <div className="text-center py-2">
                    <span className="text-2xl font-bold text-primary">{selectedCar.price}</span>
                  </div>
                )}

                <p className="text-muted-foreground">{selectedCar.description}</p>

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1" asChild>
                    <a href="tel:+250788239593" className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                  </Button>
                  <Button variant="secondary" className="flex-1" asChild>
                    <a href="https://wa.me/250788239593" className="flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/car/${selectedCar.id}`}>
                      Full Details
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
};

export default Cars;