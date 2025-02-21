import Dialog from '~/components/dialog'
import style from '#css/guard.module.css'

const Guard = ({ galeryName, profiles }: { galeryName: string }) => {
  return (
    <Dialog>
      <main className={style.container}>
        <h2>
          Profil pour la galerie <span>{galeryName}</span>
        </h2>
      </main>

    </Dialog>
  )
}

export default Guard
