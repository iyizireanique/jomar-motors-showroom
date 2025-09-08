import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  type: string;
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

const CategorizedCars = () => {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  // UseEffect hook to load cars from database
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      console.log('Fetching all cars from Supabase...');
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched all cars:', data);
      setAllCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setAllCars([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Categorize cars with a clear hierarchy to avoid duplication
  const hotDeals = allCars.filter(car => 
    car.featured || car.title.toLowerCase().includes('hot deal')
  );
  
  const certifiedCars = allCars.filter(car => 
    (car.title.toLowerCase().includes('certified') || car.title.toLowerCase().includes('inspected')) && !hotDeals.some(hd => hd.id === car.id)
  );

  const usedCarsForSale = allCars.filter(car => 
    car.type === 'sale' && !hotDeals.some(hd => hd.id === car.id) && !certifiedCars.some(cc => cc.id === car.id)
  );

  const rentalCars = allCars.filter(car => 
    car.type === 'rent'
  );


  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
  };

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'RWF') {
      return `${price.toLocaleString()} RWF`;
    }
    return `${price.toLocaleString()} ${currency}`;
  };

  const CarCard = ({ car }: { car: Car }) => {
    return (
      <Card 
        className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-card border-border hover:scale-105"
        onClick={() => handleCarClick(car)}
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={car.image_url || "/placeholder.svg"}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/placeholder.svg";
            }}
            alt={car.title}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-foreground truncate">{car.title}</h3>
          <p className="text-sm text-muted-foreground">{car.year} • {car.location}</p>
          <div className="mt-2 text-xl font-bold text-primary">
            {formatPrice(car.price, car.currency)}
          </div>
        </CardContent>
      </Card>
    );
  };
  

  const CategorySection = ({ title, description, cars }: { 
    title: string; 
    description?: string; 
    cars: Car[] 
  }) => {
    if (cars.length === 0) return null;
    
    return (
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">{title}</h2>
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <Carousel 
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {cars.map((car) => (
              <CarouselItem key={car.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <CarCard car={car} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">{t('loadingCars')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        
        <CategorySection 
          title={t('hotDealsForSale')}
          description={t('hotDealsDesc')}
          cars={hotDeals}
        />
        
        <CategorySection 
          title={t('certifiedInspected')}
          description={t('certifiedInspectedDesc')}
          cars={certifiedCars}
        />

        {/* <CategorySection 
          title={t('usedCarsForSale')}
          description={t('usedCarsDesc')}
          cars={usedCarsForSale}
        /> */}
        
        <CategorySection
          title={t('rentalCars')}
          description={t('rentalCarsDesc')}
          cars={rentalCars}
        />
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/cars">{t('viewAllCars')}</Link>
          </Button>
        </div>

        {/* Car Details Modal (unchanged) */}
        <Dialog open={!!selectedCar} onOpenChange={() => setSelectedCar(null)}>
          <DialogContent className="max-w-2xl bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {selectedCar?.title}
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
                    <span className="font-medium text-foreground">{t('year')}:</span>
                    <span className="ml-2 text-muted-foreground">{selectedCar.year}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{t('mileage')}:</span>
                    <span className="ml-2 text-muted-foreground">
                      {selectedCar.mileage ? `${selectedCar.mileage.toLocaleString()} km` : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{t('price')}:</span>
                    <span className="ml-2 text-primary font-bold">
                      {formatPrice(selectedCar.price, selectedCar.currency)}
                    </span>
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
                
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button variant="default" asChild>
                    <a 
                      href={`tel:${selectedCar.contact_phone || '+250796684401'}`} 
                      className="flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      {t('call')}
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a 
                      href={`https://wa.me/${selectedCar.contact_whatsapp?.replace('+', '') || '250796684401'}`} 
                      className="flex items-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {t('whatsapp')}
                    </a>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to={`/car/${selectedCar.id}`} className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      {t('fullDetails')}
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

export default CategorizedCars;