import DisplayGalery from '~/components/display_galery'
import { useState } from 'react'
import ImagePreview from '~/components/image_preview'
import style from '#css/galery.module.css'
import Header from './header'
import { PropsType } from '~/utils/types/props.type'
import Dialog from '~/components/dialog'

const Galery = (props: PropsType) => {
  const [imageId, setImageId] = useState<number | null>(null)

  return (
    <>
      <Dialog />
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

export default Galery
