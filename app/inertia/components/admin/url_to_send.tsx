import { usePage } from '@inertiajs/react'
import { MouseEvent } from 'react'
import { toast } from 'react-toastify'

const UrlToSend = () => {
  const { url } = usePage().props.urlData

  function clipToKeyboard(e: MouseEvent) {
    e.stopPropagation()

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          return toast.success('Lien copié', {
            autoClose: 1500,
            hideProgressBar: true,
          })
        })
        .catch(() => {
          return toast.error('Impossible de copier le lien', {
            autoClose: 1500,
            hideProgressBar: true,
          })
        })
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = url
      document.body.appendChild(textarea)
      textarea.select()

      try {
        document.execCommand('copy')
        toast.success('Lien copié', {
          autoClose: 1500,
          hideProgressBar: true,
        })
      } catch (err) {
        toast.error('Impossible de copier le lien', {
          autoClose: 1500,
          hideProgressBar: true,
        })
      }
      document.body.removeChild(textarea)
    }
  }

  return (
    <>
      <label htmlFor="url">
        <p>Lien</p>
        <input type="url" name="url" readOnly={true} disabled value={url} />
        <button type="button" onClick={clipToKeyboard}>
          Copier
        </button>
      </label>
    </>
  )
}

export default UrlToSend
