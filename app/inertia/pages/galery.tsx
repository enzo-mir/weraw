import { GaleryType, UrlDataType } from '~/utils/types/galery.type'
import style from '#css/galery.module.css'
import { Link, router } from '@inertiajs/react'
import ImagePreview from '~/components/image_preview'
import { changeDone } from '~/services/change_done'
import pinkArrow from '#assets/icons/arrow_link.png'
import { ValidateIcon } from '~/assets/icons/validate'
import { useState } from 'react'
import heart from '#assets/icons/heart.svg'
import comment from '#assets/icons/comment.svg'

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
  const [done, setDone] = useState<number>(urlData.done)
  async function handleChangDone() {
    setDone(done === 0 ? 1 : 0)

    await changeDone(!urlData.done, _csrf, urlData.id)
  }
  return (
    <>
      {imageId !== null ? <ImagePreview id={imageId!} images={images} /> : null}
      <main className={style.main}>
        <div className={style.header}>
          <Link href="/dashboard" className={style.back}>
            <img src={pinkArrow} alt="arrow back to menu" />
            <p>
              Revenir à l'accueil <em>WeRaw</em>
            </p>
          </Link>
          <div className={style.done}>
            <p>Terminé</p>
            <ValidateIcon
              onClick={handleChangDone}
              className={style.validateSvg}
              data-validate={done}
            />
            <p>{urlData.end_selected ? 'Selection finis' : 'Selection en cours'}</p>
          </div>
          <aside className={style.urlData}>
            <h1>{urlData.name}</h1>
            <p>{new Date(urlData.createdAt).toLocaleDateString()}</p>
          </aside>
        </div>
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
                {image.like ? <img src={heart} alt="heart like" /> : null}
                {image.comment ? <img src={comment} alt="comment" /> : null}
              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
}

export default Galery
