import DashboardLayout from './layout'
import ManageGalery from '~/components/manage_galery'
import { dialogState } from '~/utils/stores/dialog.store'
import style from '#css/dashboard.module.css'
import GaleryImage from '~/components/galery_image'
import { PropsType } from '~/utils/types/props.type'
import { Head } from '@inertiajs/react'
import { motion } from 'motion/react'
import { leftToRightAnimation } from '~/utils/animations/left_to_right'

const Dashboard = ({ ...props }: PropsType) => {
  const setDialogElement = dialogState((state) => state.setDialogElement)

  return (
    <DashboardLayout email={props.user!.email} _csrf={props._csrf}>
      <main className={style.main}>
        <Head title="Dashboard" />
        <motion.button
          {...leftToRightAnimation({ delay: 0.2 })}
          className={style.add_btn}
          onClick={() => setDialogElement(<ManageGalery {...props} />)}
        >
          Ajouter une galerie +
        </motion.button>
        <section className={style.galeries}>
          {props.galeries.length
            ? props.galeries.map((galery, id) => (
                <GaleryImage key={galery.id} id={id} galery={galery} />
              ))
            : null}
        </section>
      </main>
    </DashboardLayout>
  )
}

export default Dashboard
