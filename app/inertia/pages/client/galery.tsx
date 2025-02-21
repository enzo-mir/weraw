import React, { Suspense } from 'react'
const DisplayGalery = React.lazy(() => import('~/components/display_galery'))
import style from '#css/galery.module.css'
import Header from './header'
import { PropsType } from '~/utils/types/props.type'
import { router } from '@inertiajs/react'
const Dialog = React.lazy(() => import('~/components/dialog'))

const Galery = (props: PropsType) => {
  const filter = location.search.split('=')[1]

  console.log(props.images)

  function changeFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    if (value === 'all') return router.visit('?filter=all')
    if (value === 'liked') return router.visit('?filter=liked')
    if (value === 'comment') return router.visit('?filter=comment')
    return router.visit('?filter=all')
  }

  return (
    <>
      <Suspense fallback={<></>}>
        <Dialog />
      </Suspense>
      <Header {...props} />

      <label htmlFor="filter" className={style.filter}>
        <select name="filter" onChange={changeFilter} value={filter}>
          <option value="all">Tout</option>
          <option value="liked">Favoris</option>
          <option value="comment">Commentés</option>
        </select>
      </label>
      <main className={style.main}>
        <Suspense fallback={<></>}>
          <DisplayGalery
            className={style.galery}
            images={props.images}
            _csrf={props._csrf}
            type="client"
            urlData={props.urlData}
          />
        </Suspense>
      </main>
    </>
  )
}

export default Galery
