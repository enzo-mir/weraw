import overlayStyle from '#css/dialog.module.css'
import style from '#css/image_preview.module.css'
import { usePage } from '@inertiajs/react'
import { GaleryType } from '~/utils/types/galery.type'
import arrow from '#assets/icons/arrow.svg'
import heart from '#assets/icons/heart.svg'
import comment from '#assets/icons/comment.svg'
import { useState } from 'react'
import Comment from './comment'

const ImagePreview = ({
  id,
  setImageId,
  type,
}: {
  id: number
  setImageId: (v: number | null) => void
  type: 'client' | 'admin'
}) => {
  const [openComment, setOpenComment] = useState<boolean>(false)
  const images = usePage().props.images as Array<GaleryType>
  document.onkeydown = (e) => {
    if (e.code === 'ArrowRight') changeImage(e, 'next')
    if (e.code === 'ArrowLeft') changeImage(e, 'prev')
    return
  }

  const goBack = () => setImageId(null)

  const changeImage = (e: React.MouseEvent | KeyboardEvent, mode: 'prev' | 'next') => {
    e.stopPropagation()
    if (mode === 'prev' && id > 0) {
      setImageId(id - 1)
    } else if (mode === 'next' && id < images.length - 1) {
      setImageId(id + 1)
    }
  }

  const LikeIcon = () => {
    return images[id].like ? (
      <img src={heart} alt="heart like" title="Aimé" className={style.heart} />
    ) : type === 'client' ? (
      <img
        src={heart}
        alt="heart like"
        title="Aimer"
        className={style.heart}
        style={{ opacity: 0.7 }}
      />
    ) : null
  }

  const CommentIcon = () => {
    return images[id].like ? (
      <img
        src={comment}
        alt="comment icon"
        title="commentaire"
        className={style.comment}
        height={30}
        onClick={() => setOpenComment(!openComment)}
      />
    ) : type === 'client' ? (
      <img
        src={comment}
        alt="comment icon"
        title="commentaire"
        className={style.comment}
        height={30}
        onClick={() => setOpenComment(!openComment)}
        style={{ opacity: 0.7 }}
      />
    ) : null
  }

  return (
    <div className={overlayStyle.overlay} onClick={goBack}>
      <button
        className={style.before_btn}
        onClick={(e) => changeImage(e, 'prev')}
        disabled={id === 0}
      >
        <img src={arrow} alt="previous image arrow" />
      </button>
      <article className={style.container} onClick={(e) => e.stopPropagation()}>
        <div>
          <p>Image n°{id! + 1}</p>
          <LikeIcon />
          <CommentIcon />
        </div>
        <img src={images[id].url} alt={images[id].url} fetchPriority="high" />
      </article>
      {openComment ? <Comment comment={images[id].comment} /> : null}
      <button
        className={style.after_btn}
        onClick={(e) => changeImage(e, 'next')}
        disabled={id === images.length - 1}
      >
        <img src={arrow} alt="next image arrow" />
      </button>
    </div>
  )
}

export default ImagePreview
