import { JSX } from 'react'
import Dialog from '~/components/dialog'
import { logout } from '~/services/logout.auth'

const DashboardLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <header>
        <nav>
          <h1>
            <em>WeRaw</em> - Dashboard
          </h1>
          <div>
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
