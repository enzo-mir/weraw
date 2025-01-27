import overlayStyle from '#css/dialog.module.css'
import style from '#css/image_preview.module.css'
import { usePage } from '@inertiajs/react'
import { GaleryType } from '~/utils/types/galery.type'
import arrow from '#assets/icons/arrow.svg'
import { useEffect, useState } from 'react'
import CommentSide from './client/comment_side'
import HeartIcon from '~/assets/icons/heart'
import CommentIcon from '~/assets/icons/comment'
import { ToastContainer } from 'react-toastify'
import { imagesStore } from '~/utils/stores/images.store'

const ImagePreview = ({
  id,
  setImageId,
  type,
}: {
  id: number
  setImageId: (v: number | null) => void
  type: 'client' | 'admin'
}) => {
  const imagesProps = usePage().props.images as Array<GaleryType>
  const [displayClientComment, setDisplayClientComment] = useState<boolean>(false)
  const images: Array<GaleryType> = imagesStore(
    (state) => state.images
  ) as unknown as Array<GaleryType>

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  document.onkeydown = (e) => {
    if (e.code === 'ArrowRight') changeImage(e, 'next')
    if (e.code === 'ArrowLeft') changeImage(e, 'prev')
    if (e.code === 'Escape') setImageId(null)
    return
  }

  const goBack = () => setImageId(null)

  const changeImage = (e: React.MouseEvent | KeyboardEvent, mode: 'prev' | 'next') => {
    e.stopPropagation()
    if (mode === 'prev' && id > 0) {
      setImageId(id - 1)
    } else if (mode === 'next' && id < (images || imagesProps).length - 1) {
      setImageId(id + 1)
    }
  }

  return (
    <>
      <ToastContainer stacked={false} />
      {displayClientComment ? (
        <CommentSide
          type={type}
          id={(images || imagesProps)[id].id}
          text={(images || imagesProps)[id].comment}
          setDisplayClientComment={setDisplayClientComment}
        />
      ) : null}
      <div className={overlayStyle.overlay} onClick={goBack}>
        <article className={style.container} onClick={(e) => e.stopPropagation()}>
          <div>
            {type === 'client' ? null : <p>Image n°{id! + 1}</p>}
            <HeartIcon
              liked={(images || imagesProps)[id].like}
              id={(images || imagesProps)[id].id}
              type={type}
            />
            <CommentIcon
              commented={!!(images || imagesProps)[id].comment}
              onClick={() => setDisplayClientComment(true)}
            />
          </div>
          <img
            src={(images || imagesProps)[id].url}
            alt={(images || imagesProps)[id].url}
            fetchPriority="high"
            onClick={() => setDisplayClientComment(false)}
          />
        </article>
        <button
          className={style.before_btn}
          onClick={(e) => changeImage(e, 'prev')}
          disabled={id === 0}
        >
          <img src={arrow} alt="previous image arrow" />
        </button>
        <button
          className={style.after_btn}
          onClick={(e) => changeImage(e, 'next')}
          disabled={id === (images || imagesProps).length - 1}
        >
          <img src={arrow} alt="next image arrow" />
        </button>
      </div>
    </>
  )
}

export default ImagePreview
