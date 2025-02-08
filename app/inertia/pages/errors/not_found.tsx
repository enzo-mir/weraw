import style from '#css/error_page.module.css'
export default function NotFound() {
  const homeUrl = location.origin.replace('photos.', '')

  return (
    <main className={style.container}>
      <div>
        <span></span>
        <h1>Oups !</h1>
        <p>La page que vous cherchez est introuvable</p>
        <a href={homeUrl} rel="noreferrer">
          Revenez en lieux sûr
        </a>
      </div>
    </main>
  )
}
