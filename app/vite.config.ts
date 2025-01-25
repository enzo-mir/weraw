import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import react from '@vitejs/plugin-react'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  plugins: [
    inertia({ ssr: { enabled: false } }),
    react(),
    adonisjs({ entrypoints: ['inertia/app/app.tsx'], reload: ['resources/views/**/*.edge'] }),
  ],

  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`,
      '#assets': `${getDirname(import.meta.url)}/inertia/assets/`,
      '#css': `${getDirname(import.meta.url)}/inertia/css/`,
      '#types': `${getDirname(import.meta.url)}/inertia/utils/types/`,
      '#schemas': `${getDirname(import.meta.url)}/app/schemas/`,
    },
  },
})
