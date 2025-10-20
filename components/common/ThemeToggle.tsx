'use client'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
	const { theme, toggle } = useTheme()
	return (
		<button
			onClick={toggle}
			className="rounded px-3 py-2 text-sm border border-border hover:bg-border/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
			aria-label="Toggle dark mode"
		>
			{theme === 'dark' ? 'Dark' : 'Light'}
		</button>
	)
}


