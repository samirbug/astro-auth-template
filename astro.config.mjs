import react from '@astrojs/react'
import tailwind from '@tailwindcss/vite'
import cloudflare from '@astrojs/cloudflare'
import { defineConfig } from 'astro/config'

export default defineConfig({
  output: 'server',
  integrations: [ react() ],
  vite: { plugins: [ tailwind() ] },
  adapter: cloudflare({
    platformProxy: { enabled: true }
  })
})
