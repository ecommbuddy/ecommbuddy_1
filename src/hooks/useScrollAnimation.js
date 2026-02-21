import { useInView } from 'react-intersection-observer'

const useScrollAnimation = (options = {}) => {
  const { ref, inView } = useInView({
    threshold: options.threshold || 0.1,
    triggerOnce: options.triggerOnce !== undefined ? options.triggerOnce : true,
    ...options,
  })

  return { ref, isInView: inView }
}

export default useScrollAnimation
