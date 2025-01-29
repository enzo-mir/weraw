import style from '#css/image_preview.module.css'
import { router, usePage } from '@inertiajs/react'
import { toast } from 'react-toastify'
import { likeImage } from '~/services/like_image'
import { UrlDataType } from '~/utils/types/galery.type'

type HeartIconProps = {
  id: number
  liked: boolean
  type: 'client' | 'admin'
}

const HeartIcon: React.FC<HeartIconProps> = ({ id, liked, type }) => {
  const _csrf = usePage().props._csrf as string
  const group = (usePage().props as unknown as { urlData: UrlDataType }).urlData.groupe

  const handleClick = async () => {
    if (type === 'admin') return
    try {
      await likeImage(group, id, _csrf)

      toast.success("Mise à jour de l'image effectuée !", {
        autoClose: 2000,
        hideProgressBar: true,
      })
      router.reload()
    } catch (error) {
      toast.error("Une erreur s'est produite", {
        autoClose: 2000,
        hideProgressBar: true,
      })
    }
  }

  return liked ? (
    <svg
      className={style.heart}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
      <g id="SVGRepo_iconCarrier">
        <path
          d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z"
          fill="var(--pink)"
        />
      </g>
    </svg>
  ) : (
    <svg
      className={style.heart}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
          stroke="var(--pink)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default HeartIcon
