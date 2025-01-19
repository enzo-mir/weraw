import { JSX } from 'react'
import DashboardLayout from './dashboard/layout'
import AddGalery from '~/components/add_galery'
import { dialogState } from '~/utils/stores/dialog.store'

const Dashboard = () => {
  const setDialogElement = dialogState((state) => state.setDialogElement)
  setDialogElement(<AddGalery />)
  return (
    <>
      <main>
        <button onClick={() => setDialogElement(<AddGalery />)}>Ajouter</button>
        <section></section>
      </main>
    </>
  )
}

Dashboard.layout = (page: JSX.Element) => <DashboardLayout>{page}</DashboardLayout>

export default Dashboard
