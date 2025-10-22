'use client'
import { useState, useEffect, useRef } from 'react'
import { getGsap, motionOK } from '@/lib/gsap'
import { SkillBar } from '@/components/cards/SkillBar'
import { skills } from '@/constants/skills'

export function SkillsSection() {
	const [activeCategory, setActiveCategory] = useState('All')
	const sectionRef = useRef<HTMLElement>(null)
	
	// Get unique categories
	const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))]
	
	// Filter skills based on active category
	const filteredSkills = activeCategory === 'All' 
		? skills 
		: skills.filter(skill => skill.category === activeCategory)

	useEffect(() => {
		if (!motionOK() || !sectionRef.current) return
		const gsap = getGsap()

		// Animate section title
		gsap.fromTo(
			sectionRef.current?.querySelector('h2'),
			{ y: 30, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			}
		)

		// Animate category buttons
		gsap.fromTo(
			sectionRef.current?.querySelectorAll('.category-btn'),
			{ y: 20, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.6,
				ease: 'power3.out',
				stagger: 0.1,
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			}
		)
	}, [])

	return (
		<section ref={sectionRef} id="skills" className="container py-20 md:py-28">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold mb-4">
					Technical <span className="text-primary">Expertise</span>
				</h2>
				<p className="text-muted text-lg max-w-2xl mx-auto">
					A comprehensive skill set spanning modern web technologies, 
					performance optimization, and user experience design.
				</p>
			</div>

			{/* Category Filter */}
			<div className="flex flex-wrap justify-center gap-3 mb-12">
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => setActiveCategory(category)}
						className={`category-btn px-6 py-3 rounded-full font-medium transition-all duration-300 ${
							activeCategory === category
								? 'bg-primary text-bg shadow-lg scale-105'
								: 'bg-bg border border-border text-muted hover:border-primary/50 hover:text-fg'
						}`}
					>
						{category}
					</button>
				))}
			</div>

			{/* Skills Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredSkills.map((skill, index) => (
					<div
						key={skill.name}
						style={{ animationDelay: `${index * 0.1}s` }}
						className="animate-fade-in-up"
					>
						<SkillBar skill={skill} />
					</div>
				))}
			</div>

			{/* Stats Summary */}
			<div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
				<div className="group">
					<div className="text-3xl font-bold text-primary mb-2">
						{skills.filter(s => s.level >= 90).length}+
					</div>
					<div className="text-sm text-muted uppercase tracking-wider">Expert Level</div>
				</div>
				<div className="group">
					<div className="text-3xl font-bold text-primary mb-2">
						{Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length)}%
					</div>
					<div className="text-sm text-muted uppercase tracking-wider">Average Proficiency</div>
				</div>
				<div className="group">
					<div className="text-3xl font-bold text-primary mb-2">
						{categories.length - 1}
					</div>
					<div className="text-sm text-muted uppercase tracking-wider">Categories</div>
				</div>
				<div className="group">
					<div className="text-3xl font-bold text-primary mb-2">
						{skills.length}+
					</div>
					<div className="text-sm text-muted uppercase tracking-wider">Technologies</div>
				</div>
			</div>
		</section>
	)
}

