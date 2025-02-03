import style from '#css/client_comment.module.css'
import { useForm } from '@inertiajs/react'
import { toast } from 'react-toastify'
import { motion } from 'motion/react'
const CommentSide = ({
  text,
  setDisplayClientComment,
  id,
  type,
}: {
  text?: string
  setDisplayClientComment: (v: boolean) => void
  id: number
  type: 'client' | 'admin'
}) => {
  const { data, setData, post } = useForm({
    comment: text || '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post(`/comment/${id}`, {
      onSuccess: () => {
        toast.success('Commentaire mis à jour !', {
          autoClose: 2000,
          hideProgressBar: true,
        })
        setDisplayClientComment(false)
      },
      onError: (e) => {
        toast.error(e.message, {
          autoClose: 2000,
          hideProgressBar: true,
        })
      },
    })
  }
  return (
    <motion.aside
      className={style.container}
      initial={{ width: '0px', minWidth: '0px', paddingInline: 0 }}
      animate={{ width: '40%', paddingInline: '3em' }}
      exit={{ width: '0%', minWidth: '0px', paddingInline: 0 }}
    >
      <button className={style.close_btn} onClick={() => setDisplayClientComment(false)}>
        <svg
          id="Calque_1"
          data-name="Calque 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 285.24 326.87"
          fill="#fff"
        >
          <defs></defs>
          <path
            className="cls-1"
            d="M283.19,185.61c-4.55,0-9.55-.68-15.01-2.05-6.82-.91-13.42-1.59-19.79-2.05-23.2-.91-51.64-1.59-85.3-2.05l-3.41,141.94c-2.73,3.64-10.01,5.46-21.84,5.46-16.38,0-23.66-3.18-21.84-9.55,2.27-8.64,4.54-17.62,6.82-26.95,2.27-9.32,3.41-27.18,3.41-53.57,0-19.11-.23-37.98-.68-56.64-30.94-.45-65.06-2.95-102.36-7.51C7.73,162.19,0,151.04,0,139.21c0-1.36.45-2.05,1.36-2.05s3.41,1.02,7.51,3.07c4.09,2.05,7.27,3.07,9.55,3.07,8.64.92,44.12,1.6,106.45,2.05.45-74.61-3.87-120.78-12.96-138.53-.92-1.36-1.36-2.73-1.36-4.09,0-1.81,1.81-2.73,5.46-2.73,6.82,0,19.11,3.87,36.85,11.6,4.54,20.02,7.73,64.38,9.55,133.07l104.41,4.78c12.28,17.29,18.43,28.44,18.43,33.44,0,1.82-.68,2.73-2.05,2.73Z"
          />
        </svg>
      </button>
      <h2>
        Laissez un commentaire
        <em>WeRaw</em>
      </h2>
      <form onSubmit={handleSubmit}>
        <sub>{data.comment.length}/200</sub>
        <textarea
          maxLength={200}
          rows={10}
          name="comment"
          placeholder="..."
          defaultValue={text}
          onChange={(e) => setData({ ...data, comment: e.target.value })}
          readOnly={type === 'admin'}
        ></textarea>
        <div className={style.cta}>
          {type === 'client' ? <button>Envoyer</button> : null}
          {type === 'client' ? (
            <button onClick={() => setData({ comment: '' })}>Effacer</button>
          ) : null}
        </div>
      </form>
    </motion.aside>
  )
}

export default CommentSide
