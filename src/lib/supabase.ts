import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'

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