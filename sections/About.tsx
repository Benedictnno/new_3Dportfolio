"use client"
import { MotionViewport } from '@/components/motion/MotionViewport'
import { motion } from 'framer-motion'
import { rise, stagger } from '@/components/motion/Variants'

export function About() {
	return (
		<section id="about" className="container py-20 md:py-28">
			<MotionViewport>
				<motion.div variants={stagger} className="grid gap-10 md:grid-cols-2 md:items-center">
					<motion.div variants={rise as any}>
						<h2 className="text-2xl md:text-3xl font-semibold">About</h2>
						<p className="mt-4 text-muted">
						Hey, I’m Benedict, a passionate full stack developer and Computer Science student who loves building things that actually solve problems. I enjoy turning ideas into real products and I’ve been doing that for over two years, working with modern web technologies and exploring the future of Web3.
						</p>
					</motion.div>
					<motion.div variants={rise as any} className="rounded-xl border border-border p-6 bg-bg shadow-[var(--shadow-card)]">
						<p className="text-sm text-muted">
						I’ve worked on everything from e-commerce platforms to crypto wallets and developer tools. I enjoy clean code, scalable architecture, and building products with great user experience. I also build in public, share what I learn, and document my growth online to inspire others coming up in tech.

Right now, I’m focused on improving my craft, working on meaningful software projects, and exploring ways technology can create opportunities for people across Africa and beyond.
						</p>
					</motion.div>
				</motion.div>
			</MotionViewport>
		</section>
	)
}


