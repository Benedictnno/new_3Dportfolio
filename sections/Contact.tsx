'use client'
import { ContactForm } from '@/components/forms/ContactForm'
import { MotionViewport } from '@/components/motion/MotionViewport'
import { motion } from 'framer-motion'
import { rise, stagger } from '@/components/motion/Variants'

export function Contact() {
	return (
		<section id="contact" className="container py-20 md:py-28">
			<MotionViewport>
				<motion.div variants={stagger} className="text-center mb-12">
					<motion.h2 variants={rise} className="text-3xl md:text-4xl font-bold mb-4">
						Let's <span className="text-primary">Work Together</span>
					</motion.h2>
					<motion.p variants={rise} className="text-muted text-lg max-w-2xl mx-auto">
						Ready to bring your ideas to life? I'd love to hear about your project and discuss how we can create something amazing together.
					</motion.p>
				</motion.div>
				<motion.div variants={rise}>
					<ContactForm />
				</motion.div>
			</MotionViewport>
		</section>
	)
}


