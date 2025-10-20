'use client'
import { Canvas3D } from '@/components/three/Canvas3D'
import { HeroScene } from '@/components/three/HeroScene'
import { getGsap, motionOK } from '@/lib/gsap'
import { useEffect, useRef } from 'react'

export function Hero() {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!motionOK()) return
        const gsap = getGsap()
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo(titleRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
          .fromTo(subRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.25')
          .fromTo(ctaRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, '-=0.2')
        return () => tl.kill()
    }, [])

    return (
        <section id="home" className="relative isolate min-h-[80vh] grid md:grid-cols-2 items-center">
            {/* 3D scene as background layer */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <Canvas3D>
                    <HeroScene />
                </Canvas3D>
            </div>
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(110,58,255,0.25),transparent)]" />
            <div className="container py-20 md:py-28">
                <p className="text-sm uppercase tracking-widest text-primary/90">Frontend Architect • UI/UX Engineer</p>
                <h1 ref={titleRef} className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
                    Building delightful, performant web experiences.
                </h1>
                <p ref={subRef} className="mt-5 text-muted md:text-lg">
                    I craft modern portfolios and product UIs with React, Next.js, Tailwind, and motion design.
                </p>
                <div ref={ctaRef} className="mt-8 flex gap-4">
                    <a href="#projects" className="rounded bg-primary px-5 py-3 text-bg">Work With Me</a>
                    <a href="/cv.pdf" className="rounded border border-border px-5 py-3">Download CV</a>
                </div>
            </div>
        </section>
    )
}


