import { JSX } from 'react'
import DashboardLayout from './layout'
import ManageGalery from '~/components/manage_galery'
import { dialogState } from '~/utils/stores/dialog.store'
import { GaleriesType } from '~/utils/types/galeries.type'
import style from '#css/dashboard.module.css'
import GaleryImage from '~/components/galery_image'
import { ToastContainer } from 'react-toastify'

const Dashboard = ({ galeries }: { galeries: GaleriesType }) => {
  const setDialogElement = dialogState((state) => state.setDialogElement)
  console.log(galeries)

  return (
    <main className={style.main}>
      <ToastContainer />
      <button
        className={style.add_btn}
        onClick={() => setDialogElement(<ManageGalery name={null} date={null} />)}
      >
        Ajouter une galerie +
      </button>
      <section className={style.galeries}>
        {galeries.length ? galeries.map((galery) => <GaleryImage galery={galery} />) : null}
      </section>
    </main>
  )
}

Dashboard.layout = (page: JSX.Element) => <DashboardLayout>{page}</DashboardLayout>

export default Dashboard
