import { router } from '@inertiajs/react'
import { toast, ToastContainer } from 'react-toastify'
import { deleteImageService } from '~/services/delete_image'
import { dialogState } from '~/utils/stores/dialog.store'
import { GaleryType } from '~/utils/types/galery.type'
import style from '#css/confirm_del.module.css'

export const ConfirmDelImage = ({ image, _csrf }: { image: GaleryType; _csrf: string }) => {
  const setDialogElement = dialogState((state) => state.setDialogElement)

  async function handleDeleteImage() {
    const response = await deleteImageService(image.id, _csrf)
    if (response.ok) {
      setDialogElement(null)
      router.visit(location.href)
    } else {
      toast("Une erreur est survenue lors de la suppression de l'image", {
        type: 'error',
        autoClose: 2000,
      })
    }
  }
  return (
    <>
      <ToastContainer />
      <div className={style.container}>
        <p>Voulez-vous vraiment supprimer l'image ?</p>
        <div>
          <button onClick={() => handleDeleteImage()}>Oui</button>
          <button onClick={() => setDialogElement(null)}>Non</button>
        </div>
      </div>
    </>
  )
}
