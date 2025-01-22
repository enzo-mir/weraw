import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'

export default function addPhotos(files: File[], _csrf: string, galeryName: string) {
  const formData = new FormData()
  for (const file of files) {
    formData.append('files', file)
  }

  formData.append('_csrf', _csrf)
  formData.append('galeryName', galeryName)
  fetch('/image/add', {
    method: 'POST',

    body: formData,
  }).then((res) => {
    if (res.ok) {
      toast.success('Photo ajoutée')
      router.reload()
    } else {
      toast.error("Erreur lors de l'ajout")
    }
  })
}
