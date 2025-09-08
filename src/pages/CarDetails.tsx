import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
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

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchCarDetails(id);
    }
  }, [id]);

  const fetchCarDetails = async (carId: string) => {
    setLoading(true);
    try {
      console.log('Fetching car details from Supabase...', carId);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', carId)
        .eq('available', true)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        if (error.code === 'PGRST116') {
          // No rows returned
          setCar(null);
        } else {
          throw error;
        }
      } else {
        console.log('Fetched car details:', data);
        setCar(data);
      }
    } catch (error) {
      console.error('Error fetching car details:', error);
      toast({
        title: "Connection Error", 
        description: "Unable to load car details. Please check your connection.",
        variant: "destructive",
      });
      setCar(null);
    } finally {
      setLoading(false);
    }
  };

  // Gallery functionality
  const nextImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };
  
  // Create an array of images to handle the gallery
  const images = car ? [
    car.image_url,
    ...(car.gallery_urls || [])
  ].filter(Boolean) as string[] : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">{t('loadingCars')}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl text-white mb-4">Car not found</h1>
            <p className="text-muted-foreground mb-4">The car you're looking for doesn't exist or is no longer available.</p>
            <Button asChild>
              <Link to="/cars">
                Back to Cars
              </Link>
            </Button>
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
              <img
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={car.title || `${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
              />
              {/* Gallery navigation */}
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
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
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
                <h1 className="text-3xl font-bold text-white">
                  {car.title || `${car.brand} ${car.model}`}
                </h1>
                <Badge variant={car.type === "sale" ? "default" : "secondary"}>
                  {car.type === "sale" ? t('forSaleLabel') : t('forRentLabel')}
                </Badge>
              </div>
              {car.price && (
                <p className="text-3xl font-bold text-primary mb-4">
                  {car.price.toLocaleString()} {car.currency}
                  {car.type === "rent" && (
                    <span className="text-base text-muted-foreground ml-2">/day</span>
                  )}
                </p>
              )}
              <p className="text-muted-foreground">{car.description || "No description available."}</p>
            </div>

            {/* Specifications */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">{t('specifications') || 'Specifications'}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-muted-foreground">{t('year') || 'Year'}:</span>
                    <span className="ml-2 text-white">{car.year}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t('mileage') || 'Mileage'}:</span>
                    <span className="ml-2 text-white">
                      {car.mileage ? `${car.mileage.toLocaleString()} km` : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t('transmission') || 'Transmission'}:</span>
                    <span className="ml-2 text-white">{car.transmission}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t('fuel') || 'Fuel Type'}:</span>
                    <span className="ml-2 text-white">{car.fuel_type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t('seats') || 'Seats'}:</span>
                    <span className="ml-2 text-white">{car.seats}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t('location') || 'Location'}:</span>
                    <span className="ml-2 text-white">{car.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">{t('features') || 'Features'}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Actions */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                {t('interestedContact') || 'Interested? Get in Touch'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button size="lg" asChild>
                  <a 
                    href={`tel:${car.contact_phone || '+250788239593'}`} 
                    className="flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    {t('call') || 'Call Now'}
                  </a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <a 
                    href={`https://wa.me/${(car.contact_whatsapp || '+250788239593').replace('+', '')}`} 
                    className="flex items-center justify-center gap-2" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t('whatsapp') || 'WhatsApp'}
                  </a>
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Available 24/7 for inquiries and bookings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('additionalInfo') || 'Additional Information'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-white mb-2">
                    {car.type === 'rent' ? 'Rental Terms' : 'Purchase Terms'}
                  </h4>
                  <ul className="space-y-1">
                    <li>• Valid driving license required</li>
                    {car.type === 'rent' && (
                      <>
                        <li>• Minimum rental period applies</li>
                        <li>• Fuel policy: Return with same level</li>
                        <li>• Insurance included</li>
                      </>
                    )}
                    {car.type === 'sale' && (
                      <>
                        <li>• Inspection welcome</li>
                        <li>• Documentation provided</li>
                        <li>• Transfer assistance available</li>
                      </>
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Contact Information</h4>
                  <ul className="space-y-1">
                    <li>Phone: {car.contact_phone || '+250 788 239 593'}</li>
                    <li>WhatsApp: {car.contact_whatsapp || '+250 788 239 593'}</li>
                    {car.contact_email && <li>Email: {car.contact_email}</li>}
                    <li>Location: {car.location}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetails;