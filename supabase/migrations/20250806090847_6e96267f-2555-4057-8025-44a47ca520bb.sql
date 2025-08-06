-- Clear existing demo data and add real cars from uploaded images
DELETE FROM cars;

-- Insert real cars using uploaded images
INSERT INTO cars (
  title, brand, model, year, price, currency, type, fuel_type, transmission, 
  seats, mileage, location, description, features, image_url, 
  contact_email, contact_phone, contact_whatsapp, featured, available
) VALUES 
-- Hot Deals
('Hot Deal - Hyundai Sonata 2020', 'Hyundai', 'Sonata', 2020, 18500000, 'RWF', 'sale', 'Petrol', 'Automatic', 5, 45000, 'Kigali', 'Well-maintained Hyundai Sonata with excellent fuel efficiency. Clean interior and exterior.', ARRAY['Air Conditioning', 'Power Steering', 'Electric Windows', 'Bluetooth'], '/lovable-uploads/e4a38f69-f785-4468-b022-c3ab47e9748c.png', 'info@jomarmotors.com', '+250788239593', '250788239593', true, true),

('Hot Deal - Toyota RAV4 2019', 'Toyota', 'RAV4', 2019, 22000000, 'RWF', 'sale', 'Petrol', 'Automatic', 5, 38000, 'Kigali', 'Spacious RAV4 perfect for family trips and business use. Excellent condition.', ARRAY['4WD', 'Air Conditioning', 'Power Steering', 'Alloy Wheels'], '/lovable-uploads/7a4e1805-e026-46ba-83d3-e92a746e9a01.png', 'info@jomarmotors.com', '+250788239593', '250788239593', true, true),

('Hot Deal - Toyota Prado 2018', 'Toyota', 'Prado', 2018, 35000000, 'RWF', 'sale', 'Diesel', 'Automatic', 7, 52000, 'Kigali', 'Premium Toyota Prado with advanced safety features and luxury interior.', ARRAY['4WD', 'Leather Seats', 'Sunroof', 'Navigation System'], '/lovable-uploads/1e5cdfec-82a5-4cac-95ec-f6853bf2cdbf.png', 'info@jomarmotors.com', '+250788239593', '250788239593', true, true),

-- Certified & Inspected Cars
('Certified - Hyundai ix35 2016', 'Hyundai', 'ix35', 2016, 15500000, 'RWF', 'sale', 'Petrol', 'Manual', 5, 78000, 'Kigali', 'Imodoka zigenzuwe & zifite ibyangombwa. Fully inspected and certified vehicle.', ARRAY['Air Conditioning', 'Power Steering', 'USB Port', 'ABS'], '/lovable-uploads/acd7de2c-a195-470c-a14c-e66edd2782bd.png', 'info@jomarmotors.com', '+250788239593', '250788239593', false, true),

('Certified - Toyota Noah 2015', 'Toyota', 'Noah', 2015, 16800000, 'RWF', 'sale', 'Petrol', 'Automatic', 8, 85000, 'Kigali', 'Certified family van with spacious interior. Perfect for large families.', ARRAY['8 Seater', 'Air Conditioning', 'Electric Doors', 'DVD Player'], '/lovable-uploads/bb240b1a-a9a5-4470-a0e8-e32fd1517857.png', 'info@jomarmotors.com', '+250788239593', '250788239593', false, true),

-- Used Cars for Sale
('Toyota Prius Hybrid 2017', 'Toyota', 'Prius', 2017, 14500000, 'RWF', 'sale', 'Hybrid', 'Automatic', 5, 65000, 'Kigali', 'Eco-friendly hybrid vehicle with excellent fuel economy.', ARRAY['Hybrid Engine', 'Air Conditioning', 'Navigation', 'Backup Camera'], '/lovable-uploads/b0bc24a2-af43-463a-81b9-afe84559e83f.png', 'info@jomarmotors.com', '+250788239593', '250788239593', false, true),

('Toyota Prius 2016', 'Toyota', 'Prius', 2016, 13800000, 'RWF', 'sale', 'Hybrid', 'Automatic', 5, 72000, 'Kigali', 'Reliable hybrid vehicle in excellent condition.', ARRAY['Hybrid Engine', 'Air Conditioning', 'Power Steering', 'Electric Windows'], '/lovable-uploads/63905dbd-03d9-41b0-bc60-a7bbe67b0e2e.png', 'info@jomarmotors.com', '+250788239593', '250788239593', false, true),

('Hyundai Sonata Hybrid 2018', 'Hyundai', 'Sonata', 2018, 17200000, 'RWF', 'sale', 'Hybrid', 'Automatic', 5, 48000, 'Kigali', 'Modern hybrid sedan with advanced features.', ARRAY['Hybrid Engine', 'Leather Seats', 'Sunroof', 'Navigation'], '/lovable-uploads/32756437-b4ea-49c7-9fbf-670a7a9ae8b9.png', 'info@jomarmotors.com', '+250788239593', '250788239593', false, true),

('Kia K5 2019', 'Kia', 'K5', 2019, 19500000, 'RWF', 'sale', 'Petrol', 'Automatic', 5, 42000, 'Kigali', 'Stylish and modern sedan in pristine condition.', ARRAY['Air Conditioning', 'Power Steering', 'Alloy Wheels', 'Bluetooth'], '/lovable-uploads/74798262-5ddd-4292-88d6-4a8d1360dbbe.png', 'info@jomarmotors.com', '+250788239593', '250788239593', false, true),

('Kia Optima 2017', 'Kia', 'Optima', 2017, 16800000, 'RWF', 'sale', 'Petrol', 'Automatic', 5, 55000, 'Kigali', 'Well-maintained Kia Optima with custom wheels.', ARRAY['Custom Wheels', 'Air Conditioning', 'Power Steering', 'Electric Windows'], '/lovable-uploads/a092abb3-4888-452d-842f-202c537bef59.png', 'info@jomarmotors.com', '+250788239593', '250788239593', false, true),

-- Rental Cars
('Rental - Toyota RAV4 2020', 'Toyota', 'RAV4', 2020, 25000, 'RWF', 'rent', 'Petrol', 'Automatic', 5, 35000, 'Kigali', 'Perfect for city driving and weekend trips.', ARRAY['4WD', 'GPS', 'Air Conditioning', 'Bluetooth'], '/lovable-uploads/7a4e1805-e026-46ba-83d3-e92a746e9a01.png', 'info@jomarmotors.com', '+250788239593', '250788239593', false, true),

('Rental - Hyundai Sonata 2019', 'Hyundai', 'Sonata', 2019, 20000, 'RWF', 'rent', 'Petrol', 'Automatic', 5, 40000, 'Kigali', 'Comfortable sedan for business and leisure.', ARRAY['Air Conditioning', 'Power Steering', 'Bluetooth', 'USB Port'], '/lovable-uploads/e4a38f69-f785-4468-b022-c3ab47e9748c.png', 'info@jomarmotors.com', '+250788239593', '250788239593', false, true);