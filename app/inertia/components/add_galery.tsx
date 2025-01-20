import style from '#css/add_galery.module.css'
import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { toast, ToastContainer } from 'react-toastify'
import { dialogState } from '~/utils/stores/dialog.store'
const fileTypes = ['JPG', 'PNG', 'JPEG']
const AddGalery = () => {
  const { data, setData, post, processing, progress } = useForm<{
    name: string
    date: Date
    files: File[]
  }>({
    name: '',
    date: new Date(),
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
    post('/galery', {
      forceFormData: true,
      onError: (e) => {
        notify(e.message)
      },
      onSuccess: (e) => {
        console.log(e)

        setDialogElement(null)
      },
    })
  }

  return (
    <>
      <ToastContainer />
      <div className={style.container}>
        <h2>Ajouter une galerie d'image</h2>
        <form onSubmit={validateGalery}>
          <input
            className={style.input}
            onChange={(e) => setData({ ...data, name: e.currentTarget.value })}
            type="text"
            required
            placeholder="Nom de la galerie"
          />
          <input
            className={style.input}
            type="date"
            onChange={(e) => setData({ ...data, date: e.currentTarget.value as unknown as Date })}
            required
          />
          <FileUploader
            className={style.drag_div}
            handleChange={handleChange}
            multiple={true}
            name="file"
            types={fileTypes}
          />
          {processing && <p>loading</p>}
          <button type="submit">Valider</button>
        </form>
        {progress && (
          <progress value={progress.percentage} max="100">
            {progress.percentage}%
          </progress>
        )}
      </div>
    </>
  )
}

export default AddGalery
