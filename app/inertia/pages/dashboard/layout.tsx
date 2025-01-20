import { JSX } from 'react'
import Dialog from '~/components/dialog'
import { logout } from '~/services/logout.auth'
import style from '#css/dashboard.module.css'

const DashboardLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <header className={style.layout}>
        <nav>
          <h1>
            <em>WeRaw</em> - Dashboard
          </h1>
          <div className={style.profile}>
            <button>Éditer</button>
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
