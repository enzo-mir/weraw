import React, { Suspense } from 'react'
import style from '#css/galery.module.css'
import { Head, Link } from '@inertiajs/react'
import pinkArrow from '#assets/icons/arrow_link.png'
import { dialogState } from '~/utils/stores/dialog.store'
import { ConfirmDelete } from '~/components/admin/confirm_del'
const Dialog = React.lazy(() => import('~/components/dialog'))
import ManageGalery from '~/components/manage_galery'
import { FileUploader } from 'react-drag-drop-files'
import addPhotos from '~/services/add_photos'
const DisplayGalery = React.lazy(() => import('~/components/display_galery'))
import { PropsType } from '~/utils/types/props.type'

const Galery = (props: PropsType) => {
  const fileTypes = ['JPG', 'PNG', 'JPEG']
  const setDialogElement = dialogState((state) => state.setDialogElement)

  return (
    <>
      <Head title="Galery" />
      <Suspense fallback={<></>}>
        <Dialog />
      </Suspense>
      <main className={style.main}>
        <div className={style.header}>
          <Link href="/dashboard" className={style.back}>
            <img src={pinkArrow} alt="arrow back to menu" />
            <p>
              Revenir au dashboard <em>WeRaw</em>
            </p>
          </Link>
          <aside className={style.urlData}>
            <h1>{props.urlData.name}</h1>
            <p>{new Date(props.urlData.createdAt).toLocaleDateString()}</p>
          </aside>

          <div className={style.done}>
            <FileUploader
              className={style.drag_div}
              handleChange={async (file: File[]) =>
                await addPhotos(file, props._csrf, props.urlData.name)
              }
              multiple={true}
              name="file"
              types={fileTypes}
            />
            <p>{props.urlData.endSelected ? 'Terminé' : 'En cours de selection'}</p>
          </div>

          <aside className={style.edit}>
            <button onClick={() => setDialogElement(<ManageGalery {...props} />)}>Éditer</button>
            <button
              className={style.del}
              onClick={() => {
                setDialogElement(
                  <ConfirmDelete
                    _csrf={props._csrf}
                    type={{ url: `/galery/${props.urlData.id}` }}
                  />
                )
              }}
            >
              Supprimer
            </button>
          </aside>
        </div>

        <ul className={style.galery}>
          <Suspense fallback={<></>}>
            <DisplayGalery
              images={props.images}
              _csrf={props._csrf}
              type="admin"
              urlData={props.urlData}
            />
          </Suspense>
        </ul>
      </main>
    </>
  )
}

export default Galery
