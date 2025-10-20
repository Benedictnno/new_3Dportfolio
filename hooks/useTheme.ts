'use client'
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
	const [theme, setTheme] = useState<Theme>('light')

	useEffect(() => {
		const stored = (typeof window !== 'undefined' && localStorage.getItem('theme')) as Theme | null
		const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
		setTheme(stored ?? (prefersDark ? 'dark' : 'light'))
	}, [])

	useEffect(() => {
		if (typeof document === 'undefined') return
		document.documentElement.classList.toggle('dark', theme === 'dark')
		localStorage.setItem('theme', theme)
	}, [theme])

	return {
		theme,
		setTheme,
		toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
	}
}


