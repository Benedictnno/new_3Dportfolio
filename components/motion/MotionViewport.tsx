'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

export function MotionViewport({ children }: PropsWithChildren) {
	const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
	return (
		<motion.div ref={ref} initial="hidden" animate={inView ? 'show' : 'hidden'}>
			{children}
		</motion.div>
	)
}


