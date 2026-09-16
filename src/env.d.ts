/// <reference path="../worker-configuration.d.ts" />
/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

import type { User, Session } from 'better-auth'

type Runtime = import('@astrojs/cloudflare').Runtime<Env>

declare global {
  namespace App {
    interface Locals extends Runtime {
      user: User | null
      session: Session | null
    }
  }
}
