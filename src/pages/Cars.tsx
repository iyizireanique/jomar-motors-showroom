import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Phone, MessageCircle, Eye, Car, Euro, HandCoins, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

interface PriceRange {
  groupName: string;
  minPrice: number;
  maxPrice: number;
  currency: string;
  count?: number;
}

const RENTAL_PRICE_RANGES = [
  { groupName: "Economy Car", minPrice: 30000, maxPrice: 45000, currency: "RWF" },
  { groupName: "Sedan", minPrice: 40000, maxPrice: 60000, currency: "RWF" },
  { groupName: "Compact SUV", minPrice: 50000, maxPrice: 75000, currency: "RWF" },
  { groupName: "Mid-Size SUV", minPrice: 70000, maxPrice: 90000, currency: "RWF" },
  { groupName: "Full-Size SUV", minPrice: 85000, maxPrice: 120000, currency: "RWF" },
  { groupName: "Van", minPrice: 60000, maxPrice: 90000, currency: "RWF" },
  { groupName: "Mini Bus (15-seater)", minPrice: 100000, maxPrice: 150000, currency: "RWF" },
  { groupName: "Truck", minPrice: 120000, maxPrice: 200000, currency: "RWF" },
  { groupName: "Luxury Sedan", minPrice: 150000, maxPrice: 300000, currency: "RWF" },
  { groupName: "Sports Car", minPrice: 200000, maxPrice: 500000, currency: "RWF" },
];

