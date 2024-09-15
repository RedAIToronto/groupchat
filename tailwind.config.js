// tailwind.config.js
module.exports = {
	darkMode: 'class', // Enable dark mode via class
	content: [
	  './pages/**/*.{js,ts,jsx,tsx}',
	  './components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
	  extend: {
		colors: {
		  pink: {
			300: '#fbb6ce',
			500: '#ec4899',
			700: '#db2777',
			800: '#be185d',
			900: '#9d174d',
		  },
		  sky: {
			400: '#38bdf8',
			500: '#0ea5e9',
			700: '#0284c7',
			800: '#0369a1',
		  },
		},
		animation: {
		  ticker: 'ticker 20s linear infinite',
		},
		keyframes: {
		  ticker: {
			'0%': { transform: 'translateX(100%)' },
			'100%': { transform: 'translateX(-100%)' },
		  },
		},
	  },
	},
	plugins: [],
  };
