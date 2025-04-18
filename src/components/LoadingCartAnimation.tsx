import { motion } from "framer-motion";


const LoadingCartAnimation = () => {
  return (
    
    <>
    <motion.div 
      className="cart-box-background absolute inset-0"
      animate={{
        x: ["0%", "-100%"]
      }}
      transition={{
        x: {
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }
      }}
    />
    <motion.div 
      className="cart-box-background absolute inset-0"
      animate={{
        x: ["100%", "0%"]
      }}
      transition={{
        x: {
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }
      }}
    />
  </>  )
}

export default LoadingCartAnimation;