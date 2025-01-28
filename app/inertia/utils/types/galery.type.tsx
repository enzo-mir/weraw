import { UUID } from 'node:crypto'

export type GaleryType = {
  id: number
  comment: string
  like: boolean
  url: string
}

export type ExpType = { exp: number }

export type UrlDataType = {
  id: number
  done: boolean
  name: string
  jwt: string
  createdAt: string
  endSelected: boolean
  groupe: UUID
}
