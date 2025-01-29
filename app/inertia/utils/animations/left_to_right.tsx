import { easeInOut } from 'framer-motion'
import { Transition } from 'framer-motion'
export const leftToRightAnimation = (transition?: Transition) => {
  return {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: 100,
    },
    transition: {
      duration: 0.5,
      easeInOut,
      ...transition,
    },
  }
}
