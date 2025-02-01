import React, { JSX, useEffect } from 'react'
import { Deferred, usePage } from '@inertiajs/react'
import Loader from '~/components/loader'
import { AnimatePresence } from 'motion/react'
const DefferedLayout = ({ data, children }: { data: string | string[]; children: JSX.Element }) => {
  const props = usePage().props
  const [dataProps, setDataProps] = React.useState<any>(props)

  useEffect(() => {
    console.log(props.deferred)
    setDataProps(props)
  }, [props])
  return (
    <Deferred
      fallback={
        <AnimatePresence mode="wait">
          <Loader />
        </AnimatePresence>
      }
      data={data}
    >
      {React.cloneElement(children, { ...dataProps })}
    </Deferred>
  )
}

export default DefferedLayout
