import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          'light': '#5a63bf',
          DEFAULT: '#404789',
          'dark': '#363c6e',
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
