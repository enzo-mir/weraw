/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import '#css/globals.css'
import { ToastContainer } from 'react-toastify'
import Loader from '~/pages/loader_image'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

const appName = 'WeRaw'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  progress: { color: '#ff6fff' },

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    createRoot(el).render(
      <>
        <ToastContainer />
        <Loader>
          <App {...props} />
        </Loader>
      </>
    )
  },
})
