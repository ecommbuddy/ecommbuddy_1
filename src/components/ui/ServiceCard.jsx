import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

const ServiceCard = ({ icon, title, description, delay = 0 }) => {
  const IconComponent = LucideIcons[icon] || LucideIcons['Circle']

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.2, delay, ease: 'easeOut' }}
      whileHover={{ 
        y: -15,
        scale: 1.05,
        transition: { 
          type: 'spring', 
          stiffness: 600, 
          damping: 25,
          duration: 0.2
        }
      }}
      className="bg-white border border-border rounded-lg p-6 transition-all duration-200 hover:border-[#006342] cursor-pointer relative overflow-hidden group"
      style={{ willChange: 'transform' }}
    >
      {/* Bubble animation effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={false}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, 0.1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle, rgba(0, 99, 66, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          width: '200px',
          height: '200px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div className="relative z-10 flex flex-col space-y-4">
        <motion.div 
          className="w-12 h-12 flex items-center justify-center"
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <IconComponent className="w-8 h-8 text-[#006342]" strokeWidth={2} />
        </motion.div>
        <h3 className="text-xl font-semibold text-primary group-hover:text-[#006342] transition-colors duration-200">{title}</h3>
        <p className="text-muted text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

export default ServiceCard
