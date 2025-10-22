'use client'
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
	const [theme, setTheme] = useState<Theme>('dark') // Default to dark mode

	useEffect(() => {
		const stored = (typeof window !== 'undefined' && localStorage.getItem('theme')) as Theme | null
		const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
		// Default to dark mode, then check stored preference, then system preference
		setTheme(stored ?? (prefersDark ? 'dark' : 'dark'))
	}, [])

	useEffect(() => {
		if (typeof document === 'undefined') return
		document.documentElement.classList.toggle('dark', theme === 'dark')
		document.documentElement.classList.toggle('light', theme === 'light')
		localStorage.setItem('theme', theme)
	}, [theme])

	return {
		theme,
		setTheme,
		toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
	}
}


