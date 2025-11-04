'use client'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function ParticleField({ count = 800 }: { count?: number }) {
	const mesh = useRef<THREE.InstancedMesh>(null)
	const dummy = useMemo(() => new THREE.Object3D(), [])
	const colors = useMemo(() => [new THREE.Color('#6E3AFF'), new THREE.Color('#44D1DC')], [])
	const range = 10

	const positions = useMemo(() => {
		return new Array(count).fill(0).map(() => ([
			(Math.random() - 0.5) * range * 2,
			(Math.random() - 0.5) * range * 1.2,
			-Math.random() * range - 2,
		] as [number, number, number]))
	}, [count])

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime()
		if (!mesh.current) return
		for (let i = 0; i < count; i++) {
			const [x, y, z] = positions[i]
			dummy.position.set(x, y + Math.sin(t + i) * 0.06, z)
			dummy.rotation.z = t * 0.05 + i
			const scale = 0.02 + (Math.sin(t * 0.7 + i) + 1) * 0.015
			dummy.scale.setScalar(scale)
			dummy.updateMatrix()
			mesh.current.setMatrixAt(i, dummy.matrix)
			const color = colors[i % colors.length]
			mesh.current.setColorAt?.(i, color)
		}
		mesh.current.instanceMatrix.needsUpdate = true
		if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
	})

	return (
		<instancedMesh ref={mesh} args={[undefined, undefined, count]}>
			<sphereGeometry args={[1, 8, 8]} />
			<meshBasicMaterial transparent opacity={0.75} />
		</instancedMesh>
	)
}



