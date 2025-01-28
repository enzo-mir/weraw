import { Id, toast } from 'react-toastify'

export default async function changeEndSeleced(
  groupe: string,
  urlId: number,
  _csrf: string,
  end_selected: boolean,
  setEndSelected: (endSelected: boolean) => void,
  toastId: React.RefObject<Id | null>
) {
  const response = await fetch(`/end_selected/${groupe}/${urlId}`, {
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
    setEndSelected(end_selected)
  } else {
    toastId.current = toast.error('Erreur lors du changement', {
      autoClose: 2000,
      hideProgressBar: true,
    })
  }
}
