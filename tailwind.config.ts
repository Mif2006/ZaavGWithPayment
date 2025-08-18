// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'jewelry-gold': '#D4AF37',
        'jewelry-rose': '#B76E79',
        'jewelry-silver': '#C0C0C0',
        'jewelry-dark': '#2D2D2D',
        'jewelry-cream': '#F5F5F0',
        'purple': {
          light: '#A78BFA',
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
          900: '#581C87',
        },
        'dark': {
          bg: '#121212',
          card: '#1E1E1E',
          accent: '#333333', 
          text: '#E2E2E2',
          muted: '#8A8A8A',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        'dark-elegant': '0 4px 20px rgba(0, 0, 0, 0.25)',
        'dark-card': '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(to right, #8B5CF6, #6366F1)',
        'purple-gradient-vertical': 'linear-gradient(to bottom, #8B5CF6, #6366F1)',
        'dark-purple-gradient': 'linear-gradient(to right, #7C3AED, #4F46E5)',
      },
    },
  },
  plugins: [],
} satisfies Config;