import { Link } from '@inertiajs/react'
import style from '#css/error_page.module.css'
export default function ServeError() {
  return (
    <main className={style.container}>
      <div>
        <span></span>
        <h1>Oups !</h1>
        <p>Une erreur serveur est survenuee</p>
        <Link href="/" rel="noreferrer">
          Revenez en lieux sûr
        </Link>
      </div>
    </main>
  )
}
