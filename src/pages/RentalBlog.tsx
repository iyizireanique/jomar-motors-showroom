import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Phone, MessageCircle, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  location: string;
  description?: string;
  image_url?: string;
  gallery_urls?: string[];
  contact_phone?: string;
  contact_whatsapp?: string;
  seats: number;
  transmission: string;
  fuel_type: string;
}

const RentalBlog = () => {
  const { t } = useLanguage();
  const [rentalCars, setRentalCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentalCars();
  }, []);

  const fetchRentalCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('type', 'rent')
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRentalCars(data || []);
    } catch (error) {
      console.error('Error fetching rental cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} RWF/day`;
  };

  const handleCall = (phone?: string) => {
    if (phone) {
      window.open(`tel:${phone}`, '_self');
    }
  };

  const handleWhatsApp = (whatsapp?: string) => {
    if (whatsapp) {
      const message = encodeURIComponent("Hello, I'm interested in renting a car from JOMAR MOTORS.");
      window.open(`https://wa.me/${whatsapp.replace('+', '')}?text=${message}`, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
          {t('rentalBlog.title')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('rentalBlog.subtitle')}
        </p>
      </div>

      {rentalCars.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">{t('rentalBlog.noCars')}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {rentalCars.map((car) => (
            <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                {/* Image Section */}
                <div className="md:w-1/2">
                  {car.image_url ? (
                    <div className="relative h-64 md:h-full">
                      <img
                        src={car.image_url}
                        alt={car.title}
                        className="w-full h-full object-cover"
                      />
                      {car.gallery_urls && car.gallery_urls.length > 0 && (
                        <div className="absolute bottom-4 left-4">
                          <Badge variant="secondary" className="bg-black/70 text-white">
                            +{car.gallery_urls.length + 1} {t('rentalBlog.photos')}
                          </Badge>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-64 md:h-full bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground">{t('rentalBlog.noImage')}</p>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <CardContent className="md:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                          {car.brand} {car.model} ({car.year})
                        </h2>
                        <Badge variant="outline" className="mb-2">
                          {t('rentalBlog.rental')}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-primary">
                          {formatPrice(car.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{car.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{car.year}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="font-medium">{t('rentalBlog.seats')}: </span>
                        <span>{car.seats}</span>
                      </div>
                      <div>
                        <span className="font-medium">{t('rentalBlog.transmission')}: </span>
                        <span>{car.transmission}</span>
                      </div>
                      <div>
                        <span className="font-medium">{t('rentalBlog.fuel')}: </span>
                        <span>{car.fuel_type}</span>
                      </div>
                    </div>

                    {car.description && (
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {car.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button 
                      onClick={() => handleCall(car.contact_phone)}
                      className="flex-1 min-w-[120px]"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {t('rentalBlog.call')}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleWhatsApp(car.contact_whatsapp)}
                      className="flex-1 min-w-[120px]"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => window.location.href = `/car/${car.id}`}
                      className="flex-1 min-w-[120px]"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('rentalBlog.details')}
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentalBlog;