import style from '#css/dialog.module.css'
import { dialogState } from '~/utils/stores/dialog.store'
const Dialog = () => {
  const dialogElement = dialogState((state) => state.dialogElement)
  const setDialogElement = dialogState((state) => state.setDialogElement)

  return (
    dialogElement !== null && (
      <div onClick={() => setDialogElement(null)} className={style.overlay}>
        <dialog className={style.dialog} onClick={(e) => e.stopPropagation()} open>
          <button className={style.close_btn} onClick={() => setDialogElement(null)}>fermer</button>
          {dialogElement}
        </dialog>
      </div>
    )
  )
}

export default Dialog
