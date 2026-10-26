import { motion, useReducedMotion } from 'motion/react'

export default function Reveal({ children, className = '', delay = 0, as: Component = 'div' }) {
  const reduce = useReducedMotion()
  const MotionComponent = motion[Component] || motion.div
  return (
    <MotionComponent
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.75, ease: [0.2, 0.65, 0.25, 1], delay: reduce ? 0 : delay }}
    >
      {children}
    </MotionComponent>
  )
}
