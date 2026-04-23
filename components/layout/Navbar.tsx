'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { navItems } from '@/constants/nav'
import { FaTelegramPlane } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import { HiMenu } from 'react-icons/hi'

export function Navbar() {
	const [open, setOpen] = useState(false)

	const mainNavItems = navItems.filter(item => item.label.toLowerCase() !== 'contact')
	const contactItem = navItems.find(item => item.label.toLowerCase() === 'contact')

	return (
		<header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300">
			<div className="flex h-14 items-center justify-between px-4 md:px-6 rounded-full bg-bg/80 backdrop-blur-md border border-border/60 shadow-sm">
				
				<Link href="/" className="font-semibold tracking-tight text-fg hover:text-primary transition-colors whitespace-nowrap">
					Benedict
				</Link>

				<nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2" aria-label="Primary">
					{mainNavItems.map((item) => (
						<a key={item.href} href={item.href} className="text-sm font-medium text-muted hover:text-fg transition-colors">
							{item.label}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-2 md:gap-4">
					{contactItem && (
						<a href={contactItem.href} className="hidden sm:flex items-center gap-1 px-4 py-1.5 text-sm font-medium bg-border/40 hover:bg-border/60 text-fg rounded-full transition-colors">
							{contactItem.label} <FiArrowUpRight className="w-4 h-4" />
						</a>
					)}
					
					<ThemeToggle />

					<a href="https://t.me/yourusername" target="_blank" rel="noreferrer" className="text-primary hover:text-primary/80 p-2 hidden sm:block">
						<FaTelegramPlane className="w-5 h-5" />
					</a>

					<button
						onClick={() => setOpen((v) => !v)}
						className="md:hidden rounded p-2 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
						aria-expanded={open}
						aria-controls="mobile-menu"
						aria-label="Toggle menu"
					>
						<HiMenu className="w-5 h-5" />
					</button>
				</div>
			</div>

			<div id="mobile-menu" className={(open ? 'block' : 'hidden') + ' md:hidden absolute top-16 left-0 right-0 rounded-2xl bg-bg/95 backdrop-blur-md border border-border/60 p-4 shadow-lg'}>
				<div className="flex flex-col gap-4">
					{navItems.map((item) => (
						<a key={item.href} href={item.href} className="text-base font-medium text-fg hover:text-primary" onClick={() => setOpen(false)}>
							{item.label}
						</a>
					))}
				</div>
			</div>
		</header>
	)
}

