-- Create storage policies for car images
CREATE POLICY "Car images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'car-images');

CREATE POLICY "Admins can upload car images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'car-images');

CREATE POLICY "Admins can update car images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'car-images');

CREATE POLICY "Admins can delete car images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'car-images');