import { GaleriesType } from './galeries.type'
import { GaleryType, UrlDataType } from './galery.type'

type Errors = Record<string, string>
type ErrorBag = Record<string, Errors>

export type PropsType = {
  errors: Errors & ErrorBag
  images: Array<GaleryType>
  urlData: UrlDataType
  galeries: GaleriesType
  _csrf: string
}
