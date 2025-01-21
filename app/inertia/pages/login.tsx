import { FormEvent } from 'react'
import { FormValues } from '../utils/types/login.type'
import { toast, ToastContainer } from 'react-toastify'
import style from '#css/login.module.css'
import { useForm } from '@inertiajs/react'
const Login = () => {
  const { data, setData, post } = useForm<FormValues>({
    email: '',
    password: '',
  })
  const notify = (text: string) =>
    toast(text, {
      type: 'error',
      autoClose: 2000,
    })

  async function handlSubmit(e: FormEvent) {
    e.preventDefault()
    post('/login', {
      onSuccess: (e) => {
        console.log(e)
      },
      onError: (e) => {
        notify(e.message)
      },
    })
  }

  return (
    <main className={style.main}>
      <ToastContainer />
      <form onSubmit={handlSubmit}>
        <input
          type="email"
          onChange={(e) => setData({ email: e.currentTarget.value, password: data.password })}
          name="email"
          required
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setData({ email: data.email, password: e.currentTarget.value })}
          required
        />
        <button type="submit">Connexion</button>
      </form>
    </main>
  )
}

export default Login
