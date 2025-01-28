import { Link, usePage } from '@inertiajs/react'
import pinkArrow from '#assets/icons/arrow_link.png'
import styleback from '#css/galery.module.css'
import style from '#css/header_client.module.css'
import CountDownTimer from '~/services/count_down'
import changeEndSeleced from '~/services/change_end_selected'
import { useRef, useState } from 'react'
import { Id } from 'react-toastify'

const Header = () => {
  const {
    exp,
    urlData: { endSelected, name, createdAt, groupe, id },
    _csrf,
  } = usePage().props

  const [endSelectedState, setEndSelectedState] = useState<boolean>(endSelected)
  const toastId = useRef<Id>(null)

  return (
    <header className={style.header}>
      <nav>
        <Link href="/" className={styleback.back}>
          <img src={pinkArrow} alt="arrow back to menu" />
          <p>
            Revenir à l'accueil <em>WeRaw</em>
          </p>
        </Link>
      </nav>
      <aside>
        <h1>{name}</h1>
        <p>{new Date(createdAt).toLocaleDateString()}</p>
      </aside>
      <div className={style.cta}>
        <p>
          Le lien expire dans : <CountDownTimer targetDate={exp!} />
        </p>
        <div>
          <p>Avez-vous fini de sélectionner vos photos ?</p>
          <button
            onClick={() =>
              !endSelectedState
                ? changeEndSeleced(
                    groupe,
                    id,
                    _csrf,
                    !endSelectedState,
                    setEndSelectedState,
                    toastId
                  )
                : null
            }
            data-selected={endSelectedState ? 'true' : undefined}
          >
            Oui
          </button>
          <button
            onClick={() =>
              endSelectedState
                ? changeEndSeleced(
                    groupe,
                    id,
                    _csrf,
                    !endSelectedState,
                    setEndSelectedState,
                    toastId
                  )
                : null
            }
            data-selected={!endSelectedState ? 'true' : undefined}
          >
            Non
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
