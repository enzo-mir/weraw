import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'

export const likeImage = async (id: number, _csrf: string, liked: boolean, url: string) => {
  const response = await fetch(`/${url}/like`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
    body: JSON.stringify({ id, _csrf, liked: !liked }),
  })

  if (!response.ok) {
    toast.error("Une erreur s'est produite", {
      autoClose: 2000,
      hideProgressBar: true,
    })
    return
  }
  toast.success("Mise à jour de l'image effectuée !", {
    autoClose: 2000,
    hideProgressBar: true,
  })
  return router.reload({ only: ['images'] })
}
