import { GaleryType, UrlDataType } from '~/utils/types/galery.type'
import DisplayGalery from '~/components/display_galery'
import { useState } from 'react'
import ImagePreview from '~/components/image_preview'
import style from '#css/galery.module.css'

const Galery = (props: { images: Array<GaleryType>; urlData: UrlDataType; _csrf: string }) => {
  const [imageId, setImageId] = useState<number | null>(null)
  return (
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
            />
          )
        })}
      </ul>
    </main>
  )
}

export default Galery
