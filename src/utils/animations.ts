
export const slideAnimation = (isHome: boolean) => ({
  initial: { x: isHome ? -390 : 390 },
  animate: { x: 0 },
  exit: { x: isHome ? -390 : 390 },
  transition: { duration: 0.3, ease: "easeInOut" }
})
