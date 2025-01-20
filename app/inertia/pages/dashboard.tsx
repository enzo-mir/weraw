import { JSX } from 'react'
import DashboardLayout from './dashboard/layout'
import AddGalery from '~/components/add_galery'
import { dialogState } from '~/utils/stores/dialog.store'
import { GaleriesType } from '~/utils/types/galeries.type'
import style from '#css/dashboard.module.css'
import GaleryImage from '~/components/galery_image'

const Dashboard = ({ galeries }: { galeries: GaleriesType | [] }) => {
  const setDialogElement = dialogState((state) => state.setDialogElement)

  return (
    <main className={style.main}>
      <button className={style.add_btn} onClick={() => setDialogElement(<AddGalery />)}>
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
