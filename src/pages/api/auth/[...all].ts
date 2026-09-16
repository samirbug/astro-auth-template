import type { APIRoute } from 'astro'
import { createAuth } from '@/lib/auth'

export const ALL: APIRoute = async (ctx) => {
  return createAuth(ctx.request).handler(ctx.request)
}
