import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

const AnimatedSection = ({ children, delay = 0, className = '' }) => {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  })

  const variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        delay: delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedSection
