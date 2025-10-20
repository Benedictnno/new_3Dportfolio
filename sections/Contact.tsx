'use client'
import { useState } from 'react'

export function Contact() {
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const form = e.currentTarget
		setStatus('loading')
		try {
			const data = new FormData(form)
			const res = await fetch('https://formspree.io/f/xayzrjgl', {
				method: 'POST',
				body: data,
				headers: { Accept: 'application/json' },
			})
			if (res.ok) {
				setStatus('success')
				form.reset()
			} else {
				setStatus('error')
			}
		} catch {
			setStatus('error')
		} finally {
			setTimeout(() => setStatus('idle'), 4000)
		}
	}

	return (
		<section id="contact" className="container py-20 md:py-28">
			<h2 className="text-2xl md:text-3xl font-semibold">Contact</h2>
			<form className="mt-8 grid gap-4 max-w-xl" onSubmit={onSubmit} aria-live="polite">
				<input required name="name" placeholder="Name" className="rounded border border-border px-3 py-2 bg-bg" />
				<input required name="email" type="email" placeholder="Email" className="rounded border border-border px-3 py-2 bg-bg" />
				<textarea required name="message" placeholder="Message" className="rounded border border-border px-3 py-2 bg-bg min-h-32" />
				<button
					disabled={status === 'loading'}
					className="rounded bg-primary px-5 py-3 text-bg disabled:opacity-70"
				>
					{status === 'loading' ? 'Sending…' : 'Send Message'}
				</button>
				{status === 'success' ? (
					<p className="text-sm text-green-600">Thanks! I’ll get back to you shortly.</p>
				) : null}
				{status === 'error' ? (
					<p className="text-sm text-red-600">Something went wrong. Please try again.</p>
				) : null}
			</form>
		</section>
	)
}


