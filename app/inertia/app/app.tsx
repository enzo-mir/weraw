/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import '#css/globals.css'
import Loader from '~/components/loader'

const appName = 'WeRaw'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  progress: { color: '#ff6fff' },

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    createRoot(el).render(
      <Loader>
        <App {...props} />
      </Loader>
    )
  },
})
