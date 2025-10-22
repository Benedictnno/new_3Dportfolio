'use client'
import { useEffect } from 'react'
import { getGsap, motionOK } from '@/lib/gsap'

export function ScrollGradient() {
	useEffect(() => {
		if (!motionOK()) return
		const gsap = getGsap()
		
		// Create gradient overlay element
		const gradient = document.createElement('div')
		gradient.style.cssText = `
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
			z-index: -1;
			background: linear-gradient(135deg, 
				hsl(260, 84%, 54%) 0%, 
				hsl(198, 93%, 60%) 25%, 
				hsl(45, 100%, 51%) 50%, 
				hsl(260, 84%, 66%) 75%, 
				hsl(198, 93%, 70%) 100%
			);
			opacity: 0;
		`
		document.body.appendChild(gradient)

		// Animate gradient opacity based on scroll
		gsap.to(gradient, {
			opacity: 0.15,
			ease: 'none',
			scrollTrigger: {
				trigger: 'body',
				start: 'top top',
				end: 'bottom bottom',
				scrub: 1,
			}
		})

		// Animate gradient position for subtle shift effect
		gsap.to(gradient, {
			backgroundPosition: '100% 100%',
			ease: 'none',
			scrollTrigger: {
				trigger: 'body',
				start: 'top top',
				end: 'bottom bottom',
				scrub: 2,
			}
		})

		return () => {
			gradient.remove()
		}
	}, [])

	return null
}

