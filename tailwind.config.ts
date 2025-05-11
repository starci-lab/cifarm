import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
    	extend: {
    		backgroundImage: {
    			"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
    			"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-button": "linear-gradient(90deg, #D9D9D9 0%, #A8E6CF 30.77%, #A0DDE8 52.88%, #E6F79B 100%)",
    		},
    		colors: {
                content0: "hsl(var(--content-0))",
                content1: "hsl(var(--content-1))",
                content2: "hsl(var(--content-2))",
    			background: "var(--background)", 
    			foreground: "var(--foreground)",
                navbar: {
                    DEFAULT: "hsl(var(--navbar))",
                },
    			card: {
    				DEFAULT: "var(--card)",
                    hover: "var(--card-hover)",
                    secondary: "var(--card-secondary)",
    			},
                table: {
                    header: {
                        background: "var(--table-header-background)",
                        text: "var(--table-header-text)",
                    },
                    row: {
                        background: "var(--table-row-background)",
                        text: "var(--table-row-text)",
                    },
                },
                tab: {
                    "active-background": "var(--tab-active-background)",
                    "active-text": "var(--tab-active-text)",
                    "default-background": "var(--tab-default-background)",
                    "default-text": "var(--tab-default-text)",
                    "default-border": "var(--tab-default-border)",
                },
                button: {
                    background: "var(--button-background)",
                    text: "var(--button-text)",
                    "background-hover": "var(--button-background-hover)",
                    highlight: "var(--button-highlight)",
                    "secondary-background": "hsl(var(--button-secondary-background))",
                    "group-background": "hsl(var(--button-group-background))",   
                },
                selection: {
                    "active-background": "var(--selection-active-background)",
                    "active-text": "var(--selection-active-text)",
                    "default-text": "var(--selection-default-text)",
                },
                sidebar: {
                    DEFAULT: "var(--sidebar)",
                    background: "var(--sidebar-background)",
                },
                dialog: {
                    DEFAULT: "var(--dialog-background)",
                    background: "var(--dialog-background)",
                    foreground: "var(--dialog-foreground)"
                },
    			popover: {
    				DEFAULT: "hsl(var(--popover))",
    				foreground: "hsl(var(--popover-foreground))"
    			},
    			primary: {
    				DEFAULT: "hsl(var(--primary))",
    				foreground: "hsl(var(--primary-foreground))",
                    "1": "hsl(var(--primary1))",
                    "2": "hsl(var(--primary2))"
    			},
    			secondary: {
    				DEFAULT: "hsl(var(--secondary))",
    				foreground: "hsl(var(--secondary-foreground))"
    			},
    			muted: {
    				DEFAULT: "hsl(var(--muted))",
    				foreground: "hsl(var(--muted-foreground))"
    			},
    			accent: {
    				DEFAULT: "hsl(var(--accent))",
    				foreground: "hsl(var(--accent-foreground))"
    			},
    			destructive: {
    				DEFAULT: "hsl(var(--destructive))",
    				foreground: "hsl(var(--destructive-foreground))"
    			},
                text: {
                    DEFAULT: "var(--text)",
                    secondary: "var(--text-secondary)",
                    foreground: "var(--text-foreground)",
                    default: "var(--text-default)",
                    teal: "var(--text-teal)",
                    highlight: "var(--text-highlight)",
                    contrast: "var(--text-contrast)",
                },
    			border: {
                    DEFAULT: "var(--border)",
                    secondary: "var(--border-secondary)",
                },
    			input: "hsl(var(--input))",
    			ring: "hsl(var(--ring))",
    			chart: {
    				"1": "hsl(var(--chart-1))",
    				"2": "hsl(var(--chart-2))",
    				"3": "hsl(var(--chart-3))",
    				"4": "hsl(var(--chart-4))",
    				"5": "hsl(var(--chart-5))",
    			},
    		},
    		borderRadius: {
    			lg: "var(--radius)",
    			md: "calc(var(--radius) - 2px)",
    			sm: "calc(var(--radius) - 4px)"
    		},
    		keyframes: {
    			"accordion-down": {
    				from: {
    					height: "0"
    				},
    				to: {
    					height: "var(--radix-accordion-content-height)"
    				}
    			},
    			"accordion-up": {
    				from: {
    					height: "var(--radix-accordion-content-height)"
    				},
    				to: {
    					height: "0"
    				}
    			},
                "ripple": {
                    "0%, 100%": {
                        transform: "translate(-50%, -50%) scale(1)"
                    },
                    "50%": {
                        transform: "translate(-50%, -50%) scale(0.9)"
                    }
                },
                "pulse": {
                    "0%, 100%": {
                        boxShadow: "0 0 0 0 var(--pulse-color)"
                    },
                    "50%": {
                        boxShadow: "0 0 0 8px var(--pulse-color)"
                    }
                },
                "line-shadow": {
                    "0%": {
                        backgroundPosition: "0 0"
                    },
                    "100%": {
                        backgroundPosition: "100% -100%"
                    }
                },
                "shiny-text": {
                    "0%, 90%, 100%": {
                        backgroundPosition: "calc(-100% - var(--shiny-width)) 0"
                    },
                    "30%, 60%": {
                        backgroundPosition: "calc(100% + var(--shiny-width)) 0"
                    }
                },
                "gradient": {
                    "to": {
                        backgroundPosition: "var(--bg-size, 300%) 0"
                    }
                }
    		},
    		animation: {
    			"accordion-down": "accordion-down 0.2s ease-out",
    			"accordion-up": "accordion-up 0.2s ease-out",
                "ripple": "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
                "pulse": "pulse var(--duration) ease-out infinite",
                "line-shadow": "line-shadow 10s linear infinite"
    		}
    	}
    },
    darkMode: "class",
    plugins: [
    	tailwindcssAnimate,
    ],
}
export default config
