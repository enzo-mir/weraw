import { easeInOut } from 'framer-motion'
import { Transition } from 'framer-motion'
export const upToDownAnimation = (transition?: Transition) => {
  return {
    initial: {
      opacity: 0,
      y: -100,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -100,
    },
    transition: {
      duration: 0.5,
      easeInOut,
      ...transition,
    },
  }
}
