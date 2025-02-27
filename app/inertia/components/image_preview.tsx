import overlayStyle from '#css/dialog.module.css'
import style from '#css/image_preview.module.css'
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
import { GaleryType } from '~/utils/types/galery.type'

const ImagePreview = ({
  id,
  setImageId,
  type,
  images,
  _csrf,
}: {
  id: number
  setImageId: (v: number | null) => void
  type: 'client' | 'admin'
  images: GaleryType[]
  _csrf: string
}) => {
  const imageName = images[id].url.split('/').pop()
  const [displayClientComment, setDisplayClientComment] = useState<boolean>(false)
  const [[page, direction], setPage] = useState([id, 0])

  const imageIndex = wrap(0, images.length, page)
  const paginate = (newDirection: number) => {
    const newPage = page + newDirection
    if (newPage < 0 || newPage >= images.length) return
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

    if (e.code === 'ArrowRight') paginate(1)
    if (e.code === 'ArrowLeft') paginate(-1)
    if (e.code === 'Escape') setImageId(null)

    return
  }

  const goBack = () => setImageId(null)

  return (
    <>
      <AnimatePresence mode="wait" propagate>
        {displayClientComment ? (
          <CommentSide
            _csrf={_csrf}
            type={type}
            id={images[id].id}
            text={images[id].comment}
            setDisplayClientComment={setDisplayClientComment}
          />
        ) : null}
      </AnimatePresence>
      <div className={overlayStyle.overlay} onClick={goBack}>
        <article className={style.container} onClick={() => setDisplayClientComment(false)}>
          <motion.div {...upToDownAnimation()}>
            {type === 'client' ? null : <p>{imageName}</p>}
            <HeartIcon liked={images[id].like} id={images[id].id} type={type} />
            <CommentIcon
              commented={!!images[id].comment}
              onClick={(e) => {
                e.stopPropagation()
                setDisplayClientComment(true)
              }}
            />
          </motion.div>
          <motion.div>
            <AnimatePresence
              propagate
              onExitComplete={() => (document.body.style.overflow = 'auto')}
              mode="wait"
              custom={direction}
            >
              <motion.img
                property="image"
                key={page}
                src={images[imageIndex].url}
                alt={images[id].url}
                onClick={(e) => e.stopPropagation()}
                custom={direction}
                variants={imagePreviewVariants}
                initial="enter"
                animate="center"
                exit="exit"
                width={900}
                height={700}
                transition={{
                  x: { stiffness: 100, damping: 20, duration: 0.3 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, { offset, velocity }) => {
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
          disabled={page === images.length - 1}
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
