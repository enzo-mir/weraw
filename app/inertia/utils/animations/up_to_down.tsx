import { Transition } from 'motion/react'
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
      type: 'spring',
      bounce: 0,
      ...transition,
    },
  }
}
