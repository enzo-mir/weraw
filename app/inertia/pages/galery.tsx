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
import { dialogState } from '~/utils/stores/dialog.store'
import { ConfirmDelImage } from '~/components/confirm_del_image'
import Dialog from '~/components/dialog'
import ManageGalery from '~/components/manage_galery'
import { FileUploader } from 'react-drag-drop-files'
import addPhotos from '~/services/add_photos'
import { ToastContainer } from 'react-toastify'

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
  const setDialogElement = dialogState((state) => state.setDialogElement)
  async function handleChangDone() {
    setDone(done === 0 ? 1 : 0)
    await changeDone(!urlData.done, _csrf, urlData.id)
  }

  const fileTypes = ['JPG', 'PNG', 'JPEG']

  return (
    <>
      <ToastContainer />
      <Dialog />
      {imageId !== null ? <ImagePreview id={imageId!} images={images} /> : null}
      <main className={style.main}>
        <div className={style.header}>
          <Link href="/dashboard" className={style.back}>
            <img src={pinkArrow} alt="arrow back to menu" />
            <p>
              Revenir à l'accueil <em>WeRaw</em>
            </p>
          </Link>
          <aside className={style.urlData}>
            <h1>{urlData.name}</h1>
            <p>{new Date(urlData.createdAt).toLocaleDateString()}</p>
          </aside>
          <div className={style.done}>
            <p>Terminé</p>
            <ValidateIcon
              onClick={handleChangDone}
              className={style.validateSvg}
              data-validate={done}
            />
            <p>{urlData.end_selected ? 'Selection finis' : 'Selection en cours'}</p>
          </div>

          <aside className={style.edit}>
            <Link href={`/galery/${urlData.id}`} method="post" className={style.del}>
              Supprimer
            </Link>
            <button
              onClick={() =>
                setDialogElement(
                  <ManageGalery name={urlData.name} date={new Date(urlData.createdAt)} />
                )
              }
            >
              Éditer
            </button>
          </aside>
        </div>
        <FileUploader
          className={style.drag_div}
          handleChange={(file: File[]) => addPhotos(file, _csrf, urlData.name)}
          multiple={true}
          name="file"
          types={fileTypes}
        />
        <ul className={style.galery}>
          {images.map((image, id) => {
            return (
              <li key={id + image.url} onClick={() => router.visit(location.href + '?id=' + id)}>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setDialogElement(<ConfirmDelImage _csrf={_csrf} image={image} />)
                  }}
                >
                  <span>-</span>
                </button>
                <img src={image.url} alt={urlData.name + id} />
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
