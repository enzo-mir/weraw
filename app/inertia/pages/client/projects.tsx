import { Link } from '@inertiajs/react'
import arrow from '#assets/icons/down_arrow.svg'
import greenSquare from '#assets/images/green_square.png'
import pinkStart from '#assets/images/pink_star.png'
import bee from '#assets/images/bee.png'
import nono from '#assets/images/nono.png'
import styles from '#css/projects.module.css'
import { motion } from 'motion/react'
import { upToDownAnimation } from '~/utils/animations/up_to_down'

type ProjectTypeProps = {
  collection: [
    [
      {
        format: string
        width: number
        height: number
        asset_id: string
        secure_url: string
        metadata: {
          title: string
          description: string
          date: string
          description_2?: string
        }
      },
    ],
  ]
}

const Projects = (props: ProjectTypeProps) => {
  console.log(props);
  
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <img src={arrow} alt="" />
          Accueil
        </Link>
      </header>

      <main className={styles.main}>
        <section className={styles.head_section}>
          <div>
            <h1>WeRaw</h1>
            <p>
              <em>//</em> Explorez la galerie de mes projets photographiques et plongez dans
              l'univers visuel de chaque événement que j'ai capturé !
            </p>

            <p>
              <em>//</em> Partager avec vous les clichés bruts de vos moments précieux, pour que
              vous puissiez sélectionner ceux qui méritent d'être sublimés.
            </p>
            <p>
              <em>//</em> Découvrez, choisissez et personnalisez vos souvenirs pour qu'ils reflètent
              parfaitement votre vision.
            </p>
          </div>

          <aside>
            <motion.img src={nono} alt="landing beach" />
            <motion.img src={pinkStart} alt="pink star" {...upToDownAnimation()} />
            <motion.img
              src={greenSquare}
              alt="green square"
              {...upToDownAnimation()}
              animate={{ rotate: -45, opacity: 1 }}
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
                  <li key={photo.asset_id}>
                    <img
                      src={photo.secure_url}
                      loading="lazy"
                      alt={photo.metadata.title}
                      height={400}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}

export default Projects
