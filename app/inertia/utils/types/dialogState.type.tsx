import { JSX } from 'react'

export interface DialogStateType {
  dialogElement: null | JSX.Element
  setDialogElement: (v: null | JSX.Element) => void
}
