import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')! // <- cambio importante
  )

  const { error } = await supabase
    .from('ping')
    .select('id')
    .limit(1)

  if (error) {
    return new Response(error.message, { status: 500 })
  }

  return new Response('ok', { status: 200 })
})
