import { Id, toast } from 'react-toastify'

export const changeDone = async (
  value: boolean,
  _csrf: string,
  urlId: number,
  setDone: (v: boolean) => void,
  done: boolean,
  toastDoneId: React.RefObject<Id | null>
) => {
  const response = await fetch('/admin/url/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      value,
      _csrf,
      urlId,
    }),
  })

  if (!response.ok) {
    toastDoneId.current = toast.error('Une erreur est survenue', {
      autoClose: 2000,
      hideProgressBar: true,
    })
  } else {
    setDone(!done)
    if (!toastDoneId.current) {
      toastDoneId.current = toast.success('Changement effectué', {
        autoClose: 2000,
        hideProgressBar: true,
      })
    } else {
      toast.update(toastDoneId.current, {
        render: 'Changement effectué',
        autoClose: 2000,
        hideProgressBar: true,
      })
    }
  }
}
