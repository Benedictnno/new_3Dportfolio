'use client'
import { Canvas3D } from '@/components/three/Canvas3D'
import { HeroScene } from '@/components/three/HeroScene'
import { getGsap, motionOK } from '@/lib/gsap'
import { useEffect, useRef } from 'react'
import { SocialScroll } from '@/components/effects/SocialScroll'
import Image from 'next/image'

export function Hero() {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!motionOK()) return
        const gsap = getGsap()
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo(titleRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        tl.fromTo(
            subRef.current,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            '-=0.25'
        )
        tl.fromTo(
            ctaRef.current,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45 },
            '-=0.2'
        )
        return () => {
            tl.kill()
        }
    }, [])
        // return () => {
        //     tl.kill()
        // tl.fromTo(subRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.25')
        //   .fromTo(ctaRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, '-=0.2')
        // return () => tl.kill()

    return (
     <section
  id="home"
  className="relative isolate min-h-[80vh] flex flex-col lg:flex-row items-center"
>
  {/* 3D scene as background layer - hidden on mobile */}
  <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
    <Canvas3D>
      <HeroScene />
    </Canvas3D>
  </div>

  {/* Background Glow */}
  <div className="absolute inset-0 -z-20 bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(110,58,255,0.25),transparent)]" />


  {/* TEXT CONTENT */}
  <div className="container py-20 md:py-28 w-full lg:w-1/2">
    <p className="text-sm uppercase tracking-widest text-primary/90">
      A Full Stack Web Developer • Software Engineer
    </p>
    <h1
      ref={titleRef}
      className="mt-3 text-4xl font-bold tracking-tight md:text-6xl"
    >
      Building web applications and digital products.
    </h1>
    <p ref={subRef} className="mt-5 text-muted md:text-lg">
      I engineer fast, modern user experiences with React, Next.js, TypeScript,
      and Tailwind. I also build robust backend systems using Node.js, Express,
      MongoDB, and GraphQL.
    </p>
    <div ref={ctaRef} className="mt-8 flex gap-4">
      <a href="#projects" className="rounded bg-primary px-5 py-3 text-bg">
        Work With Me
      </a>
      <a href="/cv.pdf" className="rounded border border-border px-5 py-3">
        Download CV
      </a>
    </div>
    <SocialScroll />
  </div>
    {/* IMAGE SECTION */}
  <div className="flex items-center justify-center lg:w-1/2 mt-8 lg:mt-0 lg:h-[60vh]">
      <Image
        src={'/images/New_me.png'}
        alt="Hero Image"
        width={450}
        height={500}
        className="object-contain max-sm:hidden "
        priority
      />
  </div>

</section>

    )
}


