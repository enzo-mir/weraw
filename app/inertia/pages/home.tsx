'use client'
import checkimg from '#assets/icons/check.png'
import arrowLink from '#assets/icons/arrow_link.png'
import waterPink from '#assets/images/water_pink.png'
import starEye from '#assets/images/star_eye.png'
import star from '#assets/images/star.png'
import style from '#css/home.module.css'
import { useState } from 'react'
import { urlSchema } from '#types/url.type'
import { ZodError } from 'zod'
import { Head, router } from '@inertiajs/react'
import { toast, ToastContainer } from 'react-toastify'
import { motion } from 'motion/react'
import { leftToRightAnimation } from '~/utils/animations/left_to_right'
import { popAnimation } from '~/utils/animations/pop'

export default function Home() {
  const [url, setUrl] = useState<string>('')

  const submitUrl = async () => {
    try {
      await urlSchema.parseAsync(url)
      router.visit(url)
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.errors[0].message)
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <Head title="homepage" />
      <main className={style.main}>
        <motion.div {...leftToRightAnimation} className={style.text_side}>
          <h1>
            Welcome,
            <br />
            Bienvenue,
            <br />
            Bienvenido,
            <br />
            <em>to WeRaw</em>
          </h1>
          <p>
            Votre espace dédié à la prévisualisation
            <br /> de votre shooting photo.
          </p>
          <section className={style.url_section}>
            <h2>
              Rentrez votre url <em>WeRaw</em>
            </h2>
            <img src={arrowLink} alt="Arrow link icon" width={30} />
            <div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.currentTarget.value)}
                name="weraw_url"
                placeholder="https://photos.weraw/..."
                required
                pattern="^https:\/\/photos\.weraw\/.*"
              />
              <button onClick={submitUrl}>
                <img src={checkimg} alt="Check icon" width={25} height={25} />
              </button>
            </div>
          </section>
        </motion.div>
        <aside className={style.aside}>
          <motion.img {...popAnimation({ delay: 0.25 })} src={waterPink} alt="Water pink image" />
          <motion.img {...popAnimation({ delay: 0.35 })} src={star} alt="Star image"  />
          <motion.div {...popAnimation({ delay: 0.45 })} className={style.square}></motion.div>
          <motion.img
            {...popAnimation({ delay: 0.55 })}
            src={starEye}
            alt="Star eye image"
            width={550}
          />
        </aside>
      </main>
    </>
  )
}
