import { lazy, Suspense, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Link } from 'react-scroll'
import { ArrowUp } from 'lucide-react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Footer from './components/layout/Footer'

// Lazy load sections for better performance
const Stats = lazy(() => import('./components/sections/Stats'))
const Services = lazy(() => import('./components/sections/Services'))
const FreeAudit = lazy(() => import('./components/sections/FreeAudit'))
const AboutUs = lazy(() => import('./components/sections/AboutUs'))
const Contact = lazy(() => import('./components/sections/Contact'))

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
  </div>
)

// Scroll Progress Indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#006342] origin-left z-[100]"
      style={{ scaleX }}
    />
  )
}

// Back to Top Button
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#006342] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-50 focus:outline-none focus:ring-2 focus:ring-[#006342] focus:ring-offset-2 transition-all duration-200 hover:bg-[#004d33]"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function App() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <ScrollProgress />
        <Navbar />
        <main>
          <section id="home">
            <Hero />
          </section>
          <Suspense fallback={<LoadingSpinner />}>
            <section id="stats">
              <Stats />
            </section>
            <section id="services">
              <Services />
            </section>
            <section id="audit">
              <FreeAudit />
            </section>
            <section id="about">
              <AboutUs />
            </section>
            <section id="contact">
              <Contact />
            </section>
          </Suspense>
        </main>
        <Footer />
        <BackToTop />
      </motion.div>
    </AnimatePresence>
  )
}

export default App
