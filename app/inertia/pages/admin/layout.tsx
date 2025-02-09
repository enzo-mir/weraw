import React, { JSX, Suspense } from 'react'
const Dialog = React.lazy(() => import('~/components/dialog'))
import { logout } from '~/services/logout.auth'
import style from '#css/dashboard.module.css'
import { dialogState } from '~/utils/stores/dialog.store'
import EditAdmin from '~/components/admin/edit_admin'
import { motion } from 'motion/react'
import { upToDownAnimation } from '~/utils/animations/up_to_down'

const DashboardLayout = ({
  children,
  _csrf,
  email,
}: {
  children: JSX.Element
  _csrf: string
  email: string
}) => {
  const setDialogElement = dialogState((state) => state.setDialogElement)

  return (
    <>
      <Suspense fallback={<></>}>
        <Dialog />
      </Suspense>
      <motion.header {...upToDownAnimation()} className={style.layout}>
        <nav>
          <h1>
            <em>WeRaw</em> - Dashboard
          </h1>
          <div className={style.profile}>
            <button onClick={() => setDialogElement(<EditAdmin _csrf={_csrf} email={email} />)}>
              Éditer
            </button>
            <button onClick={logout}>Déconnexion</button>
          </div>
        </nav>
      </motion.header>
      {children}
    </>
  )
}

export default DashboardLayout
