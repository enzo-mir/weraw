import { usePage } from '@inertiajs/react'
import { MouseEvent } from 'react'
import { toast } from 'react-toastify'
import { UrlDataType } from '~/utils/types/galery.type'

const UrlToSend = () => {
  const groupe = (usePage().props.urlData as unknown as UrlDataType).groupe
  const url = `${window.location.origin}/galery/${groupe}`
  function clipToKeyboard(e: MouseEvent) {
    e.stopPropagation()
    navigator.clipboard
      .writeText(url)
      .then((e) =>
        toast.success('Lien copié', {
          autoClose: 1500,
          hideProgressBar: true,
        })
      )
      .catch(() => {
        toast.error('Impossible de copier le lien', {
          autoClose: 1500,
          hideProgressBar: true,
        })
      })
  }

  return (
    <label>
      <p>Lien :</p>
      <input type="url" name="url" disabled value={url} />
      <button type="button" onClick={clipToKeyboard}>
        Copier
      </button>
    </label>
  )
}

export default UrlToSend
