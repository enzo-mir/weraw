import waterPink from '#assets/images/water_pink.png'
import starEye from '#assets/images/star_eye.png'
import star from '#assets/images/star.png'
import style from '#css/home.module.css'
import { Head, router } from '@inertiajs/react'
import { motion } from 'motion/react'
import { leftToRightAnimation } from '~/utils/animations/left_to_right'
import { popAnimation } from '~/utils/animations/pop'
import { JSX } from 'react'
import Layout from './client/layout'

function Home() {
  return (
    <>
      <Head>
        <title>Accueil</title>
        <link rel="preload" href={waterPink} as="image" />
        <link rel="preload" href={starEye} as="image" />
        <link rel="preload" href={star} as="image" />
        <meta
          name="description"
          content="Weraw - une application qui facilite l'intéraction entre photographe et client !"
        />
      </Head>
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
            className={style.pellicule_section}
          >
            <button onClick={() => router.visit('/photos')}>
              <h2>
                Découvrez ma <em>pellicule</em>
              </h2>
            </button>
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

Home.layout = (children: JSX.Element) => <Layout>{children}</Layout>
export default Home
