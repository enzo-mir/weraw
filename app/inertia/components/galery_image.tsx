import syle from '#css/galery_image.module.css'
import { router } from '@inertiajs/react'
const GaleryImage = ({ ...props }) => {
  const handleClick = () => {
    router.visit(`/galery/${props.galery.id}`)
  }
  return (
    <article onClick={handleClick} key={props.galery.id} className={syle.article}>
      <h2>{props.galery.name}</h2>
      <p>Date : {new Date(props.galery.created_at).toLocaleDateString()}</p>
      <p>Avancement : {props.galery.done ? 'Terminé' : 'En cours'}</p>
      <p>Selection : {props.galery.end_selected ? 'Sélectionné' : 'En cours de selection'}</p>
      <div>
        {props.galery.url.map((url: string) => (
          <img key={url} src={url} alt={props.galery.name} loading="lazy" />
        ))}
      </div>
    </article>
  )
}

export default GaleryImage
