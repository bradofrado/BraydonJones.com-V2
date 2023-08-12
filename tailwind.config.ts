import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          'light': '#5a63bf',
          DEFAULT: '#1d4ed8',
          'dark': '#363c6e',
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [],
} satisfies Config;
