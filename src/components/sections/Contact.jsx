import { useState } from 'react'
import emailjs from 'emailjs-com'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, CheckCircle2 } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import logo from '/images/logo.svg'

const service_id = import.meta.env.VITE_SERVICE_ID;
const user_id = import.meta.env.VITE_USER_ID;
const template_id = import.meta.env.VITE_TRIAL_TEMPLATE_ID;
const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()

  const services = [
    'Website Development',
    'CRO Optimisation',
    'SEO Optimisation',
    'Growth Marketing',
    'Social Media Marketing & Management',
    'Ad Creation & Copywriting',
    'Content Creation (Graphics & Video)',
  ]

  const selectedServices = watch('services') || []

  const onSubmit = async (data) => {
    try {
      // Replace with your EmailJS values
      const SERVICE_ID = service_id;
      const TEMPLATE_ID = template_id;
      const USER_ID = user_id;

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID);
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  }

  const validateServices = () => {
    return selectedServices.length > 0 || 'Please select at least one service'
  }

  return (
    <section id="contact" className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Let's Build Something Great Together
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Tell us about your project and we'll get back to you within 24 hours with a custom plan.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <AnimatedSection delay={0.1}>
            <div>
              <img 
                src={logo} 
                alt="ecommBuddy Logo" 
                className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto mb-6 transition-all duration-200 hover:opacity-80 object-contain"
              />
              <p className="text-muted mb-8">
                Tell us about your project and we'll get back to you within 24 hours with a custom plan.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href="mailto:harshit@ecommbuddy.in" className="text-primary hover:text-accent transition-colors">
                    harshit@ecommbuddy.in
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <a href="tel:+916388201024" className="text-primary hover:text-accent transition-colors">
                    +91 63882 01024
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-primary">India 🇮🇳 (Remote-First)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-primary hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-primary hover:text-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-primary hover:text-accent transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6" />
                </motion.a>
              </div>
              <div className="mt-8">
                <img
                  src="/images/gifs/team.gif"
                  alt="Team"
                  loading="lazy"
                  className="w-full max-w-[420px] md:max-w-[520px] rounded-none shadow-none object-contain"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column - Form */}
          <AnimatedSection delay={0.2}>
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-highlight rounded-xl p-12 text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-primary mb-2">
                  Message Sent!
                </h3>
                <p className="text-muted">
                  We'll be in touch soon!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-[#006342] focus:outline-none bg-white text-primary placeholder-muted transition-colors"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email',
                      },
                    })}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-[#006342] focus:outline-none bg-white text-primary placeholder-muted transition-colors"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^\d{10}$/,
                        message: 'Please enter a valid 10-digit phone number',
                      },
                    })}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-[#006342] focus:outline-none bg-white text-primary placeholder-muted transition-colors"
                    placeholder="9876543210"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-primary mb-2">
                    Services Interested In *
                  </label>
                  <div className="space-y-2 border-2 border-border rounded-lg p-4">
                    {services.map((service, index) => (
                      <label key={index} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          value={service}
                          {...register('services', {
                            validate: validateServices,
                          })}
                          className="w-4 h-4 accent-[#006342] border-border rounded focus:outline-none focus:ring-0"
                        />
                        <span className="text-sm text-primary">{service}</span>
                      </label>
                    ))}
                  </div>
                  {errors.services && (
                    <p className="text-red-600 text-sm mt-1">{errors.services.message}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-primary mb-2">
                    What are you looking for? *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="new"
                        {...register('projectType', { required: 'Please select an option' })}
                        className="w-4 h-4 accent-[#006342] border-border focus:outline-none focus:ring-0"
                      />
                      <span className="text-sm text-primary">Build a brand new website</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="improve"
                        {...register('projectType', { required: 'Please select an option' })}
                        className="w-4 h-4 accent-[#006342] border-border focus:outline-none focus:ring-0"
                      />
                      <span className="text-sm text-primary">Improve / grow my existing website</span>
                    </label>
                  </div>
                  {errors.projectType && (
                    <p className="text-red-600 text-sm mt-1">{errors.projectType.message}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    Tell us more (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register('message')}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none bg-white text-primary placeholder-muted transition-colors resize-none"
                    placeholder="Share any additional details about your project..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="w-full bg-[#006342] text-white py-4 rounded-full font-semibold hover:bg-[#004d33] shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#006342] focus:ring-offset-2 text-lg"
                >
                  Send Message →
                </motion.button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default Contact
