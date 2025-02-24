import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'
import { deleteImageService } from '~/services/delete_image'
import { dialogState } from '~/utils/stores/dialog.store'
import style from '#css/confirm_del.module.css'
import { useEffect } from 'react'

export const ConfirmDelete = ({
  type,
  _csrf,
  setState,
}: {
  type: {
    imageUrls?: Array<string>
    galeryUrl?: string
    profileId?: number
  }
  setState?: React.Dispatch<React.SetStateAction<Array<string>>>
  _csrf: string
}) => {
  const setDialogElement = dialogState((state) => state.setDialogElement)

  function handleClick(e: globalThis.KeyboardEvent) {
    if (e.key === 'Escape') setDialogElement(null)
    if (e.key === 'Enter') {
      type.profileId ? handleDeleteProfile() : handleDeleteImage()
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleClick, { once: true })
    return () => {
      window.removeEventListener('keydown', handleClick)
    }
  }, [])

  function handleDeleteProfile() {
    router.delete(`/profile/${type.profileId}`, {
      onSuccess: () => {
        setDialogElement(null)
        toast.success('Profil supprimé avec succès', {
          autoClose: 2000,
        })
      },
      onError: () => {
        toast('Une erreur est survenue', {
          type: 'error',
          autoClose: 2000,
        })
        window.addEventListener('keydown', handleClick, { once: true })
      },
    })
  }

  async function handleDeleteImage() {
    if (type.imageUrls !== undefined) {
      const response = await deleteImageService(type.imageUrls, _csrf)
      if (response.ok) {
        setDialogElement(null)
        setState && setState([])
        toast.success('Image supprimée avec succès', {
          autoClose: 2000,
        })
        router.reload({ only: ['images'] })
      } else {
        toast('Une erreur est survenue', {
          type: 'error',
          autoClose: 2000,
        })
        window.addEventListener('keydown', handleClick, { once: true })
      }
    }
    if (type.galeryUrl) {
      router.delete(type.galeryUrl)
      setDialogElement(null)
    }
  }
  return (
    <>
      <div className={style.container}>
        <p>
          Voulez-vous vraiment supprimer{' '}
          {type.profileId ? 'le profil' : type.imageUrls ? "l'image" : 'la galerie'} ?
        </p>
        <div>
          <button
            onClick={() => {
              type.profileId ? handleDeleteProfile() : handleDeleteImage()
            }}
          >
            Oui
          </button>
          <button onClick={() => setDialogElement(null)}>Non</button>
        </div>
      </div>
    </>
  )
}
