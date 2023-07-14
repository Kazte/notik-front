/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'primary': '#ff1a1a',
				'primary-light': '#fa3a3d',
				'primary-dark': '#d2000e',
				'surface': '#1a1a1a',
				'background': '#121212',
				'success': '#1aff1a',
				'error': '#ff1a1a',
			},
		},
		plugins: [
			require('@tailwindcss/line-clamp'),
		],
	}
}

