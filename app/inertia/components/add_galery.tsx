import style from '#css/add_galery.module.css'
import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { FileUploader } from 'react-drag-drop-files'
const fileTypes = ['JPG', 'PNG', 'JPEG', 'ARW']
const AddGalery = () => {
  const { data, setData, post, processing } = useForm<{
    name: string
    date: Date
    files: File[]
  }>({
    name: '',
    date: new Date(),
    files: [],
  })
  const handleChange = (files: File[]) => {
    const fileArray: File[] = [...data.files]
    fileArray.push(...files)
    setData({ ...data, files: fileArray })
  }

  function validateGalery(e: FormEvent) {
    e.preventDefault()
    post('/galery')
  }

  return (
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
    </div>
  )
}

export default AddGalery
