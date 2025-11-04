import { Variants } from 'framer-motion';

export const rise: Variants = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const stagger: Variants = {
	show: { transition: { staggerChildren: 0.08 } },
};
