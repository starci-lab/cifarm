import type { Config } from "tailwindcss"
import { heroui } from "@heroui/react"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                // Add your custom text-light color, either from Heroui theme or your custom value
                lightText: "var(--color-primary-light)",  // If Heroui provides light primary colors
                darkText: "var(--color-primary-dark)",  // Or set your own custom color here
            },
        },
    },
    darkMode: "class",
    plugins: [heroui({
        defaultTheme: "dark",
        themes: {
            light: {
                colors: {
                    primary: "#6ECC90",
                }
            },
            dark: {
                colors: {
                    primary: "#6ECC90"
                }
            }
        }
    })],
}
export default config
