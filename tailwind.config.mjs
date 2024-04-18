/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#312e81',
					secondary: '#c026d3',
					accent: '#fef9c3',
					neutral: '#2563eb',
					'base-100': '#e5e7eb',
					info: '#dbeafe',
					success: '#00ff00',
					warning: '#fcd34d',
					error: '#e11d48',
				},
				dark: {
					primary: '#9333ea',
					secondary: '#6366f1',
					accent: '#dbeafe',
					neutral: '#4338ca',
					'base-100': '#312e81',
					info: '#22d3ee',
					success: '#008b57',
					warning: '#ffaa00',
					error: '#de0034',
				},
			},
		],
		base: true,
		styled: true,
		themeRoot: ':root',
	},
	theme: {
		extend: {},
	},
	plugins: [typography, daisyui],
};
