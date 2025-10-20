'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { navItems } from '@/constants/nav'

export function Navbar() {
	const [open, setOpen] = useState(false)

	return (
		<header className="sticky top-0 z-40 backdrop-blur border-b border-border/60 bg-bg/70">
			<div className="container flex h-16 items-center justify-between">
				<Link href="/" className="font-semibold tracking-tight">Benedict</Link>

				<nav className="hidden md:flex items-center gap-6" aria-label="Primary">
					{navItems.map((item) => (
						<a key={item.href} href={item.href} className="text-sm hover:text-primary">
							{item.label}
						</a>
					))}
					<ThemeToggle />
				</nav>

				<button
					onClick={() => setOpen((v) => !v)}
					className="md:hidden rounded p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<span className="block h-5 w-5">≡</span>
				</button>
			</div>

			<div id="mobile-menu" className={(open ? 'block' : 'hidden') + ' md:hidden border-t border-border/60'}>
				<div className="container py-4 flex flex-col gap-4">
					{navItems.map((item) => (
						<a key={item.href} href={item.href} className="text-base" onClick={() => setOpen(false)}>
							{item.label}
						</a>
					))}
					<ThemeToggle />
				</div>
			</div>
		</header>
	)
}


