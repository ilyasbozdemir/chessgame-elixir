import { GoTrueClient } from '@supabase/gotrue-js'

export const auth = new GoTrueClient({
  url: process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:9999',
  Storage: typeof window !== 'undefined' ? window.localStorage : undefined,
})
