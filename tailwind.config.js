/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /bg-(red|green|blue|emerald|cyan|gray|purple|orange|yellow)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0295FE',    // Custom primary color
        primary_light: '#F1F9FF',    // Custom primary color
        secondary: '#002f4d',  // Custom secondary color
        accent: '#f99236',     // Custom accent color
        custom_dark: '#23262A',     // Custom accent color
        custom_gray: '#A0A8B5',     // Custom accent color
        custom_dark_gray: '#60656E',     // Custom accent color
        custom_light_gray: '#F0F1F5',     // Custom accent color
        custom_border: '#DDE1EB',     // Custom accent color
        custom_green: '#1EAE69',     // Custom accent color
        custom_red: '#DC3545',     // Custom accent color
        custom_white: '#FFFFFF',     // Custom accent color
        placeholder: '#B2BAC6',     // Custom accent color
      },
      // You can also extend other properties, such as spacing, borders, etc.
    },
  },
  plugins: [],
  corePlugins: {
    fill: true,
  },
  options: {
  },
}

