import * as schema from '@/db/schema'
import { env } from 'cloudflare:workers'
import { drizzle } from 'drizzle-orm/d1'
import { betterAuth } from 'better-auth'
import { admin } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export function createAuth(request?: Request) {
  const db = drizzle(env.DB, { schema })

  return betterAuth({
    database: drizzleAdapter(db, { provider: 'sqlite' }),
    emailAndPassword: { enabled: true },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET
      }
    },
    plugins: [
      admin({
        defaultRole: 'client',
        adminRoles: [ 'admin' ]
      })
    ],
    secret: env.BETTER_AUTH_SECRET,
    baseURL: request ? new URL(request.url).origin : undefined
  })
}
