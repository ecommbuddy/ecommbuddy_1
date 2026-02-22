import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Target, Palette, Code, Rocket, TrendingUp } from 'lucide-react'
import { services } from '../../data/services'
import AnimatedSection from '../ui/AnimatedSection'
import Button from '../ui/Button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────
   Card content — no borders, blends into white background
   ──────────────────────────────────────────────────────────── */
const ServiceCard = ({ service, index, gifPath }) => {
  const isEven = index % 2 === 1

  return (
    <div
      className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-4 lg:gap-16 px-4 md:px-8 lg:px-0`}
      style={{ width: '100%', padding: '12px 0 24px' }}
    >
      {/* GIF */}
      <div
        className={`w-full lg:w-1/2 flex justify-center items-center ${isEven ? 'lg:justify-end' : 'lg:justify-start'
          }`}
      >
        <div className="max-w-[512px] w-full h-[220px] sm:h-[300px] lg:h-[384px]">
          <img
            src={gifPath}
            alt={`${service.title} animation`}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            loading="lazy"
            onError={(e) => {
              e.target.src =
                'https://via.placeholder.com/600x400/006342/ffffff?text=Service'
            }}
          />
        </div>
      </div>

      {/* Text */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left pl-0 md:pl-8 lg:pl-12">
        <h3
          className="font-bold text-primary"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            marginBottom: '14px',
            lineHeight: 1.15,
          }}
        >
          {service.title}
        </h3>
        <p
          className="text-muted leading-relaxed"
          style={{ fontSize: '1.125rem', marginBottom: '20px', maxWidth: '480px' }}
        >
          {service.description}
        </p>
        {service.features && service.features.length > 0 && (
          <ul className="space-y-1.5">
            {service.features.map((feature, fIdx) => (
              <li key={fIdx} className="flex items-start text-sm text-muted">
                <span className="text-[#006342] mr-2 font-bold mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Services section — GSAP ScrollTrigger pin + sequential stack
   ──────────────────────────────────────────────────────────── */
const Services = () => {
  const sectionRef = useRef(null)
  const pinnedRef = useRef(null)   // the container that gets pinned
  const headingRef = useRef(null)
  const cardsAreaRef = useRef(null)   // clips the card stack
  const cardRefs = useRef([])

  const serviceGifs = [
    '/images/gifs/service-1.gif',
    '/images/gifs/service-2.gif',
    '/images/gifs/service-3.gif',
    '/images/gifs/service-4.gif',
    '/images/gifs/service-5.gif',
    '/images/gifs/service-6.gif',
    '/images/gifs/service-7.gif',
  ]

  const processSteps = [
    { icon: Search, label: 'Discovery' },
    { icon: Target, label: 'Strategy' },
    { icon: Palette, label: 'Design' },
    { icon: Code, label: 'Development' },
    { icon: Rocket, label: 'Launch' },
    { icon: TrendingUp, label: 'Growth' },
  ]

  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    if (mq.addEventListener) mq.addEventListener('change', update)
    else mq.addListener(update)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update)
      else mq.removeListener(update)
    }
  }, [])

  useEffect(() => {
    // Only initialize GSAP pin/animation on desktop (large) view
    if (!isDesktop) return

    const heading = headingRef.current
    const cardsArea = cardsAreaRef.current
    const cards = cardRefs.current.filter(Boolean)
    if (!heading || !cardsArea || cards.length === 0) return

    // Cards 2..N start below the cards area and slide up one at a time.
    gsap.set(cards.slice(1), { yPercent: 100 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedRef.current,
        start: 'top top+=80',
        end: `+=${window.innerHeight * (services.length - 1)}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })

    cards.slice(1).forEach((card) => {
      tl.to(card, { yPercent: 0, ease: 'power2.inOut', duration: 1 })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      tl.kill()
    }
  }, [isDesktop])

  return (
    <section id="services" ref={sectionRef} className="bg-white">

      {/* ═══════════════════════════════════════════════════════════
          PINNED CONTAINER — This is what GSAP pins while the cards
          animate in. It contains both the heading and the card stack.
      ══════════════════════════════════════════════════════════════ */}
      <div
        ref={pinnedRef}
        style={{
          background: '#ffffff',
          paddingTop: '24px',      /* balanced top buffer */
          paddingBottom: '0',
        }}
      >
        {/* ── Heading ─────────────────────────────────────────── */}
        <div
          ref={headingRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            textAlign: 'center',
            paddingTop: '0px',
            paddingBottom: '16px',
            position: 'relative',
            zIndex: 10,
            background: '#ffffff',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Everything You Need to Grow Online
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              From website development to growth marketing, we offer end-to-end
              solutions to scale your ecommerce business.
            </p>
          </motion.div>
        </div>

        {/* ── Card stack area ──────────────────────────────────────
            overflow: hidden clips cards that are below (not yet shown)
            so they slide up INTO VIEW from the bottom edge.
            z-index < heading so heading always masks from above.
        ─────────────────────────────────────────────────────────── */}
        <div
          ref={cardsAreaRef}
          className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8"
          style={{
            position: 'relative',
            overflow: isDesktop ? 'hidden' : 'visible',
            /* Reduced vertical height constraints for mobile to allow more room for text */
            height: isDesktop ? 'calc(100vh - 80px - 120px)' : 'auto',
            minHeight: isDesktop ? '560px' : 'auto',
          }}
        >
          {isDesktop ? (
            services.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => (cardRefs.current[index] = el)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: '#ffffff',
                  zIndex: index + 1,
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ width: '100%' }}>
                  <ServiceCard service={service} index={index} gifPath={serviceGifs[index]} />
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-8 py-8">
              {services.map((service, index) => (
                <div key={service.id} className="w-full">
                  <ServiceCard service={service} index={index} gifPath={serviceGifs[index]} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          REST OF THE SECTION — scrolls normally after pin releases
      ══════════════════════════════════════════════════════════════ */}
      <div className="bg-white pb-8 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Process Strip (unchanged) ────────────────────────── */}
          <AnimatedSection delay={0.5}>
            <div className="mb-12">
              <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 py-8">
                {processSteps.map((step, index) => {
                  const IconComponent = step.icon
                  return (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className="flex items-center"
                    >
                      <motion.div
                        className="flex flex-col items-center cursor-pointer group"
                        whileHover={{
                          scale: 1.4,
                          y: -20,
                          transition: { type: 'spring', stiffness: 500, damping: 20 },
                        }}
                        style={{ willChange: 'transform' }}
                      >
                        <motion.div
                          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#006342] to-[#004d33] text-white flex items-center justify-center mb-3 shadow-xl group-hover:shadow-2xl transition-shadow duration-200"
                          whileHover={{ boxShadow: '0 25px 50px rgba(0, 99, 66, 0.5)' }}
                        >
                          <IconComponent className="w-10 h-10 text-white" strokeWidth={3} />
                        </motion.div>
                        <span className="text-sm font-semibold text-primary whitespace-nowrap group-hover:text-[#006342] transition-colors duration-200">
                          {step.label}
                        </span>
                      </motion.div>
                      {index < processSteps.length - 1 && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                          className="hidden lg:block w-12 h-0.5 bg-border mx-4"
                          style={{ transformOrigin: 'left' }}
                        />
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* ── CTA (unchanged) ─────────────────────────────────── */}
          <AnimatedSection delay={0.7} className="text-center">
            <p className="text-xl text-muted mb-6">
              Ready to get started?{' '}
              <span style={{ color: '#ef4900', fontWeight: 600 }}>Let&apos;s talk.</span>
            </p>
            <Button to="contact" variant="primary" className="px-8 py-4 text-base">
              Book Free Consultation
            </Button>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}

export default Services
