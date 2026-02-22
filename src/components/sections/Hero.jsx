import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, TrendingUp, Search, Rocket, Share2, PenTool, Video } from 'lucide-react'
import Button from '../ui/Button'

const Hero = () => {
  /* ── Cycling words ──────────────────────────── */
  const cyclingWords = [
    { text: 'Build', color: '#60a5fa' },  // light blue
    { text: 'Create', color: '#ff541fff' },  // light red
    { text: 'Construct', color: '#ff74f1ff' },  // yellow
    { text: 'Modify', color: '#006342' },
    { text: 'Develop', color: '#ff8e8eff' },  // yellow
    { text: 'Design', color: '#ff4040ff' },  // brand green
  ]
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((i) => (i + 1) % 6)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  /* ── 3D cursor tilt — only on the h1 ────────── */
  const h1Ref = useRef(null)

  const handleMouseMove = (e) => {
    if (!h1Ref.current) return
    const rect = h1Ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const nx = (e.clientX - cx) / (rect.width / 2)
    const ny = (e.clientY - cy) / (rect.height / 2)
    h1Ref.current.style.transform =
      `perspective(800px) rotateX(${(-ny * 5).toFixed(2)}deg) rotateY(${(nx * 5).toFixed(2)}deg)`
  }

  const handleMouseLeave = () => {
    if (!h1Ref.current) return
    h1Ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
  }

  /* ── Misc ───────────────────────────────────── */
  const serviceIcons = [
    { Icon: Code, name: 'Website Dev', delay: 0 },
    { Icon: TrendingUp, name: 'CRO', delay: 0.1 },
    { Icon: Search, name: 'SEO', delay: 0.2 },
    { Icon: Rocket, name: 'Growth', delay: 0.3 },
    { Icon: Share2, name: 'Social', delay: 0.4 },
    { Icon: PenTool, name: 'Ads', delay: 0.5 },
    { Icon: Video, name: 'Content', delay: 0.6 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  }

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  }

  const floatingVariants = {
    animate: {
      y: [-15, 15, -15],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  return (
    <section
      className="flex items-center justify-center bg-white"
    >
      <div style={{ width: '100%' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.div variants={leftVariants}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block mb-6"
                >
                  <span className="bg-primary text-secondary px-4 py-1.5 rounded-full text-xs font-medium">
                    🚀 Trusted by 50+ ecommerce brands
                  </span>
                </motion.div>
              </motion.div>

              <motion.h1
                ref={h1Ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                variants={leftVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight"
                style={{ transformStyle: 'preserve-3d', transition: 'transform 0.12s ease-out', willChange: 'transform', display: 'inline-block' }}
              >
                {/* "We" — back to full black */}
                We{' '}

                {/* ── Cycling word with color underline ── */}
                <span style={{ position: 'relative', display: 'inline-block', verticalAlign: 'bottom' }}>

                  {/* Text slot — overflow:hidden clips the slide-up animation */}
                  <span style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 1.15 }}>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={wordIndex}
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        exit={{ y: '-100%', opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.645, 0.045, 0.355, 1] }}
                        style={{ display: 'inline-block', color: cyclingWords[wordIndex].color, fontFamily: '"Comic Relief", Inter, sans-serif' }}
                      >
                        <span style={{ opacity: 0.8 }}>&ldquo;</span>
                        {cyclingWords[wordIndex].text}
                        <span style={{ opacity: 0.8 }}>&rdquo;</span>
                      </motion.span>
                    </AnimatePresence>
                  </span>

                  {/* Color-matched underline — grows left → right on each word */}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={`ul-${wordIndex}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
                      style={{
                        display: 'block',
                        height: '4px',
                        borderRadius: '2px',
                        background: cyclingWords[wordIndex].color,
                        transformOrigin: 'left center',
                        marginTop: '-8px',   /* negative margin pulls line up closer to text */
                      }}
                    />
                  </AnimatePresence>
                </span>

                {' '}Websites That Actually Sell
              </motion.h1>

              <motion.p
                variants={leftVariants}
                className="text-lg sm:text-xl text-muted mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                ecommBuddy is your end-to-end ecommerce growth partner — from stunning websites to SEO, ads, and beyond.
              </motion.p>

              <motion.div
                variants={leftVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                <Button to="audit" variant="primary" className="px-8 py-4 text-base">
                  Get Free Audit
                </Button>
                <Button to="stats" variant="outline" className="px-8 py-4 text-base">
                  See Our Work
                </Button>
              </motion.div>

              <motion.div
                variants={leftVariants}
                className="text-sm text-muted flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                <span className="font-medium">50+ Clients</span>
                <span className="hidden sm:inline">|</span>
                <span className="font-medium">3x Avg. Revenue Growth</span>
                <span className="hidden sm:inline">|</span>
                <span className="font-medium">98% Client Retention</span>
              </motion.div>
            </motion.div>

            {/* Right Content - Animated Cards */}
            <motion.div
              variants={rightVariants}
              initial="hidden"
              animate="visible"
              className="hidden lg:block relative h-[500px]"
            >
              <div className="relative w-full h-full">
                {serviceIcons.map((service, index) => (
                  <motion.div
                    key={index}
                    variants={floatingVariants}
                    animate="animate"
                    whileHover={{
                      scale: 1.15,
                      y: -10,
                      transition: { type: 'spring', stiffness: 400, damping: 20, duration: 0.3 },
                    }}
                    style={{
                      position: 'absolute',
                      left: `${15 + index * 12}%`,
                      top: `${20 + index * 10}%`,
                      zIndex: serviceIcons.length - index,
                    }}
                    className="bg-white border-2 border-[#006342] rounded-xl p-4 shadow-lg relative overflow-hidden group cursor-pointer"
                  >
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      initial={false}
                      animate={{ scale: [1, 1.3, 1], opacity: [0, 0.15, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        background: 'radial-gradient(circle, rgba(0, 99, 66, 0.15) 0%, transparent 70%)',
                        borderRadius: '50%',
                        width: '150px',
                        height: '150px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                    <div className="relative z-10">
                      <service.Icon className="w-8 h-8 text-[#006342] mb-2" />
                      <p className="text-xs font-medium text-[#006342]">{service.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section >
  )
}

export default Hero
