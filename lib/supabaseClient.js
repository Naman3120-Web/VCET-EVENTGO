import { createClient } from '@supabase/supabase-js'



const supabaseUrl = "https://ncujocgfhdibicansorh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jdWpvY2dmaGRpYmljYW5zb3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NzUxMjAsImV4cCI6MjA3NjI1MTEyMH0.MWH483GmpbQtF0_OLVaIqKKmGS7nyCT1xt6t8CrIZms";




export const supabase = createClient(supabaseUrl, supabaseAnonKey)

