import { Link } from '@inertiajs/react'
import { UrlDataType } from '~/utils/types/galery.type'
import pinkArrow from '#assets/icons/arrow_link.png'
import styleback from '#css/galery.module.css'
import style from '#css/header_client.module.css'

const Header = ({ urlData }: { urlData: UrlDataType }) => {
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
        <h1>{urlData.name}</h1>
        <p>{new Date(urlData.createdAt).toLocaleDateString()}</p>
      </aside>
    </header>
  )
}

export default Header
