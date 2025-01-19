import { create } from 'zustand'
import type { DialogStateType } from '../types/dialogState.type'

export const dialogState = create<DialogStateType>((set) => ({
  dialogElement: null,
  setDialogElement: (element) => set({ dialogElement: element }),
}))
