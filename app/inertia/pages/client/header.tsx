import React, { Suspense } from 'react'
import pinkArrow from '#assets/icons/arrow_link.png'
import styleback from '#css/header_client.module.css'
import style from '#css/header_client.module.css'
const CountDownTimer = React.lazy(() => import('~/services/count_down'))
import { motion } from 'motion/react'
import { upToDownAnimation } from '~/utils/animations/up_to_down'
import { PropsType } from '~/utils/types/props.type'
import { Head, Link, usePage } from '@inertiajs/react'
import Round from '~/assets/icons/round'

const Header = ({ exp, urlData: { name, createdAt } }: PropsType) => {
  const homeUrl = location.origin.replace('photos.', '')
  const currentUrl = usePage().url

  return (
    <motion.header {...upToDownAnimation()} className={style.header}>
      <Head title={name} />
      <div>
        <nav>
          <a href={homeUrl} className={styleback.back}>
            <img src={pinkArrow} alt="arrow back to menu" />
            <p>
              Revenir à l'accueil <em>WeRaw</em>
            </p>
          </a>
          <p>
            <Suspense fallback={<p>Chargement...</p>}>
              Le lien expire dans : <CountDownTimer targetDate={exp!} />
            </Suspense>
          </p>
        </nav>
        <aside>
          <Link href={`${currentUrl}/guard`}>Changer de profil</Link>
          <div>
            <h1>
              {name}
            </h1>
            <Round/>
          </div>
          <p>{new Date(createdAt).toLocaleDateString()}</p>
        </aside>
      </div>
    </motion.header>
  )
}

export default Header
