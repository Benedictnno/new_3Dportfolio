import Link from 'next/link'
import { socialLinks } from '@/constants/social'

export function Footer() {
	return (
		<footer className="border-t border-border/60 bg-bg">
			<div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
				<p className="text-sm text-muted">© {new Date().getFullYear()} Benedict. All rights reserved.</p>
				<div className="flex items-center gap-5">
					{socialLinks.map((s) => (
						<Link key={s.href} href={s.href} target="_blank" rel="noreferrer" className="hover:text-primary">
							{s.label}
						</Link>
					))}
				</div>
			</div>
		</footer>
	)
}


