import { JSX } from 'react'
import Dialog from '~/components/dialog'
import { logout } from '~/services/logout.auth'
import style from '#css/dashboard.module.css'
import { dialogState } from '~/utils/stores/dialog.store'
import EditAdmin from '~/components/admin/edit_admin'
import { motion } from 'motion/react'
import { upToDownAnimation } from '~/utils/animations/up_to_down'

const DashboardLayout = ({ children }: { children: JSX.Element }) => {
  const setDialogElement = dialogState((state) => state.setDialogElement)

  return (
    <>
      <Dialog />
      <motion.header {...upToDownAnimation()} className={style.layout}>
        <nav>
          <h1>
            <em>WeRaw</em> - Dashboard
          </h1>
          <div className={style.profile}>
            <button onClick={() => setDialogElement(<EditAdmin />)}>Éditer</button>
            <button onClick={logout}>Déconnexion</button>
          </div>
        </nav>
      </motion.header>
      {children}
    </>
  )
}

export default DashboardLayout
