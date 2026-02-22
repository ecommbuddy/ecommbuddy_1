import { Link } from 'react-scroll'
import { Instagram, Linkedin, Twitter } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import logo from '/images/logo.svg'
import { services } from '../../data/services'

import QuickChat from '../ui/QuickChat'

const Footer = () => {
  const companyLinks = [
    { name: 'Home', to: 'home' },
    { name: 'Growth Stats', to: 'stats' },
    { name: 'About Us', to: 'about' },
    { name: 'Free Audit', to: 'audit' },
    { name: 'Contact', to: 'contact' },
  ]

  // Scroll directly to a specific GSAP-pinned service card.
  // The GSAP pin starts when #services reaches 80px from viewport top.
  // Each card occupies one window.innerHeight of scroll distance.
  const scrollToService = (index) => {
    const section = document.getElementById('services')
    if (!section) return
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    const target = sectionTop - 80 + index * window.innerHeight
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <>
      <footer className="bg-primary text-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Column 1 - Brand */}
            <div>
              <img
                src={logo}
                alt="ecommBuddy Logo"
                className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto mb-4 brightness-0 invert transition-all duration-200 hover:opacity-80 object-contain"
              />
              <p className="text-secondary/80 text-sm mb-6">
                Your end-to-end ecommerce growth partner.
              </p>
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.instagram.com/ecommbuddy.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:opacity-70 transition-opacity"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:opacity-70 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:opacity-70 transition-opacity"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>

              </div>
            </div>

            {/* Column 2 - Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {services.map((svc, idx) => (
                  <li key={svc.id}>
                    <button
                      onClick={() => scrollToService(idx)}
                      className="text-secondary/80 hover:text-secondary transition-colors text-sm cursor-pointer text-left"
                    >
                      {svc.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      smooth={true}
                      offset={-80}
                      duration={600}
                      className="text-secondary/80 hover:text-secondary transition-colors text-sm cursor-pointer"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-secondary/80">
                <li>
                  <a href="mailto:harshit@ecommbuddy.in" className="hover:text-secondary font-bold transition-colors">
                    harshit@ecommbuddy.in
                  </a>
                </li>
                <li>
                  <a href="tel:+916388201024" className="hover:text-secondary transition-colors">
                    +91 63882 01024
                  </a>
                </li>
                <li className="hover:text-secondary transition-colors">
                  India 🇮🇳 (Remote-First)
                </li>
                <li>
                  Mon–Fri, 10AM–7PM IST
                </li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom Bar */}
        <AnimatedSection delay={0.2}>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary/60 text-sm">
              © 2025 ecommBuddy. All rights reserved.
            </p>
            <p className="text-secondary/60 text-sm">
              Made with ❤️ in India
            </p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
    <QuickChat />
    </>
  )
}

export default Footer
