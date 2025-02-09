import { GaleriesType } from './galeries.type'
import { GaleryType, UrlDataType } from './galery.type'

type Errors = Record<string, string>
type ErrorBag = Record<string, Errors>

export type PropsType = {
  errors?: Errors & ErrorBag
  images: Array<GaleryType>
  urlData: UrlDataType
  user?: { email: string }
  galeries: GaleriesType
  exp: string
  _csrf: string
}
