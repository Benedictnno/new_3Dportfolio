'use client'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

export function BrandModel() {
	const { pointer, viewport } = useThree()
	const meshRef = useRef<THREE.Mesh>(null)
	const materialRef = useRef<THREE.MeshPhysicalMaterial>(null)
	
	const material = useMemo(
		() => new THREE.MeshPhysicalMaterial({
			color: new THREE.Color('#6E3AFF'),
			metalness: 0.6,
			roughness: 0.25,
			clearcoat: 1,
			clearcoatRoughness: 0.1,
		}),
		[]
	)

	useFrame((state) => {
		const t = state.clock.getElapsedTime()
		if (!meshRef.current || !materialRef.current) return

		// Base floating animation
		meshRef.current.position.y = Math.sin(t * 0.8) * 0.08

		// Mouse responsive rotation
		const mouseX = (pointer.x || 0) * 0.5
		const mouseY = (pointer.y || 0) * 0.3
		
		meshRef.current.rotation.x = mouseY + Math.sin(t * 0.3) * 0.1
		meshRef.current.rotation.y = mouseX + t * 0.2
		meshRef.current.rotation.z = mouseX * 0.2 + Math.sin(t * 0.4) * 0.05

		// Mouse responsive scaling
		const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY)
		const scale = 1 + (1 - distance) * 0.15
		meshRef.current.scale.setScalar(scale)

		// Mouse responsive position
		meshRef.current.position.x = mouseX * 0.3
		meshRef.current.position.z = mouseY * 0.2

		// Dynamic material properties
		const intensity = 1 + distance * 0.3
		materialRef.current.emissiveIntensity = distance * 0.1
		materialRef.current.roughness = 0.22 + Math.sin(t * 0.6) * 0.02 + distance * 0.05
		materialRef.current.metalness = 0.6 + distance * 0.1
		
		// Color shift based on mouse position
		const hue = (260 + mouseX * 30) % 360
		materialRef.current.color.setHSL(hue / 360, 0.8, 0.6)
	})

	return (
		<mesh ref={meshRef} castShadow receiveShadow>
			<torusKnotGeometry args={[1.1, 0.35, 180, 48, 2, 3]} />
			<primitive ref={materialRef} object={material} attach="material" />
		</mesh>
	)
}


