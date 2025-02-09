/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import '#css/globals.css'
const ToastContainer = React.lazy(() =>
  import('react-toastify').then((module) => ({ default: module.ToastContainer }))
)
const Loader = React.lazy(() => import('~/pages/loader_image'))
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
        <Suspense fallback={<></>}>
          <ToastContainer />
          <Loader>
            <App {...props} />
          </Loader>
        </Suspense>
      </>
    )
  },
})
