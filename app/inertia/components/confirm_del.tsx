import { Link, router } from '@inertiajs/react'
import { toast, ToastContainer } from 'react-toastify'
import { deleteImageService } from '~/services/delete_image'
import { dialogState } from '~/utils/stores/dialog.store'
import { GaleryType } from '~/utils/types/galery.type'
import style from '#css/confirm_del.module.css'

export const ConfirmDelete = ({
  type,
  _csrf,
}: {
  type: {
    image?: GaleryType
    url?: string
  }
  _csrf: string
}) => {
  const setDialogElement = dialogState((state) => state.setDialogElement)
  async function handleDeleteImage() {
    if (type.image !== undefined) {
      const response = await deleteImageService(type.image.id, _csrf)
      if (response.ok) {
        setDialogElement(null)
        router.reload()
      } else {
        toast('Une erreur est survenue', {
          type: 'error',
          autoClose: 2000,
        })
      }
    } else {
        setDialogElement(null)
        router.post(type.url as string)
    }
  }
  return (
    <>
      <ToastContainer />
      <div className={style.container}>
        <p>Voulez-vous vraiment supprimer {type.image ? "l'image" : 'la galerie'} ?</p>
        <div>
          <button onClick={() => handleDeleteImage()}>Oui</button>
          <button onClick={() => setDialogElement(null)}>Non</button>
        </div>
      </div>
    </>
  )
}
