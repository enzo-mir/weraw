import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'
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
  console.log(type.url)

  async function handleDeleteImage() {
    if (type.image !== undefined) {
      const response = await deleteImageService(type.image.id, _csrf)
      if (response.ok) {
        setDialogElement(null)
        toast.success('Image supprimée avec succès', {
          autoClose: 2000,
        })
        router.reload({only: ['images']})
      } else {
        toast('Une erreur est survenue', {
          type: 'error',
          autoClose: 2000,
        })
      }
    }
    if (type.url) {
      router.delete(type.url)
      setDialogElement(null)
    }
  }
  return (
    <>
      <div className={style.container}>
        <p>Voulez-vous vraiment supprimer {type.image ? "l'image" : 'la galerie'} ?</p>
        <div>
          <button onClick={async () => await handleDeleteImage()}>Oui</button>
          <button onClick={() => setDialogElement(null)}>Non</button>
        </div>
      </div>
    </>
  )
}
