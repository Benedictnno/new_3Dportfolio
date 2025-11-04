'use client'
import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { getGsap, motionOK } from '@/lib/gsap'
import { ParticleField } from '@/components/effects/ParticleField'

export function HeroScene() {
	const { camera, pointer } = useThree()
	const groupRef = useRef<THREE.Group>(null)

	useFrame(() => {
		const targetX = (pointer.x || 0) * 0.6
		const targetY = (pointer.y || 0) * -0.3
		camera.position.x += (targetX - camera.position.x) * 0.08
		camera.position.y += (targetY - camera.position.y) * 0.08
		camera.lookAt(0, 0, 0)
	})

	useEffect(() => {
		if (!motionOK()) return
		const gsap = getGsap()
		gsap.fromTo(
			camera.position,
			{ z: 10, y: 2 },
			{ z: 6, y: 1.2, ease: 'power3.out', duration: 1.2 }
		)
		if (groupRef.current) {
			gsap.fromTo(
				groupRef.current.rotation,
				{ y: -0.6 },
				{ y: 0, ease: 'power2.out', duration: 1.1, delay: 0.2 }
			)
			gsap.fromTo(
				groupRef.current.scale,
				{ x: 0.85, y: 0.85, z: 0.85 },
				{ x: 1, y: 1, z: 1, ease: 'back.out(1.4)', duration: 1.1, delay: 0.15 }
			)
		}
	}, [camera])

	return (
		<group ref={groupRef}>
			<hemisphereLight intensity={0.6} />
			<directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
			{/* <BrandModel /> */}
			<ParticleField />
		</group>
	)
}


