import checkimg from '#assets/icons/check.png'
import arrowLink from '#assets/icons/arrow_link.png'
import waterPink from '#assets/images/water_pink.png'
import starEye from '#assets/images/star_eye.png'
import star from '#assets/images/star.png'
import style from '#css/home.module.css'
import { useState } from 'react'
import { urlSchema } from '#types/url.type'
import { ZodError } from 'zod'
import { Head } from '@inertiajs/react'
import { toast } from 'react-toastify'
import { motion } from 'motion/react'
import { leftToRightAnimation } from '~/utils/animations/left_to_right'
import { popAnimation } from '~/utils/animations/pop'

export default function Home() {
  const [url, setUrl] = useState<string>('')

  const submitUrl = async () => {
    try {
      await urlSchema.parseAsync(url)
      location.href = url
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.errors[0].message)
      }
    }
  }

  return (
    <>
      <Head title="Accueil" />
      <main className={style.main}>
        <div className={style.text_side}>
          <motion.h1 {...leftToRightAnimation()}>
            Welcome,
            <br />
            Bienvenue,
            <br />
            Bienvenido,
            <br />
            <em>to WeRaw</em>
          </motion.h1>
          <motion.p {...leftToRightAnimation({ delay: 0.5 })}>
            Votre espace dédié à la prévisualisation
            <br /> de votre shooting photo.
          </motion.p>
          <motion.section
            {...leftToRightAnimation({ delay: 0.75, duration: 0.2 })}
            className={style.url_section}
          >
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
                placeholder="https://photos.weraw.fr/..."
                required
                pattern="^https:\/\/photos\.weraw.fr\/.*"
              />
              <button onClick={submitUrl}>
                <img src={checkimg} alt="Check icon" width={25} height={25} />
              </button>
            </div>
          </motion.section>
        </div>
        <aside className={style.aside}>
          <motion.img
            {...popAnimation({ delay: 0.25 })}
            src={waterPink}
            alt="Water pink image"
            fetchPriority="high"
            loading="lazy"
          />
          <motion.img
            {...popAnimation({ delay: 0.35 })}
            src={star}
            alt="Star image"
            fetchPriority="high"
            loading="lazy"
          />
          <motion.div {...popAnimation({ delay: 0.45 })} className={style.square}></motion.div>
          <motion.img
            {...popAnimation({ delay: 0.55 })}
            src={starEye}
            alt="Star eye image"
            width={550}
            fetchPriority="high"
            loading="lazy"
          />
        </aside>
      </main>
    </>
  )
}
