import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarFilters, { FilterState } from "@/components/CarFilters";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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
  mileage?: number;
  location: string;
  description?: string;
  features?: string[];
  image_url?: string;
  gallery_urls?: string[];
  contact_email?: string;
  contact_phone?: string;
  contact_whatsapp?: string;
  featured: boolean;
  available: boolean;
}

const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filter, setFilter] = useState<"sale" | "rent">("sale");
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceRange: [0, 100000000],
    type: []
  });
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(100000000);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching cars:', error);
      } else {
        setCars((data || []).map(car => ({
          ...car,
          type: car.type as "sale" | "rent"
        })));
        // Calculate max price for filter
        const prices = (data || []).map(car => car.price);
        const max = Math.max(...prices, 100000000);
        setMaxPrice(max);
        setFilters(prev => ({ ...prev, priceRange: [0, max] }));
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCars = cars.filter(car => {
    // Type filter
    if (filter !== "sale" && filter !== "rent") return false;
    if (car.type !== filter) return false;

    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(car.brand)) return false;

    // Price filter
    if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) return false;

    // Type filter from sidebar
    if (filters.type.length > 0) {
      const carTypeLabel = car.type === "sale" ? "For Sale" : "For Rent";
      if (!filters.type.includes(carTypeLabel)) return false;
    }

    return true;
  });

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

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

        {/* Main Content with Filters */}
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          {filter === "rent" && (
            <CarFilters 
              onFiltersChange={handleFiltersChange}
              priceRange={filters.priceRange}
              maxPrice={maxPrice}
            />
          )}
          
          {/* Cars Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Loading cars...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <Card key={car.id} className="bg-card border-border hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div onClick={() => handleCarClick(car)}>
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={car.image_url || "/placeholder.svg"}
                          alt={car.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-white">{car.brand} {car.model}</h3>
                          <Badge variant={car.type === "sale" ? "default" : "secondary"}>
                            {car.type === "sale" ? "For Sale" : "For Rent"}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-1">{car.year} • {car.mileage ? `${car.mileage.toLocaleString()} km` : 'N/A'}</p>
                        <p className="text-muted-foreground text-sm">{car.transmission} • {car.fuel_type}</p>
                        <p className="text-primary font-bold mt-2">{car.price.toLocaleString()} {car.currency}</p>
                        
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
            )}
            
            {!loading && filteredCars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No cars found matching your criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Car Details Modal */}
        <Dialog open={!!selectedCar} onOpenChange={() => setSelectedCar(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedCar?.brand} {selectedCar?.model}
              </DialogTitle>
            </DialogHeader>
            
            {selectedCar && (
              <div className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={selectedCar.image_url || "/placeholder.svg"}
                    alt={selectedCar.title}
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
                    <span className="ml-2 text-white">{selectedCar.mileage ? `${selectedCar.mileage.toLocaleString()} km` : 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Transmission:</span>
                    <span className="ml-2 text-white">{selectedCar.transmission}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fuel Type:</span>
                    <span className="ml-2 text-white">{selectedCar.fuel_type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Seats:</span>
                    <span className="ml-2 text-white">{selectedCar.seats}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className="ml-2" variant={selectedCar.type === "sale" ? "default" : "secondary"}>
                      {selectedCar.type === "sale" ? "For Sale" : "For Rent"}
                    </Badge>
                  </div>
                </div>

                <div className="text-center py-2">
                  <span className="text-2xl font-bold text-primary">{selectedCar.price.toLocaleString()} {selectedCar.currency}</span>
                </div>

                <p className="text-muted-foreground">{selectedCar.description}</p>

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1" asChild>
                    <a href="tel:+250796684401" className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                  </Button>
                  <Button variant="secondary" className="flex-1" asChild>
                    <a href="https://wa.me/250796684401" className="flex items-center justify-center gap-2">
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