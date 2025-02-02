import DisplayGalery from '~/components/display_galery'
import { JSX, useState } from 'react'
import ImagePreview from '~/components/image_preview'
import style from '#css/galery.module.css'
import Header from './header'
import { PropsType } from '~/utils/types/props.type'
import { ToastContainer } from 'react-toastify'
import Dialog from '~/components/dialog'
import DefferedLayout from '../layout/deffered_layout'

const Galery = (props: PropsType) => {
  const [imageId, setImageId] = useState<number | null>(null)

  return (
    <>
      <Dialog />
      <ToastContainer />
      <Header />
      <main className={style.main}>
        {imageId !== null ? (
          <ImagePreview type="client" setImageId={setImageId} id={imageId} />
        ) : null}
        <ul className={style.galery}>
          {props.images.map((image, id) => {
            return (
              <DisplayGalery
                key={id + image.url}
                image={image}
                id={id}
                _csrf={props._csrf}
                setImageId={setImageId}
                type="user"
              />
            )
          })}
        </ul>
      </main>
    </>
  )
}
Galery.layout = (page: JSX.Element) => (
  <DefferedLayout children={page} data={['images', 'urlData', 'exp']} />
)
export default Galery
