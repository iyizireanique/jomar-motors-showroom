import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: string;
  transmission: string;
  fuelType: string;
  engine: string;
  status: "sale" | "rent";
  price: string;
  description: string;
  features: string[];
}

const Admin = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    transmission: "",
    fuelType: "",
    engine: "",
    status: "sale" as "sale" | "rent",
    price: "",
    description: "",
    features: ""
  });

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

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    const car: Car = {
      id: Date.now().toString(),
      make: newCar.make,
      model: newCar.model,
      year: parseInt(newCar.year),
      mileage: newCar.mileage,
      transmission: newCar.transmission,
      fuelType: newCar.fuelType,
      engine: newCar.engine,
      status: newCar.status,
      price: newCar.price,
      description: newCar.description,
      features: newCar.features.split(",").map(f => f.trim()).filter(f => f)
    };

    setCars([...cars, car]);
    setNewCar({
      make: "",
      model: "",
      year: "",
      mileage: "",
      transmission: "",
      fuelType: "",
      engine: "",
      status: "sale",
      price: "",
      description: "",
      features: ""
    });
    setIsAddingCar(false);
    
    toast({
      title: "Car Added",
      description: `${car.make} ${car.model} has been added successfully`,
    });
  };

  const handleDeleteCar = (carId: string) => {
    setCars(cars.filter(car => car.id !== carId));
    toast({
      title: "Car Deleted",
      description: "Car has been removed from the system",
    });
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
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    value={newCar.make}
                    onChange={(e) => setNewCar({...newCar, make: e.target.value})}
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
                  <Label htmlFor="mileage">Mileage</Label>
                  <Input
                    id="mileage"
                    value={newCar.mileage}
                    onChange={(e) => setNewCar({...newCar, mileage: e.target.value})}
                    placeholder="45,000 km"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="transmission">Transmission</Label>
                  <Input
                    id="transmission"
                    value={newCar.transmission}
                    onChange={(e) => setNewCar({...newCar, transmission: e.target.value})}
                    placeholder="Automatic"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Input
                    id="fuelType"
                    value={newCar.fuelType}
                    onChange={(e) => setNewCar({...newCar, fuelType: e.target.value})}
                    placeholder="Petrol"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="engine">Engine</Label>
                  <Input
                    id="engine"
                    value={newCar.engine}
                    onChange={(e) => setNewCar({...newCar, engine: e.target.value})}
                    placeholder="2.5L"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={newCar.price}
                    onChange={(e) => setNewCar({...newCar, price: e.target.value})}
                    placeholder="$25,000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={newCar.status} onValueChange={(value: "sale" | "rent") => setNewCar({...newCar, status: value})}>
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
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCar.description}
                    onChange={(e) => setNewCar({...newCar, description: e.target.value})}
                    placeholder="Car description..."
                    required
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
                  <Button type="submit">
                    {isAddingCar ? "Add Car" : "Update Car"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsAddingCar(false);
                      setEditingCar(null);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Card key={car.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white">{car.make} {car.model}</h3>
                  <Badge variant={car.status === "sale" ? "default" : "secondary"}>
                    {car.status === "sale" ? "For Sale" : "For Rent"}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-1">{car.year} • {car.mileage}</p>
                <p className="text-primary font-semibold mb-2">{car.price}</p>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{car.description}</p>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setEditingCar(car)}
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