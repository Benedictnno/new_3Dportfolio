"use client"
import { MotionViewport } from '@/components/motion/MotionViewport'
import { motion } from 'framer-motion'
import { rise, stagger } from '@/components/motion/Variants'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { projects } from '@/constants/projects'
import Link from 'next/link'

export function Projects() {
	return (
		<section id="projects" className="container py-20 md:py-28">
			<MotionViewport>
				<motion.div variants={stagger}>
					<div className="flex items-center justify-between mb-8">
						<motion.h2 variants={rise as any} className="text-2xl md:text-3xl font-semibold">Projects</motion.h2>
						<motion.div variants={rise as any}>
							<Link 
								href="/projects"
								className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary/20 transition-colors group"
							>
								View All Projects
								<span className="group-hover:translate-x-1 transition-transform">→</span>
							</Link>
						</motion.div>
					</div>
					<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
						{projects.slice(0, 2).map((p) => (
							<motion.div key={p.title} variants={rise as any}>
								<ProjectCard project={p} />
							</motion.div>
						))}
					</div>
				</motion.div>
			</MotionViewport>
		</section>
	)
}


