-- Update all car image URLs to use the correct absolute path format
UPDATE cars SET image_url = 'https://8903a888-bb58-4d9b-bde9-c18bc3ddae99.lovableproject.com' || image_url 
WHERE image_url LIKE '/lovable-uploads/%';

-- Also ensure any gallery URLs are updated if they exist
UPDATE cars SET gallery_urls = ARRAY(
  SELECT 'https://8903a888-bb58-4d9b-bde9-c18bc3ddae99.lovableproject.com' || unnest(gallery_urls)
) WHERE gallery_urls IS NOT NULL AND array_length(gallery_urls, 1) > 0;