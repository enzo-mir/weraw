import style from '#css/error_page.module.css'
export default function ServeError() {
  const homeUrl = location.origin.replace('photos.', '')

  return (
    <main className={style.container}>
      <div>
        <span></span>
        <h1>Oups !</h1>
        <p>Une erreur serveur est survenuee</p>
        <a href={homeUrl} rel="noreferrer">
          Revenez en lieux sûr
        </a>
      </div>
    </main>
  )
}
