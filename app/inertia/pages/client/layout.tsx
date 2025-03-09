import { router } from '@inertiajs/react'
import { JSX, useEffect, useMemo, useState } from 'react'
import styles from '#css/layout.module.css'

export default function Layout({ children }: { children: JSX.Element }) {
  const [transitioning, setTransitioning] = useState<boolean | null>(null)

  useEffect(() => {
    router.on('start', () => setTransitioning(true))
    router.on('finish', () => setTransitioning(false))
  }, [])
  const pageTransition = useMemo(
    () => (transitioning ? styles.fade_in : styles.fade_out),
    [transitioning]
  )

  return <div className={styles.animated + ' ' + pageTransition}>{children}</div>
}
