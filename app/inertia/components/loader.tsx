import { JSX } from 'react'
import LoaderImage from '~/assets/images/loader_image'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'motion/react'

const Loader = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
    document.body.style.overflow = 'auto'
    setIsLoading(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">{isLoading ? <LoaderImage /> : null}</AnimatePresence>
      {children}
    </>
  )
}

export default Loader
