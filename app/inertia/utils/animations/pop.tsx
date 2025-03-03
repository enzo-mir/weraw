import { Transition } from 'motion/react'

export const popAnimation = (transition?: Transition) => {
  return {
    initial: {
      opacity: 0,
      scale: 0.5,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.5,
    },
    transition: {
      duration: 0.2,
      ...transition,
    },
  }
}
