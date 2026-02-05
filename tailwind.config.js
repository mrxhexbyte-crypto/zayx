/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-geist-mono)',
  				'ui-monospace',
  				'monospace'
  			],
  			display: ['system-ui', 'sans-serif']
  		},
  		animation: {
  			'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
  			'fade-in-up': 'fade-in-up 0.6s ease-out',
  			'slide-in-left': 'slide-in-left 0.6s ease-out',
  			'neon-glow': 'neon-glow 3s ease-in-out infinite',
  		},
  		keyframes: {
  			'glow-pulse': {
  				'0%, 100%': {
  					boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
  				},
  				'50%': {
  					boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)',
  				},
  			},
  			'fade-in-up': {
  				from: {
  					opacity: '0',
  					transform: 'translateY(20px)',
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateY(0)',
  				},
  			},
  			'slide-in-left': {
  				from: {
  					opacity: '0',
  					transform: 'translateX(-20px)',
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateX(0)',
  				},
  			},
  			'neon-glow': {
  				'0%, 100%': {
  					textShadow: '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
  				},
  				'50%': {
  					textShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.5)',
  				},
  			},
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			neon: {
  				cyan: 'rgb(var(--neon-cyan))',
  				magenta: 'rgb(var(--neon-magenta))',
  				purple: 'rgb(var(--neon-purple))',
  				lime: 'rgb(var(--neon-lime))',
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
      require("tailwindcss-animate")
]
};
