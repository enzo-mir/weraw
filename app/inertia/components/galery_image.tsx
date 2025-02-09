import syle from '#css/galery_image.module.css'
import { router } from '@inertiajs/react'
import { GaleriesType } from '~/utils/types/galeries.type'
import { motion } from 'motion/react'
import { appearAnimation } from '~/utils/animations/appear'

const GaleryImage = ({ ...props }: { galery: GaleriesType[0]; id: number }) => {
  const handleClick = () => {
    router.visit(`/galery/${props.galery.id}`)
  }
  return (
    <motion.article
      {...appearAnimation({ delay: props.id * 0.1 })}
      onClick={handleClick}
      key={props.galery.id}
      className={syle.article}
    >
      <h2>{props.galery.name}</h2>
      <p>Date : {new Date(props.galery.created_at).toLocaleDateString()}</p>
      <p>Avancement : {props.galery.done ? 'Terminé' : 'En cours'}</p>
      <p>Selection : {props.galery.end_selected ? 'Sélectionné' : 'En cours de selection'}</p>
      <div>
        {props.galery.url.length
          ? props.galery.url.map((url: string) => (
              <img key={url} src={url} alt={props.galery.name} loading="lazy" />
            ))
          : null}
      </div>
    </motion.article>
  )
}

export default GaleryImage
