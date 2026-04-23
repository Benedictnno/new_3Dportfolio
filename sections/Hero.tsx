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
  className="relative isolate min-h-[90vh] flex items-center overflow-hidden"
>
  {/* 3D scene as background layer - hidden on mobile */}
  <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
    <Canvas3D>
      <HeroScene />
    </Canvas3D>
  </div>

  {/* Background Glow */}
  <div className="absolute inset-0 -z-20 bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(110,58,255,0.25),transparent)]" />

  <div className="container flex flex-col lg:flex-row items-center justify-between gap-12 pt-32 md:pt-20 pb-20 ">
    {/* TEXT CONTENT */}
    <div className="w-full lg:w-1/2 text-center lg:text-left z-10 lg:mt-20">
      <p className="text-sm md:text-base uppercase tracking-widest text-primary font-bold mb-4">
        A Full Stack Web Developer • Software Engineer
      </p>
      <h1
        ref={titleRef}
        className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl leading-[1.1]"
      >
        Building web <span className="text-primary">applications</span> and digital products.
      </h1>
      <p ref={subRef} className="mt-8 text-muted md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
        I engineer fast, modern user experiences with React, Next.js, TypeScript,
        and Tailwind. I also build robust backend systems using Node.js, Express,
        MongoDB, and GraphQL.
      </p>
      <div ref={ctaRef} className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
        <a href="#projects" className="rounded-full bg-primary px-8 py-4 text-bg font-bold hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
          Work With Me
        </a>
        <a href="/BenedictsResume.pdf" className="rounded-full border-2 border-border px-8 py-4 font-bold hover:bg-border/10 transition-all hover:scale-105 active:scale-95">
          Download CV
        </a>
      </div>
      <div className="mt-12 flex justify-center lg:justify-start">
        <SocialScroll />
      </div>
    </div>

    {/* IMAGE SECTION */} 
    <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end relative max-sm:hidden">
      <div className="relative w-[300px] h-[350px] md:w-[450px] md:h-[500px] lg:w-[450px] lg:h-[500px] group">
        {/* Decorative elements behind image */}
        <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
        
        <Image
          src={'/images/New_me.png'}
          alt="Hero Image"
          fill
          className="object-contain relative z-10 drop-shadow-2xl"
          priority
        />
      </div>
    </div>
  </div>
</section>
    )
}


