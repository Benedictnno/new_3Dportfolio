"use client"
import { MotionViewport } from '@/components/motion/MotionViewport'
import { motion } from 'framer-motion'
import { rise, stagger } from '@/components/motion/Variants'

export function About() {
	return (
		<section id="about" className="container py-20 md:py-28">
			<MotionViewport>
				<motion.div variants={stagger} className="grid gap-10 md:grid-cols-2 md:items-center">
					<motion.div variants={rise}>
						<h2 className="text-2xl md:text-3xl font-semibold">About</h2>
						<p className="mt-4 text-muted">
							I’m Benedict, a Frontend Architect focused on fast, accessible interfaces, modern motion,
							and maintainable systems.
						</p>
					</motion.div>
					<motion.div variants={rise} className="rounded-xl border border-border p-6 bg-bg shadow-[var(--shadow-card)]">
						<p className="text-sm text-muted">
							I specialize in React, Next.js, Tailwind CSS, Framer Motion, and design systems, delivering
							polished product experiences with strong a11y and performance.
						</p>
					</motion.div>
				</motion.div>
			</MotionViewport>
		</section>
	)
}


