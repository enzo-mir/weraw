import { create } from 'zustand'
import { GaleryType } from '../types/galery.type'

interface ImagesState {
  images: null | GaleryType[]
  setImages: (images: GaleryType[]) => void
}

export const imagesStore = create<ImagesState>((set) => ({
  images: null,
  setImages: (images: GaleryType[]) => set({ images }),
}))
