import DisplayGalery from '~/components/display_galery'
import style from '#css/galery.module.css'
import Header from './header'
import { PropsType } from '~/utils/types/props.type'
import Dialog from '~/components/dialog'

const Galery = (props: PropsType) => {
  return (
    <>
      <Dialog />
      <Header />
      <main className={style.main}>
        <ul className={style.galery}>
          <DisplayGalery
            images={props.images}
            _csrf={props._csrf}
            type="client"
            urlData={props.urlData}
          />
        </ul>
      </main>
    </>
  )
}

export default Galery
