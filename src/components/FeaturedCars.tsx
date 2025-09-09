import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ExternalLink, Gauge, Fuel, Settings, Users, MapPin } from "lucide-react";
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
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
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
    setSelectedCar(car);
    setSelectedImageUrl(car.image_url || null);
  };

  const handleCloseDialog = () => {
    setSelectedCar(null);
    setSelectedImageUrl(null);
  };

  const handleImageClick = (url: string) => {
    setSelectedImageUrl(url);
  };

  const handleContactClick = (type: 'phone' | 'whatsapp' | 'email', contact: string) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${contact}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${contact.replace(/\D/g, '')}`);
        break;
      case 'email':
        window.open(`mailto:${contact}`);
        break;
    }
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
            {t('certifiedInspected')} <span className="text-primary">{t('certifiedInspectedDesc')}</span>
          </p>
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

      {/* Car Details Dialog */}
      <Dialog open={!!selectedCar} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCar && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedCar.brand} {selectedCar.model} ({selectedCar.year})
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image Section */}
                <div className="space-y-4">
                  <div className="aspect-video overflow-hidden rounded-lg border-2 border-border">
                    <img
                      src={selectedImageUrl || selectedCar.image_url || "/placeholder.svg"}
                      alt={`${selectedCar.brand} ${selectedCar.model}`}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                  </div>
                  
                  {/* Gallery */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Click images to view</p>
                    <div className="grid grid-cols-4 gap-2">
                      {/* Main image thumbnail */}
                      {selectedCar.image_url && (
                        <div 
                          className={`aspect-video overflow-hidden rounded cursor-pointer border-3 transition-all duration-200 hover:scale-105 ${
                            (selectedImageUrl === selectedCar.image_url) || (!selectedImageUrl && selectedCar.image_url)
                              ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                              : 'border-gray-300 hover:border-primary/70 dark:border-gray-600'
                          }`}
                          onClick={() => handleImageClick(selectedCar.image_url!)}
                        >
                          <img
                            src={selectedCar.image_url}
                            alt="Main view"
                            className="w-full h-full object-cover"
                          />
                          {((selectedImageUrl === selectedCar.image_url) || (!selectedImageUrl && selectedCar.image_url)) && (
                            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                              <div className="w-3 h-3 bg-primary rounded-full"></div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Gallery thumbnails */}
                      {selectedCar.gallery_urls && selectedCar.gallery_urls.slice(0, selectedCar.image_url ? 7 : 8).map((url, index) => (
                        <div 
                          key={index} 
                          className={`relative aspect-video overflow-hidden rounded cursor-pointer border-3 transition-all duration-200 hover:scale-105 ${
                            selectedImageUrl === url 
                              ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                              : 'border-gray-300 hover:border-primary/70 dark:border-gray-600'
                          }`}
                          onClick={() => handleImageClick(url)}
                        >
                          <img
                            src={url}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {selectedImageUrl === url && (
                            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                              <div className="w-3 h-3 bg-primary rounded-full"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  {/* Price and Type */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-primary">
                        {selectedCar.price ? `${selectedCar.price.toLocaleString()} ${selectedCar.currency}` : 'Price on request'}
                      </p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                        selectedCar.type === 'sale' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {selectedCar.type === 'sale' ? t('forSaleLabel') : t('forRentLabel')}
                      </span>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Gauge className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Mileage</p>
                        <p className="font-semibold">{selectedCar.mileage ? `${selectedCar.mileage.toLocaleString()} km` : 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Fuel className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Fuel Type</p>
                        <p className="font-semibold">{selectedCar.fuel_type || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Settings className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Transmission</p>
                        <p className="font-semibold">{selectedCar.transmission || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Seats</p>
                        <p className="font-semibold">{selectedCar.seats || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold">{selectedCar.location}</p>
                    </div>
                  </div>

                  {/* Description */}
                  {selectedCar.description && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Description</p>
                      <p className="text-sm leading-relaxed">{selectedCar.description}</p>
                    </div>
                  )}

                  {/* Features */}
                  {selectedCar.features && selectedCar.features.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Features</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCar.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-3">Contact Seller</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCar.contact_phone && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleContactClick('phone', selectedCar.contact_phone!)}
                          className="flex items-center space-x-2"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Call</span>
                        </Button>
                      )}
                      
                      {selectedCar.contact_whatsapp && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleContactClick('whatsapp', selectedCar.contact_whatsapp!)}
                          className="flex items-center space-x-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </Button>
                      )}
                      
                      {selectedCar.contact_email && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleContactClick('email', selectedCar.contact_email!)}
                          className="flex items-center space-x-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Email</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FeaturedCars;