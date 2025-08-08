import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface CarFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  priceRange: [number, number];
  maxPrice: number;
}

export interface FilterState {
  brands: string[];
  priceRange: [number, number];
  type: string[];
}

const CarFilters = ({ onFiltersChange, priceRange, maxPrice }: CarFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceRange,
    type: []
  });

  const carBrands = [
    "Toyota", "Honda", "Nissan", "Mercedes", "BMW", "Audi"
  ];

  const carTypes = [
    "For Sale", "For Rent"
  ];

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked 
      ? [...filters.brands, brand]
      : filters.brands.filter(b => b !== brand);
    
    const newFilters = { ...filters, brands: newBrands };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked 
      ? [...filters.type, type]
      : filters.type.filter(t => t !== type);
    
    const newFilters = { ...filters, type: newTypes };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceRangeChange = (newRange: [number, number]) => {
    const newFilters = { ...filters, priceRange: newRange };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      brands: [],
      priceRange: [0, maxPrice] as [number, number],
      type: []
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <div className="w-64 space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Car Brands */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Car Brands</h4>
            <div className="space-y-2">
              {carBrands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, !!checked)}
                  />
                  <label
                    htmlFor={brand}
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium text-foreground mb-3">
              Price Range (RWF)
            </h4>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => handlePriceRangeChange(value as [number, number])}
                max={maxPrice}
                min={0}
                step={100000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{filters.priceRange[0].toLocaleString()}</span>
                <span>{filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Car Type */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Car Type</h4>
            <div className="space-y-2">
              {carTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={filters.type.includes(type)}
                    onCheckedChange={(checked) => handleTypeChange(type, !!checked)}
                  />
                  <label
                    htmlFor={type}
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarFilters;