import { GaleryType, UrlDataType } from '~/utils/types/galery.type'
import style from '#css/galery.module.css'
import { Head, Link, usePage } from '@inertiajs/react'
import ImagePreview from '~/components/image_preview'
import pinkArrow from '#assets/icons/arrow_link.png'
import { JSX, useEffect, useRef, useState } from 'react'
import { dialogState } from '~/utils/stores/dialog.store'
import { ConfirmDelete } from '~/components/admin/confirm_del'
import Dialog from '~/components/dialog'
import ManageGalery from '~/components/manage_galery'
import { FileUploader } from 'react-drag-drop-files'
import addPhotos from '~/services/add_photos'
import { Id, ToastContainer } from 'react-toastify'
import DisplayGalery from '~/components/display_galery'
import DefferedLayout from '../layout/deffered_layout'

const Galery = ({
  images,
  urlData,
  _csrf,
}: {
  images: Array<GaleryType>
  urlData: UrlDataType
  _csrf: string
}) => {
  console.log(usePage().props)

  const splitNumber = 50
  const [imagesData, setImagesData] = useState<Array<GaleryType>>(images.slice(0, splitNumber))
  const [hasMore, setHasMore] = useState(true)
  const loader = useRef<HTMLDivElement | null>(null)
  const [imageId, setImageId] = useState<number | null>(null)
  const setDialogElement = dialogState((state) => state.setDialogElement)

  useEffect(() => {
    setImagesData(images.slice(0, splitNumber))
    setHasMore(images.length > splitNumber)
  }, [images])

  const loadMoreImages = () => {
    const currentLength = imagesData.length

    if (currentLength >= images.length) {
      setHasMore(false)
      return
    }

    const nextBatch = images.slice(currentLength, currentLength + splitNumber)
    setImagesData((prevImages) => [...prevImages, ...nextBatch])
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreImages()
        }
      },
      { threshold: 1 }
    )

    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => {
      if (loader.current) observer.unobserve(loader.current)
    }
  }, [hasMore, imagesData])
  const fileTypes = ['JPG', 'PNG', 'JPEG']

  return (
    <>
      <Head title="Galery" />
      <ToastContainer />
      <Dialog />
      {imageId !== null ? <ImagePreview type="admin" setImageId={setImageId} id={imageId} /> : null}
      <main className={style.main}>
        <div className={style.header}>
          <Link href="/dashboard" className={style.back}>
            <img src={pinkArrow} alt="arrow back to menu" />
            <p>
              Revenir au dashboard <em>WeRaw</em>
            </p>
          </Link>
          <aside className={style.urlData}>
            <h1>{urlData.name}</h1>
            <p>{new Date(urlData.createdAt).toLocaleDateString()}</p>
          </aside>

          <div className={style.done}>
            <FileUploader
              className={style.drag_div}
              handleChange={async (file: File[]) => await addPhotos(file, _csrf, urlData.name)}
              multiple={true}
              name="file"
              types={fileTypes}
            />
            <p>{urlData.endSelected ? 'Terminé' : 'En cours de selection'}</p>
          </div>

          <aside className={style.edit}>
            <button
              onClick={() =>
                setDialogElement(
                  <ManageGalery name={urlData.name} date={new Date(urlData.createdAt)} />
                )
              }
            >
              Éditer
            </button>
            <button
              className={style.del}
              onClick={() => {
                setDialogElement(
                  <ConfirmDelete
                    _csrf={_csrf}
                    type={{ url: `/galery/admin/delete/${urlData.id}` }}
                  />
                )
              }}
            >
              Supprimer
            </button>
          </aside>
        </div>

        <ul className={style.galery}>
          {imagesData.length
            ? imagesData.map((image, id) => (
                <DisplayGalery
                  key={id + image.url}
                  image={image}
                  id={id}
                  _csrf={_csrf}
                  setImageId={setImageId}
                  type="admin"
                />
              ))
            : null}
        </ul>
        {hasMore && <div ref={loader} className={style.loader}></div>}
      </main>
    </>
  )
}
Galery.layout = (page: JSX.Element) => (
  <DefferedLayout children={page} data={['images', 'urlData', 'exp']} />
)
export default Galery
