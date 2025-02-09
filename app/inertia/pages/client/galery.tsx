import React, { Suspense } from 'react'
const DisplayGalery = React.lazy(() => import('~/components/display_galery'))
import style from '#css/galery.module.css'
import Header from './header'
import { PropsType } from '~/utils/types/props.type'
const Dialog = React.lazy(() => import('~/components/dialog'))

const Galery = (props: PropsType) => {
  return (
    <>
      <Suspense fallback={<></>}>
        <Dialog />
      </Suspense>
      <Header {...props} />
      <main className={style.main}>
        <ul className={style.galery}>
          <Suspense fallback={<></>}>
            <DisplayGalery
              images={props.images}
              _csrf={props._csrf}
              type="client"
              urlData={props.urlData}
            />
          </Suspense>
        </ul>
      </main>
    </>
  )
}

export default Galery
