import overlayStyle from '#css/dialog.module.css'
import style from '#css/image_preview.module.css'
import { router } from '@inertiajs/react'
import { GaleryType } from '~/utils/types/galery.type'
import arrow from '#assets/icons/arrow.svg'
import heart from '#assets/icons/heart.svg'
import comment from '#assets/icons/comment.svg'
import { useEffect, useState } from 'react'
import Comment from './comment'

const ImagePreview = ({ id, images }: { id: number; images: Array<GaleryType> }) => {
  const [openComment, setOpenComment] = useState<string>('')

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.code === 'ArrowRight') changeImage(e, 'next')
      if (e.code === 'ArrowLeft') changeImage(e, 'prev')
      return
    }
  }, [])

  const goBack = () => router.visit(location.pathname)

  const changeImage = (e: React.MouseEvent | KeyboardEvent, mode: 'prev' | 'next') => {
    e.stopPropagation()
    const search = location.search
    let id = Number.parseInt(search.slice(4))
    const newUrl = location.href.replace('?id=' + id.toString(), '?id=')
    let newId

    if (mode === 'prev' && id > 0) {
      newId = id - 1
      router.visit(newUrl + newId)
    } else if (mode === 'next' && id < images.length - 1) {
      newId = id + 1
      router.visit(newUrl + newId)
    }
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
          <p>Image n°{id + 1}</p>
          {images[id].like ? (
            <img src={heart} alt="heart like" title="Aimé" className={style.heart} />
          ) : null}
          {images[id].comment ? (
            <img
              src={comment}
              alt="comment icon"
              title="commentaire"
              className={style.comment}
              onClick={() => setOpenComment(openComment ? '' : images[id].comment)}
            />
          ) : null}
        </div>
        <img src={images[id].url} alt="" />
      </article>
      {openComment ? <Comment comment={openComment} /> : null}
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
