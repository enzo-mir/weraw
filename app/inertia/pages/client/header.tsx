import { Link, usePage } from '@inertiajs/react'
import pinkArrow from '#assets/icons/arrow_link.png'
import styleback from '#css/galery.module.css'
import style from '#css/header_client.module.css'
import CountDownTimer from '~/services/count_down'
import downArrow from '#assets/icons/down_arrow.svg'
import changeEndSeleced from '~/services/change_end_selected'
import { useRef, useState } from 'react'
import { Id } from 'react-toastify'
import { motion } from 'motion/react'
import { upToDownAnimation } from '~/utils/animations/up_to_down'
const Header = () => {
  const [openCta, setOpenCta] = useState<boolean>(false)
  const {
    exp,
    urlData: { endSelected, name, createdAt, groupe, id },
    _csrf,
  } = usePage().props

  const [endSelectedState, setEndSelectedState] = useState<boolean>(Boolean(endSelected))
  const toastId = useRef<Id>(null)

  return (
    <motion.header {...upToDownAnimation({ delay: 3.5 })} className={style.header}>
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
          <div
            onClick={() => {
              changeEndSeleced(
                groupe,
                id,
                _csrf,
                !endSelectedState,
                setEndSelectedState,
                toastId,
                setOpenCta
              )
            }}
          >
            <p>{!endSelectedState ? 'Séléction terminé' : 'En cours de sélection'}</p>
          </div>
        </aside>
      </div>
    </motion.header>
  )
}

export default Header
