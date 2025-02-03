export const imagePreviewVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }
  },
}

export const swipeConfidenceThreshold = 10000
export const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}
