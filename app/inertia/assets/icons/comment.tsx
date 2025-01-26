import style from '#css/image_preview.module.css'
import { MouseEventHandler } from 'react'

type CommentIconProps = {
  commented: boolean
  onClick: MouseEventHandler<SVGElement>
}

const CommentIcon: React.FC<CommentIconProps> = ({ commented, onClick }) => {
  const iconPath = commented
    ? 'M1662.178 0v1359.964h-648.703l-560.154 560.154v-560.154H0V0h1662.178ZM906.794 755.55H453.32v117.53h453.473V755.55Zm302.063-302.365H453.32v117.529h755.536V453.185Z'
    : 'M1662.178 0v1359.964h-648.703l-560.154 560.154v-560.154H0V0h1662.178ZM1511.07 151.107H151.107v1057.75h453.321v346.488l346.489-346.488h560.154V151.107ZM906.794 755.55v117.53H453.32V755.55h453.473Zm302.063-302.365v117.529H453.32V453.185h755.536Z'

  return (
    <svg
      onClick={onClick}
      className={style.comment}
      fill="var(--blue)"
      viewBox="0 0 1920 1920"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
      <g id="SVGRepo_iconCarrier">
        <path d={iconPath} fillRule="evenodd" />
      </g>
    </svg>
  )
}

export default CommentIcon
