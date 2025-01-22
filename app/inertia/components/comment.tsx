import style from '#css/comment.module.css'
const Comment = ({ comment }: { comment: string }) => {
  return (
    <div className={style.container} onClick={(e) => e.stopPropagation()}>
      <p>{comment}</p>
    </div>
  )
}

export default Comment
