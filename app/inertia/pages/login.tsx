import { FormEvent } from 'react'
import { FormValues } from '../utils/types/login.type'
import { toast, ToastContainer } from 'react-toastify'
import style from '#css/login.module.css'
import { Head, useForm } from '@inertiajs/react'
const Login = () => {
  const { data, setData, post } = useForm<FormValues>({
    email: '',
    password: '',
  })

  async function handlSubmit(e: FormEvent) {
    e.preventDefault()
    post('/auth/login', {
      onError: (e) => {
        toast(e.message, {
          type: 'error',
          autoClose: 2000,
        })
      },
    })
  }

  return (
    <main className={style.main}>
      <Head title="Login" />
      <ToastContainer />
      <form onSubmit={handlSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            onChange={(e) => setData({ email: e.currentTarget.value, password: data.password })}
            name="email"
            required
          />
        </label>
        <label htmlFor="password">
          Mot de passe
          <input
            type="password"
            name="password"
            onChange={(e) => setData({ email: data.email, password: e.currentTarget.value })}
            required
          />
        </label>
        <button type="submit">Connexion</button>
      </form>
    </main>
  )
}

export default Login
