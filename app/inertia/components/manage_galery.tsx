import style from '#css/manage_galery.module.css'
import { useForm, usePage } from '@inertiajs/react'
import { FormEvent, useRef } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { Id, toast } from 'react-toastify'
import { dialogState } from '~/utils/stores/dialog.store'
import UrlToSend from './admin/url_to_send'
import { PropsType } from '~/utils/types/props.type'
const fileTypes = ['JPG', 'PNG', 'JPEG']

const ManageGalery = (props: PropsType) => {
  const isEditing: boolean = !!props.urlData

  const id = isEditing ? props.urlData?.id : ''

  const exp = isEditing ? usePage().props.exp : undefined
  const expDate = exp ? new Date(Number(exp) * 1000).toISOString() : new Date().toISOString()

  const { data, setData, post, put, processing } = useForm<{
    name: string
    date: Date
    exp?: string
    files: File[]
  }>({
    name: props.urlData?.name || '',
    date: props.urlData ? new Date(props.urlData?.createdAt) : new Date(),
    files: [],
    exp: undefined,
  })

  const setDialogElement = dialogState((state) => state.setDialogElement)
  const progressToastId = useRef<Id | null>(null)

  const loader = (percentage: number) => {
    if (!progressToastId.current) {
      progressToastId.current = toast(
        `${isEditing ? 'Mise à jour' : 'Téléchargement'}: ${percentage}%`,
        {
          type: 'info',
          hideProgressBar: true,
        }
      )
    } else {
      toast.update(progressToastId.current, {
        render: `${isEditing ? 'Mise à jour' : 'Téléchargement'}: ${percentage}%`,
        type: 'info',
        hideProgressBar: true,
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
    const formOptions = {
      forceFormData: true,
      preserveState: true,

      onError: (e: { message: string }) => {
        if (e.message) {
          if (!progressToastId.current) {
            progressToastId.current = toast.error(e.message, {
              autoClose: 2000,
            })
          } else {
            toast.update(progressToastId.current, {
              render: e.message,
              type: 'error',
              autoClose: 2000,
            })
          }
        }
      },

      onProgress: (e) => {
        if (e && e.percentage !== undefined) {
          loader(e.percentage)
        }
      },

      onSuccess: () => {
        if (!progressToastId.current) {
          progressToastId.current = toast.success(
            isEditing ? 'Mise à jour effectué' : 'Téléchargement terminé!',
            {
              autoClose: 2000,
            }
          )
        } else {
          toast.update(progressToastId.current, {
            render: isEditing ? 'Mise à jour effectué' : 'Téléchargement terminé!',
            type: 'success',
            autoClose: 2000,
          })
        }

        setDialogElement(null)
      },
    }

    if (isEditing) {
      put(`/galery/${id}`, formOptions)
    } else {
      post('/galery/add', formOptions)
    }
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
            defaultValue={data.date.toISOString().split('T')[0]}
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
                  defaultValue={expDate?.split('T')[0]}
                />
              </label>
            </>
          )}
          <button type="submit" disabled={processing}>
            Valider
          </button>
        </form>
      </div>
    </>
  )
}

export default ManageGalery
