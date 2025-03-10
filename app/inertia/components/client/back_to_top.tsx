import arrowBlack from '#assets/icons/down_arrow_dark.svg'
import styles from '#css/projects.module.css'
import { motion } from 'motion/react'

const BackToTop = () => {
  return (
    <motion.button
      className={styles.back_to_top}
      onClick={() => window.scrollTo(0, 0)}
      initial={{ bottom: -100 }}
      animate={{ bottom: 20, transition: { duration: 0.2 } }}
      exit={{ bottom: -100 }}
    >
      <img src={arrowBlack} width={20} height={20} />
    </motion.button>
  )
}

export default BackToTop
