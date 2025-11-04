'use client'
import { useState } from 'react'
import { getGsap, motionOK } from '@/lib/gsap'
import { useEffect, useRef } from 'react'

export function ContactForm() {
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	})
	const formRef = useRef<HTMLFormElement>(null)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setStatus('loading')
		
		try {
			const data = new FormData()
			Object.entries(formData).forEach(([key, value]) => {
				data.append(key, value)
			})

			const res = await fetch('https://formspree.io/f/xayzrjgl', {
				method: 'POST',
				body: data,
				headers: { Accept: 'application/json' },
			})

			if (res.ok) {
				setStatus('success')
				setFormData({ name: '', email: '', subject: '', message: '' })
			} else {
				setStatus('error')
			}
		} catch {
			setStatus('error')
		} finally {
			setTimeout(() => setStatus('idle'), 4000)
		}
	}

	useEffect(() => {
		if (!motionOK() || !formRef.current) return
		const gsap = getGsap()

		// Animate form elements on mount
		gsap.fromTo(
			formRef.current.querySelectorAll('input, textarea, button'),
			{ y: 20, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.6,
				ease: 'power3.out',
				stagger: 0.1,
				scrollTrigger: {
					trigger: formRef.current,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			}
		)
	}, [])

	return (
		<form ref={formRef} onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6" aria-live="polite">
			{/* Name and Email Row */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-2">
					<label htmlFor="name" className="block text-sm font-medium text-fg">
						Full Name *
					</label>
					<input
						required
						id="name"
						name="name"
						type="text"
						value={formData.name}
						onChange={handleChange}
						className="w-full px-4 py-3 rounded-lg border border-border bg-bg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
						placeholder="Your full name"
					/>
				</div>
				<div className="space-y-2">
					<label htmlFor="email" className="block text-sm font-medium text-fg">
						Email Address *
					</label>
					<input
						required
						id="email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						className="w-full px-4 py-3 rounded-lg border border-border bg-bg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
						placeholder="your.email@example.com"
					/>
				</div>
			</div>

			{/* Subject */}
			<div className="space-y-2">
				<label htmlFor="subject" className="block text-sm font-medium text-fg">
					Subject *
				</label>
				<input
					required
					id="subject"
					name="subject"
					type="text"
					value={formData.subject}
					onChange={handleChange}
					className="w-full px-4 py-3 rounded-lg border border-border bg-bg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
					placeholder="What's this about?"
				/>
			</div>

			{/* Message */}
			<div className="space-y-2">
				<label htmlFor="message" className="block text-sm font-medium text-fg">
					Message *
				</label>
				<textarea
					required
					id="message"
					name="message"
					rows={6}
					value={formData.message}
					onChange={handleChange}
					className="w-full px-4 py-3 rounded-lg border border-border bg-bg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors resize-none"
					placeholder="Tell me about your project, idea, or just say hello..."
				/>
			</div>

			{/* Submit Button */}
			<div className="flex flex-col sm:flex-row gap-4">
				<button
					type="submit"
					disabled={status === 'loading'}
					className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-primary text-bg rounded-lg font-medium hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/40"
				>
					{status === 'loading' ? (
						<>
							<svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Sending Message...
						</>
					) : (
						'Send Message'
					)}
				</button>
				
				<button
					type="button"
					onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
					className="px-8 py-4 border border-border rounded-lg font-medium hover:bg-border/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
				>
					Clear Form
				</button>
			</div>

			{/* Status Messages */}
			{status === 'success' && (
				<div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
					<div className="flex items-center">
						<svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
						</svg>
						<p className="text-green-800 dark:text-green-200 font-medium">
							Thanks! I&apos;ll get back to you within 24 hours.
						</p>
					</div>
				</div>
			)}

			{status === 'error' && (
				<div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
					<div className="flex items-center">
						<svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
						</svg>
						<p className="text-red-800 dark:text-red-200 font-medium">
							Something went wrong. Please try again or email me directly.
						</p>
					</div>
				</div>
			)}
		</form>
	)
}
