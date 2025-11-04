'use client'
import { useEffect, useRef } from 'react'
import { getGsap, motionOK } from '@/lib/gsap'

type Skill = {
	name: string
	level: number
	category: string
	icon: string
}

export function SkillBar({ skill }: { skill: Skill }) {
	const barRef = useRef<HTMLDivElement>(null)
	const percentageRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		if (!motionOK() || !barRef.current || !percentageRef.current) return
		const gsap = getGsap()

		// Animate the progress bar
		gsap.fromTo(
			barRef.current,
			{ width: '0%' },
			{
				width: `${skill.level}%`,
				duration: 1.2,
				ease: 'power3.out',
				delay: Math.random() * 0.3, // Stagger effect
				scrollTrigger: {
					trigger: barRef.current,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			}
		)

		// Animate the percentage number
		gsap.fromTo(
			percentageRef.current,
			{ textContent: '0' },
			{
				textContent: skill.level,
				duration: 1.5,
				ease: 'power2.out',
				delay: Math.random() * 0.3 + 0.2,
				scrollTrigger: {
					trigger: barRef.current,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				},
				onUpdate: function() {
					percentageRef.current!.textContent = Math.round(Number(this.targets()[0].textContent)).toString()
				}
			}
		)
	}, [skill.level])

	return (
		<div className="group relative p-4 rounded-xl border border-border/60 bg-bg/50 backdrop-blur-sm hover:bg-bg/80 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-3">
					<span className="text-2xl">{skill.icon}</span>
					<div>
						<h3 className="font-semibold text-fg">{skill.name}</h3>
						<span className="text-xs text-muted uppercase tracking-wider">{skill.category}</span>
					</div>
				</div>
				<span ref={percentageRef} className="text-lg font-bold text-primary">0</span>
			</div>
			
			<div className="relative h-2 bg-border/30 rounded-full overflow-hidden">
				<div 
					ref={barRef}
					className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative overflow-hidden"
					style={{ width: '0%' }}
				>
					{/* Animated shine effect */}
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shine" />
				</div>
			</div>
		</div>
	)
}
