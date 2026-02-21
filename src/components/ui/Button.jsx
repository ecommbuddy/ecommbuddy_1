import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

const Button = ({ 
  variant = 'primary', 
  children, 
  onClick, 
  href, 
  className = '', 
  type = 'button',
  to,
  smooth = true,
  offset = 0,
  duration = 600
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#006342] focus:ring-offset-2 relative z-10'
  
  const variantClasses = {
    primary: 'bg-[#006342] text-white rounded-full px-6 py-3 hover:bg-[#004d33] shadow-lg hover:shadow-xl transition-all duration-200',
    outline: 'border-2 border-[#006342] text-[#006342] bg-transparent rounded-lg px-6 py-3 hover:bg-[#006342] hover:text-white transition-all duration-200',
    ghost: 'text-[#006342] bg-transparent underline-offset-4 hover:underline transition-all duration-200',
  }

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

  const buttonContent = (
    <motion.button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
    >
      {children}
    </motion.button>
  )

  // If href is provided, wrap in anchor tag
  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    )
  }

  // If 'to' is provided, use react-scroll Link
  if (to) {
    return (
      <Link to={to} smooth={smooth} offset={offset} duration={duration} className="inline-block">
        <motion.div
          className={buttonClasses}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        >
          {children}
        </motion.div>
      </Link>
    )
  }

  return buttonContent
}

export default Button
