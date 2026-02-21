import { useState } from 'react'
import emailjs from 'emailjs-com'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { CheckCircle2, ServerIcon } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
const service_id = import.meta.env.VITE_SERVICE_ID;
const user_id = import.meta.env.VITE_USER_ID;
const template_id = import.meta.env.VITE_AUDIT_TEMPLATE_ID;
const FreeAudit = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const checklistItems = [
    'Page Speed & Performance Score',
    'SEO Health & Keyword Gaps',
    'Conversion Rate Bottlenecks',
    'Mobile Responsiveness Issues',
    'UI/UX Design Problems',
    'Competitor Benchmarking',
  ]

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

  return (
    <section id="audit" className="bg-primary py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Content */}
          <div className="lg:col-span-3">
            <AnimatedSection>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-6"
              >
                <span className="bg-secondary text-primary px-4 py-1.5 rounded-full text-xs font-medium border border-secondary/20">
                  100% Free — No Credit Card Required
                </span>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-6">
                Get Your <span style={{ color: '#ef4900' }}>Free</span> Website Audit
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-lg text-secondary/90 mb-8 max-w-2xl">
                We'll analyze your website and show you exactly where you're losing customers and revenue. Our team will provide a detailed report covering:
              </p>
            </AnimatedSection>

            <div className="space-y-4">
              {checklistItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-secondary text-base">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <AnimatedSection delay={0.4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-secondary rounded-xl p-6 lg:p-8 shadow-lg"
              >
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      Request Received!
                    </h3>
                    <p className="text-muted">
                      We'll be in touch within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-primary mb-2">
                        Website URL
                      </label>
                      <input
                        type="url"
                        id="website"
                        {...register('website', {
                          required: 'Website URL is required',
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message: 'Please enter a valid URL',
                          },
                        })}
                        className="w-full px-4 py-3 border-b-2 border-border focus:border-[#006342] focus:outline-none bg-transparent text-primary placeholder-muted transition-colors"
                        placeholder="https://yourwebsite.com"
                      />
                      {errors.website && (
                        <p className="text-red-600 text-sm mt-1">{errors.website.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                        Your Email
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
                        className="w-full px-4 py-3 border-b-2 border-border focus:border-[#006342] focus:outline-none bg-transparent text-primary placeholder-muted transition-colors"
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="revenue" className="block text-sm font-medium text-primary mb-2">
                        Monthly Revenue Range
                      </label>
                      <select
                        id="revenue"
                        {...register('revenue', { required: 'Please select a revenue range' })}
                        className="w-full px-4 py-3 border-b-2 border-border focus:border-primary focus:outline-none bg-transparent text-primary transition-colors"
                      >
                        <option value="">Select range</option>
                        <option value="<1L">&lt;₹1L</option>
                        <option value="1L-5L">₹1L-5L</option>
                        <option value="5L-20L">₹5L-20L</option>
                        <option value="20L+">₹20L+</option>
                      </select>
                      {errors.revenue && (
                        <p className="text-red-600 text-sm mt-1">{errors.revenue.message}</p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="w-full bg-[#006342] text-white py-4 rounded-full font-semibold hover:bg-[#004d33] shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#006342] focus:ring-offset-2"
                    >
                      Claim My Free Audit
                    </motion.button>

                    <p className="text-xs text-muted text-center">
                      We respond within 24 hours. No spam, ever.
                    </p>
                  </form>
                )}
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FreeAudit
