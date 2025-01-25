import { JSX } from 'react'
import Dialog from '~/components/dialog'
import { logout } from '~/services/logout.auth'
import style from '#css/dashboard.module.css'
import { dialogState } from '~/utils/stores/dialog.store'
import EditAdmin from '~/components/admin/edit_admin'

const DashboardLayout = ({ children }: { children: JSX.Element }) => {
  const setDialogElement = dialogState((state) => state.setDialogElement)

  return (
    <>
      <header className={style.layout}>
        <nav>
          <h1>
            <em>WeRaw</em> - Dashboard
          </h1>
          <div className={style.profile}>
            <button onClick={() => setDialogElement(<EditAdmin />)}>Éditer</button>
            <button onClick={logout}>Déconnexion</button>
          </div>
        </nav>
      </header>
      <Dialog />
      {children}
    </>
  )
}

export default DashboardLayout
