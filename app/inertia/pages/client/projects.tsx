import { Head, router } from '@inertiajs/react'
import greenSquare from '#assets/images/green_square.png'
import pinkStart from '#assets/images/pink_star.png'
import bee from '#assets/images/bee.png'
import nono from '#assets/images/nono.png'
import styles from '#css/projects.module.css'
import { motion } from 'motion/react'
import { upToDownAnimation } from '~/utils/animations/up_to_down'
import Round from '#assets/icons/round'
import arrowBlue from '#assets/icons/arrow_link_blue.png'
import arrow from '#assets/icons/down_arrow.svg'
import { leftToRightAnimation } from '~/utils/animations/left_to_right'
import { JSX } from 'react'
import { ProjectTypeProps } from '~/utils/types/projects.type'
import Layout from './layout'

const Projects = (props: ProjectTypeProps) => {
  return (
    <>
      <Head>
        <title>Ma pellicule</title>
        <meta
          name="description"
          content="Weraw - Voici la galerie de mes projets photographiques, plongez dans l'univers visuel de chaque événement que j'ai capturé !"
        />
      </Head>
      <header className={styles.header}>
        <button onClick={() => router.visit('/')}>
          <img src={arrow} />
          Accueil
        </button>
      </header>

      <main className={styles.main}>
        <section className={styles.head_section}>
          <div>
            <motion.h1 {...upToDownAnimation({ easings: 'easeInOut' })}>
              MA PELLICULE
              <Round />
              <motion.img src={arrowBlue} alt="arrow link" />
            </motion.h1>
            <div>
              <motion.p {...leftToRightAnimation({ delay: 0.2 })}>
                Explorez la galerie de mes projets photographiques et plongez dans l'univers visuel
                de chaque événement que j'ai capturé !
              </motion.p>

              <motion.p {...leftToRightAnimation({ delay: 0.3 })}>
                Partager avec vous les clichés bruts de vos moments précieux, pour que vous puissiez
                sélectionner ceux qui méritent d'être sublimés.
              </motion.p>
              <motion.p {...leftToRightAnimation({ delay: 0.4 })}>
                Découvrez, choisissez et personnalisez vos souvenirs pour qu'ils reflètent
                parfaitement votre vision.
              </motion.p>
            </div>
          </div>

          <aside>
            <motion.img src={nono} alt="landing beach" />
            <motion.img src={pinkStart} alt="pink star" {...upToDownAnimation()} />
            <motion.img
              src={greenSquare}
              alt="green square"
              {...upToDownAnimation()}
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: -0, opacity: 1 }}
            />
            <motion.img src={bee} alt="bee in star" />
          </aside>
        </section>

        <section className={styles.photos_section}>
          {props.collection.map((collection, index) => (
            <div key={index}>
              <article className={styles.metadata}>
                <span>{collection[index].metadata.date}</span>
                <h3>{collection[index].metadata.title}</h3>
                <div>
                  <p>{collection[index].metadata.description}</p>
                  {collection[index].metadata.description_2 && (
                    <p>{collection[index].metadata.description_2}</p>
                  )}
                </div>
              </article>
              <ul className={styles.collection}>
                {collection.map((photo) => (
                  <motion.li
                    key={photo.asset_id}
                    style={{ gridColumn: `span ${photo.height / photo.width === 2 / 3 ? 2 : 1}` }}
                    viewport={{ amount: 1 }}
                  >
                    <motion.img
                      src={photo.secure_url}
                      loading="lazy"
                      alt={photo.metadata.title}
                      height={400}
                    />
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}
Projects.layout = (children: JSX.Element) => <Layout button={true}>{children}</Layout>

export default Projects
