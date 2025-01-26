import { Link } from '@inertiajs/react'
import style from '#css/error_page.module.css'
export default function NotFound() {
  return (
    <main className={style.container}>
      <div>
        <span></span>
        <h1>Oups !</h1>
        <p>La page que vous cherchez est introuvable</p>
        <Link href="/" rel="noreferrer">
          Revenez en lieux sûr
        </Link>
      </div>
    </main>
  )
}
