import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button'
import logo from '/images/logo.svg'

import { services as fetchedServices } from '../../data/services'

/* ── Service items shown in the dropdown — pulling from data ─────── */
const SERVICE_ITEMS = fetchedServices.map(s => s.title)


/* ── Premium animated dropdown row ─────────────────────────────── */
const DropdownItem = ({ name, onClick }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 450, damping: 22 }}
    >
      {/* ── Ink-bomb radial burst ── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="bomb"
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 8, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              position: 'absolute',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              left: '12px',
              top: '50%',
              y: '-50%',
              background: 'radial-gradient(circle, rgba(0,99,66,0.13) 0%, rgba(0,99,66,0.05) 55%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Row content ── */}
      <button
        onClick={onClick}
        style={{
          width: '100%',
          textAlign: 'left',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '11px 18px',
        }}
      >
        {/* Bouncing dot */}
        <motion.span
          animate={hovered
            ? { scale: [1, 1.7, 0.85, 1.15, 1], backgroundColor: '#006342' }
            : { scale: 1 }
          }
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: '#006342',
            flexShrink: 0,
            display: 'block',
            opacity: hovered ? 1 : 0.55,
          }}
        />

        {/* Text spring-slides right */}
        <motion.span
          animate={{ x: hovered ? 5 : 0, color: hovered ? '#006342' : '#1a1a1a' }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          style={{ fontSize: '13.5px', fontWeight: hovered ? 560 : 450, letterSpacing: '0.01em' }}
        >
          {name}
        </motion.span>

        {/* Arrow springs in from left */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -12 }}
          transition={{ type: 'spring', stiffness: 380, damping: 20, delay: hovered ? 0.05 : 0 }}
          style={{ marginLeft: 'auto', color: '#006342', fontSize: '18px', lineHeight: 1 }}
        >
          →
        </motion.span>
      </button>
    </motion.div>
  )
}


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesTimer = useRef(null)

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'Growth Stats', to: 'stats' },
    { name: 'Services', to: 'services' },
    { name: 'Free Audit', to: 'audit' },
    { name: 'About Us', to: 'about' },
    { name: 'Contact', to: 'contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
      const sections = navLinks.map((l) => l.to)
      const scrollPos = window.scrollY + 100
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) { setActiveSection(sections[i]); break }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => setIsMobileMenuOpen(false)
  const openServicesDropdown = () => { clearTimeout(servicesTimer.current); setServicesOpen(true) }
  const closeServicesDropdown = () => { servicesTimer.current = setTimeout(() => setServicesOpen(false), 180) }

  // Scroll directly to a specific GSAP-pinned service card.
  // The GSAP pin starts when #services reaches 80px from viewport top.
  // Each card occupies one window.innerHeight of scroll distance.
  const scrollToService = (index) => {
    const section = document.getElementById('services')
    if (!section) return
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    const target = sectionTop - 80 + index * window.innerHeight
    window.scrollTo({ top: target, behavior: 'smooth' })
    setIsMobileMenuOpen(false)
    setServicesOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 w-full bg-white transition-all duration-300 ${isScrolled ? 'backdrop-blur-sm drop-shadow-sm border-b border-border' : 'border-b border-border'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="home" smooth offset={-80} duration={600} className="flex items-center cursor-pointer flex-shrink-0 z-10">
            <img
              src={logo}
              alt="ecommBuddy Logo"
              className="block object-contain object-left transition-all duration-200 hover:opacity-80 h-14 w-auto min-w-[180px] sm:h-16 sm:min-w-[200px] md:h-18 md:min-w-[220px] lg:h-20 lg:min-w-[240px]"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.to === 'services' ? (
                /* ── Services with Apple-style dropdown ─────── */
                <div
                  key="services"
                  style={{ position: 'relative' }}
                  onMouseEnter={openServicesDropdown}
                  onMouseLeave={closeServicesDropdown}
                >
                  <Link
                    to="services"
                    smooth
                    offset={-80}
                    duration={600}
                    spy
                    activeClass="font-bold"
                    className={`relative cursor-pointer text-sm font-medium text-primary transition-colors hover:text-accent ${activeSection === 'services' ? 'font-bold' : ''
                      }`}
                  >
                    Services
                    {activeSection === 'services' && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#006342]"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* ── Dropdown panel ──────────────────────── */}
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        onMouseEnter={openServicesDropdown}
                        onMouseLeave={closeServicesDropdown}
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 14px)',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '280px',
                          background: '#ffffff',
                          borderRadius: '14px',
                          overflow: 'hidden',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
                          padding: '8px 0',
                          zIndex: 60,
                        }}
                      >
                        {/* Caret arrow pointing up */}
                        <div style={{
                          position: 'absolute',
                          top: '-6px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '12px',
                          height: '6px',
                          overflow: 'hidden',
                        }}>
                          <div style={{
                            width: '10px',
                            height: '10px',
                            background: '#fff',
                            border: '1px solid rgba(0,0,0,0.08)',
                            transform: 'rotate(45deg)',
                            margin: '3px auto 0',
                          }} />
                        </div>

                        {/* Service list — uses animated DropdownItem */}
                        {SERVICE_ITEMS.map((name, i) => (
                          <DropdownItem
                            key={i}
                            name={name}
                            onClick={() => scrollToService(i)}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* ── Regular nav link ───────────────────────── */
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  offset={-80}
                  duration={600}
                  spy
                  activeClass="font-bold"
                  className={`relative cursor-pointer text-sm font-medium text-primary transition-colors hover:text-accent ${activeSection === link.to ? 'font-bold' : ''
                    }`}
                >
                  {link.name}
                  {activeSection === link.to && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#006342]"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button to="audit" variant="primary" className="px-6 py-2.5">
              Get Free Audit
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-border"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  offset={-80}
                  duration={600}
                  onClick={handleLinkClick}
                  className="block text-base font-medium text-primary hover:text-accent transition-colors py-2"
                >
                  {link.name}
                </Link>
              ))}
              {/* Mobile: inline service list under Services */}
              <div className="pl-3 space-y-1 border-l-2 border-[#006342]/30">
                {SERVICE_ITEMS.map((name, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToService(i)}
                    className="flex items-center gap-2 text-sm text-muted py-2 hover:text-accent transition-colors cursor-pointer w-full text-left"
                  >
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#006342', flexShrink: 0, display: 'inline-block' }} />
                    <span>{name}</span>
                  </button>
                ))}
              </div>
              <div className="pt-4">
                <Button to="audit" variant="primary" className="w-full" onClick={handleLinkClick}>
                  Get Free Audit
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
