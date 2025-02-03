/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import '#css/globals.css'
import { ToastContainer } from 'react-toastify'
import Loader from '~/pages/loader_image'
import { JSX } from 'react'

const appName = 'WeRaw'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  progress: { color: '#ff6fff' },

  resolve: (name) => {
    const pages = import.meta.glob('../pages/**\/*.tsx', { eager: true })
    let page = pages[`../pages/${name}.tsx`]
    const typedPage = page as { default: { layout?: (page: JSX.Element) => JSX.Element } }
    typedPage.default.layout = typedPage.default.layout || ((page) => <Loader children={page} />)
    return page
  },

  setup({ el, App, props }) {
    createRoot(el).render(
      <>
        <App {...props} />
        <ToastContainer />
      </>
    )
  },
})
