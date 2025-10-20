"use client"
import { MotionViewport } from '@/components/motion/MotionViewport'
import { motion } from 'framer-motion'
import { rise, stagger } from '@/components/motion/Variants'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { projects } from '@/constants/projects'

export function Projects() {
	return (
		<section id="projects" className="container py-20 md:py-28">
			<MotionViewport>
				<motion.div variants={stagger}>
					<motion.h2 variants={rise} className="text-2xl md:text-3xl font-semibold">Projects</motion.h2>
					<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
						{projects.map((p) => (
							<motion.div key={p.title} variants={rise}>
								<ProjectCard project={p} />
							</motion.div>
						))}
					</div>
				</motion.div>
			</MotionViewport>
		</section>
	)
}


