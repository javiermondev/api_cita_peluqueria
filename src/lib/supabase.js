import { createClient } from '@supabase/supabase-js'

//console.log(">>> CARGANDO SUPABASE.JS")

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

//export const supabase = createClient(supabaseUrl, supabaseAnonKey)



let supabase = null

try {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  supabase = createClient(supabaseUrl, supabaseAnonKey)
} catch (error) {
  console.error("ERROR AL CREAR SUPABASE CLIENT:", error)
}

export { supabase }