const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
  				DEFAULT: '#026bae',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: '#1fc63b',
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
  			ring: '#026bae',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
				customprimary: {
					100: "#cce1ef",
					200: "#9ac4df",
					300: "#67a6ce",
					400: "#3589be",
					500: "#026bae",
					600: "#02568b",
					700: "#014068",
					800: "#012b46",
					900: "#001523"
				},
				customsecondary: {
					100: "#d2f4d8",
					200: "#a5e8b1",
					300: "#79dd89",
					400: "#4cd162",
					500: "#1fc63b",
					600: "#199e2f",
					700: "#137723",
					800: "#0c4f18",
					900: "#06280c"
				},
			}
		}
  },
darkMode: 'class',
	 plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#026bae",
					100: "#cce1ef",
					200: "#9ac4df",
					300: "#67a6ce",
					400: "#3589be",
					500: "#026bae",
					600: "#02568b",
					700: "#014068",
					800: "#012b46",
					900: "#001523"
            },
            secondary: {
              DEFAULT: "#1fc63b",
							100: "#d2f4d8",
					200: "#a5e8b1",
					300: "#79dd89",
					400: "#4cd162",
					500: "#1fc63b",
					600: "#199e2f",
					700: "#137723",
					800: "#0c4f18",
					900: "#06280c"
            },
          },
        },
        dark: {
          colors: {
						primary: {
							DEFAULT: "#026bae",
					100: "#cce1ef",
					200: "#9ac4df",
					300: "#67a6ce",
					400: "#3589be",
					500: "#026bae",
					600: "#02568b",
					700: "#014068",
					800: "#012b46",
					900: "#001523"
            },
            secondary: {
							DEFAULT: "#1fc63b",
							100: "#d2f4d8",
					200: "#a5e8b1",
					300: "#79dd89",
					400: "#4cd162",
					500: "#1fc63b",
					600: "#199e2f",
					700: "#137723",
					800: "#0c4f18",
					900: "#06280c"
				},
          },
        },
      },
    }),
  ],
}
