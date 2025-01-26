import { UUID } from 'node:crypto'

export type GaleryType = {
  id: number
  comment: string
  like: boolean
  url: string
}

export type UrlDataType = {
  id: number
  done: boolean
  name: string
  jwt: string
  createdAt: string
  end_selected: boolean
  groupe: UUID
}
