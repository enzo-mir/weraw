import style from '#css/error_page.module.css'
const Page = ({ error }: { error: string }) => {
  const homeUrl = location.origin.replace('photos.', '')

  return (
    <main className={style.container}>
      <div>
        <span></span>
        <h1>Oups !</h1>
        <p>{error}</p>
        <a href={homeUrl} rel="noreferrer">
          Revenez en lieux sûr
        </a>
      </div>
    </main>
  )
}

export default Page
