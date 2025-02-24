import React, { Suspense, useState } from 'react'
import style from '#css/galery.module.css'
import { Head, Link, router } from '@inertiajs/react'
import pinkArrow from '#assets/icons/arrow_link.png'
import { dialogState } from '~/utils/stores/dialog.store'
import { ConfirmDelete } from '~/components/admin/confirm_del'
const Dialog = React.lazy(() => import('~/components/dialog'))
import ManageGalery from '~/components/manage_galery'
import { FileUploader } from 'react-drag-drop-files'
import addPhotos from '~/services/add_photos'
const DisplayGalery = React.lazy(() => import('~/components/display_galery'))
import { PropsType } from '~/utils/types/props.type'
import { GaleryType } from '~/utils/types/galery.type'

const Galery = (props: PropsType) => {
  const fileTypes = ['JPG', 'PNG', 'JPEG']
  const setDialogElement = dialogState((state) => state.setDialogElement)
  const qs =
    new URLSearchParams(window.location.search).get('customer') ||
    (props.profiles?.length && props.profiles?.[0].id)

  const [imagesData, setImagesData] = useState<GaleryType[] | null>(null)

  function changeFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    const images = props.images.filter((img) => {
      if (value === 'all') return true
      if (value === 'liked') return img.like
      if (value === 'comment') return img.comment
      return false
    })
    setImagesData(images)
  }

  function handlechangeProfile(id: number) {
    router.visit('?customer=' + id)
  }

  return (
    <>
      <Head title="Galery" />
      <Suspense fallback={<></>}>
        <Dialog />
      </Suspense>
      <header className={style.header}>
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
                  type={{ galeryUrl: `/galery/${props.urlData.id}` }}
                />
              )
            }}
          >
            Supprimer
          </button>
        </aside>

        {props.profiles?.length ? (
          <ul className={style.profiles}>
            <p>Profils :</p>
            {props.profiles?.map((profile) => {
              return (
                <li
                  onClick={() => handlechangeProfile(profile.id)}
                  key={profile.id}
                  className={
                    Number.parseInt(qs as string) === profile.id ? style.selected : undefined
                  }
                >
                  <p>{profile.name}</p>
                  <span style={{ backgroundColor: profile.color }}></span>
                </li>
              )
            })}
          </ul>
        ) : null}
      </header>

      <label htmlFor="filter" className={style.filter}>
        <select name="filter" onChange={changeFilter}>
          <option value="all">Tout</option>
          <option value="liked">Favoris</option>
          <option value="comment">Commentés</option>
        </select>
      </label>

      <main className={style.main}>
        <Suspense fallback={<></>}>
          <DisplayGalery
            className={style.galery}
            images={imagesData || props.images}
            _csrf={props._csrf}
            type="admin"
            urlData={props.urlData}
          />
        </Suspense>
      </main>
    </>
  )
}

export default Galery
