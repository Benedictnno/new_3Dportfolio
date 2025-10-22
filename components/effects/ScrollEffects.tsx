'use client'
import { useEffect } from 'react'
import { getGsap, motionOK } from '@/lib/gsap'

export function ScrollEffects() {
	useEffect(() => {
		if (!motionOK()) return
		const gsap = getGsap()
		const ctx = gsap.context(() => {
			// Reveal on enter
			gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
				gsap.fromTo(
					el,
					{ y: 24, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.7,
						ease: 'power3.out',
						scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' },
					}
				)
			})

			// Parallax scrub
			gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
				const strength = Number(el.dataset.parallax) || 40
				gsap.fromTo(
					el,
					{ y: strength * 0.5 },
					{ y: -strength, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }
				)
			})
		})
		return () => ctx.revert()
	}, [])

	return null
}



