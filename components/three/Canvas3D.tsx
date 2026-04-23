'use client'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { Environment, BakeShadows } from '@react-three/drei'

export function Canvas3D({ children }: { children: React.ReactNode }) {
	const [eventSource, setEventSource] = useState<HTMLElement | undefined>()

	useEffect(() => {
		setEventSource(document.body)
	}, [])

	return (
		<Canvas 
			eventSource={eventSource}
			eventPrefix="client"
			dpr={[1, 2]} 
			shadows 
			camera={{ position: [0, 1.2, 6], fov: 45 }}
		>
			<Suspense fallback={null}>
				<Environment preset="city" blur={0.6} />
				{children}
				<BakeShadows />
			</Suspense>
		</Canvas>
	)
}
