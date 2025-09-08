import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rldvhixtvjcpwoavdklz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZHZoaXh0dmpjcHdvYXZka2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTkxMzEsImV4cCI6MjA2OTI3NTEzMX0.YdZ9spmz1e2j-Dz4xipIalZsi8IJc-iUNSu62WvJFwo'

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Car {
  id: string
  make: string
  model: string
  year: number
  price: number
  status: 'sale' | 'rent'
  image_url: string
  features: string[]
  mileage?: number
  fuel_type?: string
  transmission?: string
  created_at: string
}