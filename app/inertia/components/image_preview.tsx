import overlayStyle from '#css/dialog.module.css'
import style from '#css/image_preview.module.css'
import { usePage } from '@inertiajs/react'
import arrow from '#assets/icons/arrow.svg'
import { useEffect, useState } from 'react'
import CommentSide from './client/comment_side'
import HeartIcon from '~/assets/icons/heart'
import CommentIcon from '~/assets/icons/comment'
import { motion, AnimatePresence } from 'motion/react'
import { wrap } from 'popmotion'
import { upToDownAnimation } from '~/utils/animations/up_to_down'
import {
  imagePreviewVariants,
  swipeConfidenceThreshold,
  swipePower,
} from '~/utils/animations/image_preview'

const ImagePreview = ({
  id,
  setImageId,
  type,
}: {
  id: number
  setImageId: (v: number | null) => void
  type: 'client' | 'admin'
}) => {
  const imagesProps = usePage().props.images
  const [displayClientComment, setDisplayClientComment] = useState<boolean>(false)
  const [[page, direction], setPage] = useState([id, 0])

  const imageIndex = wrap(0, imagesProps.length, page)
  const paginate = (newDirection: number) => {
    const newPage = page + newDirection
    if (newPage < 0 || newPage >= imagesProps.length) return
    setPage([newPage, newDirection])
    setImageId(newPage)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  document.onkeydown = (e) => {
    e.stopPropagation()
    if (e.code === 'ArrowRight') {
      paginate(1)
    }
    if (e.code === 'ArrowLeft') {
      paginate(-1)
    }
    if (e.code === 'Escape') setImageId(null)
    return
  }

  const goBack = () => setImageId(null)

  return (
    <>
      <AnimatePresence mode="wait" propagate>
        {displayClientComment ? (
          <CommentSide
            type={type}
            id={imagesProps[id].id}
            text={imagesProps[id].comment}
            setDisplayClientComment={setDisplayClientComment}
          />
        ) : null}
      </AnimatePresence>
      <div className={overlayStyle.overlay} onClick={goBack}>
        <article className={style.container} onClick={(e) => e.stopPropagation()}>
          <motion.div {...upToDownAnimation()}>
            {type === 'client' ? null : <p>Image n°{id! + 1}</p>}
            <HeartIcon liked={imagesProps[id].like} id={imagesProps[id].id} type={type} />
            <CommentIcon
              commented={!!imagesProps[id].comment}
              onClick={() => setDisplayClientComment(true)}
            />
          </motion.div>
          <motion.div>
            <AnimatePresence propagate mode="wait" custom={direction}>
              <motion.img
                property="image"
                key={page}
                src={imagesProps[imageIndex].url}
                alt={imagesProps[id].url}
                onClick={() => setDisplayClientComment(false)}
                custom={direction}
                variants={imagePreviewVariants}
                initial="enter"
                animate="center"
                exit="exit"
                width={900}
                height={700}
                transition={{
                  x: { stiffness: 400, damping: 0 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1)
                  }
                }}
              />
            </AnimatePresence>
          </motion.div>
        </article>
        <motion.button
          {...upToDownAnimation()}
          className={style.before_btn}
          disabled={page === 0}
          onClick={(e) => {
            e.stopPropagation()
            paginate(-1)
          }}
        >
          <img src={arrow} alt="previous image arrow" />
        </motion.button>
        <motion.button
          {...upToDownAnimation()}
          className={style.after_btn}
          disabled={page === imagesProps.length - 1}
          onClick={(e) => {
            e.stopPropagation()
            paginate(1)
          }}
        >
          <img src={arrow} alt="next image arrow" />
        </motion.button>
      </div>
    </>
  )
}

export default ImagePreview
