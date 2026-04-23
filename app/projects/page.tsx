import { Metadata } from 'next'
import Link from 'next/link'
import { projects } from '@/constants/projects'
import { ProjectCard } from '@/components/cards/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects - Benedict Portfolio',
  description: 'Explore my portfolio of web development projects, featuring modern technologies and innovative solutions.',
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-border/60 bg-bg/70 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-6 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-fg">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold">All Projects</h1>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in working together?</h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            I&apos;m always excited to take on new challenges and create amazing digital experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-bg rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get In Touch
            </Link>
            <Link 
              href="/cv.pdf" 
              className="inline-flex items-center justify-center px-8 py-4 border border-border rounded-lg font-medium hover:bg-border/20 transition-colors"
            >
              Download CV
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
