import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdminDatabaseReset from "@/components/AdminDatabaseReset";

interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  seats: number;
  mileage?: number;
  transmission: string;
  fuel_type: string;
  type: "sale" | "rent";
  location: string;
  description?: string;
  features?: string[];
  image_url?: string;
  gallery_urls?: string[];
  contact_phone?: string;
  contact_whatsapp?: string;
  contact_email?: string;
  featured: boolean;
  available: boolean;
}

const Admin = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [newCar, setNewCar] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    seats: "",
    transmission: "",
    fuel_type: "",
    type: "sale" as "sale" | "rent",
    location: "",
    price: "",
    description: "",
    features: "",
    image_url: "",
    gallery_urls: [] as string[],
    contact_phone: "+250796684401",
    contact_whatsapp: "+250796684401",
    contact_email: "info@jomarmotors.com",
    featured: false
  });

  useEffect(() => {
    if (isLoggedIn) {
      fetchCars();
    }
  }, [isLoggedIn]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      setCars((data || []).map(car => ({
        ...car,
        type: car.type as "sale" | "rent"
      })));
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast({
        title: "Error",
        description: "Failed to fetch cars",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo auth - in real app use proper authentication
    if (email === "admin@jomarmotors.com" && password === "admin123") {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome to JOMAR MOTORS Admin Panel",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate minimum image requirement
    const totalImages = newCar.gallery_urls.length + (newCar.image_url ? 1 : 0);
    if (totalImages < 3) {
      toast({
        title: "Image Requirement",
        description: "Please upload at least 3 images for the car listing.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      const carData = {
        title: `${newCar.brand} ${newCar.model}`,
        brand: newCar.brand,
        model: newCar.model,
        year: parseInt(newCar.year),
        price: parseFloat(newCar.price),
        seats: parseInt(newCar.seats),
        mileage: newCar.mileage ? parseInt(newCar.mileage) : null,
        transmission: newCar.transmission,
        fuel_type: newCar.fuel_type,
        type: newCar.type,
        location: newCar.location,
        description: newCar.description,
        features: newCar.features ? newCar.features.split(",").map(f => f.trim()).filter(f => f) : [],
        image_url: newCar.image_url,
        gallery_urls: newCar.gallery_urls,
        contact_phone: newCar.contact_phone,
        contact_whatsapp: newCar.contact_whatsapp,
        contact_email: newCar.contact_email,
        featured: newCar.featured,
        available: true,
        currency: 'RWF'
      };

      let result;
      if (editingCar) {
        // Update existing car
        result = await supabase
          .from('cars')
          .update(carData)
          .eq('id', editingCar.id);
      } else {
        // Insert new car
        result = await supabase
          .from('cars')
          .insert([carData]);
      }

      if (result.error) {
        throw result.error;
      }

      // Reset form
      setNewCar({
        title: "",
        brand: "",
        model: "",
        year: "",
        mileage: "",
        seats: "",
        transmission: "",
        fuel_type: "",
        type: "sale",
        location: "",
        price: "",
        description: "",
        features: "",
        image_url: "",
        gallery_urls: [],
        contact_phone: "+250796684401",
        contact_whatsapp: "+250796684401",
        contact_email: "info@jomarmotors.com",
        featured: false
      });
      setIsAddingCar(false);
      setEditingCar(null);
      
      // Refresh cars list
      await fetchCars();
      
      toast({
        title: editingCar ? "Car Updated" : "Car Added",
        description: `${carData.brand} ${carData.model} has been ${editingCar ? 'updated' : 'added'} successfully`,
      });
    } catch (error) {
      console.error('Error adding car:', error);
      toast({
        title: "Error",
        description: "Failed to add car",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const filePath = `car-images/${fileName}`;

        const { data, error } = await supabase.storage
          .from('car-images')
          .upload(filePath, file);

        if (error) {
          throw error;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('car-images')
          .getPublicUrl(filePath);

        return publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Set first image as main image, rest as gallery
      const mainImage = uploadedUrls[0];
      const galleryImages = uploadedUrls.length > 1 ? uploadedUrls.slice(1) : [];
      
      setNewCar({ 
        ...newCar, 
        image_url: mainImage,
        gallery_urls: [...(newCar.gallery_urls || []), ...galleryImages]
      });
      
      toast({
        title: "Images Uploaded",
        description: `${uploadedUrls.length} image(s) uploaded successfully`,
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    const updatedGallery = newCar.gallery_urls.filter((_, i) => i !== index);
    setNewCar({ ...newCar, gallery_urls: updatedGallery });
  };

  const handleDeleteCar = async (carId: string) => {
    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', carId);

      if (error) {
        throw error;
      }

      await fetchCars();
      toast({
        title: "Car Deleted",
        description: "Car has been removed from the system",
      });
    } catch (error) {
      console.error('Error deleting car:', error);
      toast({
        title: "Error",
        description: "Failed to delete car",
        variant: "destructive",
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-gold rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-black font-bold text-2xl">JM</span>
            </div>
            <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jomarmotors.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">JOMAR MOTORS - Admin Panel</h1>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Manage Cars</h2>
          <Button onClick={() => setIsAddingCar(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Car
          </Button>
        </div>

        {/* Database Management */}
        <AdminDatabaseReset />

        {/* Add/Edit Car Form */}
        {(isAddingCar || editingCar) && (
          <Card className="mb-8 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">
                {isAddingCar ? "Add New Car" : "Edit Car"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCar} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={newCar.brand}
                    onChange={(e) => setNewCar({...newCar, brand: e.target.value})}
                    placeholder="Toyota"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={newCar.model}
                    onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                    placeholder="Camry"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={newCar.year}
                    onChange={(e) => setNewCar({...newCar, year: e.target.value})}
                    placeholder="2020"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="mileage">Mileage (km)</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={newCar.mileage}
                    onChange={(e) => setNewCar({...newCar, mileage: e.target.value})}
                    placeholder="45000"
                  />
                </div>
                <div>
                  <Label htmlFor="seats">Seats</Label>
                  <Input
                    id="seats"
                    type="number"
                    value={newCar.seats}
                    onChange={(e) => setNewCar({...newCar, seats: e.target.value})}
                    placeholder="5"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select value={newCar.transmission} onValueChange={(value) => setNewCar({...newCar, transmission: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="CVT">CVT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fuel_type">Fuel Type</Label>
                  <Select value={newCar.fuel_type} onValueChange={(value) => setNewCar({...newCar, fuel_type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newCar.location}
                    onChange={(e) => setNewCar({...newCar, location: e.target.value})}
                    placeholder="Kigali, Rwanda"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (RWF)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newCar.price}
                    onChange={(e) => setNewCar({...newCar, price: e.target.value})}
                    placeholder="25000000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={newCar.type} onValueChange={(value: "sale" | "rent") => setNewCar({...newCar, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="image_upload" className="text-base font-semibold">
                    Car Images - <span className="text-primary">At least 3 images required</span>
                  </Label>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-6">
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div className="mt-4">
                          <Label htmlFor="image_upload" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-primary">
                              Click to upload multiple images
                            </span>
                            <span className="mt-1 block text-xs text-muted-foreground">
                              PNG, JPG, JPEG up to 10MB each (minimum 3 images)
                            </span>
                          </Label>
                          <Input
                            id="image_upload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="sr-only"
                            disabled={uploading}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {uploading && (
                      <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                          <span className="text-sm text-primary">Uploading images...</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Image Counter and Status */}
                    <div className="text-center">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        (newCar.gallery_urls.length + (newCar.image_url ? 1 : 0)) >= 3 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        Images: {newCar.gallery_urls.length + (newCar.image_url ? 1 : 0)}/3+ 
                        {(newCar.gallery_urls.length + (newCar.image_url ? 1 : 0)) >= 3 ? ' ✓' : ' (Need more)'}
                      </div>
                    </div>
                    
                    {/* Main Image */}
                    {newCar.image_url && (
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <Label className="text-sm font-medium text-primary">Main Image (Featured)</Label>
                        <div className="mt-2">
                          <img 
                            src={newCar.image_url} 
                            alt="Main car image" 
                            className="w-40 h-28 object-cover rounded-md border shadow-sm"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Gallery Images */}
                    {newCar.gallery_urls && newCar.gallery_urls.length > 0 && (
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <Label className="text-sm font-medium text-primary">Gallery Images</Label>
                        <div className="grid grid-cols-3 gap-3 mt-2">
                          {newCar.gallery_urls.map((url, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={url} 
                                alt={`Gallery image ${index + 1}`} 
                                className="w-full h-24 object-cover rounded-md border shadow-sm"
                              />
                              <button
                                type="button"
                                onClick={() => removeGalleryImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="featured">Featured Car</Label>
                  <Select value={newCar.featured.toString()} onValueChange={(value) => setNewCar({...newCar, featured: value === 'true'})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">No</SelectItem>
                      <SelectItem value="true">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCar.description}
                    onChange={(e) => setNewCar({...newCar, description: e.target.value})}
                    placeholder="Car description..."
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="features">Features (comma separated)</Label>
                  <Input
                    id="features"
                    value={newCar.features}
                    onChange={(e) => setNewCar({...newCar, features: e.target.value})}
                    placeholder="Air Conditioning, Power Steering, ABS"
                  />
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <Button 
                    type="submit" 
                    disabled={loading || uploading || (newCar.gallery_urls.length + (newCar.image_url ? 1 : 0)) < 3}
                    className="min-w-[120px]"
                  >
                    {uploading ? "Uploading..." : loading ? "Saving..." : isAddingCar ? "Add Car" : "Update Car"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsAddingCar(false);
                      setEditingCar(null);
                      setNewCar({
                        title: "",
                        brand: "",
                        model: "",
                        year: "",
                        mileage: "",
                        seats: "",
                        transmission: "",
                        fuel_type: "",
                        type: "sale",
                        location: "",
                        price: "",
                        description: "",
                        features: "",
                        image_url: "",
                        gallery_urls: [],
                        contact_phone: "+250796684401",
                        contact_whatsapp: "+250796684401",
                        contact_email: "info@jomarmotors.com",
                        featured: false
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Cars List */}
        {loading && <p className="text-white text-center">Loading cars...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Card key={car.id} className="bg-card border-border">
              <CardContent className="p-4">
                {car.image_url && (
                  <div className="aspect-video mb-3 overflow-hidden rounded-lg">
                    <img
                      src={car.image_url}
                      alt={car.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white">{car.brand} {car.model}</h3>
                  <Badge variant={car.type === "sale" ? "default" : "secondary"}>
                    {car.type === "sale" ? "For Sale" : "For Rent"}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-1">{car.year} • {car.mileage ? `${car.mileage.toLocaleString()} km` : 'N/A'}</p>
                <p className="text-primary font-semibold mb-2">{car.price.toLocaleString()} RWF</p>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{car.description}</p>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setEditingCar(car);
                      setNewCar({
                        title: car.title,
                        brand: car.brand,
                        model: car.model,
                        year: car.year.toString(),
                        mileage: car.mileage?.toString() || "",
                        seats: car.seats.toString(),
                        transmission: car.transmission,
                        fuel_type: car.fuel_type,
                        type: car.type,
                        location: car.location,
                        price: car.price.toString(),
                        description: car.description || "",
                        features: car.features?.join(", ") || "",
                        image_url: car.image_url || "",
                        gallery_urls: car.gallery_urls || [],
                        contact_phone: car.contact_phone || "+250796684401",
                        contact_whatsapp: car.contact_whatsapp || "+250796684401",
                        contact_email: car.contact_email || "info@jomarmotors.com",
                        featured: car.featured
                      });
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDeleteCar(car.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {cars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No cars added yet</p>
            <p className="text-muted-foreground">Click "Add New Car" to get started</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;