import { GaleryType, UrlDataType } from '~/utils/types/galery.type'
import style from '#css/galery.module.css'
import { router, usePage } from '@inertiajs/react'
import ImagePreview from '~/components/image_preview'
import { ChangeEvent } from 'react'
import { changeDone } from '~/services/change_done'
const Galery = ({
  images,
  urlData,
  imageId,
  _csrf,
}: {
  images: Array<GaleryType>
  urlData: UrlDataType
  imageId?: number
  _csrf: string
}) => {
  async function handleChangDone(e: ChangeEvent<HTMLInputElement>) {
    await changeDone(e.currentTarget.checked, _csrf, urlData.id)
  }
  return (
    <>
      {imageId !== null ? <ImagePreview id={imageId!} images={images} /> : null}
      <main className={style.main}>
        <label className={style.switch}>
          <input type="checkbox" defaultChecked={urlData.done} onChange={handleChangDone} />
          <span className={style.slider}></span>
        </label>

        <p>{urlData.end_selected ? 'Selection finis' : 'Selection en cours'}</p>
        <ul className={style.galery}>
          {images.map((image, id) => {
            return (
              <li
                key={id + image.url}
                onClick={() => {
                  router.visit(location.href + '?id=' + id)
                }}
              >
                <img src={image.url} />
                {image.like ? <p>Liked</p> : null}
                {image.comment ? <p>{image.comment.slice(0, 20)}...</p> : <p>No comment</p>}
              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
}

export default Galery