const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filter, setFilter] = useState<"sale" | "rent">("rent"); // Default to 'rent' as requested
  const [loading, setLoading] = useState(true);
  const [salePriceRanges, setSalePriceRanges] = useState<PriceRange[]>([]);
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (cars.length > 0) {
      calculateSalePriceRanges(cars);
    }
  }, [cars]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      console.log('Fetching cars from Supabase...');
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched cars:', data);
      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast({
        title: "Connection Error", 
        description: "Unable to load cars. Please check your connection.",
        variant: "destructive",
      });
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateSalePriceRanges = (carsData: Car[]) => {
    const rangeMap = new Map<string, { prices: number[], currency: string, count: number }>();

    carsData
      .filter(car => car.type === "sale")
      .forEach(car => {
        const key = `${car.brand} ${car.model}`;
        if (!rangeMap.has(key)) {
          rangeMap.set(key, { prices: [], currency: car.currency, count: 0 });
        }
        rangeMap.get(key)!.prices.push(car.price);
        rangeMap.get(key)!.count++;
      });

    const ranges: PriceRange[] = Array.from(rangeMap.entries()).map(([key, data]) => {
      const [brand, model] = key.split(' ', 2);
      return {
        groupName: `${brand} ${model}`,
        minPrice: Math.min(...data.prices),
        maxPrice: Math.max(...data.prices),
        currency: data.currency,
        count: data.count
      };
    }).sort((a, b) => a.minPrice - b.minPrice);

    setSalePriceRanges(ranges);
  };

  const filteredCars = cars.filter(car => car.type === filter);
  const popularRentalCars = cars.filter(car => car.type === 'rent' && car.featured);
  const popularSaleCars = cars.filter(car => car.type === 'sale' && car.featured);

  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow mb-4">
            {t('ourVehicles')}
          </h1>
          <p className="text-gray text-lg">{t('browseCollection')}</p>
        </div>

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
              {t('forSale')}
            </button>
            <button
              onClick={() => setFilter("rent")}
              className={`px-6 py-2 rounded-md transition-all ${
                filter === "rent"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t('forRental')}
            </button>
          </div>
        </div>

        {/* Conditional Layout for Sale vs. Rent */}
        <div className="flex gap-8">
          {filter === "sale" && (
            <>
              {/* Left Sidebar for Sale Price Ranges */}
              <div className="w-80 space-y-4">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-xl text-black flex items-center gap-2">
                        <Car className="w-5 h-5" />
                        Sale Price Ranges
                      </CardTitle>
                    </CardHeader>
                  <CardContent className="space-y-3">
                    {loading ? (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">Loading ranges...</p>
                      </div>
                    ) : salePriceRanges.length > 0 ? (
                      salePriceRanges.map((range, index) => (
                        <div key={index} className="p-3 bg-background rounded-lg border border-border">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-semibold text-white">{range.groupName}</h4>
                            <Badge variant="outline" className="text-xs">
                              {range.count} car{range.count > 1 ? 's' : ''}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {range.minPrice === range.maxPrice ? (
                              <span className="text-primary font-medium">
                                {range.minPrice.toLocaleString()} {range.currency}
                              </span>
                            ) : (
                              <span className="text-primary font-medium">
                                {range.minPrice.toLocaleString()} - {range.maxPrice.toLocaleString()} {range.currency}
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">No price ranges available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Separator orientation="vertical" className="h-auto" />
            </>
          )}

          <div className={`${filter === "rent" ? "flex-1" : ""}`}>
            {filter === "rent" && (
              <>
                {/* Blog Content Section with improved formatting */}
                <div className="mb-8">
                  <Card className="bg-card border-border p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-4">
                          {t('longTermRental')}
                        </h2>
                        <p className="text-gray-300 mb-4">
                          {t('rentalDescription')}
                        </p>
                      </div>
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                          alt="Car rental in Rwanda - Modern vehicles available for long-term and short-term rental"
                          className="w-full h-64  text-foreground lg:h-80 object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-sm font-medium">Premium Car Rental Services</p>
                          <p className="text-xs text-gray-200">Available across Rwanda</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="flex items-start gap-3">
                            <HandCoins className="w-6 h-6 text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">{t('costSavings')}</h3>
                                <p className="text-gray-300">{t('costSavingsDesc')}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Users className="w-6 h-6 text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">{t('comfortPrivacy')}</h3>
                                <p className="text-gray-300">{t('comfortPrivacyDesc')}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Settings className="w-6 h-6 text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">{t('flexibility')}</h3>
                                <p className="text-gray-300">{t('flexibilityDesc')}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <Car className="w-6 h-6 text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">{t('vehicleVariety')}</h3>
                                <p className="text-gray-300">{t('vehicleVarietyDesc')}</p>
                            </div>
                        </div>
                    </div>
                    <Separator className="my-6" />
                    <h3 className="text-2xl font-semibold text-white mb-3">{t('vehicleOptions')}</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 list-disc list-inside">
                      <li><strong className="text-white">4×4 Station Wagons:</strong> Toyota Prado, Land Cruiser (ideal for national parks)</li>
                      <li><strong className="text-white">SUVs:</strong> Toyota RAV4, KIA Sorento, Hyundai Santafe... (perfect for families)</li>
                      <li><strong className="text-white">Sedans:</strong> Toyota Corolla, Toyota Prius, KIA K5, Sonata (best for business/city use)</li>
                      <li><strong className="text-white">Luxury Cars:</strong> BMW, Mercedes Benz (VIP transport)</li>
                      <li><strong className="text-white">Minivans & Buses:</strong> Toyota Hiace, Grand Starex, Coasters (7-30 passengers)</li>
                    </ul>
                  </Card>
                </div>

                {/* The rest of the rental content */}
                <div className="mb-8">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-xl text-white">{t('rentalPriceRanges')}</CardTitle>
                      <p className="text-muted-foreground">
                        {t('fullRangeInfo')}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {RENTAL_PRICE_RANGES.map((range, index) => (
                          <div key={index} className="p-4 bg-background rounded-lg border border-border">
                            <h4 className="font-semibold text-white">{range.groupName}</h4>
                            <div className="text-sm text-muted-foreground mt-1">
                              <span className="text-primary font-bold">
                                {range.minPrice.toLocaleString()} - {range.maxPrice.toLocaleString()} {range.currency}/day
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {filter === "sale" && !loading && (
              <div className="mb-8">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">Popular Cars for Sale</CardTitle>
                    <p className="text-muted-foreground">Quick overview of our most popular vehicles for sale</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {popularSaleCars.map((car) => (
                        <div key={car.id} className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer group">
                          <Link to={`/car/${car.id}`}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Car className="w-4 h-4 text-secondary" />
                                <h4 className="font-semibold text-white text-sm group-hover:text-foreground transition-colors">
                                  {car.brand} {car.model}
                                </h4>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                Available
                              </Badge>
                            </div>
                            <div className="text-primary font-bold text-sm">
                              {car.price.toLocaleString()} {car.currency}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Year: {car.year}
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">{t('loadingCars')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <Card key={car.id} className="bg-card border-border hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <Link to={`/car/${car.id}`}>
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={car.image_url || "/placeholder.svg"}
                          alt={car.title || `${car.brand} ${car.model}`}
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
                        <p className="text-primary font-bold mt-2">
                          {car.price ? `${car.price.toLocaleString()} ${car.currency}` : t('priceOnRequest')}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1" asChild>
                            <Link to={`/car/${car.id}`} className="flex items-center justify-center gap-2">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Link>
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

        <Dialog open={!!selectedCar} onOpenChange={() => setSelectedCar(null)}>
          <DialogContent className="max-w-2xl bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {selectedCar?.title || `${selectedCar?.brand} ${selectedCar?.model} (${selectedCar?.year})`}
              </DialogTitle>
            </DialogHeader>
            
            {selectedCar && (
              <div className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={selectedCar.image_url || "/placeholder.svg"}
                    alt={selectedCar.title || `${selectedCar.brand} ${selectedCar.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-foreground">{t('year')}:</span>
                    <span className="ml-2 text-muted-foreground">{selectedCar.year}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{t('mileage')}:</span>
                    <span className="ml-2 text-muted-foreground">{selectedCar.mileage ? `${selectedCar.mileage.toLocaleString()} km` : 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{t('transmission')}:</span>
                    <span className="ml-2 text-muted-foreground">{selectedCar.transmission}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{t('fuel')}:</span>
                    <span className="ml-2 text-muted-foreground">{selectedCar.fuel_type}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{t('seats')}:</span>
                    <span className="ml-2 text-muted-foreground">{selectedCar.seats}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{t('status')}:</span>
                    <Badge className="ml-2" variant={selectedCar.type === "sale" ? "default" : "secondary"}>
                      {selectedCar.type === "sale" ? "For Sale" : "For Rent"}
                    </Badge>
                  </div>
                </div>

                <div className="text-center py-2">
                  <span className="text-2xl font-bold text-primary">
                    {selectedCar.price ? `${selectedCar.price.toLocaleString()} ${selectedCar.currency}` : t('priceOnRequest')}
                  </span>
                </div>

                {selectedCar.features && selectedCar.features.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">{t('features')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCar.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-muted-foreground">{selectedCar.description}</p>

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1" asChild>
                    <a href={`tel:${selectedCar.contact_phone || '+250788239593'}`} className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      {t('call')}
                    </a>
                  </Button>
                  <Button variant="secondary" className="flex-1" asChild>
                    <a href={`https://wa.me/${selectedCar.contact_whatsapp?.replace('+', '') || '250788239593'}`} className="flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      {t('whatsapp')}
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/car/${selectedCar.id}`}>{t('fullDetails')}</Link>
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