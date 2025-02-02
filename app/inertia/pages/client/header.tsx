import { Link, usePage } from '@inertiajs/react'
import pinkArrow from '#assets/icons/arrow_link.png'
import styleback from '#css/header_client.module.css'
import style from '#css/header_client.module.css'
import CountDownTimer from '~/services/count_down'
import downArrow from '#assets/icons/down_arrow.svg'
import changeEndSeleced from '~/services/change_end_selected'
import { useRef, useState } from 'react'
import { Id, ToastContainer } from 'react-toastify'
import { motion } from 'motion/react'
import { upToDownAnimation } from '~/utils/animations/up_to_down'
import confirmdelstyle from '#css/confirm_del.module.css'
import { dialogState } from '~/utils/stores/dialog.store'

const Header = () => {
  const [openCta, setOpenCta] = useState<boolean>(false)
  const {
    exp,
    urlData: { endSelected, name, createdAt, groupe, id },
    _csrf,
  } = usePage().props

  const [endSelectedState, setEndSelectedState] = useState<boolean>(Boolean(endSelected))
  const toastId = useRef<Id>(null)

  const setDialogElement = dialogState((state) => state.setDialogElement)

  const ConfirmEndSelected = () => {
    return (
      <>
        <div className={confirmdelstyle.container}>
          <p>Avez-vous fini votre sélection ?</p>
          <sub>*La fin de la selection met fin aux actions sur les images au bout de 24h</sub>
          <div>
            <button
              onClick={() => {
                changeEndSeleced(
                  groupe,
                  id,
                  _csrf,
                  !endSelectedState,
                  setEndSelectedState,
                  toastId,
                  setOpenCta
                ).then(() => setDialogElement(null))
              }}
            >
              Oui
            </button>
            <button onClick={() => setDialogElement(null)}>Non</button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <ToastContainer />

      <motion.header {...upToDownAnimation()} className={style.header}>
        <div>
          <nav>
            <Link href="/" className={styleback.back}>
              <img src={pinkArrow} alt="arrow back to menu" />
              <p>
                Revenir à l'accueil <em>WeRaw</em>
              </p>
            </Link>
            <p>
              Le lien expire dans : <CountDownTimer targetDate={exp!} />
            </p>
          </nav>
          <aside>
            <h1>{name}</h1>
            <p>{new Date(createdAt).toLocaleDateString()}</p>
          </aside>
        </div>

        <div>
          <p>
            *Les photos sont volontairement de moins bonne qualité afin d'éviter tout risque de vol.
          </p>
          <aside
            className={openCta ? style.ctaOpen + ' ' + style.cta : style.cta}
            data-endselected={endSelectedState}
            role="group"
          >
            <div>
              <p>{endSelectedState ? 'Séléction terminé' : 'En cours de sélection'}</p>
              <button onClick={() => setOpenCta(!openCta)}>
                <img src={downArrow} alt="" />
              </button>
            </div>

            <div onClick={() => !endSelected && setDialogElement(<ConfirmEndSelected />)}>
              <p>{!endSelectedState ? 'Séléction terminé' : 'En cours de sélection'}</p>
            </div>
          </aside>
        </div>
      </motion.header>
    </>
  )
}

export default Header
