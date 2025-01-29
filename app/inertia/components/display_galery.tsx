import { GaleryType } from '~/utils/types/galery.type'
import heart from '#assets/icons/heart.svg'
import comment from '#assets/icons/comment.svg'
import { usePage } from '@inertiajs/react'
import { JSX } from 'react'
import { motion } from 'motion/react'
import { appearAnimation } from '~/utils/animations/appear'

const DisplayGalery = (props: {
  image: GaleryType
  _csrf: string
  id: number
  setImageId: (id: number) => void
  deleteBtn?: JSX.Element
}) => {
  const urlData = usePage().props.urlData

  return (
    <motion.li {...appearAnimation({ delay: 0.1 })} onClick={() => props.setImageId(props.id)}>
      {props.deleteBtn}
      <img
        width={250}
        height={250}
        src={props.image.url}
        alt={urlData.name + props.id}
        loading="lazy"
      />

      {props.image.like ? <img src={heart} className="heart" alt="heart like" /> : null}
      {props.image.comment ? <img src={comment} className="comment" alt="comment" /> : null}
    </motion.li>
  )
}

export default DisplayGalery
