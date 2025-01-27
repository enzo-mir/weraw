import style from '#css/manage_galery.module.css'
import { useForm, usePage } from '@inertiajs/react'
import { FormEvent, useRef } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { Id, toast } from 'react-toastify'
import { dialogState } from '~/utils/stores/dialog.store'
import UrlToSend from './admin/url_to_send'
import { ExpType } from '~/utils/types/galery.type'

const fileTypes = ['JPG', 'PNG', 'JPEG']

const ManageGalery = ({ name, date }: { name: string | null; date: Date | null }) => {
  const isEditing: boolean = name !== null
  const props = usePage().props as unknown as { urlData: { id: string } }
  const { id } = isEditing ? props.urlData : { id: '' }

  const exp = isEditing ? (usePage().props as unknown as ExpType).exp : undefined
  const expDate = exp ? new Date(exp * 1000).toISOString() : undefined

  const { data, setData, post } = useForm<{
    name: string
    date: Date
    exp?: string
    files: File[]
  }>({
    name: name || '',
    date: date || new Date(),
    files: [],
    exp: expDate,
  })
  const setDialogElement = dialogState((state) => state.setDialogElement)
  const progressToastId = useRef<Id | null>(null)

  const notifyError = (text: string) =>
    toast(text, {
      type: 'error',
      autoClose: 2000,
    })

  const loader = (percentage: number) => {
    if (!progressToastId.current) {
      progressToastId.current = toast(
        `${isEditing ? 'Mise à jour' : 'Téléchargement'}: ${percentage}%`,
        {
          type: 'info',
          hideProgressBar: false,
          autoClose: false,
        }
      )
    } else {
      toast.update(progressToastId.current, {
        render: `${isEditing ? 'Mise à jour' : 'Téléchargement'}: ${percentage}%`,
      })
    }
  }

  const handleChange = (files: File[]) => {
    const fileArray: File[] = [...data.files]
    fileArray.push(...files)
    setData({ ...data, files: fileArray })
  }

  function validateGalery(e: FormEvent) {
    e.preventDefault()
    post(`/galery/admin/${isEditing ? `edit/${id}` : 'add'}`, {
      forceFormData: true,
      onError: (e) => {
        notifyError(e.message)
        progressToastId.current = null
      },

      onProgress: (e) => {
        if (e && e.percentage !== undefined) {
          loader(e.percentage)
        }
      },

      onSuccess: () => {
        toast.update(progressToastId.current!, {
          render: isEditing ? 'Mise à jour effectué' : 'Téléchargement terminé!',
          type: 'success',
          autoClose: 1500,
        })
        progressToastId.current = null
        setDialogElement(null)
      },
    })
  }

  return (
    <>
      <div className={style.container}>
        <h2>{isEditing ? 'Éditer la galerie' : "Ajouter une galerie d'image"}</h2>
        <form onSubmit={validateGalery}>
          <input
            className={style.input}
            onChange={(e) => setData({ ...data, name: e.currentTarget.value })}
            type="text"
            defaultValue={data.name}
            required
            placeholder="Nom de la galerie"
          />
          <input
            className={style.input}
            type="date"
            defaultValue={
              date?.toISOString().split('T')[0] || data.date.toISOString().split('T')[0]
            }
            onChange={(e) => setData({ ...data, date: new Date(e.currentTarget.value) })}
            required
          />
          {!isEditing ? (
            <FileUploader
              className={style.drag_div}
              handleChange={handleChange}
              multiple={true}
              name="file"
              types={fileTypes}
            />
          ) : (
            <>
              <UrlToSend />
              <label htmlFor="date">
                <p>Expiration</p>
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={(e) =>
                    setData({ ...data, exp: new Date(e.currentTarget.value).toISOString() })
                  }
                  defaultValue={data.exp!.split('T')[0]}
                />
              </label>
            </>
          )}
          <button type="submit">Valider</button>
        </form>
      </div>
    </>
  )
}

export default ManageGalery
