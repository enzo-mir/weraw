import { router } from '@inertiajs/react'
import { Id, toast } from 'react-toastify'

export default async function changeEndSeleced(
  urlId: number,
  _csrf: string,
  end_selected: boolean,
  setEndSelected: (endSelected: boolean) => void,
  toastId: React.RefObject<Id | null>,
  setOpenCta: (openCta: boolean) => void
) {
  const response = await fetch(`/end_selected/${urlId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      end_selected,
      _csrf,
    }),
  })
  if (response.ok) {
    if (toastId.current) {
      toast.dismiss(toastId.current)
    }
    toastId.current = toast.success('Changement effectué avec succès', {
      autoClose: 2000,
      hideProgressBar: true,
    })
    setOpenCta(false)
    setEndSelected(end_selected)
    const data = await response.json()

    return router.visit('/galery/' + data.token)
  } else {
    toastId.current = toast.error('Erreur lors du changement', {
      autoClose: 2000,
      hideProgressBar: true,
    })
  }
}
