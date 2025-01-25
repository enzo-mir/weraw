import { useForm, usePage } from '@inertiajs/react'
import { FormEvent } from 'react'
import { toast } from 'react-toastify'
import { dialogState } from '~/utils/stores/dialog.store'
import style from '#css/manage_galery.module.css'

const EditAdmin = () => {
  const { user, _csrf } = usePage().props as unknown as { user: { email: string }; _csrf: string }
  const setDialogElement = dialogState((state) => state.setDialogElement)
  const { data, setData, post } = useForm<{
    email: string
    newEmail?: string
    password?: string
    password_confirmation?: string
  }>({
    email: user.email,
  })

  function handlSubmit(e: FormEvent) {
    e.preventDefault()
    post('/admin/edit', {
      onSuccess: () => {
        toast.success('Compte modifié')
        setDialogElement(null)
      },
      onError: (e) => {
        toast.error(e.message)
      },
    })
  }
  return (
    <div className={style.container}>
      <h2>Modification du compte admin</h2>
      <form onSubmit={handlSubmit}>
        <p>Email :</p>
        <input
          className={style.input}
          type="email"
          name="email"
          defaultValue={user.email}
          onChange={(e) => setData({ ...data, newEmail: e.target.value })}
          required
        />
        <p>Mot de passe :</p>
        <input
          className={style.input}
          type="password"
          autoComplete="new-password"
          name="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <p>Confirmation du mot de passe</p>
        <input
          className={style.input}
          type="password"
          name="password"
          onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
        />
        <input type="hidden" name="_csrf" value={_csrf} />

        <button>Valider</button>
      </form>
    </div>
  )
}

export default EditAdmin
