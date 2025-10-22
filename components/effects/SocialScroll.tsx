'use client'
import { useEffect, useRef } from 'react'
import { getGsap, motionOK } from '@/lib/gsap'
import { socialLinks } from '@/constants/social'

export function SocialScroll() {
	const socialRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!motionOK() || !socialRef.current) return
		const gsap = getGsap()
		const isMobile = window.innerWidth < 768

		if (isMobile) {
			// Mobile: Fixed position at bottom right - no animation
			gsap.set(socialRef.current, {
				position: 'fixed',
				bottom: '1rem',
				right: '1rem',
				opacity: 0.9,
				zIndex: 99999,
			})
		} else {
			// Desktop: Original animation from center to bottom right
			gsap.set(socialRef.current, {
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				opacity: 1,
				zIndex: 99999,
			})

			gsap.to(socialRef.current, {
				position: 'fixed',
				top: 'auto',
				left: 'auto',
				bottom: '1.5rem',
				right: '1.5rem',
				transform: 'none',
				opacity: 0.85,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: 'body',
					start: 'top top',
					end: 'bottom bottom',
					scrub: 0.5,
				}
			})
		}

		// Handle resize
		const handleResize = () => {
			const newIsMobile = window.innerWidth < 768
			if (newIsMobile !== isMobile) {
				// Reload animation on breakpoint change
				window.location.reload()
			}
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<div 
			ref={socialRef} 
			className="social-icons flex flex-col items-center gap-2 md:gap-3 z-[99999] fixed bottom-4 right-4 md:bottom-6 md:right-6"
			style={{ zIndex: 99999 }}
		>
			{socialLinks.map((social) => (
				<a
					key={social.href}
					href={social.href}
					target="_blank"
					rel="noreferrer"
					className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-bg/95 backdrop-blur-md border border-border/60 flex items-center justify-center hover:bg-primary hover:text-bg transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
					aria-label={"Visit example website"}
					style={{ zIndex: 99999 }}
				>
					<span className="text-xs md:text-sm font-medium">{social.label}</span>
				</a>
			))}
		</div>
	)
}
