import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

const TeamCard = ({ name, role, bio, initials, gradient, image, delay = 0 }) => {
  const cardRef = useRef(null)

  // Motion values for mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smoothing the mouse movement
  const springConfig = { damping: 20, stiffness: 300 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Transform mouse position to rotation values for 3D tilt
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7])

  // Spotlight shine position
  const shineX = useTransform(springX, [-0.5, 0.5], ['0%', '100%'])
  const shineY = useTransform(springY, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] }}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        willChange: 'transform',
      }}
      className="relative group"
    >
      <motion.div
        whileHover={{
          scale: 1.04,
          transition: { type: 'spring', stiffness: 400, damping: 25 }
        }}
        className="bg-white rounded-xl p-8 shadow-sm border border-border/50 relative overflow-hidden h-full flex flex-col items-center text-center space-y-5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#006342]/10"
      >
        {/* Spotlight Shine Effect */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [shineX, shineY],
              ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.4) 0%, transparent 80%)`
            ),
          }}
        />

        {/* Floating Bubble Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -right-4 -top-4 w-32 h-32 rounded-full bg-[#006342]/5 blur-2xl group-hover:bg-[#006342]/10 transition-colors duration-500"
            animate={{
              y: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center space-y-5">
          {/* Avatar with Elevation */}
          <motion.div
            className="relative w-32 h-32 md:w-28 md:h-28 z-20"
            whileHover={{ scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {/* Background shadow on hover */}
            <div className="absolute inset-0 max-md:rounded-2xl md:rounded-full bg-[#006342]/40 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 md:group-hover:rounded-2xl" />

            {/* Image Container */}
            <motion.div
              className="relative w-full h-full max-md:rounded-2xl md:rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden border-2 border-white shadow-md bg-gray-50 transition-all duration-500 md:group-hover:rounded-2xl group-hover:shadow-[0_20px_40px_-15px_rgba(0,99,66,0.5)]"
              whileHover={{ rotate: 3 }}
            >
              {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <div className={`${gradient} w-full h-full flex items-center justify-center text-white`}>
                  {initials}
                </div>
              )}
            </motion.div>
          </motion.div>

          <div>
            <h3 className="text-xl font-bold text-primary group-hover:text-[#006342] transition-colors duration-300">
              {name}
            </h3>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#006342] mt-1 px-2 py-0.5 bg-[#006342]/5 rounded-md">
                {role}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            {bio}
          </p>
        </div>

        {/* Gradient Border Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#006342]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </motion.div>
  )
}


export default TeamCard
