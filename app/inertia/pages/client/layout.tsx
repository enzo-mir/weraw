import { router } from '@inertiajs/react'
import { JSX, useEffect, useMemo, useState } from 'react'
import styles from '#css/layout.module.css'
import { AnimatePresence, useMotionValueEvent, useScroll } from 'motion/react'
import BackToTop from '~/components/client/back_to_top'

export default function Layout({ children, button }: { children: JSX.Element; button?: boolean }) {
  const [transitioning, setTransitioning] = useState<boolean | null>(null)
  const { scrollYProgress } = useScroll()
  const [scrollY, setScrollY] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollY(latest)
  })
  useEffect(() => {
    router.on('start', (e) => {
      e.preventDefault()
      setTransitioning(true)
    })
    router.on('finish', () => setTransitioning(false))
  }, [])

  const pageTransition = useMemo(
    () => (transitioning ? styles.fade_in : styles.fade_out),
    [transitioning]
  )

  const isMobilDevice = window.matchMedia('(pointer: coarse)').matches

  return (
    <>
      {isMobilDevice ? (
        <>{children}</>
      ) : ( 
        <div className={styles.animated + ' ' + pageTransition}>{children}</div>
      )}
      <AnimatePresence>{button && scrollY > 0.2 ? <BackToTop /> : null}</AnimatePresence>
    </>
  )
}
