import style from '#css/add_galery.module.css'
import { useForm, usePage } from '@inertiajs/react'
import { FormEvent, useEffect } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { toast, ToastContainer } from 'react-toastify'
import { dialogState } from '~/utils/stores/dialog.store'
const fileTypes = ['JPG', 'PNG', 'JPEG']
const ManageGalery = ({ name, date }: { name: string | null; date: Date | null }) => {
  const isEditing: boolean = name !== null
  const { id } = isEditing
    ? (usePage().props as unknown as { urlData: { id: string } }).urlData
    : { id: '' }
  const { data, setData, post } = useForm<{
    name: string
    date: Date
    files: File[]
  }>({
    name: name || '',
    date: date || new Date(),
    files: [],
  })
  const setDialogElement = dialogState((state) => state.setDialogElement)

  const notify = (text: string) =>
    toast(text, {
      type: 'error',
      autoClose: 2000,
    })

  const handleChange = (files: File[]) => {
    const fileArray: File[] = [...data.files]
    fileArray.push(...files)
    setData({ ...data, files: fileArray })
  }

  function validateGalery(e: FormEvent) {
    e.preventDefault()
    post(`/galery/${isEditing ? `edit/${id}` : 'add'}`, {
      forceFormData: true,
      onError: (e) => {
        notify(e.message)
      },
      onSuccess: () => {
        setDialogElement(null)
      },
    })
  }
  useEffect(() => {
    console.log(data.date.toISOString().split('T')[0])
  }, [data.date])

  return (
    <>
      <ToastContainer />
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
          ) : null}
          <button type="submit">Valider</button>
        </form>
      </div>
    </>
  )
}

export default ManageGalery
