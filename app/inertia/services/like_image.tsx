import { UUID } from 'crypto'
import { toast } from 'react-toastify'
import { GaleryType } from '~/utils/types/galery.type'

export const likeImage = async (group: UUID, id: number, _csrf: string) => {
  return await fetch(`/image/like/${group}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
    body: JSON.stringify({ id, _csrf }),
  })
    .then((res) => {
      if (!res.ok) {
        toast.error("Une erreur s'est produite", {
          autoClose: 2000,
          hideProgressBar: true,
        })
        return []
      }
      return res.json()
    })
    .then((data: any) => {
      toast.success("Mise à jour de l'image effectuée !", {
        autoClose: 2000,
        hideProgressBar: true,
      })

      return data.images as Promise<Array<GaleryType>>
    })
}
