import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://sscnltlirayehfpijuyy.supabase.co"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzY25sdGlscmF5ZWhmcGppdXl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMDYwMjEsImV4cCI6MjA4OTc4MjAyMX0.8PJd071QOptzSEjRS9vkvnlinhtBluZrtRNV-mSNxu8"

export const supabase = createClient(supabaseUrl, supabaseKey)