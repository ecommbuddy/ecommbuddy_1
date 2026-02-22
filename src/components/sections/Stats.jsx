import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { growthData } from '../../data/stats'

// Neutral, professional service breakdown colors
const colorfulServiceBreakdown = [
  { name: 'Website Dev', value: 28, color: '#0B6B4F' },
  { name: 'SEO', value: 20, color: '#334155' },
  { name: 'Social Media', value: 18, color: '#475569' },
  { name: 'CRO', value: 15, color: '#6B7280' },
  { name: 'Content', value: 12, color: '#9CA3AF' },
  { name: 'Ads', value: 7, color: '#CBD5E1' },
]
import AnimatedSection from '../ui/AnimatedSection'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#006342] text-white px-4 py-2 rounded-lg shadow-lg">
        <p className="font-semibold">{`${payload[0].value}%`}</p>
      </div>
    )
  }
  return null
}

const CountUpNumber = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.5 })

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }
    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}{end === 3 ? 'x' : end === 98 ? '%' : '+'}</span>
}

const Stats = () => {
  const [chartInView, setChartInView] = useState(false)
  const chartRef = useRef(null)
  const chartInViewport = useInView(chartRef, { threshold: 0.2, once: true })

  useEffect(() => {
    if (chartInViewport) {
      setTimeout(() => setChartInView(true), 300)
    }
  }, [chartInViewport])

  const statCards = [
    { label: 'Clients Served', value: 50 },
    { label: 'Average Revenue Growth', value: 3 },
    { label: 'Client Retention Rate', value: 98 },
  ]

  return (
    <section className="bg-highlight py-10 lg:py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Results That Speak For Themselves
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            See how we've helped ecommerce brands achieve remarkable growth and scale their businesses.
          </p>
        </AnimatedSection>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Line Chart */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-border">
              <h3 className="text-xl font-semibold text-primary mb-6">
                Average Client Revenue Growth (%)
              </h3>
              <div ref={chartRef} className="h-[320px]">
                {chartInView && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        axisLine={false}
                      />
                      <YAxis
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        axisLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#006342"
                        strokeWidth={3}
                        dot={{ fill: '#006342', r: 4 }}
                        activeDot={{ r: 6, fill: '#004d33' }}
                        isAnimationActive={true}
                        animationDuration={800}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Pie Chart */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-border">
              <h3 className="text-xl font-semibold text-primary mb-6">
                Our Service Distribution
              </h3>
              <div className="h-[320px] flex items-center justify-center">
                {chartInView && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={colorfulServiceBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={800}
                      >
                        {colorfulServiceBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        wrapperStyle={{ fontSize: '12px', color: '#6B7280' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Stat Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {statCards.map((stat, index) => (
            <AnimatedSection key={index} delay={0.3 + index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -8,
                  transition: { 
                    type: 'spring', 
                    stiffness: 400, 
                    damping: 20,
                    duration: 0.3
                  }
                }}
                className="bg-white rounded-xl p-8 text-center border border-border shadow-sm relative overflow-hidden group cursor-pointer"
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
                <div className="relative z-10">
                  <div className="text-5xl lg:text-6xl font-bold text-[#006342] mb-2">
                    <CountUpNumber end={stat.value} />
                  </div>
                  <p className="text-muted text-lg">{stat.label}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
