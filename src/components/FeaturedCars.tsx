import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase, type Car as CarType } from "@/lib/supabase";
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

const FeaturedCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('available', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching cars:', error);
        setCars([]);
      } else {
        setCars(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t('featuredCars')}</h2>
          <h4 className="text-2xl font-bold text-primary mb-4">{t('hotDeals')}</h4>

          <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('certifiedInspected')} <span className="text-primary">{t('certifiedInspectedDesc')}</span>       </p>
        </div>

        {cars.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{t('noFeaturedCars')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cars.map((car) => (
            <Card 
              key={car.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-card border-border"
              onClick={() => handleCarClick(car)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={car.image_url || "/placeholder.svg"}
                  alt={car.title || `${car.brand} ${car.model}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-foreground">
                  {car.brand} {car.model}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {car.year} • {car.mileage ? `${car.mileage.toLocaleString()} km` : 'N/A'}
                </p>
                <p className="text-primary font-bold mb-2">
                  {car.price ? `${car.price.toLocaleString()} ${car.currency}` : 'Price on request'}
                </p>
                <div className="mt-2">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    car.type === 'sale' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {car.type === 'sale' ? t('forSaleLabel') : t('forRentLabel')}
                  </span>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/cars">{t('viewAllCars')}</Link>
          </Button>
        </div>

        {/* Car Details Modal */}
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
                    <span className="ml-2 text-muted-foreground">
                      {selectedCar.mileage ? `${selectedCar.mileage.toLocaleString()} km` : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{t('price')}:</span>
                    <span className="ml-2 text-primary font-bold">
                      {selectedCar.price ? `${selectedCar.price.toLocaleString()} ${selectedCar.currency}` : t('priceOnRequest')}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{t('status')}:</span>
                    <span className="ml-2 text-muted-foreground">
                      {selectedCar.type === 'sale' ? t('forSaleLabel') : t('forRentLabel')}
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
                      href={`tel:${selectedCar.contact_phone || '+250788239593'}`} 
                      className="flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      {t('call')}
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a 
                      href={`https://wa.me/${selectedCar.contact_whatsapp?.replace('+', '') || '250788239593'}`} 
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

export default FeaturedCars;