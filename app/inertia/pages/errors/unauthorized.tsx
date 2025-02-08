import style from '#css/error_page.module.css'
export default function Unauthorized() {
  const homeUrl = location.origin.replace('photos.', '')

  return (
    <main className={style.container}>
      <div>
        <span></span>
        <h1>Oups !</h1>
        <p>Le lien est in valide ou expiré</p>
        <a href={homeUrl} rel="noreferrer">
          Revenez en lieux sûr
        </a>
      </div>
    </main>
  )
}
