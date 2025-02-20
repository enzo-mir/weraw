import { GaleryType, UrlDataType } from '~/utils/types/galery.type'
import heart from '#assets/icons/heart.svg'
import preview from '#assets/icons/preview.svg'
import comment from '#assets/icons/comment.svg'
import { motion } from 'motion/react'
import { appearAnimation } from '~/utils/animations/appear'
import deleteImage from '#assets/icons/delete.svg'
import style from '#css/galery.module.css'
import { dialogState } from '~/utils/stores/dialog.store'
import { ConfirmDelete } from './admin/confirm_del'
import { useEffect, useRef, useState } from 'react'
import ImagePreview from './image_preview'
import FlipMove from 'react-flip-move';

const DisplayGalery = (props: {
  images: GaleryType[]
  _csrf: string
  type: 'admin' | 'client'
  urlData: UrlDataType
  className:string
}) => {
  const splitNumber = 50
  const [imagesData, setImagesData] = useState<Array<GaleryType>>(
    props.images.slice(0, splitNumber)
  )
  const [hasMore, setHasMore] = useState(true)
  const loader = useRef<HTMLDivElement | null>(null)
  const [imageId, setImageId] = useState<number | null>(null)
  const setDialogElement = dialogState((state) => state.setDialogElement)

  useEffect(() => {
    setImagesData(props.images.slice(0, splitNumber))
    setHasMore(props.images.length > splitNumber)
  }, [props.images])

  const loadMoreImages = () => {
    const currentLength = imagesData.length

    if (currentLength >= props.images.length) {
      setHasMore(false)
      return
    }

    const nextBatch = props.images.slice(currentLength, currentLength + splitNumber)
    setImagesData((prevImages) => [...prevImages, ...nextBatch])
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreImages()
        }
      },
      { threshold: 1 }
    )

    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => {
      if (loader.current) observer.unobserve(loader.current)
    }
  }, [hasMore, imagesData])

  return (
    <>
      {imageId !== null && props.images.length ? (
        <ImagePreview
          _csrf={props._csrf}
          type={props.type}
          setImageId={setImageId}
          id={imageId}
          images={props.images}
        />
      ) : null}
      
      <FlipMove className={props.className}>
      {imagesData.map((image, id) => {
        return (
          <motion.li
            key={image.id}
            {...appearAnimation({ delay: 0.1 })}
            onClick={() => props.type === 'client' && setImageId(id)}
          >
            <img
              width={150}
              height={250}
              src={image.url}
              alt={props.urlData.name + id}
              loading="lazy"
            />
            {props.type === 'admin' ? (
              <div className={style.action}>
                <button onClick={() => setImageId(id)}>
                  <img src={preview} alt="eye preview" />
                </button>
                <button
                  onClick={() =>
                    setDialogElement(<ConfirmDelete _csrf={props._csrf} type={{ image }} />)
                  }
                >
                  <img src={deleteImage} alt="delet image" />
                </button>
              </div>
            ) : null}

            {image.like ? <img src={heart} className="heart" alt="heart like" /> : null}
            {image.comment ? <img src={comment} className="comment" alt="comment" /> : null}
          </motion.li>
        )
      })}
      </FlipMove>

      {hasMore && <div ref={loader} className={style.loader}></div>}
    </>
  )
}

export default DisplayGalery
