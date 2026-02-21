import { motion } from 'framer-motion'
import { Target, Layers, Sparkles, BarChart3 } from 'lucide-react'
import { team } from '../../data/team'
import TeamCard from '../ui/TeamCard'
import AnimatedSection from '../ui/AnimatedSection'

const AboutUs = () => {
  const reasons = [
    {
      icon: Target,
      title: 'Results-First Mindset',
      description: 'We measure success by your revenue, not vanity metrics.',
    },
    {
      icon: Layers,
      title: 'Full-Stack Expertise',
      description: 'From code to content, everything under one roof.',
    },
    {
      icon: Sparkles,
      title: 'Gen Z Creatives',
      description: 'We think and design like your audience.',
    },
    {
      icon: BarChart3,
      title: 'Transparent Reporting',
      description: 'Weekly updates and full transparency on every campaign.',
    },
  ]

  return (
    <section id="about" className="bg-highlight py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Why Choose Section */}
        <div className="mb-20">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Built for Ecommerce. Obsessed with Results.
            </h2>
            <p className="text-lg text-muted max-w-3xl mx-auto">
              We're not a generic agency. We're a specialized ecommerce growth team that combines design, development, and performance marketing to deliver measurable results for your business.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {reasons.map((reason, index) => {
              const IconComponent = reason.icon
              return (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ 
                      scale: 1.03,
                      y: -5,
                      transition: { 
                        type: 'spring', 
                        stiffness: 400, 
                        damping: 20,
                        duration: 0.3
                      }
                    }}
                    className="bg-white rounded-lg p-6 border-l-4 border-[#006342] shadow-sm relative overflow-hidden group cursor-pointer"
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
                    <div className="relative z-10 flex items-start space-x-4">
                      <motion.div 
                        className="w-12 h-12 rounded-lg bg-[#006342]/10 flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                      >
                        <IconComponent className="w-6 h-6 text-[#006342]" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold text-primary group-hover:text-[#006342] transition-colors duration-200 mb-2">
                          {reason.title}
                        </h3>
                        <p className="text-muted">{reason.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
              The Team Behind Your Growth
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              5 specialists. 1 mission. Your success.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            {team.map((member, index) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role={member.role}
                bio={member.bio}
                initials={member.initials}
                gradient={member.gradient}
                image={member.image}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
