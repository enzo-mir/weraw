import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'

export default async function addPhotos(files: File[], _csrf: string, galeryName: string) {
  const formData = new FormData()
  for (const file of files) {
    formData.append('files', file)
  }

  formData.append('_csrf', _csrf)
  formData.append('galeryName', galeryName)

  const promise = fetch('/admin/image/add', {
    method: 'POST',
    body: formData,
  })
  await toast.promise(promise, {
    pending: 'Téléchargement de(s) photo(s)...',
    success: 'Photo(s) ajoutée(s)',
    error: "Erreur lors de l'ajout",
  })
  if ((await promise).ok) router.reload()
}
