import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      console.log('Fetching cars from Supabase...');
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('available', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched cars:', data);
      setCars((data || []).map(car => ({
        ...car,
        type: car.type as "sale" | "rent"
      })));
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

  const handleCarClick = (car: Car) => {
    // Navigate to the car details page instead of opening modal
    window.location.href = `/car/${car.id}`;
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
      </div>
    </section>
  );
};

export default FeaturedCars;