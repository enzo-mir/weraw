import syle from '#css/galery_image.module.css'
import { router } from '@inertiajs/react'
import { GaleriesType } from '~/utils/types/galeries.type'
const GaleryImage = ({ ...props }: { galery: GaleriesType[0] }) => {
  const handleClick = () => {
    router.visit(`/galery/admin/${props.galery.id}`)
  }

  console.log(props.galery)

  return (
    <article onClick={handleClick} key={props.galery.id} className={syle.article}>
      <h2>{props.galery.name}</h2>
      <p>Date : {new Date(props.galery.created_at).toLocaleDateString()}</p>
      <p>Avancement : {props.galery.done ? 'Terminé' : 'En cours'}</p>
      <p>Selection : {props.galery.end_selected ? 'Sélectionné' : 'En cours de selection'}</p>
      <div>
        {props.galery.url.length
          ? props.galery.url
              .slice(0, 3)
              .map((url: string) => (
                <img key={url} src={url} alt={props.galery.name} loading="lazy" />
              ))
          : null}
      </div>
    </article>
  )
}

export default GaleryImage
