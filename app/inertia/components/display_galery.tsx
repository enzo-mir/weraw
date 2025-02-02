import { GaleryType } from '~/utils/types/galery.type'
import heart from '#assets/icons/heart.svg'
import preview from '#assets/icons/preview.svg'
import comment from '#assets/icons/comment.svg'
import { usePage } from '@inertiajs/react'
import { motion } from 'motion/react'
import { appearAnimation } from '~/utils/animations/appear'
import deleteImage from '#assets/icons/delete.svg'
import style from '#css/galery.module.css'
import { dialogState } from '~/utils/stores/dialog.store'
import { ConfirmDelete } from './admin/confirm_del'

const DisplayGalery = (props: {
  image: GaleryType
  _csrf: string
  id: number
  setImageId: (id: number) => void
  type: 'admin' | 'user'
}) => {
  const urlData = usePage().props.urlData
  const _csrf = props._csrf
  const setDialogElement = dialogState((state) => state.setDialogElement)
  return (
    <motion.li
      {...appearAnimation({ delay: 0.1 })}
      onClick={() => props.type === 'user' && props.setImageId(props.id)}
    >
      <img
        width={250}
        height={250}
        src={props.image?.url}
        alt={urlData?.name + props.id}
        loading="lazy"
      />
      {props.type === 'admin' ? (
        <div className={style.action}>
          <button onClick={() => props.setImageId(props.id)}>
            <img src={preview} alt="eye preview" />
          </button>
          <button
            onClick={() =>
              setDialogElement(<ConfirmDelete _csrf={_csrf} type={{ image: props.image }} />)
            }
          >
            <img src={deleteImage} alt="delet image" />
          </button>
        </div>
      ) : null}

      {props.image.like ? <img src={heart} className="heart" alt="heart like" /> : null}
      {props.image.comment ? <img src={comment} className="comment" alt="comment" /> : null}
    </motion.li>
  )
}

export default DisplayGalery
