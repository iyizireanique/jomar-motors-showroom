-- Update existing car to be featured for testing
UPDATE cars 
SET featured = true, available = true 
WHERE id = '658cf646-9c3c-42ce-9e14-bb7a774a877b';

-- Fix storage bucket to be public for images
UPDATE storage.buckets 
SET public = true 
WHERE id = 'car-images';