import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false
export function getGsap() {
	if (!registered) {
		if (typeof window !== 'undefined') {
			gsap.registerPlugin(ScrollTrigger)
		}
		registered = true
	}
	return gsap
}

export function motionOK() {
	if (typeof window === 'undefined') return false
	return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
