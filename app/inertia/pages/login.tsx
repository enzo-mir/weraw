import { FormEvent } from 'react'
import { FormValues } from '../utils/types/login.type'
import { toast, ToastContainer } from 'react-toastify'
import style from '#css/login.module.css'
import { Head, useForm } from '@inertiajs/react'
import { motion } from 'motion/react'
import { leftToRightAnimation } from '~/utils/animations/left_to_right'

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
        <motion.label htmlFor="email" {...leftToRightAnimation({ delay: 0.2 })}>
          Email
          <input
            type="email"
            onChange={(e) => setData({ email: e.currentTarget.value, password: data.password })}
            name="email"
            required
          />
        </motion.label>
        <motion.label htmlFor="password" {...leftToRightAnimation({ delay: 0.3 })}>
          Mot de passe
          <input
            type="password"
            name="password"
            onChange={(e) => setData({ email: data.email, password: e.currentTarget.value })}
            required
          />
        </motion.label>
        <motion.button type="submit" {...leftToRightAnimation({ delay: 0.4 })}>
          Connexion
        </motion.button>
      </form>
    </main>
  )
}

export default Login
