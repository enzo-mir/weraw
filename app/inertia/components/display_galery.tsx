import { GaleryType, UrlDataType } from '~/utils/types/galery.type'

import heart from '#assets/icons/heart.svg'
import comment from '#assets/icons/comment.svg'
import { usePage } from '@inertiajs/react'
import { JSX } from 'react'

const DisplayGalery = (props: {
  image: GaleryType
  _csrf: string
  id: number
  setImageId: (id: number) => void
  deleteBtn?: JSX.Element
}) => {
  const urlData = usePage().props.urlData as unknown as UrlDataType

  return (
    <li onClick={() => props.setImageId(props.id)}>
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
    </li>
  )
}

export default DisplayGalery
