'use client'
import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'
import Link from 'next/link'

type Project = {
	title: string
	description: string
	image: string
	href?: string
	repo?: string
	tags?: string[]
}

export function ProjectCard({ project }: { project: Project }) {
	return (
		<Tilt glareEnable={false} tiltMaxAngleX={6} tiltMaxAngleY={6} className="group">
			<motion.article
				whileHover={{ scale: 1.02 }}
				className="overflow-hidden rounded-xl border border-border bg-bg shadow-[var(--shadow-card)] transition-shadow group-hover:shadow-[var(--shadow-hover)]"
			>
				<div className="aspect-video overflow-hidden">
					<img
						src={project.image}
						alt={project.title}
						loading="lazy"
						decoding="async"
						className="h-full w-full object-cover"
					/>
				</div>
				<div className="p-5 space-y-3">
					<h3 className="text-lg font-semibold">{project.title}</h3>
					<p className="text-sm text-muted">{project.description}</p>
					{project.tags?.length ? (
						<ul className="mt-2 flex flex-wrap gap-2">
							{project.tags.map((t) => (
								<li key={t} className="rounded bg-[color:var(--color-border)]/40 px-2 py-1 text-xs">
									{t}
								</li>
							))}
						</ul>
					) : null}
					<div className="mt-3 flex gap-3">
						{project.href && (
							<Link className="text-sm text-primary hover:underline underline-offset-4" href={project.href} target="_blank">
								Live
							</Link>
						)}
						{project.repo && (
							<Link className="text-sm hover:underline underline-offset-4" href={project.repo} target="_blank">
								Code
							</Link>
						)}
					</div>
				</div>
			</motion.article>
		</Tilt>
	)
}


