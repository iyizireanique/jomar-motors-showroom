import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase, type Car as CarType } from "@/lib/supabase";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: string;
  status: "sale" | "rent";
  images: string[];
  description: string;
}

const FeaturedCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  // Fallback demo data
  const fallbackCars: Car[] = [
    {
      id: "1",
      make: "Toyota",
      model: "RAV4",
      year: 2020,
      mileage: "45,000 km",
      status: "sale",
      images: ["/src/assets/hondarv4.jpg"],
      description: "Well-maintained Toyota RAV4 with excellent fuel efficiency and reliability.",
    },
    {
      id: "2", 
      make: "Honda",
      model: "CR-V",
      year: 2019,
      mileage: "38,000 km",
      status: "rent",
      images: ["/src/assets/toyotarav4.jpg"],
      description: "Spacious Honda CR-V perfect for family trips and business use.",
    },
    {
      id: "3",
      make: "Mazda",
      model: "CX-5", 
      year: 2021,
      mileage: "25,000 km",
      status: "sale",
      images: ["/src/assets/maadison.jpg"],
      description: "Premium Mazda CX-5 with advanced safety features and luxury interior.",
    },
    {
      id: "4",
      make: "Nissan",
      model: "X-Trail",
      year: 2018,
      mileage: "52,000 km", 
      status: "rent",
      images: ["/placeholder.svg"],
      description: "Reliable Nissan X-Trail ideal for adventures and daily commuting.",
    },
    {
      id: "5",
      make: "Nissan",
      model: "X-Trail",
      year: 2018,
      mileage: "52,000 km", 
      status: "rent",
      images: ["/placeholder.svg"],
      description: "Reliable Nissan X-Trail ideal for adventures and daily commuting.",
    },
    {
      id: "6",
      make: "Nissan",
      model: "X-Trail",
      year: 2018,
      mileage: "52,000 km", 
      status: "rent",
      images: ["/placeholder.svg"],
      description: "Reliable Nissan X-Trail ideal for adventures and daily commuting.",
    },
  ];

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching cars:', error);
        setCars(fallbackCars);
      } else {
        setCars(data || fallbackCars);
      }
    } catch (error) {
      console.error('Error:', error);
      setCars(fallbackCars);
    } finally {
      setLoading(false);
    }
  };

  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">USED CARS FOR SALE</h2>
          <h4 className="text-2xl font-bold text-primary mb-4">HOT DEALS</h4>

          <p className="text-muted-foreground max-w-2xl mx-auto">
          Certified& Inspected Cars<span className="text-primary"> "Imodoka zigenzuwe &zifite ibyangombwa"</span>       </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <Card 
              key={car.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-card border-border"
              onClick={() => handleCarClick(car)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={car.images[0]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-foreground">
                  {car.make} {car.model}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {car.year} • {car.mileage}
                </p>
                <div className="mt-2">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    car.status === 'sale' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {car.status === 'sale' ? 'For Sale' : 'For Rent'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/cars">View All Cars</Link>
          </Button>
        </div>

        {/* Car Details Modal */}
        <Dialog open={!!selectedCar} onOpenChange={() => setSelectedCar(null)}>
          <DialogContent className="max-w-2xl bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {selectedCar?.make} {selectedCar?.model} ({selectedCar?.year})
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
                    <span className="font-medium text-foreground">Year:</span>
                    <span className="ml-2 text-muted-foreground">{selectedCar.year}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Mileage:</span>
                    <span className="ml-2 text-muted-foreground">{selectedCar.mileage}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Status:</span>
                    <span className="ml-2 text-muted-foreground">
                      {selectedCar.status === 'sale' ? 'For Sale' : 'For Rent'}
                    </span>
                  </div>
                </div>
                
                <p className="text-muted-foreground">{selectedCar.description}</p>
                
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button variant="default" asChild>
                    <a href="tel:+250788239593" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://wa.me/250788239593" className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to={`/car/${selectedCar.id}`} className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Full Details
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default FeaturedCars;